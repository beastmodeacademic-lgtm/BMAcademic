'use client'

import { useState } from 'react'
import { Trophy, UserPlus } from 'lucide-react'
import { useStore } from '@/lib/store'
import { CUP_TIERS, LEADERBOARD, FRIENDS } from '@/lib/data'
import { cn } from '@/lib/utils'

function tierForXp(xp: number) {
  let tier = CUP_TIERS[0]
  for (const t of CUP_TIERS) if (xp >= t.minXp) tier = t
  return tier
}

export function SosyalTab() {
  const { showToast } = useStore()
  const [friendInput, setFriendInput] = useState('')
  const [friends, setFriends] = useState(FRIENDS)

  const ranked = [...LEADERBOARD].sort((a, b) => b.xp - a.xp)

  const addFriend = () => {
    const name = friendInput.trim()
    if (!name) return
    setFriends((f) => [{ name, xp: 0, online: true }, ...f])
    setFriendInput('')
    showToast('Arkadaş eklendi! 🤝')
  }

  return (
    <div className="space-y-6 px-5 py-5">
      {/* cup league legend */}
      <section>
        <h2 className="mb-1 text-lg font-bold">Kupa Ligleri</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          Haftalık kazanılan XP&apos;ye göre lig atlarsın
        </p>
        <div className="flex justify-between gap-1.5">
          {CUP_TIERS.map((t) => (
            <div key={t.id} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className="grid h-12 w-12 place-items-center rounded-2xl"
                style={{ backgroundColor: `${t.color}22`, border: `1px solid ${t.color}55` }}
              >
                <Trophy className="h-6 w-6" style={{ color: t.color }} />
              </div>
              <span className="text-center text-[9px] font-bold leading-tight text-muted-foreground">
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* leaderboard */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
          🏆 Haftanın En Çalışkanları
        </h2>
        <div className="space-y-2">
          {ranked.map((entry, i) => {
            const tier = tierForXp(entry.xp)
            return (
              <div
                key={entry.name}
                className={cn(
                  'flex items-center gap-3 rounded-2xl border p-3 transition',
                  entry.isUser
                    ? 'border-primary/50 bg-primary/10'
                    : 'border-border bg-card',
                )}
              >
                <span
                  className={cn(
                    'grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold',
                    i < 3 ? 'bg-gold/20 text-gold' : 'bg-elevated text-muted-foreground',
                  )}
                >
                  {i + 1}
                </span>
                <div
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-bold"
                  style={{ backgroundColor: `${tier.color}22`, color: tier.color }}
                >
                  {entry.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">
                    {entry.name}
                    {entry.isUser && <span className="ml-1 text-xs text-primary">(Sen)</span>}
                  </p>
                  <p className="text-[11px]" style={{ color: tier.color }}>
                    {tier.name}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-bold text-accent">
                  {entry.xp.toLocaleString('tr-TR')} XP
                </span>
              </div>
            )
          })}
        </div>
      </section>

      {/* add friend */}
      <section>
        <h2 className="mb-3 text-lg font-bold">Arkadaşların</h2>
        <div className="mb-3 flex gap-2">
          <input
            value={friendInput}
            onChange={(e) => setFriendInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) addFriend()
            }}
            placeholder="Arkadaş ekle..."
            className="flex-1 rounded-xl border border-input bg-elevated px-4 py-3 text-sm outline-none transition focus:border-primary"
          />
          <button
            onClick={addFriend}
            aria-label="Arkadaş ekle"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition active:scale-95"
          >
            <UserPlus className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-2">
          {friends.map((f) => (
            <div
              key={f.name}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3"
            >
              <div className="relative">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-elevated text-sm font-bold">
                  {f.name.charAt(0)}
                </div>
                <span
                  className={cn(
                    'absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-card',
                    f.online ? 'bg-accent' : 'bg-muted-foreground',
                  )}
                />
              </div>
              <p className="flex-1 text-sm font-bold">{f.name}</p>
              <span className="text-xs font-semibold text-muted-foreground">
                {f.xp.toLocaleString('tr-TR')} XP
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
