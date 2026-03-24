'use client'

import { APP_VERSION } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="py-4 text-center text-xs text-[#a3a3a3] border-t border-[#f5f5f5]">
      <span>{APP_VERSION}</span>
      <span className="mx-2">·</span>
      <span>공정무역 탐구 여행</span>
    </footer>
  )
}
