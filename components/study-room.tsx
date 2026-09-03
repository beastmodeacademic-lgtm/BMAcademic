'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Camera, ScanLine, Send, Lightbulb, CircleCheckBig, Sparkles } from 'lucide-react'
import { useStore } from '@/lib/store'
import { SAMPLE_QUESTION, type Assignment, type Difficulty } from '@/lib/data'
import { cn } from '@/lib/utils'

type Phase = 'scan' | 'scanning' | 'chat'
type Msg = { from: 'ai' | 'user'; text: string; kind?: 'clue' | 'solution' | 'praise' }

export function StudyRoom({
  assignment,
  difficulty,
  onClose,
}: {
  assignment: Assignment
  difficulty: Difficulty
  onClose: () => void
}) {
  const { useQuestion, freeQuestions, adsWatched, watchAd, raiseAlert, addXp, addGold, showToast } =
    useStore()
  const [phase, setPhase] = useState<Phase>('scan')
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [wrongCount, setWrongCount] = useState(0)
  const [solved, setSolved] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const stuckTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, phase])

  // 5-minute "stuck" watchdog -> notify teacher dashboard
  useEffect(() => {
    if (phase !== 'chat' || solved) return
    stuckTimer.current = setTimeout(() => {
      fireStuckAlert()
    }, 5 * 60 * 1000)
    return () => {
      if (stuckTimer.current) clearTimeout(stuckTimer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, solved])

  const fireStuckAlert = () => {
    const payload = { alert: true, student: 'BeratTunahan', status: 'Zorlanıyor' }
    // eslint-disable-next-line no-console
    console.log('[v0] Stuck alert payload ->', JSON.stringify(payload))
    raiseAlert('BeratTunahan', assignment.subject)
    showToast('Öğretmenine haber verildi 💜')
  }

  const startScan = () => {
    setPhase('scanning')
    setTimeout(() => {
      setPhase('chat')
      setMessages([
        {
          from: 'ai',
          text: `Merhaba kanka! 👋 ${assignment.subject} sorunu inceledim. Hadi birlikte çözelim, sana yol göstereceğim! 💪\n\nSoru: ${SAMPLE_QUESTION.prompt}`,
        },
      ])
    }, 2200)
  }

  const send = () => {
    const val = input.trim()
    if (!val || solved) return

    if (!useQuestion()) {
      showToast('Günlük soru hakkın bitti 😔')
      return
    }

    const userMsg: Msg = { from: 'user', text: val }
    setInput('')

    const isCorrect = val.replace(/\s/g, '') === SAMPLE_QUESTION.answer

    if (isCorrect) {
      setSolved(true)
      if (stuckTimer.current) clearTimeout(stuckTimer.current)
      addXp(20)
      addGold(15)
      setMessages((m) => [
        ...m,
        userMsg,
        {
          from: 'ai',
          kind: 'praise',
          text: 'Tam isabet! 🎯 Sonuç doğru, harika bir iş çıkardın! +20 XP ve +15 🪙 kazandın. Böyle devam! 🚀',
        },
      ])
      showToast('Aferin! 🎉')
      return
    }

    const nextWrong = wrongCount + 1
    setWrongCount(nextWrong)

    if (nextWrong === 1) {
      setMessages((m) => [
        ...m,
        userMsg,
        {
          from: 'ai',
          kind: 'clue',
          text: `Çok yaklaştın, üzülme! 😊 Küçük bir ipucu vereyim:\n${SAMPLE_QUESTION.clue}\nBir daha dene, sana güveniyorum! 💜`,
        },
      ])
    } else {
      // 2nd consecutive wrong -> reveal full solution + alert teacher
      setSolved(true)
      if (stuckTimer.current) clearTimeout(stuckTimer.current)
      fireStuckAlert()
      setMessages((m) => [
        ...m,
        userMsg,
        {
          from: 'ai',
          kind: 'solution',
          text: 'Hiç sorun değil, bazen takılmak öğrenmenin parçasıdır! 🌟 Şimdi adım adım birlikte çözelim:',
        },
      ])
    }
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background">
      {/* header */}
      <div className="flex items-center justify-between border-b border-border px-5 pb-3 pt-5">
        <div className="flex items-center gap-2">
          <span className="text-xl">{assignment.emoji}</span>
          <div>
            <p className="text-sm font-bold leading-tight">{assignment.subject}</p>
            <p className="text-[11px] text-muted-foreground">
              {assignment.title} · <span className="text-primary">{difficulty}</span>
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Çalışma odasını kapat"
          className="rounded-full p-1.5 text-muted-foreground transition hover:bg-elevated hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* SCAN phase */}
      {phase !== 'chat' ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
          <div
            className={cn(
              'relative grid aspect-[3/4] w-56 place-items-center overflow-hidden rounded-3xl border-2 border-dashed',
              phase === 'scanning' ? 'border-accent' : 'border-primary/50',
            )}
          >
            <div className="absolute inset-0 bg-elevated/60" />
            {phase === 'scanning' && (
              <div className="absolute inset-x-0 top-0 h-1 animate-[float-up_1.6s_linear_infinite] bg-accent shadow-[0_0_16px_2px_oklch(0.74_0.16_162)]" />
            )}
            <div className="relative flex flex-col items-center gap-3 text-center">
              {phase === 'scanning' ? (
                <>
                  <ScanLine className="h-12 w-12 animate-pulse text-accent" />
                  <p className="px-4 text-sm font-bold text-accent">📷 Soru Tarandı! AI İnceliyor...</p>
                </>
              ) : (
                <>
                  <Camera className="h-12 w-12 text-primary" />
                  <p className="px-6 text-sm font-medium text-muted-foreground">
                    Sorunun fotoğrafını çerçeveye hizala
                  </p>
                </>
              )}
            </div>
          </div>

          {phase === 'scan' && (
            <button
              onClick={startScan}
              className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-bold text-primary-foreground transition active:scale-95"
            >
              <Camera className="h-5 w-5" />
              Sorunun Fotoğrafını Çek / Yükle
            </button>
          )}
        </div>
      ) : (
        <>
          {/* CHAT phase */}
          <div ref={scrollRef} className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full bg-elevated px-3 py-1 text-[11px] font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" /> Sokratik AI Öğretmen
            </div>

            {messages.map((m, i) => (
              <div
                key={i}
                className={cn('flex', m.from === 'user' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                    m.from === 'user'
                      ? 'rounded-br-md bg-primary text-primary-foreground'
                      : m.kind === 'clue'
                        ? 'rounded-bl-md border border-gold/30 bg-gold/10 text-foreground'
                        : m.kind === 'solution'
                          ? 'rounded-bl-md border border-accent/30 bg-accent/10 text-foreground'
                          : m.kind === 'praise'
                            ? 'rounded-bl-md border border-accent/40 bg-accent/15 text-foreground'
                            : 'rounded-bl-md bg-elevated text-foreground',
                  )}
                >
                  {m.kind === 'clue' && <Lightbulb className="mb-1 h-4 w-4 text-gold" />}
                  {m.text}
                </div>
              </div>
            ))}

            {/* full solution steps */}
            {wrongCount >= 2 && (
              <div className="animate-fade-up space-y-2 rounded-2xl border border-accent/30 bg-accent/5 p-4">
                {SAMPLE_QUESTION.steps.map((step, i) => (
                  <div key={i} className="flex gap-2.5 text-sm">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/20 text-[11px] font-bold text-accent">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            )}

            {solved && (
              <div className="flex items-center justify-center gap-2 pt-2 text-sm font-bold text-accent">
                <CircleCheckBig className="h-4 w-4" /> Soru tamamlandı
              </div>
            )}
          </div>

          {/* free question + ad card */}
          <div className="border-t border-border px-4 py-2.5">
            <div className="flex items-center justify-between gap-2 rounded-xl bg-elevated px-3 py-2">
              <span className="text-xs font-semibold">
                Günlük Ücretsiz Soru Hakkı:{' '}
                <span className={freeQuestions > 0 ? 'text-accent' : 'text-destructive'}>
                  {freeQuestions}
                </span>
                /5
              </span>
              <button
                onClick={() => {
                  if (watchAd()) showToast('+1 Soru hakkı kazandın! 🎬')
                  else showToast('Günlük reklam limitine ulaştın')
                }}
                className="rounded-lg bg-primary/15 px-2.5 py-1 text-[11px] font-bold text-primary transition active:scale-95"
              >
                🎬 Reklam İzle +1 ({adsWatched}/10)
              </button>
            </div>
          </div>

          {/* input */}
          <div className="flex items-center gap-2 border-t border-border px-4 pb-6 pt-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) send()
              }}
              disabled={solved}
              placeholder={solved ? 'Soru tamamlandı 🎉' : 'Cevabını veya sorunu yaz...'}
              className="flex-1 rounded-full border border-input bg-elevated px-4 py-3 text-sm outline-none transition focus:border-primary disabled:opacity-60"
            />
            <button
              onClick={send}
              disabled={solved || !input.trim()}
              aria-label="Gönder"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition active:scale-95 disabled:opacity-40"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
