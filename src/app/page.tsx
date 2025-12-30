'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Brain, 
  Trophy, 
  BookOpen,
  Zap,
  Globe,
  ArrowRight,
  Play,
  Star,
  Flame,
  ChevronRight,
  Target,
  Users,
  Award,
  TrendingUp,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

// Subject data with Duolingo-style colors
const subjects = [
  { name: 'Mathematics', icon: '📐', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500', questions: '10,000+', emoji: '🔢' },
  { name: 'Physics', icon: '⚡', color: 'from-amber-500 to-orange-500', bgColor: 'bg-amber-500', questions: '5,000+', emoji: '⚛️' },
  { name: 'Chemistry', icon: '🧪', color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-500', questions: '5,000+', emoji: '🔬' },
  { name: 'Biology', icon: '🧬', color: 'from-pink-500 to-rose-500', bgColor: 'bg-pink-500', questions: '5,000+', emoji: '🦠' },
  { name: 'Science', icon: '🔭', color: 'from-purple-500 to-violet-500', bgColor: 'bg-purple-500', questions: '8,000+', emoji: '🌟' },
  { name: 'Geography', icon: '🌍', color: 'from-teal-500 to-cyan-500', bgColor: 'bg-teal-500', questions: '3,000+', emoji: '🗺️' },
]

// Features list
const features = [
  {
    icon: Brain,
    title: 'AI-Powered Questions',
    description: 'Adaptive questions that match your skill level',
    color: 'from-[#58CC02] to-[#4CAF00]',
  },
  {
    icon: Flame,
    title: 'Daily Streaks',
    description: 'Build habits with streaks and earn bonus XP',
    color: 'from-[#FF9600] to-[#FF6B00]',
  },
  {
    icon: Trophy,
    title: 'Global Leaderboards',
    description: 'Compete with students worldwide',
    color: 'from-[#FFD700] to-[#FFA500]',
  },
  {
    icon: Target,
    title: 'Progress Tracking',
    description: 'See your improvement with detailed stats',
    color: 'from-[#1CB0F6] to-[#0090D9]',
  },
]

// Animated counter component
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

// Mascot component - simple owl
function Mascot() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
      className="relative"
    >
      <div className="w-32 h-32 relative">
        {/* Body */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#58CC02] to-[#4CAF00] rounded-full shadow-xl" />
        {/* Eyes */}
        <div className="absolute top-6 left-4 w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-[#1a1a2e] rounded-full" />
        </div>
        <div className="absolute top-6 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-[#1a1a2e] rounded-full" />
        </div>
        {/* Beak */}
        <div className="absolute top-14 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-[#FF9600]" />
        {/* Book */}
        <motion.div 
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -bottom-2 -right-2 w-12 h-10 bg-[#1CB0F6] rounded-lg flex items-center justify-center shadow-lg"
        >
          <BookOpen className="w-6 h-6 text-white" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#131F24]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1e2d36]/95 backdrop-blur-md border-b border-[#2a3f4d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#58CC02] to-[#4CAF00] flex items-center justify-center shadow-lg shadow-[#58CC02]/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Questly</span>
            </Link>
            
            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/questions" className="text-gray-300 hover:text-[#58CC02] transition-colors font-medium">
                Practice
              </Link>
              <Link href="/leaderboard" className="text-gray-300 hover:text-[#58CC02] transition-colors font-medium">
                Leaderboard
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-[#58CC02] transition-colors font-medium">
                About
              </Link>
            </div>
            
            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Link href="/login" className="px-4 py-2 rounded-xl font-bold text-white hover:bg-[#2a3f4d] transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="px-5 py-2.5 rounded-xl font-bold bg-gradient-to-r from-[#58CC02] to-[#4CAF00] text-white shadow-lg shadow-[#58CC02]/30 hover:shadow-[#58CC02]/50 transition-all flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-40 left-10 w-72 h-72 bg-[#58CC02]/20 rounded-full blur-3xl" />
        <div className="absolute top-60 right-10 w-96 h-96 bg-[#1CB0F6]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-[#58CC02]/5 to-transparent rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#58CC02]/10 border border-[#58CC02]/30 mb-6"
              >
                <Globe className="w-4 h-4 text-[#58CC02]" />
                <span className="text-sm text-[#58CC02] font-semibold">Free for students worldwide</span>
              </motion.div>
              
              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
              >
                <span className="text-white">The fun way to</span>
                <br />
                <span className="bg-gradient-to-r from-[#58CC02] via-[#1CB0F6] to-[#CE82FF] bg-clip-text text-transparent">
                  learn anything
                </span>
              </motion.h1>
              
              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0"
              >
                Practice AI-powered questions, earn XP, compete on leaderboards, 
                and master subjects from Mathematics to Science.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
              >
                <Link 
                  href="/register" 
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-[#58CC02] to-[#4CAF00] text-white shadow-lg shadow-[#58CC02]/30 hover:shadow-[#58CC02]/50 hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" /> Start Learning — It's Free
                </Link>
                <Link 
                  href="/leaderboard" 
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-lg bg-[#1e2d36] border-2 border-[#2a3f4d] text-white hover:border-[#58CC02] transition-all flex items-center justify-center gap-2"
                >
                  <Trophy className="w-5 h-5 text-[#FFD700]" /> View Leaderboard
                </Link>
              </motion.div>
              
              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center lg:justify-start gap-6"
              >
                <div className="flex -space-x-3">
                  {['🇮🇳', '🇵🇰', '🇳🇬', '🇬🇧', '🇺🇸'].map((flag, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-[#2a3f4d] border-2 border-[#131F24] flex items-center justify-center text-lg">
                      {flag}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="text-white font-bold">Join 10,000+ students</div>
                  <div className="text-sm text-gray-500">from 50+ countries</div>
                </div>
              </motion.div>
            </div>
            
            {/* Right Content - Mascot + Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex-1 max-w-md"
            >
              <div className="relative">
                {/* Main Card */}
                <div className="bg-[#1e2d36] rounded-3xl border border-[#2a3f4d] p-8 shadow-2xl">
                  {/* Mascot */}
                  <div className="flex justify-center mb-6">
                    <Mascot />
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-extrabold text-[#58CC02]">
                        <AnimatedCounter value={50} suffix="K+" />
                      </div>
                      <div className="text-xs text-gray-500 font-medium">Questions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-extrabold text-[#1CB0F6]">
                        <AnimatedCounter value={10} suffix="K+" />
                      </div>
                      <div className="text-xs text-gray-500 font-medium">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-extrabold text-[#FF9600]">
                        <AnimatedCounter value={50} suffix="+" />
                      </div>
                      <div className="text-xs text-gray-500 font-medium">Countries</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Badge - Streak */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-[#FF9600] to-[#FF6B00] px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
                >
                  <Flame className="w-5 h-5 text-white" />
                  <span className="font-bold text-white">7 day streak!</span>
                </motion.div>
                
                {/* Floating Badge - XP */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
                >
                  <Zap className="w-5 h-5 text-white" />
                  <span className="font-bold text-white">+50 XP</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-16 px-4 bg-[#1a2a32]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Choose Your Subject
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Start practicing with thousands of AI-generated questions
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link 
                  href={`/questions?subject=${subject.name.toLowerCase()}`}
                  className="block bg-[#1e2d36] rounded-2xl p-5 border-2 border-[#2a3f4d] hover:border-[#58CC02] transition-all group cursor-pointer hover:shadow-lg hover:shadow-[#58CC02]/10"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    {subject.emoji}
                  </div>
                  <h3 className="font-bold text-white mb-1">{subject.name}</h3>
                  <p className="text-sm text-gray-500">{subject.questions}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Why Students Love Questly
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to supercharge your learning
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#1e2d36] rounded-2xl p-6 border border-[#2a3f4d] hover:border-[#58CC02]/50 transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-[#1a2a32]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              How It Works
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, title: 'Choose a Subject', desc: 'Pick from Math, Science, Physics, and more', icon: BookOpen, color: '#58CC02' },
              { step: 2, title: 'Answer Questions', desc: 'Solve AI-generated questions at your level', icon: Target, color: '#1CB0F6' },
              { step: 3, title: 'Earn XP & Level Up', desc: 'Track progress and compete globally', icon: Trophy, color: '#FFD700' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {/* Step number */}
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold text-white" style={{ backgroundColor: item.color }}>
                  {item.step}
                </div>
                {/* Icon */}
                <div className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                  <item.icon className="w-10 h-10" style={{ color: item.color }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
                
                {/* Arrow */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-20 -right-4 text-gray-600">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#58CC02] to-[#4CAF00]" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            
            {/* Content */}
            <div className="relative z-10 p-12 text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-6"
              >
                🚀
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
                Ready to Start Learning?
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto text-lg">
                Join thousands of students worldwide. It's completely free!
              </p>
              <Link 
                href="/register" 
                className="inline-flex items-center gap-2 bg-white text-[#58CC02] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Create Free Account <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[#2a3f4d]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#58CC02] to-[#4CAF00] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Questly</span>
            </div>
            
            {/* Links */}
            <div className="flex items-center gap-8 text-sm text-gray-400">
              <Link href="/about" className="hover:text-[#58CC02] transition-colors">About</Link>
              <Link href="/privacy" className="hover:text-[#58CC02] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[#58CC02] transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-[#58CC02] transition-colors">Contact</Link>
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
