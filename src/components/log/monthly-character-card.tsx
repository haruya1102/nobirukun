import { StretchCharacter } from '@/components/character/stretch-character'
import { calcBodyPartStats, DEFAULT_SETTINGS } from '@/lib/growth'
import type { StretchLog } from '@/types'

interface MonthlyCharacterCardProps {
  year: number
  month: number
  logs: StretchLog[]
}

export function MonthlyCharacterCard({ year, month, logs }: MonthlyCharacterCardProps) {
  const stats = calcBodyPartStats(logs, DEFAULT_SETTINGS.dailyGoalMinutes, { year, month })
  const totalMinutes = Object.values(stats).reduce((sum, s) => sum + (s?.totalMinutes ?? 0), 0)

  return (
    <div
      className="flex flex-col items-center gap-2 p-4 rounded-xl"
      style={{ backgroundColor: 'var(--surface-container-low)' }}
    >
      <p className="font-headline font-bold text-sm" style={{ color: 'var(--secondary)' }}>
        {year}年{month}月
      </p>
      <StretchCharacter stats={stats} size={120} />
      <p className="text-xs font-semibold" style={{ color: 'var(--on-surface-variant)' }}>
        合計 {totalMinutes}分
      </p>
    </div>
  )
}
