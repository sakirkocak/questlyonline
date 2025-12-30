'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Trophy, 
  Medal, 
  Crown,
  Globe,
  MapPin,
  Sparkles,
  Filter,
  ChevronDown,
  Flame,
  Target,
  Star
} from 'lucide-react'
import { getGlobalLeaderboard, isTypesenseEnabled } from '@/lib/typesense/browser-client'

// Country data
const countries = [
  { code: 'all', name: 'All Countries', flag: '🌍' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪' },
]

interface LeaderboardEntry {
  student_id: string
  full_name: string
  avatar_url?: string
  total_points: number
  total_questions: number
  total_correct: number
  max_streak: number
  current_streak: number
  country_code?: string
  country_name?: string
  city_global_name?: string
  grade: number
}

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState('all')
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)

  // Load leaderboard
  const loadLeaderboard = async () => {
    setLoading(true)
    try {
      if (isTypesenseEnabled()) {
        const result = await getGlobalLeaderboard({
          country_code: selectedCountry === 'all' ? undefined : selectedCountry,
          limit: 100,
        })
        setLeaders(result.leaders)
      } else {
        // Demo data for development
        setLeaders([
          { student_id: '1', full_name: 'Aarav Sharma', total_points: 15420, total_questions: 1250, total_correct: 1100, max_streak: 45, current_streak: 12, country_code: 'IN', country_name: 'India', city_global_name: 'Mumbai', grade: 10 },
          { student_id: '2', full_name: 'Fatima Ahmed', total_points: 14850, total_questions: 1180, total_correct: 1050, max_streak: 38, current_streak: 8, country_code: 'PK', country_name: 'Pakistan', city_global_name: 'Lahore', grade: 9 },
          { student_id: '3', full_name: 'Oluwaseun Adeyemi', total_points: 13920, total_questions: 1100, total_correct: 980, max_streak: 42, current_streak: 15, country_code: 'NG', country_name: 'Nigeria', city_global_name: 'Lagos', grade: 11 },
          { student_id: '4', full_name: 'Priya Patel', total_points: 12780, total_questions: 1050, total_correct: 920, max_streak: 35, current_streak: 5, country_code: 'IN', country_name: 'India', city_global_name: 'Delhi', grade: 10 },
          { student_id: '5', full_name: 'Mohammed Rahman', total_points: 11650, total_questions: 980, total_correct: 850, max_streak: 28, current_streak: 0, country_code: 'BD', country_name: 'Bangladesh', city_global_name: 'Dhaka', grade: 8 },
        ])
      }
    } catch (error) {
      console.error('Leaderboard error:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadLeaderboard()
  }, [selectedCountry])

  // Get rank icon
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />
    return <span className="text-gray-500 font-semibold">{rank}</span>
  }

  // Get rank background
  const getRankBg = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/10 border-yellow-500/30'
    if (rank === 2) return 'bg-gradient-to-r from-gray-400/20 to-gray-500/10 border-gray-400/30'
    if (rank === 3) return 'bg-gradient-to-r from-amber-600/20 to-orange-500/10 border-amber-600/30'
    return 'bg-[var(--bg-card)] border-[var(--border-default)]'
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Questly</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link href="/questions" className="btn-secondary text-sm">
                Practice
              </Link>
              <Link href="/login" className="btn-primary text-sm">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center"
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">Global Leaderboard</h1>
            <p className="text-gray-400">Top students from around the world</p>
          </div>

          {/* Filters */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <button
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-default)] hover:border-[var(--border-hover)] transition-colors"
              >
                <Globe className="w-4 h-4 text-gray-400" />
                <span>{countries.find(c => c.code === selectedCountry)?.flag}</span>
                <span>{countries.find(c => c.code === selectedCountry)?.name}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              
              {showCountryDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-xl overflow-hidden shadow-xl z-50"
                >
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => {
                        setSelectedCountry(country.code)
                        setShowCountryDropdown(false)
                      }}
                      className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-[var(--bg-hover)] transition-colors ${
                        selectedCountry === country.code ? 'bg-primary-500/20 text-primary-300' : ''
                      }`}
                    >
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Leaderboard */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : leaders.length === 0 ? (
            <div className="text-center py-20">
              <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No students yet</h3>
              <p className="text-gray-400">Be the first to join the leaderboard!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {leaders.map((leader, index) => (
                <motion.div
                  key={leader.student_id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-xl border ${getRankBg(index + 1)}`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="w-10 h-10 flex items-center justify-center">
                      {getRankIcon(index + 1)}
                    </div>
                    
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-lg font-bold">
                      {leader.full_name.charAt(0)}
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">{leader.full_name}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        {leader.country_name && (
                          <span className="flex items-center gap-1">
                            <span>{countries.find(c => c.code === leader.country_code)?.flag || '🌍'}</span>
                            {leader.country_name}
                          </span>
                        )}
                        {leader.city_global_name && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {leader.city_global_name}
                          </span>
                        )}
                        <span>Grade {leader.grade}</span>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-6 text-right">
                      {/* Streak */}
                      {leader.current_streak > 0 && (
                        <div className="hidden sm:block">
                          <div className="flex items-center gap-1 text-orange-400">
                            <Flame className="w-4 h-4" />
                            <span className="font-semibold">{leader.current_streak}</span>
                          </div>
                          <div className="text-xs text-gray-500">Streak</div>
                        </div>
                      )}
                      
                      {/* Questions */}
                      <div className="hidden sm:block">
                        <div className="font-semibold text-gray-300">{leader.total_questions.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Questions</div>
                      </div>
                      
                      {/* Points */}
                      <div>
                        <div className="font-bold text-lg bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                          {leader.total_points.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">XP</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
