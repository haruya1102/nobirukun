"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen } from 'lucide-react'

const navItems = [
  { href: '/home', label: 'ホーム', icon: Home },
  { href: '/log', label: '記録', icon: BookOpen },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-6 left-0 right-0 z-50 flex justify-around items-center mx-auto max-w-md h-20 rounded-full w-[92%]"
      style={{
        backgroundColor: 'rgba(255, 241, 230, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 12px 30px -10px rgba(61, 50, 38, 0.15)',
      }}
      aria-label="メインナビゲーション"
    >
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || (href === '/home' && pathname === '/')
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center justify-center px-5 py-2 rounded-full transition-colors"
            style={
              isActive
                ? {
                    backgroundColor: 'var(--primary-container)',
                    color: 'var(--on-primary-container)',
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 20px -6px rgba(50, 106, 53, 0.35)',
                  }
                : { color: 'var(--secondary)' }
            }
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className="w-6 h-6" strokeWidth={2.5} />
            <span className="text-[11px] font-semibold mt-0.5">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
