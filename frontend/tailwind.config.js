/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Scan these files for Tailwind classes
  ],
  mode: "jit",
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "400px": "400px",
      },
      animation: {
        "fade-in-out": "fadeInOut 5s ease-in-out",
      },
      keyframes: {
        fadeInOut: {
          "0%": { opacity: 0 },
          "10%": { opacity: 1 },
          "90%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      backgroundImage: {
        "custom-bg": "url('./src/Assests/brand-color-with-out-pattern.png')",
      },
    },
  },
  plugins: [],
};
