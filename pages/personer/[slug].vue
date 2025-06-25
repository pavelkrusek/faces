<script setup lang="ts">
import { useRoute } from 'vue-router'

const store = usePeopleStore()
const route = useRoute()
const router = useRouter()

const rawSlug = route.params.slug as string
const id = Number(rawSlug.split('-')[0])
const person = store.people.find((p) => p.id === id)

if (!person) router.replace('/')

const galleryImages = store.getImages(person as Person)
const elements = galleryImages.map((img) => ({
  href: img.src,
  title: img.title,
}))

onMounted(() => {
  const { $glightbox } = useNuxtApp()
  const lb = $glightbox({
    elements,
    loop: true,
    touchNavigation: true,
    slideEffect: 'fade',
    closeOnOutsideClick: true,
    dragToleranceY: 0,
  })

  lb.on('open', () => {
    ;(document.activeElement as HTMLElement)?.blur()
  })

  lb.on('close', () => {
    router.push('/')
  })

  lb.open()
})
</script>

<template>
  <div class="pointer-events-auto" />
</template>

<style scoped></style>
