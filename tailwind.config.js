const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    purge: {
        safelist: ["alert-danger"],
    },
    theme: {
        extend: {
            minHeight: {
                100: "100vh",
            },
            borderWidth: {
                1: "1px",
            },
        },
        colors: {
            ...colors,
        },
        fontFamily: {
            sans: [
                // "Montserrat",
                "Source Sans Pro",
                "Roboto",
                "Helvetica",
                "Arial",
                "sans-serif",
            ],
            serif: ["Merriweather", "serif"],
        },
    },
    plugins: [],
};
