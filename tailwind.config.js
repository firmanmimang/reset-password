/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        poor: '#e24c71',
        good: '#f39845',
        strong: '#57c558',
      }
    }
  },
  plugins: [],
}

