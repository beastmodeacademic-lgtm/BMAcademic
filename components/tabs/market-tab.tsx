'use client'

import { Check } from 'lucide-react'
import { useStore } from '@/lib/store'
import { SHOP_ITEMS } from '@/lib/data'
import { cn } from '@/lib/utils'

export function MarketTab() {
  const { gold, ownedItems, buyItem, showToast } = useStore()

  const handleBuy = (id: string, price: number, name: string) => {
    if (ownedItems.includes(id)) return
    if (buyItem(id, price)) {
      showToast('Harika seçim! 🎉')
    } else {
      showToast('Yeterli altının yok 😔')
    }
  }

  return (
    <div className="space-y-5 px-5 py-5">
      <div className="flex items-center justify-between rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/15 to-transparent p-4">
        <div>
          <h2 className="text-lg font-bold">Avatar Mağazası</h2>
          <p className="text-xs text-muted-foreground">Profilini kozmetiklerle kişiselleştir</p>
        </div>
        <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-sm font-bold text-gold">
          🪙 {gold.toLocaleString('tr-TR')}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {SHOP_ITEMS.map((item) => {
          const owned = ownedItems.includes(item.id)
          const affordable = gold >= item.price
          return (
            <div
              key={item.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-4"
            >
              <div className="mb-3 grid aspect-square place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 text-5xl">
                {item.emoji}
              </div>
              <span className="mb-1 w-fit rounded-full bg-elevated px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                {item.kind}
              </span>
              <p className="text-sm font-bold leading-tight text-balance">{item.name}</p>
              <p className="mt-1 mb-3 text-[11px] leading-snug text-muted-foreground">{item.desc}</p>
              <button
                onClick={() => handleBuy(item.id, item.price, item.name)}
                disabled={owned}
                className={cn(
                  'mt-auto flex items-center justify-center gap-1 rounded-xl py-2.5 text-xs font-bold transition active:scale-95',
                  owned
                    ? 'bg-accent/15 text-accent'
                    : affordable
                      ? 'bg-gold/15 text-gold hover:bg-gold/25'
                      : 'bg-elevated text-muted-foreground',
                )}
              >
                {owned ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Sahipsin
                  </>
                ) : (
                  <>🪙 {item.price} ALTIN</>
                )}
              </button>
            </div>
          )
        })}
      </div>

      <p className="text-center text-[11px] text-muted-foreground">
        Tüm fiyatlar oyun içi ALTIN ile geçerlidir. Gerçek para birimi kullanılmaz.
      </p>
    </div>
  )
}
