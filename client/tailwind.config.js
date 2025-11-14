/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wellness: {
          50: '#f8fffe',
          100: '#e8f5e8',
          200: '#d4e6d4',
          300: '#a8d5a8',
          400: '#7cb57c',
          500: '#4a7c59',
          600: '#2d5a27',
          700: '#1f3d1b',
          800: '#142912',
          900: '#0a140a',
        },
      },
      fontFamily: {
        'sans': ['Elmessiri', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}