
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        st: {
          red: '#E50914',
          black: '#050505',
          blue: '#0a1128',
        }
      }
    },
  },
  plugins: [],
}
