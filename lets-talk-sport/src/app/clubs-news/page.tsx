import { 
  CalendarIcon,
  UserIcon 
} from '@heroicons/react/24/outline'

// Mock data - replace with actual data from database
const clubs = [
  { id: '1', name: 'Manchester United', logo: '/api/placeholder/40/40', active: true },
  { id: '2', name: 'Arsenal', logo: '/api/placeholder/40/40', active: false },
  { id: '3', name: 'Chelsea', logo: '/api/placeholder/40/40', active: false },
  { id: '4', name: 'Liverpool', logo: '/api/placeholder/40/40', active: false },
  { id: '5', name: 'Manchester City', logo: '/api/placeholder/40/40', active: false },
]

const articles = [
  {
    id: '1',
    title: 'Marcus Rashford Returns to Training After Injury',
    excerpt: 'Manchester United forward Marcus Rashford has returned to first-team training following his recent injury setback...',
    image: '/api/placeholder/400/250',
    club: 'Manchester United',
    category: 'Injury News',
    publishedAt: '2024-01-15T10:00:00Z',
    author: 'John Smith',
    readTime: '3 min read'
  },
  {
    id: '2',
    title: 'Erik ten Hag Discusses January Transfer Plans',
    excerpt: 'Manchester United manager Erik ten Hag has opened up about the club\'s transfer strategy for the January window...',
    image: '/api/placeholder/400/250',
    club: 'Manchester United',
    category: 'Transfer News',
    publishedAt: '2024-01-15T09:30:00Z',
    author: 'Sarah Johnson',
    readTime: '5 min read'
  },
  {
    id: '3',
    title: 'Arsenal\'s Title Challenge: Can They Go All the Way?',
    excerpt: 'Analysis of Arsenal\'s impressive form and whether they can maintain their title challenge throughout the season...',
    image: '/api/placeholder/400/250',
    club: 'Arsenal',
    category: 'Analysis',
    publishedAt: '2024-01-15T08:45:00Z',
    author: 'Mike Wilson',
    readTime: '7 min read'
  },
  {
    id: '4',
    title: 'Chelsea\'s New Signing Makes Immediate Impact',
    excerpt: 'Chelsea\'s latest acquisition has hit the ground running with an impressive debut performance...',
    image: '/api/placeholder/400/250',
    club: 'Chelsea',
    category: 'Match Report',
    publishedAt: '2024-01-15T07:15:00Z',
    author: 'Emma Davis',
    readTime: '4 min read'
  },
  {
    id: '5',
    title: 'Liverpool\'s Midfield Revolution Under Klopp',
    excerpt: 'How Jurgen Klopp has transformed Liverpool\'s midfield with his latest tactical innovations...',
    image: '/api/placeholder/400/250',
    club: 'Liverpool',
    category: 'Tactical Analysis',
    publishedAt: '2024-01-15T06:30:00Z',
    author: 'David Brown',
    readTime: '6 min read'
  },
  {
    id: '6',
    title: 'Manchester City\'s Champions League Ambitions',
    excerpt: 'Pep Guardiola discusses his team\'s preparation for the upcoming Champions League knockout stages...',
    image: '/api/placeholder/400/250',
    club: 'Manchester City',
    category: 'Champions League',
    publishedAt: '2024-01-15T05:45:00Z',
    author: 'Lisa Thompson',
    readTime: '4 min read'
  }
]

const categories = [
  'All News',
  'Match Reports',
  'Transfer News',
  'Injury News',
  'Analysis',
  'Tactical Analysis',
  'Champions League',
  'Premier League'
]

export default function ClubsNewsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clubs News</h1>
          <p className="text-gray-600 mt-2">Latest updates from your favorite football clubs</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Club Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Club</label>
            <div className="flex flex-wrap gap-2">
              {clubs.map((club) => (
                <button
                  key={club.id}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    club.active
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {club.name}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-video bg-gray-200 relative">
              <div className="absolute top-3 left-3">
                <span className="inline-block px-2 py-1 bg-red-600 text-white text-xs font-medium rounded-full">
                  {article.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span className="font-medium text-red-600">{article.club}</span>
                <span className="mx-2">•</span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <UserIcon className="h-4 w-4 mr-1" />
                  {article.author}
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {new Date(article.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center">
        <button className="px-8 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors">
          Load More Articles
        </button>
      </div>
    </div>
  )
}