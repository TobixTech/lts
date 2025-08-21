import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create clubs
  const clubs = await Promise.all([
    prisma.club.upsert({
      where: { name: 'Manchester United' },
      update: {},
      create: {
        name: 'Manchester United',
        shortName: 'Man Utd',
        country: 'England',
        league: 'Premier League',
        logo: '/api/placeholder/100/100'
      }
    }),
    prisma.club.upsert({
      where: { name: 'Arsenal' },
      update: {},
      create: {
        name: 'Arsenal',
        shortName: 'Arsenal',
        country: 'England',
        league: 'Premier League',
        logo: '/api/placeholder/100/100'
      }
    }),
    prisma.club.upsert({
      where: { name: 'Chelsea' },
      update: {},
      create: {
        name: 'Chelsea',
        shortName: 'Chelsea',
        country: 'England',
        league: 'Premier League',
        logo: '/api/placeholder/100/100'
      }
    }),
    prisma.club.upsert({
      where: { name: 'Liverpool' },
      update: {},
      create: {
        name: 'Liverpool',
        shortName: 'Liverpool',
        country: 'England',
        league: 'Premier League',
        logo: '/api/placeholder/100/100'
      }
    }),
    prisma.club.upsert({
      where: { name: 'Manchester City' },
      update: {},
      create: {
        name: 'Manchester City',
        shortName: 'Man City',
        country: 'England',
        league: 'Premier League',
        logo: '/api/placeholder/100/100'
      }
    })
  ])

  console.log(`✅ Created ${clubs.length} clubs`)

  // Create leagues
  const leagues = await Promise.all([
    prisma.league.upsert({
      where: { name: 'Premier League' },
      update: {},
      create: {
        name: 'Premier League',
        country: 'England',
        season: '2023/24',
        logo: '/api/placeholder/100/100'
      }
    }),
    prisma.league.upsert({
      where: { name: 'La Liga' },
      update: {},
      create: {
        name: 'La Liga',
        country: 'Spain',
        season: '2023/24',
        logo: '/api/placeholder/100/100'
      }
    }),
    prisma.league.upsert({
      where: { name: 'Bundesliga' },
      update: {},
      create: {
        name: 'Bundesliga',
        country: 'Germany',
        season: '2023/24',
        logo: '/api/placeholder/100/100'
      }
    }),
    prisma.league.upsert({
      where: { name: 'Serie A' },
      update: {},
      create: {
        name: 'Serie A',
        country: 'Italy',
        season: '2023/24',
        logo: '/api/placeholder/100/100'
      }
    })
  ])

  console.log(`✅ Created ${leagues.length} leagues`)

  // Create admin users
  const adminUsers = await Promise.all([
    prisma.adminUser.upsert({
      where: { username: 'admin1' },
      update: {},
      create: {
        username: 'admin1',
        pin: '464184',
        role: 'ADMIN'
      }
    }),
    prisma.adminUser.upsert({
      where: { username: 'admin2' },
      update: {},
      create: {
        username: 'admin2',
        pin: '229485',
        role: 'EDITOR'
      }
    })
  ])

  console.log(`✅ Created ${adminUsers.length} admin users`)

  // Create sample articles
  const manUtdClub = await prisma.club.findUnique({ where: { name: 'Manchester United' } })
  
  if (manUtdClub) {
    const articles = await Promise.all([
      prisma.article.upsert({
        where: { slug: 'marcus-rashford-returns-to-training' },
        update: {},
        create: {
          title: 'Marcus Rashford Returns to Training After Injury',
          slug: 'marcus-rashford-returns-to-training',
          excerpt: 'Manchester United forward Marcus Rashford has returned to first-team training following his recent injury setback.',
          content: 'Manchester United forward Marcus Rashford has returned to first-team training following his recent injury setback. The England international was sidelined for several weeks but has now rejoined his teammates on the training pitch. Manager Erik ten Hag expressed his delight at having the forward back in contention, stating that Rashford\'s return provides a significant boost to the team\'s attacking options. The 26-year-old has been a key player for United this season, contributing goals and assists in crucial matches. His return comes at an important time as the club prepares for a busy fixture schedule including Premier League and Champions League commitments.',
          image: '/api/placeholder/600/400',
          published: true,
          featured: true,
          author: 'John Smith',
          tags: ['Injury News', 'Manchester United', 'Marcus Rashford'],
          clubId: manUtdClub.id,
          publishedAt: new Date()
        }
      }),
      prisma.article.upsert({
        where: { slug: 'erik-ten-hag-tactical-masterclass' },
        update: {},
        create: {
          title: 'Erik ten Hag\'s Tactical Masterclass Against Arsenal',
          slug: 'erik-ten-hag-tactical-masterclass',
          excerpt: 'How the Dutch manager outwitted Mikel Arteta in crucial derby match with innovative tactics and strategic substitutions.',
          content: 'Erik ten Hag demonstrated his tactical acumen in Manchester United\'s impressive victory over Arsenal, showcasing the strategic thinking that has made him one of the most respected managers in the Premier League. The Dutch tactician\'s decision to deploy a fluid 4-3-3 formation with Bruno Fernandes operating as a false nine proved to be a masterstroke, as it nullified Arsenal\'s midfield dominance while creating space for United\'s wingers to exploit. Ten Hag\'s substitutions were equally impressive, with the introduction of fresh legs at precisely the right moments maintaining United\'s intensity throughout the match. This victory not only secured three crucial points but also demonstrated the team\'s tactical flexibility and the manager\'s ability to adapt his approach based on the opposition.',
          image: '/api/placeholder/600/400',
          published: true,
          featured: false,
          author: 'Sarah Johnson',
          tags: ['Analysis', 'Tactics', 'Manchester United', 'Arsenal'],
          clubId: manUtdClub.id,
          publishedAt: new Date()
        }
      })
    ])

    console.log(`✅ Created ${articles.length} sample articles`)
  }

  // Create sample live games
  const premierLeague = await prisma.league.findUnique({ where: { name: 'Premier League' } })
  
  if (premierLeague) {
    const liveGames = await Promise.all([
      prisma.liveGame.upsert({
        where: { id: 'sample-game-1' },
        update: {},
        create: {
          id: 'sample-game-1',
          title: 'Manchester United vs Arsenal',
          homeTeam: 'Manchester United',
          awayTeam: 'Arsenal',
          youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          matchDate: new Date('2024-01-20T15:00:00Z'),
          status: 'UPCOMING',
          description: 'Premier League clash between two title contenders at Old Trafford'
        }
      }),
      prisma.liveGame.upsert({
        where: { id: 'sample-game-2' },
        update: {},
        create: {
          id: 'sample-game-2',
          title: 'Chelsea vs Liverpool',
          homeTeam: 'Chelsea',
          awayTeam: 'Liverpool',
          youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          matchDate: new Date('2024-01-19T20:00:00Z'),
          status: 'LIVE',
          description: 'Live coverage of this exciting Premier League match at Stamford Bridge'
        }
      })
    ])

    console.log(`✅ Created ${liveGames.length} sample live games`)
  }

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })