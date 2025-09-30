// tailwind.config.js
import { type Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",  // app router
    "./pages/**/*.{js,ts,jsx,tsx}", // legacy pages
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   extend: {
  colors: {
    brand: {
      primary: "#FF3A0F",
      secondary: "#1FB2A6",
      hover: "#CC2F0C",
    },
    surface: {
      base: "#F9F9F9",
      text: "#1E1E1E",
    },
    btn:{
      primary: '#666666'
    }
  }
}
  },
  plugins: [], 
}

export default config