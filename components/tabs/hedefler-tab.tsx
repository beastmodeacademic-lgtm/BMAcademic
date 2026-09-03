'use client'

import { useState } from 'react'
import { Coins, Flame, ChevronRight } from 'lucide-react'
import { useStore } from '@/lib/store'
import { DIFFICULTIES, type Assignment, type Difficulty } from '@/lib/data'
import { StudyRoom } from '@/components/study-room'
import { cn } from '@/lib/utils'

const DIFF_STYLES: Record<Difficulty, string> = {
  Kolay: 'border-accent/40 text-accent hover:bg-accent/10',
  Orta: 'border-gold/40 text-gold hover:bg-gold/10',
  Zor: 'border-destructive/40 text-destructive hover:bg-destructive/10',
}

export function HedeflerTab() {
  const { gold, streak, grade, assignments } = useStore()
  const [room, setRoom] = useState<{ a: Assignment; d: Difficulty } | null>(null)

  return (
    <div className="space-y-5 px-5 py-5">
      {/* stat cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/15 to-transparent p-4">
          <div className="flex items-center gap-2 text-gold">
            <Coins className="h-5 w-5" />
            <span className="text-[11px] font-bold uppercase tracking-wide">Altın</span>
          </div>
          <p className="mt-2 text-2xl font-bold">🪙 {gold.toLocaleString('tr-TR')} ALTIN</p>
        </div>
        <div className="rounded-2xl border border-destructive/25 bg-gradient-to-br from-destructive/15 to-transparent p-4">
          <div className="flex items-center gap-2 text-destructive">
            <Flame className="h-5 w-5" />
            <span className="text-[11px] font-bold uppercase tracking-wide">Seri</span>
          </div>
          <p className="mt-2 text-2xl font-bold">🔥 {streak} Günlük Çizgi</p>
        </div>
      </div>

      {/* welcome */}
      <div>
        <h2 className="text-xl font-bold text-balance">Bugünün hedefleri seni bekliyor</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {grade}. sınıf için özel hazırlanmış görevlerin hazır.
        </p>
      </div>

      {/* assignments */}
      <div className="space-y-3">
        {assignments.map((a) => (
          <div
            key={a.id}
            className="rounded-2xl border border-border bg-card p-4 animate-fade-up"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-elevated text-xl">
                {a.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                  {a.subject}
                </p>
                <p className="truncate text-sm font-bold">{a.title}</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  onClick={() => setRoom({ a, d })}
                  className={cn(
                    'flex items-center justify-center gap-1 rounded-xl border bg-transparent py-2 text-xs font-bold transition active:scale-95',
                    DIFF_STYLES[d],
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* free study room shortcut */}
      <button
        onClick={() =>
          setRoom({
            a: { id: 'free', subject: 'Serbest Çalışma', title: 'İstediğin soruyu tara', emoji: '📷', grade: 'all' },
            d: 'Orta',
          })
        }
        className="flex w-full items-center justify-between rounded-2xl border border-primary/40 bg-primary/10 p-4 text-left transition active:scale-[0.98]"
      >
        <div>
          <p className="text-sm font-bold text-primary">Serbest Çalışma Odası</p>
          <p className="text-xs text-muted-foreground">Sorunun fotoğrafını çek, AI seni yönlendirsin</p>
        </div>
        <ChevronRight className="h-5 w-5 text-primary" />
      </button>

      {room && (
        <StudyRoom assignment={room.a} difficulty={room.d} onClose={() => setRoom(null)} />
      )}
    </div>
  )
}
