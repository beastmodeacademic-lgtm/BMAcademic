'use client'

import { Play } from 'lucide-react'
import { useStore } from '@/lib/store'
import { SUBJECTS, BRANCH_EXAMS } from '@/lib/data'
import { WordMatchGame } from '@/components/word-match-game'

export function DerslerTab() {
  const { showToast } = useStore()

  return (
    <div className="space-y-6 px-5 py-5">
      <section>
        <h2 className="mb-3 text-lg font-bold">Ders İlerlemen</h2>
        <div className="space-y-3">
          {SUBJECTS.map((s) => (
            <div key={s.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-bold">
                  <span className="text-lg">{s.emoji}</span>
                  {s.name}
                </span>
                <span className="text-sm font-bold text-primary">%{s.progress}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-elevated">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
                  style={{ width: `${s.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">Branş Denemeleri</h2>
        <div className="space-y-3">
          {BRANCH_EXAMS.map((e) => (
            <div
              key={e.id}
              className="flex items-center justify-between rounded-2xl border border-border bg-card p-4"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-elevated text-lg">
                  {e.emoji}
                </span>
                <div>
                  <p className="text-sm font-bold">{e.name}</p>
                  <p className="text-xs text-muted-foreground">{e.questions} soru</p>
                </div>
              </div>
              <button
                onClick={() => showToast('Deneme başlatıldı! Başarılar 💪')}
                className="flex items-center gap-1.5 rounded-xl bg-primary/15 px-3 py-2 text-xs font-bold text-primary transition active:scale-95"
              >
                <Play className="h-3.5 w-3.5" />
                Başlat
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">İngilizce Oyunu</h2>
        <WordMatchGame />
      </section>
    </div>
  )
}
