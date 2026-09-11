import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vibe — 외국인 근로자 산업안전교육',
  description:
    '외국인 근로자를 위한 다국어 산업안전교육 플랫폼. 모국어로 배우고 수료증을 받으세요.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      {/* relative z-10: 배경의 별(body::before/after) 위로 내용이 오게 한다 */}
      <body>
        <div className="relative z-10 min-h-screen w-full">{children}</div>
      </body>
    </html>
  )
}
