import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs pour ton profil Data/IA
        'dakar-blue': '#0066ff',
        'esp-purple': '#7000ff',
      },
    },
  },
  plugins: [],
};
export default config;