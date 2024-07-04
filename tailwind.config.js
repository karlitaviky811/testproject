/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#0574F7',
        secondary: '#D9D9D9',
        light: '#F3F6F8',
        blueDark: '#0C2B4B',
      }
    },
    backgroundImage: {
      'brantt': "url('img/brantt.png')"
  },
    fontFamily: {
      workSans: ["Work Sans"],
      poppins: ["Poppins-Regular"],
      aldrich: ["Aldrich-Regular"],
    },
  },
  plugins: [],
  
}