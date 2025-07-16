<script setup>
import { ref, watch, computed } from 'vue'
import { useNoteStore } from '@/stores/noteStore'
import Note from '@/components/Note.vue'

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
  city: '',
  photos: [],
})

const searchInput = ref('')
const placePredictions = ref([])

const isNoteOpen = ref(false)
const isExist = computed(() => noteStore.notes.find((note) => note.id === newNote.value.id))
const isOwnNote = computed(() =>
  noteStore.notes.find((note) => note.id === newNote.value.id && note.user === noteStore.user.ID),
)
const isNotLogin = ref(false)
const reviewNote = ref(false)

// Initialize and add the map
let map
let infoWindow
let markers = [] // 儲存所有 marker 的引用

async function initMap() {
  // The location of userLocation
  const userLocation = noteStore.userLocation
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary('maps')
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker')
  await google.maps.importLibrary('places')

  // The map, centered at userLocation
  map = new Map(document.getElementById('map'), {
    zoom: 18,
    center: userLocation,
    mapId: 'DEMO_MAP_ID',
    gestureHandling: 'greedy',
  })

  // The marker, positioned at userLocation
  new AdvancedMarkerElement({
    map: map,
    position: userLocation,
    title: '目前位置',
  })

  setMarkers()

  map.addListener('click', (mapsMouseEvent) => {
    if (mapsMouseEvent.placeId) {
      getPlaceByIdAndShowInfoWindow(mapsMouseEvent.placeId, map)
    }
  })
}

async function setMarkers() {
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker')

  markers.forEach((marker) => {
    marker.map = null
  })
  markers = []

  // 創建新的 marker
  markers = [...noteStore.notes].map((note) => {
    const tomato = document.createElement('div')
    tomato.classList.add('tomato')
    const tomatoImg = document.createElement('img')
    tomatoImg.src = new URL('/favicon-tomato.png', import.meta.url).href
    tomato.appendChild(tomatoImg)

    const marker = new AdvancedMarkerElement({
      map: map,
      position: { lat: note.location.lat, lng: note.location.lng },
      content: tomato,
      title: note.storeName,
      gmpClickable: true,
    })

    marker.placeId = note.id

    return marker
  })

  markers.forEach((marker) => {
    marker.addEventListener('click', () => {
      if (marker.placeId) {
        getPlaceByIdAndShowInfoWindow(marker.placeId, map)
      }
    })
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
    fields: ['formattedAddress', 'googleMapsURI', 'location', 'displayName', 'adrFormatAddress'],
  })

  const region = getRegion(place.adrFormatAddress)

  setNote({
    placeId: placeId,
    storeName: place.displayName,
    location: { lat: place.location.lat(), lng: place.location.lng() },
    googlemapURL: place.googleMapsURI,
    address: place.formattedAddress,
    city: region,
  })

  showInfoWindow(place.location, map, place.displayName, place.formattedAddress)
}

async function showInfoWindow(latLng, map, placeName, placeAddress) {
  const { InfoWindow } = await google.maps.importLibrary('maps')

  if (infoWindow) {
    infoWindow.close()
  }

  infoWindow = new InfoWindow({
    position: latLng,
    content: buildInfoWindowContent(placeName, placeAddress, isExist.value, isOwnNote.value),
    maxWidth: 250,
  })

  infoWindow.open(map)

  // Add event listener after the infowindow is opened.
  google.maps.event.addListener(infoWindow, 'domready', function () {
    const reviewButton = document.querySelector('.review-note')
    const createButton = document.querySelector('.create-note')

    if (reviewButton) {
      reviewButton.addEventListener('click', () => {
        reviewNote.value = true
        isNoteOpen.value = true
      })
    }

    if (createButton) {
      createButton.addEventListener('click', () => {
        if (!noteStore.user.ID) {
          isNotLogin.value = true
          infoWindow.close()
          return
        }
        reviewNote.value = false
        isNoteOpen.value = true
      })
    }
  })
}

function buildInfoWindowContent(placeName, placeAddress, isExist = false, isOwnNote = false) {
  let content = `
    <div class="info-window">
      <h6>${placeName}</h6>
      <p>${placeAddress}</p>
      <div class=info-window__button>
        ${isExist ? '<button class="review-note">查看筆記</button>' : ''}
        ${isOwnNote ? '' : '<button class="create-note">新增筆記</button>'}
      </div>
    </div>`
  return content
}

async function makeAutocompleteRequest() {
  if (searchInput.value === '') {
    placePredictions.value = []
    return
  }

  const request = {
    input: searchInput.value,
    locationBias: {
      radius: 100,
      center: {
        lat: noteStore.userLocation.lat,
        lng: noteStore.userLocation.lng,
      },
    },
  }

  const { suggestions } =
    await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(request)

  placePredictions.value = suggestions.map((suggestion) => suggestion.placePrediction)
}

