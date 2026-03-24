export interface FairTradeItem {
  id: number
  title: string
  shortDescription: string
  category: '산업·상품' | '사회·윤리'
  emoji: string
  keyFacts: string[]
}

export interface Match {
  a: FairTradeItem
  b: FairTradeItem
}

export type AppPhase = 'landing' | 'worldcup' | 'winner' | 'chat' | 'complete'

export type RoundSize = 32 | 16 | 8

export interface ChatStage {
  stage: number
  name: string
}

export interface ParsedResponse {
  stage: number | null
  options: string[]
  finalTopic: string | null
  cleanText: string
}

export interface PracticeSummary {
  plan: string
  action: string
  reason: string
}
