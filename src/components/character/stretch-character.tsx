"use client"

import type { BodyPartId, BodyPartStatsMap } from '@/types'

interface StretchCharacterProps {
  stats: BodyPartStatsMap
  size?: number
}

/**
 * 脊椎パーツの自然位置（伸長前のSVG座標）。上から下に並ぶ。
 * `height` は実際の rect 高さと一致させる：累積オフセットや vbHeight の計算と
 * 描画される矩形の長さを同じ尺度に保つため。
 */
const SPINE: { id: BodyPartId; y: number; height: number }[] = [
  { id: 'neck',       y: 58,  height: 18 },
  { id: 'shoulders',  y: 74,  height: 14 },
  { id: 'upper-back', y: 86,  height: 50 },
  { id: 'lower-back', y: 134, height: 32 },
  { id: 'hips',       y: 164, height: 18 },
  { id: 'thighs',     y: 180, height: 52 },
  { id: 'calves',     y: 230, height: 44 }, // 足は別要素。下に 4px はみ出す
]

/** SVG viewBox の幅（腕が最大2.5倍まで横に伸びる余白を十分に確保） */
const VB_WIDTH = 320
/** viewBox の左端 X 座標（body中心 x=100 を中心に対称配置） */
const VB_X = -60
/** 脊椎の伸長前の総高さ（足の下に少しだけマージン） */
const BASE_HEIGHT = 290

const SPRING = '1.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
// SVG 属性 (y/x/width/height/cx/cy) は CSS プロパティとしても扱えるので
// transition で滑らかに補間できる（Chrome 77+/Safari 14+/Firefox 75+）。
const TRANSITION = ['y', 'x', 'width', 'height', 'cx', 'cy']
  .map((p) => `${p} ${SPRING}`)
  .join(', ')
const animated = { transition: TRANSITION } as const

/**
 * 各部位の scaleFactor を SVG に適用する人体キャラクター。
 *
 * 伸長は transform("scale") ではなく **属性値の直接書き換え** で行う：
 * scale 変換は rect の `rx`（角丸）や stroke、`<circle>` の半径まで歪めて
 * しまうため、`height`（縦方向）/`width`（腕）だけを scaleFactor 倍した
 * 値で書き出し、`rx` とストローク幅は不変に保つ。これによって角丸と線の
 * 太さが等方的に維持され、手の `<circle>` も真円のまま位置だけ移動する。
 *
 * 脊椎は上から下に積み上がり、上の部位の伸長分は累積オフセットとして
 * 下の部位の `y` に加算される（部位同士が重なって膨れない）。
 * 腕は肩の下端からの縦オフセット（首+肩の伸長）も合わせて受ける。
 */
