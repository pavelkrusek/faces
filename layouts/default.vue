<script setup lang="ts">
const links = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/' },
  { name: 'Contact', to: '/' },
]
</script>

<template>
  <div class="flex flex-col h-screen">
    <header class="flex-none h-14">
      <NavBar
        logo-src="/logo.svg"
        project-name="43 Portraits of Odense"
        :links="links"
      />
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

<style scoped />
