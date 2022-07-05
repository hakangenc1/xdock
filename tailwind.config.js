/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "volvo-blue": "#346187",
        "volvo-success": "#abe2ab",
      },
      borderWidth: {
        6: "6px",
      },
      borderColor: {
        "volvo-border": "#346187",
        "volvo-success-border": "#38a238",
        "volvo-warning-border": "#f9a429",
        "volvo-information-border": "#427cac",
        "volvo-success-button-border": "#abe2ab",
        "volvo-gray": "#cccccc",
      },
      backgroundColor: {
        "volvo-gray": "#cccccc",
        "volvo-gray-hover": "#bfbbbb",
        "volvo-dark-blue": "#2f3c48",
        "volvo-success-button-background": "#4f667a",
        "volvo-success-button-background-hover": "#58738a",
      },
      width: {
        320: "320px",
      },
    },
  },
  plugins: [],
};
