"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react'
import { BODY_PARTS } from '@/types'
import type { BodyPartId } from '@/types'

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
    <div
      className="flex flex-col items-center min-h-screen"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* ヘッダー：閉じる×＋タイトル中央 */}
      <header
        className="flex items-center px-6 py-4 w-full sticky top-0 z-40 max-w-md justify-between"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        <button
          onClick={() => (step === 1 ? router.back() : setStep((s) => (s - 1) as Step))}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--surface-container-low)]"
          style={{ color: 'var(--primary)' }}
          aria-label="戻る"
        >
          <ArrowLeft className="w-6 h-6" strokeWidth={2.5} />
        </button>
        <h1 className="font-headline font-bold text-lg" style={{ color: 'var(--primary)' }}>
          ストレッチを記録
        </h1>
        <div className="w-10" />
      </header>

      <main className="flex-1 w-full max-w-md px-6 pt-8 pb-40 flex flex-col">
        {/* ステップドット */}
        <div className="flex justify-center items-center gap-3 mb-10">
          {([1, 2, 3] as Step[]).map((s) => (
            <div
              key={s}
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  s <= step ? 'var(--primary)' : 'transparent',
                border: s <= step ? 'none' : '2px solid var(--surface-variant)',
                boxShadow: s === step ? '0 0 0 4px rgba(50, 106, 53, 0.15)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Step 1: 部位選択 */}
        {step === 1 && (
          <>
            <div className="mb-8 text-center">
              <h2
                className="font-headline font-extrabold text-3xl tracking-tight mb-2"
                style={{ color: 'var(--primary)' }}
              >
                どこをのばした？
              </h2>
              <p
                className="font-medium opacity-80"
                style={{ color: 'var(--on-surface-variant)' }}
              >
                複数選んでOK
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {BODY_PARTS.map((part) => {
                const isSelected = selectedParts.includes(part.id)
                return (
                  <button
                    key={part.id}
                    onClick={() => togglePart(part.id)}
                    className="relative flex flex-col items-center justify-center aspect-square rounded-xl card-shadow transition-all duration-300 active:scale-95"
                    style={{
                      backgroundColor: isSelected
                        ? 'var(--primary-fixed)'
                        : 'var(--surface-container-low)',
                      border: isSelected
                        ? '3px solid var(--primary)'
                        : '3px solid transparent',
                      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                    }}
                  >
                    {isSelected && (
                      <CheckCircle2
                        className="absolute top-2 right-2 w-6 h-6"
                        strokeWidth={2.5}
                        fill="var(--primary)"
                        stroke="white"
                      />
                    )}
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-sm"
                      style={{ backgroundColor: 'white' }}
                    >
                      <span className="text-3xl leading-none">{part.emoji}</span>
                    </div>
                    <span
                      className="font-headline font-bold text-base"
                      style={{
                        color: isSelected
                          ? 'var(--on-primary-container)'
                          : 'var(--secondary)',
                      }}
                    >
                      {part.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </>
        )}

        {/* Step 2: 時間入力 */}
        {step === 2 && (
          <>
            <div className="mb-8 text-center">
              <h2
                className="font-headline font-extrabold text-3xl tracking-tight mb-2"
                style={{ color: 'var(--primary)' }}
              >
                何分のばした？
              </h2>
              <p
                className="font-medium opacity-80"
                style={{ color: 'var(--on-surface-variant)' }}
              >
                プリセットまたは数値で入力
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {DURATION_OPTIONS.map((min) => {
                const isSelected = minutes === min
                return (
                  <button
                    key={min}
                    onClick={() => setMinutes(min)}
                    className="px-6 py-3 rounded-full font-headline font-bold text-base transition-all duration-300 active:scale-95"
                    style={{
                      backgroundColor: isSelected
                        ? 'var(--primary)'
                        : 'var(--surface-container-low)',
                      color: isSelected ? 'white' : 'var(--secondary)',
                      boxShadow: isSelected
                        ? '0 10px 20px -8px rgba(50, 106, 53, 0.35)'
                        : '0 8px 18px -10px rgba(61, 50, 38, 0.08)',
                    }}
                  >
                    {min}分
                  </button>
                )
              })}
            </div>
            <div
              className="p-6 rounded-xl flex flex-col items-center gap-3 card-shadow"
              style={{ backgroundColor: 'var(--surface-container-low)' }}
            >
              <label
                className="text-sm font-semibold"
                style={{ color: 'var(--on-surface-variant)' }}
              >
                カスタム（1〜60分）
              </label>
              <div className="flex items-baseline gap-3">
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={minutes}
                  onChange={(e) =>
                    setMinutes(Math.min(60, Math.max(1, Number(e.target.value))))
                  }
                  className="w-28 h-14 rounded-lg text-center font-headline font-extrabold text-3xl outline-none"
                  style={{
                    backgroundColor: 'white',
                    color: 'var(--primary)',
                  }}
                />
                <span
                  className="font-headline font-bold text-xl"
                  style={{ color: 'var(--secondary)' }}
                >
                  分
                </span>
              </div>
            </div>
          </>
        )}

        {/* Step 3: 確認 */}
        {step === 3 && (
          <>
            <div className="mb-8 text-center">
              <h2
                className="font-headline font-extrabold text-3xl tracking-tight mb-2"
                style={{ color: 'var(--primary)' }}
              >
                のびるクンが<br />のびます！
              </h2>
            </div>

            {/* ヒーロービジュアル */}
            <div className="relative flex items-center justify-center py-8 mb-8">
              <div className="flex items-center gap-6">
                <div
                  className="w-24 h-24 rounded-xl flex items-center justify-center text-5xl -rotate-6"
                  style={{ backgroundColor: 'var(--surface-container-low)' }}
                >
                  🧘
                </div>
                <ArrowRight
                  className="w-10 h-10"
                  strokeWidth={2.5}
                  style={{ color: 'var(--primary-container)' }}
                />
                <div
                  className="w-32 h-32 rounded-xl flex items-center justify-center text-7xl rotate-6 custom-shadow-green"
                  style={{ backgroundColor: 'var(--primary-container)' }}
                >
                  🌱
                </div>
              </div>
            </div>

            {/* サマリーカード */}
            <div
              className="p-6 rounded-xl flex flex-col gap-4 card-shadow"
              style={{ backgroundColor: 'var(--surface-container-low)' }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center text-xl shadow-sm"
                  style={{ backgroundColor: 'white' }}
                >
                  🌿
                </div>
                <div className="flex-1">
                  <p
                    className="text-xs font-semibold"
                    style={{ color: 'var(--on-surface-variant)' }}
                  >
                    のばした部位
                  </p>
                  <p
                    className="font-headline font-bold text-base"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    {selectedParts
                      .map((id) => BODY_PARTS.find((p) => p.id === id)?.label)
                      .join('・')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center text-xl shadow-sm"
                  style={{ backgroundColor: 'white' }}
                >
                  ⏱️
                </div>
                <div className="flex-1">
                  <p
                    className="text-xs font-semibold"
                    style={{ color: 'var(--on-surface-variant)' }}
                  >
                    のばした時間
                  </p>
                  <p
                    className="font-headline font-bold text-base"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    {minutes}分
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* 固定ボトムアクション：グラデーションフェード上に配置 */}
      <div
        className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto px-6 pb-8 pt-8 flex justify-center"
        style={{
          background:
            'linear-gradient(to top, var(--background) 55%, var(--background) 75%, transparent)',
        }}
      >
        {step === 1 && (
          <button
            onClick={() => setStep(2)}
            disabled={selectedParts.length === 0}
            className="w-full h-14 rounded-xl font-headline font-bold text-lg transition-all duration-300 active:scale-95 custom-shadow-green flex items-center justify-center gap-2 disabled:opacity-40 disabled:shadow-none"
            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
          >
            <span>つぎへ</span>
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        )}
        {step === 2 && (
          <button
            onClick={() => setStep(3)}
            className="w-full h-14 rounded-xl font-headline font-bold text-lg transition-all duration-300 active:scale-95 custom-shadow-green flex items-center justify-center gap-2"
            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
          >
            <span>つぎへ</span>
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        )}
        {step === 3 && (
          <button
            onClick={handleSave}
            className="w-full h-14 rounded-xl font-headline font-bold text-lg transition-all duration-300 active:scale-95 custom-shadow-green flex items-center justify-center gap-2"
            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
          >
            <span>記録する</span>
            <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  )
}
