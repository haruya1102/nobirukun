import { HomeHeader } from '@/components/home/home-header'
import { RecordButton } from '@/components/home/record-button'
import { StatsBento } from '@/components/home/stats-bento'
import { StretchCharacter } from '@/components/character/stretch-character'
import { BodyPartBadge } from '@/components/character/body-part-badge'
import { BottomNav } from '@/components/layout/bottom-nav'
import { calcStretchSummary, DEFAULT_SETTINGS } from '@/lib/growth'
import type { StretchLog } from '@/types'

// モックデータ（Supabase連携前の動作確認用）
const MOCK_LOGS: StretchLog[] = [
  { id: '1', bodyPartId: 'neck',       minutes: 5,  recordedAt: new Date() },
  { id: '2', bodyPartId: 'shoulders',  minutes: 10, recordedAt: new Date() },
  { id: '3', bodyPartId: 'lower-back', minutes: 8,  recordedAt: new Date() },
  { id: '4', bodyPartId: 'thighs',     minutes: 15, recordedAt: new Date() },
]

export default function HomePage() {
  const summary = calcStretchSummary(MOCK_LOGS, DEFAULT_SETTINGS.dailyGoalMinutes)

  return (
    <div className="flex flex-col items-center min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <HomeHeader />
      <main className="flex-1 w-full max-w-md px-6 pt-24 pb-32 flex flex-col gap-8">
        {/* キャラクター表示エリア */}
        <section className="relative flex flex-col items-center justify-center py-4">
          <div
            className="relative w-full flex items-center justify-center rounded-[2rem] py-6 garden-gradient custom-shadow-green"
          >
            <StretchCharacter stats={summary.stats} size={240} />
          </div>
        </section>

        {/* 部位別伸長状態 */}
        <BodyPartBadge stats={summary.stats} />

        {/* 記録ボタン */}
        <RecordButton />

        {/* 統計ベントー */}
        <StatsBento
          totalMinutes={summary.totalMinutesAllParts}
          recordedDaysCount={summary.recordedDaysCount}
        />
      </main>
      <BottomNav />
    </div>
  )
}
