import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#ffffff',
          secondary: '#f7f8fc',
          elevated: '#eef0f6',
          surface: '#e4e7f0',
        },
        accent: {
          cyan: '#2563eb',
          violet: '#7c3aed',
          coral: '#e11d48',
        },
        text: {
          primary: '#111827',
          secondary: '#4b5563',
          muted: '#9ca3af',
        },
        glass: {
          border: 'rgba(0, 0, 0, 0.08)',
          'border-hover': 'rgba(0, 0, 0, 0.15)',
        },
      },
      fontFamily: {
        display: ['Inter Variable', 'system-ui', 'sans-serif'],
        body: ['DM Sans Variable', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono Variable', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2563eb, #7c3aed)',
        'gradient-cta': 'linear-gradient(135deg, #2563eb, #7c3aed, #e11d48)',
        'gradient-hero': 'linear-gradient(180deg, #ffffff 0%, #f7f8fc 50%, #ffffff 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-slower': 'float 14s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'ticker': 'ticker 30s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'aurora': 'aurora 8s ease-in-out infinite',
        'gridFade': 'gridFade 4s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'morph': 'morph 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(37, 99, 235, 0.08)' },
          '100%': { boxShadow: '0 0 40px rgba(37, 99, 235, 0.2)' },
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
        aurora: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        gridFade: {
          '0%': { opacity: '0.03' },
          '100%': { opacity: '0.06' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '50%': { borderRadius: '50% 60% 30% 60% / 30% 60% 70% 40%' },
          '75%': { borderRadius: '60% 40% 60% 30% / 70% 40% 50% 60%' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.06)',
        'glow-cyan': '0 0 40px rgba(37, 99, 235, 0.12)',
        'glow-violet': '0 0 40px rgba(124, 58, 237, 0.12)',
        'glow-coral': '0 0 40px rgba(225, 29, 72, 0.12)',
        'glow-cyan-strong': '0 0 60px rgba(37, 99, 235, 0.2)',
        'glow-multi': '0 0 40px rgba(37, 99, 235, 0.1), 0 0 80px rgba(124, 58, 237, 0.08)',
        'inner-glow': 'inset 0 0 30px rgba(37, 99, 235, 0.05)',
        'glass-elevated': '0 12px 48px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)',
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
