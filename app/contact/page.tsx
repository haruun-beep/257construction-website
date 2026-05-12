'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { DayPicker } from 'react-day-picker'
import { format, addDays, isBefore, isWeekend, startOfDay } from 'date-fns'
import {
  Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle,
  ArrowRight, ChevronDown, Calendar, HardHat
} from 'lucide-react'
import 'react-day-picker/dist/style.css'

const HERO_IMG = 'https://static.wixstatic.com/media/c837a6_a4eefd197f2049a598ba9749e86ce259~mv2.jpg'

const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

const services = [
  'Excavation / Dirt Moving',
  'Fencing',
  'Renovations',
  'Landscape Construction',
  'Ditch Mowing',
  'Site Management',
  'Land Development',
  'Subcontracting',
  'Government / Municipal Contract',
  'Not Sure / General Inquiry',
]

const referralSources = ['Google', 'Word of Mouth / Referral', 'Social Media', 'Driving By', 'Job Site Sign', 'Other']

type FormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  service: string
  location: string
  description: string
  referral: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const [form, setForm] = useState<FormState>({
    firstName: '', lastName: '', email: '', phone: '',
    service: '', location: '', description: '', referral: '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string | undefined>()
  const [bookingStatus, setBookingStatus] = useState<Status>('idle')
  const [bookerEmail, setBookerEmail] = useState('')
  const [bookerName, setBookerName] = useState('')

  const today = startOfDay(new Date())
  const isDisabled = (date: Date) =>
    isBefore(date, today) || isWeekend(date)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send')
      setStatus('success')
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please call us directly.')
    }
  }

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !bookerName || !bookerEmail) return
    setBookingStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: bookerName.split(' ')[0] || bookerName,
          lastName: bookerName.split(' ').slice(1).join(' ') || '',
          email: bookerEmail,
          phone: '',
          service: 'Phone Consultation Booking',
          location: 'N/A',
          description: `Phone call booking request: ${format(selectedDate, 'MMMM d, yyyy')} at ${selectedTime} (Mountain Time)`,
          referral: '',
          isBooking: true,
          bookingDate: format(selectedDate, 'MMMM d, yyyy'),
          bookingTime: selectedTime,
        }),
      })
      if (!res.ok) throw new Error()
      setBookingStatus('success')
    } catch {
      setBookingStatus('error')
    }
  }

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[50vh] flex items-end pb-20 overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src={HERO_IMG} alt="Construction site Edmonton" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-black/20 to-transparent" />
        </motion.div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand text-xs uppercase tracking-[0.3em] mb-3"
          >
            Free Consultations Available
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-7xl md:text-9xl tracking-wider"
          >
            LET&apos;S <span className="text-brand">BUILD</span> TOGETHER
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-lg mt-4 max-w-xl"
          >
            Reach out for a free quote or general inquiry. We respond within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-20 bg-bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left — Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2"
            >
              <h2 className="font-heading text-3xl tracking-wider text-white mb-8 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 after:bg-brand">
                CONTACT INFO
              </h2>
              <div className="space-y-6">
                <div className="border-b border-white/5 pb-6">
                  <a href="tel:8254612378" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-brand/10 border border-brand/30 flex items-center justify-center flex-shrink-0 group-hover:bg-brand/20 transition-colors">
                      <Phone size={16} className="text-brand" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Phone (Primary)</p>
                      <p className="text-white font-semibold group-hover:text-brand transition-colors">825-461-2378</p>
                    </div>
                  </a>
                </div>
                <div className="border-b border-white/5 pb-6">
                  <a href="tel:7808514048" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-brand/10 border border-brand/30 flex items-center justify-center flex-shrink-0 group-hover:bg-brand/20 transition-colors">
                      <Phone size={16} className="text-brand" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Phone (Secondary)</p>
                      <p className="text-white font-semibold group-hover:text-brand transition-colors">780-851-4048</p>
                    </div>
                  </a>
                </div>
                <div className="border-b border-white/5 pb-6">
                  <a href="mailto:257Construction@gmail.com" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-brand/10 border border-brand/30 flex items-center justify-center flex-shrink-0 group-hover:bg-brand/20 transition-colors">
                      <Mail size={16} className="text-brand" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Email</p>
                      <p className="text-white font-semibold text-sm group-hover:text-brand transition-colors break-all">257Construction@gmail.com</p>
                    </div>
                  </a>
                </div>
                <div className="border-b border-white/5 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand/10 border border-brand/30 flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} className="text-brand" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Location</p>
                      <p className="text-white font-semibold">Edmonton, AB</p>
                      <p className="text-gray-400 text-sm">Serving all of Alberta</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand/10 border border-brand/30 flex items-center justify-center flex-shrink-0">
                      <Clock size={16} className="text-brand" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Hours</p>
                      <p className="text-white font-semibold">Mon–Sat, 7:00 AM – 6:00 PM</p>
                      <p className="text-gray-400 text-sm">Emergency calls accepted</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="mt-10 p-6 bg-surface-1 border border-white/5">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-4">Credentials</p>
                <div className="flex flex-wrap gap-2">
                  {['Licensed', 'Bonded', 'Insured', 'COR Certified', 'WCB Compliant', 'ISN Registered'].map((b) => (
                    <span key={b} className="text-xs font-bold border border-brand/30 text-brand px-2.5 py-1 tracking-wider">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <h2 className="font-heading text-3xl tracking-wider text-white mb-8 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 after:bg-brand">
                REQUEST A FREE QUOTE
              </h2>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-surface-1 border border-brand/30 p-12 text-center"
                >
                  <CheckCircle size={60} className="text-brand mx-auto mb-6" />
                  <h3 className="font-heading text-4xl tracking-wider text-white mb-3">MESSAGE RECEIVED!</h3>
                  <p className="text-gray-300 text-lg mb-2">We got your request and will respond within 24 hours.</p>
                  <p className="text-gray-500 text-sm">For urgent matters, call us at <a href="tel:8254612378" className="text-brand">825-461-2378</a></p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-xs uppercase tracking-wider mb-1.5">First Name *</label>
                      <input name="firstName" required value={form.firstName} onChange={handleChange} placeholder="Alex" className="form-input" />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs uppercase tracking-wider mb-1.5">Last Name *</label>
                      <input name="lastName" required value={form.lastName} onChange={handleChange} placeholder="Johnson" className="form-input" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-xs uppercase tracking-wider mb-1.5">Email *</label>
                      <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" className="form-input" />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs uppercase tracking-wider mb-1.5">Phone Number *</label>
                      <input name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="780-000-0000" className="form-input" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs uppercase tracking-wider mb-1.5">Service Needed *</label>
                    <div className="relative">
                      <select name="service" required value={form.service} onChange={handleChange} className="form-select">
                        <option value="">Select a service...</option>
                        {services.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-brand pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs uppercase tracking-wider mb-1.5">Project Location *</label>
                    <input name="location" required value={form.location} onChange={handleChange} placeholder="Edmonton, AB / Spruce Grove, AB / etc." className="form-input" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs uppercase tracking-wider mb-1.5">Tell Us About Your Project</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe your project, timeline, scope, or any questions you have..."
                      className="form-input resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs uppercase tracking-wider mb-1.5">How Did You Hear About Us?</label>
                    <div className="relative">
                      <select name="referral" value={form.referral} onChange={handleChange} className="form-select">
                        <option value="">Select one...</option>
                        {referralSources.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-brand pointer-events-none" />
                    </div>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-3 bg-red-950/40 border border-red-500/30 p-4">
                      <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
                      <p className="text-red-300 text-sm">{errorMsg}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-brand hover:bg-brand-dark disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold text-sm uppercase tracking-widest py-4 transition-all duration-200 hover:scale-[1.01] hover:shadow-2xl hover:shadow-brand/30 flex items-center justify-center gap-3"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send My Request <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                  <p className="text-gray-600 text-xs text-center">
                    We respond within 24 hours. No spam, no obligation.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Appointment Booking */}
      <section className="py-20 bg-surface-1 border-y border-brand/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Calendar size={24} className="text-brand" />
                <p className="text-brand text-xs uppercase tracking-[0.3em]">Book a Call</p>
              </div>
              <h2 className="font-heading text-5xl md:text-6xl tracking-wider text-white mb-4 relative inline-block">
                PREFER TO BOOK A CALL?
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-brand" />
              </h2>
              <p className="text-gray-400 text-lg mt-6 max-w-xl mx-auto">
                Schedule a free 30-minute phone consultation with our team. Choose a date and time that works for you.
              </p>
            </motion.div>
          </div>

          {bookingStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto bg-bg-base border border-brand/30 p-12 text-center"
            >
              <CheckCircle size={60} className="text-brand mx-auto mb-6" />
              <h3 className="font-heading text-4xl tracking-wider text-white mb-3">CALL BOOKED!</h3>
              <p className="text-gray-300 mb-2">
                Your consultation is confirmed for{' '}
                <span className="text-brand font-semibold">
                  {selectedDate && format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}
                </span>{' '}
                (Mountain Time).
              </p>
              <p className="text-gray-500 text-sm">A confirmation will be sent to {bookerEmail}</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Step 1 — Name & Email */}
              <div className="bg-bg-base border border-white/5 p-6">
                <p className="text-brand text-xs font-bold uppercase tracking-widest mb-4">01 — Your Info</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-xs uppercase tracking-wider mb-1.5">Your Name</label>
                    <input
                      type="text"
                      value={bookerName}
                      onChange={(e) => setBookerName(e.target.value)}
                      placeholder="Full name"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs uppercase tracking-wider mb-1.5">Email for Confirmation</label>
                    <input
                      type="email"
                      value={bookerEmail}
                      onChange={(e) => setBookerEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="form-input"
                    />
                  </div>
                  <div className="bg-surface-2 border border-white/5 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <HardHat size={14} className="text-brand" />
                      <p className="text-xs font-bold text-white uppercase tracking-wider">Phone Call</p>
                    </div>
                    <p className="text-gray-500 text-xs">30-minute free consultation with our team. We call you at your scheduled time.</p>
                  </div>
                </div>
              </div>

              {/* Step 2 — Pick Date */}
              <div className="bg-bg-base border border-white/5 p-6">
                <p className="text-brand text-xs font-bold uppercase tracking-widest mb-4">02 — Pick a Date</p>
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={isDisabled}
                  fromDate={today}
                  toDate={addDays(today, 60)}
                  className="!m-0 !p-0"
                />
                <p className="text-gray-600 text-xs mt-3 text-center">Mon–Fri only · Mountain Time (Edmonton)</p>
              </div>

              {/* Step 3 — Pick Time */}
              <div className="bg-bg-base border border-white/5 p-6">
                <p className="text-brand text-xs font-bold uppercase tracking-widest mb-4">03 — Pick a Time</p>
                {selectedDate ? (
                  <>
                    <p className="text-gray-400 text-xs mb-4">
                      {format(selectedDate, 'EEEE, MMMM d')} — All times Mountain
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2.5 text-sm font-semibold border transition-all duration-200 ${
                            selectedTime === time
                              ? 'bg-brand border-brand text-black'
                              : 'border-white/10 text-gray-300 hover:border-brand/40 hover:text-white'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleBooking}
                      disabled={!selectedTime || !bookerName || !bookerEmail || bookingStatus === 'loading'}
                      className="w-full bg-brand hover:bg-brand-dark disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold text-sm uppercase tracking-widest py-3.5 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      {bookingStatus === 'loading' ? (
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      ) : (
                        <>Confirm Booking <CheckCircle size={16} /></>
                      )}
                    </button>
                    {bookingStatus === 'error' && (
                      <p className="text-red-400 text-xs text-center mt-3">Booking failed. Please call us at 825-461-2378</p>
                    )}
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10">
                    <Calendar size={40} className="text-brand/30 mb-4" />
                    <p className="text-gray-500 text-sm">Select a date to see available times</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-64 bg-surface-2 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={40} className="text-brand mx-auto mb-3" />
            <p className="font-heading text-2xl tracking-wider text-white">EDMONTON, ALBERTA</p>
            <p className="text-gray-500 text-sm mt-1">Serving clients across all of Alberta</p>
            <a
              href="https://maps.google.com/?q=Edmonton,Alberta"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-brand text-sm font-bold uppercase tracking-wider hover:underline"
            >
              Open in Google Maps <ArrowRight size={14} />
            </a>
          </div>
        </div>
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(#F97316 1px, transparent 1px), linear-gradient(90deg, #F97316 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </section>
    </>
  )
}
