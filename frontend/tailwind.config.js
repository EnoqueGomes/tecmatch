/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14213D',
        paper: '#EEF1EC',
        blueprint: {
          DEFAULT: '#1B3A5C',
          light: '#28527D',
        },
        signal: {
          DEFAULT: '#D9822B',
          dark: '#B5691E',
        },
        line: '#C9CCC4',
        moss: '#3D7A5C',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '4px',
      },
    },
  },
  plugins: [],
};
