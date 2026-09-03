'use client'

import { useState } from 'react'
import { X, Check, Crown } from 'lucide-react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const PERKS = [
  'Başlangıç bonusu Altın hediyesi',
  'HBT – Hata Belirleme Testi (yanlışlarına benzer soru üretimi)',
  'Birebir canlı öğretmen görüşmesi',
  'Elit sorular ve seçme içerikler',
  'El yazısı öğretmen ders notları',
]

const PLANS = [
  { id: 'monthly', label: 'Aylık Paket', price: '99.90 TL', note: 'Başlangıç Altın hediyesi', highlight: false },
  { id: 'yearly', label: 'Yıllık Paket', price: '800 TL', note: 'Dev Altın hediyesi · En avantajlı', highlight: true },
]

export function PremiumModal({ onClose }: { onClose: () => void }) {
  const { setPremium, addGold, showToast } = useStore()
  const [selected, setSelected] = useState('yearly')

  const subscribe = () => {
    setPremium(true)
    addGold(selected === 'yearly' ? 2000 : 500)
    showToast('Premium aktif! Hoş geldin 👑')
    onClose()
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-[oklch(0.08_0.03_264/0.72)] p-4 backdrop-blur-sm sm:items-center">
      <div className="max-h-full w-full animate-pop-in overflow-y-auto no-scrollbar rounded-3xl border border-primary/40 bg-card p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
              <Crown className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-xl font-bold">BM Premium</h2>
              <p className="text-xs text-muted-foreground">İsteğe bağlı, dilediğinde iptal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Kapat"
            className="rounded-full p-1 text-muted-foreground transition hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-5 space-y-2">
          {PERKS.map((p) => (
            <div key={p} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent/20 text-accent">
                <Check className="h-3 w-3" />
              </span>
              <span className="leading-snug">{p}</span>
            </div>
          ))}
        </div>

        <div className="mb-5 grid grid-cols-2 gap-3">
          {PLANS.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              className={cn(
                'relative rounded-2xl border p-4 text-left transition',
                selected === plan.id
                  ? 'border-primary bg-primary/15'
                  : 'border-border bg-elevated',
              )}
            >
              {plan.highlight && (
                <span className="absolute -top-2 right-3 rounded-full bg-accent px-2 py-0.5 text-[9px] font-bold uppercase text-accent-foreground">
                  Avantajlı
                </span>
              )}
              <p className="text-xs font-semibold text-muted-foreground">{plan.label}</p>
              <p className="mt-1 text-lg font-bold">{plan.price}</p>
              <p className="mt-1 text-[10px] leading-tight text-muted-foreground">{plan.note}</p>
            </button>
          ))}
        </div>

        <button
          onClick={subscribe}
          className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent px-5 py-4 text-base font-bold text-primary-foreground transition active:scale-[0.98]"
        >
          Premium&apos;a Yükselt
        </button>
      </div>
    </div>
  )
}
