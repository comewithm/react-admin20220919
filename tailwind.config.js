module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      lineHeight: {
        '15': '4rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
