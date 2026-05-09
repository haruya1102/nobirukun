import { HomeHeader } from '@/components/home/home-header'
import { RecordButton } from '@/components/home/record-button'
import { StatsBento } from '@/components/home/stats-bento'
import { StretchCharacter } from '@/components/character/stretch-character'
import { BodyPartBadge } from '@/components/character/body-part-badge'
import { BottomNav } from '@/components/layout/bottom-nav'
import { calcStretchSummary } from '@/lib/growth'
import { BODY_PARTS } from '@/types'
import type { StretchLog } from '@/types'

export default function HomePage() {
  // TODO: Supabase からユーザーの今月分ログを取得する
  const logs: StretchLog[] = []
  const summary = calcStretchSummary(logs)

  // 全部位の月次達成度（growthProgress 0〜1 の平均を 0〜100% に正規化）
  const growthPct = Math.round(
    (BODY_PARTS.reduce((acc, p) => acc + (summary.stats[p.id]?.growthProgress ?? 0), 0) /
      BODY_PARTS.length) *
      100,
  )

  return (
    <div
      className="flex flex-col items-center min-h-screen"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <HomeHeader />
      <main className="flex-1 w-full max-w-md px-6 pt-24 pb-32 flex flex-col gap-8">
        {/* キャラクター：円形ガーデンヒーロー */}
        <section className="relative flex flex-col items-center justify-center pt-4 pb-6">
          <div
            className="relative w-full aspect-square max-w-[320px] rounded-full garden-gradient custom-shadow-green flex items-center justify-center overflow-visible"
          >
            <StretchCharacter stats={summary.stats} size={260} />
            {/* 進捗バッジ（右上） */}
            <div
              className="absolute -top-2 -right-2 px-4 py-2 rounded-full font-headline font-bold text-sm shadow-lg flex items-center gap-1"
              style={{
                backgroundColor: 'var(--tertiary)',
                color: 'var(--on-tertiary)',
                border: '2px solid var(--surface-container-low)',
              }}
            >
              <span>{growthPct}% のびた</span>
            </div>
            {/* ネームバッジ（下部） */}
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-8 py-2 rounded-full shadow-md"
              style={{
                backgroundColor: 'var(--surface-container-highest)',
                border: '2px solid var(--surface)',
              }}
            >
              <span
                className="font-headline font-extrabold text-lg"
                style={{ color: 'var(--primary)' }}
              >
                のびるクン
              </span>
            </div>
          </div>
        </section>

        {/* 月次の成長進捗カード */}
        <section
          className="p-6 rounded-xl flex flex-col gap-4 card-shadow"
          style={{ backgroundColor: 'var(--surface-container-low)' }}
        >
          <div className="flex justify-between items-end">
            <p className="font-headline font-bold text-base" style={{ color: 'var(--tertiary)' }}>
              今月の成長 <span className="text-xl">{summary.recordedDaysCount}</span>日 ✨
            </p>
            <span className="text-xs font-bold opacity-60" style={{ color: 'var(--secondary)' }}>
              {growthPct}%
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">🌱</span>
            <div
              className="flex-1 h-4 rounded-full overflow-hidden"
              style={{ backgroundColor: 'var(--surface-variant)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${Math.min(100, Math.max(0, growthPct))}%`,
                  backgroundColor: 'var(--primary-container)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.08)',
                }}
              />
            </div>
            <span className="text-xl">🌸</span>
          </div>
        </section>

        <RecordButton />

        {/* 部位別伸長状態 */}
        <BodyPartBadge stats={summary.stats} />

        {summary.recordedDaysCount === 0 ? (
          // 初回オンボーディング: 記録ゼロのときだけ育て方を案内する
          <section
            className="p-6 rounded-xl flex flex-col gap-3"
            style={{ backgroundColor: 'var(--surface-container-low)' }}
          >
            <h2 className="font-headline font-bold text-base" style={{ color: 'var(--on-surface)' }}>
              のびるくんの育て方
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--on-surface-variant)' }}>
              部位を選んで「記録する」をタップすれば、その日の1カウントになります。
              時間は問いません。30日記録するとその部位は最大まで伸びます。
              毎月1日にリセットされ、過去月の姿はギャラリーに残ります。
            </p>
          </section>
        ) : (
          <StatsBento
            totalRecordsCount={summary.totalRecordsCount}
            recordedDaysCount={summary.recordedDaysCount}
          />
        )}
      </main>
      <BottomNav />
    </div>
  )
}
