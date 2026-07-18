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
        // Toolbox browns — deep matte espresso + walnut panel
        bark: '#1B1109',
        barklight: '#2B1A0E',
        wood: '#6D4A30',
        tan: '#C7A079',
      },
      fontFamily: {
        sans: ['"General Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        headline: '-0.03em',
      },
    },
  },
  plugins: [],
};
