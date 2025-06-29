// import type { Config } from 'tailwindcss'
//
// const config: Config = {
//   content: [
//     './components/**/*.{vue,js,ts}',
//     './layouts/**/*.vue',
//     './pages/**/*.vue',
//     './composables/**/*.{js,ts}',
//     './app.vue',
//     './nuxt.config.{js,ts}',
//   ],
//   theme: {
//     extend: {
//       colors: {
//         'brand-red': '#CB2B3E',
//       },
//     },
//   },
//   plugins: [],
// }
//
// export default config

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#CB2B3E',
      },
    },
  },
  plugins: [],
}
