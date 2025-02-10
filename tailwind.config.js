/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './dist/**/*.{html,js}', // Sesuaikan dengan path file Anda
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#121212',
          light: '#1a1a1a',
        },
        accent: {
          blue: '#00FFFF',
          purple: '#8A2BE2',
        },
      },
    },
  },
  plugins: [],
}