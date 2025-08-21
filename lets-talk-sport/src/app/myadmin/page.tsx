'use client'

import { useState } from 'react'
import { 
  LockClosedIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CalendarIcon,
  TrophyIcon,
  NewspaperIcon,
  PlayIcon
} from '@heroicons/react/24/outline'

const VALID_PINS = ['464184', '229485']

interface Article {
  id: string
  title: string
  status: 'draft' | 'published'
  category: string
  club: string
  createdAt: string
}

interface LiveGame {
  id: string
  title: string
  status: 'upcoming' | 'live' | 'finished'
  homeTeam: string
  awayTeam: string
  matchDate: string
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pin, setPin] = useState('')
  const [activeTab, setActiveTab] = useState('articles')


  // Mock data - replace with actual data from database
  const [articles] = useState<Article[]>([
    {
      id: '1',
      title: 'Marcus Rashford Returns to Training',
      status: 'published',
      category: 'Injury News',
      club: 'Manchester United',
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      title: 'New Signing Announced',
      status: 'draft',
      category: 'Transfer News',
      club: 'Manchester United',
      createdAt: '2024-01-14T15:30:00Z'
    }
  ])

  const [liveGames] = useState<LiveGame[]>([
    {
      id: '1',
      title: 'Manchester United vs Arsenal',
      status: 'upcoming',
      homeTeam: 'Manchester United',
      awayTeam: 'Arsenal',
      matchDate: '2024-01-20T15:00:00Z'
    },
    {
      id: '2',
      title: 'Chelsea vs Liverpool',
      status: 'live',
      homeTeam: 'Chelsea',
      awayTeam: 'Liverpool',
      matchDate: '2024-01-19T20:00:00Z'
    }
  ])

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (VALID_PINS.includes(pin)) {
      setIsAuthenticated(true)
      setPin('')
    } else {
      alert('Invalid PIN. Please try again.')
      setPin('')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <LockClosedIcon className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">Admin Access</h2>
            <p className="text-gray-600 mt-2">Enter your PIN to continue</p>
          </div>
          
          <form onSubmit={handlePinSubmit} className="space-y-6">
            <div>
              <label htmlFor="pin" className="sr-only">PIN</label>
              <input
                id="pin"
                name="pin"
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter PIN"
                maxLength={6}
              />
            </div>
            
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your sports news website</p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'articles', name: 'Articles', icon: NewspaperIcon },
              { id: 'livegames', name: 'Live Games', icon: PlayIcon },
              { id: 'clubs', name: 'Clubs', icon: TrophyIcon },
              { id: 'fixtures', name: 'Fixtures', icon: CalendarIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 inline mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {activeTab === 'articles' && 'Articles'}
                {activeTab === 'livegames' && 'Live Games'}
                {activeTab === 'clubs' && 'Clubs'}
                {activeTab === 'fixtures' && 'Fixtures'}
              </h2>
              <button
                onClick={() => alert('Add New functionality coming soon!')}
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add New
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Articles Tab */}
            {activeTab === 'articles' && (
              <div className="space-y-4">
                {articles.map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{article.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          article.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {article.status}
                        </span>
                        <span>{article.category}</span>
                        <span>{article.club}</span>
                        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-blue-400 hover:text-blue-600">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:text-red-600">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Live Games Tab */}
            {activeTab === 'livegames' && (
              <div className="space-y-4">
                {liveGames.map((game) => (
                  <div key={game.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{game.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          game.status === 'live' ? 'bg-red-100 text-red-800' :
                          game.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {game.status}
                        </span>
                        <span>{game.homeTeam} vs {game.awayTeam}</span>
                        <span>{new Date(game.matchDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-400 hover:text-blue-600">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:text-red-600">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Clubs Tab */}
            {activeTab === 'clubs' && (
              <div className="text-center py-12">
                <TrophyIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Manage Clubs</h3>
                <p className="text-gray-500">Add, edit, and manage football clubs</p>
              </div>
            )}

            {/* Fixtures Tab */}
            {activeTab === 'fixtures' && (
              <div className="text-center py-12">
                <CalendarIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Manage Fixtures</h3>
                <p className="text-gray-500">Schedule and manage match fixtures</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {articles.filter(a => a.status === 'published').length}
            </div>
            <div className="text-gray-600">Published Articles</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {articles.filter(a => a.status === 'draft').length}
            </div>
            <div className="text-gray-600">Draft Articles</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {liveGames.filter(g => g.status === 'live').length}
            </div>
            <div className="text-gray-600">Live Games</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {liveGames.filter(g => g.status === 'upcoming').length}
            </div>
            <div className="text-gray-600">Upcoming Games</div>
          </div>
        </div>
      </div>
    </div>
  )
}