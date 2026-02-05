/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FDFBF9',
        oatmeal: '#F5F1ED',
        sage: '#8E9775',
        rose: '#D4A59A',
        espresso: '#3A3530',
        umber: '#5F5852',
        gold: '#EBC06D',
        coral: '#E87A7A',
      },
      fontFamily: {
        heading: ['Quicksand', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        cloud: '40px',
      }
    },
  },
  plugins: [],
}