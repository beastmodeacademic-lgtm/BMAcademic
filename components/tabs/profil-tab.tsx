'use client'

import { useState } from 'react'
import { Crown, Globe, Moon, Sun, Copy, Award, Pin, LogOut } from 'lucide-react'
import { useStore } from '@/lib/store'
import { BADGES } from '@/lib/data'
import { PremiumModal } from '@/components/premium-modal'
import { cn } from '@/lib/utils'

export function ProfilTab() {
  const {
    grade,
    xp,
    gold,
    isPremium,
    theme,
    toggleTheme,
    lang,
    setLang,
    pinnedBadges,
    togglePin,
    showToast,
    setScreen,
  } = useStore()
  const [showPremium, setShowPremium] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const pinned = BADGES.filter((b) => pinnedBadges.includes(b.id))
  const earned = BADGES.filter((b) => b.earned)

  const copyRef = () => {
    navigator.clipboard?.writeText('BM-TUNAHAN10').catch(() => {})
    showToast('Referans kodu kopyalandı! 📋')
  }

  return (
    <div className="space-y-5 px-5 py-5">
      {/* user card */}
      <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/15 to-accent/5 p-5">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-2xl font-bold text-primary-foreground">
            BT
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">BeratTunahan</h2>
              {isPremium && (
                <span className="flex items-center gap-1 rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold text-gold">
                  <Crown className="h-3 w-3" /> Premium
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{grade}. Sınıf Öğrencisi</p>
            <div className="mt-2 flex gap-3 text-xs font-bold">
              <span className="text-accent">{xp.toLocaleString('tr-TR')} XP</span>
              <span className="text-gold">🪙 {gold.toLocaleString('tr-TR')}</span>
            </div>
          </div>
        </div>

        {/* pinned badges */}
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Sabitlenen Rozetler
            </p>
            <button
              onClick={() => setDrawerOpen((v) => !v)}
              className="text-xs font-bold text-primary"
            >
              {drawerOpen ? 'Kapat' : 'Düzenle'}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => {
              const b = pinned[i]
              return (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-elevated/60 py-3"
                >
                  <span className="text-2xl">{b ? b.emoji : '➕'}</span>
                  <span className="px-1 text-center text-[9px] font-semibold leading-tight text-muted-foreground">
                    {b ? b.name : 'Boş'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* badges drawer */}
      {drawerOpen && (
        <div className="animate-fade-up rounded-2xl border border-border bg-card p-4">
          <p className="mb-1 flex items-center gap-2 text-sm font-bold">
            <Award className="h-4 w-4 text-primary" /> Başarımlar
          </p>
          <p className="mb-3 text-xs text-muted-foreground">
            Profilinde göstermek için en fazla 3 rozet sabitle ({pinnedBadges.length}/3)
          </p>
          <div className="grid grid-cols-4 gap-2">
            {earned.map((b) => {
              const isPinned = pinnedBadges.includes(b.id)
              return (
                <button
                  key={b.id}
                  onClick={() => {
                    if (!isPinned && pinnedBadges.length >= 3) {
                      showToast('En fazla 3 rozet sabitleyebilirsin')
                      return
                    }
                    togglePin(b.id)
                  }}
                  className={cn(
                    'relative flex flex-col items-center gap-1 rounded-xl border py-2.5 transition active:scale-95',
                    isPinned ? 'border-primary bg-primary/15' : 'border-border bg-elevated',
                  )}
                >
                  {isPinned && (
                    <Pin className="absolute right-1 top-1 h-3 w-3 fill-primary text-primary" />
                  )}
                  <span className="text-xl">{b.emoji}</span>
                  <span className="px-0.5 text-center text-[8px] font-semibold leading-tight text-muted-foreground">
                    {b.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* premium upsell */}
      {!isPremium && (
        <button
          onClick={() => setShowPremium(true)}
          className="flex w-full items-center gap-3 rounded-2xl border border-primary/40 bg-gradient-to-r from-primary/15 to-accent/10 p-4 text-left transition active:scale-[0.98]"
        >
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Crown className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-bold">Premium&apos;a Yükselt</p>
            <p className="text-xs text-muted-foreground">HBT, canlı öğretmen ve elit sorular</p>
          </div>
        </button>
      )}

      {/* referral */}
      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4">
        <p className="text-sm font-bold">%10 indirim Referans Kodu</p>
        <p className="mb-3 text-xs text-muted-foreground">
          Arkadaşını davet et, ikiniz de kazanın
        </p>
        <div className="flex items-center gap-2">
          <code className="flex-1 rounded-xl border border-dashed border-accent/40 bg-elevated px-4 py-2.5 text-center font-mono text-sm font-bold tracking-wider text-accent">
            BM-TUNAHAN10
          </code>
          <button
            onClick={copyRef}
            aria-label="Kodu kopyala"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground transition active:scale-95"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* settings */}
      <div className="space-y-2 rounded-2xl border border-border bg-card p-2">
        <div className="flex items-center justify-between px-3 py-2.5">
          <span className="flex items-center gap-3 text-sm font-semibold">
            <Globe className="h-5 w-5 text-muted-foreground" /> Dil
          </span>
          <div className="flex rounded-lg bg-elevated p-0.5">
            {(['TR', 'EN'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  'rounded-md px-3 py-1 text-xs font-bold transition',
                  lang === l ? 'bg-primary text-primary-foreground' : 'text-muted-foreground',
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="h-px bg-border" />
        <div className="flex items-center justify-between px-3 py-2.5">
          <span className="flex items-center gap-3 text-sm font-semibold">
            {theme === 'dark' ? (
              <Moon className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Sun className="h-5 w-5 text-muted-foreground" />
            )}
            {theme === 'dark' ? 'Koyu Tema' : 'Açık Tema'}
          </span>
          <button
            onClick={toggleTheme}
            role="switch"
            aria-checked={theme === 'dark'}
            aria-label="Tema değiştir"
            className={cn(
              'relative h-6 w-11 rounded-full transition',
              theme === 'dark' ? 'bg-primary' : 'bg-elevated',
            )}
          >
            <span
              className={cn(
                'absolute top-0.5 h-5 w-5 rounded-full bg-background transition-all',
                theme === 'dark' ? 'left-[22px]' : 'left-0.5',
              )}
            />
          </button>
        </div>
      </div>

      <button
        onClick={() => setScreen('login')}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card py-3.5 text-sm font-bold text-muted-foreground transition active:scale-[0.98]"
      >
        <LogOut className="h-4 w-4" /> Çıkış Yap
      </button>

      {showPremium && <PremiumModal onClose={() => setShowPremium(false)} />}
    </div>
  )
}
