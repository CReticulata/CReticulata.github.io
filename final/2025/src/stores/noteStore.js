import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNoteStore = defineStore('noteStore', () => {
  const notes = ref([
    {
      id: 1,
      storeName: '劉記川味牛肉麵',
      foodScore: 5,
      serviceScore: 5,
      pros: '好吃',
      cons: '',
      location: { lat: 25.0154945, lng: 121.5299566 },
      googlemapURL: 'https://maps.app.goo.gl/MR9qaHDdrba9wA5K6',
      address: '100台北市中正區羅斯福路三段316巷8弄6號',
    },
    {
      id: 2,
      storeName: '護境松王麵店',
      foodScore: 4,
      serviceScore: 3,
      pros: '細麵好吃',
      cons: '粗麵還好\n外帶不好吃',
      location: { lat: 22.991695, lng: 120.1956904 },
      googlemapURL: 'https://maps.app.goo.gl/PzXKZAiShVHGTBuW7',
      address: '700台南市中西區友愛街201巷9號',
    },
    {
      id: 3,
      storeName: '小東路麻辣關東煮',
      foodScore: 4,
      serviceScore: 3,
      pros: '好吃',
      cons: '有點太辣了\n人很多要等很久',
      location: { lat: 22.9973625, lng: 120.2181992 },
      googlemapURL: 'https://maps.app.goo.gl/Eni5d62NJFSSHaUq9',
      address: '701台南市東區小東路108號',
    },
  ])

  const notesSortedByDistance = computed(() => {
    return [...notes.value].sort((noteA, noteB) => {
      const distanceBtwUserAndA = Math.hypot(
        noteA.location.lat - userLocation.value.lat,
        noteA.location.lng - userLocation.value.lng,
      )

      const distanceBtwUserAndB = Math.hypot(
        noteB.location.lat - userLocation.value.lat,
        noteB.location.lng - userLocation.value.lng,
      )

      return distanceBtwUserAndA - distanceBtwUserAndB
    })
  })

  function createNote(newNote) {
    notes.value = [...notes.value, newNote]
  }

  function updateNote(newNote) {
    const index = notes.value.findIndex((note) => note.id === newNote.id)

    notes.value = [
      ...notes.value.slice(0, index),
      newNote,
      ...notes.value.slice(index + 1, notes.value.length),
    ]
  }

  function deleteNote(targetNote) {
    const index = notes.value.findIndex((note) => note.id === targetNote.id)

    notes.value = [
      ...notes.value.slice(0, index),
      ...notes.value.slice(index + 1, notes.value.length),
    ]
  }

  const userLocation = ref({})

  function updateUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      userLocation.value = { lat: position.coords.latitude, lng: position.coords.longitude }
    })
  }

  return {
    notes,
    notesSortedByDistance,
    createNote,
    updateNote,
    deleteNote,
    userLocation,
    updateUserLocation,
  }
})