export function StretchCharacter({ stats, size = 160 }: StretchCharacterProps) {
  const scale = (id: BodyPartId): number => stats[id]?.scaleFactor ?? 1

  // 各脊椎パーツの「自分が始まる時点での累積下方オフセット」を求める
  const offsets = new Map<BodyPartId, number>()
  let cum = 0
  for (const p of SPINE) {
    offsets.set(p.id, cum)
    cum += (scale(p.id) - 1) * p.height
  }
  const totalExtension = cum

  /** 脊椎パーツの新しい y / height（rx・width・ストロークは元のまま） */
  const sy = (id: BodyPartId, origY: number): number => origY + (offsets.get(id) ?? 0)
  const sh = (id: BodyPartId, origH: number): number => origH * scale(id)

  // 足は calves と一緒に下方向に押し下げるが、自分は伸ばさない（真円・角丸維持）
  const calvesOffset = offsets.get('calves') ?? 0
  const calvesPushDown = (scale('calves') - 1) * 44
  const feetY = (origY: number): number => origY + calvesOffset + calvesPushDown

  // 腕は肩の下端に取り付く（首+肩の伸長分だけ Y 方向に押し下げる）
  const armsAttachOffset = offsets.get('upper-back') ?? 0
  const armScale = scale('arms')
  // 左腕: 肩の左端 x=50 を内側固定点とし、外側へ伸ばす
  const leftArmW = 35 * armScale
  const leftArmX = 50 - leftArmW
  // 右腕: 肩の右端 x=150 を内側固定点とし、外側へ伸ばす
  const rightArmW = 35 * armScale
  const rightHandCx = 150 + rightArmW
  const armY = 76 + armsAttachOffset
  const handCy = 83 + armsAttachOffset

  const vbHeight = BASE_HEIGHT + Math.ceil(totalExtension)
  const renderHeight = (size * vbHeight) / VB_WIDTH

  return (
    <svg
      width={size}
      height={renderHeight}
      viewBox={`${VB_X} 0 ${VB_WIDTH} ${vbHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ストレッチキャラクター"
      // overflow: visible で viewBox 外に出るアンチエイリアス分も切れないようにする
      style={{ overflow: 'visible', transition: `height ${SPRING}` }}
    >
      {/* 頭（固定） */}
      <circle cx="100" cy="32" r="28" fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="3" />
      <circle cx="91" cy="28" r="3.5" fill="var(--primary)" />
      <circle cx="109" cy="28" r="3.5" fill="var(--primary)" />
      <path d="M 91 39 Q 100 46 109 39" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* 首 */}
      <rect
        x="92" y={sy('neck', 58)} width="16" height={sh('neck', 18)} rx="6"
        fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="2.5"
        style={animated}
      />

      {/* 肩 */}
      <rect
        x="50" y={sy('shoulders', 74)} width="100" height={sh('shoulders', 14)} rx="7"
        fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="2.5"
        style={animated}
      />

      {/* 胸・背中 */}
      <rect
        x="72" y={sy('upper-back', 86)} width="56" height={sh('upper-back', 50)} rx="12"
        fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="2.5"
        style={animated}
      />

      {/* 腰 */}
      <rect
        x="78" y={sy('lower-back', 134)} width="44" height={sh('lower-back', 32)} rx="8"
        fill="var(--primary-container)" stroke="var(--primary)" strokeWidth="2.5"
        style={animated}
      />

      {/* 股関節 */}
      <rect
        x="70" y={sy('hips', 164)} width="60" height={sh('hips', 18)} rx="8"
        fill="var(--primary-container)" stroke="var(--primary)" strokeWidth="2.5"
        style={animated}
      />

      {/* もも（左右） */}
      <rect
        x="72" y={sy('thighs', 180)} width="24" height={sh('thighs', 52)} rx="10"
        fill="var(--primary-container)" stroke="var(--primary)" strokeWidth="2.5"
        style={animated}
      />
      <rect
        x="104" y={sy('thighs', 180)} width="24" height={sh('thighs', 52)} rx="10"
        fill="var(--primary-container)" stroke="var(--primary)" strokeWidth="2.5"
        style={animated}
      />

      {/* ふくらはぎ（左右） */}
      <rect
        x="74" y={sy('calves', 230)} width="20" height={sh('calves', 44)} rx="8"
        fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="2.5"
        style={animated}
      />
      <rect
        x="106" y={sy('calves', 230)} width="20" height={sh('calves', 44)} rx="8"
        fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="2.5"
        style={animated}
      />

      {/* 足（ふくらはぎと一緒に下に平行移動するだけ。伸ばさない） */}
      <rect x="68" y={feetY(268)} width="32" height="10" rx="5" fill="var(--primary)" style={animated} />
      <rect x="100" y={feetY(268)} width="32" height="10" rx="5" fill="var(--primary)" style={animated} />

      {/* 左腕（rect の width だけ伸ばし、手の <circle> は cx だけ平行移動） */}
      <rect
        x={leftArmX} y={armY} width={leftArmW} height="14" rx="7"
        fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="2.5"
        style={animated}
      />
      <circle
        cx={leftArmX} cy={handCy} r="9"
        fill="var(--primary-container)" stroke="var(--primary)" strokeWidth="2.5"
        style={animated}
      />

      {/* 右腕 */}
      <rect
        x="150" y={armY} width={rightArmW} height="14" rx="7"
        fill="var(--primary-fixed)" stroke="var(--primary)" strokeWidth="2.5"
        style={animated}
      />
      <circle
        cx={rightHandCx} cy={handCy} r="9"
        fill="var(--primary-container)" stroke="var(--primary)" strokeWidth="2.5"
        style={animated}
      />
    </svg>
  )
}
