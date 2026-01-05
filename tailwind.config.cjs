/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./frontend/index.html', './frontend/src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      bp681: '681px',
      bp961: '961px',
      bp1061: '1061px'
    }
  },
  plugins: []
}


