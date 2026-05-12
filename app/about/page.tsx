'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, CheckCircle, Shield, Award, Heart, Star } from 'lucide-react'
import AnimatedCounter from '@/components/AnimatedCounter'
import MarqueePartners from '@/components/MarqueePartners'

const IMAGES = {
  siteAction2: 'https://static.wixstatic.com/media/c837a6_eb05560eb8764160936d511f9cb1af73~mv2.jpg',  // 3 managers on site → hero
  teamSite1: 'https://static.wixstatic.com/media/c837a6_47223d00a4af4c01bde4b5a6b06ea3ad~mv2.jpg',    // house framing → our story
  siteAction1: 'https://static.wixstatic.com/media/c837a6_8a5b905c90f546a7aac3c212d86b60be~mv2.jpg',  // workers reviewing blueprints → CEO photo
  heroWide1: 'https://static.wixstatic.com/media/c837a6_fc28a5319ffc455fa1c27399ba1c58d9~mv2.jpg',    // residential subdivision (unused)
  siteAction3: 'https://static.wixstatic.com/media/11062b_7c13d53ba87a43c5b3ff8e73ee261a61~mv2.jpg',  // skid steer on site → safety section
}

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

const values = [
  {
    icon: Award,
    title: 'QUALITY',
    desc: 'We don\'t cut corners. Premium materials, skilled tradespeople, and relentless attention to detail — on every single job.',
  },
  {
    icon: Shield,
    title: 'INTEGRITY',
    desc: 'Honest quotes. Honest timelines. Honest communication. If something comes up, we tell you. No surprises on the invoice.',
  },
  {
    icon: Heart,
    title: 'CLIENT SATISFACTION',
    desc: 'We measure success by whether you\'d refer us to your neighbour. That standard drives every decision we make.',
  },
  {
    icon: Star,
    title: 'SAFETY',
    desc: 'COR certified. WCB compliant. Our crew goes home safe every day — and we build sites that protect everyone on them.',
  },
]

const certifications = [
  'Certificate of Recognition (COR) — Alberta Safety Councils',
  'WCB Alberta — Fully Compliant',
  'CSTS-09 — Construction Safety Training System',
  'First Aid Level 1 — All site supervisors',
  'Bonded & Fully Insured — All work types',
  'ISN Registered — Contractor compliance',
  'H2S Alive Certified Crew',
  'WHMIS 2015 Trained',
]

