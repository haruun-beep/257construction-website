'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-bg-base border-b border-brand/30 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-heading text-2xl text-brand tracking-wider hover:text-brand-light transition-colors">
            25/7 CONSTRUCTION
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-semibold uppercase tracking-widest transition-colors duration-200 group ${
                  pathname === link.href ? 'text-brand' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-brand transition-all duration-300 ${
                    pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:8254612378"
              className="flex items-center gap-2 text-sm text-white/60 hover:text-brand transition-colors"
            >
              <Phone size={14} />
              825-461-2378
            </a>
            <Link
              href="/contact"
              className="bg-brand hover:bg-brand-dark text-black font-bold text-sm uppercase tracking-wider px-5 py-2.5 transition-colors duration-200"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white z-50 relative"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-base flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    className={`font-heading text-5xl tracking-wider transition-colors ${
                      pathname === link.href ? 'text-brand' : 'text-white hover:text-brand'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.07 }}
              >
                <Link
                  href="/contact"
                  className="mt-4 bg-brand text-black font-bold text-lg uppercase tracking-widest px-8 py-4 block"
                >
                  Get a Free Quote
                </Link>
              </motion.div>
              <motion.a
                href="tel:8254612378"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 text-white/50 text-sm mt-2"
              >
                <Phone size={14} />
                825-461-2378
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
