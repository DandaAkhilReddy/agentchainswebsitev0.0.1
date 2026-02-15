import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0c0c18',
          secondary: '#131326',
          elevated: '#1a1a35',
          surface: '#1f1f40',
        },
        accent: {
          cyan: '#00d4ff',
          violet: '#8b5cf6',
          coral: '#ff4080',
        },
        text: {
          primary: '#eeeef5',
          secondary: '#9898b8',
          muted: '#6868a0',
        },
        glass: {
          border: 'rgba(255, 255, 255, 0.12)',
          'border-hover': 'rgba(255, 255, 255, 0.22)',
        },
      },
      fontFamily: {
        display: ['Inter Variable', 'system-ui', 'sans-serif'],
        body: ['DM Sans Variable', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono Variable', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
        'gradient-cta': 'linear-gradient(135deg, #00d4ff, #8b5cf6, #ff4080)',
        'gradient-hero': 'linear-gradient(180deg, #0c0c18 0%, #131326 50%, #0c0c18 100%)',
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
          '0%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.1)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.3)' },
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
          '100%': { opacity: '0.08' },
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
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'glow-cyan': '0 0 40px rgba(0, 212, 255, 0.15)',
        'glow-violet': '0 0 40px rgba(139, 92, 246, 0.15)',
        'glow-coral': '0 0 40px rgba(255, 64, 128, 0.15)',
        'glow-cyan-strong': '0 0 60px rgba(0, 212, 255, 0.25)',
        'glow-multi': '0 0 40px rgba(0, 212, 255, 0.15), 0 0 80px rgba(139, 92, 246, 0.1)',
        'inner-glow': 'inset 0 0 30px rgba(0, 212, 255, 0.08)',
        'glass-elevated': '0 12px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.06)',
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
