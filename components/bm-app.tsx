'use client'

import { useStore } from '@/lib/store'
import { PhoneFrame } from '@/components/phone-frame'
import { ToastOverlay } from '@/components/toast-overlay'
import { LoginScreen } from '@/components/login-screen'
import { GradeSelectDialog, LevelTestScreen } from '@/components/onboarding'
import { TeacherDashboard } from '@/components/teacher-dashboard'
import { AppHeader } from '@/components/app-header'
import { BottomNav } from '@/components/bottom-nav'
import { HedeflerTab } from '@/components/tabs/hedefler-tab'
import { DerslerTab } from '@/components/tabs/dersler-tab'
import { MarketTab } from '@/components/tabs/market-tab'
import { SosyalTab } from '@/components/tabs/sosyal-tab'
import { ProfilTab } from '@/components/tabs/profil-tab'

const HEADER: Record<string, { title: string; subtitle: string }> = {
  hedefler: { title: 'Hedefler', subtitle: 'Bugünün görevleri' },
  dersler: { title: 'Dersler', subtitle: 'İlerleme ve denemeler' },
  market: { title: 'Market', subtitle: 'Avatar mağazası' },
  sosyal: { title: 'Sosyal', subtitle: 'Kupa ligleri' },
  profil: { title: 'Profil', subtitle: 'Hesabın ve başarımların' },
}

function MainApp() {
  const { tab } = useStore()
  const head = HEADER[tab]
  return (
    <div className="flex h-full flex-col">
      <AppHeader title={head.title} subtitle={head.subtitle} />
      <main className="no-scrollbar flex-1 overflow-y-auto">
        {tab === 'hedefler' && <HedeflerTab />}
        {tab === 'dersler' && <DerslerTab />}
        {tab === 'market' && <MarketTab />}
        {tab === 'sosyal' && <SosyalTab />}
        {tab === 'profil' && <ProfilTab />}
      </main>
      <BottomNav />
    </div>
  )
}

export function BmApp() {
  const { screen } = useStore()
  return (
    <PhoneFrame>
      {screen === 'login' && <LoginScreen />}
      {screen === 'gradeSelect' && (
        <>
          <LoginScreen />
          <GradeSelectDialog />
        </>
      )}
      {screen === 'levelTest' && (
        <>
          <LoginScreen />
          <LevelTestScreen />
        </>
      )}
      {screen === 'app' && <MainApp />}
      {screen === 'teacher' && <TeacherDashboard />}
      <ToastOverlay />
    </PhoneFrame>
  )
}
