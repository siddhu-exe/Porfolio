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
        // Toolbox browns (from the reference: dark espresso bg + light-wood panel)
        bark: '#2A1A10',
        barklight: '#3A2517',
        wood: '#6D4A30',
        tan: '#C7A079',
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
