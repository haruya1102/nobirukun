'use client'

import { useEffect, useState } from 'react'
import { StretchCharacter } from './stretch-character'
import { calcScaleFactor } from '@/lib/growth'
import type { BodyPartId, BodyPartStatsMap } from '@/types'

interface AnimatedStretchCharacterProps {
  stats: BodyPartStatsMap
  size?: number
  highlightParts?: BodyPartId[]
}

function buildPrevStats(
  stats: BodyPartStatsMap,
  highlightParts: BodyPartId[],
): BodyPartStatsMap {
  const prev: BodyPartStatsMap = {}
  for (const [id, s] of Object.entries(stats)) {
    const partId = id as BodyPartId
    if (highlightParts.includes(partId) && s) {
      const prevDays = Math.max(0, s.recordedDays - 1)
      prev[partId] = {
        ...s,
        recordedDays: prevDays,
        scaleFactor: calcScaleFactor(prevDays, partId),
      }
    } else {
      prev[partId] = s
    }
  }
  return prev
}

export function AnimatedStretchCharacter({
  stats,
  size,
  highlightParts = [],
}: AnimatedStretchCharacterProps) {
  const shouldAnimate = highlightParts.length > 0
  const [currentStats, setCurrentStats] = useState<BodyPartStatsMap>(
    shouldAnimate ? buildPrevStats(stats, highlightParts) : stats,
  )
  const [showHighlight, setShowHighlight] = useState(shouldAnimate)

  useEffect(() => {
    if (!shouldAnimate) return

    const timer = setTimeout(() => {
      setCurrentStats(stats)
    }, 100)

    const highlightTimer = setTimeout(() => {
      setShowHighlight(false)
    }, 2500)

    return () => {
      clearTimeout(timer)
      clearTimeout(highlightTimer)
    }
  }, [shouldAnimate, stats])

  return (
    <StretchCharacter
      stats={currentStats}
      size={size}
      highlightParts={showHighlight ? highlightParts : []}
    />
  )
}
