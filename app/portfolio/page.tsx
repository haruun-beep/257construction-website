'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import AnimatedCounter from '@/components/AnimatedCounter'

const IMAGES = {
  fence: '/images/residential-yard-fence.jpg.jpg',
  gravelLandscape: '/images/gravel-landscape.jpg.jpg',
  gradersWinter: '/images/graders-winter.jpg.jpg',
  demolitionSkidsteer: '/images/demolition-skidsteer.jpg.jpg',
  workerExterior: 'https://static.wixstatic.com/media/618f79_c92fac31af7b4b9e801fc7b295a482ca~mv2.jpeg',
  housesRow: 'https://static.wixstatic.com/media/c837a6_9045f280be72474491617fe62485c878~mv2.jpg',
  parkAerial: 'https://static.wixstatic.com/media/11062b_cdc62dad3d5945fb9c7aedaaadf3fbbf~mv2.jpg',
  houseFraming: 'https://static.wixstatic.com/media/c837a6_47223d00a4af4c01bde4b5a6b06ea3ad~mv2.jpg',
  framingAerial: 'https://static.wixstatic.com/media/c837a6_ae4f4741c31844bfba715de2983231fdf000.jpg',
  catBulldozers: 'https://static.wixstatic.com/media/618f79_6deaa5ce90cb496e88f9c342ee1df818~mv2.png',
  managersOnSite: 'https://static.wixstatic.com/media/c837a6_eb05560eb8764160936d511f9cb1af73~mv2.jpg',
  modernBuilding: 'https://static.wixstatic.com/media/c837a6_0c85a01871584b379bdb4a5f261ddf53~mv2.jpg',
  officeRender: 'https://static.wixstatic.com/media/c837a6_922c11766e1248a4ba69c5b5747d336a~mv2.jpg',
  suburbanAerial: 'https://static.wixstatic.com/media/c837a6_fc28a5319ffc455fa1c27399ba1c58d9~mv2.jpg',
}

const allProjects = [
  { img: IMAGES.fence, cat: 'Fencing', loc: 'Edmonton, AB', year: '2024' },
  { img: IMAGES.gravelLandscape, cat: 'Landscaping', loc: 'Alberta', year: '2025' },
  { img: IMAGES.gradersWinter, cat: 'Excavation', loc: 'Edmonton, AB', year: '2025' },
  { img: IMAGES.demolitionSkidsteer, cat: 'Exterior Renovations', loc: 'Alberta', year: '2025' },
  { img: IMAGES.workerExterior, cat: 'Exterior Renovations', loc: 'Edmonton, AB', year: '2024' },
  { img: IMAGES.catBulldozers, cat: 'Excavation', loc: 'Leduc County, AB', year: '2023' },
  { img: IMAGES.parkAerial, cat: 'Landscaping', loc: 'St. Albert, AB', year: '2024' },
  { img: IMAGES.suburbanAerial, cat: 'Residential', loc: 'Spruce Grove, AB', year: '2024' },
  { img: IMAGES.officeRender, cat: 'Commercial Construction', loc: 'Edmonton, AB', year: '2022' },
  { img: IMAGES.framingAerial, cat: 'Residential', loc: 'Nisku, AB', year: '2024' },
  { img: IMAGES.managersOnSite, cat: 'Commercial Construction', loc: 'Sherwood Park, AB', year: '2023' },
  { img: IMAGES.housesRow, cat: 'Residential', loc: 'Calgary, AB', year: '2022' },
  { img: IMAGES.houseFraming, cat: 'Exterior Renovations', loc: 'Fort Saskatchewan, AB', year: '2024' },
  { img: IMAGES.modernBuilding, cat: 'Commercial Construction', loc: 'Beaumont, AB', year: '2023' },
]

const categories = ['All', 'Exterior Renovations', 'Commercial Construction', 'Residential', 'Excavation', 'Fencing', 'Landscaping']

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const filtered = activeFilter === 'All'
    ? allProjects
    : allProjects.filter((p) => p.cat === activeFilter)

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[60vh] flex items-end pb-20 overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src={IMAGES.catBulldozers} alt="Construction portfolio" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-black/20 to-transparent" />
        </motion.div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-brand text-xs uppercase tracking-[0.3em] mb-3"
          >
            130+ Projects Completed
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-7xl md:text-9xl tracking-wider"
          >
            OUR <span className="text-brand">WORK</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-300 text-lg mt-4 max-w-xl"
          >
            130+ projects completed across Alberta. Here&apos;s a look at what we build.
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-surface-1 border-b border-white/5 sticky top-[60px] z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 overflow-x-auto">
          <div className="flex gap-2 whitespace-nowrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`relative text-xs font-bold uppercase tracking-widest px-4 py-2.5 transition-all duration-200 ${
                  activeFilter === cat
                    ? 'bg-brand text-black'
                    : 'text-gray-400 hover:text-white border border-white/10 hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={`${project.img}-${i}`}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative group overflow-hidden aspect-square cursor-pointer"
                >
                  <Image
                    src={project.img}
                    alt={project.cat}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  {/* Hover overlay slides up */}
                  <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-1.5 mb-2">
                      <MapPin size={12} className="text-brand" />
                      <span className="text-brand text-xs font-bold uppercase tracking-wider">{project.loc}</span>
                    </div>
                    <h3 className="font-heading text-xl text-white tracking-wider">{project.cat}</h3>
                    <p className="text-gray-400 text-xs mt-1">{project.year}</p>
                  </div>
                  {/* Hover shine */}
                  <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition-colors duration-500" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Count Banner */}
      <section className="py-14 bg-surface-1 border-y border-brand/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-heading text-4xl md:text-6xl tracking-wider">
            <span className="text-brand">
              <AnimatedCounter end={130} suffix="+" />
            </span>{' '}
            PROJECTS COMPLETED ACROSS ALBERTA
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-bg-base">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading text-5xl md:text-7xl tracking-wider mb-6"
          >
            IMPRESSED BY WHAT YOU SEE?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-lg mb-10"
          >
            Let&apos;s build your next project together. Free consultation, no obligation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-brand hover:bg-brand-dark text-black font-bold text-sm uppercase tracking-widest px-10 py-5 transition-all duration-200 hover:scale-105 text-base"
            >
              Get Your Free Quote <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
