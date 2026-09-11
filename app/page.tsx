import Link from 'next/link'

const ROLES = [
  {
    href: '/login?role=admin',
    icon: '🏢',
    title: '기업 담당자',
    lines: ['근로자 교육을 관리하고', '진행 상황을 추적하세요'],
  },
  {
    href: '/login?role=worker',
    icon: '🌍',
    title: '외국인 근로자',
    lines: ['모국어로 산업안전교육을', '배우고 수료증을 받으세요'],
  },
]

const FEATURES = [
  {
    icon: '📚',
    title: '체계적인 교육',
    desc: '법정 기준을 충족하는 교육 콘텐츠',
  },
  {
    icon: '🌐',
    title: '다국어 지원',
    desc: '베트남어 · 우즈베키스탄어 · 미얀마어',
  },
  {
    icon: '✅',
    title: '수료 기록 관리',
    desc: '교육 이력과 수료증을 한곳에서',
  },
]

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col px-4 py-6">
      {/* 헤더 */}
      <header className="mx-auto w-full max-w-5xl">
        <span className="glow-text text-2xl font-bold text-space-400">Vibe</span>
      </header>

      {/* 가운데 영역 */}
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center py-12">
        <div className="space-y-5 text-center">
          {/* intent.md 의 '원하는 결과'를 한 줄로 */}
          <h1 className="glow-text text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            말이 통해야{' '}
            <span className="bg-gradient-to-r from-space-300 to-space-500 bg-clip-text text-transparent">
              안전이 통합니다
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300 sm:text-xl">
            외국인 근로자를 위한 다국어 산업안전교육 플랫폼
            <br />
            모국어로 이해하고, 수료증으로 증명합니다
          </p>
        </div>

        {/* 역할 선택 */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {ROLES.map((role) => (
            <Link
              key={role.href}
              href={role.href}
              className="card card-interactive group block no-underline"
            >
              <div className="space-y-4">
                <div aria-hidden className="text-4xl">
                  {role.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">{role.title}</h2>
                <p className="text-gray-300">
                  {role.lines[0]}
                  <br />
                  {role.lines[1]}
                </p>
                <span className="inline-block pt-2 font-semibold text-space-300 transition group-hover:text-space-200">
                  로그인 →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 특징 */}
        <ul className="mt-16 grid gap-4 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <li
              key={feature.title}
              className="rounded-lg border border-space-800 bg-void-950/40 p-5 text-center"
            >
              <div aria-hidden className="mb-2 text-3xl">
                {feature.icon}
              </div>
              <h3 className="mb-1 font-semibold text-white">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* 푸터 */}
      <footer className="mx-auto w-full max-w-5xl pt-6 text-center text-sm text-gray-400">
        <p>© 2026 Vibe</p>
      </footer>
    </main>
  )
}
