import type { BodyPartStatsMap } from '@/types'
import { BODY_PARTS } from '@/types'

interface BodyPartBadgeProps {
  stats: BodyPartStatsMap
}

/** 各部位の累積分数と伸長率をリスト表示するバッジ群 */
export function BodyPartBadge({ stats }: BodyPartBadgeProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {BODY_PARTS.map((part) => {
        const stat = stats[part.id]
        const minutes = stat?.totalMinutes ?? 0
        const scale = stat?.scaleFactor ?? 1
        const pct = Math.round((scale - 1) / 0.6 * 100)

        return (
          <div
            key={part.id}
            className="flex flex-col items-center gap-1 p-2 rounded-xl"
            style={{ backgroundColor: 'var(--surface-container-low)' }}
          >
            <div
              className="w-full h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: 'var(--surface-variant)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${pct}%`,
                  backgroundColor: 'var(--primary-container)',
                }}
              />
            </div>
            <span className="text-[10px] font-semibold" style={{ color: 'var(--on-surface-variant)' }}>
              {part.label}
            </span>
            <span className="text-xs font-bold font-headline" style={{ color: 'var(--primary)' }}>
              {minutes}分
            </span>
          </div>
        )
      })}
    </div>
  )
}
