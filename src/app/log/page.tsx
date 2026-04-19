import { BottomNav } from '@/components/layout/bottom-nav'
import { MonthlyCharacterCard } from '@/components/log/monthly-character-card'
import { groupLogsByMonth } from '@/lib/growth'
import type { StretchLog } from '@/types'

// モックデータ（Supabase連携前の動作確認用）
const MOCK_LOGS: StretchLog[] = [
  // 2ヶ月前
  { id: 'a1', bodyPartId: 'neck',      minutes: 10, recordedAt: new Date(2026, 1, 10) },
  { id: 'a2', bodyPartId: 'shoulders', minutes: 20, recordedAt: new Date(2026, 1, 15) },
  { id: 'a3', bodyPartId: 'thighs',    minutes: 30, recordedAt: new Date(2026, 1, 20) },
  // 1ヶ月前
  { id: 'b1', bodyPartId: 'lower-back', minutes: 15, recordedAt: new Date(2026, 2, 5) },
  { id: 'b2', bodyPartId: 'calves',     minutes: 25, recordedAt: new Date(2026, 2, 12) },
  { id: 'b3', bodyPartId: 'arms',       minutes: 10, recordedAt: new Date(2026, 2, 20) },
  { id: 'b4', bodyPartId: 'hips',       minutes: 20, recordedAt: new Date(2026, 2, 25) },
]

export default function LogPage() {
  const monthGroups = groupLogsByMonth(MOCK_LOGS)

  return (
    <div className="flex flex-col items-center min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <header
        className="flex items-center px-6 py-4 w-full fixed top-0 z-40 max-w-md"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        <h1 className="font-headline font-bold text-xl" style={{ color: 'var(--on-surface)' }}>
          記録ギャラリー
        </h1>
      </header>

      <main className="flex-1 w-full max-w-md px-6 pt-24 pb-32 flex flex-col gap-6">
        {monthGroups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="text-6xl">🌱</span>
            <p className="font-semibold text-center" style={{ color: 'var(--on-surface-variant)' }}>
              まだ過去の記録がありません。{'\n'}毎日ストレッチして育てましょう！
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {monthGroups.map(({ year, month, logs }) => (
              <MonthlyCharacterCard
                key={`${year}-${month}`}
                year={year}
                month={month}
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
