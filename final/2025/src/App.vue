<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useNoteStore } from '@/stores/noteStore'
import { onBeforeMount } from 'vue'

const noteStore = useNoteStore()

onBeforeMount(() => {
  noteStore.updateUserLocation()
})

function showInfo() {
  // console.log(noteStore.notesSortedByDistance)
}
noteStore.getNotesFromGoogleSheet()
</script>

<template>
  <q-layout view="lHh lpr lff">
    <q-header class="navbar" elevated>
      <q-toolbar class="navbar__toolbar">
        <q-avatar>
          <img src="@/images/icon-tomato.png" />
        </q-avatar>

        <q-toolbar-title>美食家也可以很健忘</q-toolbar-title>
        <q-btn flat round dense icon="fa-solid fa-user" class="q-mr-sm" />
        <!-- <q-btn class="text-black" @click="showInfo">印</q-btn> -->
      </q-toolbar>

      <q-tabs align="justify" indicator-color="yellow">
        <q-route-tab :to="{ name: 'Notes' }" name="noteMode" label="所有筆記" class="tab" />
        <q-route-tab :to="{ name: 'Map' }" name="mapMode" label="新增筆記" class="tab" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-lg">
        <RouterView />
      </q-page>
    </q-page-container>

    <q-footer bordered class="footer">
      <q-toolbar>
        <q-toolbar-title class="footer__title">© 2025 橘子</q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style lang="scss" scoped>
.navbar {
  background-color: $red;

  &__toolbar {
    height: 80px;
    padding-left: 20px;
  }
}

:deep(.tab .q-tab__label) {
  font-size: 18px;
}

.footer {
  background-color: $red;
  height: 60px;

  &__title {
    color: $black;
    font-size: 14px;
    text-align: center;
  }
}
</style>
