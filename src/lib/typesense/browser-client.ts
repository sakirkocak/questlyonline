'use client'

import Typesense from 'typesense'
import type { Client } from 'typesense'

let browserClient: Client | null = null

export function getTypesenseBrowserClient(): Client {
  if (!browserClient) {
    browserClient = new Typesense.Client({
      nodes: [
        {
          host: process.env.NEXT_PUBLIC_TYPESENSE_HOST || '',
          port: 443,
          protocol: 'https',
        },
      ],
      apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY || '',
      connectionTimeoutSeconds: 5,
    })
  }
  return browserClient
}

// Collection names
export const COLLECTIONS = {
  QUESTIONS: 'questions',
  LEADERBOARD: 'leaderboard',
} as const

// Check if Typesense is enabled
export function isTypesenseEnabled(): boolean {
  return !!(process.env.NEXT_PUBLIC_TYPESENSE_HOST && process.env.NEXT_PUBLIC_TYPESENSE_API_KEY)
}

// Question interface
export interface QuestionDocument {
  id: string
  question_id: string
  question_text: string
  explanation?: string
  option_a?: string
  option_b?: string
  option_c?: string
  option_d?: string
  option_e?: string
  correct_answer: string
  image_url?: string
  lang?: string
  is_global?: boolean
  difficulty: string
  subject_id: string
  subject_code: string
  subject_name: string
  topic_id: string
  main_topic: string
  sub_topic?: string
  grade: number
  has_image?: boolean
  times_answered: number
  times_correct: number
  success_rate?: number
  created_at: number
}

// Search questions (English preferred, fallback to all)
export async function searchQuestions(
  query: string,
  filters?: {
    grade?: number
    subject_code?: string
    difficulty?: string
    limit?: number
    langFilter?: boolean  // true = only English, false/undefined = all
  }
): Promise<{ questions: QuestionDocument[]; total: number; duration: number }> {
  const startTime = performance.now()
  const client = getTypesenseBrowserClient()
  
  // Build filter - optionally filter by lang
  const filterParts: string[] = []
  if (filters?.langFilter) filterParts.push('lang:=en')
  if (filters?.grade) filterParts.push(`grade:=${filters.grade}`)
  if (filters?.subject_code) filterParts.push(`subject_code:=${filters.subject_code}`)
  if (filters?.difficulty) filterParts.push(`difficulty:=${filters.difficulty}`)
  
  const filterBy = filterParts.length > 0 ? filterParts.join(' && ') : undefined
  
  try {
    const searchParams: any = {
      q: query || '*',
      query_by: 'question_text,main_topic,sub_topic,explanation',
      per_page: filters?.limit || 20,
      sort_by: 'created_at:desc',
    }
    if (filterBy) searchParams.filter_by = filterBy
    
    const result = await client
      .collections(COLLECTIONS.QUESTIONS)
      .documents()
      .search(searchParams)
    
    const questions = (result.hits || []).map((hit: any) => hit.document as QuestionDocument)
    const duration = Math.round(performance.now() - startTime)
    
    return {
      questions,
      total: result.found || 0,
      duration,
    }
  } catch (error) {
    console.error('Typesense search error:', error)
    return { questions: [], total: 0, duration: 0 }
  }
}

// Get global stats
export async function getGlobalStats(): Promise<{
  totalQuestions: number
  activeStudents: number
  todayQuestions: number
  duration: number
}> {
  const startTime = performance.now()
  const client = getTypesenseBrowserClient()
  
  // Today's date in UTC
  const todayUTC = new Date().toISOString().split('T')[0]
  
  try {
    const [questionsResult, leaderboardResult, todayResult] = await Promise.all([
      client.collections(COLLECTIONS.QUESTIONS).documents().search({
        q: '*',
        query_by: 'question_text',
        per_page: 0,  // Tüm soruları say (lang filter yok)
      }),
      client.collections(COLLECTIONS.LEADERBOARD).documents().search({
        q: '*',
        query_by: 'full_name',
        per_page: 0,  // Tüm öğrencileri say
      }),
      client.collections(COLLECTIONS.LEADERBOARD).documents().search({
        q: '*',
        query_by: 'full_name',
        filter_by: `today_date:=${todayUTC}`,
        per_page: 250,
        include_fields: 'today_questions',
      }),
    ])
    
    const todayQuestions = (todayResult.hits || []).reduce((sum: number, hit: any) => {
      return sum + (hit.document?.today_questions || 0)
    }, 0)
    
    const duration = Math.round(performance.now() - startTime)
    
    return {
      totalQuestions: questionsResult.found || 0,
      activeStudents: leaderboardResult.found || 0,
      todayQuestions,
      duration,
    }
  } catch (error) {
    console.error('Typesense stats error:', error)
    return { totalQuestions: 0, activeStudents: 0, todayQuestions: 0, duration: 0 }
  }
}

// Get global leaderboard
export async function getGlobalLeaderboard(
  filters?: {
    country_code?: string
    city_global_id?: string
    limit?: number
  }
): Promise<{ leaders: any[]; total: number; duration: number }> {
  const startTime = performance.now()
  const client = getTypesenseBrowserClient()
  
  // Build filter - optional filters
  const filterParts: string[] = []
  if (filters?.country_code) filterParts.push(`country_code:=${filters.country_code}`)
  if (filters?.city_global_id) filterParts.push(`city_global_id:=${filters.city_global_id}`)
  
  const filterBy = filterParts.length > 0 ? filterParts.join(' && ') : undefined
  
  try {
    const searchParams: any = {
      q: '*',
      query_by: 'full_name',
      per_page: filters?.limit || 50,
      sort_by: 'total_points:desc',
    }
    if (filterBy) searchParams.filter_by = filterBy
    
    const result = await client
      .collections(COLLECTIONS.LEADERBOARD)
      .documents()
      .search(searchParams)
    
    const leaders = (result.hits || []).map((hit: any) => hit.document)
    const duration = Math.round(performance.now() - startTime)
    
    return {
      leaders,
      total: result.found || 0,
      duration,
    }
  } catch (error) {
    console.error('Typesense leaderboard error:', error)
    return { leaders: [], total: 0, duration: 0 }
  }
}
