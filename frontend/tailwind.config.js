/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{ts,js,jsx,tsx}"
    ],
    theme: {
      extend: {
        fontFamily: {
            handjet: ['Handjet', 'sans-serif'],
            kablammo: ['Kablammo', 'cursive'],
            poppins:['Poppins'],
            aclonica:["Aclonica"],
            suse: ['SUSE', 'sans-serif'],
        },
        colors: {
          // Dark mode colors
          "waikawa-200": "#D3E2F2", // hero text, courses, Explore button
          "waikawa-300": "#B9CFE8", // logo, button font
          "waikawa-400": "#9CB6DD", // sub-hero text
          "waikawa-600": "#6A7FC1", // line
          "waikawa-950": "#262C40", // sub-button background
          "bunker-950": "#0B0F14", // background, dark text
          "input-color":"#10172A",
          // Light mode colors
          "waikawa-100": "#EAEEF4", // background, main button text
          "waikawa-800": "#4A5989", // footers, subtext, courses
          "waikawa-900": "#414E6E", // logo
          "waikawa-950": "#262C40", // main button background, line, hero text
        }
      },
    },
    plugins: [],
  }
