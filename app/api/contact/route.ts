import { NextRequest, NextResponse } from 'next/server'

const TO_EMAIL = 'estimating@257construction.com'

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

    if (!process.env.FORMSPREE_FORM_ID) {
      console.error('FORMSPREE_FORM_ID is not set')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const res = await fetch(`https://formspree.io/f/${process.env.FORMSPREE_FORM_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        _subject: subject,
        _replyto: email,
        name: fullName,
        message,
      }),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      console.error('Formspree error:', data)
      return NextResponse.json({ error: 'Failed to send — please call us directly' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
