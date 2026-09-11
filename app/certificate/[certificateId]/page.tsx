import Link from 'next/link'
import { notFound } from 'next/navigation'

import {
  allCertificates,
  COMPANY,
  COUNTRY,
  findCertificate,
} from '@/lib/sample-data'

import PrintButton from './print-button'

export function generateStaticParams() {
  return allCertificates().map((cert) => ({ certificateId: cert.id }))
}

export default function CertificatePage({
  params,
}: {
  params: { certificateId: string }
}) {
  const cert = findCertificate(params.certificateId)
  if (!cert) notFound()

  const { worker, course } = cert

  return (
    <main className="min-h-screen w-full px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* 인쇄할 때는 빠지는 부분 */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/dashboard/learner"
            className="text-sm font-semibold text-space-300 hover:text-space-200"
          >
            ← 돌아가기
          </Link>
          <PrintButton />
        </div>

        {/* 수료증 본체 */}
        <article className="print-sheet card space-y-8 px-6 py-10 sm:px-12">
          <header className="space-y-2 text-center">
            <p className="text-sm tracking-widest text-space-300">
              CERTIFICATE OF COMPLETION
            </p>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              교육 수료증
            </h1>
            <p className="text-sm text-gray-400">
              Giấy chứng nhận hoàn thành khóa học
            </p>
          </header>

          {/* 인쇄할 때도 남도록 배경색이 아닌 선(border)으로 긋는다 */}
          <div className="mx-auto w-24 border-t border-space-500" />

          {/* 이름 */}
          <div className="space-y-1 text-center">
            <p className="text-sm text-gray-400">성명 / Họ tên</p>
            <p className="text-3xl font-bold text-white">{worker.name}</p>
            <p className="text-gray-300">{worker.nameLocal}</p>
            <p className="text-sm text-gray-400">
              {COUNTRY[worker.country].flag} {COUNTRY[worker.country].ko}
            </p>
          </div>

          <p className="text-center text-gray-200">
            위 사람은 아래 교육과정을 이수하였기에 이 증서를 수여합니다.
          </p>

          {/* 상세 */}
          <dl className="mx-auto grid max-w-xl gap-x-6 gap-y-4 text-sm sm:grid-cols-2">
            <Row label="교육과정" value={course.title} />
            <Row label="이수시간" value={`${course.hours}시간`} />
            <Row label="소속" value={COMPANY.name} />
            <Row label="부서" value={worker.department} />
            <Row label="수료일" value={cert.issuedOn} />
            <Row label="발급번호" value={cert.number} />
            <Row label="법적 근거" value={course.legalBasis} full />
          </dl>

          <div className="space-y-2 pt-4 text-center">
            <p className="text-lg font-bold text-white">Vibe 산업안전교육</p>
            <p className="text-sm text-gray-400">발급일 {cert.issuedOn}</p>
          </div>

          <p className="border-t border-space-800 pt-5 text-center text-xs leading-relaxed text-gray-500">
            ※ 본 증서는 교육 이수 사실을 회사가 확인·보관하기 위한 기록입니다.
            <br />
            법정 지정 교육기관의 수료증과는 별개이며, 발급번호로 이수 내역을
            조회할 수 있습니다.
          </p>
        </article>

        <p className="no-print text-center text-sm text-gray-400">
          인쇄 미리보기에서 배경이 흰색으로 바뀌는지 확인해 보세요.
        </p>
      </div>
    </main>
  )
}

function Row({
  label,
  value,
  full = false,
}: {
  label: string
  value: string
  full?: boolean
}) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <dt className="text-gray-400">{label}</dt>
      <dd className="mt-0.5 font-semibold text-white">{value}</dd>
    </div>
  )
}
