import type { ParsedResponse, PracticeSummary } from './types'

export function parseAIResponse(text: string): ParsedResponse {
  const stageMatch = text.match(/\[STAGE:(\d+)\]/)
  const optionsMatch = text.match(/\[OPTIONS:([^\]]+)\]/)
  const finalMatch = text.match(/\[FINAL_TOPIC:([^\]]+)\]/)

  const stage = stageMatch ? parseInt(stageMatch[1], 10) : null
  const options = optionsMatch ? optionsMatch[1].split('|').map(o => o.trim()) : []
  const finalTopic = finalMatch ? finalMatch[1] : null

  const cleanText = text
    .replace(/\[STAGE:\d+\]/g, '')
    .replace(/\[OPTIONS:[^\]]+\]/g, '')
    .replace(/\[FINAL_TOPIC:[^\]]+\]/g, '')
    .trim()

  return { stage, options, finalTopic, cleanText }
}

export function parseFinalTopic(raw: string): PracticeSummary {
  const parts = raw.split('|').map(p => p.trim())
  return {
    plan: parts[0] || '',
    action: parts[1] || '',
    reason: parts[2] || '',
  }
}
