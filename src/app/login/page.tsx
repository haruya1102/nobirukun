"use client"

import { useState } from 'react'
import { Sprout } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen px-6 py-10 overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* 背景デコレーション */}
      <div
        className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: 'var(--tertiary)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: 'var(--primary-container)' }}
      />

      <div className="relative w-full max-w-md flex flex-col items-center gap-10">
        {/* ロゴエリア */}
        <header className="text-center flex flex-col items-center gap-3">
          <div className="text-[110px] leading-none select-none drop-shadow-sm">
            🌿
          </div>
          <h1
            className="font-headline font-extrabold text-5xl tracking-tight"
            style={{ color: 'var(--primary)' }}
          >
            のびるクン
          </h1>
          <p
            className="font-bold text-sm tracking-wider"
            style={{ color: 'var(--secondary)' }}
          >
            のばしたぶんだけ、のびていく。
          </p>
        </header>

        {/* 白カード＋ボトムbordr */}
        <main
          className="w-full rounded-xl p-8 card-shadow"
          style={{
            backgroundColor: 'var(--surface-container-lowest)',
            borderBottom: '8px solid var(--surface-container-highest)',
          }}
        >
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault()
              alert('ログイン（Supabase Auth は次フェーズで実装）')
            }}
          >
            {/* メール */}
            <div className="flex flex-col gap-2">
              <label
                className="ml-4 text-sm font-bold"
                style={{ color: 'var(--on-surface)' }}
              >
                メールアドレス
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 px-6 rounded-lg outline-none transition-all font-body"
                style={{
                  backgroundColor: 'var(--background)',
                  color: 'var(--on-surface)',
                  boxShadow: 'inset 0 0 0 0 rgba(50,106,53,0)',
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.boxShadow =
                    '0 0 0 4px rgba(50, 106, 53, 0.2)')
                }
                onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
              />
            </div>

            {/* パスワード */}
            <div className="flex flex-col gap-2">
              <label
                className="ml-4 text-sm font-bold"
                style={{ color: 'var(--on-surface)' }}
              >
                パスワード
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 px-6 rounded-lg outline-none transition-all font-body"
                style={{
                  backgroundColor: 'var(--background)',
                  color: 'var(--on-surface)',
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.boxShadow =
                    '0 0 0 4px rgba(50, 106, 53, 0.2)')
                }
                onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
              />
            </div>

            {/* アクション */}
            <div className="flex flex-col gap-4 pt-2">
              <button
                type="submit"
                className="w-full h-14 rounded-xl font-headline font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 active:translate-y-1 custom-shadow-green"
                style={{ backgroundColor: 'var(--primary)', color: 'white' }}
              >
                <span>ログイン</span>
                <Sprout className="w-5 h-5" strokeWidth={2.5} />
              </button>

              {/* 区切り */}
              <div className="relative flex items-center justify-center py-1">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div
                    className="w-full border-t"
                    style={{ borderColor: 'var(--surface-container-highest)' }}
                  />
                </div>
                <span
                  className="relative px-4 text-sm font-medium"
                  style={{
                    backgroundColor: 'var(--surface-container-lowest)',
                    color: 'var(--outline)',
                  }}
                >
                  または
                </span>
              </div>

              <button
                type="button"
                className="w-full h-14 rounded-xl font-headline font-bold text-lg transition-all duration-300 active:scale-95"
                style={{
                  backgroundColor: 'transparent',
                  border: '3px solid var(--secondary)',
                  color: 'var(--secondary)',
                }}
                onClick={() =>
                  alert('新規登録（Supabase Auth は次フェーズで実装）')
                }
              >
                アカウントをつくる
              </button>
            </div>
          </form>
        </main>

        {/* ヘルパー */}
        <footer className="flex flex-col items-center gap-4">
          <a
            href="#"
            className="text-sm font-medium underline underline-offset-4 decoration-2 transition-colors"
            style={{ color: 'var(--outline)' }}
          >
            パスワードをわすれた？
          </a>
        </footer>
      </div>
    </div>
  )
}
