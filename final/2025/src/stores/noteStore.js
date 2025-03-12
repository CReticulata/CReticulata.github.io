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
  const originalNotes = ref([])
  const notes = ref([])
  const user = ref({})

  function setUserInfoAndGetNotes(info) {
    user.value = {
      ID: info.sub,
      fullName: info.name,
      picture: info.picture,
      email: info.email,
    }

    getNotesFromGoogleSheet()
  }

  function clearUserInfoAndNotes() {
    user.value = {}
    notes.value = []
  }

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
    return notes.map((note) => {
      return { ...note, location: JSON.stringify(note.location) }
    })
    return notes.map((objNote) => {
      const arrNote = []

      refList.forEach((property, index) => {
        arrNote[index] = objNote[property]
      })

      return arrNote
    })
  }

  function formatNoteToGoogle(note) {
    return { ...note, location: JSON.stringify(note.location) }
  }

  const isSynchronize = ref(false)

  async function getNotesFromGoogleSheet() {
    isSynchronize.value = true

    const res = await noteSheetAPI.GET()

    originalNotes.value = formatNotesFromGoogle(res.data)
    notes.value = formatNotesFromGoogle(res.data)

    isSynchronize.value = false
  }

  async function updateNotesToGoogleSheet(newNote) {
    isSynchronize.value = true

    const pendingNote = formatNoteToGoogle(newNote)
    const res = await noteSheetAPI.UPDATE(pendingNote)
    // console.log(res)
    await getNotesFromGoogleSheet()

    isSynchronize.value = false
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
    if (notes.value.find((note) => note.id === newNote.id)) {
      return
    }

    notes.value = [...notes.value, newNote]

    updateNotesToGoogleSheet(newNote)
  }

  function updateNote(newNote) {
    const index = notes.value.findIndex((note) => note.id === newNote.id)

    notes.value = [
      ...notes.value.slice(0, index),
      newNote,
      ...notes.value.slice(index + 1, notes.value.length),
    ]

    updateNotesToGoogleSheet(newNote)
  }

  function deleteNote(targetNote) {
    const index = notes.value.findIndex((note) => note.id === targetNote.id)

    notes.value = [
      ...notes.value.slice(0, index),
      ...notes.value.slice(index + 1, notes.value.length),
    ]

    deleteNoteOnGoogleSheet(targetNote)
  }

  async function deleteNoteOnGoogleSheet(note) {
    isSynchronize.value = true

    const res = await noteSheetAPI.DELETE(note)
    // console.log(res)
    await getNotesFromGoogleSheet()

    isSynchronize.value = false
  }

  return {
    user,
    setUserInfoAndGetNotes,
    clearUserInfoAndNotes,
    getNotesFromGoogleSheet,
    isSynchronize,
    originalNotes,
    notes,
    userLocation,
    updateUserLocation,
    notesSortedByDistance,
    createNote,
    updateNote,
    deleteNote,
  }
})
