'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Search, 
  BookOpen, 
  ChevronRight, 
  ArrowLeft,
  Sparkles,
  CheckCircle,
  XCircle,
  Flame,
  Zap,
  Target,
  Trophy,
  Clock
} from 'lucide-react'
import MathRenderer from '@/components/MathRenderer'
import { searchQuestions, QuestionDocument, isTypesenseEnabled } from '@/lib/typesense/browser-client'

// Grade levels
const grades = [
  { value: 5, label: 'Grade 5', age: '10-11' },
  { value: 6, label: 'Grade 6', age: '11-12' },
  { value: 7, label: 'Grade 7', age: '12-13' },
  { value: 8, label: 'Grade 8', age: '13-14' },
  { value: 9, label: 'Grade 9', age: '14-15' },
  { value: 10, label: 'Grade 10', age: '15-16' },
  { value: 11, label: 'Grade 11', age: '16-17' },
  { value: 12, label: 'Grade 12', age: '17-18' },
]

// Subjects (English names and codes matching global subjects)
const subjects = [
  { code: 'matematik', name: 'Mathematics', icon: '📐', color: 'from-blue-500 to-blue-600' },
  { code: 'fizik', name: 'Physics', icon: '⚡', color: 'from-amber-500 to-orange-500' },
  { code: 'kimya', name: 'Chemistry', icon: '🧪', color: 'from-green-500 to-emerald-500' },
  { code: 'biyoloji', name: 'Biology', icon: '🧬', color: 'from-pink-500 to-rose-500' },
  { code: 'fen_bilimleri', name: 'Science', icon: '🔬', color: 'from-purple-500 to-violet-500' },
  { code: 'cografya', name: 'Geography', icon: '🌍', color: 'from-teal-500 to-cyan-500' },
]

// Difficulty levels
const difficulties = [
  { value: 'easy', label: 'Easy', color: 'text-[#58CC02]', bg: 'bg-[#58CC02]/20', borderColor: 'border-[#58CC02]' },
  { value: 'medium', label: 'Medium', color: 'text-[#1CB0F6]', bg: 'bg-[#1CB0F6]/20', borderColor: 'border-[#1CB0F6]' },
  { value: 'hard', label: 'Hard', color: 'text-[#FF9600]', bg: 'bg-[#FF9600]/20', borderColor: 'border-[#FF9600]' },
  { value: 'legendary', label: 'Legendary', color: 'text-[#FF4B4B]', bg: 'bg-[#FF4B4B]/20', borderColor: 'border-[#FF4B4B]' },
]

