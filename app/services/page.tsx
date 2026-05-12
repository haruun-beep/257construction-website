'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, CheckCircle, HardHat } from 'lucide-react'
import type { Metadata } from 'next'

const IMAGES = {
  serviceExcavation: 'https://static.wixstatic.com/media/618f79_f87ecf3ecec44301974780f939a6598e~mv2.jpeg',  // Kubota excavator on site
  serviceFencing: 'https://static.wixstatic.com/media/618f79_15b0eea91c20474b99a03cf231433c05~mv2.jpg',      // wood privacy fence installed
  serviceRenovations: 'https://static.wixstatic.com/media/618f79_c92fac31af7b4b9e801fc7b295a482ca~mv2.jpeg', // worker on house exterior
  serviceLandscape: 'https://static.wixstatic.com/media/11062b_cdc62dad3d5945fb9c7aedaaadf3fbbf~mv2.jpg',    // aerial landscaped park
  serviceDitch: 'https://static.wixstatic.com/media/11062b_9870f6f1174c4346a596dfcc7149096bf000.jpg',        // tractor/combine in field
  siteManagement: 'https://static.wixstatic.com/media/c837a6_eb05560eb8764160936d511f9cb1af73~mv2.jpg',      // construction managers on site
  project1: 'https://static.wixstatic.com/media/618f79_6deaa5ce90cb496e88f9c342ee1df818~mv2.png',           // CAT bulldozers grading road
  siteAction1: 'https://static.wixstatic.com/media/11062b_7c13d53ba87a43c5b3ff8e73ee261a61~mv2.jpg',        // skid steer loader on site
}

