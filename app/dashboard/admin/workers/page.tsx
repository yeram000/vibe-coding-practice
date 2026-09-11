'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import {
  COUNTRY,
  CountryCode,
  EnrollmentStatus,
  findCourse,
  primaryEnrollment,
  STATUS_LABEL,
  STATUS_STYLE,
  WORKERS,
} from '@/lib/sample-data'

const COUNTRY_FILTERS: { value: 'ALL' | CountryCode; label: string }[] = [
  { value: 'ALL', label: '전체 국적' },
  { value: 'VN', label: '🇻🇳 베트남' },
  { value: 'UZ', label: '🇺🇿 우즈베키스탄' },
  { value: 'MM', label: '🇲🇲 미얀마' },
]

const STATUS_FILTERS: { value: 'ALL' | EnrollmentStatus; label: string }[] = [
  { value: 'ALL', label: '전체 상태' },
  { value: 'NOT_STARTED', label: '미시작' },
  { value: 'IN_PROGRESS', label: '진행 중' },
  { value: 'COMPLETED', label: '수료' },
  { value: 'OVERDUE', label: '기한 초과' },
]

export default function WorkersPage() {
  const [keyword, setKeyword] = useState('')
  const [country, setCountry] = useState<'ALL' | CountryCode>('ALL')
  const [status, setStatus] = useState<'ALL' | EnrollmentStatus>('ALL')

  const workers = useMemo(() => {
    const q = keyword.trim().toLowerCase()

    return WORKERS.filter((worker) => {
      const matchesKeyword =
        q === '' ||
        worker.name.toLowerCase().includes(q) ||
        worker.nameLocal.toLowerCase().includes(q) ||
        worker.department.toLowerCase().includes(q)

      const matchesCountry = country === 'ALL' || worker.country === country
      const matchesStatus =
        status === 'ALL' || primaryEnrollment(worker).status === status

      return matchesKeyword && matchesCountry && matchesStatus
    })
  }, [keyword, country, status])

  return (
    <>
      <header className="border-b border-space-800 bg-void-950/70 px-4 py-5 md:px-8">
        <h1 className="text-2xl font-bold text-white">근로자 관리</h1>
        <p className="mt-1 text-sm text-gray-400">
          전체 {WORKERS.length}명 · 교육 진행 상황을 한눈에 확인합니다
        </p>
      </header>

      <div className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <p className="inline-block rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs text-amber-200">
            화면 확인용 예시 데이터입니다 (실제 데이터 연결 전)
          </p>

          {/* 찾기 */}
          <div className="card space-y-4">
            <div>
              <label
                htmlFor="keyword"
                className="mb-2 block text-sm font-semibold text-gray-200"
              >
                이름 · 부서로 찾기
              </label>
              <input
                id="keyword"
                type="search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="예: 응우옌, Nguyễn, 물류창고"
                className="w-full"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="country"
                  className="mb-2 block text-sm font-semibold text-gray-200"
                >
                  국적
                </label>
                <select
                  id="country"
                  value={country}
                  onChange={(e) =>
                    setCountry(e.target.value as 'ALL' | CountryCode)
                  }
                  className="w-full"
                >
                  {COUNTRY_FILTERS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-semibold text-gray-200"
                >
                  교육 상태
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as 'ALL' | EnrollmentStatus)
                  }
                  className="w-full"
                >
                  {STATUS_FILTERS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 결과 */}
          <p aria-live="polite" className="text-sm text-gray-300">
            <span className="font-semibold text-white">{workers.length}명</span>{' '}
            찾았습니다
          </p>

          {workers.length === 0 ? (
            <div className="card text-center text-gray-300">
              조건에 맞는 근로자가 없습니다. 검색어나 조건을 바꿔 보세요.
            </div>
          ) : (
            <ul className="space-y-3">
              {workers.map((worker) => {
                const enrollment = primaryEnrollment(worker)
                const course = findCourse(enrollment.courseId)
                // 진행 중인 교육과 별개로, 지금까지 받은 수료증이 있으면 보여 준다
                const certificateId = worker.enrollments.find(
                  (e) => e.certificateId,
                )?.certificateId

                return (
                  <li key={worker.id} className="card">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      {/* 사람 정보 */}
                      <div className="min-w-0 md:w-60">
                        <Link
                          href={`/dashboard/admin/workers/${worker.id}`}
                          className="block truncate font-bold text-white no-underline hover:text-space-200"
                        >
                          {worker.name} →
                        </Link>
                        <p className="truncate text-sm text-gray-400">
                          {worker.nameLocal}
                        </p>
                        <p className="mt-1 truncate text-sm text-gray-300">
                          {COUNTRY[worker.country].flag}{' '}
                          {COUNTRY[worker.country].ko} · {worker.department}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500">
                          {worker.employmentType} · 입사 {worker.hiredOn}
                        </p>
                      </div>

                      {/* 교육 진행 */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm text-gray-300">
                          {course?.title}
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <div
                            role="progressbar"
                            aria-valuenow={enrollment.progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${worker.name} 진행률`}
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
                        <p className="mt-1 text-xs text-gray-500">
                          완료 기한 {enrollment.dueOn}
                        </p>
                      </div>

                      {/* 상태 */}
                      <div className="flex shrink-0 items-center gap-3">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            STATUS_STYLE[enrollment.status]
                          }`}
                        >
                          {STATUS_LABEL[enrollment.status]}
                        </span>

                        {certificateId ? (
                          <Link
                            href={`/certificate/${certificateId}`}
                            className="text-sm font-semibold text-space-300 hover:text-space-200"
                          >
                            수료증 →
                          </Link>
                        ) : (
                          <span className="text-sm text-gray-600">
                            수료증 없음
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}
