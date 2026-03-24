'use client'

import type { FairTradeItem } from '@/lib/types'

interface MatchCardProps {
  item: FairTradeItem
  side: 'a' | 'b'
  onSelect: () => void
}

export default function MatchCard({ item, side, onSelect }: MatchCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`flex-1 p-5 rounded-2xl border-2 border-[#e5e5e5] bg-white
        hover:border-[#2D7D46] hover:shadow-lg active:scale-[0.98]
        transition-all duration-200 cursor-pointer text-left
        ${side === 'a' ? 'animate-slide-in-left' : 'animate-slide-in-right'}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl">{item.emoji}</span>
        <div>
          <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-[#f0faf3] text-[#2D7D46] font-medium mb-1">
            {item.category}
          </span>
          <h3 className="text-lg font-bold text-[#171717]">{item.title}</h3>
        </div>
      </div>
      <p className="text-sm text-[#525252] mb-3">{item.shortDescription}</p>
      <ul className="space-y-1">
        {item.keyFacts.slice(0, 2).map((fact, i) => (
          <li key={i} className="text-xs text-[#737373] flex items-start gap-1.5">
            <span className="text-[#2D7D46] mt-0.5 shrink-0">•</span>
            <span className="hidden sm:inline">{fact}</span>
            <span className="sm:hidden">{i === 0 ? fact : ''}</span>
          </li>
        ))}
      </ul>
    </button>
  )
}
