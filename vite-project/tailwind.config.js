/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "100vh": "100vh",
        "75vh": "75vh",
        "50vh": "50vh",
        "25vh": "25vh",
      },
      width: {
        "100vw": "100vw",
        "75vw": "75vw",
        "50vw": "50vw",
        "25vw": "25vw",
      },
    },
  },
  plugins: [],
};
