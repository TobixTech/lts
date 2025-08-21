'use client'

import { useState } from 'react'
import { 
  CalendarIcon, 
  MapPinIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

// Mock data - replace with actual data from database
const fixtures = [
  {
    id: '1',
    homeTeam: 'Manchester United',
    awayTeam: 'Arsenal',
    homeScore: null,
    awayScore: null,
    matchDate: '2024-01-20T15:00:00Z',
    status: 'SCHEDULED',
    league: 'Premier League',
    venue: 'Old Trafford',
    kickOff: '15:00',
    hasReport: false
  },
  {
    id: '2',
    homeTeam: 'Chelsea',
    awayTeam: 'Liverpool',
    homeScore: 2,
    awayScore: 1,
    matchDate: '2024-01-19T20:00:00Z',
    status: 'FINISHED',
    league: 'Premier League',
    venue: 'Stamford Bridge',
    kickOff: '20:00',
    hasReport: true
  },
  {
    id: '3',
    homeTeam: 'Manchester City',
    awayTeam: 'Tottenham',
    homeScore: 3,
    awayScore: 0,
    matchDate: '2024-01-18T19:45:00Z',
    status: 'FINISHED',
    league: 'Premier League',
    venue: 'Etihad Stadium',
    kickOff: '19:45',
    hasReport: true
  },
  {
    id: '4',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    homeScore: null,
    awayScore: null,
    matchDate: '2024-01-22T21:00:00Z',
    status: 'SCHEDULED',
    league: 'La Liga',
    venue: 'Santiago Bernabéu',
    kickOff: '21:00',
    hasReport: false
  },
  {
    id: '5',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    homeScore: 2,
    awayScore: 2,
    matchDate: '2024-01-17T20:30:00Z',
    status: 'FINISHED',
    league: 'Bundesliga',
    venue: 'Allianz Arena',
    kickOff: '20:30',
    hasReport: true
  },
  {
    id: '6',
    homeTeam: 'AC Milan',
    awayTeam: 'Inter Milan',
    homeScore: null,
    awayScore: null,
    matchDate: '2024-01-21T20:45:00Z',
    status: 'SCHEDULED',
    league: 'Serie A',
    venue: 'San Siro',
    kickOff: '20:45',
    hasReport: false
  }
]

const leagues = [
  'All Leagues',
  'Premier League',
  'La Liga',
  'Bundesliga',
  'Serie A',
  'Champions League',
  'Europa League'
]

const statusColors = {
  SCHEDULED: 'bg-blue-100 text-blue-800',
  LIVE: 'bg-red-100 text-red-800',
  FINISHED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-gray-100 text-gray-800'
}

export default function FixturesPage() {
  const [selectedLeague, setSelectedLeague] = useState('All Leagues')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedDate, setSelectedDate] = useState('all')

  const filteredFixtures = fixtures.filter(fixture => {
    const leagueMatch = selectedLeague === 'All Leagues' || fixture.league === selectedLeague
    const statusMatch = selectedStatus === 'All' || fixture.status === selectedStatus
    return leagueMatch && statusMatch
  })

  const getStatusText = (status: string) => {
    switch (status) {
      case 'SCHEDULED': return 'Scheduled'
      case 'LIVE': return 'Live'
      case 'FINISHED': return 'Finished'
      case 'CANCELLED': return 'Cancelled'
      default: return status
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }



  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fixtures & Results</h1>
        <p className="text-gray-600 mt-2">Match schedules, kick-off times, and final scores</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* League Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">League</label>
            <select
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
            >
              {leagues.map((league) => (
                <option key={league} value={league}>{league}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
            >
              <option value="All">All</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="LIVE">Live</option>
              <option value="FINISHED">Finished</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Fixtures List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Matches</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredFixtures.map((fixture) => (
            <div key={fixture.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                {/* Match Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[fixture.status as keyof typeof statusColors]}`}>
                      {getStatusText(fixture.status)}
                    </span>
                    <span className="text-sm text-gray-500">{fixture.league}</span>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {fixture.venue}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    {/* Home Team */}
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
                      <div className="font-medium text-gray-900">{fixture.homeTeam}</div>
                    </div>
                    
                    {/* Score/Time */}
                    <div className="text-center">
                      {fixture.status === 'FINISHED' ? (
                        <div className="text-2xl font-bold text-gray-900">
                          {fixture.homeScore} - {fixture.awayScore}
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-sm text-gray-500 mb-1">Kick-off</div>
                          <div className="text-xl font-semibold text-gray-900">{fixture.kickOff}</div>
                        </div>
                      )}
                      
                      <div className="text-sm text-gray-500 mt-2">
                        {formatDate(fixture.matchDate)}
                      </div>
                    </div>
                    
                    {/* Away Team */}
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
                      <div className="font-medium text-gray-900">{fixture.awayTeam}</div>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="ml-6 flex flex-col items-end space-y-2">
                  {fixture.hasReport && (
                    <button className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      Match Report
                    </button>
                  )}
                  
                  {fixture.status === 'SCHEDULED' && (
                    <button className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      Add to Calendar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {fixtures.filter(f => f.status === 'SCHEDULED').length}
          </div>
          <div className="text-gray-600">Upcoming Matches</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">
            {fixtures.filter(f => f.status === 'LIVE').length}
          </div>
          <div className="text-gray-600">Live Matches</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {fixtures.filter(f => f.status === 'FINISHED').length}
          </div>
          <div className="text-gray-600">Completed Matches</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {fixtures.filter(f => f.hasReport).length}
          </div>
          <div className="text-gray-600">Match Reports</div>
        </div>
      </div>
    </div>
  )
}