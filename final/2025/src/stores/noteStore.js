import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getDistanceBetweenPoints } from '@/features/utilities'
import noteSheetAPI from '@/features/noteSheetAPI'

export const useNoteStore = defineStore('noteStore', () => {
  const originalNotes = ref([])
  const notes = ref([])
  const user = ref({})
  const isSynchronize = ref(false)

  const uniqueCities = computed(() => {
    const allCities = notes.value.map((note) => note.city).filter((city) => city != null)
    return Array.from(new Set(allCities))
  })

  function setUserInfoAndGetNotes(info) {
    user.value = {
      ID: info.sub,
      fullName: info.name,
      picture: info.picture,
      email: info.email,
    }

    getDataFromGoogleSheet()
  }

  function clearUserInfoAndNotes() {
    user.value = {}
    notes.value = []
  }

  async function getCityFromPlaceId(placeId) {
    // console.log('Calling geocoding')
    const { Geocoder } = await google.maps.importLibrary('geocoding')
    const geocoder = new Geocoder()
    const res = await geocoder.geocode({ placeId: placeId })
    const addressComponents = res.results[0].address_components

    const cityComponent = addressComponents.find(
      (part) => part.types[0] === 'administrative_area_level_1',
    )

    return cityComponent.long_name
  }

  function formatNotesFromGoogle(notes) {
    return notes.map((note) => {
      return {
        ...note,
        foodScore: Number(note.foodScore),
        serviceScore: Number(note.serviceScore),
        pros: note.pros.split('\\n').join('\n'),
        cons: note.cons.split('\\n').join('\n'),
        location: JSON.parse(note.location),
        photos: JSON.parse(note.photos),
      }
    })
  }

  function formatNoteToGoogle(note) {
    return {
      ...note,
      location: JSON.stringify(note.location),
      photos: JSON.stringify(note.photos),
    }
  }

  async function getDataFromGoogleSheet() {
    // isSynchronize.value = true

    const res = await noteSheetAPI.GET()

    originalNotes.value = formatNotesFromGoogle(res.data)
    notes.value = formatNotesFromGoogle(res.data)

    // privacy
    user.value = {
      ...user.value,
      isPublic: res.privacy === 'public',
    }

    // isSynchronize.value = false
  }

  async function updateNotesToGoogleSheet(newNote) {
    isSynchronize.value = true

    const pendingNote = await formatNoteToGoogle(newNote)
    const res = await noteSheetAPI.UPDATE(pendingNote)
    // console.log(res)
    await getDataFromGoogleSheet()

    isSynchronize.value = false
  }

  // default at Taipei Main Station
  const userLocation = ref({ lat: 25.0476133, lng: 121.5148313 })

  function updateUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      userLocation.value = { lat: position.coords.latitude, lng: position.coords.longitude }
    })
  }

  const notesSortedByDistance = computed(() => {
    return [...notes.value].sort((noteA, noteB) => {
      const distanceBtwUserAndA = getDistanceBetweenPoints(
        userLocation.value.lat,
        userLocation.value.lng,
        noteA.location.lat,
        noteA.location.lng,
      )

      const distanceBtwUserAndB = getDistanceBetweenPoints(
        userLocation.value.lat,
        userLocation.value.lng,
        noteB.location.lat,
        noteB.location.lng,
      )

      return distanceBtwUserAndA - distanceBtwUserAndB
    })
  })

  function createNote(newNote) {
    // 擋掉重複的筆記
    if (notes.value.find((note) => note.id === newNote.id && note.user === newNote.user)) {
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
    await getDataFromGoogleSheet()

    isSynchronize.value = false
  }

  async function changePrivacy() {
    isSynchronize.value = true

    const res = await noteSheetAPI.CHANGEPRIVACY()
    // console.log(res)

    isSynchronize.value = false
  }

  return {
    user,
    uniqueCities,
    setUserInfoAndGetNotes,
    clearUserInfoAndNotes,
    getDataFromGoogleSheet,
    isSynchronize,
    originalNotes,
    notes,
    userLocation,
    updateUserLocation,
    notesSortedByDistance,
    createNote,
    updateNote,
    deleteNote,
    changePrivacy,
  }
})
