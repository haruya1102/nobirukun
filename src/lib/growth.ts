import type { BodyPartId, BodyPartStats, BodyPartStatsMap, StretchLog, StretchSummary } from '@/types'

/** 月の最大記録日数（30日記録すると最大伸長） */
const MAX_DAYS = 30
/** デフォルトの最大伸長率（+100% = 最大2.0倍） */
const DEFAULT_GROWTH_FACTOR = 1.0
/**
 * 部位ごとの最大伸長率の上書き。
 * 首は元の長さが短く、腕は横方向で視覚的な変化が伝わりにくいので
 * デフォルトより大きく伸びるよう設定している。
 */
const PART_GROWTH_FACTOR: Partial<Record<BodyPartId, number>> = {
  neck: 2.0,  // 最大3.0倍（ろくろ首風）
  arms: 1.5,  // 最大2.5倍
}

function growthFactorOf(id: BodyPartId): number {
  return PART_GROWTH_FACTOR[id] ?? DEFAULT_GROWTH_FACTOR
}

function dayKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

/**
 * 記録日数 → SVG transform の scale 値
 *
 * scaleFactor = 1 + clamp(recordedDays, 0, MAX_DAYS) / MAX_DAYS × growthFactor
 *
 * growthFactor は部位ごとに異なる（PART_GROWTH_FACTOR で上書き、デフォルト1.0）。
 */
export function calcScaleFactor(recordedDays: number, bodyPartId: BodyPartId): number {
  const clamped = Math.min(Math.max(recordedDays, 0), MAX_DAYS)
  return 1 + (clamped / MAX_DAYS) * growthFactorOf(bodyPartId)
}

/**
 * StretchLog[] から各部位の BodyPartStats を計算する。
 * yearMonth を指定すると、その月のログのみで集計する（月次リセット用）。
 * 同じ部位を同じ日に複数回記録しても1日換算。
 */
export function calcBodyPartStats(
  logs: StretchLog[],
  yearMonth?: { year: number; month: number },
): BodyPartStatsMap {
  const filtered = yearMonth
    ? logs.filter((log) => {
        const d = new Date(log.recordedAt)
        return d.getFullYear() === yearMonth.year && d.getMonth() + 1 === yearMonth.month
      })
    : logs

  const dayBuckets: Partial<Record<BodyPartId, Set<string>>> = {}
  const lastRecorded: Partial<Record<BodyPartId, Date>> = {}

  for (const log of filtered) {
    const ts = new Date(log.recordedAt)
    const set = dayBuckets[log.bodyPartId] ?? new Set<string>()
    set.add(dayKey(ts))
    dayBuckets[log.bodyPartId] = set

    const prev = lastRecorded[log.bodyPartId]
    if (!prev || ts > prev) lastRecorded[log.bodyPartId] = ts
  }

  const statsMap: BodyPartStatsMap = {}
  for (const key of Object.keys(dayBuckets) as BodyPartId[]) {
    const days = dayBuckets[key]!.size
    statsMap[key] = {
      bodyPartId: key,
      recordedDays: days,
      scaleFactor: calcScaleFactor(days, key),
      growthProgress: Math.min(days / MAX_DAYS, 1),
      lastRecordedAt: lastRecorded[key] ?? null,
    } satisfies BodyPartStats
  }

  return statsMap
}

/**
 * StretchLog[] からサマリーを計算する（今月分のみ）。
 */
export function calcStretchSummary(logs: StretchLog[]): StretchSummary {
  const now = new Date()
  const yearMonth = { year: now.getFullYear(), month: now.getMonth() + 1 }

  const stats = calcBodyPartStats(logs, yearMonth)

  const thisMonthLogs = logs.filter((log) => {
    const d = new Date(log.recordedAt)
    return d.getFullYear() === yearMonth.year && d.getMonth() + 1 === yearMonth.month
  })

  const uniqueDays = new Set(thisMonthLogs.map((log) => dayKey(new Date(log.recordedAt))))

  return {
    stats,
    totalRecordsCount: thisMonthLogs.length,
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
