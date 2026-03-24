'use client'

interface NavBarProps {
  title?: string
  onGoHome: () => void
}

export default function NavBar({ title, onGoHome }: NavBarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-[#e5e5e5]">
      <div className="max-w-3xl mx-auto flex items-center h-14 px-4">
        <button
          onClick={onGoHome}
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#f0faf3] transition-colors cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D7D46" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </button>
        {title && (
          <span className="ml-3 text-sm font-medium text-[#525252] truncate">{title}</span>
        )}
      </div>
    </header>
  )
}
