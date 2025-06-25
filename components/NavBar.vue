<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface NavLink {
  name: string
  to: string
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
  <div>
    <!-- Navbar wrapper -->
    <nav
      class="fixed top-0 left-0 w-full h-14 z-10 bg-cyan-950 bg-opacity-80 backdrop-blur-sm px-4 flex items-center justify-between""
    >
      <!-- Logo + project name -->
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
        <li v-for="link in props.links" :key="link.name">
          <NuxtLink :to="link.to" class="hover:underline">
            {{ link.name }}
          </NuxtLink>
        </li>
      </ul>

      <!-- Mobile hamburger toggle -->
      <button
        class="md:hidden focus:outline-none"
        aria-label="Toggle menu"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <svg
          v-if="!mobileMenuOpen"
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
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </nav>

    <!-- Mobile menu panel -->
    <transition name="slide-down">
      <div
        v-if="mobileMenuOpen"
        class="fixed top-0 left-0 w-full h-screen bg-white z-20 p-6 flex flex-col space-y-4"
      >
        <NuxtLink
          v-for="link in props.links"
          :key="link.name"
          :to="link.to"
          class="text-xl font-medium"
        >
          {{ link.name }}
        </NuxtLink>
      </div>
    </transition>
  </div>
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
