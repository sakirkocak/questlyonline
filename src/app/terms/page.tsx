import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-400 mb-6">Last updated: January 2025</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-400 mb-4">
              By accessing and using Questly, you accept and agree to be bound by these Terms of Service.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Use of Service</h2>
            <p className="text-gray-400 mb-4">
              Questly is a free educational platform. You agree to use the service only for lawful purposes 
              and in accordance with these terms. You must not use any automated systems or bots to interact 
              with the platform in an unfair manner.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. User Accounts</h2>
            <p className="text-gray-400 mb-4">
              You are responsible for maintaining the confidentiality of your account credentials. 
              You must provide accurate information when creating an account.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Intellectual Property</h2>
            <p className="text-gray-400 mb-4">
              All content on Questly, including questions, designs, and code, is owned by Questly 
              and protected by intellectual property laws.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Fair Play</h2>
            <p className="text-gray-400 mb-4">
              Users must not use cheats, bots, or any automated systems to gain unfair advantages. 
              Violation of this rule may result in account suspension.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Disclaimer</h2>
            <p className="text-gray-400 mb-4">
              Questly is provided "as is" without any warranties. We do not guarantee the accuracy 
              of all questions and answers.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Contact</h2>
            <p className="text-gray-400 mb-4">
              For any questions about these terms, please contact us at support@questlyonline.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
