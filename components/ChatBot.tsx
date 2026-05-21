'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, HardHat, ArrowRight } from 'lucide-react'
import Link from 'next/link'

type Message = {
  id: string
  from: 'bot' | 'user'
  text: string
  quickReplies?: string[]
  link?: { label: string; href: string }
}

const COMPANY = {
  phone1: '825-461-2378',
  email: '257Construction@gmail.com',
  location: 'Edmonton, AB — serving all of Alberta',
  hours: 'Mon–Sun, 7AM–6PM',
  ceo: 'Alex Phimester',
  founded: '2020',
  stats: '130+ projects, 17 employees, 6 business partners',
}

const SERVICES: Record<string, { desc: string; bullets: string }> = {
  excavation: {
    desc: 'Land clearing, grading, trenching, and large-scale dirt moving with precision machinery — site prep to infrastructure.',
    bullets: 'Site prep · Land clearing · Grading & leveling · Trenching · Dirt hauling',
  },
  fencing: {
    desc: 'Residential wood fences to commercial chain-link and security perimeters — built to last Alberta weather.',
    bullets: 'Wood privacy · Chain-link · Privacy panels · Commercial perimeter · Agricultural',
  },
  renovations: {
    desc: 'Interior and exterior renovations for residential and commercial properties — from refreshes to full gut-outs.',
    bullets: 'Interior renos · Exterior upgrades · Commercial buildouts · Full overhauls',
  },
  landscaping: {
    desc: 'Hardscaping, softscaping, retaining walls, grading, and site beautification — functional and built to last.',
    bullets: 'Hardscaping · Softscaping · Retaining walls · Gravel & drainage · Yard grading',
  },
  'ditch mowing': {
    desc: 'Ditch mowing and land maintenance for agricultural, residential, and municipal properties across Alberta.',
    bullets: 'Roadside ditches · Agricultural land · Municipal contracts · Seasonal maintenance',
  },
  'site management': {
    desc: 'Full construction site oversight from planning to daily supervision — on time, on budget.',
    bullets: 'Project planning · Crew coordination · Safety compliance · Progress reporting',
  },
  'land development': {
    desc: 'Turning raw land into ready-to-build parcels — clearing, grading, road prep, and utility coordination.',
    bullets: 'Land clearing · Road building · Utility prep · Parcel grading · Development planning',
  },
  subcontracting: {
    desc: 'Reliable subcontracting for GCs and developers — dirt work, excavation, fencing, and landscaping.',
    bullets: 'Dirt work · Excavation support · Fencing install · Landscape sub · Long-term partnerships',
  },
}

const GOVERNMENT_RESPONSE = `25/7 Construction is fully set up to bid on provincial, municipal, and federal contracts in Alberta.\n\n✅ Bonded & fully insured\n✅ WCB Alberta compliant\n✅ COR certified (Alberta's top safety standard)\n✅ ISN registered\n✅ Experience with ditch mowing, excavation, land development & public works\n\nWant to discuss a contract opportunity?`

const SAFETY_RESPONSE = `Safety is non-negotiable at 25/7 Construction.\n\n🏅 COR Certified — Alberta Safety Councils\n✅ WCB Alberta fully compliant\n✅ CSTS-09 certified crew\n✅ H2S Alive certified\n✅ WHMIS 2015 trained\n✅ First Aid Level 1 — all supervisors\n✅ 0 lost-time incidents in 2024\n\nEvery crew member goes home safe. Every day.`

const ABOUT_RESPONSE = `25/7 Construction was founded in Fort McMurray in ${COMPANY.founded} — starting with fences and growing into a full-service Alberta contractor.\n\nCEO: ${COMPANY.ceo}\n📍 Based in Edmonton, AB\n📊 ${COMPANY.stats}\n\nFamily-owned and built on quality, integrity, and client satisfaction.`

const GREETING_RESPONSE = `Hey! 👷 Welcome to 25/7 Construction — Edmonton's trusted construction team.\n\nI can help you with info on our services, quotes, safety certifications, government contracts, and more. What can I help you with?`

