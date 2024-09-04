/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: ['Poppins'],
      backgroundColor: {
        'custom-neutral-900': '#012646',
        'custom-blue-400': '#40DEFF',
        'custom-cream': '#FCFBF9',
        'custom-gray-light': '#EAEAEA'
      },
      textColor: {
        "custom-neutral-900": "#012646",
        "custom-sky-blue-500": "#40DEFF",
        "custom-ivory-500": "#FCFBF9"
      },
      borderColor: {
        "custom-sky-blue-500": "#40DEFF",
        'custom-neutral-900': '#012646'
      },
      borderRadius: {
        '4xl': '2.5rem'
      }
    },
  },
  plugins: [],
}
