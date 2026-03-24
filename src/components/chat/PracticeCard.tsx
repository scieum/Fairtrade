'use client'

import { useState } from 'react'
import type { PracticeSummary } from '@/lib/types'

interface PracticeCardProps {
  summary: PracticeSummary
  onRevise: () => void
  onGoHome: () => void
}

export default function PracticeCard({ summary, onRevise, onGoHome }: PracticeCardProps) {
  const [copied, setCopied] = useState(false)

  const cardText = `🌱 나의 윤리적 소비 실천 카드\n\n📋 실천 계획: ${summary.plan}\n✅ 구체적 행동: ${summary.action}\n💡 이유: ${summary.reason}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cardText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: '나의 윤리적 소비 실천 카드', text: cardText })
      } catch {
        handleCopy()
      }
    } else {
      handleCopy()
    }
  }

  return (
    <div className="animate-fade-in my-4">
      <div className="border-2 border-[#2D7D46] rounded-2xl p-6 bg-white">
        <div className="text-center mb-4">
          <span className="text-3xl">🌱</span>
          <h3 className="text-lg font-bold text-[#171717] mt-1">나의 윤리적 소비 실천 카드</h3>
        </div>

        <div className="space-y-3">
          <div>
            <span className="text-xs font-semibold text-[#2D7D46]">📋 실천 계획</span>
            <p className="text-sm text-[#171717] mt-0.5">{summary.plan}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-[#2D7D46]">✅ 구체적 행동</span>
            <p className="text-sm text-[#171717] mt-0.5">{summary.action}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-[#2D7D46]">💡 이유</span>
            <p className="text-sm text-[#171717] mt-0.5">{summary.reason}</p>
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button
            onClick={handleCopy}
            className="flex-1 px-3 py-2 text-sm border border-[#2D7D46] text-[#2D7D46] rounded-xl
              hover:bg-[#f0faf3] transition-colors cursor-pointer"
          >
            {copied ? '복사됨!' : '📋 복사'}
          </button>
          <button
            onClick={handleShare}
            className="flex-1 px-3 py-2 text-sm border border-[#2D7D46] text-[#2D7D46] rounded-xl
              hover:bg-[#f0faf3] transition-colors cursor-pointer"
          >
            🔗 공유
          </button>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={onRevise}
          className="flex-1 px-4 py-2.5 text-sm bg-[#2D7D46] text-white rounded-xl
            hover:bg-[#246b3a] transition-colors cursor-pointer font-medium"
        >
          다시 대화하기
        </button>
        <button
          onClick={onGoHome}
          className="flex-1 px-4 py-2.5 text-sm border border-[#e5e5e5] text-[#525252] rounded-xl
            hover:bg-[#f9f9f9] transition-colors cursor-pointer"
        >
          처음으로
        </button>
      </div>
    </div>
  )
}
