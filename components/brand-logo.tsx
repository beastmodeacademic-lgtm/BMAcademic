import { cn } from '@/lib/utils'

export function TechStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn('h-full w-full', className)}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bm-star" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="oklch(0.7 0.24 300)" />
          <stop offset="1" stopColor="oklch(0.78 0.16 162)" />
        </linearGradient>
      </defs>
      {/* sharp 4-point tech star */}
      <path
        d="M24 2 L29.5 18.5 L46 24 L29.5 29.5 L24 46 L18.5 29.5 L2 24 L18.5 18.5 Z"
        fill="url(#bm-star)"
      />
      <path d="M24 12 L27 21 L36 24 L27 27 L24 36 L21 27 L12 24 L21 21 Z" fill="oklch(0.16 0.045 264)" fillOpacity="0.35" />
      <circle cx="24" cy="24" r="3" fill="oklch(0.98 0.01 290)" />
    </svg>
  )
}

export function BrandLogo({
  size = 'lg',
  showText = true,
}: {
  size?: 'sm' | 'lg'
  showText?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={cn(
          'relative grid place-items-center rounded-2xl bg-elevated ring-1 ring-primary/40',
          size === 'lg' ? 'h-20 w-20 p-3.5 shadow-[0_0_40px_-6px_oklch(0.62_0.245_295/0.6)]' : 'h-11 w-11 p-2',
        )}
      >
        <TechStar />
      </div>
      {showText && (
        <div className="text-center">
          <h1
            className={cn(
              'font-bold tracking-tight text-foreground',
              size === 'lg' ? 'text-3xl' : 'text-lg',
            )}
          >
            BM Academic
          </h1>
          {size === 'lg' && (
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              Akıllı Başarı ve Gelişim Dünyası
            </p>
          )}
        </div>
      )}
    </div>
  )
}
