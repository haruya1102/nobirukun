"use client"

import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-6"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="w-full max-w-md flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3">
          <span className="text-7xl">🧘</span>
          <h1
            className="font-headline font-extrabold text-3xl tracking-tight"
            style={{ color: 'var(--primary)' }}
          >
            のびるクン
          </h1>
          <p className="text-sm text-center" style={{ color: 'var(--on-surface-variant)' }}>
            伸ばした分だけ、キャラクターが伸びる
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 rounded-xl border-2 outline-none font-body"
            style={{
              borderColor: 'var(--outline-variant)',
              backgroundColor: 'var(--surface)',
              color: 'var(--on-surface)',
            }}
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-4 rounded-xl border-2 outline-none font-body"
            style={{
              borderColor: 'var(--outline-variant)',
              backgroundColor: 'var(--surface)',
              color: 'var(--on-surface)',
            }}
          />
          <button
            className="w-full h-14 rounded-xl font-headline font-bold text-lg transition-all duration-300 active:scale-95 mt-2 custom-shadow-green"
            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
            onClick={() => alert('ログイン（Supabase Auth は次フェーズで実装）')}
          >
            ログイン
          </button>
          <button
            className="w-full h-12 rounded-xl font-semibold text-sm transition-all duration-300 active:scale-95"
            style={{ backgroundColor: 'var(--surface-container-low)', color: 'var(--on-surface)' }}
            onClick={() => alert('新規登録（Supabase Auth は次フェーズで実装）')}
          >
            新規登録
          </button>
        </div>
      </div>
    </div>
  )
}
