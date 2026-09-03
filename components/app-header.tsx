'use client'

import { useStore } from '@/lib/store'
import { TechStar } from '@/components/brand-logo'

export function AppHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const { gold, streak } = useStore()
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-background/85 px-5 pb-3 pt-5 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-elevated p-1.5 ring-1 ring-primary/40">
          <TechStar />
        </div>
        <div>
          <h1 className="text-lg font-bold leading-tight">{title}</h1>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-xs font-bold text-gold">
          🪙 {gold.toLocaleString('tr-TR')}
        </span>
        <span className="flex items-center gap-1 rounded-full border border-destructive/30 bg-destructive/10 px-2.5 py-1 text-xs font-bold text-destructive">
          🔥 {streak}
        </span>
      </div>
    </header>
  )
}