export default function AboutPage() {
  const heroRef = useRef(null)
  const storyRef = useRef(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const { scrollYProgress: storyScroll } = useScroll({ target: storyRef, offset: ['start end', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '30%'])
  const storyY = useTransform(storyScroll, [0, 1], ['-5%', '5%'])

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[60vh] flex items-end pb-20 overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src={IMAGES.siteAction2} alt="25/7 Construction crew" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-black/20 to-transparent" />
        </motion.div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand text-xs uppercase tracking-[0.3em] mb-3"
          >
            Family-Owned · Est. 2020
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-7xl md:text-9xl tracking-wider"
          >
            WHO WE <span className="text-brand">ARE</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-lg mt-4"
          >
            Family-owned. Alberta-built. Driven by quality.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-bg-base">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p variants={fadeUp} className="text-brand text-xs uppercase tracking-[0.3em] mb-4">
              Our Story
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-6xl tracking-wider text-white mb-8 relative inline-block">
              STARTED WITH A FENCE.<br />
              <span className="text-brand">BUILT A COMPANY.</span>
              <span className="absolute -bottom-2 left-0 w-2/3 h-1 bg-brand" />
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-300 leading-relaxed mb-4 text-lg">
              25/7 Construction started in Fort McMurray, building fences and doing right by our clients. Word spread. The work grew.
            </motion.p>
            <motion.p variants={fadeUp} className="text-gray-300 leading-relaxed mb-4">
              Today we&apos;re a full-service construction contractor based in Edmonton, operating across Alberta — handling everything from residential renovations to large-scale excavation, land development, and government contracts.
            </motion.p>
            <motion.p variants={fadeUp} className="text-gray-300 leading-relaxed mb-4">
              We&apos;re family-owned and plan to stay that way. That means you work directly with people who care about the result, not just the invoice. Every crew member is held to the same standard — show up, do the job right, leave the site better than you found it.
            </motion.p>
            <motion.p variants={fadeUp} className="text-gray-300 leading-relaxed mb-8">
              From ditch mowing contracts with Alberta municipalities to custom residential renovations in Edmonton — the standard never changes. Quality. Integrity. Safety. Client satisfaction. Every time.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              {['Licensed', 'Bonded', 'Insured', 'COR Certified', 'WCB Compliant'].map((tag) => (
                <span key={tag} className="border border-brand/40 text-brand text-xs font-bold uppercase tracking-wider px-3 py-1.5">
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            ref={storyRef}
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <motion.div style={{ y: storyY }}>
              <Image
                src={IMAGES.teamSite1}
                alt="25/7 Construction team"
                width={600}
                height={500}
                className="object-cover w-full"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-4 border-r-4 border-brand" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-4 border-l-4 border-brand" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface-1 border-y border-brand/20 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-brand/20">
            {[
              { end: 130, suffix: '+', label: 'Projects Completed' },
              { end: 17, suffix: '', label: 'Skilled Employees' },
              { end: 6, suffix: '', label: 'Business Partners' },
              { end: 4, suffix: '+', label: 'Years Operating' },
            ].map((stat, i) => (
              <div key={i} className="text-center md:px-8">
                <div className="font-heading text-5xl md:text-6xl text-brand tracking-wider">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-heading text-5xl md:text-7xl tracking-wider relative inline-block"
            >
              THE PEOPLE BEHIND THE WORK
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-brand" />
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* CEO */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 relative group overflow-hidden"
            >
              <Image
                src={IMAGES.siteAction1}
                alt="Alex Phimester — CEO of 25/7 Construction"
                width={700}
                height={450}
                className="object-cover w-full aspect-[4/3] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="inline-block bg-brand text-black text-xs font-bold uppercase tracking-widest px-3 py-1 mb-3">
                  CEO & Founder
                </div>
                <h3 className="font-heading text-3xl text-white tracking-wider mb-2">Alex Phimester</h3>
                <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                  Alex started 25/7 Construction with a work truck, a crew, and a commitment to doing construction the right way. He leads every project with the same standard — show up, work hard, deliver results. His hands-on approach and refusal to compromise on quality is the backbone of everything 25/7 stands for.
                </p>
              </div>
            </motion.div>

            {/* Placeholder team members */}
            {[1, 2].map((n) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: n * 0.1 }}
                className="relative group overflow-hidden bg-surface-2 border border-white/5 flex flex-col items-center justify-center aspect-[4/3]"
              >
                {/* TODO: Replace with actual team photos */}
                <div className="w-20 h-20 rounded-full bg-surface-3 border-2 border-brand/30 flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white/20">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
                <p className="font-heading text-lg text-white/30 tracking-wider">Team Member</p>
                <p className="text-brand/40 text-xs mt-1">Coming Soon</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-heading text-5xl md:text-7xl tracking-wider relative inline-block"
            >
              OUR VALUES
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-brand" />
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-bg-base border border-white/5 p-8 hover:border-brand/30 transition-all duration-300 group"
              >
                <value.icon size={36} className="text-brand mb-5 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading text-2xl tracking-wider text-white mb-4">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Certifications */}
      <section className="py-24 bg-bg-base border-y border-brand/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-brand text-xs uppercase tracking-[0.3em] mb-4">Safety & Compliance</p>
              <h2 className="font-heading text-4xl md:text-5xl tracking-wider text-white mb-6">
                SAFETY IS OUR FOUNDATION
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                In construction, safety isn&apos;t a checkbox — it&apos;s a culture. 25/7 Construction holds the Certificate of Recognition (COR) from the Alberta Safety Councils. COR is Alberta&apos;s highest voluntary occupational health and safety standard, and we&apos;re proud to carry it.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8">
                Every team member is trained, every site is compliant, and every project is managed with safety as the first priority — not an afterthought. It protects our crew, your property, and your project timeline.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle size={14} className="text-brand flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-xs leading-relaxed">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Image
                src={IMAGES.siteAction3}
                alt="Safe construction site"
                width={600}
                height={500}
                className="object-cover w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-4 border-r-4 border-brand" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-4 border-l-4 border-brand" />
              {/* Safety badge */}
              <div className="absolute bottom-8 left-8 bg-bg-base border border-brand/30 p-5">
                <div className="font-heading text-5xl text-brand tracking-wider">0</div>
                <p className="text-gray-300 text-xs uppercase tracking-wider">Lost-Time Incidents</p>
                <p className="text-brand/60 text-xs">2024 — 25/7 Construction</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <MarqueePartners />

      {/* CTA */}
      <section className="py-24 bg-brand">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading text-5xl md:text-7xl tracking-wider text-black mb-6">
            READY TO WORK WITH A TEAM THAT DELIVERS?
          </h2>
          <p className="text-black/70 text-lg mb-10">
            Quality construction. Real results. Let&apos;s talk about your project today.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-black text-white hover:bg-surface-1 font-bold text-sm uppercase tracking-widest px-10 py-5 transition-all duration-200 hover:scale-105 text-base"
          >
            Contact Us Today <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
