import { google } from '@ai-sdk/google'
import { streamText, convertToModelMessages } from 'ai'
import { buildSystemPrompt } from '@/lib/chat-prompt'

const rateLimitMap = new Map<string, number[]>()

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const now = Date.now()
  const windowMs = 60_000
  const maxRequests = 30

  const timestamps = rateLimitMap.get(ip)?.filter(t => now - t < windowMs) ?? []
  if (timestamps.length >= maxRequests) {
    return new Response('Too many requests', { status: 429 })
  }
  timestamps.push(now)
  rateLimitMap.set(ip, timestamps)

  const { messages, itemTitle, itemDescription } = await req.json()

  const modelMessages = await convertToModelMessages(messages)

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: buildSystemPrompt(itemTitle, itemDescription),
    messages: modelMessages,
  })

  return result.toTextStreamResponse()
}
