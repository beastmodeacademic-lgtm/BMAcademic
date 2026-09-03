'use client'

import { useStore } from '@/lib/store'

export function ToastOverlay() {
  const { toast } = useStore()
  if (!toast) return null
  return (
    <div
      key={toast.id}
      className="pointer-events-none absolute left-1/2 top-24 z-50 animate-float-up"
      role="status"
      aria-live="polite"
    >
      <div className="rounded-full border border-accent/40 bg-elevated/95 px-6 py-3 text-lg font-bold text-accent shadow-[0_8px_30px_-4px_oklch(0.16_0.045_264/0.8)] backdrop-blur">
        {toast.text}
      </div>
    </div>
  )
}
