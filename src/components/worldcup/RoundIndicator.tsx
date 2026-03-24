'use client'

import { getRoundName } from '@/lib/bracket'

interface RoundIndicatorProps {
  currentMatch: number
  totalMatches: number
  totalInRound: number
}

export default function RoundIndicator({
  currentMatch,
  totalMatches,
  totalInRound,
}: RoundIndicatorProps) {
  const roundName = getRoundName(totalInRound * 2)
  const progress = ((currentMatch + 1) / totalMatches) * 100

  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-[#2D7D46]">{roundName}</span>
        <span className="text-sm text-[#737373]">
          {currentMatch + 1} / {totalMatches}
        </span>
      </div>
      <div className="h-2 bg-[#e5e5e5] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#2D7D46] rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
