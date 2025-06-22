<template>
  <div ref="mapRef" class="w-full h-screen" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Map as LeafletMap, Marker } from 'leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { usePeopleStore } from '~/stores/people'

const mapRef = ref<HTMLDivElement | null>(null)
const store = usePeopleStore()

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
    center: [50.0755, 14.4378],
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
    marker.bindPopup(`
      <div class="text-center">
        <img
          src="${person.city}"
          alt="${person.name}"
          class="w-20 h-20 rounded-full mx-auto mb-2"
        />
        <h3 class="text-lg font-semibold">${person.name}</h3>
        <p class="text-sm text-gray-200">${person.bio}</p>
      </div>
    `)
  })
})
</script>

<style scoped></style>
