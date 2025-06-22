import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const modules = import.meta.glob(
    '../assets/images/portraits/*/*.{png,jpg,jpeg,webp,svg}',
    { eager: true },
  )

  const imageMap = {}
  Object.entries(modules).forEach(([filePath, module]) => {
    const parts = filePath.split('/')
    const idx = parts.indexOf('portraits')
    if (idx === -1 || parts.length < idx + 2) return
    const id = parts[idx + 1]
    imageMap[id] = imageMap[id] || []
    imageMap[id].push(module.default)
  })

  return {
    provide: {
      imageMap,
    },
  }
})
