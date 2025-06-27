export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const portalId = useRuntimeConfig().public.hubspotId
    const s = document.createElement('script')
    s.id = 'hs-script-loader'
    s.async = true
    s.defer = true
    s.src = `//js.hs-scripts.com/${portalId}.js`
    document.head.appendChild(s)
  }
})
