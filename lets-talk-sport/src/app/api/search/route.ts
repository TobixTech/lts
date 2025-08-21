import { NextRequest, NextResponse } from 'next/server'
import { generateSearchResponse } from '@/lib/gemini'
import { prisma } from '@/lib/prisma'

interface ArticleWithClub {
  id: string
  title: string
  excerpt: string | null
  content: string
  image: string | null
  tags: string[]
  featured: boolean
  publishedAt: Date | null
  author: string | null
  club: { name: string } | null
}

interface FormattedArticle {
  id: string
  title: string
  excerpt: string | null
  image: string | null
  club: string
  category: string
  publishedAt: Date | null
  author: string | null
  readTime: string
  relevance: number
}

export async function POST(request: NextRequest) {
  let query = ''
  
  try {
    const body = await request.json()
    query = body.query

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      )
    }

    // Generate AI response using Gemini
    const aiResponse = await generateSearchResponse(query)

    // Search for relevant articles in the database
    const articles = await prisma.article.findMany({
      where: {
        AND: [
          { published: true },
          {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { content: { contains: query, mode: 'insensitive' } },
              { excerpt: { contains: query, mode: 'insensitive' } },
              { tags: { hasSome: [query] } }
            ]
          }
        ]
      },
      include: {
        club: true
      },
      orderBy: [
        { featured: 'desc' },
        { publishedAt: 'desc' }
      ],
      take: 10
    })

    // Format articles for response
    const formattedArticles: FormattedArticle[] = articles.map((article: ArticleWithClub) => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      image: article.image,
      club: article.club?.name || 'Unknown',
      category: article.tags[0] || 'General',
      publishedAt: article.publishedAt,
      author: article.author,
      readTime: `${Math.ceil(article.content.split(' ').length / 200)} min read`,
      relevance: calculateRelevance(article, query)
    }))

    // Sort by relevance
    formattedArticles.sort((a: FormattedArticle, b: FormattedArticle) => b.relevance - a.relevance)

    return NextResponse.json({
      aiResponse,
      articles: formattedArticles,
      query
    })

  } catch (error) {
    console.error('Search API error:', error)
    
    // Return fallback response
    return NextResponse.json({
      aiResponse: `I found some information about "${query}" in sports. This is a fallback response while our AI service is being updated.`,
      articles: [],
      query: query || 'unknown'
    })
  }
}

function calculateRelevance(article: ArticleWithClub, query: string): number {
  let score = 0
  
  // Title match (highest weight)
  if (article.title.toLowerCase().includes(query.toLowerCase())) {
    score += 50
  }
  
  // Content match
  if (article.content.toLowerCase().includes(query.toLowerCase())) {
    score += 20
  }
  
  // Excerpt match
  if (article.excerpt?.toLowerCase().includes(query.toLowerCase())) {
    score += 15
  }
  
  // Tag match
  if (article.tags.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase()))) {
    score += 25
  }
  
  // Featured articles get bonus
  if (article.featured) {
    score += 10
  }
  
  // Recent articles get bonus
  if (article.publishedAt) {
    const daysSincePublished = Math.floor((Date.now() - new Date(article.publishedAt).getTime()) / (1000 * 60 * 60 * 24))
    if (daysSincePublished <= 7) score += 10
    else if (daysSincePublished <= 30) score += 5
  }
  
  return Math.min(score, 100)
}