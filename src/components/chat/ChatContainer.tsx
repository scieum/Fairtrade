'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useChat } from '@ai-sdk/react'
import { TextStreamChatTransport } from 'ai'
import type { FairTradeItem, PracticeSummary } from '@/lib/types'
import { parseAIResponse, parseFinalTopic } from '@/lib/parse-ai-response'
import MessageBubble from './MessageBubble'
import ChatInput from './ChatInput'
import OptionButtons from './OptionButtons'
import StageIndicator from './StageIndicator'
import PracticeCard from './PracticeCard'

interface ChatContainerProps {
  item: FairTradeItem
  onComplete: () => void
  onGoHome: () => void
}

export default function ChatContainer({ item, onComplete, onGoHome }: ChatContainerProps) {
  const [currentStage, setCurrentStage] = useState(1)
  const [options, setOptions] = useState<string[]>([])
  const [finalSummary, setFinalSummary] = useState<PracticeSummary | null>(null)
  const [showOptions, setShowOptions] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const hasSentFirst = useRef(false)

  const transport = useMemo(
    () =>
      new TextStreamChatTransport({
        api: '/api/chat',
        body: { itemTitle: item.title, itemDescription: item.shortDescription },
      }),
    [item.title, item.shortDescription],
  )

  const { messages, sendMessage, status, error, regenerate } = useChat({
    transport,
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  // Auto-send first message
  useEffect(() => {
    if (!hasSentFirst.current) {
      hasSentFirst.current = true
      sendMessage({
        text: `안녕하세요! 저는 "${item.title}"에 대해 관심이 있어요.`,
      })
    }
  }, [item.title, sendMessage])

  // Parse AI responses
  useEffect(() => {
    if (messages.length === 0) return
    const lastMsg = messages[messages.length - 1]
    if (lastMsg.role !== 'assistant' || isLoading) return

    const content = lastMsg.parts
      ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map(p => p.text)
      .join('') ?? ''

    const parsed = parseAIResponse(content)

    if (parsed.stage !== null) setCurrentStage(parsed.stage)

    if (parsed.options.length > 0) {
      setOptions(parsed.options)
      setShowOptions(true)
    }

    if (parsed.finalTopic) {
      const summary = parseFinalTopic(parsed.finalTopic)
      setFinalSummary(summary)
      onComplete()
    }
  }, [messages, isLoading, onComplete])

  // Auto-scroll
  useEffect(() => {
    if (messages.length > 2) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isLoading])

  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return
    setShowOptions(false)
    setOptions([])
    sendMessage({ text: inputValue })
    setInputValue('')
  }, [inputValue, sendMessage])

  const handleOptionSelect = useCallback(
    (option: string) => {
      setShowOptions(false)
      setOptions([])
      sendMessage({ text: option })
    },
    [sendMessage],
  )

  const handleRevise = useCallback(() => {
    setFinalSummary(null)
    sendMessage({ text: '실천 계획을 좀 더 다듬어보고 싶어요.' })
  }, [sendMessage])

  // Helper to get text content from message
  const getMessageText = (msg: typeof messages[number]): string => {
    if (msg.parts && msg.parts.length > 0) {
      return msg.parts
        .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
        .map(p => p.text)
        .join('')
    }
    return ''
  }

  // Clean displayed text
  const displayMessages = messages.map(m => ({
    id: m.id,
    role: m.role,
    content: m.role === 'assistant' ? parseAIResponse(getMessageText(m)).cleanText : getMessageText(m),
  }))

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      <StageIndicator currentStage={currentStage} />

      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-4">
        {displayMessages.map((msg) => (
          <MessageBubble key={msg.id} role={msg.role as 'user' | 'assistant'} content={msg.content} />
        ))}

        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-[#f5f5f5] rounded-2xl rounded-bl-md px-4 py-3 text-sm text-[#737373]">
              생각하고 있어요...
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center">
            <button
              onClick={() => regenerate()}
              className="text-sm text-red-500 underline cursor-pointer"
            >
              오류가 발생했어요. 다시 시도하기
            </button>
          </div>
        )}

        {showOptions && !isLoading && (
          <OptionButtons
            options={options}
            onSelect={handleOptionSelect}
            onContinueChat={() => setShowOptions(false)}
          />
        )}

        {finalSummary && (
          <PracticeCard
            summary={finalSummary}
            onRevise={handleRevise}
            onGoHome={onGoHome}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {!finalSummary && (
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSend}
          disabled={isLoading}
        />
      )}
    </div>
  )
}
