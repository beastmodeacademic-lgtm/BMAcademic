import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { chatHistory, currentInput } = await req.json()
    const GEMINI_API_KEY = "AIzaSyBqHgSoxMbnzbDONGOTawpgn4poX-JquUg"

    const formattedHistory = chatHistory.map((m: any) => ({
      role: m.from === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }))

    const response = await fetch(`https://googleapis.com{GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          ...formattedHistory,
          { role: 'user', parts: [{ text: `Sen arkadaş canlısı, samimi bir lise/ortaokul öğretmenisin. Öğrenciye direkt cevabı söyleme, sokratik yöntemle ipuçları vererek çözdür. Türkçe konuş. Öğrencinin sorusu: ${currentInput}` }] }
        ]
      })
    })

    const data = await response.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Kanka tam anlayamadım, tekrar yazar mısın? 😔"
    
    return NextResponse.json({ text })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ text: "Kanka arka planda bir şeyler koptu ya, tekrar yazar mısın? 😔" })
  }
}
