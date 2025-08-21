import Link from 'next/link'
import { 
  ArrowRightIcon, 
  FireIcon, 
  StarIcon,
  ClockIcon 
} from '@heroicons/react/24/outline'

// Mock data - replace with actual data from database
const featuredArticles = [
  {
    id: '1',
    title: 'Manchester United Secures Dramatic Victory in Premier League Clash',
    excerpt: 'A last-minute goal from Marcus Rashford gives United crucial three points in title race',
    image: '/api/placeholder/600/400',
    category: 'Premier League',
    readTime: '5 min read',
    featured: true
  },
  {
    id: '2',
    title: 'Erik ten Hag&apos;s Tactical Masterclass Against Arsenal',
    excerpt: 'How the Dutch manager outwitted Mikel Arteta in crucial derby match',
    image: '/api/placeholder/600/400',
    category: 'Analysis',
    readTime: '7 min read',
    featured: false
  },
  {
    id: '3',
    title: 'New Signing Shows Promise in Debut Performance',
    excerpt: 'Summer acquisition impresses fans and pundits alike with stellar first outing',
    image: '/api/placeholder/600/400',
    category: 'Transfer News',
    readTime: '4 min read',
    featured: false
  }
]

const trendingTopics = [
  'Premier League Title Race',
  'Champions League Draw',
  'Transfer Window Updates',
  'Injury News',
  'Manager Speculation'
]

export default function HomePage() {
  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-600 to-red-800 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative px-8 py-16 text-white">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Let&apos;s Talk Sport
          </h1>
          <p className="text-xl mb-6 text-red-100">
            Your premier destination for Manchester United and football news
          </p>
          <Link
            href="/clubs-news"
            className="inline-flex items-center px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Explore Latest News
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Featured Articles */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Stories</h2>
          <Link
            href="/clubs-news"
            className="text-red-600 hover:text-red-700 font-medium flex items-center"
          >
            View All
            <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article, index) => (
            <article
              key={article.id}
              className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${
                index === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="aspect-video bg-gray-200 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-medium rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {article.readTime}
                  {article.featured && (
                    <StarIcon className="h-4 w-4 ml-2 text-yellow-500" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {article.excerpt}
                </p>
                <Link
                  href={`/article/${article.id}`}
                  className="inline-flex items-center text-red-600 hover:text-red-700 font-medium text-sm mt-4"
                >
                  Read More
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <FireIcon className="h-6 w-6 text-orange-500 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Trending Topics</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer transition-colors"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">24/7</div>
          <div className="text-gray-600">Live Coverage</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">100+</div>
          <div className="text-gray-600">Daily Articles</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">50K+</div>
          <div className="text-gray-600">Active Readers</div>
        </div>
      </div>
    </div>
  )
}
