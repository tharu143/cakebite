/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },
        bakery: {
          cream: '#FFFDF9',
          rose: '#FAF0E6',
          gold: '#D4AF37',
          bronze: '#C5A880',
          dark: '#3D251E',
          chocolate: '#2C1A16',
          pink: '#FAA6B9',
          softpink: '#FDE8EB',
          accent: '#A0522D',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(61, 37, 30, 0.08)',
        'premium-hover': '0 20px 40px -15px rgba(61, 37, 30, 0.15)',
      }
    },
  },
  plugins: [],
}
