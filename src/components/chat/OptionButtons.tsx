'use client'

interface OptionButtonsProps {
  options: string[]
  onSelect: (option: string) => void
  onContinueChat: () => void
}

export default function OptionButtons({ options, onSelect, onContinueChat }: OptionButtonsProps) {
  return (
    <div className="flex flex-col gap-2 my-3 animate-fade-in">
      {options.map((option, i) => (
        <button
          key={i}
          onClick={() => onSelect(option)}
          className="px-4 py-2.5 text-sm border-2 border-[#2D7D46] text-[#2D7D46] rounded-xl
            hover:bg-[#f0faf3] transition-colors cursor-pointer text-left"
        >
          {option}
        </button>
      ))}
      <button
        onClick={onContinueChat}
        className="px-4 py-2 text-xs text-[#737373] hover:text-[#2D7D46]
          transition-colors cursor-pointer flex items-center gap-1"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
        직접 입력하기
      </button>
    </div>
  )
}
