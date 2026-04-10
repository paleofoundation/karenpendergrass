/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /* Typography */
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },

      /* Enhanced Color Palette */
      colors: {
        /* Primary Colors - using CSS custom properties */
        bg: 'var(--color-bg)',
        'bg-alt': 'var(--color-bg-alt)',
        surface: 'var(--color-surface)',

        /* Typography Colors */
        ink: {
          DEFAULT: 'var(--color-ink)',
          secondary: 'var(--color-ink-secondary)',
          muted: 'var(--color-ink-muted)',
        },

        /* Paper/Background Colors (legacy support) */
        paper: {
          DEFAULT: 'var(--color-bg)',
          warm: 'var(--color-bg-alt)',
          cool: '#f0f2f5',
        },

        /* Accent Colors */
        accent: {
          DEFAULT: 'var(--color-accent)',
          light: 'var(--color-accent-light)',
          dark: 'var(--color-accent-dark)',
        },

        /* Sage (complementary) */
        sage: {
          DEFAULT: '#5a7a6b',
          light: '#7a9a8b',
          dark: '#3a5a4b',
        },

        /* Borders & Dividers */
        border: {
          DEFAULT: 'var(--color-border)',
          light: 'var(--color-border-light)',
        },
      },

      /* Typography Scale */
      fontSize: {
        xs: ['var(--text-xs)', { lineHeight: 'var(--line-height-tight)' }],
        sm: ['var(--text-sm)', { lineHeight: 'var(--line-height-normal)' }],
        base: ['var(--text-base)', { lineHeight: 'var(--line-height-normal)' }],
        lg: ['var(--text-lg)', { lineHeight: 'var(--line-height-relaxed)' }],
        xl: ['var(--text-xl)', { lineHeight: 'var(--line-height-relaxed)' }],
        '2xl': ['var(--text-2xl)', { lineHeight: 'var(--line-height-tight)' }],
        '3xl': ['var(--text-3xl)', { lineHeight: 'var(--line-height-tight)' }],
        '4xl': ['var(--text-4xl)', { lineHeight: 'var(--line-height-tight)' }],
        '5xl': ['var(--text-5xl)', { lineHeight: 'var(--line-height-tight)' }],
        '6xl': ['var(--text-6xl)', { lineHeight: 'var(--line-height-tight)' }],
      },

      /* Line Heights */
      lineHeight: {
        tight: 'var(--line-height-tight)',
        normal: 'var(--line-height-normal)',
        relaxed: 'var(--line-height-relaxed)',
      },

      /* Spacing Scale */
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
        '4xl': 'var(--spacing-4xl)',
      },

      /* Transitions */
      transitionDuration: {
        fast: 'var(--transition-fast)',
        base: 'var(--transition-base)',
        slow: 'var(--transition-slow)',
      },

      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
        ease: 'ease',
      },

      /* Box Shadows */
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },

      /* Border Radius */
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
      },

      /* Animation Keyframes */
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-24px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(24px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        scaleUp: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },

      /* Animations */
      animation: {
        'fade-in': 'fadeIn var(--transition-base) ease-out',
        'slide-up': 'slideUp var(--transition-slow) ease-out',
        'slide-down': 'slideDown var(--transition-slow) ease-out',
        'slide-in-left': 'slideInLeft var(--transition-slow) ease-out',
        'slide-in-right': 'slideInRight var(--transition-slow) ease-out',
        'scale-up': 'scaleUp var(--transition-slow) ease-out',
      },

      /* Typography Plugin */
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '72ch',
            color: 'var(--color-ink-secondary)',
            a: {
              color: 'var(--color-accent)',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              textDecorationThickness: '1.5px',
              transition: 'color var(--transition-fast)',
              '&:hover': {
                color: 'var(--color-accent-dark)',
              },
            },
            h1: {
              fontFamily: 'var(--font-display)',
              color: 'var(--color-ink)',
              fontSize: 'var(--text-5xl)',
              fontWeight: '600',
              letterSpacing: '-0.02em',
            },
            h2: {
              fontFamily: 'var(--font-display)',
              color: 'var(--color-ink)',
              fontSize: 'var(--text-3xl)',
              fontWeight: '500',
              borderBottomColor: 'var(--color-border)',
            },
            h3: {
              fontFamily: 'var(--font-display)',
              color: 'var(--color-ink)',
              fontSize: 'var(--text-2xl)',
              fontWeight: '500',
            },
            h4: {
              fontFamily: 'var(--font-display)',
              color: 'var(--color-ink)',
              fontWeight: '500',
            },
            strong: {
              color: 'var(--color-ink)',
              fontWeight: '600',
            },
            blockquote: {
              borderLeftColor: 'var(--color-accent)',
              color: 'var(--color-ink-secondary)',
              fontStyle: 'italic',
            },
            code: {
              color: 'var(--color-accent)',
              backgroundColor: 'var(--color-bg-alt)',
              padding: '0.2em 0.5em',
              borderRadius: '3px',
              fontFamily: 'var(--font-mono)',
            },
            pre: {
              backgroundColor: 'var(--color-ink)',
              color: '#e0ddd8',
            },
            hr: {
              borderTopColor: 'var(--color-border)',
            },
          },
        },
      },
    },
  },
  plugins: [],
};
