/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#5e49e2',
          dark: '#0f172a',
          bg: '#f4f6fb',
        }
      }
    },
  },
  plugins: [],
}
