/** @type {import('tailwindcss').Config} */
module.exports = {

  content: ["./source-base/**/*.{hbs,html,js}"],//cho phép tailwind trỏ đến những tệp html và js trong source base để phát hiện những class đã dùng đã loại bỏ purge vì tailwind đã cải tiến không impport những class không dùng
  darkMode: 'selector',
  // darkMode: ['variant', [
  //   '@media (prefers-color-scheme: dark) { &:not(.light *) }',
  //   '&:is(.dark *)',
  // ]],
  theme: {
    // screens: {
    //   sm: '480px',
    //   md: '768px',
    //   lg: '976px',
    //   xl: '1440px',
    // },
    // colors: {
    //   'blue': '#1fb6ff',
    //   'pink': '#ff49db',
    //   'orange': '#ff7849',
    //   'green': '#13ce66',
    //   'gray-dark': '#273444',
    //   'gray': '#8492a6',
    //   'gray-light': '#d3dce6',
    // },
    // fontFamily: {
    //   sans: ['Graphik', 'sans-serif'],
    //   serif: ['Merriweather', 'serif'],
    // },
    extend: {
      // spacing: {
      //   '128': '32rem',
      //   '144': '36rem',
      },
    //   borderRadius: {
    //     '4xl': '2rem',
    //   }
    // }
  },
  plugins: [],
  prefix: 'tw-',//prefix tailwind
}

