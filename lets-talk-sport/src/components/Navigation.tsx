'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  NewspaperIcon, 
  PlayIcon, 
  TrophyIcon, 
  CalendarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Clubs News', href: '/clubs-news', icon: NewspaperIcon },
  { name: 'Live Games', href: '/live-games', icon: PlayIcon },
  { name: 'Leagues & Tables', href: '/leagues', icon: TrophyIcon },
  { name: 'Fixtures & Results', href: '/fixtures', icon: CalendarIcon },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <ShieldCheckIcon className="h-8 w-8 text-red-600" />
          <span className="text-xl font-bold text-gray-900">Let&apos;s Talk Sport</span>
        </div>
      </div>
      
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-red-50 text-red-700 border-r-2 border-red-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </Link>
            )
          })}
        </div>
      </nav>
      
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <p>© 2024 Let&apos;s Talk Sport</p>
          <p>Professional Sports News</p>
        </div>
      </div>
    </div>
  )
}