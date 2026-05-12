'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import {
  ArrowDown, ArrowRight, Shield, Award, Users, MapPin,
  Shovel, Fence, Hammer, Trees, Droplets, ClipboardList,
  HardHat, CheckCircle, FileText, BadgeCheck
} from 'lucide-react'
import AnimatedCounter from '@/components/AnimatedCounter'
import MarqueePartners from '@/components/MarqueePartners'

const IMAGES = {
  heroWide1: 'https://static.wixstatic.com/media/c837a6_fc28a5319ffc455fa1c27399ba1c58d9~mv2.jpg',
  heroWide2: 'https://static.wixstatic.com/media/c837a6_ff17ef7473f04d19bbacf6161681a26c~mv2.jpg',
  teamSite1: 'https://static.wixstatic.com/media/c837a6_47223d00a4af4c01bde4b5a6b06ea3ad~mv2.jpg',
  portfolioExterior: 'https://static.wixstatic.com/media/618f79_15b0eea91c20474b99a03cf231433c05~mv2.jpg',
  portfolioCommercial: 'https://static.wixstatic.com/media/618f79_f87ecf3ecec44301974780f939a6598e~mv2.jpeg',
  portfolioResidential: 'https://static.wixstatic.com/media/618f79_c92fac31af7b4b9e801fc7b295a482ca~mv2.jpeg',
  serviceExcavation: 'https://static.wixstatic.com/media/11062b_9870f6f1174c4346a596dfcc7149096bf000.jpg',
  serviceFencing: 'https://static.wixstatic.com/media/c837a6_922c11766e1248a4ba69c5b5747d336a~mv2.jpg',
  serviceRenovations: 'https://static.wixstatic.com/media/c837a6_9045f280be72474491617fe62485c878~mv2.jpg',
  serviceLandscape: 'https://static.wixstatic.com/media/c837a6_8a5b905c90f546a7aac3c212d86b60be~mv2.jpg',
  serviceDitch: 'https://static.wixstatic.com/media/11062b_cdc62dad3d5945fb9c7aedaaadf3fbbf~mv2.jpg',
  siteAction1: 'https://static.wixstatic.com/media/c837a6_ae4f4741c31844bfba715de2983231fdf000.jpg',
}

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const services = [
  { icon: Shovel, name: 'Excavation', desc: 'Precision dirt work & land clearing', img: IMAGES.serviceExcavation },
  { icon: Fence, name: 'Fencing', desc: 'Residential & commercial solutions', img: IMAGES.serviceFencing },
  { icon: Hammer, name: 'Renovations', desc: 'Interior & exterior overhauls', img: IMAGES.serviceRenovations },
  { icon: Trees, name: 'Landscaping', desc: 'Hardscaping & site beautification', img: IMAGES.serviceLandscape },
  { icon: Droplets, name: 'Ditch Mowing', desc: 'Agricultural & municipal land care', img: IMAGES.serviceDitch },
  { icon: ClipboardList, name: 'Site Management', desc: 'Full-project oversight & coordination', img: IMAGES.siteAction1 },
]

const pillars = [
  { icon: Award, num: '01', title: 'QUALITY CRAFTSMANSHIP', desc: 'Premium materials and skilled tradespeople on every job. We build it right the first time.' },
  { icon: Shield, num: '02', title: 'SAFETY FIRST', desc: 'COR certified. WCB compliant. Zero-compromise safety standards on every site, every day.' },
  { icon: Users, num: '03', title: 'CLIENT-FIRST', desc: 'Your vision drives every decision. We don\'t stop until you\'re satisfied — and your neighbours are impressed.' },
  { icon: MapPin, num: '04', title: 'ALBERTA PROUD', desc: 'Local team, local knowledge. From Fort McMurray roots to Edmonton-based operations across the province.' },
]

