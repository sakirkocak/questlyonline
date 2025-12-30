import Typesense from 'typesense'

// Server-side Typesense client
export const typesenseClient = new Typesense.Client({
  nodes: [
    {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST || '',
      port: 443,
      protocol: 'https',
    },
  ],
  apiKey: process.env.TYPESENSE_ADMIN_API_KEY || process.env.NEXT_PUBLIC_TYPESENSE_API_KEY || '',
  connectionTimeoutSeconds: 10,
})

// Collection names
export const COLLECTIONS = {
  QUESTIONS: 'questions',
  LEADERBOARD: 'leaderboard',
} as const

// Check if Typesense is available
export function isTypesenseAvailable(): boolean {
  return !!(process.env.NEXT_PUBLIC_TYPESENSE_HOST && process.env.NEXT_PUBLIC_TYPESENSE_API_KEY)
}
