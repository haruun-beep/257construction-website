'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { HardHat, X } from 'lucide-react'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <>
          {/* Desktop: corner button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="fixed bottom-8 right-8 z-50 hidden sm:flex items-center gap-3"
          >
            <button
              onClick={() => setDismissed(true)}
              className="w-7 h-7 rounded-full bg-surface-2 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <X size={12} />
            </button>
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-brand hover:bg-brand-dark text-black font-bold text-sm uppercase tracking-wider px-5 py-3.5 shadow-2xl shadow-brand/30 transition-all duration-200 hover:shadow-brand/50 hover:scale-105 animate-bounce2"
            >
              <HardHat size={18} />
              Free Quote
            </Link>
          </motion.div>

          {/* Mobile: bottom bar */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 sm:hidden"
          >
            <div className="flex items-center">
              <Link
                href="/contact"
                className="flex-1 flex items-center justify-center gap-2 bg-brand text-black font-bold text-sm uppercase tracking-wider py-4"
              >
                <HardHat size={18} />
                Get a Free Quote
              </Link>
              <button
                onClick={() => setDismissed(true)}
                className="bg-surface-1 border-l border-white/10 px-4 py-4 text-gray-400"
              >
                <X size={18} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
