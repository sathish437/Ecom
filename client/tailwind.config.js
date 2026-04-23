/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: {
                    main: '#0F172A', // Slate 900 - Deep Rich Background
                    card: '#1E293B', // Slate 800 - Card Background
                    dark: '#020617', // Slate 950 - Darkest
                },
                accent: {
                    DEFAULT: '#7C3AED', // Violet 600
                    hover: '#6D28D9', // Violet 700
                    glow: 'rgba(124, 58, 237, 0.5)',
                },
                text: {
                    primary: '#F8FAFC', // Slate 50
                    muted: '#94A3B8', // Slate 400
                },
                border: {
                    soft: '#334155', // Slate 700
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-main': 'linear-gradient(to bottom right, #0F172A, #1E1E1E)',
                'gradient-card': 'linear-gradient(145deg, #1E293B, #0F172A)',
                'gradient-accent': 'linear-gradient(135deg, #7C3AED, #4F46E5)', // Violet to Indigo
            },
            boxShadow: {
                'glow': '0 0 20px rgba(124, 58, 237, 0.3)',
                'card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
            }
        },
    },
    plugins: [],
}
