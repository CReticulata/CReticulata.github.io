<script setup>
import { ref } from 'vue'
import { useNoteStore } from '@/stores/noteStore'
import Note from '@/components/Note.vue'

const noteStore = useNoteStore()

const newNote = ref({
  id: 3,
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
</script>

<template>
  <div>
    <q-btn @click="isCreate = true">新增筆記</q-btn>

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
