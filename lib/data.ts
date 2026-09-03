export type Grade = '5' | '6' | '7' | '8'

export type Assignment = {
  id: string
  subject: string
  title: string
  emoji: string
  grade: Grade | 'all'
}

// Grade-tailored default assignments (student HEDEFLER tab)
export const GRADE_ASSIGNMENTS: Record<Grade, Assignment[]> = {
  '5': [
    { id: 'a5-1', subject: 'Matematik', title: 'Doğal Sayılar ve İşlemler', emoji: '➗', grade: '5' },
    { id: 'a5-2', subject: 'Fen Bilimleri', title: 'Güneş, Dünya ve Ay', emoji: '🌍', grade: '5' },
    { id: 'a5-3', subject: 'Türkçe', title: 'Sözcükte Anlam', emoji: '📖', grade: '5' },
  ],
  '6': [
    { id: 'a6-1', subject: 'Matematik', title: 'Çarpanlar ve Katlar', emoji: '✖️', grade: '6' },
    { id: 'a6-2', subject: 'Fen Bilimleri', title: 'Hücre Yapısı', emoji: '🔬', grade: '6' },
    { id: 'a6-3', subject: 'Sosyal Bilgiler', title: 'İpek Yolu\'nda Türkler', emoji: '🗺️', grade: '6' },
  ],
  '7': [
    { id: 'a7-1', subject: 'Matematik', title: 'Rasyonel Sayılar', emoji: '🔢', grade: '7' },
    { id: 'a7-2', subject: 'Fen Bilimleri', title: 'Elektrik Devreleri', emoji: '⚡', grade: '7' },
    { id: 'a7-3', subject: 'İngilizce', title: 'Appearance & Personality', emoji: '🗣️', grade: '7' },
  ],
  '8': [
    { id: 'a8-1', subject: 'Matematik', title: 'Çarpanlar ve Katlar', emoji: '✖️', grade: '8' },
    { id: 'a8-2', subject: 'Fen Bilimleri', title: 'Hücre Yapısı ve DNA', emoji: '🧬', grade: '8' },
    { id: 'a8-3', subject: 'Türkçe', title: 'Fiilimsiler', emoji: '📚', grade: '8' },
  ],
}

export const DIFFICULTIES = ['Kolay', 'Orta', 'Zor'] as const
export type Difficulty = (typeof DIFFICULTIES)[number]

export type ShopItem = {
  id: string
  name: string
  price: number
  emoji: string
  kind: 'Pelerin' | 'Aksesuar' | 'Çerçeve' | 'Rozet'
  desc: string
}

export const SHOP_ITEMS: ShopItem[] = [
  { id: 'cape-legend', name: 'Efsanevi Savaşçı Pelerini', price: 350, emoji: '🦸', kind: 'Pelerin', desc: 'Profilinde efsanevi bir aura bırakır.' },
  { id: 'wand-ai', name: 'Yapay Zeka Sihirli Asası', price: 600, emoji: '🪄', kind: 'Aksesuar', desc: 'Bilgeliğin sembolü, en nadir eşya.' },
  { id: 'frame-lgs', name: 'LGS Şampiyonu Çerçevesi', price: 150, emoji: '🏆', kind: 'Çerçeve', desc: 'Avatarını şampiyon çerçevesiyle süsle.' },
  { id: 'badge-math', name: 'Matematik Dehası Rozeti', price: 100, emoji: '🧠', kind: 'Rozet', desc: 'Sayıların ustası olduğunu göster.' },
]

export type Subject = {
  id: string
  name: string
  emoji: string
  progress: number
}

export const SUBJECTS: Subject[] = [
  { id: 'mat', name: 'Matematik', emoji: '➗', progress: 72 },
  { id: 'fen', name: 'Fen Bilimleri', emoji: '🔬', progress: 58 },
  { id: 'tur', name: 'Türkçe', emoji: '📖', progress: 84 },
  { id: 'sos', name: 'Sosyal Bilgiler', emoji: '🗺️', progress: 41 },
  { id: 'ing', name: 'İngilizce', emoji: '🗣️', progress: 66 },
]

