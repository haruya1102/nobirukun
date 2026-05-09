import { StretchCharacter } from '@/components/character/stretch-character'
import { calcBodyPartStats } from '@/lib/growth'
import type { StretchLog } from '@/types'

interface MonthlyCharacterCardProps {
  year: number
  month: number
  logs: StretchLog[]
}

export function MonthlyCharacterCard({ year, month, logs }: MonthlyCharacterCardProps) {
  const stats = calcBodyPartStats(logs, { year, month })
  const uniqueDays = new Set(
    logs
      .filter((log) => {
        const d = new Date(log.recordedAt)
        return d.getFullYear() === year && d.getMonth() + 1 === month
      })
      .map((log) => {
        const d = new Date(log.recordedAt)
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
      }),
  ).size

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
          color: 'var(--on-secondary)',
        }}
      >
        {uniqueDays}日記録 🌿
      </div>
    </div>
  )
}
