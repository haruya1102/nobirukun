import { Clock3, CalendarCheck } from 'lucide-react'

interface StatsBentoProps {
  totalRecordsCount: number
  recordedDaysCount: number
}

export function StatsBento({ totalRecordsCount, recordedDaysCount }: StatsBentoProps) {
  return (
    <section className="grid grid-cols-2 gap-4">
      <div
        className="p-5 rounded-xl flex flex-col justify-between aspect-square card-shadow"
        style={{ backgroundColor: 'var(--secondary-container)' }}
      >
        <CalendarCheck
          className="w-7 h-7"
          strokeWidth={2.5}
          style={{ color: 'var(--secondary)' }}
        />
        <div>
          <p
            className="text-[11px] font-bold uppercase tracking-widest"
            style={{ color: 'var(--on-secondary-fixed-variant)' }}
          >
            今月の記録日数
          </p>
          <p
            className="text-2xl font-headline font-extrabold"
            style={{ color: 'var(--on-secondary-container)' }}
          >
            {recordedDaysCount}<span className="text-base font-bold ml-0.5">日</span>
          </p>
        </div>
      </div>
      <div
        className="p-5 rounded-xl flex flex-col justify-between aspect-square card-shadow"
        style={{ backgroundColor: 'var(--surface-container-highest)' }}
      >
        <Clock3
          className="w-7 h-7"
          strokeWidth={2.5}
          style={{ color: 'var(--tertiary)' }}
        />
        <div>
          <p
            className="text-[11px] font-bold uppercase tracking-widest"
            style={{ color: 'var(--tertiary)' }}
          >
            のべ記録回数
          </p>
          <p
            className="text-2xl font-headline font-extrabold"
            style={{ color: 'var(--tertiary)' }}
          >
            {totalRecordsCount}<span className="text-base font-bold ml-0.5">回</span>
          </p>
        </div>
      </div>
    </section>
  )
}