type Intent = {
  patterns: string[]
  respond: (input: string) => { text: string; quickReplies?: string[]; link?: { label: string; href: string } }
}

const SERVICE_NAMES = Object.keys(SERVICES)

function matchService(input: string): string | null {
  const aliases: Record<string, string> = {
    'dirt': 'excavation', 'digging': 'excavation', 'dig': 'excavation', 'earth': 'excavation',
    'grading': 'excavation', 'clearing': 'excavation', 'excavat': 'excavation',
    'fence': 'fencing', 'fences': 'fencing',
    'reno': 'renovations', 'renovation': 'renovations', 'remodel': 'renovations', 'repair': 'renovations',
    'landscape': 'landscaping', 'lawn': 'landscaping', 'yard': 'landscaping', 'garden': 'landscaping',
    'hardscap': 'landscaping', 'retaining': 'landscaping',
    'ditch': 'ditch mowing', 'mow': 'ditch mowing', 'mowing': 'ditch mowing',
    'site manage': 'site management', 'project manage': 'site management', 'supervisor': 'site management',
    'land dev': 'land development', 'develop': 'land development', 'parcel': 'land development', 'subdivision': 'land development',
    'subcontract': 'subcontracting', 'sub ': 'subcontracting',
  }
  const lower = input.toLowerCase()
  for (const [alias, svc] of Object.entries(aliases)) {
    if (lower.includes(alias)) return svc
  }
  for (const svc of SERVICE_NAMES) {
    if (lower.includes(svc)) return svc
  }
  return null
}

