'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const MENU = [
  { icon: '📊', label: '대시보드', href: '/dashboard/admin' },
  { icon: '👥', label: '근로자 관리', href: '/dashboard/admin/workers' },
  { icon: '📚', label: '교육 배정', href: null },
  { icon: '✅', label: '수료 현황', href: null },
  { icon: '📄', label: '보고서', href: null },
  { icon: '⚙️', label: '설정', href: null },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen w-full">
      {/* 사이드바 — 좁은 화면에서는 숨기고 위쪽 가로 메뉴로 대신한다 */}
      <aside
        className={`hidden shrink-0 flex-col border-r border-space-800 bg-void-950/70 transition-all duration-300 md:flex ${
          sidebarOpen ? 'w-60' : 'w-20'
        }`}
      >
        <div className="flex items-center justify-between border-b border-space-800 p-5">
          {sidebarOpen && (
            <Link
              href="/"
              className="glow-text text-xl font-bold text-space-400 no-underline"
            >
              Vibe
            </Link>
          )}
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label={sidebarOpen ? '메뉴 접기' : '메뉴 펼치기'}
            className="rounded-lg p-2 text-gray-300 transition hover:bg-space-900 hover:text-white"
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {MENU.map((item) => {
            const active = item.href === pathname
            const className = `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm no-underline transition ${
              active
                ? 'glow-button bg-space-800 text-space-200'
                : item.href
                  ? 'text-gray-300 hover:bg-space-900 hover:text-white'
                  : 'text-gray-500'
            }`

            const inner = (
              <>
                <span aria-hidden className="text-xl">
                  {item.icon}
                </span>
                {sidebarOpen && (
                  <span className="truncate font-medium">
                    {item.label}
                    {!item.href && (
                      <span className="ml-1 text-xs text-gray-600">준비 중</span>
                    )}
                  </span>
                )}
              </>
            )

            return item.href ? (
              <Link key={item.label} href={item.href} className={className}>
                {inner}
              </Link>
            ) : (
              <div
                key={item.label}
                aria-disabled
                title={`${item.label} (준비 중)`}
                className={className}
              >
                {inner}
              </div>
            )
          })}
        </nav>

        <div className="border-t border-space-800 p-3">
          <Link
            href="/"
            className="block rounded-lg px-3 py-2 text-sm text-gray-300 no-underline transition hover:bg-space-900 hover:text-white"
          >
            {sidebarOpen ? '로그아웃' : '⎋'}
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* 좁은 화면용 가로 메뉴 */}
        <nav className="flex gap-2 overflow-x-auto border-b border-space-800 bg-void-950/70 px-4 py-3 md:hidden">
          {MENU.map((item) => {
            const active = item.href === pathname
            const className = `whitespace-nowrap rounded-full border px-3 py-1.5 text-sm no-underline ${
              active
                ? 'border-space-500 bg-space-600/30 text-white'
                : item.href
                  ? 'border-space-800 text-gray-300'
                  : 'border-space-900 text-gray-500'
            }`
            return item.href ? (
              <Link key={item.label} href={item.href} className={className}>
                {item.icon} {item.label}
              </Link>
            ) : (
              <span key={item.label} className={className}>
                {item.icon} {item.label}
              </span>
            )
          })}
        </nav>

        {children}
      </div>
    </div>
  )
}
