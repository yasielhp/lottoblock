/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				sprigWood: '#F4F7EF',
				baliHai: '#90A7B0',
				creamCan: '#F2D069',
				mojo: '#CA5143',
				mirage: '#1F1C32',
			},
		},
	},
	plugins: [],
}
