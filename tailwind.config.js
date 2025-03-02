/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      transitionProperty: {
        'all': 'all',
      },
      transitionDuration: {
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
      },
      colors: {
        primary: {
          light: '#8ECAE6',
          DEFAULT: '#219EBC',
          dark: '#023047',
        },
        secondary: {
          light: '#B8E0D2',
          DEFAULT: '#95D5B2',
          dark: '#74C69D',
        },
        accent: {
          light: '#FFD166',
          DEFAULT: '#EF8354',
          dark: '#D62828',
        },
        background: {
          light: '#F7F9F9',
          DEFAULT: '#E9ECEF',
          dark: '#DEE2E6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}