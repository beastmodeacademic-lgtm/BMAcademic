'use client'

import { useState } from 'react'
import { Trash2, Send, AlertTriangle, ArrowLeft, Users, CircleCheckBig, TrendingUp } from 'lucide-react'
import { useStore } from '@/lib/store'
import { TechStar } from '@/components/brand-logo'

const SUBJECT_OPTIONS = [
  { subject: 'Matematik', emoji: '➗' },
  { subject: 'Fen Bilimleri', emoji: '🔬' },
  { subject: 'Türkçe', emoji: '📖' },
  { subject: 'Sosyal Bilgiler', emoji: '🗺️' },
  { subject: 'İngilizce', emoji: '🗣️' },
]

export function TeacherDashboard() {
  const { assignments, addAssignment, removeAssignment, alerts, dismissAlert, setScreen, showToast } =
    useStore()
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState(SUBJECT_OPTIONS[0])

  const publish = () => {
    const t = title.trim()
    if (!t) {
      showToast('Önce bir ödev başlığı yaz')
      return
    }
    addAssignment({ subject: subject.subject, title: t, emoji: subject.emoji, grade: 'all' })
    setTitle('')
    showToast('Ödev yayınlandı! 📢')
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-3 border-b border-border px-5 pb-3 pt-5">
        <button
          onClick={() => setScreen('login')}
          aria-label="Geri"
          className="grid h-9 w-9 place-items-center rounded-xl bg-elevated text-muted-foreground transition active:scale-90"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="h-9 w-9 rounded-xl bg-elevated p-1.5 ring-1 ring-primary/40">
          <TechStar />
        </div>
        <div>
          <h1 className="text-base font-bold leading-tight">Öğretmen Kontrol Matrisi</h1>
          <p className="text-[11px] text-muted-foreground">BM Academic Panel</p>
        </div>
      </header>

      <div className="no-scrollbar flex-1 space-y-6 overflow-y-auto px-5 py-5">
        {/* analytics */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Users, label: 'Öğrenci', value: '24', tone: 'text-primary' },
            { icon: CircleCheckBig, label: 'Çözülen Soru', value: '1,450', tone: 'text-accent' },
            { icon: TrendingUp, label: 'Başarı', value: '%82', tone: 'text-gold' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-3 text-center">
              <s.icon className={`mx-auto h-5 w-5 ${s.tone}`} />
              <p className="mt-1.5 text-lg font-bold">{s.value}</p>
              <p className="text-[10px] font-medium text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* struggling students */}
        <section>
          <h2 className="mb-2 flex items-center gap-2 text-sm font-bold">
            <AlertTriangle className="h-4 w-4 text-destructive" /> Zorlanan Öğrenciler
          </h2>
          {alerts.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border bg-card/50 px-4 py-5 text-center text-xs text-muted-foreground">
              Şu an zorlanan öğrenci yok 🎉
            </p>
          ) : (
            <div className="space-y-2">
              {alerts.map((a) => (
                <div
                  key={a.id}
                  className="flex animate-pop-in items-center gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-3"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-destructive/20 text-sm font-bold text-destructive">
                    {a.student.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{a.student}</p>
                    <p className="text-[11px] text-destructive">
                      {a.subject} · {a.status}
                    </p>
                  </div>
                  <button
                    onClick={() => dismissAlert(a.id)}
                    className="rounded-lg bg-elevated px-2.5 py-1.5 text-[11px] font-bold text-muted-foreground transition active:scale-95"
                  >
                    Yardım ettim
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* publish assignment */}
        <section>
          <h2 className="mb-2 text-sm font-bold">Yeni Ödev Yayınla</h2>
          <div className="rounded-2xl border border-border bg-card p-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) publish()
              }}
              placeholder="Yeni Ödev Canavarı..."
              className="w-full rounded-xl border border-input bg-elevated px-4 py-3 text-sm outline-none transition focus:border-primary"
            />
            <div className="no-scrollbar mt-2 flex gap-1.5 overflow-x-auto pb-1">
              {SUBJECT_OPTIONS.map((s) => (
                <button
                  key={s.subject}
                  onClick={() => setSubject(s)}
                  className={`shrink-0 rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition ${
                    subject.subject === s.subject
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-elevated text-muted-foreground'
                  }`}
                >
                  {s.emoji} {s.subject}
                </button>
              ))}
            </div>
            <button
              onClick={publish}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition active:scale-[0.98]"
            >
              <Send className="h-4 w-4" /> YAYINLA
            </button>
          </div>
        </section>

        {/* active assignments */}
        <section>
          <h2 className="mb-2 text-sm font-bold">
            Aktif Ödevler{' '}
            <span className="text-muted-foreground">({assignments.length})</span>
          </h2>
          {assignments.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border bg-card/50 px-4 py-5 text-center text-xs text-muted-foreground">
              Henüz ödev yayınlamadın
            </p>
          ) : (
            <div className="space-y-2">
              {assignments.map((a) => (
                <div
                  key={a.id}
                  className="flex animate-fade-up items-center gap-3 rounded-2xl border border-border bg-card p-3"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-elevated text-lg">
                    {a.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-primary">
                      {a.subject}
                    </p>
                    <p className="truncate text-sm font-bold">{a.title}</p>
                  </div>
                  <button
                    onClick={() => removeAssignment(a.id)}
                    aria-label="Ödevi sil"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-destructive/10 text-destructive transition active:scale-90"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
