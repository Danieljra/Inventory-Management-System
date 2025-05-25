/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          teal: '#009689',
          blue: '#0082CE',
        },
        neutral: {
          gray: '#61738D',
          white: '#FFFFFF',
          black: '#000000',
        }
      }
    },
  },
  plugins: [],
} 