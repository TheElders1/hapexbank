/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc',
          400: '#38bdf8', DEFAULT: '#0ea5e9', 500: '#0ea5e9',
          600: '#0284c7', 700: '#0369a1', foreground: '#ffffff',
        },
        secondary: {
          50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1',
          400: '#94a3b8', DEFAULT: '#64748b', 500: '#64748b',
          600: '#475569', 700: '#334155', foreground: '#0f172a',
        },
        accent: {
          50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4',
          400: '#f472b6', DEFAULT: '#ec4899', 500: '#ec4899',
          600: '#db2777', 700: '#be185d', foreground: '#ffffff',
        },
        background: '#f8fafc', foreground: '#1e293b',
        card: { DEFAULT: '#ffffff', foreground: '#1e293b' },
        muted: { DEFAULT: '#f1f5f9', foreground: '#64748b' },
        border: '#e2e8f0', input: '#e2e8f0', ring: '#0ea5e9',
        'yellow-action': '#facc15',
        'green-positive': '#22c55e',
        'red-negative': '#ef4444',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)',
      },
      borderRadius: { lg: '0.75rem', xl: '0.75rem', '2xl': '1rem', '3xl': '1.5rem' },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        pulse: { '0%,100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(14,165,233,0.4)' }, '50%': { transform: 'scale(1.05)', boxShadow: '0 0 0 10px rgba(14,165,233,0)' } },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 2.5s infinite',
      },
    },
  },
  plugins: [],
}
