'use client'

import { useState } from 'react'
import { X, Sparkles, Target, Clock } from 'lucide-react'
import { useStore } from '@/lib/store'
import { type Grade } from '@/lib/data'
import { BrandLogo } from '@/components/brand-logo'

const GRADES: { g: Grade; label: string }[] = [
  { g: '5', label: '5. Sınıf' },
  { g: '6', label: '6. Sınıf' },
  { g: '7', label: '7. Sınıf' },
  { g: '8', label: '8. Sınıf' },
]

function Backdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-[oklch(0.08_0.03_264/0.72)] p-4 backdrop-blur-sm sm:items-center">
      <div className="w-full animate-pop-in rounded-3xl border border-border bg-card p-6 shadow-2xl">
        {children}
      </div>
    </div>
  )
}

export function GradeSelectDialog() {
  const { setGrade, setScreen } = useStore()
  const [selected, setSelected] = useState<Grade | null>(null)

  const confirm = (g: Grade) => {
    setSelected(g)
    setGrade(g)
    // instantly move to the level-determination screen
    setTimeout(() => setScreen('levelTest'), 260)
  }

  return (
    <Backdrop>
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Hoş geldin</p>
          <h2 className="mt-1 text-2xl font-bold text-balance">Kaçıncı sınıfsın?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Hedeflerini ve dersleri sana göre ayarlayalım.
          </p>
        </div>
        <button
          onClick={() => setScreen('login')}
          aria-label="Kapat"
          className="rounded-full p-1 text-muted-foreground transition hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {GRADES.map(({ g, label }) => (
          <button
            key={g}
            onClick={() => confirm(g)}
            className={`flex flex-col items-center gap-1 rounded-2xl border px-4 py-6 text-center transition active:scale-95 ${
              selected === g
                ? 'border-primary bg-primary/15'
                : 'border-border bg-elevated hover:border-primary/50'
            }`}
          >
            <span className="text-3xl font-bold text-primary">{g}</span>
            <span className="text-sm font-semibold">{label}</span>
          </button>
        ))}
      </div>
    </Backdrop>
  )
}

export function LevelTestScreen() {
  const { grade, setScreen, setTab, showToast } = useStore()

  const start = () => {
    setTab('hedefler')
    setScreen('app')
    setTimeout(() => showToast('Harika gidiyorsun! 🚀'), 400)
  }

  const skip = () => {
    setTab('hedefler')
    setScreen('app')
  }

  return (
    <Backdrop>
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 h-14 w-14">
          <BrandLogo size="sm" showText={false} />
        </div>
        <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
          {grade}. Sınıf
        </span>
        <h2 className="mt-4 text-2xl font-bold text-balance">Seviye Belirleme Testi</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
          Sana en uygun hedefleri hazırlamak için kısa bir başlangıç testiyle seni tanıyalım. Hazır
          olduğunda başlayabilirsin!
        </p>

        <div className="mt-6 w-full space-y-3">
          {[
            { icon: Target, title: '15 Soru', desc: 'Tüm ana derslerden karışık' },
            { icon: Clock, title: 'Yaklaşık 10 dakika', desc: 'İstediğin zaman durdurabilirsin' },
            { icon: Sparkles, title: 'Kişisel Yol Haritası', desc: 'Sonuca göre hedefler oluşturulur' },
          ].map((row) => (
            <div
              key={row.title}
              className="flex items-center gap-3 rounded-2xl border border-border bg-elevated px-4 py-3 text-left"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                <row.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold">{row.title}</p>
                <p className="text-xs text-muted-foreground">{row.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={start}
          className="mt-6 w-full rounded-2xl bg-primary px-5 py-4 text-base font-bold text-primary-foreground transition active:scale-[0.98]"
        >
          Teste Başla
        </button>
        <button
          onClick={skip}
          className="mt-2 w-full py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          Şimdilik atla, direkt başla
        </button>
      </div>
    </Backdrop>
  )
}
