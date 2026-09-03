'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import {
  GRADE_ASSIGNMENTS,
  type Grade,
  type Assignment,
} from '@/lib/data'

export type Screen = 'login' | 'gradeSelect' | 'levelTest' | 'app' | 'teacher'
export type TabId = 'hedefler' | 'dersler' | 'market' | 'sosyal' | 'profil'

export type StrugglingAlert = {
  id: string
  student: string
  status: string
  subject: string
}

type Toast = { id: number; text: string } | null

type StoreValue = {
  screen: Screen
  setScreen: (s: Screen) => void
  grade: Grade | null
  setGrade: (g: Grade) => void
  tab: TabId
  setTab: (t: TabId) => void

  gold: number
  streak: number
  xp: number
  addGold: (n: number) => void
  spendGold: (n: number) => boolean
  addXp: (n: number) => void

  freeQuestions: number
  useQuestion: () => boolean
  adsWatched: number
  watchAd: () => boolean

  ownedItems: string[]
  buyItem: (id: string, price: number) => boolean

  pinnedBadges: string[]
  togglePin: (id: string) => void

  isPremium: boolean
  setPremium: (v: boolean) => void

  theme: 'dark' | 'light'
  toggleTheme: () => void
  lang: 'TR' | 'EN'
  setLang: (l: 'TR' | 'EN') => void

  assignments: Assignment[]
  addAssignment: (a: Omit<Assignment, 'id'>) => void
  removeAssignment: (id: string) => void

  alerts: StrugglingAlert[]
  raiseAlert: (student: string, subject: string) => void
  dismissAlert: (id: string) => void

  toast: Toast
  showToast: (text: string) => void
}

const StoreContext = createContext<StoreValue | null>(null)

let toastCounter = 0

export function StoreProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>('login')
  const [grade, setGradeState] = useState<Grade | null>(null)
  const [tab, setTab] = useState<TabId>('hedefler')

  const [gold, setGold] = useState(1250)
  const [streak] = useState(5)
  const [xp, setXp] = useState(1980)

  const [freeQuestions, setFreeQuestions] = useState(5)
  const [adsWatched, setAdsWatched] = useState(0)

  const [ownedItems, setOwnedItems] = useState<string[]>([])
  const [pinnedBadges, setPinnedBadges] = useState<string[]>(['b2', 'b3', 'b5'])
  const [isPremium, setPremium] = useState(false)

  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [lang, setLang] = useState<'TR' | 'EN'>('TR')

  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [alerts, setAlerts] = useState<StrugglingAlert[]>([
    { id: 'al-seed', student: 'AhmetEge', status: 'Zorlanıyor', subject: 'Matematik' },
  ])
  const [toast, setToast] = useState<Toast>(null)

  const showToast = useCallback((text: string) => {
    const id = ++toastCounter
    setToast({ id, text })
    setTimeout(() => {
      setToast((cur) => (cur && cur.id === id ? null : cur))
    }, 1800)
  }, [])

  const setGrade = useCallback((g: Grade) => {
    setGradeState(g)
    setAssignments(GRADE_ASSIGNMENTS[g])
  }, [])

  const addGold = useCallback((n: number) => setGold((g) => g + n), [])
  const spendGold = useCallback((n: number) => {
    let ok = false
    setGold((g) => {
      if (g >= n) {
        ok = true
        return g - n
      }
      return g
    })
    return ok
  }, [])
  const addXp = useCallback((n: number) => setXp((x) => x + n), [])

  const useQuestion = useCallback(() => {
    let ok = false
    setFreeQuestions((q) => {
      if (q > 0) {
        ok = true
        return q - 1
      }
      return q
    })
    return ok
  }, [])

  const watchAd = useCallback(() => {
    let ok = false
    setAdsWatched((a) => {
      if (a < 10) {
        ok = true
        return a + 1
      }
      return a
    })
    if (ok) setFreeQuestions((q) => q + 1)
    return ok
  }, [])

  const buyItem = useCallback((id: string, price: number) => {
    let ok = false
    setGold((g) => {
      if (g >= price) {
        ok = true
        return g - price
      }
      return g
    })
    if (ok) setOwnedItems((items) => (items.includes(id) ? items : [...items, id]))
    return ok
  }, [])

  const togglePin = useCallback((id: string) => {
    setPinnedBadges((pins) => {
      if (pins.includes(id)) return pins.filter((p) => p !== id)
      if (pins.length >= 3) return pins
      return [...pins, id]
    })
  }, [])

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])

  const addAssignment = useCallback((a: Omit<Assignment, 'id'>) => {
    setAssignments((list) => [{ ...a, id: `pub-${Date.now()}` }, ...list])
  }, [])
  const removeAssignment = useCallback((id: string) => {
    setAssignments((list) => list.filter((a) => a.id !== id))
  }, [])

  const raiseAlert = useCallback((student: string, subject: string) => {
    setAlerts((list) => {
      if (list.some((a) => a.student === student && a.subject === subject)) return list
      return [{ id: `al-${Date.now()}`, student, status: 'Zorlanıyor', subject }, ...list]
    })
  }, [])
  const dismissAlert = useCallback((id: string) => {
    setAlerts((list) => list.filter((a) => a.id !== id))
  }, [])

  const value: StoreValue = {
    screen,
    setScreen,
    grade,
    setGrade,
    tab,
    setTab,
    gold,
    streak,
    xp,
    addGold,
    spendGold,
    addXp,
    freeQuestions,
    useQuestion,
    adsWatched,
    watchAd,
    ownedItems,
    buyItem,
    pinnedBadges,
    togglePin,
    isPremium,
    setPremium,
    theme,
    toggleTheme,
    lang,
    setLang,
    assignments,
    addAssignment,
    removeAssignment,
    alerts,
    raiseAlert,
    dismissAlert,
    toast,
    showToast,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
