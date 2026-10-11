/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'kku-red': '#A4233B',
        'kku-red-dark': '#8B1E32',
        'kku-red-light': '#C75B73',
        'kku-gold': '#F5B82E',
        'kku-teal': '#0d3530',
      },
      fontFamily: {
        sans: ['Sarabun', 'Noto Sans Thai', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
