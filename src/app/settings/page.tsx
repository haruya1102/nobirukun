"use client"

import { useState } from 'react'
import { BottomNav } from '@/components/layout/bottom-nav'
import { DEFAULT_SETTINGS } from '@/lib/growth'

export default function SettingsPage() {
  const [dailyGoal, setDailyGoal] = useState(DEFAULT_SETTINGS.dailyGoalMinutes)

  return (
    <div className="flex flex-col items-center min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <header
        className="flex items-center px-6 py-4 w-full fixed top-0 z-40 max-w-md"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        <h1 className="font-headline font-bold text-xl" style={{ color: 'var(--on-surface)' }}>
          設定
        </h1>
      </header>

      <main className="flex-1 w-full max-w-md px-6 pt-24 pb-32 flex flex-col gap-6">
        {/* 1日の目標時間 */}
        <section
          className="p-6 rounded-xl flex flex-col gap-4"
          style={{ backgroundColor: 'var(--surface-container-low)' }}
        >
          <h2 className="font-headline font-bold text-base" style={{ color: 'var(--on-surface)' }}>
            1日の目標時間
          </h2>
          <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
            目標を達成し続けると月末にキャラクターが最大まで伸びます
          </p>
          <div className="flex items-center gap-4">
            <input
              type="number"
              min={1}
              max={120}
              value={dailyGoal}
              onChange={(e) => setDailyGoal(Math.min(120, Math.max(1, Number(e.target.value))))}
              className="w-24 h-12 rounded-xl text-center font-headline font-bold text-xl border-2 outline-none"
              style={{
                borderColor: 'var(--primary)',
                backgroundColor: 'var(--surface)',
                color: 'var(--on-surface)',
              }}
            />
            <span className="font-semibold" style={{ color: 'var(--on-surface-variant)' }}>分 / 日</span>
          </div>
          <button
            className="w-full h-12 rounded-xl font-headline font-bold transition-all duration-300 active:scale-95"
            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
            onClick={() => {
              // TODO: Supabase連携後に保存処理を実装
              alert('保存しました（モック）')
            }}
          >
            保存する
          </button>
        </section>

        {/* アカウント */}
        <section
          className="p-6 rounded-xl flex flex-col gap-3"
          style={{ backgroundColor: 'var(--surface-container-low)' }}
        >
          <h2 className="font-headline font-bold text-base" style={{ color: 'var(--on-surface)' }}>
            アカウント
          </h2>
          <button
            className="w-full h-12 rounded-xl font-semibold text-sm transition-all duration-300 active:scale-95"
            style={{ backgroundColor: 'var(--surface-container-highest)', color: 'var(--on-surface)' }}
            onClick={() => alert('ログアウト（モック）')}
          >
            ログアウト
          </button>
        </section>
      </main>
      <BottomNav />
    </div>
  )
}
