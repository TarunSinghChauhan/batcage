/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    bg: '#000000',
                    surface: '#111111',
                    border: '#222222',
                },
                blood: {
                    DEFAULT: '#880808',
                    glow: 'rgba(136, 8, 8, 0.5)',
                }
            },
            animation: {
                'bat-fly': 'bat-fly 0.8s ease-in-out forwards',
            },
            keyframes: {
                'bat-fly': {
                    '0%': { transform: 'scale(0) translate(0, 0)', opacity: '1' },
                    '100%': { transform: 'scale(1.5) translate(100px, -100px)', opacity: '0' },
                }
            }
        },
    },
    plugins: [],
}
