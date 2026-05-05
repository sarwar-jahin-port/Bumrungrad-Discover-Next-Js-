/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      blue: '#28266F',
      gold: '#896F4F',
      green: '#128C45',
      white: '#ffffff',
      black: '#000000',
      cream: '#EDE6DE',
      red: '#FF0000',
      ash: '#ACA6A5',
    },
    extend: {
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', // 2s slow pulse
        'pulse-fast': 'pulse 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite', // 0.8s fast pulse
      },
    },
  },
  plugins: [],
};