function getPlaceMainText(placePrediction) {
  return placePrediction.Nq.Nh[3][0][0]
}

function getPlaceSecondaryText(placePrediction) {
  return placePrediction.Nq.Nh[3][1][0]
}

// Event handler for clicking on a suggested place.
async function onPlaceSelected(place) {
  await place.fetchFields({
    fields: [
      'id',
      'viewport',
      'location',
      'formattedAddress',
      'displayName',
      'googleMapsURI',
      'adrFormatAddress',
    ],
  })

  if (!place.viewport || !place.location) {
    return
  }

  if (place.viewport) {
    map.fitBounds(place.viewport)
  } else {
    map.setCenter(place.location)
    map.setZoom(18)
  }

  const region = getRegion(place.adrFormatAddress)

  setNote({
    placeId: place.id,
    storeName: place.displayName,
    location: {
      lat: place.location.lat(),
      lng: place.location.lng(),
    },
    googlemapURL: place.googleMapsURI,
    address: place.formattedAddress,
    city: region,
  })

  showInfoWindow(place.location, map, place.displayName, place.formattedAddress)

  clearAutocomplete()
}

function clearAutocomplete() {
  searchInput.value = ''
  placePredictions.value = []
}

// Helper function to refresh the session token.
// function refreshToken(request) {
//   // Create a new session token and add it to the request.
//   request.sessionToken = new google.maps.places.AutocompleteSessionToken()
// }

function onCreateNote(event) {
  infoWindow.close()

  isNoteOpen.value = false

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
    city: '',
  }

  noteStore.createNote(pendingNote)
}

function setNote({ placeId, storeName, location, googlemapURL, address, city }) {
  newNote.value.id = placeId
  newNote.value.storeName = storeName
  newNote.value.location = location
  newNote.value.googlemapURL = googlemapURL
  newNote.value.address = address
  newNote.value.city = city
}

function getRegion(adr) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(adr, 'text/html')
  const regionElement = doc.querySelector('.region')
  return regionElement.textContent
}

function onDeleteNote(event) {
  noteStore.deleteNote(event)

  isNoteOpen.value = false
  infoWindow.close()
}

initMap()

watch(
  () => noteStore.userLocation,
  () => {
    initMap()
  },
)

watch(
  () => noteStore.user,
  () => {
    newNote.value.user = noteStore.user.ID
  },
)

watch(
  () => noteStore.notes,
  () => {
    setMarkers()
  },
)
</script>

<template>
  <div>
    <div class="autocomplete">
      <q-input
        v-model="searchInput"
        @update:modelValue="makeAutocompleteRequest"
        @blur="clearAutocomplete"
        class="search-input"
        outlined
        placeholder="在這裡搜尋"
        color="red"
      ></q-input>

      <!-- <div v-for="(item, index) in placePredictions" :key="index">
        <div>{{ item }}</div>
        {{ console.log(placePredictions.length) }}
      </div> -->

      <div v-if="placePredictions.length > 0" class="suggestion-list">
        <div class="list">
          <q-list bordered separator>
            <q-item
              v-for="(placePrediction, index) in placePredictions"
              :key="index"
              clickable
              v-ripple
              @click="() => onPlaceSelected(placePrediction.toPlace())"
            >
              <q-item-section>
                <q-item-label>{{ getPlaceMainText(placePrediction) }}</q-item-label>
                <q-item-label caption>{{ getPlaceSecondaryText(placePrediction) }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>

    <div class="separator row flex-center">
      <div class="text text-grey-7 q-py-sm">或直接點選地點</div>
    </div>

    <div id="map" @touchstart.stop @mousedown.stop></div>

    <q-dialog v-model="isNoteOpen" :persistent="!reviewNote">
      <div v-if="reviewNote" class="notes">
        <div
          v-for="note in noteStore.notes.filter((note) => note.id === newNote.id)"
          :key="note.id + note.user"
        >
          <Note
            :noteInput="note"
            @update:note="noteStore.updateNote($event)"
            @delete:note="onDeleteNote"
          ></Note>
        </div>
      </div>

      <Note
        v-else
        :isCreate="true"
        @update:isNoteOpen="isNoteOpen = $event"
        :noteInput="newNote"
        @create:note="onCreateNote"
      ></Note>
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

.suggestion-list {
  position: relative;
}

.list {
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%;
  background-color: $white;
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

:deep(.tomato) {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: $white;
  border: 2px solid $red;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
    opacity: 0.8;
  }
}

.notes {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
