import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#08080d',
          secondary: '#0f0f1a',
          elevated: '#161625',
        },
        accent: {
          cyan: '#00e5ff',
          violet: '#7c3aed',
          coral: '#ff3366',
        },
        text: {
          primary: '#f0f0f5',
          secondary: '#8888a0',
          muted: '#555570',
        },
        glass: {
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(255, 255, 255, 0.15)',
        },
      },
      fontFamily: {
        display: ['Inter Variable', 'system-ui', 'sans-serif'],
        body: ['DM Sans Variable', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono Variable', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00e5ff, #7c3aed)',
        'gradient-cta': 'linear-gradient(135deg, #00e5ff, #7c3aed, #ff3366)',
        'gradient-hero': 'linear-gradient(180deg, #08080d 0%, #0f0f1a 50%, #08080d 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'ticker': 'ticker 30s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 229, 255, 0.1)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 229, 255, 0.3)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'glow-cyan': '0 0 40px rgba(0, 229, 255, 0.15)',
        'glow-violet': '0 0 40px rgba(124, 58, 237, 0.15)',
        'glow-coral': '0 0 40px rgba(255, 51, 102, 0.15)',
        'glow-cyan-strong': '0 0 60px rgba(0, 229, 255, 0.25)',
      },
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 5.5rem)', { lineHeight: '1.05', fontWeight: '800' }],
        'h1': ['clamp(2.25rem, 5vw, 3.75rem)', { lineHeight: '1.1', fontWeight: '700' }],
        'h2': ['clamp(1.875rem, 4vw, 3rem)', { lineHeight: '1.15', fontWeight: '600' }],
        'h3': ['clamp(1.25rem, 2.5vw, 1.5rem)', { lineHeight: '1.3', fontWeight: '600' }],
      },
      spacing: {
        'section': 'clamp(4rem, 10vh, 8rem)',
      },
      maxWidth: {
        'site': '1280px',
      },
    },
  },
  plugins: [],
} satisfies Config
