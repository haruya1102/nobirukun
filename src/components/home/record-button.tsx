import Link from 'next/link'
import { Plus } from 'lucide-react'

export function RecordButton() {
  return (
    <section>
      <Link
        href="/record"
        className="w-full h-14 rounded-xl font-headline font-bold text-lg flex items-center justify-center gap-3 active:scale-95 transition-transform duration-300 custom-shadow-green"
        style={{ backgroundColor: 'var(--primary)', color: 'white' }}
      >
        <Plus className="w-6 h-6" strokeWidth={3} />
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
