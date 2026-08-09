/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paisa: {
          dark: '#0e0e12',
          surface: '#15151b',
          card: '#1b1b22',
          cardHover: '#23232c',
          border: '#2a2a35',
          lime: '#ccff00',
          limeHover: '#b3e600',
          limeMuted: 'rgba(204, 255, 0, 0.15)',
          text: '#ffffff',
          textMuted: '#9e9ea9',
          subtle: '#323240'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
