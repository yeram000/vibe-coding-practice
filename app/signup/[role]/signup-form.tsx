'use client'

import Link from 'next/link'
import { useState } from 'react'

type Role = 'company' | 'worker'

const COPY: Record<
  Role,
  { title: string; desc: string; loginRole: string }
> = {
  company: {
    title: '기업 담당자 회원가입',
    desc: '회사 정보를 등록하면 소속 근로자의 교육을 관리할 수 있습니다',
    loginRole: 'admin',
  },
  worker: {
    title: '근로자 회원가입',
    desc: 'Đăng ký tài khoản người lao động',
    loginRole: 'worker',
  },
}

export default function SignupForm({ role }: { role: Role }) {
  const copy = COPY[role]
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="flex min-h-screen w-full flex-col px-4 py-6">
      <header className="mx-auto w-full max-w-5xl">
        <Link
          href="/"
          className="glow-text text-2xl font-bold text-space-400 no-underline transition hover:text-space-300"
        >
          Vibe
        </Link>
      </header>

      <div className="flex flex-1 items-center justify-center py-10">
        <div className="card w-full max-w-md space-y-6">
          <div className="space-y-1">
            <h1 className="glow-text text-2xl font-bold">{copy.title}</h1>
            <p className="text-sm text-gray-300">{copy.desc}</p>
          </div>

          {/* 아직 저장되지 않는다는 점을 숨기지 않는다 */}
          <p className="rounded-lg border border-amber-400/40 bg-amber-400/10 p-3 text-xs leading-relaxed text-amber-200">
            아직 저장소를 연결하지 않아, 입력한 내용은 실제로 저장되지 않습니다.
            화면 확인용입니다.
          </p>

          {submitted ? (
            <div className="space-y-5 text-center">
              <p className="text-4xl" aria-hidden>
                📝
              </p>
              <p className="text-gray-200">
                입력하신 내용은 아직 저장되지 않습니다.
                <br />
                저장소를 연결한 뒤 실제로 가입할 수 있습니다.
              </p>
              <div className="space-y-2">
                <Link
                  href={`/login?role=${copy.loginRole}`}
                  className="btn-primary w-full text-sm no-underline"
                >
                  로그인 화면으로
                </Link>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary w-full text-sm"
                >
                  다시 입력하기
                </button>
              </div>
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              {role === 'company' ? (
                <>
                  <Field id="companyName" label="회사명" placeholder="예: 대한정밀공업 주식회사" />
                  <Field
                    id="businessNumber"
                    label="사업자등록번호"
                    placeholder="000-00-00000"
                  />
                  <Field id="manager" label="담당자 이름" placeholder="예: 김안전" />
                  <Field
                    id="email"
                    label="회사 이메일"
                    type="email"
                    placeholder="safety@company.co.kr"
                    autoComplete="email"
                  />
                </>
              ) : (
                <>
                  <Field
                    id="name"
                    label="이름 / Họ tên"
                    placeholder="예: 응우옌 반 훙"
                  />
                  <div className="space-y-2">
                    <label
                      htmlFor="country"
                      className="block text-sm font-semibold text-gray-200"
                    >
                      국적 / Quốc tịch
                    </label>
                    <select id="country" defaultValue="VN" className="w-full">
                      <option value="VN">🇻🇳 베트남 / Việt Nam</option>
                      <option value="UZ">🇺🇿 우즈베키스탄 / Oʻzbekiston</option>
                      <option value="MM">🇲🇲 미얀마 / မြန်မာ</option>
                    </select>
                  </div>
                  <Field
                    id="email"
                    label="이메일 / Email"
                    type="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </>
              )}

              <Field
                id="password"
                label="비밀번호"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
              />

              <button type="submit" className="btn-primary mt-2 w-full">
                가입하기
              </button>
            </form>
          )}

          <p className="border-t border-space-800 pt-5 text-center text-sm text-gray-400">
            이미 계정이 있으신가요?{' '}
            <Link
              href={`/login?role=${copy.loginRole}`}
              className="font-semibold text-space-300 hover:text-space-200"
            >
              로그인 →
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

function Field({
  id,
  label,
  type = 'text',
  placeholder,
  autoComplete,
}: {
  id: string
  label: string
  type?: string
  placeholder?: string
  autoComplete?: string
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-200">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full"
      />
    </div>
  )
}
