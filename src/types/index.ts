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
  transformOrigin: 'bottom center' | 'top center'
}

export const BODY_PARTS: BodyPartMeta[] = [
  { id: 'neck',        label: '首',         transformOrigin: 'bottom center' },
  { id: 'shoulders',   label: '肩',         transformOrigin: 'bottom center' },
  { id: 'upper-back',  label: '胸・背中',   transformOrigin: 'bottom center' },
  { id: 'lower-back',  label: '腰',         transformOrigin: 'top center'    },
  { id: 'hips',        label: '股関節',     transformOrigin: 'top center'    },
  { id: 'thighs',      label: 'もも',       transformOrigin: 'top center'    },
  { id: 'calves',      label: 'ふくらはぎ', transformOrigin: 'top center'    },
  { id: 'arms',        label: '腕・手首',   transformOrigin: 'top center'    },
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
