import Link from 'next/link'
import { notFound } from 'next/navigation'

import {
  COMPANY,
  COUNTRY,
  findCourse,
  findWorker,
  STATUS_LABEL,
  STATUS_STYLE,
  WORKERS,
} from '@/lib/sample-data'

export function generateStaticParams() {
  return WORKERS.map((worker) => ({ workerId: worker.id }))
}

export default function WorkerDetailPage({
  params,
}: {
  params: { workerId: string }
}) {
  const worker = findWorker(params.workerId)
  if (!worker) notFound()

  const completed = worker.enrollments.filter((e) => e.status === 'COMPLETED')
  const completedHours = completed.reduce(
    (sum, e) => sum + (findCourse(e.courseId)?.hours ?? 0),
    0,
  )

  return (
    <>
      <header className="border-b border-space-800 bg-void-950/70 px-4 py-5 md:px-8">
        <Link
          href="/dashboard/admin/workers"
          className="text-sm font-semibold text-space-300 hover:text-space-200"
        >
          ← 근로자 목록
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-white">{worker.name}</h1>
        <p className="mt-1 text-sm text-gray-400">
          {worker.nameLocal} · {COUNTRY[worker.country].flag}{' '}
          {COUNTRY[worker.country].ko}
        </p>
      </header>

      <div className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <p className="inline-block rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs text-amber-200">
            화면 확인용 예시 데이터입니다 (실제 데이터 연결 전)
          </p>

          {/* 인적사항 */}
          <section className="card">
            <h2 className="mb-4 text-lg font-bold text-white">인적사항</h2>
            <dl className="grid gap-x-6 gap-y-4 text-sm sm:grid-cols-2">
              <Row label="소속" value={COMPANY.name} />
              <Row label="부서" value={worker.department} />
              <Row label="고용형태" value={worker.employmentType} />
              <Row label="입사일" value={worker.hiredOn} />
              <Row
                label="국적"
                value={`${COUNTRY[worker.country].flag} ${COUNTRY[worker.country].ko}`}
              />
              <Row label="현지 표기" value={worker.nameLocal} />
            </dl>
          </section>

          {/* 이수 요약 */}
          <section className="grid gap-4 sm:grid-cols-3">
            <SummaryCard
              label="배정된 교육"
              value={`${worker.enrollments.length}건`}
            />
            <SummaryCard label="수료" value={`${completed.length}건`} />
            <SummaryCard label="누적 이수시간" value={`${completedHours}시간`} />
          </section>

          {/* 교육 이력 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">교육 이력</h2>

            {worker.enrollments.map((enrollment) => {
              const course = findCourse(enrollment.courseId)
              if (!course) return null

              return (
                <article key={enrollment.courseId} className="card">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-bold text-white">{course.title}</h3>
                      <p className="mt-0.5 text-sm text-gray-400">
                        {course.legalBasis} · {course.hours}시간
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-sm font-semibold ${
                        STATUS_STYLE[enrollment.status]
                      }`}
                    >
                      {STATUS_LABEL[enrollment.status]}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-3">
                      <div
                        role="progressbar"
                        aria-valuenow={enrollment.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${course.title} 진행률`}
                        className="h-2 flex-1 overflow-hidden rounded-full bg-void-950"
                      >
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-space-300 to-space-600"
                          style={{ width: `${enrollment.progress}%` }}
                        />
                      </div>
                      <span className="w-10 shrink-0 text-right text-sm font-semibold text-space-300">
                        {enrollment.progress}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      {course.sections.length}개 단원 중{' '}
                      {enrollment.completedSections}개 완료
                    </p>
                  </div>

                  <dl className="mt-4 grid gap-x-6 gap-y-3 border-t border-space-800 pt-4 text-sm sm:grid-cols-3">
                    <Row label="배정일" value={enrollment.assignedOn} />
                    <Row label="완료 기한" value={enrollment.dueOn} />
                    <Row label="수료일" value={enrollment.completedOn ?? '—'} />
                  </dl>

                  {enrollment.certificateId && (
                    <Link
                      href={`/certificate/${enrollment.certificateId}`}
                      className="btn-secondary mt-4 w-full text-sm no-underline"
                    >
                      수료증 보기
                    </Link>
                  )}
                </article>
              )
            })}
          </section>
        </div>
      </div>
    </>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-gray-400">{label}</dt>
      <dd className="mt-0.5 font-semibold text-white">{value}</dd>
    </div>
  )
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="card border-l-4 border-l-space-500">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
    </div>
  )
}
