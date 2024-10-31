import flowbite from 'flowbite-react/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        display: 'Paytone One',
        primary: ['Poppins', 'sans-serif'],
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
      colors: {
        accent: {
          DEFAULT: '#000000',
        },
        neutral: {
          DEFAULT: '#F0F0F0',
          900: '#ffffff',
        },
        primary: {
          DEFAULT: '#000000',
        },
      },
    },
  },
  plugins: [flowbite.plugin()],
};
