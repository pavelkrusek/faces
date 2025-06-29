<template>
  <client-only>
    <div ref="wrapper" class="relative inline-block">
      <!-- Toggle button -->
      <button
        class="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
        @click="toggle"
      >
        <!-- Default share SVG icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 8a3 3 0 11-2.83-4H7a2 2 0 000 4h5.17A3 3 0 0115 8zM9 12v7a2 2 0 104 0v-7"
          />
        </svg>
      </button>

      <!-- Popup with default SocialShare buttons -->
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50"
        @click.stop
      >
        <ul class="p-2 space-y-2">
          <li v-for="network in networks" :key="network">
            <SocialShare :network="network" :url="url" :title="title" styled />
          </li>
        </ul>
      </div>
    </div>
  </client-only>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from '#imports'
// No need to import SocialShare when module installed; it's globally available

const networks = ['facebook', 'twitter', 'linkedin', 'telegram'] as const

const isOpen = ref(false)
const wrapper = ref<HTMLElement | null>(null)

const route = useRoute()
const url = ref('')
const title = ref('')

onMounted(() => {
  url.value = window.location.origin + route.fullPath
  title.value = document.title || ''
  document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})

function toggle() {
  isOpen.value = !isOpen.value
}

function onClickOutside(event: MouseEvent) {
  if (wrapper.value && !wrapper.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}
</script>

<style scoped></style>
