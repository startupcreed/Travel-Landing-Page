import { NextResponse } from 'next/server'
import { sendLeadEmail } from '@/lib/leadEmail'

export const runtime = 'nodejs'

const utmKeys = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const

function getString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function getUtmParams(value: unknown) {
  if (!value || typeof value !== 'object') {
    return undefined
  }

  const rawParams = value as Record<string, unknown>
  const params = utmKeys.reduce<Record<string, string>>((result, key) => {
    const paramValue = getString(rawParams[key])

    if (paramValue) {
      result[key] = paramValue
    }

    return result
  }, {})

  return Object.keys(params).length > 0 ? params : undefined
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const name = getString(data.name)
    const phone = getString(data.phone)

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and WhatsApp number are required' },
        { status: 400 }
      )
    }

    await sendLeadEmail({
      name,
      phone,
      email: getString(data.email),
      travelDate: getString(data.travelDate),
      destination: getString(data.destination) || 'Kerala',
      message: getString(data.message),
      sourceUrl: getString(data.sourceUrl) || getString(data.pageUrl),
      utm: getUtmParams(data.utm),
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead API error:', error)
    return NextResponse.json(
      { success: false, error: 'Unable to submit trip request. Please try again or connect with us on WhatsApp' },
      { status: 500 }
    )
  }
}
