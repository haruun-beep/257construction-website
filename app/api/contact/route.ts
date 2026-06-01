import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const TO_EMAIL = '257Construction@gmail.com'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

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
      ? `📅 Consultation Booking — ${bookingDate} at ${bookingTime} — ${fullName}`
      : `🔨 New Project Request — ${service} — ${fullName}`

    const html = isBooking
      ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #fff; padding: 32px; border: 1px solid #F97316;">
          <div style="background: #F97316; padding: 16px 24px; margin: -32px -32px 32px -32px;">
            <h1 style="margin: 0; color: #000; font-size: 22px; font-weight: 900; letter-spacing: 2px;">📅 CALL BOOKED</h1>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 35%;">Name</td>
              <td style="padding: 12px 0; color: #fff; font-weight: 600;">${fullName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
              <td style="padding: 12px 0; color: #F97316;">${email}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Date</td>
              <td style="padding: 12px 0; color: #fff; font-weight: 600;">${bookingDate}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Time</td>
              <td style="padding: 12px 0; color: #fff; font-weight: 600;">${bookingTime} Mountain Time</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #111; border-left: 3px solid #F97316;">
            <p style="margin: 0; color: #9CA3AF; font-size: 13px;">Call this person at ${bookingDate}, ${bookingTime} MT. Their email is <strong style="color: #F97316;">${email}</strong></p>
          </div>
          <p style="margin-top: 24px; color: #374151; font-size: 11px;">25/7 Construction Ltd. | Edmonton, AB | 825-461-2378</p>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #fff; padding: 32px; border: 1px solid #F97316;">
          <div style="background: #F97316; padding: 16px 24px; margin: -32px -32px 32px -32px;">
            <h1 style="margin: 0; color: #000; font-size: 22px; font-weight: 900; letter-spacing: 2px;">🔨 NEW PROJECT REQUEST</h1>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 35%;">Name</td>
              <td style="padding: 12px 0; color: #fff; font-weight: 600;">${fullName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
              <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #F97316; text-decoration: none;">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Phone</td>
              <td style="padding: 12px 0;"><a href="tel:${phone}" style="color: #F97316; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Service</td>
              <td style="padding: 12px 0; color: #fff; font-weight: 600;">${service}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Location</td>
              <td style="padding: 12px 0; color: #fff;">${location}</td>
            </tr>
            <tr style="border-bottom: 1px solid #222;">
              <td style="padding: 12px 0; color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Referral</td>
              <td style="padding: 12px 0; color: #fff;">${referral || 'Not specified'}</td>
            </tr>
          </table>
          ${description ? `
            <div style="margin-top: 24px;">
              <p style="color: #9CA3AF; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Project Description</p>
              <div style="background: #111; border-left: 3px solid #F97316; padding: 16px;">
                <p style="margin: 0; color: #D1D5DB; line-height: 1.6;">${description.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
          ` : ''}
          <p style="margin-top: 24px; color: #374151; font-size: 11px;">25/7 Construction Ltd. | Edmonton, AB | 825-461-2378 | 257construction.com</p>
        </div>
      `

    await transporter.sendMail({
      from: `"25/7 Construction" <${process.env.GMAIL_USER}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
