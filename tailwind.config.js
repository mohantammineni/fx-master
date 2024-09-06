/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
        spaceGrotesk: ['Space Grotesk', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      lineHeight: {
        100: '100%',
      },
      fontSize: {
        '14.85px': '14.85px',
      },
      backgroundColor: {
        'custom-neutral-900': '#012646',
        'custom-blue-400': '#40DEFF',
        'custom-cream': '#FCFBF9',
        'custom-gray-light': '#EAEAEA',
        'custom-dark-blue': '#0F51Bc',
        'custom-cobolt-blue': '#1052BC',
        'custom-maize-yellow': '#F4CE61',
      },
      textColor: {
        'custom-neutral-900': '#012646',
        'custom-sky-blue-500': '#40DEFF',
        'custom-ivory-500': '#FCFBF9',
        'custom-yellow': '#ffc92e',
        'custom-dark-blue': '#0F51BC',
        'custom-maiza': '#FFE77B',
        'custom-slate': '#425466',
      },
      borderColor: {
        'custom-sky-blue-500': '#40DEFF',
        'custom-neutral-900': '#012646',
        'custom-dark-blue': '#0F51BC',
        'custom-ultramarine-blue': '#3437F1',
      },
      borderRadius: {
        '4xl': '2.5rem',
      },
    },
  },
  plugins: [],
};
