module.exports = {
  purge: ['./pages/**/*.ts', './components/**/*.ts'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      borderRadius: ['first', 'last'],
      margin: ['first', 'last'],
      textColor: ['disabled']
    },
  },
  plugins: [],
}
