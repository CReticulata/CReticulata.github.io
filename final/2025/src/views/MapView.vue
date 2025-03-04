<script setup>
import { ref } from 'vue'
import { useNoteStore } from '@/stores/noteStore'
import Note from '@/components/Note.vue'
import { onMounted } from 'vue'
import { watch } from 'vue'

const noteStore = useNoteStore()

const newNote = ref({
  id: 4,
  storeName: '雙全紅茶（每日定量）',
  foodScore: 0,
  serviceScore: 0,
  pros: '',
  cons: '',
  location: { lat: 22.992445, lng: 120.1980019 },
  googlemapURL: 'https://maps.app.goo.gl/a2yRs46sHTAmpu679',
  address: '700台南市中西區中正路131巷2號',
})

const isCreate = ref(false)

function onCreateNote() {
  noteStore.createNote(newNote.value)
  isCreate.value = false
}

// Initialize and add the map
let map

async function initMap() {
  // The location of Uluru
  const position = noteStore.userLocation
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary('maps')
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker')

  // The map, centered at userLocation
  map = new Map(document.getElementById('map'), {
    zoom: 18,
    center: position,
    mapId: 'DEMO_MAP_ID',
  })

  // The marker, positioned at userLocation
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: '目前位置',
  })

  map.addListener('click', (mapsMouseEvent) => {
    const clickedLatLng = mapsMouseEvent.latLng
    getPlaceIdAndShowInfoWindow(clickedLatLng, map)
  })
}

async function getPlaceIdAndShowInfoWindow(latLng, map) {
  const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary('places')

  const request = {
    // required parameters
    fields: ['id', 'formattedAddress', 'googleMapsURI', 'location', 'displayName'],
    locationRestriction: {
      center: latLng,
      radius: 50,
    },
    // optional parameters
    includedPrimaryTypes: ['restaurant'],
    maxResultCount: 5,
    rankPreference: SearchNearbyRankPreference.DISTANCE,
    language: 'zh_Hant',
    region: 'tw',
  }

  const { places } = await Place.searchNearby(request)

  if (places.length) {
    const place = places[0]
    console.log(place)

    newNote.value.storeName = place.displayName
    newNote.value.location = { lat: place.location.lat(), lng: place.location.lng() }
    newNote.value.googlemapURL = place.googleMapsURI
    newNote.value.address = place.formattedAddress

    showInfoWindow(latLng, map, place.displayName, place.formattedAddress)
  } else {
    showInfoWindow(
      latLng,
      map,
      '未找到店家',
      `Latitude: ${latLng.lat()}, Longitude: ${latLng.lng()}`,
    )
  }
}

async function showInfoWindow(latLng, map, placeName, placeAddress) {
  const { InfoWindow } = await google.maps.importLibrary('maps')

  const infowindow = new InfoWindow({
    position: latLng,
    content: buildInfoWindowContent(placeName, placeAddress),
    maxWidth: 250,
  })

  infowindow.open(map)

  // Add event listener after the infowindow is opened.
  google.maps.event.addListener(infowindow, 'domready', function () {
    const button = document.querySelector('.create-note')

    if (button) {
      button.addEventListener('click', () => {
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

if (noteStore.userLocation) {
  initMap()
}

watch(
  () => noteStore.userLocation,
  () => {
    initMap()
  },
)
</script>

<template>
  <div>
    <q-btn @click="isCreate = true">新增筆記</q-btn>

    <div id="map"></div>

    <q-dialog v-model="isCreate" persistent>
      <Note
        :isCreate="true"
        :modelValue="newNote"
        @update:modelValue="(val) => (newNote = val)"
        @update:isCreate="isCreate = $event"
        @create:note="onCreateNote"
      ></Note>
    </q-dialog>
  </div>
</template>

<style lang="scss" scoped>
#map {
  height: calc(100vh - 128px - 48px - 40px);
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
    background-color: $grey-2;
  }
}

:deep(.info-window .info-window__button) {
  width: 100%;
  text-align: center;
}
</style>
