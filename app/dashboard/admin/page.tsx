import Link from 'next/link'

import {
  allCertificates,
  COMPANY,
  COUNTRY,
  countByStatus,
  WORKERS,
} from '@/lib/sample-data'

type Tone = 'neutral' | 'progress' | 'done' | 'alert'

// Tailwind는 클래스 이름을 글자 그대로 찾기 때문에
// 'text-' + 변수 처럼 조립하면 색이 나오지 않는다. 그래서 전체 이름을 적어 둔다.
const TONE_STYLE: Record<Tone, { text: string; bar: string }> = {
  neutral: { text: 'text-gray-300', bar: 'border-l-space-700' },
  progress: { text: 'text-space-300', bar: 'border-l-space-500' },
  done: { text: 'text-emerald-300', bar: 'border-l-emerald-400' },
  alert: { text: 'text-amber-300', bar: 'border-l-amber-400' },
}

export default function AdminDashboard() {
  const certificates = allCertificates()
  const notFinished = countByStatus('NOT_STARTED') + countByStatus('OVERDUE')

  return (
    <>
      <header className="border-b border-space-800 bg-void-950/70 px-4 py-5 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold text-white">대시보드</h1>
            <p className="mt-1 truncate text-sm text-gray-400">
              {COMPANY.name} · 상시근로자 {COMPANY.employeeCount}명
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label="알림"
              className="rounded-lg p-2 transition hover:bg-space-900"
            >
              🔔
            </button>
            <button
              type="button"
              aria-label="내 계정"
              className="rounded-lg p-2 transition hover:bg-space-900"
            >
              👤
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <p className="inline-block rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs text-amber-200">
            화면 확인용 예시 데이터입니다 (실제 데이터 연결 전)
          </p>

          {/* 요약 */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="등록 근로자"
              value={`${WORKERS.length}명`}
              note="베트남 · 우즈베키스탄 · 미얀마"
            />
            <StatCard
              title="교육 진행 중"
              value={`${countByStatus('IN_PROGRESS')}명`}
              note="수강 중"
              tone="progress"
            />
            <StatCard
              title="수료증 발급"
              value={`${certificates.length}건`}
              note="법정 증빙 보관 중"
              tone="done"
            />
            <StatCard
              title="미이수"
              value={`${notFinished}명`}
              note="미시작 + 기한 초과"
              tone="alert"
            />
          </div>

          {/* 최근 수료자 */}
          <section className="card">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-white">최근 수료자</h2>
              <Link
                href="/dashboard/admin/workers"
                className="shrink-0 text-sm font-semibold text-space-300 hover:text-space-200"
              >
                근로자 전체 보기 →
              </Link>
            </div>

            <ul className="space-y-3">
              {certificates.map((cert) => (
                <li key={cert.id}>
                  <Link
                    href={`/certificate/${cert.id}`}
                    className="flex items-center justify-between gap-4 rounded-lg border border-space-800 p-3 no-underline transition hover:border-space-600"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-white">
                        {cert.worker.name}
                      </p>
                      <p className="truncate text-sm text-gray-400">
                        {COUNTRY[cert.worker.country].flag}{' '}
                        {COUNTRY[cert.worker.country].ko} ·{' '}
                        {cert.worker.department}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm text-space-300">
                        {cert.course.hours}시간 수료
                      </p>
                      <p className="text-xs text-gray-400">{cert.issuedOn}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* 다음 할 일 */}
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/dashboard/admin/workers"
              className="card card-interactive group block no-underline"
            >
              <h3 className="mb-1 text-lg font-bold text-white transition group-hover:text-space-200">
                근로자 관리
              </h3>
              <p className="text-sm text-gray-400">
                국적·부서·진행 상태로 근로자를 찾아보세요
              </p>
            </Link>

            <Link
              href="/dashboard/admin/assign"
              className="card card-interactive group block no-underline"
            >
              <h3 className="mb-1 text-lg font-bold text-white transition group-hover:text-space-200">
                교육 배정
              </h3>
              <p className="text-sm text-gray-400">
                근로자를 고르고 교육과 기한을 정하세요
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

function StatCard({
  title,
  value,
  note,
  tone = 'neutral',
}: {
  title: string
  value: string
  note: string
  tone?: Tone
}) {
  const style = TONE_STYLE[tone]
  return (
    <div className={`card border-l-4 ${style.bar}`}>
      <p className="text-sm text-gray-400">{title}</p>
      <p className="my-2 text-3xl font-bold text-white">{value}</p>
      <p className={`text-sm font-semibold ${style.text}`}>{note}</p>
    </div>
  )
}
