interface StatsBentoProps {
  totalMinutes: number
  recordedDaysCount: number
}

export function StatsBento({ totalMinutes, recordedDaysCount }: StatsBentoProps) {
  return (
    <section className="grid grid-cols-2 gap-4 mt-4">
      <div
        className="p-4 rounded-xl flex flex-col justify-between aspect-square"
        style={{ backgroundColor: 'var(--secondary-container)' }}
      >
        <span className="text-3xl">⏱️</span>
        <div>
          <p
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: 'var(--on-secondary-fixed-variant)' }}
          >
            今月の合計
          </p>
          <p
            className="text-2xl font-headline font-extrabold"
            style={{ color: 'var(--on-secondary-container)' }}
          >
            {totalMinutes}分
          </p>
        </div>
      </div>
      <div
        className="p-4 rounded-xl flex flex-col justify-between aspect-square"
        style={{ backgroundColor: 'var(--surface-container-highest)' }}
      >
        <span className="text-3xl">📅</span>
        <div>
          <p
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: 'var(--tertiary)' }}
          >
            記録した日
          </p>
          <p
            className="text-2xl font-headline font-extrabold"
            style={{ color: 'var(--tertiary)' }}
          >
            {recordedDaysCount}日
          </p>
        </div>
      </div>
    </section>
  )
}
