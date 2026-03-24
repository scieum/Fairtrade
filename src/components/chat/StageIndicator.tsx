'use client'

import { CHAT_STAGES } from '@/lib/constants'

interface StageIndicatorProps {
  currentStage: number
}

export default function StageIndicator({ currentStage }: StageIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 py-4 px-2">
      {CHAT_STAGES.map((stage, i) => (
        <div key={stage.stage} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors
                ${
                  currentStage > stage.stage
                    ? 'bg-[#2D7D46] text-white'
                    : currentStage === stage.stage
                      ? 'bg-[#2D7D46] text-white ring-2 ring-[#2D7D46]/30'
                      : 'bg-[#e5e5e5] text-[#a3a3a3]'
                }`}
            >
              {currentStage > stage.stage ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                stage.stage
              )}
            </div>
            <span
              className={`text-[10px] mt-1 whitespace-nowrap
                ${currentStage >= stage.stage ? 'text-[#2D7D46] font-medium' : 'text-[#a3a3a3]'}`}
            >
              {stage.name}
            </span>
          </div>
          {i < CHAT_STAGES.length - 1 && (
            <div
              className={`w-8 sm:w-12 h-0.5 mx-1 mt-[-16px] transition-colors
                ${currentStage > stage.stage ? 'bg-[#2D7D46]' : 'bg-[#e5e5e5]'}`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
