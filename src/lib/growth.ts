import type { BodyPartId, BodyPartStats, BodyPartStatsMap, StretchLog, StretchSummary, WeekId } from '@/types'

/** 週の最大記録日数（7日記録すると最大伸長） */
const MAX_DAYS = 7
/** デフォルトの最大伸長率（+200% = 最大3.0倍） */
const DEFAULT_GROWTH_FACTOR = 2.0
/**
 * 部位ごとの最大伸長率の上書き。
 * 首は元の長さが短く、腕は横方向で視覚的な変化が伝わりにくいので
 * デフォルトより大きく伸びるよう設定している。
 */
const PART_GROWTH_FACTOR: Partial<Record<BodyPartId, number>> = {
  neck: 4.0,
  arms: 3.0,
}

function growthFactorOf(id: BodyPartId): number {
  return PART_GROWTH_FACTOR[id] ?? DEFAULT_GROWTH_FACTOR
}

function dayKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

/** 月曜始まりのISO週の開始日（月曜 00:00）を返す */
function getWeekStart(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

/** Date から WeekId を生成する */
export function toWeekId(date: Date): WeekId {
  const start = getWeekStart(date)
  const y = start.getFullYear()
  const m = String(start.getMonth() + 1).padStart(2, '0')
  const d = String(start.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}` as WeekId
}

/** WeekId から週の開始日を復元する */
export function weekIdToDate(weekId: WeekId): Date {
  const [y, m, d] = weekId.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** 週の表示ラベルを生成する（例: "5/5〜5/11"） */
export function weekLabel(weekId: WeekId): string {
  const start = weekIdToDate(weekId)
  const end = new Date(start)
  end.setDate(end.getDate() + 6)
  return `${start.getMonth() + 1}/${start.getDate()}〜${end.getMonth() + 1}/${end.getDate()}`
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
 * weekId を指定すると、その週のログのみで集計する（週次リセット用）。
 * 同じ部位を同じ日に複数回記録しても1日換算。
 */
export function calcBodyPartStats(
  logs: StretchLog[],
  weekId?: WeekId,
): BodyPartStatsMap {
  const filtered = weekId
    ? logs.filter((log) => toWeekId(new Date(log.recordedAt)) === weekId)
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
    }
  }

  return statsMap
}

/**
 * StretchLog[] からサマリーを計算する（今週分のみ）。
 */
export function calcStretchSummary(logs: StretchLog[]): StretchSummary {
  const currentWeek = toWeekId(new Date())
  const stats = calcBodyPartStats(logs, currentWeek)

  const thisWeekLogs = logs.filter(
    (log) => toWeekId(new Date(log.recordedAt)) === currentWeek,
  )

  const uniqueDays = new Set(thisWeekLogs.map((log) => dayKey(new Date(log.recordedAt))))

  return {
    stats,
    totalRecordsCount: thisWeekLogs.length,
    recordedDaysCount: uniqueDays.size,
  }
}

/**
 * ログを週でグループ化して返す（ギャラリー用）。
 * 現在週は含まない（ホーム画面に表示するため）。
 */
export function groupLogsByWeek(
  logs: StretchLog[],
): { weekId: WeekId; logs: StretchLog[] }[] {
  const currentWeek = toWeekId(new Date())

  const map = new Map<WeekId, { weekId: WeekId; logs: StretchLog[] }>()

  for (const log of logs) {
    const wid = toWeekId(new Date(log.recordedAt))
    if (wid === currentWeek) continue

    if (!map.has(wid)) {
      map.set(wid, { weekId: wid, logs: [] })
    }
    map.get(wid)!.logs.push(log)
  }

  return Array.from(map.values()).sort((a, b) =>
    b.weekId > a.weekId ? 1 : b.weekId < a.weekId ? -1 : 0,
  )
}
