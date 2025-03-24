import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getDistanceBetweenPoints } from '@/features/utilities'
import noteSheetAPI from '@/features/noteSheetAPI'

export const useNoteStore = defineStore('noteStore', () => {
  const originalNotes = ref([])
  const notes = ref([])
  const user = ref({})

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

    getNotesFromGoogleSheet()
  }

  function clearUserInfoAndNotes() {
    user.value = {}
    notes.value = []
  }

  async function getCityFromPlaceId(placeId) {
    const { Geocoder } = await google.maps.importLibrary('geocoding')
    const geocoder = new Geocoder()
    const res = await geocoder.geocode({ placeId: placeId })
    const addressComponents = res.results[0].address_components

    const cityComponent = addressComponents.find(
      (part) => part.types[0] === 'administrative_area_level_1',
    )

    return cityComponent.long_name
  }

  async function setCity(notes) {
    const notesWithCity = []
    for (const note of notes) {
      try {
        const city = await getCityFromPlaceId(note.id)
        notesWithCity.push({
          ...note,
          city: city,
        })
      } catch (error) {
        console.log(error)
      }
    }
    return notesWithCity
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

      // return arrNote.reduce((note, currValue, currIndex) => {
      //   if (refList[currIndex] === 'foodScore' || refList[currIndex] === 'serviceScore') {
      //     note[refList[currIndex]] = Number(currValue)

      //     return note
      //   }

      //   if (refList[currIndex] === 'photos') {
      //     note[refList[currIndex]] = JSON.parse(currValue)

      //     return note
      //   }

      //   note[refList[currIndex]] = currValue

      //   return note
      // }, {})
    })
  }

  function formatNotesToGoogle(notes) {
    return notes.map((note) => {
      return { ...note, location: JSON.stringify(note.location) }
    })
    // return notes.map((objNote) => {
    //   const arrNote = []

    //   refList.forEach((property, index) => {
    //     arrNote[index] = objNote[property]
    //   })

    //   return arrNote
    // })
  }

  function formatNoteToGoogle(note) {
    return { ...note, location: JSON.stringify(note.location), photos: JSON.stringify(note.photos) }
  }

  const isSynchronize = ref(false)

  async function getNotesFromGoogleSheet() {
    isSynchronize.value = true

    const res = await noteSheetAPI.GET()

    originalNotes.value = formatNotesFromGoogle(res.data)
    notes.value = formatNotesFromGoogle(res.data)
    notes.value = await setCity(notes.value)

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
    uniqueCities,
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
