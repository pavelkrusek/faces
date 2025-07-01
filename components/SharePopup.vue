<template>
  <div ref="wrapper" class="relative inline-block">
    <!-- Toggle button -->
    <button
      class="p-3 bg-brand-red text-white rounded-full shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 pointer-events-auto"
      title="Share this page"
      type="button"
      @click="toggle"
    >
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
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
        />
      </svg>
    </button>

    <!-- Popup -->
    <div
      v-if="isOpen"
      class="absolute top-full right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl z-50 pointer-events-auto"
      @click.stop
    >
      <div class="p-3">
        <h3 class="text-sm font-medium text-gray-900 mb-2">Share this page</h3>
        <div class="grid grid-cols-4 gap-2">
          <SocialShare
            v-for="network in networks"
            :key="network"
            :network="network"
            :styled="true"
            :label="false"
          />
        </div>
      </div>
      <div
        class="absolute bottom-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-white"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const networks = [
  'facebook',
  'twitter',
  'linkedin',
  'pinterest',
  'reddit',
  'bluesky',
  'threads',
  'pocket',
  'whatsapp',
  'telegram',
  'email',
] as const

const isOpen = ref(false)
const wrapper = ref<HTMLElement | null>(null)

const pageTitle = ref('43 Portraits of Odense: A Global Community')

onMounted(() => {
  document.addEventListener('click', onClickOutside)

  if (typeof document !== 'undefined' && document.title) {
    pageTitle.value = document.title
  }
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
