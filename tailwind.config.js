/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/client/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#070B17',
          alt: '#0B1220',
          card: '#0f172a',
          surface: '#111827',
        },
        novyra: {
          cyan: '#22D3EE',
          blue: '#3B82F6',
          violet: '#7C3AED',
          purple: '#A855F7',
          pink: '#EC4899',
          amber: '#F59E0B',
          emerald: '#10B981',
        },
        slate: {
          850: '#151f32',
          900: '#0f172a',
          950: '#070b17',
        }
      },
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif'
        ],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(34, 211, 238, 0.25)',
        'glow-violet': '0 0 25px -5px rgba(124, 58, 237, 0.3)',
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124, 58, 237, 0.25), rgba(34, 211, 238, 0.15), rgba(7, 11, 23, 0))',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
