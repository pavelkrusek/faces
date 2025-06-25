import { defineNuxtPlugin } from '#app'
import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.css'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      glightbox: GLightbox,
    },
  }
})
