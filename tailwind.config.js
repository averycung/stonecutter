/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      backgroundImage:{
        'dotgridlight': "radial-gradient(#e7e7eb 1.3px, transparent 0.5px)",
        'dotgriddark': "radial-gradient(#1f2937 1.3px, transparent 0.5px)",
      },
      backgroundSize:{
        'dotgridlight': '16px 16px',
        'dotgriddark': '16px 16px',
      },
      colors: {
        bg: '#f5f5f4',
        bgdark: '#1c1917',
        anon: '#eaedfc',
        anon2: '#d9dcfc',
        anondark: '#324adf',
        gglight: '#fcedea',
        gglight2: '#fcdcd9',
        ggdark: '#df4a32',
        bone: '#ffffcc',
        bl: '#ccccff'
      },
      fontFamily: {
        dmserif: ['"DM Serif Text"', 'serif'],
        geist: ['"Geist"', 'sans'],
      },
    },
  },
  plugins: [],
}