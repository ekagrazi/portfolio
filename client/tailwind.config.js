/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
      colors: {
        dark: {
          900: '#0a0a0a',
          800: '#111111',
          700: '#1a1a1a',
          600: '#222222',
          500: '#2a2a2a',
          400: '#333333',
        },
      },
      animation: {
        'fade-up':        'fadeUp 0.6s ease-out forwards',
        'fade-in':        'fadeIn 0.4s ease-out forwards',
        'marquee':        'marquee 30s linear infinite',
        'marquee-reverse':'marqueeReverse 30s linear infinite',
        'cursor-glow':    'cursorGlow 2s ease-in-out infinite alternate',
        'grain':          'grain 0.5s steps(2) infinite',
        'clip-wipe':      'clipWipe 0.8s cubic-bezier(0.77,0,0.175,1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%':      { transform: 'translate(-2%, -3%)' },
          '20%':      { transform: 'translate(3%, 2%)' },
          '30%':      { transform: 'translate(-1%, 4%)' },
          '40%':      { transform: 'translate(4%, -1%)' },
          '50%':      { transform: 'translate(-3%, 2%)' },
          '60%':      { transform: 'translate(1%, -4%)' },
          '70%':      { transform: 'translate(-4%, 1%)' },
          '80%':      { transform: 'translate(2%, 3%)' },
          '90%':      { transform: 'translate(-1%, -2%)' },
        },
        clipWipe: {
          '0%':   { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0% 0 0)' },
        },
      },
    },
  },
  plugins: [],
};
