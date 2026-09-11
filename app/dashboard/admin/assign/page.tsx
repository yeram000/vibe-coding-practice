'use client'

import Link from 'next/link'
import { useState } from 'react'

import {
  COURSES,
  COUNTRY,
  primaryEnrollment,
  STATUS_LABEL,
  STATUS_STYLE,
  WORKERS,
} from '@/lib/sample-data'

export default function AssignPage() {
  const [selected, setSelected] = useState<string[]>([])
  const [courseId, setCourseId] = useState(COURSES[0].id)
  const [dueOn, setDueOn] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const course = COURSES.find((c) => c.id === courseId)

  function toggle(workerId: string) {
    setError('')
    setSelected((prev) =>
      prev.includes(workerId)
        ? prev.filter((id) => id !== workerId)
        : [...prev, workerId],
    )
  }

  function selectNotFinished() {
    setError('')
    setSelected(
      WORKERS.filter((w) => {
        const status = primaryEnrollment(w).status
        return status === 'NOT_STARTED' || status === 'OVERDUE'
      }).map((w) => w.id),
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (selected.length === 0) {
      setError('교육을 배정할 근로자를 한 명 이상 골라 주세요')
      return
    }
    if (!dueOn) {
      setError('완료 기한을 정해 주세요')
      return
    }

    setDone(true)
  }

  /* ----- 배정 결과 ----- */
  if (done) {
    const names = WORKERS.filter((w) => selected.includes(w.id))

    return (
      <>
        <header className="border-b border-space-800 bg-void-950/70 px-4 py-5 md:px-8">
          <h1 className="text-2xl font-bold text-white">교육 배정</h1>
        </header>

        <div className="flex-1 p-4 md:p-8">
          <div className="mx-auto max-w-3xl space-y-6">
            <section className="card space-y-5">
              <div className="space-y-2 text-center">
                <p aria-hidden className="text-4xl">
                  📋
                </p>
                <h2 className="text-xl font-bold text-white">
                  배정 내용을 확인했습니다
                </h2>
                <p className="text-sm text-gray-300">
                  아직 저장소를 연결하지 않아 실제로 저장되지는 않습니다.
                </p>
              </div>

              <dl className="space-y-3 border-t border-space-800 pt-5 text-sm">
                <div>
                  <dt className="text-gray-400">교육과정</dt>
                  <dd className="mt-0.5 font-semibold text-white">
                    {course?.title} ({course?.hours}시간)
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-400">완료 기한</dt>
                  <dd className="mt-0.5 font-semibold text-white">{dueOn}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">
                    대상 근로자 {names.length}명
                  </dt>
                  <dd className="mt-1 flex flex-wrap gap-2">
                    {names.map((w) => (
                      <span
                        key={w.id}
                        className="rounded-full bg-space-600/30 px-3 py-1 text-space-200"
                      >
                        {COUNTRY[w.country].flag} {w.name}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="space-y-2 border-t border-space-800 pt-5">
                <button
                  type="button"
                  onClick={() => {
                    setDone(false)
                    setSelected([])
                    setDueOn('')
                  }}
                  className="btn-primary w-full text-sm"
                >
                  다시 배정하기
                </button>
                <Link
                  href="/dashboard/admin/workers"
                  className="btn-secondary w-full text-sm no-underline"
                >
                  근로자 목록으로
                </Link>
              </div>
            </section>
          </div>
        </div>
      </>
    )
  }

  /* ----- 배정 입력 ----- */
  return (
    <>
      <header className="border-b border-space-800 bg-void-950/70 px-4 py-5 md:px-8">
        <h1 className="text-2xl font-bold text-white">교육 배정</h1>
        <p className="mt-1 text-sm text-gray-400">
          근로자를 고르고 교육과 기한을 정합니다
        </p>
      </header>

      <div className="flex-1 p-4 md:p-8">
        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6">
          <p className="inline-block rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs text-amber-200">
            화면 확인용입니다 (배정 내용은 아직 저장되지 않습니다)
          </p>

          {/* 1. 근로자 고르기 */}
          <section className="card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-white">
                1. 근로자 고르기
                <span className="ml-2 text-sm font-normal text-space-300">
                  {selected.length}명 선택됨
                </span>
              </h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={selectNotFinished}
                  className="rounded-lg border border-space-700 px-3 py-1.5 text-sm text-gray-200 transition hover:border-space-500 hover:text-white"
                >
                  미이수자만
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setError('')
                    setSelected(
                      selected.length === WORKERS.length
                        ? []
                        : WORKERS.map((w) => w.id),
                    )
                  }}
                  className="rounded-lg border border-space-700 px-3 py-1.5 text-sm text-gray-200 transition hover:border-space-500 hover:text-white"
                >
                  {selected.length === WORKERS.length ? '전체 해제' : '전체 선택'}
                </button>
              </div>
            </div>

            <ul className="space-y-2">
              {WORKERS.map((worker) => {
                const status = primaryEnrollment(worker).status
                const checked = selected.includes(worker.id)

                return (
                  <li key={worker.id}>
                    <label
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${
                        checked
                          ? 'border-space-500 bg-space-600/15'
                          : 'border-space-800 hover:border-space-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(worker.id)}
                        className="h-4 w-4 shrink-0 accent-space-500"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold text-white">
                          {worker.name}
                        </span>
                        <span className="block truncate text-sm text-gray-400">
                          {COUNTRY[worker.country].flag}{' '}
                          {COUNTRY[worker.country].ko} · {worker.department} ·{' '}
                          {worker.employmentType}
                        </span>
                      </span>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[status]}`}
                      >
                        {STATUS_LABEL[status]}
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </section>

          {/* 2. 교육 고르기 */}
          <section className="card space-y-4">
            <h2 className="text-lg font-bold text-white">2. 교육 고르기</h2>

            <div className="space-y-2">
              {COURSES.map((c) => (
                <label
                  key={c.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition ${
                    courseId === c.id
                      ? 'border-space-500 bg-space-600/15'
                      : 'border-space-800 hover:border-space-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="course"
                    value={c.id}
                    checked={courseId === c.id}
                    onChange={() => {
                      setError('')
                      setCourseId(c.id)
                    }}
                    className="mt-1 h-4 w-4 shrink-0 accent-space-500"
                  />
                  <span className="min-w-0">
                    <span className="block font-semibold text-white">
                      {c.title}
                    </span>
                    <span className="block text-sm text-gray-400">
                      {c.legalBasis} · {c.hours}시간 · {c.sections.length}개 단원
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* 3. 기한 정하기 */}
          <section className="card space-y-4">
            <h2 className="text-lg font-bold text-white">3. 완료 기한 정하기</h2>
            <div className="space-y-2">
              <label
                htmlFor="dueOn"
                className="block text-sm font-semibold text-gray-200"
              >
                이 날짜까지 교육을 마쳐야 합니다
              </label>
              <input
                id="dueOn"
                type="date"
                value={dueOn}
                onChange={(e) => {
                  setError('')
                  setDueOn(e.target.value)
                }}
                className="w-full sm:w-60"
              />
            </div>
          </section>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-500/50 bg-red-500/15 p-3 text-sm text-red-200"
            >
              {error}
            </p>
          )}

          <button type="submit" className="btn-primary w-full">
            {selected.length}명에게 교육 배정하기
          </button>
        </form>
      </div>
    </>
  )
}
