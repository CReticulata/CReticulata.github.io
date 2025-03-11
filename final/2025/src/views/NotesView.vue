<script setup>
import { ref, computed } from 'vue'
import Note from '@/components/Note.vue'
import { useNoteStore } from '@/stores/noteStore'

const noteStore = useNoteStore()

const searchInput = ref('')

const notesFilteredBySearch = computed(() => {
  if (searchInput.value) {
    return [...noteStore.notesSortedByDistance].filter((note) =>
      note.storeName.includes(searchInput.value),
    )
  }

  return [...noteStore.notesSortedByDistance]
})

const sorter = ref({
  total: false,
  food: false,
  service: false,
})

function onSelect(filterName) {
  sorter.value = {
    total: false,
    food: false,
    service: false,
    [filterName]: sorter.value[filterName],
  }
}

const notesSortedByTotal = computed(() => {
  return [...notesFilteredBySearch.value].sort((noteA, noteB) => {
    const totalOfA = noteA.foodScore + noteA.serviceScore
    const totalOfB = noteB.foodScore + noteB.serviceScore

    return totalOfB - totalOfA
  })
})

const notesSortedByFood = computed(() => {
  return [...notesFilteredBySearch.value].sort((noteA, noteB) => noteB.foodScore - noteA.foodScore)
})

const notesSortedByService = computed(() => {
  return [...notesFilteredBySearch.value].sort(
    (noteA, noteB) => noteB.serviceScore - noteA.serviceScore,
  )
})
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
      </div>
      <div class="q-gutter-xs">
        <q-chip
          v-model:selected="sorter.total"
          :color="sorter.total ? 'light-green' : 'green'"
          text-color="white"
          icon="star"
          @click="onSelect('total')"
        >
          依總分
        </q-chip>
        <q-chip
          v-model:selected="sorter.food"
          :color="sorter.food ? 'light-green' : 'green'"
          text-color="white"
          icon="lunch_dining"
          @click="onSelect('food')"
        >
          依餐點
        </q-chip>
        <q-chip
          v-model:selected="sorter.service"
          :color="sorter.service ? 'light-green' : 'green'"
          text-color="white"
          icon="restaurant"
          @click="onSelect('service')"
        >
          依服務
        </q-chip>
      </div>
    </div>

    <div v-if="sorter.total" class="row flex-center q-gutter-lg">
      <div class="note" v-for="(note, index) in notesSortedByTotal" :key="note.id">
        <Note
          :noteInput="notesSortedByTotal[index]"
          @update:note="noteStore.updateNote($event)"
          @delete:note="noteStore.deleteNote($event)"
        ></Note>
      </div>
    </div>

    <div v-else-if="sorter.food" class="row flex-center q-gutter-lg">
      <div class="note" v-for="(note, index) in notesSortedByFood" :key="note.id">
        <Note
          :noteInput="notesSortedByFood[index]"
          @update:note="noteStore.updateNote($event)"
          @delete:note="noteStore.deleteNote($event)"
        ></Note>
      </div>
    </div>

    <div v-else-if="sorter.service" class="row flex-center q-gutter-lg">
      <div class="note" v-for="(note, index) in notesSortedByService" :key="note.id">
        <Note
          :noteInput="notesSortedByService[index]"
          @update:note="noteStore.updateNote($event)"
          @delete:note="noteStore.deleteNote($event)"
        ></Note>
      </div>
    </div>

    <div v-else class="row flex-center q-gutter-lg">
      <div class="note" v-for="(note, index) in notesFilteredBySearch" :key="note.id">
        <Note
          :noteInput="notesFilteredBySearch[index]"
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

  &__input {
    width: 100%;
  }
}

.note {
  min-width: 320px;
}
</style>
