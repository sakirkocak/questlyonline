'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Brain, 
  Trophy, 
  Users, 
  BookOpen,
  Zap,
  Globe,
  ArrowRight,
  Play,
  Star,
  Target,
  Flame,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'

// Subject data
const subjects = [
  { name: 'Mathematics', icon: '📐', color: 'from-blue-500 to-blue-600', questions: '10,000+' },
  { name: 'Physics', icon: '⚡', color: 'from-amber-500 to-orange-600', questions: '5,000+' },
  { name: 'Chemistry', icon: '🧪', color: 'from-green-500 to-emerald-600', questions: '5,000+' },
  { name: 'Biology', icon: '🧬', color: 'from-pink-500 to-rose-600', questions: '5,000+' },
  { name: 'Science', icon: '🔬', color: 'from-cyan-500 to-teal-600', questions: '8,000+' },
  { name: 'Geography', icon: '🌍', color: 'from-purple-500 to-violet-600', questions: '3,000+' },
]

// Stats component with animation
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [value])
  
  return <span>{count.toLocaleString()}{suffix}</span>
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Questly
              </span>
            </div>
            
            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/questions" className="text-gray-300 hover:text-white transition-colors">
                Questions
              </Link>
              <Link href="/leaderboard" className="text-gray-300 hover:text-white transition-colors">
                Leaderboard
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
            </div>
            
            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Link href="/login" className="btn-secondary text-sm">
                Sign In
              </Link>
              <Link href="/register" className="btn-primary text-sm flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-hero pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-40 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute top-60 right-10 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 mb-6"
            >
              <Globe className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-primary-300">Free for students worldwide</span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Learn Smarter,{' '}
              <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent animate-gradient">
                Score Higher
              </span>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Practice with AI-powered questions in Mathematics, Science, Physics, and more. 
              Join students from around the world and track your progress.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Link href="/questions" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
                <Play className="w-5 h-5" /> Start Learning
              </Link>
              <Link href="/leaderboard" className="btn-secondary text-lg px-8 py-4 flex items-center gap-2">
                <Trophy className="w-5 h-5" /> View Leaderboard
              </Link>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-8 max-w-xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  <AnimatedCounter value={50000} suffix="+" />
                </div>
                <div className="text-sm text-gray-500">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  <AnimatedCounter value={10000} suffix="+" />
                </div>
                <div className="text-sm text-gray-500">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  <AnimatedCounter value={50} suffix="+" />
                </div>
                <div className="text-sm text-gray-500">Countries</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-20 px-4 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Master Any Subject
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose from a wide range of subjects and start practicing with thousands of questions
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="card cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}>
                  {subject.icon}
                </div>
                <h3 className="font-semibold text-white mb-1">{subject.name}</h3>
                <p className="text-sm text-gray-500">{subject.questions} questions</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Students Love Questly
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to help you learn faster and retain more
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Learning</h3>
              <p className="text-gray-400">
                Questions tailored to your level. Our AI adapts to help you improve where you need it most.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center mb-4">
                <Flame className="w-6 h-6 text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Streak & XP System</h3>
              <p className="text-gray-400">
                Stay motivated with daily streaks, earn XP for correct answers, and unlock achievements.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Leaderboards</h3>
              <p className="text-gray-400">
                Compete with students worldwide. See where you rank globally, by country, or by city.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            
            {/* Content */}
            <div className="relative z-10 p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Start Learning?
              </h2>
              <p className="text-primary-100 mb-8 max-w-xl mx-auto">
                Join thousands of students worldwide. It's completely free and always will be.
              </p>
              <Link href="/register" className="inline-flex items-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Create Free Account <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">Questly</span>
            </div>
            
            {/* Links */}
            <div className="flex items-center gap-8 text-sm text-gray-400">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
            
            {/* Copyright */}
            <p className="text-sm text-gray-500">
              © 2025 Questly. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
