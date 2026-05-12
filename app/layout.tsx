import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'

export const metadata: Metadata = {
  title: '25/7 Construction Ltd. | Edmonton Excavation, Fencing & Renovation Contractors',
  description:
    'Family-owned construction company based in Edmonton, Alberta. Excavation, fencing, renovations, landscaping, ditch mowing, land development, and government contracts. Call 825-461-2378.',
  keywords:
    'construction Edmonton, excavation Alberta, fencing contractor, renovation Edmonton, ditch mowing, land development, government contractor Alberta, 25/7 Construction',
  openGraph: {
    title: '25/7 Construction Ltd. | Edmonton Alberta',
    description: 'Building the future — quality construction services across Alberta.',
    type: 'website',
    url: 'https://257construction.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-base text-white font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  )
}
