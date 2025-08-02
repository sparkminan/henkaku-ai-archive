/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        neon: {
          blue: '#00f5ff',
          purple: '#bf00ff',
          pink: '#ff0080',
          green: '#00ff41',
          yellow: '#ffff00',
        },
        dark: {
          900: '#0a0a0a',
          800: '#121212',
          700: '#1a1a1a',
          600: '#2a2a2a',
          500: '#3a3a3a',
        }
      },
      backgroundImage: {
        'cyber-grid': "linear-gradient(rgba(0, 245, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.03) 1px, transparent 1px)",
        'neon-gradient': 'linear-gradient(45deg, #00f5ff, #bf00ff, #ff0080)',
        'cyber-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
      },
      boxShadow: {
        'neon-blue': '0 0 5px #00f5ff, 0 0 20px #00f5ff, 0 0 35px #00f5ff',
        'neon-purple': '0 0 5px #bf00ff, 0 0 20px #bf00ff, 0 0 35px #bf00ff',
        'neon-pink': '0 0 5px #ff0080, 0 0 20px #ff0080, 0 0 35px #ff0080',
        'neon-green': '0 0 5px #00ff41, 0 0 20px #00ff41, 0 0 35px #00ff41',
        'neon-orange': '0 0 5px #ffa500, 0 0 20px #ffa500, 0 0 35px #ffa500',
        'neon-red': '0 0 5px #ff0080, 0 0 20px #ff0080, 0 0 35px #ff0080',
        'neon-indigo': '0 0 5px #4b0082, 0 0 20px #4b0082, 0 0 35px #4b0082',
        'cyber-glow': '0 0 20px rgba(0, 245, 255, 0.5)',
        'dark-elevated': '0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 10px 10px -5px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite alternate',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'matrix': 'matrix 20s linear infinite',
      },
      keyframes: {
        'pulse-neon': {
          'from': { textShadow: '0 0 5px #00f5ff, 0 0 20px #00f5ff, 0 0 35px #00f5ff' },
          'to': { textShadow: '0 0 10px #00f5ff, 0 0 30px #00f5ff, 0 0 50px #00f5ff' }
        },
        'glow': {
          'from': { boxShadow: '0 0 5px #00f5ff, 0 0 20px #00f5ff' },
          'to': { boxShadow: '0 0 10px #00f5ff, 0 0 30px #00f5ff, 0 0 40px #00f5ff' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'matrix': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        }
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'matrix': ['Courier New', 'monospace'],
      },
      backdropBlur: {
        'cyber': '10px',
      }
    },
  },
  plugins: [],
}
