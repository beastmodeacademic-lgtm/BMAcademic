'use client'

import { useMemo, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { useStore } from '@/lib/store'
import { WORD_PAIRS } from '@/lib/data'
import { cn } from '@/lib/utils'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export function WordMatchGame() {
  const { addXp, showToast } = useStore()
  const [round, setRound] = useState(0)
  const en = useMemo(() => WORD_PAIRS.map((p) => p.en), [])
  const tr = useMemo(() => shuffle(WORD_PAIRS.map((p) => p.tr)), [round])

  const [pickedEn, setPickedEn] = useState<string | null>(null)
  const [matched, setMatched] = useState<string[]>([])
  const [wrong, setWrong] = useState<string | null>(null)

  const trFor = (enWord: string) => WORD_PAIRS.find((p) => p.en === enWord)?.tr

  const tapTr = (trWord: string) => {
    if (!pickedEn || matched.includes(pickedEn)) return
    if (trFor(pickedEn) === trWord) {
      const nextMatched = [...matched, pickedEn]
      setMatched(nextMatched)
      setPickedEn(null)
      addXp(5)
      if (nextMatched.length === WORD_PAIRS.length) {
        showToast('Süper! Tümünü eşleştirdin! ⭐')
      }
    } else {
      setWrong(trWord)
      setTimeout(() => setWrong(null), 450)
    }
  }

  const reset = () => {
    setMatched([])
    setPickedEn(null)
    setWrong(null)
    setRound((r) => r + 1)
  }

  const done = matched.length === WORD_PAIRS.length

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold">🔤 Kelime Eşleştirme Oyunu</p>
          <p className="text-xs text-muted-foreground">
            İngilizce kelimeyi Türkçe karşılığıyla eşleştir
          </p>
        </div>
        <button
          onClick={reset}
          aria-label="Yeniden başlat"
          className="grid h-9 w-9 place-items-center rounded-xl bg-elevated text-muted-foreground transition active:scale-90"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {en.map((word) => {
            const isMatched = matched.includes(word)
            const isPicked = pickedEn === word
            return (
              <button
                key={word}
                onClick={() => !isMatched && setPickedEn(word)}
                disabled={isMatched}
                className={cn(
                  'w-full rounded-xl border px-3 py-3 text-sm font-semibold transition',
                  isMatched
                    ? 'border-accent/50 bg-accent/15 text-accent opacity-70'
                    : isPicked
                      ? 'border-primary bg-primary/20 text-foreground'
                      : 'border-border bg-elevated text-foreground active:scale-95',
                )}
              >
                {word}
              </button>
            )
          })}
        </div>
        <div className="space-y-2">
          {tr.map((word) => {
            const isMatched = matched.some((m) => trFor(m) === word)
            const isWrong = wrong === word
            return (
              <button
                key={word}
                onClick={() => tapTr(word)}
                disabled={isMatched}
                className={cn(
                  'w-full rounded-xl border px-3 py-3 text-sm font-semibold transition',
                  isMatched
                    ? 'border-accent/50 bg-accent/15 text-accent opacity-70'
                    : isWrong
                      ? 'border-destructive bg-destructive/20 text-destructive'
                      : 'border-border bg-elevated text-foreground active:scale-95',
                )}
              >
                {word}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          Eşleşen: {matched.length}/{WORD_PAIRS.length}
        </span>
        {done && <span className="font-bold text-accent">Tebrikler! 🎉 +25 XP</span>}
      </div>
    </div>
  )
}
