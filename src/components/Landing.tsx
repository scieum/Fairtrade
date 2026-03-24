'use client'

import type { RoundSize, FairTradeItem } from '@/lib/types'

interface LandingProps {
  onStart: (roundSize: RoundSize) => void
  previousWinner: FairTradeItem | null
  onResume: () => void
  onReset: () => void
}

const ROUND_OPTIONS: { size: RoundSize; label: string }[] = [
  { size: 32, label: '32강' },
  { size: 16, label: '16강' },
]

export default function Landing({ onStart }: LandingProps) {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/Home.png')" }}
    >
      <div className="flex gap-4">
        {ROUND_OPTIONS.map(({ size, label }) => (
          <button
            key={size}
            onClick={() => onStart(size)}
            className="px-8 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-white
              text-xl font-bold text-[#171717] shadow-lg
              hover:bg-white hover:scale-105 hover:border-[#2D7D46]
              active:scale-95 transition-all cursor-pointer"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