const intents: Intent[] = [
  // Greeting
  {
    patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'howdy', 'sup', 'start', 'help'],
    respond: () => ({
      text: GREETING_RESPONSE,
      quickReplies: ['What services do you offer?', 'Get a quote', 'Contact info', 'Government contracts'],
    }),
  },
  // All services list
  {
    patterns: ['what services', 'services do you', 'what do you do', 'what can you', 'all services', 'list services', 'offer'],
    respond: () => ({
      text: `We offer 8 core construction services:\n\n1. Excavation & Dirt Moving\n2. Fencing\n3. Renovations\n4. Landscape Construction\n5. Ditch Mowing\n6. Site Management\n7. Land Development\n8. Subcontracting\n\nWe also take on government & municipal contracts. Which service are you interested in?`,
      quickReplies: ['Excavation', 'Fencing', 'Renovations', 'Landscaping', 'Government contracts'],
    }),
  },
  // Quote
  {
    patterns: ['quote', 'pricing', 'price', 'cost', 'how much', 'estimate', 'bid', 'free'],
    respond: () => ({
      text: `We offer free consultations and quotes — no obligation.\n\n📞 Call us: ${COMPANY.phone1}\n📧 Email: ${COMPANY.email}\n📅 Or book a call online\n\nWe respond within 24 hours.`,
      quickReplies: ['Book a call', 'Fill out contact form'],
      link: { label: 'Request a Free Quote →', href: '/contact' },
    }),
  },
  // Contact info
  {
    patterns: ['contact', 'phone', 'number', 'email', 'reach', 'call', 'get in touch', 'talk'],
    respond: () => ({
      text: `Here's how to reach us:\n\n📞 ${COMPANY.phone1}\n📞 ${COMPANY.phone2}\n📧 ${COMPANY.email}\n📍 ${COMPANY.location}\n🕐 ${COMPANY.hours}`,
      quickReplies: ['Book an appointment', 'Get a quote'],
      link: { label: 'Contact Page →', href: '/contact' },
    }),
  },
  // Location / service area
  {
    patterns: ['where', 'location', 'area', 'service area', 'edmonton', 'alberta', 'city', 'travel', 'far'],
    respond: () => ({
      text: `We're based in Edmonton, AB and serve clients across all of Alberta.\n\n📍 Main office: Edmonton, AB\n\nWe've completed projects in Edmonton, Fort McMurray, Spruce Grove, St. Albert, Leduc, Nisku, Sherwood Park, Fort Saskatchewan, Beaumont, and surrounding areas.`,
      quickReplies: ['Get a quote', 'What services do you offer?'],
    }),
  },
  // Hours
  {
    patterns: ['hours', 'open', 'available', 'when', 'schedule', 'time', 'close'],
    respond: () => ({
      text: `We're available:\n\n🕐 Monday – Saturday: 7:00 AM – 6:00 PM\n\nFor urgent or after-hours matters, give us a call and we'll do our best to help.`,
      quickReplies: ['Call us', 'Book an appointment'],
    }),
  },
  // Government contracts
  {
    patterns: ['government', 'municipal', 'city contract', 'province', 'federal', 'public works', 'tender', 'rfp', 'bonded', 'bid'],
    respond: () => ({
      text: GOVERNMENT_RESPONSE,
      quickReplies: ['Contact about a contract', 'Safety certifications'],
      link: { label: 'Get in Touch →', href: '/contact' },
    }),
  },
  // Safety & certifications
  {
    patterns: ['safety', 'certified', 'certification', 'cor', 'wcb', 'insured', 'insurance', 'license', 'compliant', 'csts', 'h2s', 'whmis'],
    respond: () => ({
      text: SAFETY_RESPONSE,
      quickReplies: ['Government contracts', 'Get a quote'],
    }),
  },
  // About
  {
    patterns: ['about', 'who are you', 'company', 'history', 'founded', 'story', 'fort mcmurray', 'alex', 'ceo', 'owner', 'family'],
    respond: () => ({
      text: ABOUT_RESPONSE,
      quickReplies: ['What services do you offer?', 'Safety certifications'],
      link: { label: 'Our Full Story →', href: '/about' },
    }),
  },
  // Portfolio
  {
    patterns: ['portfolio', 'past work', 'projects', 'examples', 'photos', 'gallery', 'work'],
    respond: () => ({
      text: `We've completed 130+ projects across Alberta since 2020 — from residential fences to large-scale excavation and government contracts.\n\nProject types include exterior renovations, commercial construction, residential builds, excavation, fencing, and landscaping.`,
      quickReplies: ['View our work', 'Get a quote'],
      link: { label: 'View Portfolio →', href: '/portfolio' },
    }),
  },
  // Book appointment
  {
    patterns: ['book', 'appointment', 'schedule', 'calendar', 'meeting', 'consultation', 'call back'],
    respond: () => ({
      text: `You can book a free 30-minute phone consultation directly on our contact page.\n\nPick a date and time that works for you — Mon–Fri, 10AM–5PM Mountain Time. We'll call you.`,
      quickReplies: ['Contact info'],
      link: { label: 'Book a Call →', href: '/contact#booking' },
    }),
  },
  // Thank you
  {
    patterns: ['thank', 'thanks', 'appreciate', 'awesome', 'great', 'perfect', 'helpful'],
    respond: () => ({
      text: `Happy to help! 👷 If you have more questions, we're always here.\n\nReady to get started on your project?`,
      quickReplies: ['Get a free quote', 'Contact info'],
      link: { label: 'Request a Quote →', href: '/contact' },
    }),
  },
]

function getBotResponse(input: string): Message {
  const lower = input.toLowerCase().trim()

  // Check for specific service
  const svc = matchService(lower)
  if (svc && SERVICES[svc]) {
    const s = SERVICES[svc]
    return {
      id: Date.now().toString(),
      from: 'bot',
      text: `**${svc.charAt(0).toUpperCase() + svc.slice(1)}**\n\n${s.desc}\n\n📋 ${s.bullets}`,
      quickReplies: ['Get a quote', 'Other services', 'Contact info'],
      link: { label: 'Request a Quote →', href: '/contact' },
    }
  }

  // Check intents
  for (const intent of intents) {
    if (intent.patterns.some((p) => lower.includes(p))) {
      const res = intent.respond(lower)
      return { id: Date.now().toString(), from: 'bot', ...res }
    }
  }

  // Fallback
  return {
    id: Date.now().toString(),
    from: 'bot',
    text: `I'm not sure about that one, but our team can answer any question you have!\n\n📞 ${COMPANY.phone1}\n📧 ${COMPANY.email}\n\nOr fill out our contact form and we'll get back to you within 24 hours.`,
    quickReplies: ['What services do you offer?', 'Get a quote', 'Contact info'],
    link: { label: 'Contact Us →', href: '/contact' },
  }
}

