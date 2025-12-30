'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Globe, 
  Heart, 
  Zap, 
  Users, 
  BookOpen,
  Target,
  Award,
  ArrowRight
} from 'lucide-react'

export default function AboutPage() {
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
                Start Learning
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="gradient-hero pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center"
          >
            <Globe className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Education for{' '}
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Everyone
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Questly is a free global education platform that helps students around the world 
            practice and master key subjects through AI-powered questions.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 bg-[var(--bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-400 mb-6">
                We believe that quality education should be accessible to everyone, 
                regardless of where they live or their financial situation. 
                That's why Questly is completely free - no premium tiers, no ads, 
                just learning.
              </p>
              <p className="text-gray-400">
                Our AI generates thousands of practice questions across Mathematics, 
                Physics, Chemistry, Biology, and more - tailored to different grade levels 
                and learning objectives.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="card text-center">
                <div className="text-4xl font-bold text-primary-400 mb-2">50K+</div>
                <div className="text-gray-400">Questions</div>
              </div>
              <div className="card text-center">
                <div className="text-4xl font-bold text-accent-400 mb-2">50+</div>
                <div className="text-gray-400">Countries</div>
              </div>
              <div className="card text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">10K+</div>
                <div className="text-gray-400">Students</div>
              </div>
              <div className="card text-center">
                <div className="text-4xl font-bold text-amber-400 mb-2">100%</div>
                <div className="text-gray-400">Free</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
              <p className="text-gray-400">
                Education should be free and available to every student, everywhere in the world.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-gray-400">
                Our AI ensures high-quality questions that challenge and educate at the right level.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-400">
                Connect with students worldwide through global and local leaderboards.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-[var(--bg-secondary)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-gray-400 mb-8">
            Join thousands of students from around the world and start your learning journey today.
          </p>
          <Link href="/register" className="btn-primary inline-flex items-center gap-2">
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold">Questly</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 Questly. Made with ❤️ for students worldwide.
          </p>
        </div>
      </footer>
    </div>
  )
}
