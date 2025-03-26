/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'bounce-up': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-20px)', opacity: '0' }
        },
        'pulse-light': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 }
        }
      },
      animation: {
        'bounce-up': 'bounce-up 1s ease-out forwards',
        'pulse-light': 'pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    },
  },
  plugins: [],
};