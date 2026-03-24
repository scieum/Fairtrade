'use client'

interface MessageBubbleProps {
  role: 'user' | 'assistant'
  content: string
}

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div
        className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap
          ${
            isUser
              ? 'bg-[#2D7D46] text-white rounded-2xl rounded-br-md'
              : 'bg-[#f5f5f5] text-[#171717] rounded-2xl rounded-bl-md'
          }`}
      >
        {content}
      </div>
    </div>
  )
}
