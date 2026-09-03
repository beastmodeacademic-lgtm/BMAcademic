'use client'

import type { ReactNode } from 'react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export function PhoneFrame({ children }: { children: ReactNode }) {
  const { theme } = useStore()
  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-[oklch(0.11_0.03_264)] p-0 sm:p-6">
      <div
        className={cn(
          theme === 'light' ? 'light' : '',
          'relative flex h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-background text-foreground sm:h-[900px] sm:max-h-[92dvh] sm:rounded-[2.75rem] sm:border-8 sm:border-[oklch(0.24_0.03_264)] sm:shadow-[0_30px_80px_-20px_oklch(0_0_0/0.7)]',
        )}
      >
        {/* status bar notch (desktop framing only) */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-40 hidden h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-[oklch(0.24_0.03_264)] sm:block" />
        {children}
      </div>
    </div>
  )
}