export default function QuestionsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [questions, setQuestions] = useState<QuestionDocument[]>([])
  const [loading, setLoading] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState<QuestionDocument | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [stats, setStats] = useState({ correct: 0, total: 0, xp: 0, streak: 0 })

  // Search questions
  const handleSearch = async () => {
    if (!isTypesenseEnabled()) {
      console.log('Typesense not enabled')
      return
    }
    
    setLoading(true)
    try {
      const result = await searchQuestions(searchQuery, {
        grade: selectedGrade || undefined,
        subject_code: selectedSubject || undefined,
        difficulty: selectedDifficulty || undefined,
        limit: 20,
        // langFilter is true by default - only shows English questions
      })
      setQuestions(result.questions)
    } catch (error) {
      console.error('Search error:', error)
    }
    setLoading(false)
  }

  // Initial load
  useEffect(() => {
    handleSearch()
  }, [selectedGrade, selectedSubject, selectedDifficulty])

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    if (showResult || !activeQuestion) return
    setSelectedAnswer(answer)
  }

  // Check answer
  const handleCheckAnswer = () => {
    if (!activeQuestion || !selectedAnswer) return
    setShowResult(true)
    
    const isCorrect = selectedAnswer === activeQuestion.correct_answer
    const xpGain = isCorrect ? (activeQuestion.difficulty === 'hard' ? 15 : activeQuestion.difficulty === 'medium' ? 10 : 5) : 0
    
    setStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
      xp: prev.xp + xpGain,
      streak: isCorrect ? prev.streak + 1 : 0
    }))
  }

  // Next question
  const handleNextQuestion = () => {
    setSelectedAnswer(null)
    setShowResult(false)
    
    const currentIndex = questions.findIndex(q => q.id === activeQuestion?.id)
    if (currentIndex < questions.length - 1) {
      setActiveQuestion(questions[currentIndex + 1])
    } else {
      setActiveQuestion(null)
    }
  }

  // Get options from question
  const getOptions = (q: QuestionDocument) => {
    const opts: { key: string; value: string }[] = []
    if (q.option_a) opts.push({ key: 'A', value: q.option_a })
    if (q.option_b) opts.push({ key: 'B', value: q.option_b })
    if (q.option_c) opts.push({ key: 'C', value: q.option_c })
    if (q.option_d) opts.push({ key: 'D', value: q.option_d })
    if (q.option_e) opts.push({ key: 'E', value: q.option_e })
    return opts
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
            
            {/* Stats Bar */}
            <div className="flex items-center gap-4">
              {stats.streak > 0 && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF9600]/20 border border-[#FF9600]/30">
                  <Flame className="w-5 h-5 text-[#FF9600]" />
                  <span className="font-bold text-[#FF9600]">{stats.streak}</span>
                </div>
              )}
              {stats.xp > 0 && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/30">
                  <Zap className="w-5 h-5 text-[#FFD700]" />
                  <span className="font-bold text-[#FFD700]">{stats.xp}</span>
                </div>
              )}
              {stats.total > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-[#58CC02]" />
                  <span>{stats.correct}/{stats.total}</span>
                  <span className="text-[#58CC02]">({Math.round((stats.correct / stats.total) * 100)}%)</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Question Mode */}
          <AnimatePresence mode="wait">
            {activeQuestion ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-3xl mx-auto"
              >
                {/* Back Button */}
                <button
                  onClick={() => setActiveQuestion(null)}
                  className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Questions
                </button>
                
                {/* Question Card */}
                <div className="bg-[#1e2d36] rounded-3xl border-2 border-[#2a3f4d] p-8 shadow-xl">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subjects.find(s => s.code === activeQuestion.subject_code)?.color || 'from-gray-500 to-gray-600'} flex items-center justify-center text-2xl`}>
                        {subjects.find(s => s.code === activeQuestion.subject_code)?.icon || '📚'}
                      </div>
                      <div>
                        <h2 className="font-bold text-white">{activeQuestion.main_topic}</h2>
                        <p className="text-sm text-gray-400">{activeQuestion.sub_topic || `Grade ${activeQuestion.grade}`}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                      difficulties.find(d => d.value === activeQuestion.difficulty)?.bg
                    } ${
                      difficulties.find(d => d.value === activeQuestion.difficulty)?.color
                    }`}>
                      {difficulties.find(d => d.value === activeQuestion.difficulty)?.label}
                    </span>
                  </div>
                  
                  {/* Question Text */}
                  <div className="text-lg text-white mb-8 leading-relaxed">
                    <MathRenderer content={activeQuestion.question_text} />
                  </div>
                  
                  {/* Options */}
                  <div className="space-y-3 mb-8">
                    {getOptions(activeQuestion).map((option) => {
                      const isCorrect = option.key === activeQuestion.correct_answer
                      const isSelected = selectedAnswer === option.key
                      const isWrong = showResult && isSelected && !isCorrect
                      
                      return (
                        <button
                          key={option.key}
                          onClick={() => handleAnswerSelect(option.key)}
                          disabled={showResult}
                          className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-4 ${
                            showResult
                              ? isCorrect
                                ? 'border-[#58CC02] bg-[#58CC02]/10'
                                : isWrong
                                ? 'border-[#FF4B4B] bg-[#FF4B4B]/10'
                                : 'border-[#2a3f4d] opacity-50'
                              : isSelected
                              ? 'border-[#1CB0F6] bg-[#1CB0F6]/10'
                              : 'border-[#2a3f4d] hover:border-[#58CC02]/50 hover:bg-[#2a3f4d]/50'
                          }`}
                        >
                          <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                            showResult
                              ? isCorrect
                                ? 'bg-[#58CC02] text-white'
                                : isWrong
                                ? 'bg-[#FF4B4B] text-white'
                                : 'bg-[#2a3f4d] text-gray-400'
                              : isSelected
                              ? 'bg-[#1CB0F6] text-white'
                              : 'bg-[#2a3f4d] text-gray-300'
                          }`}>
                            {option.key}
                          </span>
                          <span className="flex-1 text-white">
                            <MathRenderer content={option.value} />
                          </span>
                          {showResult && isCorrect && (
                            <CheckCircle className="w-6 h-6 text-[#58CC02] shrink-0" />
                          )}
                          {showResult && isWrong && (
                            <XCircle className="w-6 h-6 text-[#FF4B4B] shrink-0" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                  
                  {/* Result / Actions */}
                  {showResult ? (
                    <div className="space-y-4">
                      {/* XP Gained */}
                      {selectedAnswer === activeQuestion.correct_answer && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center justify-center gap-2 text-[#FFD700] font-bold text-lg"
                        >
                          <Zap className="w-6 h-6" />
                          +{activeQuestion.difficulty === 'hard' ? 15 : activeQuestion.difficulty === 'medium' ? 10 : 5} XP
                        </motion.div>
                      )}
                      
                      {/* Explanation */}
                      {activeQuestion.explanation && (
                        <div className="p-4 rounded-2xl bg-[#131F24] border border-[#2a3f4d]">
                          <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-[#1CB0F6]" /> Explanation
                          </h4>
                          <div className="text-gray-300">
                            <MathRenderer content={activeQuestion.explanation} />
                          </div>
                        </div>
                      )}
                      
                      <button
                        onClick={handleNextQuestion}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#58CC02] to-[#4CAF00] text-white font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#58CC02]/30 transition-all"
                      >
                        Next Question <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleCheckAnswer}
                      disabled={!selectedAnswer}
                      className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                        selectedAnswer 
                          ? 'bg-gradient-to-r from-[#58CC02] to-[#4CAF00] text-white hover:shadow-lg hover:shadow-[#58CC02]/30' 
                          : 'bg-[#2a3f4d] text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Check Answer
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-extrabold text-white mb-3">Practice Questions</h1>
                  <p className="text-gray-400">Master any subject with AI-powered questions</p>
                </div>
                
                {/* Filters */}
                <div className="mb-8 space-y-4">
                  {/* Search */}
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search questions by topic..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#1e2d36] border-2 border-[#2a3f4d] text-white placeholder-gray-500 focus:border-[#58CC02] focus:outline-none transition-colors"
                      />
                    </div>
                    <button 
                      onClick={handleSearch} 
                      className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#58CC02] to-[#4CAF00] text-white font-bold hover:shadow-lg hover:shadow-[#58CC02]/30 transition-all"
                    >
                      Search
                    </button>
                  </div>
                  
                  {/* Filter Pills */}
                  <div className="flex flex-wrap gap-4">
                    {/* Subject Filter */}
                    <div className="flex flex-wrap gap-2">
                      {subjects.map((subject) => (
                        <button
                          key={subject.code}
                          onClick={() => setSelectedSubject(selectedSubject === subject.code ? null : subject.code)}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                            selectedSubject === subject.code
                              ? 'bg-[#58CC02] text-white shadow-lg shadow-[#58CC02]/30'
                              : 'bg-[#1e2d36] border border-[#2a3f4d] text-gray-300 hover:border-[#58CC02]'
                          }`}
                        >
                          <span>{subject.icon}</span> {subject.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Grade and Difficulty */}
                  <div className="flex flex-wrap gap-4">
                    {/* Grade Filter */}
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-sm text-gray-400 font-medium">Grade:</span>
                      {grades.map((grade) => (
                        <button
                          key={grade.value}
                          onClick={() => setSelectedGrade(selectedGrade === grade.value ? null : grade.value)}
                          className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                            selectedGrade === grade.value
                              ? 'bg-[#1CB0F6] text-white'
                              : 'bg-[#1e2d36] border border-[#2a3f4d] text-gray-300 hover:border-[#1CB0F6]'
                          }`}
                        >
                          {grade.value}
                        </button>
                      ))}
                    </div>
                    
                    {/* Difficulty Filter */}
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-sm text-gray-400 font-medium">Difficulty:</span>
                      {difficulties.map((diff) => (
                        <button
                          key={diff.value}
                          onClick={() => setSelectedDifficulty(selectedDifficulty === diff.value ? null : diff.value)}
                          className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                            selectedDifficulty === diff.value
                              ? `${diff.bg} ${diff.color} border ${diff.borderColor}`
                              : 'bg-[#1e2d36] border border-[#2a3f4d] text-gray-300 hover:border-[#2a3f4d]'
                          }`}
                        >
                          {diff.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Questions List */}
                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="w-10 h-10 border-4 border-[#58CC02] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : questions.length === 0 ? (
                  <div className="text-center py-20">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-[#1e2d36] border-2 border-[#2a3f4d] flex items-center justify-center"
                    >
                      <Target className="w-12 h-12 text-gray-600" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-3">Coming Soon!</h3>
                    <p className="text-gray-400 max-w-md mx-auto mb-6">
                      English questions are being generated. Check back soon to start practicing!
                    </p>
                    <Link 
                      href="/"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#58CC02] text-white font-bold hover:bg-[#4CAF00] transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" /> Back to Home
                    </Link>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {questions.map((question, index) => (
                      <motion.div
                        key={question.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() => setActiveQuestion(question)}
                        className="bg-[#1e2d36] rounded-2xl border-2 border-[#2a3f4d] p-5 cursor-pointer hover:border-[#58CC02] hover:shadow-lg hover:shadow-[#58CC02]/10 transition-all group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${subjects.find(s => s.code === question.subject_code)?.color || 'from-gray-500 to-gray-600'} flex items-center justify-center`}>
                              {subjects.find(s => s.code === question.subject_code)?.icon || '📚'}
                            </div>
                            <span className="text-sm text-gray-400 font-medium">{question.main_topic}</span>
                          </div>
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                            difficulties.find(d => d.value === question.difficulty)?.bg
                          } ${
                            difficulties.find(d => d.value === question.difficulty)?.color
                          }`}>
                            {difficulties.find(d => d.value === question.difficulty)?.label}
                          </span>
                        </div>
                        
                        <div className="text-white line-clamp-3 mb-4">
                          <MathRenderer content={question.question_text.substring(0, 150) + (question.question_text.length > 150 ? '...' : '')} />
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Grade {question.grade}</span>
                          <span className="flex items-center gap-1 text-[#58CC02] font-semibold group-hover:translate-x-1 transition-transform">
                            Solve <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
