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
  const [solved, setSolved] = useState(false)
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const stuckTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Senin az önce Google AI Studio'dan aldığın o gizli anahtarı buraya gömüyoruz
  const GEMINI_API_KEY = "AIzaSyBqHgSoxWbnzbD0NGoTawpgn4poX-JquUg"

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, phase])

  useEffect(() => {
    if (phase !== 'chat' || solved) return
    stuckTimer.current = setTimeout(() => {
      fireStuckAlert()
    }, 5 * 60 * 1000)
    return () => {
      if (stuckTimer.current) clearTimeout(stuckTimer.current)
    }
  }, [phase, solved])

  const fireStuckAlert = () => {
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
          text: `Merhaba kanka! 👋 ${assignment.subject} odasına hoş geldin. Ben senin yapay zeka öğretmeninim. Bana bu konuyla ilgili çözemediğin herhangi bir soruyu yazabilirsin, adım adım birlikte çözeceğiz! 💪`,
        },
      ])
    }, 2200)
  }

  // Doğrudan Google Gemini Sunucularına Bağlanan Canavar Fonksiyon
  const askGemini = async (chatHistory: Msg[], currentInput: string) => {
    try {
      const formattedHistory = chatHistory.map(m => ({
        role: m.from === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const response = await fetch(`https://googleapis.com{GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            ...formattedHistory,
            { role: 'user', parts: [{ text: `Sen arkadaş canlısı, samimi bir lise/ortaokul öğretmenisin. Öğrenciye direkt cevabı söyleme, sokratik yöntemle ipuçları vererek çözdür. Türkçe konuş. Öğrencinin sorusu: ${currentInput}` }] }
          ]
        })
      });

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Gemini hatası:", error);
      return "Kanka bağlantıda ufak bir kopukluk oldu ya, tekrar yazar mısın? 😔";
    }
  };

  const send = async () => {
    const val = input.trim()
    if (!val || solved || loading) return

    if (!useQuestion()) {
      showToast('Günlük soru hakkın bitti 😔')
      return
    }

    const userMsg: Msg = { from: 'user', text: val }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setLoading(true)

    // Sabit kalıpları yıkıp gerçek cevabı ürettiriyoruz
    const aiResponse = await askGemini(messages, val);
    
    setMessages((m) => [
      ...m,
      {
        from: 'ai',
        text: aiResponse
      }
    ]);
    
    setLoading(false)
    addXp(5)
    addGold(2)
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background">
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
        <button onClick={onClose} aria-label="Çalışma odasını kapat" className="rounded-full p-1.5 text-muted-foreground transition hover:bg-elevated hover:text-foreground">
          <X className="h-5 w-5" />
        </button>
      </div>

      {phase !== 'chat' ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
          <div className={cn('relative grid aspect-[3/4] w-56 place-items-center overflow-hidden rounded-3xl border-2 border-dashed', phase === 'scanning' ? 'border-accent' : 'border-primary/50')}>
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
                  <p className="px-6 text-sm font-medium text-muted-foreground">Sorunun fotoğrafını çerçeveye hizala</p>
                </>
              )}
            </div>
          </div>

          {phase === 'scan' && (
            <button onClick={startScan} className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-bold text-primary-foreground transition active:scale-95">
              <Camera className="h-5 w-5" />
              Sorunun Fotoğrafını Çek / Yükle
            </button>
          )}
        </div>
      ) : (
        <>
          <div ref={scrollRef} className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full bg-elevated px-3 py-1 text-[11px] font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" /> Sokratik AI Öğretmen
            </div>

            {messages.map((m, i) => (
              <div key={i} className={cn('flex', m.from === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={cn('max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed', m.from === 'user' ? 'rounded-br-md bg-primary text-primary-foreground' : 'rounded-bl-md bg-elevated text-foreground')}>
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-elevated px-4 py-2.5 text-sm text-muted-foreground animate-pulse">
                  Kanka düşünüyor ve çözüyorum... 🧠
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border px-4 py-2.5">
            <div className="flex items-center justify-between gap-2 rounded-xl bg-elevated px-3 py-2">
              <span className="text-xs font-semibold">
                Günlük Ücretsiz Soru Hakkı: <span className={freeQuestions > 0 ? 'text-accent' : 'text-destructive'}>{freeQuestions}</span>/5
              </span>
              <button onClick={() => { if (watchAd()) showToast('+1 Soru hakkı kazandın! 🎬'); else showToast('Günlük reklam limitine ulaştın'); }} className="rounded-lg bg-primary/15 px-2.5 py-1 text-[11px] font-bold text-primary transition active:scale-95">
                🎬 Reklam İzle +1 ({adsWatched}/10)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-border px-4 pb-6 pt-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing) send(); }}
              disabled={solved || loading}
              placeholder={loading ? 'Düşünüyorum...' : 'Cevabını veya sorunu yaz...'}
              className="flex-1 rounded-full border border-input bg-elevated px-4 py-3 text-sm outline-none transition focus:border-primary disabled:opacity-60"
            />
            <button onClick={send} disabled={solved || !input.trim() || loading} aria-label="Gönder" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition active:scale-95 disabled:opacity-40">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
