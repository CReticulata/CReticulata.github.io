<script setup>
import Note from '@/components/Note.vue'
import { useNoteStore } from '@/stores/noteStore'

const noteStore = useNoteStore()
</script>

<template>
  <div class="notes row flex-center q-gutter-lg">
    <div class="note" v-for="(note, index) in noteStore.notesSortedByDistance" :key="note.id">
      <Note
        :modelValue="noteStore.notesSortedByDistance[index]"
        @update:modelValue="noteStore.updateNote($event)"
        @delete:note="noteStore.deleteNote($event)"
      ></Note>
    </div>
    <!-- <pre>{{ noteStore.notes }}</pre> -->
  </div>
</template>

<style lang="scss" scoped>
.note {
  min-width: 320px;
}
</style>
