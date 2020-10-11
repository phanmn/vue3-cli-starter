// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [],
  target: 'relaxed',
  prefix: '',
  important: false,
  separator: ':',
  theme: {
    extend: {
      fontFamily: {
        sans: ['SF UI Display', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        charade: '#2D2F3D',
      },
    },
  },
  variants: {},
  plugins: [],
};
