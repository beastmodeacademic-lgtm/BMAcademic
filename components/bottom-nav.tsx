'use client'

import { Target, BookOpen, Store, Users, User } from 'lucide-react'
import { useStore, type TabId } from '@/lib/store'
import { cn } from '@/lib/utils'

const TABS: { id: TabId; label: string; icon: typeof Target }[] = [
  { id: 'hedefler', label: 'HEDEFLER', icon: Target },
  { id: 'dersler', label: 'DERSLER', icon: BookOpen },
  { id: 'market', label: 'MARKET', icon: Store },
  { id: 'sosyal', label: 'SOSYAL', icon: Users },
  { id: 'profil', label: 'PROFİL', icon: User },
]

export function BottomNav() {
  const { tab, setTab } = useStore()
  return (
    <nav className="z-30 flex items-stretch justify-around border-t border-border bg-background/95 px-2 pb-6 pt-2 backdrop-blur-md">
      {TABS.map(({ id, label, icon: Icon }) => {
        const active = tab === id
        return (
          <button
            key={id}
            onClick={() => setTab(id)}
            className="group relative flex flex-1 flex-col items-center gap-1 py-1.5"
            aria-current={active ? 'page' : undefined}
          >
            <span
              className={cn(
                'grid h-9 w-full max-w-14 place-items-center rounded-xl transition',
                active ? 'bg-primary/15' : 'bg-transparent',
              )}
            >
              <Icon
                className={cn('h-5 w-5 transition', active ? 'text-primary' : 'text-muted-foreground')}
              />
            </span>
            <span
              className={cn(
                'text-[9px] font-bold tracking-wide transition',
                active ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
