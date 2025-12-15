/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'banner': 'url(/banner.webp)'
      },
      colors: {
        lightblack: "#181717", // light black
      },
    },
  },
  plugins: [],
}

