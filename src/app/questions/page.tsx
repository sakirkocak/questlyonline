'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Search, 
  Filter, 
  BookOpen, 
  ChevronRight, 
  ArrowLeft,
  Sparkles,
  Trophy,
  Zap,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Flame
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

// Subjects
const subjects = [
  { code: 'matematik', name: 'Mathematics', icon: '📐' },
  { code: 'fizik', name: 'Physics', icon: '⚡' },
  { code: 'kimya', name: 'Chemistry', icon: '🧪' },
  { code: 'biyoloji', name: 'Biology', icon: '🧬' },
  { code: 'fen_bilimleri', name: 'Science', icon: '🔬' },
  { code: 'cografya', name: 'Geography', icon: '🌍' },
]

// Difficulty levels
const difficulties = [
  { value: 'easy', label: 'Easy', color: 'text-green-400', bg: 'bg-green-500/20' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  { value: 'hard', label: 'Hard', color: 'text-orange-400', bg: 'bg-orange-500/20' },
  { value: 'legendary', label: 'Legendary', color: 'text-red-400', bg: 'bg-red-500/20' },
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
  const [stats, setStats] = useState({ correct: 0, total: 0 })

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
    setStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
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
            
            {/* Stats */}
            {stats.total > 0 && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>{stats.correct} / {stats.total}</span>
                </div>
                <div className="text-sm text-gray-400">
                  {Math.round((stats.correct / stats.total) * 100)}%
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Question Mode */}
          {activeQuestion ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
              <div className="card">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{subjects.find(s => s.code === activeQuestion.subject_code)?.icon || '📚'}</span>
                    <div>
                      <h2 className="font-semibold">{activeQuestion.main_topic}</h2>
                      <p className="text-sm text-gray-400">{activeQuestion.sub_topic}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    difficulties.find(d => d.value === activeQuestion.difficulty)?.bg
                  } ${
                    difficulties.find(d => d.value === activeQuestion.difficulty)?.color
                  }`}>
                    {difficulties.find(d => d.value === activeQuestion.difficulty)?.label}
                  </span>
                </div>
                
                {/* Question Text */}
                <div className="text-lg mb-8">
                  <MathRenderer content={activeQuestion.question_text} />
                </div>
                
                {/* Options */}
                <div className="space-y-3 mb-8">
                  {getOptions(activeQuestion).map((option) => (
                    <button
                      key={option.key}
                      onClick={() => handleAnswerSelect(option.key)}
                      disabled={showResult}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                        showResult
                          ? option.key === activeQuestion.correct_answer
                            ? 'border-green-500 bg-green-500/10'
                            : option.key === selectedAnswer
                            ? 'border-red-500 bg-red-500/10'
                            : 'border-[var(--border-default)] opacity-50'
                          : selectedAnswer === option.key
                          ? 'border-primary-500 bg-primary-500/10'
                          : 'border-[var(--border-default)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-hover)]'
                      }`}
                    >
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm ${
                        showResult
                          ? option.key === activeQuestion.correct_answer
                            ? 'bg-green-500 text-white'
                            : option.key === selectedAnswer
                            ? 'bg-red-500 text-white'
                            : 'bg-[var(--bg-tertiary)]'
                          : selectedAnswer === option.key
                          ? 'bg-primary-500 text-white'
                          : 'bg-[var(--bg-tertiary)]'
                      }`}>
                        {option.key}
                      </span>
                      <span className="flex-1">
                        <MathRenderer content={option.value} />
                      </span>
                      {showResult && option.key === activeQuestion.correct_answer && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                      {showResult && option.key === selectedAnswer && option.key !== activeQuestion.correct_answer && (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Result / Actions */}
                {showResult ? (
                  <div className="space-y-4">
                    {/* Explanation */}
                    {activeQuestion.explanation && (
                      <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" /> Explanation
                        </h4>
                        <MathRenderer content={activeQuestion.explanation} className="text-gray-300" />
                      </div>
                    )}
                    
                    <button
                      onClick={handleNextQuestion}
                      className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                      Next Question <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={!selectedAnswer}
                    className={`btn-primary w-full ${!selectedAnswer ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Check Answer
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <>
              {/* Filters */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-6">Practice Questions</h1>
                
                {/* Search */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search questions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      className="input pl-12"
                    />
                  </div>
                  <button onClick={handleSearch} className="btn-primary">
                    Search
                  </button>
                </div>
                
                {/* Filter Chips */}
                <div className="flex flex-wrap gap-4">
                  {/* Grade Filter */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-gray-400 py-2">Grade:</span>
                    {grades.map((grade) => (
                      <button
                        key={grade.value}
                        onClick={() => setSelectedGrade(selectedGrade === grade.value ? null : grade.value)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          selectedGrade === grade.value
                            ? 'bg-primary-500 text-white'
                            : 'bg-[var(--bg-tertiary)] text-gray-300 hover:bg-[var(--bg-hover)]'
                        }`}
                      >
                        {grade.label}
                      </button>
                    ))}
                  </div>
                  
                  {/* Subject Filter */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-gray-400 py-2">Subject:</span>
                    {subjects.map((subject) => (
                      <button
                        key={subject.code}
                        onClick={() => setSelectedSubject(selectedSubject === subject.code ? null : subject.code)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1 ${
                          selectedSubject === subject.code
                            ? 'bg-primary-500 text-white'
                            : 'bg-[var(--bg-tertiary)] text-gray-300 hover:bg-[var(--bg-hover)]'
                        }`}
                      >
                        <span>{subject.icon}</span> {subject.name}
                      </button>
                    ))}
                  </div>
                  
                  {/* Difficulty Filter */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-gray-400 py-2">Difficulty:</span>
                    {difficulties.map((diff) => (
                      <button
                        key={diff.value}
                        onClick={() => setSelectedDifficulty(selectedDifficulty === diff.value ? null : diff.value)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          selectedDifficulty === diff.value
                            ? `${diff.bg} ${diff.color}`
                            : 'bg-[var(--bg-tertiary)] text-gray-300 hover:bg-[var(--bg-hover)]'
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
                  <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : questions.length === 0 ? (
                <div className="text-center py-20">
                  <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No questions found</h3>
                  <p className="text-gray-400">Try adjusting your filters or generate English questions from admin panel</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {questions.map((question, index) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setActiveQuestion(question)}
                      className="card cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{subjects.find(s => s.code === question.subject_code)?.icon || '📚'}</span>
                          <span className="text-sm text-gray-400">{question.main_topic}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          difficulties.find(d => d.value === question.difficulty)?.bg
                        } ${
                          difficulties.find(d => d.value === question.difficulty)?.color
                        }`}>
                          {difficulties.find(d => d.value === question.difficulty)?.label}
                        </span>
                      </div>
                      
                      <p className="text-gray-200 line-clamp-3 mb-4">
                        <MathRenderer content={question.question_text.substring(0, 200) + (question.question_text.length > 200 ? '...' : '')} />
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Grade {question.grade}</span>
                        <span className="flex items-center gap-1 text-primary-400 group-hover:text-primary-300">
                          Solve <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
