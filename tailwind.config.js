const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./themes/**/layouts/**/*.html",
    "./content/**/layouts/**/*.html",
    "./layouts/**/*.html",
    "./content/**/*.html"
  ],
  theme: {
    extends: {
    },
    fontFamily: {
      'sans': ['Geomanist', ...defaultTheme.fontFamily.sans],
      'display': ['Manuscribe'],
    },
    colors: {
      primary: 'white',
      secondary: 'black',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '8rem',
        '2xl': '12rem',
      },
    },
  },
  plugins: [
  ]
}
