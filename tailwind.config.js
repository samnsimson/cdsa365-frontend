const colors = require('tailwindcss/colors')

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    purge: {
        safelist: [
            'alert-danger',
            'bg-red-100',
            'text-red-800',
            'bg-yellow-100',
            'text-yellow-800',
            'bg-green-100',
            'text-green-800',
            'bg-gray-100',
            'text-gray-800',
            'bg-sky-100',
            'text-sky-800',
        ],
    },
    theme: {
        extend: {
            minHeight: {
                100: '100vh',
            },
            borderWidth: {
                1: '1px',
            },
        },
        colors: {
            ...colors,
        },
        fontFamily: {
            sans: [
                // "Montserrat",
                'Source Sans Pro',
                'Roboto',
                'Helvetica',
                'Arial',
                'sans-serif',
            ],
            serif: ['Merriweather', 'serif'],
        },
    },
    plugins: [],
}
