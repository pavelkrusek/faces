<script setup lang="ts">
const links = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Contact', to: '/contact' },
]
</script>

<template>
  <div class="flex flex-col h-screen">
    >
    <header class="h-10">
      <NavBar logo-src="/logo.svg" project-name="My Project" :links="links" />
    </header>

    <main class="flex-1 relative">
      <ClientOnly>
        <WorldMap class="absolute inset-0" />
      </ClientOnly>
      <div class="absolute inset-0 z-10 pointer-events-none">
        <slot />
      </div>
    </main>
  </div>
</template>
<!--43 Portraits of Odense-->

<style scoped />
