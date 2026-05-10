import { BottomNav } from '@/components/layout/bottom-nav'
import { WeeklyCharacterCard } from '@/components/log/weekly-character-card'
import { groupLogsByWeek } from '@/lib/growth'
import { fetchStretchLogs } from '@/lib/supabase/queries'

export default async function LogPage() {
  const logs = await fetchStretchLogs()
  const weekGroups = groupLogsByWeek(logs)

  return (
    <div
      className="flex flex-col items-center min-h-screen"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <header
        className="flex items-center justify-center px-6 py-4 w-full fixed top-0 z-40 max-w-md"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        <h1
          className="font-headline font-extrabold text-xl tracking-tight"
          style={{ color: 'var(--primary)' }}
        >
          のびた記録
        </h1>
      </header>

      <main className="flex-1 w-full max-w-md px-6 pt-24 pb-32 flex flex-col gap-6">
        {/* セクションラベル */}
        <div className="mb-2 ml-1">
          <p
            className="font-headline font-bold text-sm tracking-widest"
            style={{ color: 'var(--secondary)' }}
          >
            WEEKLY GALLERY
          </p>
          <div
            className="h-1 w-8 rounded-full mt-1"
            style={{ backgroundColor: 'var(--primary-container)' }}
          />
        </div>

        {weekGroups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-5xl"
              style={{ backgroundColor: 'var(--surface-container-low)' }}
            >
              🌱
            </div>
            <p
              className="font-semibold text-center leading-relaxed"
              style={{ color: 'var(--on-surface-variant)' }}
            >
              まだ過去の記録がありません。
              <br />
              毎日ストレッチして育てましょう！
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {weekGroups.map(({ weekId, logs }) => (
              <WeeklyCharacterCard
                key={weekId}
                weekId={weekId}
                logs={logs}
              />
            ))}
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
