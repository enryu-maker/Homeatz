/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: '#5BB264',
        darkGrey: '#393937',
        blue: '#085DAD',
        grey: '#f5f5f5',
        lightGreen: '#EEF7E1',
        lightPink: '#f7e1e1',
        iconColor: '#E53988',
        white: '#ffffff',
        black: '#000',
        logoPink: '#bc3061',
      },
      fontFamily: {
        suseR: 'SUSE-Regular',
        suseB: 'SUSE-SemiBold',
      },
    },
  },
  plugins: [],
};
