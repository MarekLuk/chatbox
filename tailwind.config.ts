import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#eef4ff",
					100: "#d9e5ff",
					200: "#bcd1ff",
					300: "#8eb5ff",
					400: "#598cff",
					500: "#3363ff",
					600: "#1b40f5",
					700: "#142ce1",
					800: "#1725b6",
					900: "#19268f",
					950: "#141957",
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
