/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        ink: {
          DEFAULT: '#1a1a1a',
          light: '#4a4a4a',
          muted: '#8a8a8a',
        },
        paper: {
          DEFAULT: '#faf9f7',
          warm: '#f5f0eb',
          cool: '#f0f2f5',
        },
        accent: {
          DEFAULT: '#c05d3b',
          light: '#d4845f',
          dark: '#8c3a22',
        },
        sage: {
          DEFAULT: '#5a7a6b',
          light: '#7a9a8b',
          dark: '#3a5a4b',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '72ch',
            color: '#1a1a1a',
            a: {
              color: '#c05d3b',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              '&:hover': {
                color: '#8c3a22',
              },
            },
            h1: { fontFamily: 'var(--font-display)' },
            h2: { fontFamily: 'var(--font-display)' },
            h3: { fontFamily: 'var(--font-display)' },
          },
        },
      },
    },
  },
  plugins: [],
};