const INITIAL_MESSAGE: Message = {
  id: 'init',
  from: 'bot',
  text: GREETING_RESPONSE,
  quickReplies: ['What services do you offer?', 'Get a quote', 'Contact info', 'Government contracts'],
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [open, messages])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMsg: Message = { id: Date.now().toString(), from: 'user', text: text.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const botMsg = getBotResponse(text)
      setTyping(false)
      setMessages((prev) => [...prev, botMsg])
    }, 600 + Math.random() * 400)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  // Format text with bold markdown and newlines
  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/)
      return (
        <span key={i}>
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j} className="text-white font-bold">{part}</strong> : part
          )}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      )
    })
  }

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-8 left-8 z-50 w-14 h-14 bg-brand hover:bg-brand-dark text-black flex items-center justify-center shadow-2xl shadow-brand/30 transition-colors duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Unread indicator */}
      {!open && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-[74px] left-[54px] z-50 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
        >
          <span className="text-white text-[9px] font-bold">1</span>
        </motion.div>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-28 left-8 z-50 w-[340px] sm:w-[380px] flex flex-col bg-surface-1 border border-brand/20 shadow-2xl shadow-black/60 overflow-hidden"
            style={{ maxHeight: 'calc(100vh - 160px)', height: 520 }}
          >
            {/* Header */}
            <div className="bg-brand px-4 py-3 flex items-center gap-3 flex-shrink-0">
              <div className="w-8 h-8 bg-black/20 flex items-center justify-center flex-shrink-0">
                <HardHat size={18} className="text-black" />
              </div>
              <div>
                <p className="font-bold text-black text-sm leading-tight">25/7 Construction</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-900 rounded-full" />
                  <p className="text-black/70 text-xs">Online · Replies instantly</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-bg-base">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.from === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] px-3 py-2.5 text-sm leading-relaxed ${
                      msg.from === 'user'
                        ? 'bg-brand text-black font-medium'
                        : 'bg-surface-2 text-gray-200 border border-white/5'
                    }`}
                  >
                    {formatText(msg.text)}
                  </div>

                  {msg.link && msg.from === 'bot' && (
                    <Link
                      href={msg.link.href}
                      className="mt-1.5 flex items-center gap-1 text-brand text-xs font-bold hover:underline"
                      onClick={() => setOpen(false)}
                    >
                      {msg.link.label} <ArrowRight size={11} />
                    </Link>
                  )}

                  {msg.quickReplies && msg.from === 'bot' && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {msg.quickReplies.map((qr) => (
                        <button
                          key={qr}
                          onClick={() => sendMessage(qr)}
                          className="text-xs border border-brand/40 text-brand hover:bg-brand hover:text-black px-2.5 py-1 transition-colors duration-150 font-medium"
                        >
                          {qr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex items-start">
                  <div className="bg-surface-2 border border-white/5 px-3 py-2.5 flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 bg-brand/60 rounded-full block"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 bg-surface-1 border-t border-white/5 flex-shrink-0">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about services, quotes..."
                className="flex-1 bg-bg-base border border-white/10 text-white text-sm px-3 py-2 placeholder-gray-600 focus:outline-none focus:border-brand/50 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-9 h-9 bg-brand hover:bg-brand-dark disabled:opacity-40 disabled:cursor-not-allowed text-black flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
