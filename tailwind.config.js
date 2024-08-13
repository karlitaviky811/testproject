/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#0574F7',
        secondary: '#D9D9D9',
        light: '#F3F6F8',
        blueDark: '#0C2B4B',
        grayLight: {
          '50': '#EBEBEB',
          '100': '#D0D0D0',
          '200': '#99958F',
          '300': '#53585E',
          '400': '#1E1F21',
          '500': '#666666',
        }
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
  plugins: [
    plugin(function({addComponents, theme}) {
      addComponents({
        '.btn': {
          width: '100%',
          fontSize: theme('fontSize.xs'),
          fontWeight: theme('fontSize.normal'),
          padding: '10px 5px',
          height: 'auto !important',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // border: '1px solid',
          borderRadius: '10px',
          cursor: 'pointer',
          '&:disabled': {
            opacity: theme('opacity.30'),
          },
          '@screen sm': {
            width: theme('spacing.30'),
            fontSize: theme('fontSize.sm'),
            padding: '10px 10px',
          },
          // '@screen md': {
          //   width: theme('spacing.36')
          // },
          '@screen lg': {
            width: '100%',
            fontSize: '22px',
            fontWeight: '500',
          },
          '@screen xl': {
            width: '100%',
            fontSize: '22px',
            fontWeight: '500',
            // padding: '40px 24px',
          },
        },
        '.btn-primary': {
            background: theme('colors.primary'),
            color: theme('colors.white'),
            transition: '0.3s',
            '&:hover': {
             filter: 'contrast(0.5)'
            },
            'svg path': {
              fill: 'white',
            },
        },
        '.btn-secondary': {
          background: '#EBEBEB',
          color: '#99958F',
          borderColor: '#D0D0D0',
          transition: '0.3s',
          '&:hover': {
           filter: 'contrast(0.5)',

          },
        },
        '.btn-outlet-primary': {
          border: '1px solid',
          borderColor: theme('colors.primary'),
          transition: '0.3s',
          color: theme('colors.primary'),
          '&:hover': {
            backgroundColor: theme('colors.primary'),
            color: theme('colors.white'),
            'svg path': {
              fill: 'white',
            },
          }
        },
        '.btn-outlet-secondary': {
          border: '1px solid',
          borderColor: theme('colors.secondary'),
          transition: '0.3s',
          color: theme('colors.blueDark'),
          '&:hover': {
            backgroundColor: theme('colors.blueDark'),
            color: theme('colors.white'),
        }
      }
      })
    })
  ],
  
}