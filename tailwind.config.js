const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all your source files
    "./public/index.html", // Include your HTML file(s) if applicable
  ],
  theme: {
    extend: {
      fontFamily: {
        spaceGrotesk: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
