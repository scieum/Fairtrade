'use client'

import { useState, useEffect, useCallback } from 'react'
import type { AppPhase, RoundSize, FairTradeItem } from '@/lib/types'
import NavBar from '@/components/NavBar'
import Landing from '@/components/Landing'
import Footer from '@/components/Footer'
import WorldCupGame from '@/components/worldcup/WorldCupGame'
import WinnerReveal from '@/components/worldcup/WinnerReveal'
import ChatContainer from '@/components/chat/ChatContainer'

const SESSION_KEY = 'fair-trade-class-state'

interface SessionState {
  phase: AppPhase
  roundSize: RoundSize
  winner: FairTradeItem | null
}

export default function Home() {
  const [phase, setPhase] = useState<AppPhase>('landing')
  const [roundSize, setRoundSize] = useState<RoundSize>(16)
  const [winner, setWinner] = useState<FairTradeItem | null>(null)
  const [hydrated, setHydrated] = useState(false)

  // Restore session
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY)
      if (saved) {
        const state: SessionState = JSON.parse(saved)
        setPhase(state.phase === 'worldcup' ? 'landing' : state.phase)
        setRoundSize(state.roundSize)
        setWinner(state.winner)
      }
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  // Save session
  useEffect(() => {
    if (!hydrated) return
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ phase, roundSize, winner }),
    )
  }, [phase, roundSize, winner, hydrated])

  const handleStart = useCallback((size: RoundSize) => {
    setRoundSize(size)
    setWinner(null)
    setPhase('worldcup')
  }, [])

  const handleWinner = useCallback((w: FairTradeItem) => {
    setWinner(w)
    setPhase('winner')
  }, [])

  const handleStartChat = useCallback(() => {
    setPhase('chat')
  }, [])

  const handleComplete = useCallback(() => {
    setPhase('complete')
  }, [])

  const handleGoHome = useCallback(() => {
    setPhase('landing')
  }, [])

  const handleReset = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY)
    setWinner(null)
    setPhase('landing')
  }, [])

  const handleResume = useCallback(() => {
    if (winner) setPhase('chat')
  }, [winner])

  if (!hydrated) return null

  const showNav = phase !== 'landing'
  const navTitle =
    phase === 'worldcup'
      ? '관심 주제 월드컵'
      : phase === 'chat' || phase === 'complete'
        ? `${winner?.emoji} ${winner?.title}`
        : undefined

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {showNav && <NavBar title={navTitle} onGoHome={handleGoHome} />}

      <main className="flex-1">
        {phase === 'landing' && (
          <Landing
            onStart={handleStart}
            previousWinner={winner}
            onResume={handleResume}
            onReset={handleReset}
          />
        )}

        {phase === 'worldcup' && (
          <WorldCupGame roundSize={roundSize} onWinner={handleWinner} />
        )}

        {phase === 'winner' && winner && (
          <WinnerReveal
            winner={winner}
            onStartChat={handleStartChat}
            onGoHome={handleGoHome}
          />
        )}

        {(phase === 'chat' || phase === 'complete') && winner && (
          <ChatContainer
            item={winner}
            onComplete={handleComplete}
            onGoHome={handleGoHome}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}
