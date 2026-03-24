import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '공정무역 탐구 여행',
  description: '이상형 월드컵으로 관심 분야를 선택하고, AI와 함께 착취 문제와 공정무역 해결책을 탐구해보세요.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
