'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Flame, 
  Trophy, 
  Target, 
  BookOpen, 
  ChevronRight,
  Zap,
  Medal,
  Star,
  TrendingUp,
  Clock,
  Award
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

// Subject data with colors
const subjects = [
  { name: 'Mathematics', icon: '📐', color: 'from-blue-500 to-cyan-500', progress: 65 },
  { name: 'Physics', icon: '⚡', color: 'from-amber-500 to-orange-500', progress: 42 },
  { name: 'Chemistry', icon: '🧪', color: 'from-green-500 to-emerald-500', progress: 38 },
  { name: 'Biology', icon: '🧬', color: 'from-pink-500 to-rose-500', progress: 55 },
  { name: 'Science', icon: '🔬', color: 'from-purple-500 to-violet-500', progress: 71 },
  { name: 'Geography', icon: '🌍', color: 'from-teal-500 to-cyan-500', progress: 28 },
]

export default function DashboardPage() {
  const router = useRouter()
  const { user, profile, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#131F24]">
        <div className="w-12 h-12 border-4 border-[#58CC02] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return null

  // Mock stats - these would come from the API
  const stats = {
    totalXP: 12450,
    currentStreak: 7,
    questionsToday: 24,
    accuracy: 78,
    level: 12,
    rank: 156,
  }

  return (
    <div className="min-h-screen bg-[#131F24]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#1e2d36] border-b border-[#2a3f4d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#58CC02] to-[#4CAF00] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Questly</span>
            </Link>
            
            <div className="flex items-center gap-6">
              {/* Streak */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF9600]/20 border border-[#FF9600]/30">
                <Flame className="w-5 h-5 text-[#FF9600]" />
                <span className="font-bold text-[#FF9600]">{stats.currentStreak}</span>
              </div>
              
              {/* XP */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/30">
                <Zap className="w-5 h-5 text-[#FFD700]" />
                <span className="font-bold text-[#FFD700]">{stats.totalXP.toLocaleString()}</span>
              </div>
              
              {/* Profile */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#58CC02] to-[#1CB0F6] flex items-center justify-center text-white font-bold">
                  {profile?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'Student'}! 👋
          </h1>
          <p className="text-gray-400">Ready to learn something new today?</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Daily Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#FF9600] to-[#FF6B00] rounded-2xl p-5 text-white"
          >
            <Flame className="w-8 h-8 mb-3" />
            <div className="text-3xl font-bold">{stats.currentStreak}</div>
            <div className="text-sm opacity-80">Day Streak</div>
          </motion.div>

          {/* Total XP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-2xl p-5 text-white"
          >
            <Zap className="w-8 h-8 mb-3" />
            <div className="text-3xl font-bold">{stats.totalXP.toLocaleString()}</div>
            <div className="text-sm opacity-80">Total XP</div>
          </motion.div>

          {/* Today's Questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#1CB0F6] to-[#0090D9] rounded-2xl p-5 text-white"
          >
            <Target className="w-8 h-8 mb-3" />
            <div className="text-3xl font-bold">{stats.questionsToday}</div>
            <div className="text-sm opacity-80">Questions Today</div>
          </motion.div>

          {/* Accuracy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-gradient-to-br from-[#58CC02] to-[#4CAF00] rounded-2xl p-5 text-white"
          >
            <Award className="w-8 h-8 mb-3" />
            <div className="text-3xl font-bold">{stats.accuracy}%</div>
            <div className="text-sm opacity-80">Accuracy</div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Subjects - Main Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#1e2d36] rounded-2xl border border-[#2a3f4d] p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Continue Learning</h2>
                <Link href="/questions" className="text-[#58CC02] text-sm font-semibold hover:underline">
                  View All
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {subjects.map((subject, index) => (
                  <motion.div
                    key={subject.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="group cursor-pointer"
                  >
                    <div className="bg-[#131F24] rounded-xl p-4 border border-[#2a3f4d] hover:border-[#58CC02] transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                          {subject.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1">{subject.name}</h3>
                          <div className="w-full h-2 bg-[#2a3f4d] rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${subject.color} rounded-full transition-all`}
                              style={{ width: `${subject.progress}%` }}
                            />
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-[#58CC02] transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Practice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 bg-gradient-to-r from-[#58CC02] to-[#4CAF00] rounded-2xl p-6 flex items-center justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Daily Challenge</h3>
                <p className="text-white/80">Complete 10 questions to maintain your streak!</p>
              </div>
              <Link 
                href="/questions"
                className="bg-white text-[#58CC02] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                Start Now
              </Link>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Level Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-[#1e2d36] rounded-2xl border border-[#2a3f4d] p-6"
            >
              <h3 className="font-bold text-white mb-4">Your Level</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#CE82FF] to-[#9B4DFF] flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{stats.level}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-[#CE82FF] font-semibold">2,450 / 5,000 XP</span>
                  </div>
                  <div className="w-full h-3 bg-[#131F24] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#CE82FF] to-[#9B4DFF] rounded-full" style={{ width: '49%' }} />
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400">2,550 XP to next level</p>
            </motion.div>

            {/* Leaderboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#1e2d36] rounded-2xl border border-[#2a3f4d] p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">Leaderboard</h3>
                <Link href="/leaderboard" className="text-[#58CC02] text-sm font-semibold hover:underline">
                  View All
                </Link>
              </div>
              
              <div className="flex items-center gap-3 bg-[#131F24] rounded-xl p-3 border border-[#FFD700]/30">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-400">Your Rank</div>
                  <div className="font-bold text-white">#{stats.rank} Global</div>
                </div>
                <TrendingUp className="w-5 h-5 text-[#58CC02]" />
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="bg-[#1e2d36] rounded-2xl border border-[#2a3f4d] p-6"
            >
              <h3 className="font-bold text-white mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FF9600]/20 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-[#FF9600]" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">7 Day Streak!</div>
                    <div className="text-xs text-gray-500">Keep it up!</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#58CC02]/20 flex items-center justify-center">
                    <Star className="w-5 h-5 text-[#58CC02]" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">100 Questions</div>
                    <div className="text-xs text-gray-500">Milestone reached!</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