const services = [
  {
    id: 'excavation',
    title: 'EXCAVATION & DIRT MOVING',
    img: IMAGES.serviceExcavation,
    description: 'Our excavation team handles land clearing, grading, trenching, and large-scale dirt moving with precision machinery. Whether it\'s site prep for a new build or infrastructure work — we move the earth to match your plans. We operate modern, well-maintained equipment and bring years of Alberta terrain experience to every dig.',
    bullets: ['Site Preparation', 'Land Clearing & Grubbing', 'Grading & Leveling', 'Trenching & Utilities', 'Dirt Hauling & Disposal', 'Rough Grading for Foundations'],
    cta: 'Request Excavation Quote',
    gov: true,
  },
  {
    id: 'fencing',
    title: 'FENCING',
    img: IMAGES.serviceFencing,
    description: 'From decorative residential wood fences to heavy-duty commercial chain-link and security perimeters, we install fencing built to last Alberta\'s harsh weather. Every post is set right, every panel is level, and every gate swings smooth. We\'ve fenced everything from backyards to industrial yards.',
    bullets: ['Wood Privacy Fencing', 'Chain-Link & Galvanized', 'Privacy Panels', 'Commercial Perimeter Security', 'Post & Rail', 'Agricultural Fencing'],
    cta: 'Get a Fencing Quote',
    gov: false,
  },
  {
    id: 'renovations',
    title: 'RENOVATIONS',
    img: IMAGES.serviceRenovations,
    description: 'Residential and commercial renovation specialists. Whether it\'s a kitchen refresh, a full-gut commercial remodel, or exterior upgrades — our crew brings your vision to life with craftsmanship you can see and quality you can count on. We manage the project from demo to final finish.',
    bullets: ['Interior Renovations', 'Exterior Upgrades', 'Commercial Buildouts', 'Full Property Overhauls', 'Custom Finishes', 'Structural Work'],
    cta: 'Start Your Renovation',
    gov: false,
  },
  {
    id: 'landscape',
    title: 'LANDSCAPE CONSTRUCTION',
    img: IMAGES.serviceLandscape,
    description: 'We transform outdoor spaces with professional hardscaping, softscaping, retaining walls, and site beautification. Functional, beautiful, and built to last Alberta seasons. Whether it\'s a residential backyard or a commercial property, we design and build landscapes that make an impression.',
    bullets: ['Hardscaping & Paving', 'Softscaping & Planting', 'Retaining Walls', 'Gravel & Drainage Systems', 'Yard Grading', 'Commercial Site Beautification'],
    cta: 'Plan Your Landscape',
    gov: false,
  },
  {
    id: 'ditch',
    title: 'DITCH MOWING',
    img: IMAGES.serviceDitch,
    description: 'Efficient, reliable ditch mowing and land maintenance for agricultural, residential, and municipal properties across Alberta. We keep your land clear, safe, and compliant with local regulations. Our machines handle overgrown ditches, roadside slopes, and rough terrain that standard equipment can\'t touch.',
    bullets: ['Roadside & Municipal Ditches', 'Agricultural Land', 'Residential Lots', 'Municipal & Government Contracts', 'Seasonal Maintenance Programs', 'Steep Slope Mowing'],
    cta: 'Book Ditch Mowing',
    gov: true,
  },
  {
    id: 'site-management',
    title: 'SITE MANAGEMENT',
    img: IMAGES.siteManagement,
    description: 'Full construction site oversight — from planning and coordination to daily supervision. We manage the moving parts so your project stays on time and on budget. Our site managers have handled projects from small residential jobs to large government contracts. You deal with one point of contact. We handle everything else.',
    bullets: ['Project Planning & Scheduling', 'Crew Coordination', 'Safety Compliance & COR', 'Daily Progress Reporting', 'Subcontractor Management', 'Budget Tracking'],
    cta: 'Discuss Site Management',
    gov: true,
  },
  {
    id: 'land-development',
    title: 'LAND DEVELOPMENT',
    img: IMAGES.project1,
    description: 'Turning raw land into ready-to-build parcels. We handle clearing, grading, road prep, and utility coordination for residential and commercial developments across Alberta. Whether it\'s a 5-lot subdivision or a 500-acre industrial parcel — we have the equipment, the experience, and the team to develop it right.',
    bullets: ['Land Clearing & Reclamation', 'Access Road Building', 'Utility Trench Prep', 'Parcel Grading & Drainage', 'Development Coordination', 'Environmental Compliance'],
    cta: 'Get a Development Quote',
    gov: true,
  },
  {
    id: 'subcontracting',
    title: 'SUBCONTRACTING',
    img: IMAGES.siteAction1,
    description: '25/7 Construction partners with general contractors and developers as a reliable, professional subcontractor for dirt work, excavation, fencing, and landscaping. We show up when scheduled, perform our scope, and don\'t create problems for the prime contractor. Our reputation is built on being the sub you call back.',
    bullets: ['Dirt Work & Bulk Excavation', 'Excavation Support', 'Fencing Installation', 'Landscape Subcontracting', 'Long-Term Partnership Programs', 'Flexible Mobilization'],
    cta: 'Explore Subcontracting',
    gov: false,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function ServicesPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[60vh] flex items-end pb-20 overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src={IMAGES.serviceExcavation} alt="Excavation services" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-black/30 to-transparent" />
        </motion.div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-brand text-xs uppercase tracking-[0.3em] mb-3"
          >
            What We Offer
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-7xl md:text-9xl tracking-wider"
          >
            OUR <span className="text-brand">SERVICES</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-300 text-lg mt-4 max-w-xl"
          >
            From the ground up — we handle every phase of your project.
          </motion.p>
        </div>
      </section>

      {/* Services */}
      <div className="bg-bg-base">
        {services.map((service, i) => {
          const isEven = i % 2 === 0
          return (
            <motion.section
              key={service.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
              className={`py-20 px-6 border-b border-white/5 ${isEven ? 'bg-bg-base' : 'bg-surface-1'}`}
            >
              <div className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                {/* Image */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: isEven ? -80 : 80 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={service.img}
                      alt={service.title}
                      width={700}
                      height={500}
                      className="object-cover w-full aspect-[4/3] hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {service.gov && (
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-brand text-black text-xs font-bold uppercase tracking-widest px-3 py-1.5">
                        <HardHat size={12} /> Gov. Contract Ready
                      </div>
                    )}
                  </div>
                  {/* Corner accents */}
                  <div className={`absolute -top-3 w-12 h-12 border-t-4 border-brand ${isEven ? '-left-3 border-l-4' : '-right-3 border-r-4'}`} />
                  <div className={`absolute -bottom-3 w-12 h-12 border-b-4 border-brand ${isEven ? '-right-3 border-r-4' : '-left-3 border-l-4'}`} />
                </motion.div>

                {/* Content */}
                <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                  <motion.p variants={fadeUp} className="text-brand text-xs uppercase tracking-[0.3em] mb-3">
                    Service {String(i + 1).padStart(2, '0')}
                  </motion.p>
                  <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl tracking-wider text-white mb-6 relative inline-block">
                    {service.title}
                    <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-brand" />
                  </motion.h2>
                  <motion.p variants={fadeUp} className="text-gray-300 leading-relaxed mb-6">
                    {service.description}
                  </motion.p>
                  <motion.ul variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                    {service.bullets.map((b, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-300 text-sm">
                        <CheckCircle size={14} className="text-brand flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </motion.ul>
                  <motion.div variants={fadeUp}>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-3 bg-brand hover:bg-brand-dark text-black font-bold text-sm uppercase tracking-widest px-6 py-3.5 transition-all duration-200 hover:scale-105"
                    >
                      {service.cta} <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          )
        })}
      </div>

      {/* CTA Banner */}
      <section className="py-24 bg-brand">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-5xl md:text-7xl tracking-wider text-black mb-6">
            NOT SURE WHAT YOU NEED?
          </h2>
          <p className="text-black/70 text-lg mb-10 max-w-xl mx-auto">
            Our team will assess your project and recommend the right approach. Free consultations available — no pressure, no obligation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-black text-white hover:bg-surface-1 font-bold text-sm uppercase tracking-widest px-10 py-5 transition-all duration-200 hover:scale-105 text-base"
          >
            Talk To Our Team <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
