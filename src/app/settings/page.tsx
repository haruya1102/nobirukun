"use client"

import { useState } from 'react'
import { ChevronRight, LogOut } from 'lucide-react'
import { BottomNav } from '@/components/layout/bottom-nav'
import { DEFAULT_SETTINGS } from '@/lib/growth'

export default function SettingsPage() {
  const [dailyGoal, setDailyGoal] = useState(DEFAULT_SETTINGS.dailyGoalMinutes)

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
          せってい ⚙️
        </h1>
      </header>

      <main className="flex-1 w-full max-w-md px-6 pt-24 pb-32 flex flex-col gap-8">
        {/* プロフィールヘッダー */}
        <section className="flex flex-col items-center pt-4">
          <div
            className="w-28 h-28 rounded-full p-1 shadow-xl"
            style={{
              background:
                'linear-gradient(135deg, var(--primary-container) 0%, var(--primary) 100%)',
            }}
          >
            <div
              className="w-full h-full rounded-full flex items-center justify-center text-5xl"
              style={{
                backgroundColor: 'var(--surface-container-highest)',
                border: '4px solid var(--surface)',
              }}
            >
              🌿
            </div>
          </div>
          <p
            className="mt-4 font-headline font-extrabold text-2xl tracking-tight"
            style={{ color: 'var(--on-surface)' }}
          >
            のびるクン
          </p>
          <p
            className="text-sm font-medium"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            今日も少しずつ、のびていこう
          </p>
        </section>

        {/* 1日の目標時間 */}
        <section
          className="p-6 rounded-xl flex flex-col gap-4 card-shadow"
          style={{ backgroundColor: 'var(--surface-container-low)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
              style={{ backgroundColor: 'var(--surface-container-highest)' }}
            >
              🎯
            </div>
            <h2
              className="font-headline font-bold text-base"
              style={{ color: 'var(--on-surface)' }}
            >
              1日の目標時間
            </h2>
          </div>
          <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
            目標を達成し続けると月末にキャラクターが最大まで伸びます
          </p>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={1}
              max={120}
              value={dailyGoal}
              onChange={(e) =>
                setDailyGoal(Math.min(120, Math.max(1, Number(e.target.value))))
              }
              className="w-24 h-14 rounded-lg text-center font-headline font-extrabold text-2xl outline-none"
              style={{
                backgroundColor: 'white',
                color: 'var(--primary)',
              }}
            />
            <span
              className="font-headline font-bold text-base"
              style={{ color: 'var(--secondary)' }}
            >
              分 / 日
            </span>
          </div>
          <button
            className="w-full h-12 rounded-xl font-headline font-bold transition-all duration-300 active:scale-95 custom-shadow-green"
            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
            onClick={() => {
              // TODO: Supabase連携後に保存処理を実装
              alert('保存しました（モック）')
            }}
          >
            保存する
          </button>
        </section>

        {/* メニュー */}
        <section className="flex flex-col gap-3">
          {[
            { icon: '🔔', label: 'つうち設定' },
            { icon: '🔒', label: 'パスワードをかえる' },
            { icon: '📋', label: 'りようきやく' },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center justify-between p-5 rounded-xl card-shadow transition-all duration-300 active:scale-[0.98]"
              style={{ backgroundColor: 'var(--surface-container-low)' }}
              onClick={() => alert(`${item.label}（未実装）`)}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 flex items-center justify-center rounded-full text-xl"
                  style={{ backgroundColor: 'var(--surface-container-highest)' }}
                >
                  {item.icon}
                </div>
                <span
                  className="font-bold text-base"
                  style={{ color: 'var(--on-surface)' }}
                >
                  {item.label}
                </span>
              </div>
              <ChevronRight
                className="w-5 h-5"
                strokeWidth={2.5}
                style={{ color: 'var(--outline-variant)' }}
              />
            </button>
          ))}
        </section>

        {/* ログアウト */}
        <button
          className="w-full flex items-center justify-between p-5 rounded-xl transition-all duration-300 active:scale-[0.98]"
          style={{ backgroundColor: 'rgba(255, 218, 214, 0.4)' }}
          onClick={() => alert('ログアウト（モック）')}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-11 h-11 flex items-center justify-center rounded-full text-xl"
              style={{ backgroundColor: 'rgba(255, 218, 214, 0.7)' }}
            >
              👋
            </div>
            <span
              className="font-bold text-base"
              style={{ color: 'var(--error)' }}
            >
              ログアウト
            </span>
          </div>
          <LogOut
            className="w-5 h-5 opacity-60"
            strokeWidth={2.5}
            style={{ color: 'var(--error)' }}
          />
        </button>
      </main>
      <BottomNav />
    </div>
  )
}