const projects = [
  { img: IMAGES.portfolioExterior, cat: 'Exterior Renovation', loc: 'Edmonton, AB' },
  { img: IMAGES.portfolioCommercial, cat: 'Commercial Construction', loc: 'Fort McMurray, AB' },
  { img: IMAGES.portfolioResidential, cat: 'Residential Build', loc: 'Alberta' },
]

const govServices = [
  'Municipal Ditch Mowing Contracts',
  'Public Works Excavation',
  'Infrastructure Site Preparation',
  'Road & Access Building',
  'Government Land Development',
  'Bonded & Fully Insured',
]

function SectionHeading({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.h2
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.7 }}
      className={`font-heading text-5xl md:text-7xl tracking-wider relative inline-block ${light ? 'text-white' : 'text-white'}`}
    >
      {children}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        style={{ originX: 0 }}
        className="absolute -bottom-2 left-0 w-full h-1 bg-brand block"
      />
    </motion.h2>
  )
}

export default function HomePage() {
  const heroRef = useRef(null)
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0])

  const ctaBgRef = useRef(null)
  const { scrollYProgress: ctaScroll } = useScroll({ target: ctaBgRef, offset: ['start end', 'end start'] })
  const ctaY = useTransform(ctaScroll, [0, 1], ['-15%', '15%'])

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden noise-overlay">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src={IMAGES.heroWide1}
            alt="25/7 Construction heavy equipment on job site"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
        </motion.div>

        {/* Orange diagonal stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-32 orange-stripe pointer-events-none z-10" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-brand text-lg md:text-2xl tracking-[0.3em] mb-6"
          >
            EDMONTON, ALBERTA
          </motion.p>

          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-7xl md:text-9xl lg:text-[11rem] tracking-wider leading-none"
            >
              BUILDING THE{' '}
              <span className="text-brand">FUTURE</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Edmonton&apos;s trusted construction team — excavation, renovations, fencing, landscaping, government contracts & more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="bg-brand hover:bg-brand-dark text-black font-bold text-sm uppercase tracking-widest px-8 py-4 transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-brand/40"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/portfolio"
              className="border border-white/50 hover:border-brand text-white hover:text-brand font-bold text-sm uppercase tracking-widest px-8 py-4 transition-all duration-200"
            >
              View Our Work
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce2"
        >
          <ArrowDown size={28} className="text-brand" />
        </motion.div>
      </section>

      {/* ─── STATS BAR ────────────────────────────────────────────── */}
      <section className="bg-surface-1 border-y border-brand/20 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-brand/20">
            {[
              { end: 130, suffix: '+', label: 'Projects Completed' },
              { end: 17, suffix: '', label: 'Skilled Employees' },
              { end: 6, suffix: '', label: 'Business Partners' },
              { end: 2020, suffix: '', label: 'Est. Year' },
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

      {/* ─── ABOUT TEASER ─────────────────────────────────────────── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative">
              <Image
                src={IMAGES.teamSite1}
                alt="25/7 Construction team on site"
                width={600}
                height={450}
                className="object-cover w-full"
              />
              {/* Orange frame accent */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-brand" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-brand" />
              {/* Badge */}
              <div className="absolute -bottom-6 left-8 bg-brand text-black font-heading text-xl tracking-wider px-5 py-3">
                EST. 2020
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.p variants={fadeUp} className="text-brand text-xs uppercase tracking-[0.3em] mb-4">
              Who We Are
            </motion.p>
            <motion.div variants={fadeUp} className="mb-6">
              <SectionHeading>FAMILY-OWNED. RESULTS-DRIVEN.</SectionHeading>
            </motion.div>
            <motion.p variants={fadeUp} className="text-gray-300 leading-relaxed mb-4">
              Founded in Fort McMurray and grown into one of Alberta&apos;s most trusted construction contractors, 25/7 Construction brings quality, integrity, and client satisfaction to every job site.
            </motion.p>
            <motion.p variants={fadeUp} className="text-gray-300 leading-relaxed mb-8">
              From residential fences to large-scale government excavation — if it needs to be built, we build it right. Every time.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/about"
                className="flex items-center gap-3 text-brand font-bold text-sm uppercase tracking-widest group"
              >
                Learn Our Story
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES PREVIEW ─────────────────────────────────────── */}
      <section className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionHeading>WHAT WE DO</SectionHeading>
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="relative group overflow-hidden aspect-[4/3] cursor-pointer"
              >
                <Image
                  src={service.img}
                  alt={service.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <service.icon size={24} className="text-brand mb-3" />
                  <h3 className="font-heading text-2xl tracking-wider text-white">{service.name}</h3>
                  <p className="text-gray-300 text-sm mt-1">{service.desc}</p>
                  <div className="flex items-center gap-2 mt-3 text-brand text-sm font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Learn More <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 border border-brand text-brand hover:bg-brand hover:text-black font-bold text-sm uppercase tracking-widest px-8 py-4 transition-all duration-200"
            >
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── GOVERNMENT BIDS ──────────────────────────────────────── */}
      <section className="py-24 px-6 bg-bg-base border-y border-brand/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.p variants={fadeUp} className="text-brand text-xs uppercase tracking-[0.3em] mb-4">
                Government & Municipal
              </motion.p>
              <motion.div variants={fadeUp} className="mb-6">
                <SectionHeading>WE BID ON GOVERNMENT CONTRACTS</SectionHeading>
              </motion.div>
              <motion.p variants={fadeUp} className="text-gray-300 leading-relaxed mb-4">
                25/7 Construction is fully equipped and experienced to bid on provincial, municipal, and federal construction contracts across Alberta. We meet all bonding, insurance, and compliance requirements — and we deliver on time, every time.
              </motion.p>
              <motion.p variants={fadeUp} className="text-gray-300 leading-relaxed mb-8">
                From municipal ditch mowing contracts to public infrastructure excavation and land development — government projects are in our wheelhouse. Our team understands the documentation, timelines, and accountability that public-sector work demands.
              </motion.p>
              <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {govServices.map((item, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-brand flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={fadeUp}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-brand hover:bg-brand-dark text-black font-bold text-sm uppercase tracking-widest px-8 py-4 transition-all duration-200"
                >
                  Discuss a Contract <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: FileText, title: 'Bid-Ready', desc: 'Pre-qualified for provincial and municipal tendering processes' },
                { icon: BadgeCheck, title: 'Fully Bonded', desc: 'Bonded, insured, and WCB Alberta compliant for all contract types' },
                { icon: HardHat, title: 'COR Certified', desc: 'Certificate of Recognition — Alberta\'s highest safety standard' },
                { icon: Award, title: 'Proven Track Record', desc: '130+ completed projects, on time and on budget' },
              ].map((item, i) => (
                <div key={i} className="bg-surface-1 border border-white/5 p-6 hover:border-brand/30 transition-colors">
                  <item.icon size={28} className="text-brand mb-3" />
                  <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ────────────────────────────────────── */}
      <section className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionHeading>OUR WORK SPEAKS FOR ITSELF</SectionHeading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative group overflow-hidden aspect-square cursor-pointer"
              >
                <Image
                  src={project.img}
                  alt={project.cat}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/20 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-brand text-xs font-bold uppercase tracking-widest mb-1">{project.loc}</p>
                  <p className="font-heading text-xl text-white tracking-wider">{project.cat}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-brand text-black font-bold text-xs uppercase tracking-widest px-4 py-2">
                    View Project
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-3 border border-brand text-brand hover:bg-brand hover:text-black font-bold text-sm uppercase tracking-widest px-8 py-4 transition-all duration-200"
            >
              Explore Full Portfolio <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ────────────────────────────────────────── */}
      <section className="py-24 bg-bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionHeading>WHY CHOOSE US</SectionHeading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="relative bg-surface-1 p-8 border border-white/5 hover:border-brand/30 transition-all duration-300 group"
              >
                <p className="font-heading text-7xl text-brand/10 group-hover:text-brand/20 transition-colors absolute top-4 right-4 leading-none">
                  {pillar.num}
                </p>
                <pillar.icon size={32} className="text-brand mb-5" />
                <h3 className="font-heading text-xl tracking-wider text-white mb-3">{pillar.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SAFETY SECTION ───────────────────────────────────────── */}
      <section className="py-24 bg-surface-1 border-y border-brand/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="relative bg-bg-base p-10 border border-brand/20">
                <div className="absolute -top-1 -left-1 w-16 h-16 border-t-4 border-l-4 border-brand" />
                <div className="absolute -bottom-1 -right-1 w-16 h-16 border-b-4 border-r-4 border-brand" />
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { label: 'Lost-Time Incidents', value: '0', year: '2024' },
                    { label: 'Safety Certifications', value: 'COR', year: 'Certified' },
                    { label: 'WCB Status', value: '✓', year: 'Compliant' },
                    { label: 'Crew Trained', value: 'CSTS', year: 'Certified' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="font-heading text-5xl text-brand tracking-wider">{stat.value}</div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider mt-1">{stat.label}</p>
                      <p className="text-brand/60 text-xs mt-0.5">{stat.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="order-1 lg:order-2"
            >
              <motion.p variants={fadeUp} className="text-brand text-xs uppercase tracking-[0.3em] mb-4">
                Safety Culture
              </motion.p>
              <motion.div variants={fadeUp} className="mb-6">
                <SectionHeading>SAFETY ISN&apos;T A POLICY. IT&apos;S WHO WE ARE.</SectionHeading>
              </motion.div>
              <motion.p variants={fadeUp} className="text-gray-300 leading-relaxed mb-4">
                Every crew member at 25/7 Construction goes home safe. That&apos;s not a tagline — it&apos;s a standard we enforce on every single job site, every single day.
              </motion.p>
              <motion.p variants={fadeUp} className="text-gray-300 leading-relaxed mb-6">
                We hold the Certificate of Recognition (COR) from Alberta — the province&apos;s gold standard for construction safety. Our crews are CSTS-trained, WCB compliant, and equipped with full PPE. Daily safety tailgates. Rigorous incident reporting. Zero tolerance for unsafe conditions.
              </motion.p>
              <motion.div variants={stagger} className="space-y-3 mb-8">
                {[
                  'Certificate of Recognition (COR) — Alberta',
                  'WCB Alberta Fully Compliant',
                  'CSTS-09 Certified Crew',
                  'Daily on-site safety tailgates',
                  'Full PPE standards enforced',
                  'Incident reporting & hazard identification protocols',
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-center gap-3">
                    <Shield size={14} className="text-brand flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── PARTNERS ─────────────────────────────────────────────── */}
      <MarqueePartners />

      {/* ─── CTA BANNER ───────────────────────────────────────────── */}
      <section ref={ctaBgRef} className="relative py-32 overflow-hidden">
        <motion.div style={{ y: ctaY }} className="absolute inset-0">
          <Image
            src={IMAGES.heroWide2}
            alt="Construction site"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-brand/40" />
        </motion.div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl tracking-wider mb-6"
          >
            READY TO BUILD SOMETHING <span className="text-brand">GREAT?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-300 text-lg mb-10 max-w-xl mx-auto"
          >
            Get in touch today for a free consultation and quote. We respond within 24 hours.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="bg-brand hover:bg-brand-dark text-black font-bold text-sm uppercase tracking-widest px-10 py-5 transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-brand/40 text-lg"
            >
              Start Your Project
            </Link>
            <a
              href="tel:8254612378"
              className="border border-white/50 hover:border-white text-white font-bold text-sm uppercase tracking-widest px-10 py-5 transition-all duration-200 text-lg"
            >
              Call 825-461-2378
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
