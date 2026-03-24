import type { FairTradeItem, Match } from './types'
import { ITEMS } from './items'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function disperseByCategory(items: FairTradeItem[]): FairTradeItem[] {
  const byCategory = new Map<string, FairTradeItem[]>()
  for (const item of items) {
    const list = byCategory.get(item.category) || []
    list.push(item)
    byCategory.set(item.category, list)
  }

  const result: FairTradeItem[] = []
  const queues = Array.from(byCategory.values()).map(q => shuffle(q))

  while (result.length < items.length) {
    for (const q of queues) {
      if (q.length > 0) result.push(q.shift()!)
    }
  }

  return result
}

export function createBracket(roundSize: number): Match[] {
  const shuffled = shuffle(ITEMS)
  const picked = shuffled.slice(0, roundSize)
  const dispersed = disperseByCategory(picked)

  const matches: Match[] = []
  for (let i = 0; i < dispersed.length; i += 2) {
    matches.push({ a: dispersed[i], b: dispersed[i + 1] })
  }
  return matches
}

export function nextRound(winners: FairTradeItem[]): Match[] {
  const matches: Match[] = []
  for (let i = 0; i < winners.length; i += 2) {
    matches.push({ a: winners[i], b: winners[i + 1] })
  }
  return matches
}

export function getRoundName(count: number): string {
  if (count === 2) return '결승'
  if (count === 4) return '준결승'
  return `${count}강`
}
