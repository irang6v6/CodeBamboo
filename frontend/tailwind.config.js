/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        w: 'width',
      },
      fontFamily: {
        scp: ['Source Code Pro', 'monospace'],
        toss: ['Toss Product Sans', 'sans']
      },
      colors: {
        bamboo: '#2A9464',
        editor: '#263238',
      },
      keyframes: {
        progress: {
          to: {
            backgroundColor: 'rgb(20, 255, 226)',
            width: '100vw',
          },
        },
        scrollArrow: {
          from: {
            transform: 'translate(-50%, 0%)',
          },
          to: {
            transform: 'translate(-50%, 30%)',
          },
        },
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        scrollArrow: 'scrollArrow 1.2s linear alternate-reverse infinite',
        fadein: 'fadein 0.8s ease-in-out',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
