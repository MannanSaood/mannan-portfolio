/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure this covers all your component files
  ],
  darkMode: 'class', // This enables our dark mode theme switching
  theme: {
    extend: {
      colors: {
        'cream-light': '#FEF9F3',
        'charcoal-dark': '#1A1A20',
        'charcoal-surface': '#2C2C3A',
        'orange-500': '#F4812F',
        'teal-600': '#4FA893',
        'magenta-light': '#F472B6',
        'magenta-dark': '#E53E3E',
        'lavender-light': '#A78BFA',
        'lavender-dark': '#5B21B6',
      }
    },
  },
  plugins: [],
  safelist: [
    'dark:bg-charcoal-dark',
  ],
}