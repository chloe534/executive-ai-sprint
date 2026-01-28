import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      colors: {
        executive: {
          bg: '#0a0a0a',
          card: '#141414',
          border: '#262626',
          accent: '#3b82f6',
          success: '#22c55e',
        },
      },
    },
  },
  plugins: [],
}
export default config
