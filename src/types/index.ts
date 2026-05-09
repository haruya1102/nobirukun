// ========== 部位定義 ==========

export type BodyPartId =
  | 'neck'
  | 'shoulders'
  | 'upper-back'
  | 'lower-back'
  | 'hips'
  | 'thighs'
  | 'calves'
  | 'arms'

export interface BodyPartMeta {
  id: BodyPartId
  label: string
  emoji: string
}

export const BODY_PARTS: BodyPartMeta[] = [
  { id: 'neck',        label: '首',         emoji: '🙆' },
  { id: 'shoulders',   label: '肩',         emoji: '💁' },
  { id: 'upper-back',  label: '胸・背中',   emoji: '🫁' },
  { id: 'lower-back',  label: '腰',         emoji: '🌊' },
  { id: 'hips',        label: '股関節',     emoji: '🧘' },
  { id: 'thighs',      label: 'もも',       emoji: '🦵' },
  { id: 'calves',      label: 'ふくらはぎ', emoji: '🏃' },
  { id: 'arms',        label: '腕・手首',   emoji: '💪' },
] as const

// ========== 記録エンティティ ==========

export interface StretchLog {
  id: string
  bodyPartId: BodyPartId
  recordedAt: Date
}

// ========== 統計・表示用 ==========

export interface BodyPartStats {
  bodyPartId: BodyPartId
  recordedDays: number     // 当該月にこの部位を記録したユニーク日数（0〜30）
  scaleFactor: number      // 1.0〜（部位ごとの最大倍率まで）
  growthProgress: number   // 0〜1: 月目標(30日)に対する進捗率
  lastRecordedAt: Date | null
}

export type BodyPartStatsMap = Partial<Record<BodyPartId, BodyPartStats>>

export interface StretchSummary {
  stats: BodyPartStatsMap
  totalRecordsCount: number  // 今月の総記録数（部位×日）
  recordedDaysCount: number  // 今月いずれかの部位を記録したユニーク日数
}
