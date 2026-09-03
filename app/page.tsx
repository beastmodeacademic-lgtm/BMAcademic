import { StoreProvider } from '@/lib/store'
import { BmApp } from '@/components/bm-app'

export default function Page() {
  return (
    <StoreProvider>
      <BmApp />
    </StoreProvider>
  )
}
