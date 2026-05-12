'use client'

import Image from 'next/image'

const partners = [
  { src: 'https://static.wixstatic.com/media/c837a6_9d8041a73c8c42f7bb3332ba49d4fd8a~mv2.png', alt: 'Partner 1' },
  { src: 'https://static.wixstatic.com/media/c837a6_ce86bd9135d74c289a3c77ddfbc16d57~mv2.png', alt: 'Partner 2' },
  { src: 'https://static.wixstatic.com/media/618f79_ce0f134e6b994462b5af9eb2ee806c0b~mv2.png', alt: 'Partner 3' },
  { src: 'https://static.wixstatic.com/media/c837a6_2685f63e32b04c56b654c7699a54c206~mv2.png', alt: 'Partner 4' },
  { src: 'https://static.wixstatic.com/media/c837a6_c6120d1c2ecd4f71a339b220d6d53246~mv2.png', alt: 'Partner 5' },
  { src: 'https://static.wixstatic.com/media/618f79_3d68f3ec95514073a5e4fc15619daccd~mv2.png', alt: 'Partner 6' },
  { src: 'https://static.wixstatic.com/media/c837a6_c1bb36403127496aaaed4afa142b1af1~mv2.png', alt: 'Partner 7' },
]

export default function MarqueePartners() {
  const doubled = [...partners, ...partners]

  return (
    <section className="py-16 bg-surface-1 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <p className="font-heading text-3xl text-center tracking-wider text-white/30">
          TRUSTED BY
        </p>
      </div>
      <div className="marquee-container">
        <div className="marquee-track">
          {doubled.map((partner, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center mx-10 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                width={120}
                height={60}
                className="object-contain max-h-12 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
