import { NextResponse } from "next/server"

const NEWS_API_KEY = "55831fbf60a742d0b5d31d4701ee0fe4"

export async function GET() {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=ai OR blockchain OR cryptocurrency OR tech&apiKey=${NEWS_API_KEY}&pageSize=15&language=en&sortBy=publishedAt`,
      { next: { revalidate: 86400 } }, // Cache for 24 hours (86400 seconds)
    )

    if (!response.ok) {
      throw new Error(`NewsAPI responded with ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}
