/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        whiteText: '#fdfdfe',
      },
      backgroundImage: {
        'body-grad': 'linear-gradient(135deg, #020817 0%, #06122B 38%, #081B3E 68%, #020817 100%)',
      },
      fontFamily: {
        outfit: ["'Outfit'", "sans-serif"],
      }
    },
  },
  plugins: [],
}
