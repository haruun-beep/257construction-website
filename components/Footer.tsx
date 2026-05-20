import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'

const services = [
  'Excavation & Dirt Moving',
  'Fencing',
  'Renovations',
  'Landscape Construction',
  'Ditch Mowing',
  'Site Management',
  'Land Development',
  'Subcontracting',
  'Government Contracts',
]

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-bg-base border-t border-brand/20">
      {/* CTA strip */}
      <div className="bg-brand py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-heading text-2xl text-black tracking-wider">
            READY TO START YOUR PROJECT?
          </p>
          <Link
            href="/contact"
            className="flex items-center gap-2 bg-black text-white font-bold text-sm uppercase tracking-wider px-6 py-3 hover:bg-surface-1 transition-colors"
          >
            Get a Free Quote <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1 — Brand */}
          <div>
            <p className="font-heading text-3xl text-brand tracking-wider mb-3">
              25/7 CONSTRUCTION
            </p>
            <p className="text-brand/70 text-xs uppercase tracking-widest mb-4">Building the Future</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Family-owned construction contractor based in Edmonton, Alberta. Serving residential, commercial, and government clients across the province since 2020.
            </p>
            <div className="flex gap-3">
              {['WCB', 'COR', 'ISN'].map((badge) => (
                <span
                  key={badge}
                  className="text-xs font-bold border border-brand/40 text-brand px-2 py-1 tracking-wider"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h3 className="font-heading text-xl text-white tracking-wider mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-8 after:h-0.5 after:bg-brand">
              QUICK LINKS
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-brand text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-0.5 bg-brand transition-all duration-200 inline-block" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h3 className="font-heading text-xl text-white tracking-wider mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-8 after:h-0.5 after:bg-brand">
              SERVICES
            </h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-gray-400 hover:text-brand text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-0.5 bg-brand transition-all duration-200 inline-block" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3 className="font-heading text-xl text-white tracking-wider mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-8 after:h-0.5 after:bg-brand">
              CONTACT
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:8254612378" className="flex items-start gap-3 text-gray-400 hover:text-brand transition-colors group">
                  <Phone size={16} className="mt-0.5 text-brand flex-shrink-0" />
                  <span className="text-sm">825-461-2378</span>
                </a>
              </li>
              <li>
                <a href="tel:7808514048" className="flex items-start gap-3 text-gray-400 hover:text-brand transition-colors group">
                  <Phone size={16} className="mt-0.5 text-brand flex-shrink-0" />
                  <span className="text-sm">780-851-4048</span>
                </a>
              </li>
              <li>
                <a href="mailto:257Construction@gmail.com" className="flex items-start gap-3 text-gray-400 hover:text-brand transition-colors">
                  <Mail size={16} className="mt-0.5 text-brand flex-shrink-0" />
                  <span className="text-sm break-all">257Construction@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={16} className="mt-0.5 text-brand flex-shrink-0" />
                <span className="text-sm">Edmonton, AB — Serving all of Alberta</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Clock size={16} className="mt-0.5 text-brand flex-shrink-0" />
                <span className="text-sm">Mon–Sat, 7AM–6PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} 25/7 Construction Ltd. | Edmonton, AB | All Rights Reserved
          </p>
          <p className="text-gray-700 text-xs">
            Licensed · Bonded · Insured · WCB Alberta Compliant
          </p>
        </div>
        <div className="border-t border-white/5 py-3 text-center">
          <p className="text-gray-600 text-xs">
            Built by{' '}
            <a
              href="https://BespokeAutomations.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand/70 hover:text-brand transition-colors"
            >
              Bespoke Automations
            </a>
            {' '}&amp;{' '}
            <a
              href="https://UnconventionalGroup.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand/70 hover:text-brand transition-colors"
            >
              Unconventional Group
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
