import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function PrivacyPage() {
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
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-400 mb-6">Last updated: January 2025</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-gray-400 mb-4">
              When you create an account, we collect your name, email address, country, and grade level. 
              We also collect information about your learning progress, including questions answered and scores.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-400 mb-4">
              We use your information to provide personalized learning experiences, track your progress, 
              and display your ranking on leaderboards. We do not sell your personal information to third parties.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Data Security</h2>
            <p className="text-gray-400 mb-4">
              We implement appropriate security measures to protect your personal information. 
              Your data is stored securely and accessed only by authorized personnel.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Cookies</h2>
            <p className="text-gray-400 mb-4">
              We use cookies to maintain your session and improve your experience on our platform.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Contact Us</h2>
            <p className="text-gray-400 mb-4">
              If you have any questions about this Privacy Policy, please contact us at privacy@questlyonline.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
