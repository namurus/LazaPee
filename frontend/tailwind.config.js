/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: 'Paytone One',
        primary: 'Poppins',
      },
      borderWidth: {
        1: '1px',
      },
      gridAutoColumns: {
        productShowcase: 'minmax(clamp(250px, 1fr, 300px), 1fr)',
      },
      gridTemplateColumns: {
        productShowcase:
          'repeat(auto-fill, minmax(clamp(250px, 1fr, 300px), 1fr))',
      },
    },
  },
  plugins: [],
};
