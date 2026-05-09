"use client"

import type { BodyPartId, BodyPartStatsMap } from '@/types'

interface StretchCharacterProps {
  stats: BodyPartStatsMap
  size?: number
}

/** 脊椎パーツの自然位置（伸長前のSVG座標）。上から下に並ぶ。 */
const SPINE: { id: BodyPartId; y: number; height: number }[] = [
  { id: 'neck',       y: 58,  height: 18 },
  { id: 'shoulders',  y: 74,  height: 14 },
  { id: 'upper-back', y: 86,  height: 50 },
  { id: 'lower-back', y: 134, height: 32 },
  { id: 'hips',       y: 164, height: 18 },
  { id: 'thighs',     y: 180, height: 52 },
  { id: 'calves',     y: 230, height: 48 }, // 含: 足
]

/** SVG viewBox の幅（腕が最大2.5倍まで横に伸びる余白を十分に確保） */
const VB_WIDTH = 320
/** viewBox の左端 X 座標（body中心 x=100 を中心に対称配置） */
const VB_X = -60
/** 脊椎の伸長前の総高さ（足の下に少しだけマージン） */
const BASE_HEIGHT = 290

const TRANSITION = 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)'

/**
 * 各部位の scaleFactor を SVG に適用する人体キャラクター。
 *
 * 脊椎は上から下に積み上がり、上の部位が伸びると下の部位は
 * その伸長分だけ translateY で押し下げられる（重なって膨れない）。
 * 腕は横に広げた T ポーズで、scaleX で外側へ伸びる。肩の下端からの
 * 縦方向 push（首+肩の伸長）も合わせて受ける。
 *
 * transform は SVG 属性で直接書くことで、ブラウザ間の transform-box の
 * 解釈差異の影響を受けないようにしている。
 */
export function StretchCharacter({ stats, size = 160 }: StretchCharacterProps) {
  const scale = (id: BodyPartId): number => stats[id]?.scaleFactor ?? 1

  // 脊椎パーツの累積offset: 自分より上の部位の伸長分の合計
  const offsets = new Map<BodyPartId, number>()
  let cum = 0
  for (const p of SPINE) {
    offsets.set(p.id, cum)
    cum += (scale(p.id) - 1) * p.height
  }
  const totalExtension = cum

  // 腕は肩の下端に取り付く（首+肩の伸長分だけ Y 方向に押し下げる）
  const armsAttachOffset = offsets.get('upper-back') ?? 0
  const armScale = scale('arms')

  const vbHeight = BASE_HEIGHT + Math.ceil(totalExtension)
  const renderHeight = (size * vbHeight) / VB_WIDTH

  /**
   * y0 を不動点として scaleY(s) と translateY(d) を合成した SVG transform。
   * 元の y 座標 Y は s*(Y-y0) + d + y0 へ写る。
   */
  const spineTx = (id: BodyPartId, y0: number): string => {
    const s = scale(id)
    const d = offsets.get(id) ?? 0
    return `translate(0 ${d + y0}) scale(1 ${s}) translate(0 ${-y0})`
  }

  /**
   * x0 を不動点として scaleX(armScale) と translateY(armsAttachOffset) を合成。
   * 左腕は肩の左端 (x=50)、右腕は右端 (x=150) を中心に外へ伸ばす。
   */
  const armTx = (x0: number): string =>
    `translate(${x0} ${armsAttachOffset}) scale(${armScale} 1) translate(${-x0} 0)`

  return (
    <svg
      width={size}
      height={renderHeight}
      viewBox={`${VB_X} 0 ${VB_WIDTH} ${vbHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ストレッチキャラクター"
      // overflow: visible で viewBox 外に出るアンチエイリアス分も切れないようにする
      style={{ overflow: 'visible', transition: 'height 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
    >
      {/* 頭（固定） */}
      <circle cx="100" cy="32" r="28" fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="3" />
      <circle cx="91" cy="28" r="3.5" fill="var(--primary)" />
      <circle cx="109" cy="28" r="3.5" fill="var(--primary)" />
      <path d="M 91 39 Q 100 46 109 39" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* 首 */}
      <g transform={spineTx('neck', 58)} style={{ transition: TRANSITION }}>
        <rect x="92" y="58" width="16" height="18" rx="6" fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="2.5" />
      </g>

      {/* 肩 */}
      <g transform={spineTx('shoulders', 74)} style={{ transition: TRANSITION }}>
        <rect x="50" y="74" width="100" height="14" rx="7" fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="2.5" />
      </g>

      {/* 胸・背中 */}
      <g transform={spineTx('upper-back', 86)} style={{ transition: TRANSITION }}>
        <rect x="72" y="86" width="56" height="50" rx="12" fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="2.5" />
      </g>

      {/* 腰 */}
      <g transform={spineTx('lower-back', 134)} style={{ transition: TRANSITION }}>
        <rect x="78" y="134" width="44" height="32" rx="8" fill="var(--primary-container)" stroke="var(--primary)" strokeWidth="2.5" />
      </g>

      {/* 股関節 */}
      <g transform={spineTx('hips', 164)} style={{ transition: TRANSITION }}>
        <rect x="70" y="164" width="60" height="18" rx="8" fill="var(--primary-container)" stroke="var(--primary)" strokeWidth="2.5" />
      </g>

      {/* もも */}
      <g transform={spineTx('thighs', 180)} style={{ transition: TRANSITION }}>
        <rect x="72" y="180" width="24" height="52" rx="10" fill="var(--primary-container)" stroke="var(--primary)" strokeWidth="2.5" />
        <rect x="104" y="180" width="24" height="52" rx="10" fill="var(--primary-container)" stroke="var(--primary)" strokeWidth="2.5" />
      </g>

      {/* ふくらはぎ + 足 */}
      <g transform={spineTx('calves', 230)} style={{ transition: TRANSITION }}>
        <rect x="74" y="230" width="20" height="44" rx="8" fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="2.5" />
        <rect x="106" y="230" width="20" height="44" rx="8" fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="2.5" />
        <rect x="68" y="268" width="32" height="10" rx="5" fill="var(--primary)" />
        <rect x="100" y="268" width="32" height="10" rx="5" fill="var(--primary)" />
      </g>

      {/* 左腕（横方向・肩の左端 x=50 から外へ） */}
      <g transform={armTx(50)} style={{ transition: TRANSITION }}>
        <rect x="15" y="76" width="35" height="14" rx="7" fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="2.5" />
        <circle cx="15" cy="83" r="9" fill="var(--primary-container)" stroke="var(--primary)" strokeWidth="2.5" />
      </g>

      {/* 右腕（横方向・肩の右端 x=150 から外へ） */}
      <g transform={armTx(150)} style={{ transition: TRANSITION }}>
        <rect x="150" y="76" width="35" height="14" rx="7" fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="2.5" />
        <circle cx="185" cy="83" r="9" fill="var(--primary-container)" stroke="var(--primary)" strokeWidth="2.5" />
      </g>
    </svg>
  )
}
