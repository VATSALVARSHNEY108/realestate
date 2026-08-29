/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#0A0A0B',
          charcoal: '#121316',
          dark: '#18191E',
          card: '#1F2128',
          border: '#2E323D',
          gold: '#C5A880',
          'gold-light': '#E0C896',
          sand: '#D4C5B9',
          muted: '#8A8F9E',
        },
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
