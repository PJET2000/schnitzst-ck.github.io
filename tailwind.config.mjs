/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			/* height: {
				fIconHeight: '4rem', // Adjust base height as needed
				'fIconHeight-xl': '60rem', // Adjust height for xl screens as needed
			},
			width: {
				fIconWidth: '4rem', // Adjust base width as needed
				'fIconWidth-xl': '6rem', // Adjust width for xl screens as needed
			}, */
		},
	},
	// darkMode: 'media',
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
			  mytheme: {
				"primary": "#a89884ff",
				"secondary": "#f6d860",
				"accent": "#37cdbe",
				"neutral": "#a89884ff",
				"base-100": "0c0f12ff",

				"base-content": "#FFF5ED",
	  
				"--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
				"--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
				"--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
				"--animation-btn": "0.25s", // duration of animation when you click on button
				"--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
				"--btn-focus-scale": "0.95", // scale transform of button when you focus on it
				"--border-btn": "1px", // border width of buttons
				"--tab-border": "1px", // border width of tabs
				"--tab-radius": "0.5rem", // border radius of tabs
			  },
			},
		  ],
	},
}

//  text-base-content