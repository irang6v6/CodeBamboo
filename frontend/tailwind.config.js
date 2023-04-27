/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      green: '#2A9464',
    },
    extend: {
      fontFamily: {
        'scp': ['Source Code Pro', 'monospace']
      },
    },
  },
  plugins: [],
};
