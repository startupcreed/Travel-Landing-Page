import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const response = await fetch(
      'https://crm.before.holiday/api/submit-contact',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email || '',
          travelDate: data.travelDate || '',
          days: data.days || '',
          message: data.message || '',
          source: 'KTOUR',
        }),
      }
    )

    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false }, { status: 400 })
    }
  } catch (error) {
    console.error('Lead API error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}