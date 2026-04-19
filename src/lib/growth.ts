import type { BodyPartId, BodyPartStats, BodyPartStatsMap, StretchLog, StretchSummary, UserSettings } from '@/types'

export const DEFAULT_SETTINGS: UserSettings = {
  dailyGoalMinutes: 10,
}

/** 最大伸長率（60%伸びる） */
const GROWTH_FACTOR = 0.6

/**
 * 累積分数 → CSS scaleY 値
 *
 * MAX_MINUTES = dailyGoalMinutes × 30（月目標）
 * scaleFactor = 1 + clamp(totalMinutes, 0, MAX_MINUTES) / MAX_MINUTES × GROWTH_FACTOR
 *
 * 目標を毎日達成し続けると月末に最大伸長（1.6倍）になる。
 */
export function calcScaleFactor(totalMinutes: number, dailyGoalMinutes: number): number {
  const maxMinutes = Math.max(dailyGoalMinutes * 30, 1)
  const clamped = Math.min(Math.max(totalMinutes, 0), maxMinutes)
  return 1 + (clamped / maxMinutes) * GROWTH_FACTOR
}

/**
 * StretchLog[] から各部位の BodyPartStats を計算する。
 * yearMonth を指定すると、その月のログのみで集計する（月次リセット用）。
 */
export function calcBodyPartStats(
  logs: StretchLog[],
  dailyGoalMinutes: number,
  yearMonth?: { year: number; month: number },
): BodyPartStatsMap {
  const filtered = yearMonth
    ? logs.filter((log) => {
        const d = new Date(log.recordedAt)
        return d.getFullYear() === yearMonth.year && d.getMonth() + 1 === yearMonth.month
      })
    : logs

  const statsMap: BodyPartStatsMap = {}

  for (const log of filtered) {
    const existing = statsMap[log.bodyPartId]
    const ts = new Date(log.recordedAt)

    if (!existing) {
      statsMap[log.bodyPartId] = {
        bodyPartId: log.bodyPartId,
        totalMinutes: log.minutes,
        scaleFactor: 1,
        lastRecordedAt: ts,
      }
    } else {
      existing.totalMinutes += log.minutes
      if (!existing.lastRecordedAt || ts > existing.lastRecordedAt) {
        existing.lastRecordedAt = ts
      }
    }
  }

  // scaleFactor を再計算
  for (const key of Object.keys(statsMap) as BodyPartId[]) {
    const stat = statsMap[key] as BodyPartStats
    stat.scaleFactor = calcScaleFactor(stat.totalMinutes, dailyGoalMinutes)
  }

  return statsMap
}

/**
 * StretchLog[] からサマリーを計算する（今月分のみ）。
 */
export function calcStretchSummary(
  logs: StretchLog[],
  dailyGoalMinutes: number,
): StretchSummary {
  const now = new Date()
  const yearMonth = { year: now.getFullYear(), month: now.getMonth() + 1 }

  const stats = calcBodyPartStats(logs, dailyGoalMinutes, yearMonth)

  const thisMonthLogs = logs.filter((log) => {
    const d = new Date(log.recordedAt)
    return d.getFullYear() === yearMonth.year && d.getMonth() + 1 === yearMonth.month
  })

  const totalMinutesAllParts = Object.values(stats).reduce(
    (sum, s) => sum + (s?.totalMinutes ?? 0),
    0,
  )

  const uniqueDays = new Set(
    thisMonthLogs.map((log) => {
      const d = new Date(log.recordedAt)
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    }),
  )

  return {
    stats,
    totalMinutesAllParts,
    recordedDaysCount: uniqueDays.size,
  }
}

/**
 * ログを年月でグループ化して返す（ギャラリー用）。
 * 現在月は含まない（ホーム画面に表示するため）。
 */
export function groupLogsByMonth(
  logs: StretchLog[],
): { year: number; month: number; logs: StretchLog[] }[] {
  const now = new Date()
  const currentKey = `${now.getFullYear()}-${now.getMonth() + 1}`

  const map = new Map<string, { year: number; month: number; logs: StretchLog[] }>()

  for (const log of logs) {
    const d = new Date(log.recordedAt)
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const key = `${year}-${month}`
    if (key === currentKey) continue

    if (!map.has(key)) {
      map.set(key, { year, month, logs: [] })
    }
    map.get(key)!.logs.push(log)
  }

  return Array.from(map.values()).sort((a, b) =>
    b.year !== a.year ? b.year - a.year : b.month - a.month,
  )
}
