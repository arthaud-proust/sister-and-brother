const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
    content: [
        "./themes/**/layouts/**/*.html",
        "./content/**/layouts/**/*.html",
        "./layouts/**/*.html",
        "./content/**/*.html"
    ],
    theme: {
        extend: {
            aspectRatio: {
                portrait: '2 / 3',
                landscape: '3 / 2',
            }
        },
        fontFamily: {
            'sans': ['Geomanist', ...defaultTheme.fontFamily.sans],
            'display': ['Manuscribe', ...defaultTheme.fontFamily.sans],
        },
        colors: {
            primary: 'white',
            secondary: '#111111',
            transparent: 'transparent'
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
            },
        },
    },
    plugins: []
}
