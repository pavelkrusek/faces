<template>
  <div ref="mapRef" class="w-full h-screen" />
  <VueEasyLightbox
    :visible="showGallery"
    :imgs="galleryImages"
    :index="galleryIndex"
    @hide="showGallery = false"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Map as LeafletMap, Marker } from 'leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { usePeopleStore } from '~/stores/people'

const mapRef = ref<HTMLDivElement | null>(null)
const store = usePeopleStore()

const nuxtApp = useNuxtApp()
const imageMap = nuxtApp.$imageMap as Record<string, string[]>

const showGallery = ref(false)
const galleryImages = ref<{ src: string; title?: string }[]>([])
const galleryIndex = ref(0)

delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

onMounted(async () => {
  if (!mapRef.value) {
    console.error('Map container not found!')
    return
  }

  const bounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180))

  const map: LeafletMap = L.map(mapRef.value, {
    center: [20, 0],
    zoom: 3,
    minZoom: 3,
    maxZoom: 10,
    maxBounds: bounds,
    maxBoundsViscosity: 0.9,
  })

  L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
    {
      attribution:
        'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
      maxZoom: 16,
    },
  ).addTo(map)

  await store.fetchPeople()
  store.people.forEach((person) => {
    const marker: Marker = L.marker([person.lat, person.lng]).addTo(map)
    marker.on('click', () => {
      const urls = imageMap[person.id] || []
      galleryImages.value = urls.map((url) => ({
        src: url,
        title: `${person.name} — ${person.city}, ${person.country}`,
      }))
      galleryIndex.value = 0
      showGallery.value = true
    })
  })
})
</script>

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
