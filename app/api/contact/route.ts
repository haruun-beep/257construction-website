import { NextRequest, NextResponse } from 'next/server'

const TO_EMAIL = 'info@257construction.com'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      firstName, lastName, email, phone,
      service, location, description, referral,
      isBooking, bookingDate, bookingTime,
    } = body

    const fullName = `${firstName} ${lastName}`.trim()
    const subject = isBooking
      ? `Consultation Booking — ${bookingDate} at ${bookingTime} — ${fullName}`
      : `New Project Request — ${service} — ${fullName}`

    const message = isBooking
      ? [
          `CALL BOOKED`,
          ``,
          `Name:   ${fullName}`,
          `Email:  ${email}`,
          `Phone:  ${phone || 'Not provided'}`,
          `Date:   ${bookingDate}`,
          `Time:   ${bookingTime} Mountain Time`,
          ``,
          `Call this person at ${bookingDate}, ${bookingTime} MT.`,
        ].join('\n')
      : [
          `NEW PROJECT REQUEST`,
          ``,
          `Name:     ${fullName}`,
          `Email:    ${email}`,
          `Phone:    ${phone}`,
          `Service:  ${service}`,
          `Location: ${location}`,
          `Referral: ${referral || 'Not specified'}`,
          description ? `\nDescription:\n${description}` : '',
        ].join('\n')

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject,
        from_name: '25/7 Construction Website',
        replyto: email,
        email: TO_EMAIL,
        message,
      }),
    })

    const data = await res.json()

    if (!res.ok || !data.success) {
      console.error('Web3Forms error:', data)
      return NextResponse.json({ error: data.message || 'Failed to send' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
