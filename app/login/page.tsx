'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

type Role = 'admin' | 'worker'

const ROLE_LABEL: Record<Role, string> = {
  admin: '기업 담당자',
  worker: '외국인 근로자',
}

function LoginContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const role: Role = searchParams.get('role') === 'worker' ? 'worker' : 'admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해 주세요')
      return
    }

    // 아직 실제 로그인 기능이 없어 화면 이동만 한다
    router.push(role === 'admin' ? '/dashboard/admin' : '/dashboard/learner')
  }

  const otherRole: Role = role === 'admin' ? 'worker' : 'admin'

  return (
    <main className="flex min-h-screen w-full flex-col px-4 py-6">
      {/* 헤더 */}
      <header className="mx-auto w-full max-w-5xl">
        <Link
          href="/"
          className="glow-text text-2xl font-bold text-space-400 no-underline transition hover:text-space-300"
        >
          Vibe
        </Link>
      </header>

      <div className="flex flex-1 items-center justify-center py-10">
        <div className="card w-full max-w-md space-y-7">
          {/* 제목 */}
          <div className="space-y-1">
            <h1 className="glow-text text-3xl font-bold">로그인</h1>
            <p className="text-gray-300">{ROLE_LABEL[role]}로 로그인합니다</p>
          </div>

          {/* 역할 전환 탭 */}
          <div
            role="tablist"
            aria-label="로그인 유형"
            className="flex gap-2 rounded-lg border border-space-800 bg-void-950/60 p-2"
          >
            {(['admin', 'worker'] as Role[]).map((tab) => (
              <Link
                key={tab}
                href={`/login?role=${tab}`}
                replace
                role="tab"
                aria-selected={role === tab}
                className={`flex-1 rounded-md py-2 text-center text-sm font-semibold no-underline transition ${
                  role === tab
                    ? 'glow-button bg-space-600 text-white'
                    : 'text-gray-300 hover:bg-space-900 hover:text-white'
                }`}
              >
                {ROLE_LABEL[tab]}
              </Link>
            ))}
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-500/50 bg-red-500/15 p-3 text-sm text-red-200"
              >
                {error}
              </p>
            )}

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-200"
              >
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError('')
                }}
                placeholder="your@email.com"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-200"
              >
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (error) setError('')
                }}
                placeholder="••••••••"
                className="w-full"
              />
            </div>

            <button type="submit" className="btn-primary mt-2 w-full">
              로그인
            </button>
          </form>

          {/* 회원가입 */}
          <div className="space-y-3 border-t border-space-800 pt-6 text-center">
            <p className="text-sm text-gray-300">아직 계정이 없으신가요?</p>
            <Link
              href={`/signup/${role === 'admin' ? 'company' : 'worker'}`}
              className="btn-secondary w-full no-underline"
            >
              회원가입
            </Link>
          </div>

          {/* 다른 역할로 전환 */}
          <p className="text-center text-sm text-gray-400">
            {ROLE_LABEL[otherRole]}이신가요?{' '}
            <Link
              href={`/login?role=${otherRole}`}
              replace
              className="font-semibold text-space-300 hover:text-space-200"
            >
              {ROLE_LABEL[otherRole]}로 전환 →
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-300">불러오는 중…</p>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  )
}
