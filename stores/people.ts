import { defineStore } from 'pinia'
import { ref } from 'vue'
import rawPeople from '~/data/people.json'

export interface Person {
  id: number
  name: string
  lat: number
  lng: number
  country: string
  city: string
}

const modules = import.meta.glob<{ default: string }>(
  '../assets/images/portraits/*/*.{png,jpg,jpeg,webp,svg}',
  { eager: true },
)

export const usePeopleStore = defineStore('peopleStore', () => {
  const people = ref<Person[]>([...rawPeople])

  const imageMap = (() => {
    const m: Record<string, string[]> = {}
    Object.entries(modules).forEach(([path, mod]) => {
      const parts = path.split('/')
      const idx = parts.indexOf('portraits')
      if (idx < 0 || parts.length < idx + 2) return
      const id = parts[idx + 1]
      ;(m[id] ||= []).push(mod.default)
    })
    return m
  })()

  const getImages = (person: Person) => {
    return (imageMap[person.id] || []).map((src) => ({
      src,
      title: `${person.name} — ${person.city}, ${person.country}`,
    }))
  }

  return { people, getImages }
})
