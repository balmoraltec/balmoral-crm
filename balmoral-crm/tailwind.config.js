/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
      fontFamily: {
        sans: ['Roboto', 'Montserrat', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))', /* Dourado */
					foreground: 'hsl(var(--primary-foreground))', /* Branco */
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))', /* Cinza Escuro */
					foreground: 'hsl(var(--secondary-foreground))', /* Branco/Cinza claro */
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))', /* Cinza Médio */
					foreground: 'hsl(var(--muted-foreground))', 
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))', /* Laranja Escuro */
					foreground: 'hsl(var(--accent-foreground))', /* Branco */
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
        'brand-gold': 'var(--color-gold)',
        'brand-dark-gold': 'var(--color-dark-gold)',
        'brand-dark-orange': 'var(--color-dark-orange)',
        'brand-burnt-orange': 'var(--color-burnt-orange)',
        'brand-dark-gray': 'var(--color-dark-gray)',
        'brand-medium-gray': 'var(--color-medium-gray)',
        'brand-light-gray': 'var(--color-light-gray)',
        'brand-white': 'var(--color-white)',
        'brand-black': 'var(--color-black)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};