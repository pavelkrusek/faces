<template>
  <div class="relative w-full h-full">
    <div ref="mapRef" class="w-full h-full z-0" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { LatLngExpression, Map as LeafletMap, Marker } from 'leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { usePeopleStore } from '~/stores/people'
import slugify from 'slugify'
import { useMediaQuery } from '@vueuse/core'

const mapRef = ref<HTMLDivElement | null>(null)
let map: LeafletMap | null = null

const store = usePeopleStore()

const isMobile = useMediaQuery('(max-width: 640px)')
const isCoarsePointer = useMediaQuery('(pointer: coarse)')
const hasTouchOnly = useMediaQuery('(pointer: coarse) and (any-hover: none)')

const shouldDisableKeyboard = computed(() => {
  return isMobile.value || isCoarsePointer.value || hasTouchOnly.value
})

const defaultCenter: LatLngExpression = [20, 0]
const mobileCenter: LatLngExpression = [40, 15]

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

  const initial = isMobile.value ? mobileCenter : defaultCenter

  const bounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180))

  map = L.map(mapRef.value, {
    keyboard: !shouldDisableKeyboard.value,
    center: initial,
    zoom: 3,
    minZoom: 3,
    maxZoom: 10,
    maxBounds: bounds,
    maxBoundsViscosity: 0.9,
    preferCanvas: true,
  })

  L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
    {
      attribution:
        'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
      maxZoom: 16,
    },
  ).addTo(map)

  const canvasRenderer = L.canvas({ padding: 0.5 })
  const odense: LatLngExpression = [55.4038, 10.4024]
  const spokeLayer = L.layerGroup().addTo(map)

  store.people.forEach((person) => {
    const marker: Marker = L.marker([person.lat, person.lng]).addTo(map)
    marker.on('click', () => {
      const slug = `${person.id}-${slugify(person.name, { lower: true, strict: true })}`
      navigateTo(`/personer/${slug}`)
    })
    const line = L.polyline([odense, [person.lat, person.lng]], {
      renderer: canvasRenderer,
      weight: 0.5,
      color: '#CB2B3E',
      opacity: 0.4,
      // dashArray: '4 4',
      interactive: false,
    })
    spokeLayer.addLayer(line)
  })
})

watch(isMobile, (mobile) => {
  if (map) {
    const newCenter = mobile ? mobileCenter : defaultCenter
    map.setView(newCenter, map.getZoom(), { animate: false })
  }
})

watch(shouldDisableKeyboard, (shouldDisable) => {
  if (map) {
    if (shouldDisable) {
      map.keyboard.disable()
    } else {
      map.keyboard.enable()
    }
  }
})
</script>

<style scoped>
@media (max-width: 640px) {
  :deep(.leaflet-control-zoom) {
    display: none !important;
  }
}
</style>
