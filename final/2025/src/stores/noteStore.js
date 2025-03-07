import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import googleSheet from '@/features/googleSheet'

// const refTable = {
//   user: 0,
//   placeId: 1,
//   storeName: 2,
//   foodScore: 3,
//   serviceScore: 4,
//   pros: 5,
//   cons: 6,
//   location: 7,
//   googlemapURL: 8,
//   address: 9,
// }
const refList = [
  'user',
  'id',
  'storeName',
  'foodScore',
  'serviceScore',
  'pros',
  'cons',
  'location',
  'googlemapURL',
  'address',
]

export const useNoteStore = defineStore('noteStore', () => {
  const notes = ref([])

  async function getNotesFromGoogleSheet() {
    const data = await googleSheet.GET('/values/工作表1')
    // 整理成物件
    const originalNotes = [...data.values].slice(1, data.values.length)
    console.log(originalNotes)

    const formattedNotes = originalNotes.map((arrNote) => {
      return arrNote.reduce((note, currValue, currIndex) => {
        if (refList[currIndex] === 'foodScore' || refList[currIndex] === 'serviceScore') {
          note[refList[currIndex]] = Number(currValue)

          return note
        }

        if (refList[currIndex] === 'location') {
          note[refList[currIndex]] = JSON.parse(currValue)

          return note
        }

        note[refList[currIndex]] = currValue

        return note
      }, {})
    })

    // console.log(notes)

    notes.value = formattedNotes
  }

  async function updateNotesToGoogleSheet() {
    // to-do
  }

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
    getNotesFromGoogleSheet,
    notes,
    notesSortedByDistance,
    createNote,
    updateNote,
    deleteNote,
    userLocation,
    updateUserLocation,
  }
})
