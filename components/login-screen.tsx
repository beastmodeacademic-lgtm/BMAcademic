'use client'

import { GraduationCap, ChevronRight } from 'lucide-react'
import { useStore } from '@/lib/store'
import { BrandLogo } from '@/components/brand-logo'

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.7-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z" />
      <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.5 1.2-4 1.2-3 0-5.6-2-6.6-4.8H1.4v3C3.4 21.4 7.4 24 12 24z" />
      <path fill="#FBBC05" d="M5.4 14.5c-.2-.7-.4-1.5-.4-2.5s.1-1.7.4-2.5v-3H1.4C.5 8.3 0 10.1 0 12s.5 3.7 1.4 5.5l4-3z" />
      <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.6 1.4 6.5l4 3C6.4 6.7 9 4.8 12 4.8z" />
    </svg>
  )
}

export function LoginScreen() {
  const { setScreen } = useStore()

  return (
    <div className="relative flex h-full flex-col overflow-hidden px-6 pb-10 pt-16">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -left-16 -top-10 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-40 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative flex flex-1 flex-col items-center justify-center gap-8">
        <div className="animate-pop-in">
          <BrandLogo size="lg" />
        </div>

        <div className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground animate-fade-up">
          <span className="h-2 w-2 rounded-full bg-accent" />
          Yapay zeka destekli akıllı öğrenme
        </div>
      </div>

      <div className="relative flex flex-col gap-4">
        {/* Single Google button — KVKK safe */}
        <button
          onClick={() => setScreen('gradeSelect')}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-foreground px-5 py-4 text-base font-bold text-background transition active:scale-[0.98]"
        >
          <GoogleGlyph />
          Google ile Devam Et
        </button>

        <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
          Devam ederek KVKK ve Gizlilik Politikası&apos;nı kabul etmiş olursun.
        </p>

        <div className="my-1 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            veya rolünü seç
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <button
          onClick={() => setScreen('teacher')}
          className="group flex w-full items-center justify-between rounded-2xl border border-primary/50 bg-primary/10 px-5 py-4 text-left transition active:scale-[0.98]"
        >
          <span className="flex items-center gap-3">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold text-foreground">ÖĞRETMEN GİRİŞİ (İŞLEVLİ)</span>
          </span>
          <ChevronRight className="h-5 w-5 text-primary transition group-active:translate-x-0.5" />
        </button>

        <button
          onClick={() => setScreen('gradeSelect')}
          className="group flex w-full items-center justify-between rounded-2xl border border-accent/50 bg-accent/10 px-5 py-4 text-left transition active:scale-[0.98]"
        >
          <span className="flex items-center gap-3">
            <span className="grid h-5 w-5 place-items-center text-base">🚀</span>
            <span className="text-sm font-bold text-foreground">ÖĞRENCİ OLARAK BAŞLA</span>
          </span>
          <ChevronRight className="h-5 w-5 text-accent transition group-active:translate-x-0.5" />
        </button>
      </div>
    </div>
  )
}
