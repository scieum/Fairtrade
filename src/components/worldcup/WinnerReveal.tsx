'use client'

import type { FairTradeItem } from '@/lib/types'

interface WinnerRevealProps {
  winner: FairTradeItem
  onStartChat: () => void
  onGoHome: () => void
}

export default function WinnerReveal({ winner, onStartChat, onGoHome }: WinnerRevealProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 animate-bounce-in">
      <span className="text-6xl mb-4">🏆</span>
      <h2 className="text-2xl font-bold text-[#171717] mb-2">나의 관심 주제!</h2>

      <div className="mt-4 p-6 bg-white border-2 border-[#2D7D46] rounded-2xl max-w-md w-full text-center shadow-md">
        <span className="text-5xl block mb-3">{winner.emoji}</span>
        <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-[#f0faf3] text-[#2D7D46] font-medium mb-2">
          {winner.category}
        </span>
        <h3 className="text-xl font-bold text-[#171717] mb-2">{winner.title}</h3>
        <p className="text-sm text-[#525252]">{winner.shortDescription}</p>
      </div>

      <div className="flex gap-3 mt-8">
        <button
          onClick={onStartChat}
          className="px-6 py-3 bg-[#2D7D46] text-white rounded-xl font-semibold hover:bg-[#246b3a] transition-colors cursor-pointer"
        >
          🌱 이 주제로 탐구 시작하기
        </button>
        <button
          onClick={onGoHome}
          className="px-4 py-3 bg-white border border-[#e5e5e5] text-[#525252] rounded-xl hover:bg-[#f9f9f9] transition-colors cursor-pointer"
        >
          처음으로
        </button>
      </div>
    </div>
  )
}
