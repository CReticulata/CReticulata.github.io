<script setup>
import Note from '@/components/Note.vue'
import { useNoteStore } from '@/stores/noteStore'

const noteStore = useNoteStore()
</script>

<template>
  <div class="notes row flex-center q-gutter-lg">
    <div class="note" v-for="(note, index) in noteStore.notes" :key="note.id">
      <Note
        :modelValue="noteStore.notes[index]"
        @update:modelValue="noteStore.updateNote($event, index)"
        @delete:note="noteStore.deleteNote(index)"
      ></Note>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.note {
  min-width: 320px;
}
</style>
