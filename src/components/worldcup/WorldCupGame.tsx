'use client'

import { useState, useCallback } from 'react'
import type { FairTradeItem, Match, RoundSize } from '@/lib/types'
import { createBracket, nextRound } from '@/lib/bracket'
import MatchPair from './MatchPair'
import RoundIndicator from './RoundIndicator'
import RoundBreak from './RoundBreak'

interface WorldCupGameProps {
  roundSize: RoundSize
  onWinner: (winner: FairTradeItem) => void
}

export default function WorldCupGame({ roundSize, onWinner }: WorldCupGameProps) {
  const [matches, setMatches] = useState<Match[]>(() => createBracket(roundSize))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [winners, setWinners] = useState<FairTradeItem[]>([])
  const [showBreak, setShowBreak] = useState(false)

  const handleSelect = useCallback(
    (winner: FairTradeItem) => {
      const newWinners = [...winners, winner]

      if (currentIndex + 1 < matches.length) {
        setWinners(newWinners)
        setCurrentIndex(currentIndex + 1)
      } else {
        // Round complete
        if (newWinners.length === 1) {
          onWinner(newWinners[0])
        } else {
          setWinners(newWinners)
          setShowBreak(true)
        }
      }
    },
    [winners, currentIndex, matches.length, onWinner],
  )

  const handleContinueRound = useCallback(() => {
    const newMatches = nextRound(winners)
    setMatches(newMatches)
    setCurrentIndex(0)
    setWinners([])
    setShowBreak(false)
  }, [winners])

  if (showBreak) {
    return (
      <RoundBreak
        nextRoundCount={winners.length}
        onContinue={handleContinueRound}
      />
    )
  }

  const currentMatch = matches[currentIndex]
  if (!currentMatch) return null

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4">
      <div className="w-full">
        <RoundIndicator
          currentMatch={currentIndex}
          totalMatches={matches.length}
          totalInRound={matches.length}
        />
        <MatchPair match={currentMatch} onSelect={handleSelect} />
      </div>
    </div>
  )
}
