'use client'

import { useState } from 'react'
import { 
  TrophyIcon, 
  UserIcon, 
  FireIcon
} from '@heroicons/react/24/outline'

// Mock data - replace with actual data from database
const leagues = [
  {
    id: '1',
    name: 'Premier League',
    country: 'England',
    logo: '/api/placeholder/40/40',
    season: '2023/24'
  },
  {
    id: '2',
    name: 'La Liga',
    country: 'Spain',
    logo: '/api/placeholder/40/40',
    season: '2023/24'
  },
  {
    id: '3',
    name: 'Bundesliga',
    country: 'Germany',
    logo: '/api/placeholder/40/40',
    season: '2023/24'
  },
  {
    id: '4',
    name: 'Serie A',
    country: 'Italy',
    logo: '/api/placeholder/40/40',
    season: '2023/24'
  }
]

const premierLeagueTable = [
  { position: 1, team: 'Arsenal', played: 20, won: 15, drawn: 3, lost: 2, goalsFor: 42, goalsAgainst: 18, points: 48, form: ['W', 'W', 'D', 'W', 'W'] },
  { position: 2, team: 'Manchester City', played: 20, won: 14, drawn: 3, lost: 3, goalsFor: 45, goalsAgainst: 21, points: 45, form: ['W', 'W', 'W', 'D', 'W'] },
  { position: 3, team: 'Manchester United', played: 20, won: 13, drawn: 4, lost: 3, goalsFor: 38, goalsAgainst: 22, points: 43, form: ['W', 'D', 'W', 'W', 'L'] },
  { position: 4, team: 'Newcastle', played: 20, won: 12, drawn: 5, lost: 3, goalsFor: 35, goalsAgainst: 18, points: 41, form: ['W', 'W', 'D', 'W', 'D'] },
  { position: 5, team: 'Tottenham', played: 20, won: 11, drawn: 4, lost: 5, goalsFor: 40, goalsAgainst: 31, points: 37, form: ['L', 'W', 'W', 'D', 'W'] },
  { position: 6, team: 'Liverpool', played: 20, won: 10, drawn: 5, lost: 5, goalsFor: 36, goalsAgainst: 25, points: 35, form: ['D', 'W', 'L', 'W', 'W'] },
  { position: 7, team: 'Brighton', played: 20, won: 10, drawn: 4, lost: 6, goalsFor: 32, goalsAgainst: 28, points: 34, form: ['W', 'L', 'W', 'D', 'W'] },
  { position: 8, team: 'Chelsea', played: 20, won: 9, drawn: 5, lost: 6, goalsFor: 30, goalsAgainst: 25, points: 32, form: ['L', 'W', 'D', 'W', 'L'] }
]

const topScorers = [
  { position: 1, player: 'Erling Haaland', team: 'Manchester City', goals: 18, assists: 4, total: 22 },
  { position: 2, player: 'Harry Kane', team: 'Tottenham', goals: 16, assists: 3, total: 19 },
  { position: 3, player: 'Marcus Rashford', team: 'Manchester United', goals: 14, assists: 5, total: 19 },
  { position: 4, player: 'Bukayo Saka', team: 'Arsenal', goals: 12, assists: 7, total: 19 },
  { position: 5, player: 'Mohamed Salah', team: 'Liverpool', goals: 11, assists: 6, total: 17 }
]

const topAssists = [
  { position: 1, player: 'Kevin De Bruyne', team: 'Manchester City', assists: 12, goals: 3, total: 15 },
  { position: 2, player: 'Bukayo Saka', team: 'Arsenal', assists: 7, goals: 12, total: 19 },
  { position: 3, player: 'Bruno Fernandes', team: 'Manchester United', assists: 6, goals: 8, total: 14 },
  { position: 4, player: 'James Maddison', team: 'Tottenham', assists: 6, goals: 5, total: 11 },
  { position: 5, player: 'Marcus Rashford', team: 'Manchester United', assists: 5, goals: 14, total: 19 }
]

export default function LeaguesPage() {
  const [selectedLeague, setSelectedLeague] = useState('Premier League')
  const [activeTab, setActiveTab] = useState('table')

  const getFormColor = (result: string) => {
    switch (result) {
      case 'W': return 'bg-green-500'
      case 'D': return 'bg-yellow-500'
      case 'L': return 'bg-red-500'
      default: return 'bg-gray-300'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Leagues & Tables</h1>
        <p className="text-gray-600 mt-2">League standings, top scorers, and statistics</p>
      </div>

      {/* League Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select League</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {leagues.map((league) => (
            <button
              key={league.id}
              onClick={() => setSelectedLeague(league.name)}
              className={`p-4 rounded-lg border transition-all ${
                selectedLeague === league.name
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2"></div>
                <h3 className="font-medium text-gray-900">{league.name}</h3>
                <p className="text-sm text-gray-500">{league.country}</p>
                <p className="text-xs text-gray-400">{league.season}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'table', name: 'League Table', icon: TrophyIcon },
              { id: 'scorers', name: 'Top Scorers', icon: FireIcon },
              { id: 'assists', name: 'Top Assists', icon: UserIcon }
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

        <div className="p-6">
          {/* League Table */}
          {activeTab === 'table' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{selectedLeague} Table</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pos</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                      <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">P</th>
                      <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">W</th>
                      <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">D</th>
                      <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">L</th>
                      <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">GF</th>
                      <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">GA</th>
                      <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">GD</th>
                      <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Pts</th>
                      <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Form</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {premierLeagueTable.map((team) => (
                      <tr key={team.position} className="hover:bg-gray-50">
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {team.position}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {team.team}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{team.played}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{team.won}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{team.drawn}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{team.lost}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{team.goalsFor}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{team.goalsAgainst}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{team.goalsFor - team.goalsAgainst}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-center">{team.points}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          <div className="flex space-x-1">
                            {team.form.map((result, index) => (
                              <div
                                key={index}
                                className={`w-3 h-3 rounded-full ${getFormColor(result)}`}
                                title={result === 'W' ? 'Win' : result === 'D' ? 'Draw' : 'Loss'}
                              ></div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Top Scorers */}
          {activeTab === 'scorers' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Scorers</h3>
              <div className="space-y-3">
                {topScorers.map((scorer) => (
                  <div key={scorer.position} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {scorer.position}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{scorer.player}</div>
                        <div className="text-sm text-gray-500">{scorer.team}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{scorer.goals}</div>
                      <div className="text-sm text-gray-500">goals</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Assists */}
          {activeTab === 'assists' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Assists</h3>
              <div className="space-y-3">
                {topAssists.map((assister) => (
                  <div key={assister.position} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {assister.position}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{assister.player}</div>
                        <div className="text-sm text-gray-500">{assister.team}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{assister.assists}</div>
                      <div className="text-sm text-gray-500">assists</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}