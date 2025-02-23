import type { Config } from 'tailwindcss'
import animate from "tailwindcss-animate"

export default {
content: [
    "./app/**/*.{js,jsx,ts,tsx}",
],
theme: {
    extend: {},
},
plugins: [
    animate
],
} satisfies Config

