import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // 🔥 FIXED PAYLOAD
    const payload = {
      lastname: data.name,
      mobile: data.phone,
      email: data.email || '',
      travelDate: data.travelDate || '',
      description: data.message || '',
      source: 'KTOUR',
    }

    console.log('Sending to CRM:', payload) // 👈 debug

    const response = await fetch(
      'https://crm.before.holiday/api/submit-contact',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    )

    const result = await response.json()
    console.log('CRM Response:', result) // 👈 debug

    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { success: false, error: result },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Lead API error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}