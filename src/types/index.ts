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
  transformOrigin: 'bottom center' | 'top center'
}

export const BODY_PARTS: BodyPartMeta[] = [
  { id: 'neck',        label: '首',         emoji: '🙆', transformOrigin: 'bottom center' },
  { id: 'shoulders',   label: '肩',         emoji: '💁', transformOrigin: 'bottom center' },
  { id: 'upper-back',  label: '胸・背中',   emoji: '🫁', transformOrigin: 'bottom center' },
  { id: 'lower-back',  label: '腰',         emoji: '🌊', transformOrigin: 'top center'    },
  { id: 'hips',        label: '股関節',     emoji: '🧘', transformOrigin: 'top center'    },
  { id: 'thighs',      label: 'もも',       emoji: '🦵', transformOrigin: 'top center'    },
  { id: 'calves',      label: 'ふくらはぎ', emoji: '🏃', transformOrigin: 'top center'    },
  { id: 'arms',        label: '腕・手首',   emoji: '💪', transformOrigin: 'top center'    },
] as const

// ========== 記録エンティティ ==========

export interface StretchLog {
  id: string
  bodyPartId: BodyPartId
  minutes: number       // 1〜60
  recordedAt: Date
}

// ========== 統計・表示用 ==========

export interface BodyPartStats {
  bodyPartId: BodyPartId
  totalMinutes: number
  scaleFactor: number   // 1.0〜1.6
  lastRecordedAt: Date | null
}

export type BodyPartStatsMap = Partial<Record<BodyPartId, BodyPartStats>>

export interface StretchSummary {
  stats: BodyPartStatsMap
  totalMinutesAllParts: number
  recordedDaysCount: number
}

// ========== ユーザー設定 ==========

export interface UserSettings {
  dailyGoalMinutes: number  // デフォルト: 10
}
