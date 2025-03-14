<script setup>
import { ref, computed } from 'vue'
import Note from '@/components/Note.vue'
import { useNoteStore } from '@/stores/noteStore'
import { getDistanceBetweenPoints } from '@/features/utilities'

const noteStore = useNoteStore()

const searchInput = ref('')
const distanceFilter = ref(5)
const distanceLabel = computed(() => {
  switch (distanceFilter.value) {
    case 1:
      return '100 公尺'
    case 2:
      return '300 公尺'
    case 3:
      return '500 公尺'
    case 4:
      return '1 公里'
    default:
      return '所有距離'
  }
})

const filteredNotes = computed(() => {
  let result = [...noteStore.notesSortedByDistance]

  if (searchInput.value) {
    result = [...result].filter((note) => note.storeName.includes(searchInput.value))
  }

  if (distanceFilter.value) {
    result = [...result].filter((note) => {
      const distance = getDistanceBetweenPoints(
        noteStore.userLocation.lat,
        noteStore.userLocation.lng,
        note.location.lat,
        note.location.lng,
      )

      switch (distanceFilter.value) {
        case 1:
          return distance < 101
        case 2:
          return distance < 301
        case 3:
          return distance < 501
        case 4:
          return distance < 1001
        default:
          return true
      }
    })
  }

  return result
})

const sorter = ref({
  total: false,
  food: false,
  service: false,
})

const sortedFilteredNotes = computed(() => {
  if (sorter.value.total) {
    return [...filteredNotes.value].sort((noteA, noteB) => {
      const totalOfA = noteA.foodScore + noteA.serviceScore
      const totalOfB = noteB.foodScore + noteB.serviceScore

      return totalOfB - totalOfA
    })
  }

  if (sorter.value.food) {
    return [...filteredNotes.value].sort((noteA, noteB) => noteB.foodScore - noteA.foodScore)
  }

  if (sorter.value.service) {
    return [...filteredNotes.value].sort((noteA, noteB) => noteB.serviceScore - noteA.serviceScore)
  }

  return filteredNotes.value
})

function onlyOneSelected(filterName) {
  sorter.value = {
    total: false,
    food: false,
    service: false,
    [filterName]: sorter.value[filterName],
  }
}
</script>

<template>
  <div class="notes column flex-center">
    <div class="row flex-center q-gutter-md q-pb-md">
      <div class="search">
        <q-input
          class="search__input"
          outlined
          dense
          placeholder="以店名搜尋"
          color="green"
          v-model="searchInput"
        ></q-input>
        <q-btn icon="tune" round flat color="green">
          <q-menu anchor="bottom right" self="top right">
            <div class="q-pa-md column q-gutter-y-md">
              <div>
                <div class="text-md text-grey-8 q-mb-sm">選擇排序方式</div>
                <q-chip
                  v-model:selected="sorter.total"
                  :color="sorter.total ? 'light-green' : 'green'"
                  text-color="white"
                  icon="star"
                  @click="onlyOneSelected('total')"
                >
                  依總分
                </q-chip>
                <q-chip
                  v-model:selected="sorter.food"
                  :color="sorter.food ? 'light-green' : 'green'"
                  text-color="white"
                  icon="lunch_dining"
                  @click="onlyOneSelected('food')"
                >
                  依餐點
                </q-chip>
                <q-chip
                  v-model:selected="sorter.service"
                  :color="sorter.service ? 'light-green' : 'green'"
                  text-color="white"
                  icon="restaurant"
                  @click="onlyOneSelected('service')"
                >
                  依服務
                </q-chip>
              </div>
              <q-separator></q-separator>
              <div>
                <div class="text-md text-grey-8 q-mb-md">選擇篩選方式</div>
                <div class="q-gutter-y-sm">
                  <div class="column flex-center filter-option--distance">
                    <div class="text-md text-grey-8 q-mb-sm">依距離</div>
                    <q-slider
                      v-model="distanceFilter"
                      color="green"
                      markers
                      snap
                      label
                      label-always
                      :label-value="distanceLabel"
                      :min="1"
                      :max="5"
                      :step="1"
                    />
                  </div>
                  <div class="column flex-center filter-option">
                    <div class="text-md text-grey-8 q-mb-sm">依城市</div>
                    <div class="row">
                      <q-chip
                        v-model:selected="sorter.service"
                        :color="sorter.service ? 'light-green' : 'green'"
                        text-color="white"
                      >
                        台南市
                      </q-chip>
                      <q-chip
                        v-model:selected="sorter.service"
                        :color="sorter.service ? 'light-green' : 'green'"
                        text-color="white"
                      >
                        台北市
                      </q-chip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-menu>
        </q-btn>
      </div>
    </div>

    <div class="row flex-center q-gutter-lg">
      <div class="note" v-for="(note, index) in sortedFilteredNotes" :key="note.id">
        <Note
          :noteInput="sortedFilteredNotes[index]"
          @update:note="noteStore.updateNote($event)"
          @delete:note="noteStore.deleteNote($event)"
        ></Note>
      </div>
    </div>

    <!-- <pre>{{ noteStore.notes }}</pre> -->
  </div>
</template>

<style lang="scss" scoped>
.search {
  width: 300px;
  display: flex;
  justify-content: space-between;

  &__input {
    width: calc(100% - 50px);
  }
}

.note {
  min-width: 320px;
}

.filter-option {
  &--distance {
    padding: 0 16px;
  }
}
</style>
