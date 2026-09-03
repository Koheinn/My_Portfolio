/** @type {import('tailwindcss').Config} */
export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#050505',
        'surface': '#111111',
        'surface-light': '#1A1A1A',
        'accent': '#E5E5E5',
        'accent-dim': '#888888',
        'brand': '#3B82F6', // Blue accent
        'data': '#10B981', // Green for data
        'ai': '#8B5CF6' // Purple for AI
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-glow': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
