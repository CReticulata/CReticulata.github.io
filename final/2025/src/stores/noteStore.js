import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNoteStore = defineStore('noteStore', () => {
  const notes = ref([
    {
      id: 1,
      storeName: '好想廚房',
      foodScore: 5,
      serviceScore: 5,
      pros: '好吃',
      cons: '',
      location: { lat: 22.9921076, lng: 120.1972322 },
      googlemapURL: 'https://maps.app.goo.gl/riNzwSekiLx4hWK18',
      address: '2樓, No. 117號友愛街中西區台南市700',
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
  ])

  function updateNote(newNote, index) {
    notes.value = [
      ...notes.value.slice(0, index),
      newNote,
      ...notes.value.slice(index + 1, notes.value.length),
    ]
  }

  function deleteNote(index) {
    notes.value = [
      ...notes.value.slice(0, index),
      ...notes.value.slice(index + 1, notes.value.length),
    ]
  }

  return { notes, updateNote, deleteNote }
})
