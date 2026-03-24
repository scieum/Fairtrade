'use client'

import { getRoundName } from '@/lib/bracket'

interface RoundBreakProps {
  nextRoundCount: number
  onContinue: () => void
}

export default function RoundBreak({ nextRoundCount, onContinue }: RoundBreakProps) {
  const nextRoundName = getRoundName(nextRoundCount)

  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <span className="text-5xl mb-4">🎉</span>
      <h2 className="text-2xl font-bold text-[#171717] mb-2">라운드 완료!</h2>
      <p className="text-[#525252] mb-6">
        다음은 <span className="font-semibold text-[#2D7D46]">{nextRoundName}</span>
        입니다 ({nextRoundCount / 2}경기)
      </p>
      <button
        onClick={onContinue}
        className="px-6 py-3 bg-[#2D7D46] text-white rounded-xl font-semibold hover:bg-[#246b3a] transition-colors cursor-pointer"
      >
        계속하기
      </button>
    </div>
  )
}
