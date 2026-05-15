/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html","./tema-vibrant.html","./tema-royal.html","./tema-boho.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gold-elegant': '#D4AF37',
        'dark-slate': '#2C3E50',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}