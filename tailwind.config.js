/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#29B675',
        primarybg: '#559B7B',
      },
      fontFamily: {
        nunito: 'Nunito Regular',
        suse: 'SUSE Regular',
      },
    },
  },
  plugins: [],
};
