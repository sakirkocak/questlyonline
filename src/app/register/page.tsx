'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Globe, MapPin, GraduationCap, Sparkles, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'

// Comprehensive country list
const countries = [
  // North America
  { code: 'US', name: 'United States', flag: '🇺🇸', region: 'North America' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', region: 'North America' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', region: 'North America' },
  
  // South America
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', region: 'South America' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', region: 'South America' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', region: 'South America' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', region: 'South America' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', region: 'South America' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪', region: 'South America' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨', region: 'South America' },
  
  // Europe
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', region: 'Europe' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', region: 'Europe' },
  { code: 'FR', name: 'France', flag: '🇫🇷', region: 'Europe' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', region: 'Europe' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', region: 'Europe' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', region: 'Europe' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', region: 'Europe' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', region: 'Europe' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', region: 'Europe' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', region: 'Europe' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', region: 'Europe' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', region: 'Europe' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', region: 'Europe' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', region: 'Europe' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', region: 'Europe' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', region: 'Europe' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', region: 'Europe' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', region: 'Europe' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', region: 'Europe' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', region: 'Europe' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', region: 'Europe' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', region: 'Europe' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', region: 'Europe' },
  
  // Asia
  { code: 'IN', name: 'India', flag: '🇮🇳', region: 'Asia' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', region: 'Asia' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', region: 'Asia' },
  { code: 'CN', name: 'China', flag: '🇨🇳', region: 'Asia' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', region: 'Asia' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', region: 'Asia' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', region: 'Asia' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', region: 'Asia' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', region: 'Asia' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', region: 'Asia' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', region: 'Asia' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', region: 'Asia' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', region: 'Asia' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', region: 'Asia' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱', region: 'Asia' },
  { code: 'IR', name: 'Iran', flag: '🇮🇷', region: 'Asia' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶', region: 'Asia' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', region: 'Asia' },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵', region: 'Asia' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲', region: 'Asia' },
  
  // Africa
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', region: 'Africa' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', region: 'Africa' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', region: 'Africa' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', region: 'Africa' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', region: 'Africa' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', region: 'Africa' },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿', region: 'Africa' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳', region: 'Africa' },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹', region: 'Africa' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', region: 'Africa' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬', region: 'Africa' },
  { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼', region: 'Africa' },
  
  // Oceania
  { code: 'AU', name: 'Australia', flag: '🇦🇺', region: 'Oceania' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', region: 'Oceania' },
].sort((a, b) => a.name.localeCompare(b.name))

// Grades
const grades = [
  { value: 5, label: 'Grade 5', age: '10-11 years' },
  { value: 6, label: 'Grade 6', age: '11-12 years' },
  { value: 7, label: 'Grade 7', age: '12-13 years' },
  { value: 8, label: 'Grade 8', age: '13-14 years' },
  { value: 9, label: 'Grade 9', age: '14-15 years' },
  { value: 10, label: 'Grade 10', age: '15-16 years' },
  { value: 11, label: 'Grade 11', age: '16-17 years' },
  { value: 12, label: 'Grade 12', age: '17-18 years' },
]

interface City {
  id: string
  name: string
  country_code: string
}

export default function RegisterPage() {
  const router = useRouter()
  const { signUpWithEmail, signInWithGoogle, user, loading: authLoading } = useAuth()
  const supabase = createClient()
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    country: '',
    city: '',
    grade: '',
  })
  const [cities, setCities] = useState<City[]>([])
  const [loadingCities, setLoadingCities] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.push('/dashboard')
    }
  }, [user, authLoading, router])

  // Load cities when country changes
  useEffect(() => {
    const loadCities = async () => {
      if (!formData.country) {
        setCities([])
        return
      }
      
      setLoadingCities(true)
      try {
        const { data, error } = await supabase
          .from('cities_global')
          .select('id, name, country_code')
          .eq('country_code', formData.country)
          .order('name')
        
        if (!error && data) {
          setCities(data)
        }
      } catch (err) {
        console.error('Error loading cities:', err)
      }
      setLoadingCities(false)
    }

    loadCities()
  }, [formData.country])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // Validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    if (!formData.country) {
      setError('Please select your country')
      setLoading(false)
      return
    }

    if (!formData.grade) {
      setError('Please select your grade')
      setLoading(false)
      return
    }
    
    const { error } = await signUpWithEmail(
      formData.email,
      formData.password,
      formData.fullName,
      parseInt(formData.grade),
      formData.country,
      formData.city || undefined
    )
    
    if (error) {
      if (error.message.includes('already registered')) {
        setError('This email is already registered. Try signing in instead.')
      } else {
        setError(error.message)
      }
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')
    await signInWithGoogle()
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#131F24]">
        <div className="w-12 h-12 border-4 border-[#58CC02] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Success message
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#131F24] to-[#1a2a32] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <div className="bg-[#1e2d36] rounded-2xl border border-[#2a3f4d] p-8 shadow-2xl">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#58CC02]/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-[#58CC02]" />
            </div>
            <h1 className="text-2xl font-bold mb-3 text-white">Check Your Email!</h1>
            <p className="text-gray-400 mb-6">
              We've sent a confirmation link to <span className="text-[#58CC02] font-semibold">{formData.email}</span>. 
              Click the link to activate your account.
            </p>
            <Link 
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#58CC02] text-white font-bold hover:bg-[#4CAF00] transition-colors"
            >
              Go to Login <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#131F24] to-[#1a2a32] flex items-center justify-center p-4 py-12">
      {/* Background Effects */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-[#58CC02]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#1CB0F6]/10 rounded-full blur-3xl" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#58CC02] to-[#4CAF00] flex items-center justify-center shadow-lg shadow-[#58CC02]/30">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <span className="text-3xl font-bold text-white">Questly</span>
        </Link>

        {/* Card */}
        <div className="bg-[#1e2d36] rounded-2xl border border-[#2a3f4d] p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-center mb-2 text-white">Create Account</h1>
          <p className="text-gray-400 text-center mb-8">Start your learning journey today</p>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-[#FF4B4B]/10 border border-[#FF4B4B]/30 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-[#FF4B4B] flex-shrink-0 mt-0.5" />
              <span className="text-[#FF4B4B] text-sm">{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#131F24] border-2 border-[#2a3f4d] text-white placeholder-gray-500 focus:border-[#58CC02] focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#131F24] border-2 border-[#2a3f4d] text-white placeholder-gray-500 focus:border-[#58CC02] focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-[#131F24] border-2 border-[#2a3f4d] text-white placeholder-gray-500 focus:border-[#58CC02] focus:outline-none transition-colors"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Country</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value, city: '' })}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#131F24] border-2 border-[#2a3f4d] text-white focus:border-[#58CC02] focus:outline-none transition-colors appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select your country</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* City (only show if country selected and has cities) */}
            {formData.country && (
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">City (optional)</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#131F24] border-2 border-[#2a3f4d] text-white focus:border-[#58CC02] focus:outline-none transition-colors appearance-none cursor-pointer"
                    disabled={loadingCities}
                  >
                    <option value="">Select your city</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Grade */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Grade</label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#131F24] border-2 border-[#2a3f4d] text-white focus:border-[#58CC02] focus:outline-none transition-colors appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select your grade</option>
                  {grades.map((grade) => (
                    <option key={grade.value} value={grade.value}>
                      {grade.label} ({grade.age})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Terms */}
            <p className="text-xs text-gray-500">
              By signing up, you agree to our{' '}
              <Link href="/terms" className="text-[#1CB0F6] hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-[#1CB0F6] hover:underline">Privacy Policy</Link>
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#58CC02] to-[#4CAF00] text-white font-bold text-lg flex items-center justify-center gap-2 hover:from-[#4CAF00] hover:to-[#3d8f00] transition-all shadow-lg shadow-[#58CC02]/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#2a3f4d]" />
            <span className="text-sm text-gray-500 font-medium">or</span>
            <div className="flex-1 h-px bg-[#2a3f4d]" />
          </div>

          {/* Google Login */}
          <button 
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#131F24] border-2 border-[#2a3f4d] text-white font-semibold flex items-center justify-center gap-3 hover:border-[#58CC02] hover:bg-[#1a2a32] transition-all disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Login Link */}
          <p className="text-center mt-6 text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-[#58CC02] hover:text-[#4CAF00] font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
