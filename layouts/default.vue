<script setup lang="ts"></script>

<template>
  <div class="relative w-full h-screen">
    <ClientOnly>
      <WorldMap class="z-0" />
    </ClientOnly>
    <div class="absolute inset-0 z-10 pointer-events-none">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