export const BRANCH_EXAMS = [
  { id: 'be-mat', name: 'Matematik Branş Denemesi', questions: 20, emoji: '➗' },
  { id: 'be-fen', name: 'Fen Bilimleri Branş Denemesi', questions: 20, emoji: '🔬' },
  { id: 'be-tur', name: 'Türkçe Branş Denemesi', questions: 20, emoji: '📖' },
  { id: 'be-ing', name: 'İngilizce Branş Denemesi', questions: 15, emoji: '🗣️' },
]

export const WORD_PAIRS = [
  { en: 'Brave', tr: 'Cesur' },
  { en: 'Knowledge', tr: 'Bilgi' },
  { en: 'Success', tr: 'Başarı' },
  { en: 'Curious', tr: 'Meraklı' },
  { en: 'Effort', tr: 'Çaba' },
]

// 5 cup tiers with distinct material colors
export const CUP_TIERS = [
  { id: 'tahta', name: 'Tahta Kupa', color: '#a97142', minXp: 0 },
  { id: 'tas', name: 'Taş Kupa', color: '#9aa4ad', minXp: 400 },
  { id: 'demir', name: 'Demir Kupa', color: '#6b7a8f', minXp: 900 },
  { id: 'altin', name: 'Altın Kupa', color: '#e6b422', minXp: 1600 },
  { id: 'elmas', name: 'Elmas Kupa', color: '#5fd0e3', minXp: 2500 },
]

export type LeaderboardEntry = {
  name: string
  xp: number
  isUser?: boolean
}

export const LEADERBOARD: LeaderboardEntry[] = [
  { name: 'ElifNaz', xp: 2820 },
  { name: 'MertKaan', xp: 2340 },
  { name: 'BeratTunahan', xp: 1980, isUser: true },
  { name: 'ZeynepSu', xp: 1560 },
  { name: 'AhmetEge', xp: 1210 },
  { name: 'DefneIrem', xp: 870 },
  { name: 'KeremAli', xp: 520 },
  { name: 'YağmurEce', xp: 260 },
]

export const FRIENDS = [
  { name: 'ElifNaz', xp: 2820, online: true },
  { name: 'MertKaan', xp: 2340, online: false },
  { name: 'ZeynepSu', xp: 1560, online: true },
]

export type Badge = {
  id: string
  name: string
  emoji: string
  earned: boolean
}

export const BADGES: Badge[] = [
  { id: 'b1', name: 'İlk Adım', emoji: '👟', earned: true },
  { id: 'b2', name: '5 Günlük Seri', emoji: '🔥', earned: true },
  { id: 'b3', name: 'Matematik Ustası', emoji: '🧮', earned: true },
  { id: 'b4', name: 'Fen Kaşifi', emoji: '🔭', earned: true },
  { id: 'b5', name: 'Kelime Şampiyonu', emoji: '🔤', earned: true },
  { id: 'b6', name: 'Gece Baykuşu', emoji: '🦉', earned: false },
  { id: 'b7', name: 'Deneme Canavarı', emoji: '📝', earned: true },
  { id: 'b8', name: 'Altın Kupa', emoji: '🏆', earned: false },
]

export const ENCOURAGEMENTS = ['Aferin! 🎉', 'Süper! ⭐', 'Harika gidiyorsun! 🚀', 'Muhteşem! 💪', 'Tam isabet! 🎯']

// Sample Socratic question used inside the study room
export const SAMPLE_QUESTION = {
  prompt: 'Bir sayının 3 katının 7 fazlası 22 ediyor. Bu sayı kaçtır?',
  answer: '5',
  clue: 'İpucu: Önce 7\'yi karşı tarafa geçir (22 - 7), sonra kalan sayıyı 3\'e bölmeyi dene. 😊',
  steps: [
    '3x + 7 = 22 denklemini kuruyoruz.',
    'Her iki taraftan 7 çıkaralım: 3x = 15.',
    'Her iki tarafı 3\'e bölelim: x = 5.',
    'Sonuç: Aradığımız sayı 5\'tir. ✅',
  ],
}
