import Link from 'next/link'
import { notFound } from 'next/navigation'

import {
  COUNTRY,
  CURRENT_WORKER_ID,
  findCourse,
  findWorker,
  STATUS_LABEL,
  STATUS_STYLE,
} from '@/lib/sample-data'

export default function LearnerDashboard() {
  const worker = findWorker(CURRENT_WORKER_ID)
  if (!worker) notFound()

  return (
    <main className="min-h-screen w-full">
      <header className="border-b border-space-800 bg-void-950/70 px-4 py-5 md:px-6">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <Link href="/" className="no-underline">
              <h1 className="text-2xl font-bold text-white md:text-3xl">
                산업안전교육
                <span className="text-space-400"> 학습</span>
              </h1>
            </Link>
            <p className="mt-1 truncate text-sm text-gray-400">
              {worker.name} ({worker.nameLocal}) ·{' '}
              {COUNTRY[worker.country].flag} {COUNTRY[worker.country].ko}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <label htmlFor="language" className="block text-xs text-gray-400">
                언어 / Ngôn ngữ
              </label>
              <select
                id="language"
                defaultValue="ko-vi"
                className="mt-1 py-2 text-sm"
              >
                <option value="ko-vi">한국어 + 베트남어</option>
                <option value="ko">한국어</option>
                <option value="vi">Tiếng Việt</option>
              </select>
            </div>
            <button
              type="button"
              aria-label="내 계정"
              className="rounded-lg p-3 transition hover:bg-space-900"
            >
              👤
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 py-10 md:px-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white">배정된 교육</h2>
            <p className="mt-1 text-gray-300">
              아래 교육을 수강하고 수료증을 받으세요
            </p>
          </div>

          <p className="inline-block rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs text-amber-200">
            화면 확인용 예시 데이터입니다 (교육 영상 연결 전)
          </p>

          <ul className="grid gap-5">
            {worker.enrollments.map((enrollment) => {
              const course = findCourse(enrollment.courseId)
              if (!course) return null

              const done = enrollment.status === 'COMPLETED'

              return (
                <li key={enrollment.courseId} className="card">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-bold text-white">
                        {course.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-400">
                        {course.titleVi}
                      </p>
                      <p className="mt-3 text-sm text-gray-300">
                        {course.legalBasis} · 총 {course.hours}시간 ·{' '}
                        {course.sections.length}개 단원
                      </p>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">진행률</span>
                          <span className="font-semibold text-space-300">
                            {enrollment.progress}%
                          </span>
                        </div>
                        <div
                          role="progressbar"
                          aria-valuenow={enrollment.progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${course.title} 진행률`}
                          className="h-2 w-full overflow-hidden rounded-full bg-void-950"
                        >
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-space-300 to-space-600"
                            style={{ width: `${enrollment.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                        <span
                          className={`rounded-full px-3 py-1 font-semibold ${
                            STATUS_STYLE[enrollment.status]
                          }`}
                        >
                          {STATUS_LABEL[enrollment.status]}
                        </span>
                        <span className="text-gray-400">
                          완료 기한 {enrollment.dueOn}
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col gap-2">
                      <Link
                        href={`/dashboard/learner/course/${course.id}`}
                        className="btn-primary text-sm no-underline"
                      >
                        {done
                          ? '다시 보기'
                          : enrollment.progress > 0
                            ? '이어서 학습'
                            : '학습 시작'}
                      </Link>

                      {enrollment.certificateId && (
                        <Link
                          href={`/certificate/${enrollment.certificateId}`}
                          className="btn-secondary text-sm no-underline"
                        >
                          수료증 보기
                        </Link>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          <section className="rounded-lg border border-space-800 bg-void-950/40 p-6">
            <h3 className="mb-3 font-bold text-white">💡 학습 팁</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• 한국어 + 모국어 자막을 함께 켜면 더 잘 이해할 수 있습니다</li>
              <li>• 어려운 말은 각 단원 아래 &ldquo;어려운 말 사전&rdquo;에서 찾아보세요</li>
              <li>• 중간에 멈춘 곳부터 다시 시작할 수 있습니다</li>
              <li>• 이해가 안 되면 그냥 넘어가지 말고 꼭 물어보세요</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}
