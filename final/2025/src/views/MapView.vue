<script setup>
import { ref } from 'vue'
import { useNoteStore } from '@/stores/noteStore'
import Note from '@/components/Note.vue'
import { onMounted } from 'vue'
import { watch } from 'vue'

const noteStore = useNoteStore()

const newNote = ref({
  user: noteStore.user.ID || '',
  id: '',
  storeName: '',
  foodScore: 0,
  serviceScore: 0,
  pros: '',
  cons: '',
  location: { lat: 0, lng: 0 },
  googlemapURL: '',
  address: '',
  photos: [],
})

const searchInput = ref('')

const isCreate = ref(false)
const isExist = ref(false)
const isNotLogin = ref(false)

// Initialize and add the map
let map
let infoWindow
let autocomplete

async function initMap() {
  // The location of userLocation
  const userLocation = noteStore.userLocation
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary('maps')
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker')

  // The map, centered at userLocation
  map = new Map(document.getElementById('map'), {
    zoom: 18,
    center: userLocation,
    mapId: 'DEMO_MAP_ID',
    gestureHandling: 'greedy',
  })

  // The marker, positioned at userLocation
  const marker = new AdvancedMarkerElement({
    map: map,
    position: userLocation,
    title: '目前位置',
  })

  map.addListener('click', (mapsMouseEvent) => {
    if (mapsMouseEvent.placeId) {
      getPlaceByIdAndShowInfoWindow(mapsMouseEvent.placeId, map)
    }
  })
}

async function getPlaceByIdAndShowInfoWindow(placeId, map) {
  const { Place } = await google.maps.importLibrary('places')

  // Use place ID to create a new Place instance.
  const place = new Place({
    id: placeId,
    requestedLanguage: 'zh_Hant', // optional
  })

  // Call fetchFields, passing the desired data fields.
  await place.fetchFields({
    fields: ['formattedAddress', 'googleMapsURI', 'location', 'displayName'],
  })
  // Log the result
  // console.log(place)

  setNote(
    placeId,
    place.displayName,
    { lat: place.location.lat(), lng: place.location.lng() },
    place.googleMapsURI,
    place.formattedAddress,
  )

  showInfoWindow(place.location, map, place.displayName, place.formattedAddress)
}

async function showInfoWindow(latLng, map, placeName, placeAddress) {
  const { InfoWindow } = await google.maps.importLibrary('maps')

  infoWindow = new InfoWindow({
    position: latLng,
    content: buildInfoWindowContent(placeName, placeAddress),
    maxWidth: 250,
  })

  infoWindow.open(map)

  // Add event listener after the infowindow is opened.
  google.maps.event.addListener(infoWindow, 'domready', function () {
    const button = document.querySelector('.create-note')

    if (button) {
      button.addEventListener('click', () => {
        if (noteStore.notes.find((note) => note.id === newNote.value.id)) {
          isExist.value = true
          infoWindow.close()
          return
        }

        if (!noteStore.user.ID) {
          isNotLogin.value = true
          infoWindow.close()
          return
        }
        isCreate.value = true
      })
    }
  })
}

function buildInfoWindowContent(placeName, placeAddress) {
  let content = `
    <div class="info-window">
      <h6>${placeName}</h6>
      <p>${placeAddress}</p>
      <div class=info-window__button>
        <button class="create-note">新增筆記</button>
      </div>
    </div>`
  return content
}

initMap()

watch(
  () => noteStore.userLocation,
  () => {
    initMap()
    autocomplete.setOptions({
      bounds: {
        north: noteStore.userLocation.lat + 0.1,
        south: noteStore.userLocation.lat - 0.1,
        east: noteStore.userLocation.lng + 0.1,
        west: noteStore.userLocation.lng - 0.1,
      },
    })
  },
)

onMounted(async () => {
  const input = document.querySelector('.search-input input')

  await google.maps.importLibrary('places')
  const defaultBounds = {
    north: noteStore.userLocation.lat + 0.1,
    south: noteStore.userLocation.lat - 0.1,
    east: noteStore.userLocation.lng + 0.1,
    west: noteStore.userLocation.lng - 0.1,
  }
  autocomplete = new google.maps.places.Autocomplete(input, {
    fields: ['place_id', 'geometry', 'formatted_address', 'name', 'url'],
    bounds: defaultBounds,
  })

  // autocomplete.bindTo('bounds', map)
  autocomplete.addListener('place_changed', () => {
    if (infoWindow) {
      infoWindow.close()
    }

    const place = autocomplete.getPlace()

    // console.log(place)

    if (!place.geometry || !place.geometry.location) {
      return
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport)
    } else {
      map.setCenter(place.geometry.location)
      map.setZoom(18)
    }

    setNote(
      place.place_id,
      place.name,
      {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      },
      place.url,
      place.formatted_address,
    )

    showInfoWindow(place.geometry.location, map, place.name, place.formatted_address)
  })
})

function onCreateNote(event) {
  infoWindow.close()

  isCreate.value = false

  const pendingNote = event
  newNote.value = {
    user: noteStore.user.ID,
    id: '',
    storeName: '',
    foodScore: 0,
    serviceScore: 0,
    pros: '',
    cons: '',
    location: { lat: 0, lng: 0 },
    googlemapURL: '',
    address: '',
    photos: [],
  }

  // 擋住重複的
  if (noteStore.notes.find((note) => note.id === pendingNote.id)) {
    isExist.value = true

    return
  }

  noteStore.createNote(pendingNote)
}

function setNote(placeId, storeName, location, googlemapURL, address) {
  newNote.value.id = placeId
  newNote.value.storeName = storeName
  newNote.value.location = location
  newNote.value.googlemapURL = googlemapURL
  newNote.value.address = address
}

watch(
  () => noteStore.user,
  () => {
    newNote.value.user = noteStore.user.ID
  },
)
</script>

<template>
  <div>
    <q-input
      v-model="searchInput"
      class="search-input"
      outlined
      placeholder="在這裡搜尋"
      color="red"
    ></q-input>

    <div class="separator row flex-center">
      <div class="text text-grey-7 q-py-sm">或直接點選地點</div>
    </div>

    <div id="map" @touchstart.stop @mousedown.stop></div>

    <q-dialog v-model="isCreate" persistent>
      <Note
        :isCreate="true"
        @update:isCreate="isCreate = $event"
        :noteInput="newNote"
        @create:note="onCreateNote"
      ></Note>
    </q-dialog>

    <q-dialog v-model="isExist">
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="warning" color="negative" size="24px" />
          <span class="q-ml-sm">已經寫過這家店的筆記囉！</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isNotLogin">
      <q-card style="width: 200px">
        <q-card-section class="row items-center">
          <q-icon name="warning" color="negative" size="24px" />
          <span class="q-ml-sm">請先登入！</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss" scoped>
#map {
  height: calc(100dvh - 128px - 48px - 93px - 60px);
  min-height: 500px;
  width: 100%;
}

:deep(.info-window) {
  h6 {
    margin: 10px 0;
  }

  button {
    appearance: none;
    border: 0;

    width: auto;
    height: auto;
    line-height: 1.715em;
    font-size: 14px;
    padding: 4px 16px;
    text-align: center;
    background-color: $white;
    box-shadow:
      0 1px 5px rgba(0, 0, 0, 0.2),
      0 2px 2px rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.12);

    border-radius: 5px;
    margin: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: $light-green;
  }
}

:deep(.info-window .info-window__button) {
  width: 100%;
  text-align: center;
}
</style>
