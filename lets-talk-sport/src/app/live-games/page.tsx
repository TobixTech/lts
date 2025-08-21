'use client'

import { useState } from 'react'
import { 
  PlayIcon, 
  ClockIcon, 
  CheckCircleIcon,
  CalendarIcon 
} from '@heroicons/react/24/outline'

// Mock data - replace with actual data from database
const games = [
  {
    id: '1',
    title: 'Manchester United vs Arsenal',
    homeTeam: 'Manchester United',
    awayTeam: 'Arsenal',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    matchDate: '2024-01-20T15:00:00Z',
    status: 'UPCOMING',
    description: 'Premier League clash between two title contenders',
    league: 'Premier League'
  },
  {
    id: '2',
    title: 'Chelsea vs Liverpool',
    homeTeam: 'Chelsea',
    awayTeam: 'Liverpool',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    matchDate: '2024-01-19T20:00:00Z',
    status: 'LIVE',
    description: 'Live coverage of this exciting Premier League match',
    league: 'Premier League'
  },
  {
    id: '3',
    title: 'Manchester City vs Tottenham',
    homeTeam: 'Manchester City',
    awayTeam: 'Tottenham',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    matchDate: '2024-01-18T19:45:00Z',
    status: 'FINISHED',
    description: 'Final score: Manchester City 2-1 Tottenham',
    league: 'Premier League'
  },
  {
    id: '4',
    title: 'Real Madrid vs Barcelona',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    matchDate: '2024-01-22T21:00:00Z',
    status: 'UPCOMING',
    description: 'El Clásico - The biggest rivalry in football',
    league: 'La Liga'
  }
]

const statusColors = {
  UPCOMING: 'bg-blue-100 text-blue-800',
  LIVE: 'bg-red-100 text-red-800',
  FINISHED: 'bg-green-100 text-green-800'
}

const statusIcons = {
  UPCOMING: ClockIcon,
  LIVE: PlayIcon,
  FINISHED: CheckCircleIcon
}

export default function LiveGamesPage() {
  const [selectedGame, setSelectedGame] = useState(games[1]) // Default to live game
  const [activeTab, setActiveTab] = useState('LIVE')

  const filteredGames = games.filter(game => {
    if (activeTab === 'ALL') return true
    return game.status === activeTab
  })

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Live Games</h1>
        <p className="text-gray-600 mt-2">Watch live matches and catch up on recent games</p>
      </div>

      {/* Status Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex space-x-1">
          {['ALL', 'LIVE', 'UPCOMING', 'FINISHED'].map((status) => {
            const count = games.filter(game => status === 'ALL' || game.status === status).length
            return (
              <button
                key={status}
                onClick={() => setActiveTab(status)}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === status
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status} ({count})
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Games List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Games</h2>
          {filteredGames.map((game) => {
            const StatusIcon = statusIcons[game.status as keyof typeof statusIcons]
            const isSelected = selectedGame.id === game.id
            
            return (
              <div
                key={game.id}
                onClick={() => setSelectedGame(game)}
                className={`bg-white rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? 'border-red-500 shadow-md' : 'border-gray-200'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[game.status as keyof typeof statusColors]}`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {game.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {game.league}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {game.title}
                  </h3>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {new Date(game.matchDate).toLocaleDateString()}
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {game.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Video Player */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {selectedGame.title}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[selectedGame.status as keyof typeof statusColors]}`}>
                  {(() => {
                    const StatusIcon = statusIcons[selectedGame.status as keyof typeof statusIcons]
                    return (
                      <>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {selectedGame.status}
                      </>
                    )
                  })()}
                </span>
                <span>{selectedGame.league}</span>
                <span>{new Date(selectedGame.matchDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src={selectedGame.youtubeUrl}
                title={selectedGame.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="mt-4">
              <p className="text-gray-700">{selectedGame.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Games */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Games This Week</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games
            .filter(game => game.status === 'UPCOMING')
            .slice(0, 6)
            .map((game) => (
              <div key={game.id} className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-2">{game.league}</div>
                <h3 className="font-medium text-gray-900 mb-2">{game.title}</h3>
                <div className="text-sm text-gray-600">
                  {new Date(game.matchDate).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}