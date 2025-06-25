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
</script>

<template>
  <div class="pointer-events-auto">
    <VueEasyLightbox
      :visible="true"
      :imgs="galleryImages"
      :loop="true"
      :move-disabled="true"
      :swipe-tolerance="40"
      @hide="router.back()"
    >
      <template #toolbar />
    </VueEasyLightbox>
  </div>
</template>

<style scoped>
:deep(.vel-img-title) {
  font-size: 1.25rem !important;
  line-height: 1.5 !important;
  padding: 0.5rem 1rem !important;
  text-align: center !important;
  color: #f00 !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.75) !important;
}
</style>
