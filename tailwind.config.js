/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream:     '#FFFDF1',
        container: '#FFCE99',
        action:    '#FF9644',
        ink:       '#562F00',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body:    ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
