import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Person {
  id: number
  name: string
  lat: number
  lng: number
  country: string
  city: string
}

export const usePeopleStore = defineStore('peopleStore', () => {
  const people = ref<Person[]>([])
  const isLoading = ref(false)

  async function fetchPeople() {
    isLoading.value = true
    try {
      const res = await fetch('/people.json')
      if (!res.ok) throw new Error('Network response was not ok')
      people.value = await res.json()
    } catch (e) {
      console.error('Failed loading people:', e)
    } finally {
      isLoading.value = false
    }
  }

  return {
    people,
    isLoading,
    fetchPeople,
  }
})
