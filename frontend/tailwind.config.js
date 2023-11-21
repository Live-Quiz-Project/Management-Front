/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        oceanBlue: '#22668D',
        orange: '#FF8811',
        skyBlue: '#8ECDDD',
        peach: '#FFFADD',
        pastelOrange: '#FFCC70',
        mainWhite: '#FFFFFF',
        grey: '#F0F0F0',
        darkGrey: '#919EA8',
        mainBlack: '#000000',
        
      },
    },
  },
  plugins: [],
}

