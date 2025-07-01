<script setup lang="ts">
import { ref } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { useRouter } from 'vue-router'

interface NavLink {
  name: string
  to: RouteLocationRaw
}

const props = defineProps<{
  logoSrc: string
  projectName?: string
  links: NavLink[]
}>()

const mobileMenuOpen = ref(false)
const router = useRouter()
router.afterEach(() => {
  mobileMenuOpen.value = false
})
</script>

<template>
  <nav
    class="w-full h-full bg-brand-red bg-opacity-80 backdrop-blur-sm px-4 flex items-center justify-between z-10"
  >
    <!-- Logo & project name -->
    <NuxtLink to="/" class="flex items-center">
      <img :src="props.logoSrc" alt="Logo" class="h-8 w-8 mr-2" >
      <span
        v-if="props.projectName"
        class="hidden md:inline text-lg font-semibold"
      >
        {{ props.projectName }}
      </span>
    </NuxtLink>

    <!-- Desktop links -->
    <ul class="hidden md:flex space-x-6">
      <li v-for="l in props.links" :key="l.name">
        <NuxtLink :to="l.to" class="hover:underline">{{ l.name }}</NuxtLink>
      </li>
    </ul>

    <!-- Mobile hamburger toggle -->
    <button
      class="md:hidden focus:outline-none"
      aria-label="Toggle menu"
      @click="mobileMenuOpen = !mobileMenuOpen"
    >
      <!-- hamburger icon -->
      <svg
        v-if="!mobileMenuOpen"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>

      <!-- close (X) icon -->
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </nav>

  <!-- Mobile menu panel -->
  <transition name="slide-down">
    <div
      v-if="mobileMenuOpen"
      class="fixed inset-0 z-20 bg-white p-6 flex flex-col space-y-4"
    >
      <NuxtLink
        v-for="l in props.links"
        :key="l.name"
        :to="l.to"
        class="text-xl font-medium"
      >
        {{ l.name }}
      </NuxtLink>
    </div>
  </transition>
</template>

<style scoped>
.slide-down-enter-active {
  transition: transform 0.2s ease-out;
}

.slide-down-leave-active {
  transition: transform 0.2s ease-in;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
}
</style>
