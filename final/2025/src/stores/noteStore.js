import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import noteSheetAPI from '@/features/noteSheetAPI'

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
  // need to update
  const user = ref('tangerine')

  const userNotes = computed(() => {
    return notes.value.filter((note) => note.user === user.value)
  })

  function formatNotesFromGoogle(notes) {
    // return notes.map((arrNote) => {
    return notes.map((note) => {
      return {
        ...note,
        pros: note.pros.split('\\n').join('\n'),
        cons: note.cons.split('\\n').join('\n'),
        location: JSON.parse(note.location),
      }

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
  }

  function formatNotesToGoogle(notes) {
    return notes.map((objNote) => {
      const arrNote = []

      refList.forEach((property, index) => {
        arrNote[index] = objNote[property]
      })

      return arrNote
    })
  }

  async function getNotesFromGoogleSheet() {
    const res = await noteSheetAPI.GET()
    // const data = await googleSheet.GET('/values/工作表1')

    // const originalNotes = [...data.values].slice(1, data.values.length)
    // const formattedNotes = formatNotesFromGoogle(originalNotes)

    // notes.value = formattedNotes

    notes.value = formatNotesFromGoogle(res.data)
  }

  async function createNotesToGoogleSheet(newNote) {
    const res = await noteSheetAPI.POST(newNote)
    console.log(res)
  }

  const userLocation = ref({})

  function updateUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      userLocation.value = { lat: position.coords.latitude, lng: position.coords.longitude }
    })
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
    // 擋掉重複的筆記
    // const userNotes = notes.value.filter((note) => note.user === newNote.user)
    if (userNotes.value.find((note) => note.id === newNote.id)) {
      return
    }

    notes.value = [...notes.value, newNote]

    createNotesToGoogleSheet(newNote)
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

  return {
    getNotesFromGoogleSheet,
    notes,
    userNotes,
    userLocation,
    updateUserLocation,
    notesSortedByDistance,
    createNote,
    updateNote,
    deleteNote,
  }
})
