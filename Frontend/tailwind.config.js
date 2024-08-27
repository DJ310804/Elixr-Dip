/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake","retro","synthwave","valentine","cyberpunk"],
  },
  theme: {
    extend: {},
  },
  plugins: [

    daisyui,
  ],
}

