'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Trophy, 
  Medal, 
  Crown,
  Globe,
  MapPin,
  Sparkles,
  ChevronDown,
  Flame,
  Target,
  Star,
  Users,
  TrendingUp,
  Filter
} from 'lucide-react'
import { getGlobalLeaderboard, isTypesenseEnabled } from '@/lib/typesense/browser-client'

// Comprehensive country list for filter
const regions = [
  { 
    name: 'Global',
    countries: [{ code: 'all', name: 'All Countries', flag: '🌍' }]
  },
  {
    name: 'Asia',
    countries: [
      { code: 'IN', name: 'India', flag: '🇮🇳' },
      { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
      { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
      { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
      { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
      { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
      { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
      { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
      { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
      { code: 'JP', name: 'Japan', flag: '🇯🇵' },
      { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
      { code: 'CN', name: 'China', flag: '🇨🇳' },
      { code: 'AE', name: 'UAE', flag: '🇦🇪' },
      { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
    ]
  },
  {
    name: 'Europe',
    countries: [
      { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
      { code: 'DE', name: 'Germany', flag: '🇩🇪' },
      { code: 'FR', name: 'France', flag: '🇫🇷' },
      { code: 'IT', name: 'Italy', flag: '🇮🇹' },
      { code: 'ES', name: 'Spain', flag: '🇪🇸' },
      { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
      { code: 'PL', name: 'Poland', flag: '🇵🇱' },
      { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
      { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
      { code: 'RU', name: 'Russia', flag: '🇷🇺' },
    ]
  },
  {
    name: 'Americas',
    countries: [
      { code: 'US', name: 'United States', flag: '🇺🇸' },
      { code: 'CA', name: 'Canada', flag: '🇨🇦' },
      { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
      { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
      { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
      { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
      { code: 'CL', name: 'Chile', flag: '🇨🇱' },
      { code: 'PE', name: 'Peru', flag: '🇵🇪' },
    ]
  },
  {
    name: 'Africa',
    countries: [
      { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
      { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
      { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
      { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
      { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
      { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
    ]
  },
  {
    name: 'Oceania',
    countries: [
      { code: 'AU', name: 'Australia', flag: '🇦🇺' },
      { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
    ]
  }
]

// Flatten for easy lookup
const allCountries = regions.flatMap(r => r.countries)

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

  // Get selected country info
  const selectedCountryInfo = allCountries.find(c => c.code === selectedCountry)

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
          { student_id: '1', full_name: 'Aarav Sharma', total_points: 154200, total_questions: 12500, total_correct: 11000, max_streak: 45, current_streak: 12, country_code: 'IN', country_name: 'India', city_global_name: 'Mumbai', grade: 10 },
          { student_id: '2', full_name: 'Fatima Ahmed', total_points: 148500, total_questions: 11800, total_correct: 10500, max_streak: 38, current_streak: 8, country_code: 'PK', country_name: 'Pakistan', city_global_name: 'Lahore', grade: 9 },
          { student_id: '3', full_name: 'Oluwaseun Adeyemi', total_points: 139200, total_questions: 11000, total_correct: 9800, max_streak: 42, current_streak: 15, country_code: 'NG', country_name: 'Nigeria', city_global_name: 'Lagos', grade: 11 },
          { student_id: '4', full_name: 'Priya Patel', total_points: 127800, total_questions: 10500, total_correct: 9200, max_streak: 35, current_streak: 5, country_code: 'IN', country_name: 'India', city_global_name: 'Delhi', grade: 10 },
          { student_id: '5', full_name: 'Mohammed Rahman', total_points: 116500, total_questions: 9800, total_correct: 8500, max_streak: 28, current_streak: 0, country_code: 'BD', country_name: 'Bangladesh', city_global_name: 'Dhaka', grade: 8 },
          { student_id: '6', full_name: 'James Wilson', total_points: 98700, total_questions: 8200, total_correct: 7100, max_streak: 22, current_streak: 3, country_code: 'US', country_name: 'United States', city_global_name: 'New York', grade: 9 },
          { student_id: '7', full_name: 'Emma Thompson', total_points: 87400, total_questions: 7500, total_correct: 6400, max_streak: 19, current_streak: 7, country_code: 'GB', country_name: 'United Kingdom', city_global_name: 'London', grade: 10 },
          { student_id: '8', full_name: 'Chen Wei', total_points: 76200, total_questions: 6800, total_correct: 5900, max_streak: 25, current_streak: 11, country_code: 'CN', country_name: 'China', city_global_name: 'Beijing', grade: 11 },
          { student_id: '9', full_name: 'Maria Santos', total_points: 65800, total_questions: 5900, total_correct: 5100, max_streak: 17, current_streak: 4, country_code: 'BR', country_name: 'Brazil', city_global_name: 'Sao Paulo', grade: 8 },
          { student_id: '10', full_name: 'Ahmed Hassan', total_points: 54300, total_questions: 4800, total_correct: 4200, max_streak: 14, current_streak: 9, country_code: 'EG', country_name: 'Egypt', city_global_name: 'Cairo', grade: 9 },
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

  // Get rank styling
  const getRankStyle = (rank: number) => {
    if (rank === 1) return {
      bg: 'bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/10',
      border: 'border-[#FFD700]/40',
      icon: <Crown className="w-7 h-7 text-[#FFD700]" />,
      shadow: 'shadow-[#FFD700]/20'
    }
    if (rank === 2) return {
      bg: 'bg-gradient-to-r from-gray-400/20 to-gray-500/10',
      border: 'border-gray-400/40',
      icon: <Medal className="w-6 h-6 text-gray-300" />,
      shadow: ''
    }
    if (rank === 3) return {
      bg: 'bg-gradient-to-r from-amber-600/20 to-orange-500/10',
      border: 'border-amber-600/40',
      icon: <Medal className="w-6 h-6 text-amber-600" />,
      shadow: ''
    }
    return {
      bg: 'bg-[#1e2d36]',
      border: 'border-[#2a3f4d]',
      icon: <span className="text-gray-500 font-bold text-lg">{rank}</span>,
      shadow: ''
    }
  }

  return (
    <div className="min-h-screen bg-[#131F24]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1e2d36]/95 backdrop-blur-md border-b border-[#2a3f4d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#58CC02] to-[#4CAF00] flex items-center justify-center shadow-lg shadow-[#58CC02]/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Questly</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link href="/questions" className="px-4 py-2 rounded-xl font-bold text-white hover:bg-[#2a3f4d] transition-colors">
                Practice
              </Link>
              <Link href="/login" className="px-5 py-2.5 rounded-xl font-bold bg-gradient-to-r from-[#58CC02] to-[#4CAF00] text-white shadow-lg shadow-[#58CC02]/30">
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
              className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-xl shadow-[#FFD700]/30"
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-4xl font-extrabold text-white mb-3">Global Leaderboard</h1>
            <p className="text-gray-400">Top students from around the world</p>
          </div>

          {/* Country Filter */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <button
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#1e2d36] border-2 border-[#2a3f4d] hover:border-[#58CC02] transition-all min-w-[200px]"
              >
                <Globe className="w-5 h-5 text-[#58CC02]" />
                <span className="text-2xl">{selectedCountryInfo?.flag}</span>
                <span className="font-semibold text-white flex-1 text-left">{selectedCountryInfo?.name}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showCountryDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-[#1e2d36] border border-[#2a3f4d] rounded-2xl overflow-hidden shadow-2xl z-50 max-h-96 overflow-y-auto"
                  >
                    {regions.map((region) => (
                      <div key={region.name}>
                        <div className="px-4 py-2 bg-[#131F24] text-xs font-bold text-gray-500 uppercase tracking-wider">
                          {region.name}
                        </div>
                        {region.countries.map((country) => (
                          <button
                            key={country.code}
                            onClick={() => {
                              setSelectedCountry(country.code)
                              setShowCountryDropdown(false)
                            }}
                            className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-[#2a3f4d] transition-colors ${
                              selectedCountry === country.code ? 'bg-[#58CC02]/20 text-[#58CC02]' : 'text-white'
                            }`}
                          >
                            <span className="text-xl">{country.flag}</span>
                            <span className="font-medium">{country.name}</span>
                          </button>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Leaderboard */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#58CC02] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : leaders.length === 0 ? (
            <div className="text-center py-20">
              <Trophy className="w-20 h-20 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No students yet</h3>
              <p className="text-gray-400">Be the first to join the leaderboard!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {leaders.map((leader, index) => {
                const rankStyle = getRankStyle(index + 1)
                return (
                  <motion.div
                    key={leader.student_id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={`p-4 rounded-2xl border-2 ${rankStyle.bg} ${rankStyle.border} ${rankStyle.shadow} hover:scale-[1.01] transition-transform`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <div className="w-12 h-12 flex items-center justify-center">
                        {rankStyle.icon}
                      </div>
                      
                      {/* Avatar */}
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#58CC02] to-[#1CB0F6] flex items-center justify-center text-xl font-bold text-white shadow-lg">
                        {leader.full_name.charAt(0)}
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-lg truncate">{leader.full_name}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          {leader.country_code && (
                            <span className="flex items-center gap-1">
                              <span>{allCountries.find(c => c.code === leader.country_code)?.flag || '🌍'}</span>
                              {leader.country_name}
                            </span>
                          )}
                          {leader.city_global_name && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {leader.city_global_name}
                            </span>
                          )}
                          <span className="text-[#1CB0F6]">Grade {leader.grade}</span>
                        </div>
                      </div>
                      
                      {/* Stats */}
                      <div className="flex items-center gap-6 text-right">
                        {/* Streak */}
                        {leader.current_streak > 0 && (
                          <div className="hidden sm:block">
                            <div className="flex items-center justify-end gap-1 text-[#FF9600]">
                              <Flame className="w-5 h-5" />
                              <span className="font-bold text-lg">{leader.current_streak}</span>
                            </div>
                            <div className="text-xs text-gray-500">Streak</div>
                          </div>
                        )}
                        
                        {/* Questions */}
                        <div className="hidden sm:block">
                          <div className="font-bold text-lg text-gray-300">{leader.total_questions.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">Questions</div>
                        </div>
                        
                        {/* XP Points */}
                        <div>
                          <div className="font-extrabold text-xl bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
                            {leader.total_points.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">XP</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
