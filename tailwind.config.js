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
    colors: {
      'primary-black': '#111827',
      'hover-btn-nav':'#242424',
      'primary-home':'#7961f2',
      'primary-opacity-home':'rgba(var(--opacity-background-color-input), <alpha-value>)',
    },
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
}

