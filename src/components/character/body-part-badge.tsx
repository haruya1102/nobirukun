import type { BodyPartStatsMap } from '@/types'
import { BODY_PARTS } from '@/types'

interface BodyPartBadgeProps {
  stats: BodyPartStatsMap
}

/** 各部位の記録日数と伸長率をリスト表示するバッジ群 */
export function BodyPartBadge({ stats }: BodyPartBadgeProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {BODY_PARTS.map((part) => {
        const stat = stats[part.id]
        const days = stat?.recordedDays ?? 0
        const pct = Math.round((stat?.growthProgress ?? 0) * 100)

        return (
          <div
            key={part.id}
            className="flex flex-col items-center gap-1 px-2 py-3 rounded-xl card-shadow"
            style={{ backgroundColor: 'var(--surface-container-lowest)' }}
          >
            <span className="text-xl leading-none select-none">{part.emoji}</span>
            <span
              className="text-[10px] font-semibold"
              style={{ color: 'var(--on-surface-variant)' }}
            >
              {part.label}
            </span>
            <div
              className="w-full h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: 'var(--surface-variant)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min(100, Math.max(0, pct))}%`,
                  backgroundColor: 'var(--primary-container)',
                }}
              />
            </div>
            <span
              className="text-[11px] font-bold font-headline"
              style={{ color: 'var(--primary)' }}
            >
              {days}日
            </span>
          </div>
        )
      })}
    </div>
  )
}
