module.exports = {
  content: ["./src/**/*.{html,js}"], 
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeInAnimation 0.4s ease-in forwards',
      },
      keyframes: {
        fadeInAnimation: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [require("daisyui")],
}
