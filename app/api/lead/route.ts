import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    if (!data.email || !data.email.trim()) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    const payload = {
      lastname: data.name,
      mobile: data.phone,
      email: data.email,
      travelDate: data.travelDate || '',
      description: data.message || '',
      source: 'KTOUR',
    }

    const response = await fetch(
      'https://crm.before.holiday/api/submit-contact',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    )

    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { success: false, error: 'CRM submission failed' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Lead API error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}