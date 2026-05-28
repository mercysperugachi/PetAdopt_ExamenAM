/** @type {import('tailwindcss').Config} */
module.exports = {
  // Asegúrate de incluir la carpeta src donde estará tu capa de presentación
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#0a7ea4',
        background: '#E6F4FE',
      }
    },
  },
  plugins: [],
}