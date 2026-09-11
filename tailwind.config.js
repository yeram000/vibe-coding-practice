/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 우주 느낌: 보라색 + 검정색
        space: {
          50: '#f3f0ff',
          100: '#e9e0ff',
          200: '#d8c3ff',
          300: '#c7a6ff',
          400: '#b689ff',
          500: '#a571ff', // 주 보라색
          600: '#9455ff',
          700: '#7d39ff',
          800: '#6b1dd9',
          900: '#4a0a9f',
          950: '#2a0254', // 진한 보라색
        },
        void: {
          50: '#f8f7fb',
          100: '#f0eef8',
          200: '#e3ddf0',
          300: '#ccc2e8',
          400: '#aca3d0',
          500: '#8b7fb8',
          600: '#6b5fa3',
          700: '#544885',
          800: '#3d3263',
          900: '#2a2346',
          950: '#1a1626', // 검정에 가까운 짙은 자색
        },
        dark: '#0f0f1e', // 우주 검정
      },
      backgroundImage: {
        'gradient-space': 'linear-gradient(135deg, #2a0254 0%, #1a1626 100%)',
        'gradient-void': 'radial-gradient(circle, rgba(165, 113, 255, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(165, 113, 255, 0.3)',
        'glow-purple-lg': '0 0 40px rgba(165, 113, 255, 0.2)',
      },
    },
  },
  plugins: [],
}
