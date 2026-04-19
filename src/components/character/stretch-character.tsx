"use client"

import type { BodyPartStatsMap } from '@/types'
import { BODY_PARTS } from '@/types'

interface StretchCharacterProps {
  stats: BodyPartStatsMap
  size?: number
}

/**
 * 各部位の scaleFactor を SVG の scaleY に適用して描画する人体キャラクター。
 * SVG は正面向きの棒人間スタイル。各 <g> に部位IDを持ち、JS から transform を制御する。
 */
export function StretchCharacter({ stats, size = 280 }: StretchCharacterProps) {
  const getScale = (id: string): number => {
    return stats[id as keyof typeof stats]?.scaleFactor ?? 1
  }

  const getTransformOrigin = (id: string): string => {
    const part = BODY_PARTS.find((p) => p.id === id)
    return part?.transformOrigin ?? 'center'
  }

  const partStyle = (id: string): React.CSSProperties => ({
    transform: `scaleY(${getScale(id)})`,
    transformOrigin: getTransformOrigin(id),
    transformBox: 'fill-box',
    transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
  })

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ストレッチキャラクター"
    >
      {/* 頭（固定） */}
      <circle cx="100" cy="32" r="28" fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="3" />
      <circle cx="91" cy="28" r="3.5" fill="var(--primary)" />
      <circle cx="109" cy="28" r="3.5" fill="var(--primary)" />
      <path d="M 91 39 Q 100 46 109 39" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* 首 */}
      <g id="part-neck" style={partStyle('neck')}>
        <rect x="92" y="58" width="16" height="18" rx="6" fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="2.5" />
      </g>

      {/* 肩 */}
      <g id="part-shoulders" style={partStyle('shoulders')}>
        <rect x="50" y="74" width="100" height="14" rx="7" fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="2.5" />
      </g>

      {/* 胸・背中（上半身） */}
      <g id="part-upper-back" style={partStyle('upper-back')}>
        <rect x="72" y="86" width="56" height="50" rx="12" fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="2.5" />
      </g>

      {/* 腰（下半身上部） */}
      <g id="part-lower-back" style={partStyle('lower-back')}>
        <rect x="78" y="134" width="44" height="32" rx="8" fill="var(--primary-container)" stroke="var(--primary)" strokeWidth="2.5" />
      </g>

      {/* 股関節 */}
      <g id="part-hips" style={partStyle('hips')}>
        <rect x="70" y="164" width="60" height="18" rx="8" fill="var(--primary-container)" stroke="var(--primary)" strokeWidth="2.5" />
      </g>

      {/* 左もも */}
      <g id="part-thighs" style={partStyle('thighs')}>
        <rect x="72" y="180" width="24" height="52" rx="10" fill="var(--primary-container)" stroke="var(--primary)" strokeWidth="2.5" />
        <rect x="104" y="180" width="24" height="52" rx="10" fill="var(--primary-container)" stroke="var(--primary)" strokeWidth="2.5" />
      </g>

      {/* ふくらはぎ */}
      <g id="part-calves" style={partStyle('calves')}>
        <rect x="74" y="230" width="20" height="44" rx="8" fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="2.5" />
        <rect x="106" y="230" width="20" height="44" rx="8" fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="2.5" />
        {/* 足 */}
        <rect x="68" y="268" width="32" height="10" rx="5" fill="var(--primary)" />
        <rect x="100" y="268" width="32" height="10" rx="5" fill="var(--primary)" />
      </g>

      {/* 腕・手首 */}
      <g id="part-arms" style={partStyle('arms')}>
        <rect x="34" y="86" width="18" height="64" rx="9" fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="2.5" />
        <rect x="148" y="86" width="18" height="64" rx="9" fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="2.5" />
        {/* 手 */}
        <circle cx="43" cy="157" r="10" fill="var(--primary-container)" stroke="var(--primary)" strokeWidth="2.5" />
        <circle cx="157" cy="157" r="10" fill="var(--primary-container)" stroke="var(--primary)" strokeWidth="2.5" />
      </g>
    </svg>
  )
}
