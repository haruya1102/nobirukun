"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BODY_PARTS } from '@/types'
import type { BodyPartId } from '@/types'
import { BottomNav } from '@/components/layout/bottom-nav'

type Step = 1 | 2 | 3

const DURATION_OPTIONS = [5, 10, 15, 20, 30, 45, 60]

export default function RecordPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [selectedParts, setSelectedParts] = useState<BodyPartId[]>([])
  const [minutes, setMinutes] = useState<number>(10)

  const togglePart = (id: BodyPartId) => {
    setSelectedParts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    )
  }

  const handleSave = () => {
    // TODO: Supabase連携後にここで保存処理を実装する
    router.push('/home')
  }

  return (
    <div className="flex flex-col items-center min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <header
        className="flex items-center px-6 py-4 w-full fixed top-0 z-40 max-w-md gap-3"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        <button
          onClick={() => (step === 1 ? router.back() : setStep((s) => (s - 1) as Step))}
          className="text-2xl font-bold leading-none"
          style={{ color: 'var(--primary)' }}
          aria-label="戻る"
        >
          ←
        </button>
        <h1 className="font-headline font-bold text-lg" style={{ color: 'var(--on-surface)' }}>
          ストレッチを記録
        </h1>
        {/* ステップインジケーター */}
        <div className="flex gap-1.5 ml-auto">
          {([1, 2, 3] as Step[]).map((s) => (
            <div
              key={s}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: s <= step ? 'var(--primary)' : 'var(--surface-variant)',
              }}
            />
          ))}
        </div>
      </header>

      <main className="flex-1 w-full max-w-md px-6 pt-24 pb-32 flex flex-col gap-6">
        {/* Step 1: 部位選択 */}
        {step === 1 && (
          <>
            <p className="font-headline font-bold text-xl" style={{ color: 'var(--on-surface)' }}>
              どこをストレッチしましたか？
            </p>
            <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
              複数選択できます
            </p>
            <div className="grid grid-cols-2 gap-3">
              {BODY_PARTS.map((part) => {
                const isSelected = selectedParts.includes(part.id)
                return (
                  <button
                    key={part.id}
                    onClick={() => togglePart(part.id)}
                    className="p-4 rounded-xl font-semibold text-base transition-all duration-200 active:scale-95 text-left"
                    style={{
                      backgroundColor: isSelected ? 'var(--primary-container)' : 'var(--surface-container-low)',
                      color: isSelected ? 'var(--on-primary-container)' : 'var(--on-surface)',
                      border: isSelected ? '2px solid var(--primary)' : '2px solid transparent',
                    }}
                  >
                    {part.label}
                  </button>
                )
              })}
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={selectedParts.length === 0}
              className="w-full h-14 rounded-xl font-headline font-bold text-lg transition-all duration-300 active:scale-95 mt-auto disabled:opacity-40"
              style={{ backgroundColor: 'var(--primary)', color: 'white' }}
            >
              つぎへ
            </button>
          </>
        )}

        {/* Step 2: 時間入力 */}
        {step === 2 && (
          <>
            <p className="font-headline font-bold text-xl" style={{ color: 'var(--on-surface)' }}>
              何分ストレッチしましたか？
            </p>
            <div className="flex flex-wrap gap-3">
              {DURATION_OPTIONS.map((min) => {
                const isSelected = minutes === min
                return (
                  <button
                    key={min}
                    onClick={() => setMinutes(min)}
                    className="px-6 py-3 rounded-full font-headline font-bold text-base transition-all duration-200 active:scale-95"
                    style={{
                      backgroundColor: isSelected ? 'var(--primary)' : 'var(--surface-container-low)',
                      color: isSelected ? 'white' : 'var(--on-surface)',
                    }}
                  >
                    {min}分
                  </button>
                )
              })}
            </div>
            {/* カスタム入力 */}
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                max={60}
                value={minutes}
                onChange={(e) => setMinutes(Math.min(60, Math.max(1, Number(e.target.value))))}
                className="w-24 h-12 rounded-xl text-center font-headline font-bold text-xl border-2 outline-none"
                style={{
                  borderColor: 'var(--primary)',
                  backgroundColor: 'var(--surface-container-low)',
                  color: 'var(--on-surface)',
                }}
              />
              <span className="font-semibold" style={{ color: 'var(--on-surface-variant)' }}>分（1〜60）</span>
            </div>
            <button
              onClick={() => setStep(3)}
              className="w-full h-14 rounded-xl font-headline font-bold text-lg transition-all duration-300 active:scale-95 mt-auto"
              style={{ backgroundColor: 'var(--primary)', color: 'white' }}
            >
              つぎへ
            </button>
          </>
        )}

        {/* Step 3: 確認 */}
        {step === 3 && (
          <>
            <p className="font-headline font-bold text-xl" style={{ color: 'var(--on-surface)' }}>
              記録内容の確認
            </p>
            <div
              className="p-6 rounded-xl flex flex-col gap-4"
              style={{ backgroundColor: 'var(--surface-container-low)' }}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold" style={{ color: 'var(--on-surface-variant)' }}>部位</span>
                <span className="font-headline font-bold" style={{ color: 'var(--on-surface)' }}>
                  {selectedParts.map((id) => BODY_PARTS.find((p) => p.id === id)?.label).join('・')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold" style={{ color: 'var(--on-surface-variant)' }}>時間</span>
                <span className="font-headline font-bold" style={{ color: 'var(--on-surface)' }}>
                  {minutes}分
                </span>
              </div>
            </div>
            <div
              className="text-center py-8 rounded-xl text-6xl"
              style={{ backgroundColor: 'var(--primary-fixed)' }}
            >
              🧘
            </div>
            <p className="text-center font-semibold" style={{ color: 'var(--secondary)' }}>
              キャラクターが伸びます！
            </p>
            <button
              onClick={handleSave}
              className="w-full h-14 rounded-xl font-headline font-bold text-lg transition-all duration-300 active:scale-95 custom-shadow-green"
              style={{ backgroundColor: 'var(--primary)', color: 'white' }}
            >
              記録する
            </button>
          </>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
