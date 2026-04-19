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
      className="flex flex-col items-center gap-2 p-5 rounded-[2rem] card-shadow transition-transform duration-300 hover:scale-[1.02]"
      style={{ backgroundColor: 'var(--surface-container-lowest)' }}
    >
      <p
        className="font-headline font-extrabold text-sm"
        style={{ color: 'var(--primary)' }}
      >
        {year}年{month}月
      </p>
      <div
        className="w-full aspect-square rounded-xl flex items-center justify-center"
        style={{
          background:
            'linear-gradient(135deg, var(--surface-container-low) 0%, var(--primary-fixed) 100%)',
        }}
      >
        <StretchCharacter stats={stats} size={110} />
      </div>
      <div
        className="mt-1 px-3 py-1 rounded-full text-xs font-bold font-headline"
        style={{
          backgroundColor: 'var(--secondary)',
          color: 'white',
        }}
      >
        合計 {totalMinutes}分 🌿
      </div>
    </div>
  )
}
