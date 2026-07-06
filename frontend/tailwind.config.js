/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F1ED',
        ink: '#171717',
        terracotta: '#D9834A',
        mustard: '#FFE862',
      },
      fontFamily: {
        sans: ['"General Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        headline: '-0.03em',
      },
    },
  },
  plugins: [],
};
