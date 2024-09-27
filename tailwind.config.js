/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"gradient-creative":
					"linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))",
			},
			colors: {
				"bg-gradient-from": "#7D4BFF",
				"bg-gradient-to": "#0ebeff",
			},
			animation: {
				"slow-pulse": "pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite",
			},
		},
	},
	plugins: [],
};
