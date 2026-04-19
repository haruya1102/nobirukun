import Link from 'next/link'

export function RecordButton() {
  return (
    <section className="mt-2">
      <Link
        href="/record"
        className="w-full h-14 rounded-xl font-headline font-bold text-lg flex items-center justify-center gap-3 active:scale-95 transition-transform duration-300 custom-shadow-green"
        style={{ backgroundColor: 'var(--primary)', color: 'white' }}
      >
        <span className="text-xl">＋</span>
        <span>ストレッチを記録する</span>
      </Link>
      <p
        className="text-center mt-4 text-sm font-medium opacity-80"
        style={{ color: 'var(--secondary)' }}
      >
        今日も一日、よく伸ばしました！
      </p>
    </section>
  )
}
