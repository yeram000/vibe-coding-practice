import Link from 'next/link'
import { notFound } from 'next/navigation'

import {
  COURSES,
  CURRENT_WORKER_ID,
  findCourse,
  findWorker,
  GLOSSARY,
  STATUS_LABEL,
  STATUS_STYLE,
} from '@/lib/sample-data'

/** 어떤 교육 화면들을 미리 만들어 둘지 알려 준다 */
export function generateStaticParams() {
  return COURSES.map((course) => ({ courseId: course.id }))
}

export default function CoursePage({
  params,
}: {
  params: { courseId: string }
}) {
  const course = findCourse(params.courseId)
  const worker = findWorker(CURRENT_WORKER_ID)
  if (!course || !worker) notFound()

  const enrollment = worker.enrollments.find(
    (e) => e.courseId === course.id,
  )
  if (!enrollment) notFound()

  return (
    <main className="min-h-screen w-full">
      <header className="border-b border-space-800 bg-void-950/70 px-4 py-5 md:px-6">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/dashboard/learner"
            className="text-sm font-semibold text-space-300 hover:text-space-200"
          >
            ← 내 교육 목록
          </Link>
          <h1 className="mt-3 text-2xl font-bold text-white md:text-3xl">
            {course.title}
          </h1>
          <p className="mt-1 text-gray-400">{course.titleVi}</p>
          <p className="mt-3 text-sm text-gray-300">
            {course.legalBasis} · 총 {course.hours}시간
          </p>
        </div>
      </header>

      <div className="px-4 py-8 md:px-6">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* 진행 상황 */}
          <section className="card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  STATUS_STYLE[enrollment.status]
                }`}
              >
                {STATUS_LABEL[enrollment.status]}
              </span>
              <span className="text-sm text-gray-400">
                {course.sections.length}개 단원 중 {enrollment.completedSections}
                개 완료 · 기한 {enrollment.dueOn}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div
                role="progressbar"
                aria-valuenow={enrollment.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="전체 진행률"
                className="h-2.5 w-full overflow-hidden rounded-full bg-void-950"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-space-300 to-space-600"
                  style={{ width: `${enrollment.progress}%` }}
                />
              </div>
              <p className="text-right text-sm font-semibold text-space-300">
                {enrollment.progress}%
              </p>
            </div>

            {enrollment.certificateId && (
              <Link
                href={`/certificate/${enrollment.certificateId}`}
                className="btn-primary mt-5 w-full text-sm no-underline"
              >
                수료증 보기
              </Link>
            )}
          </section>

          {/* 영상 자리 */}
          <section>
            <h2 className="mb-3 text-xl font-bold text-white">교육 영상</h2>
            <div className="flex aspect-video items-center justify-center rounded-lg border border-space-800 bg-black">
              <div className="space-y-2 px-4 text-center">
                <div aria-hidden className="text-5xl">
                  🎬
                </div>
                <p className="text-gray-300">
                  교육 영상이 이 자리에 들어갑니다
                </p>
                <p className="text-sm text-gray-500">
                  한국어 음성 + 베트남어 자막 예정
                </p>
              </div>
            </div>
          </section>

          {/* 단원 목록 */}
          <section>
            <h2 className="mb-3 text-xl font-bold text-white">단원</h2>
            <ol className="space-y-3">
              {course.sections.map((section) => {
                const done = section.order <= enrollment.completedSections
                const current = section.order === enrollment.completedSections + 1

                return (
                  <li
                    key={section.order}
                    className={`card ${current ? 'border-space-500' : ''}`}
                  >
                    <div className="flex gap-4">
                      <span
                        aria-hidden
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          done
                            ? 'bg-emerald-500/20 text-emerald-200'
                            : current
                              ? 'bg-space-600 text-white'
                              : 'bg-void-800 text-gray-400'
                        }`}
                      >
                        {done ? '✓' : section.order}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-white">
                            {section.title}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {section.minutes}분
                          </span>
                          {done && (
                            <span className="text-xs font-semibold text-emerald-300">
                              완료
                            </span>
                          )}
                          {current && (
                            <span className="text-xs font-semibold text-space-300">
                              지금 학습할 단원
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-sm text-gray-400">
                          {section.titleVi}
                        </p>
                        <p className="mt-2 text-sm text-gray-300">
                          {section.summary}
                        </p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          </section>

          {/* 어려운 말 사전 */}
          <section>
            <h2 className="mb-1 text-xl font-bold text-white">어려운 말 사전</h2>
            <p className="mb-3 text-sm text-gray-400">
              현장에서 쓰는 한자어와 줄임말을 쉬운 말로 풀었습니다. 누르면
              펼쳐집니다.
            </p>

            <ul className="space-y-2">
              {GLOSSARY.map((item) => (
                <li key={item.term}>
                  <details className="card">
                    <summary className="cursor-pointer list-none">
                      <span className="font-bold text-white">{item.term}</span>
                      {item.hanja && (
                        <span className="ml-2 text-sm text-gray-500">
                          {item.hanja}
                        </span>
                      )}
                      {item.alsoCalled && (
                        <span className="ml-2 text-sm text-gray-400">
                          현장에서는 &ldquo;{item.alsoCalled}&rdquo;
                        </span>
                      )}
                      <span aria-hidden className="float-right text-space-300">
                        ▾
                      </span>
                    </summary>
                    <p className="mt-3 text-sm text-gray-200">{item.meaning}</p>
                    <p className="mt-1 text-sm text-gray-400">
                      {item.meaningVi}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}
