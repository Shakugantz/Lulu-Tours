// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        gradient: "gradientBG 8s ease infinite",
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite', // <--- PING SLOW
      },
      keyframes: {
        gradientBG: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};