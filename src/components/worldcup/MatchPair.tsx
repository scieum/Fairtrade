'use client'

import type { Match, FairTradeItem } from '@/lib/types'
import MatchCard from './MatchCard'

interface MatchPairProps {
  match: Match
  onSelect: (winner: FairTradeItem) => void
}

export default function MatchPair({ match, onSelect }: MatchPairProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full max-w-3xl mx-auto">
      <MatchCard item={match.a} side="a" onSelect={() => onSelect(match.a)} />
      <div className="flex items-center justify-center shrink-0">
        <span className="text-xl font-bold text-[#a3a3a3]">VS</span>
      </div>
      <MatchCard item={match.b} side="b" onSelect={() => onSelect(match.b)} />
    </div>
  )
}
