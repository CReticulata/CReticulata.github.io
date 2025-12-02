<script setup>
import { onBeforeMount, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useNoteStore } from '@/stores/noteStore'
import { useUserStore } from '@/stores/userStore'
import { decodeJwtResponse } from '@/features/userInfo.js'
import noteSheetAPI from './features/noteSheetAPI'
import GoogleSigninButton from './components/GoogleSigninButton.vue'

const noteStore = useNoteStore()
const userStore = useUserStore()
const router = useRouter()
const drawer = ref(false)
const version = ref('2.5.0')

function initialize() {
  if (localStorage.getItem('Tomato-key')) {
    const credential = localStorage.getItem('Tomato-key')
    const responsePayload = decodeJwtResponse(credential)

    noteStore.setUserInfoAndGetNotes(responsePayload)
    userStore.getTargetUserList()
  }
}

async function handleCredentialResponse(response) {
  localStorage.setItem('Tomato-key', response.credential)

  await noteSheetAPI.SIGNUP()

  const responsePayload = decodeJwtResponse(response.credential)
  noteStore.setUserInfoAndGetNotes(responsePayload)
  userStore.getTargetUserList()

  drawer.value = false
}

function onSignout() {
  // console.log('登出')
  router.replace({ name: 'Notes' })
  google.accounts.id.disableAutoSelect()
  noteStore.clearUserInfoAndNotes()
  localStorage.removeItem('Tomato-key')
}

google.accounts.id.initialize({
  client_id: '441513738434-mij88efkigc4u256p16uljn6vebru599.apps.googleusercontent.com',
  callback: handleCredentialResponse,
  auto_select: true,
  use_fedcm_for_prompt: true,
})

onBeforeMount(() => {
  noteStore.updateUserLocation()
  initialize()
})

function handleSwipe({ e, ...newInfo }) {
  if (newInfo.direction === 'left') {
    return router.push({ name: 'Map' })
  }

  if (newInfo.direction === 'right') {
    return router.push({ name: 'Notes' })
  }
}

function toSubscriptionList() {
  return router.push({ name: 'Subscription' })
}
</script>

<template>
  <q-layout view="lHh lpr lff">
    <q-header class="navbar" elevated reveal>
      <q-toolbar class="navbar__toolbar">
        <q-avatar>
          <img src="@/images/icon-tomato.png" />
        </q-avatar>

        <q-toolbar-title>美食家也可以很健忘</q-toolbar-title>
        <q-btn
          v-if="!noteStore.user.picture"
          flat
          round
          dense
          icon="fa-solid fa-user"
          class="q-mr-sm"
          @click="drawer = !drawer"
        />
        <q-btn v-else flat round dense class="q-mr-sm" @click="drawer = !drawer">
          <q-avatar>
            <img :src="noteStore.user.picture" />
          </q-avatar>
        </q-btn>
      </q-toolbar>

      <q-tabs align="justify" indicator-color="yellow">
        <q-route-tab :to="{ name: 'Notes' }" name="noteMode" label="所有筆記" class="tab" />
        <q-route-tab :to="{ name: 'Map' }" name="mapMode" label="新增筆記" class="tab" />
      </q-tabs>

      <q-drawer
        v-model="drawer"
        :width="250"
        :breakpoint="2000"
        overlay
        elevated
        side="right"
        class="bg-red"
      >
        <q-scroll-area class="fit">
          <q-list padding class="menu-list">
            <div v-if="!noteStore.user.ID">
              <q-item v-ripple>
                <q-item-section>
                  <GoogleSigninButton></GoogleSigninButton>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section
                  >註：如無法登入，請改使用預設瀏覽器開啟此網站後再嘗試登入。</q-item-section
                >
              </q-item>
            </div>

            <div v-else>
              <q-item v-ripple>
                <q-item-section>{{ noteStore.user.fullName }}，您好！</q-item-section>
              </q-item>

              <q-item clickable v-ripple @click="toSubscriptionList">
                <q-item-section avatar>
                  <q-icon name="list_alt" />
                </q-item-section>

                <q-item-section> 訂閱設定 </q-item-section>
              </q-item>

              <q-item clickable v-ripple @click="onSignout">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>

                <q-item-section> 登出 </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-scroll-area>
      </q-drawer>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-lg" v-touch-swipe.mouse.horizontal="handleSwipe">
        <RouterView />
      </q-page>
    </q-page-container>

    <q-footer bordered class="footer">
      <q-toolbar class="column flex-center q-py-sm">
        <div class="footer__title row flex-center">
          <q-toolbar-title class="title">© 2025 橘子</q-toolbar-title>
          <q-btn
            flat
            round
            color="white"
            icon="fa-brands fa-github"
            size="xs"
            href="https://github.com/CReticulata"
          />
        </div>
        <div class="footer__content row flex-center">
          <p class="version">v{{ version }}</p>
        </div>
      </q-toolbar>
    </q-footer>

    <q-circular-progress
      :indeterminate="noteStore.isSynchronize"
      :show-value="noteStore.isSynchronize"
      rounded
      size="60px"
      font-size="12px"
      color="light-green"
      class="q-ma-md circular-progress"
      >同步中</q-circular-progress
    >
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

.circular-progress {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 2001;
}

.footer {
  background-color: $red;
  height: 60px;

  &__title {
    text-align: center;
  }

  &__content {
    gap: 2px;
  }
}

.title {
  color: $black;
  font-size: 14px;
  padding: 0;
}

.version {
  margin: 0;
  font-size: 10px;
  color: $light-green;
}
</style>
