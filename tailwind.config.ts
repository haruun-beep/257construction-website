import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#F97316',
        'brand-dark': '#EA6C0A',
        'brand-light': '#FB923C',
        'bg-base': '#0A0A0A',
        'surface-1': '#111111',
        'surface-2': '#1A1A1A',
        'surface-3': '#222222',
      },
      fontFamily: {
        heading: ['var(--font-bebas)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        bounce2: 'bounce2 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        bounce2: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
