<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useNoteStore } from '@/stores/noteStore'
import Subscription from '@/components/Subscription.vue'

const userStore = useUserStore()
const noteStore = useNoteStore()
const emailInput = ref('')
const status = ref(false)
const statusString = ref('')

const isLoading = ref(true)

setTimeout(() => {
  isLoading.value = false
}, 5000)

async function subscribe() {
  if (userStore.targetUserEmails.includes(emailInput.value)) {
    statusString.value = '已經訂閱過囉'
    status.value = true
    emailInput.value = ''
    setTimeout(() => {
      status.value = false
    }, 2000)

    return
  }

  if (emailInput.value === noteStore.user.email) {
    statusString.value = '不能訂閱自己'
    status.value = true
    emailInput.value = ''
    setTimeout(() => {
      status.value = false
    }, 2000)

    return
  }

  noteStore.isSynchronize = true
  const res = await userStore.subscribe(emailInput.value)

  if (res.message === 'User not existed') {
    statusString.value = '找不到使用者'
    status.value = true
    emailInput.value = ''
    setTimeout(() => {
      status.value = false
    }, 2000)

    return
  }

  if (res.message === 'Private user') {
    statusString.value = '無法訂閱此使用者'
    status.value = true
    emailInput.value = ''
    setTimeout(() => {
      status.value = false
    }, 2000)

    return
  }

  statusString.value = '訂閱成功'
  status.value = true
  emailInput.value = ''
  await noteStore.getDataFromGoogleSheet()
  noteStore.isSynchronize = false
  status.value = false
}

async function unsubscribe(email) {
  noteStore.isSynchronize = true
  await userStore.unsubscribe(email)
  // 訂閱已取消dialog
  statusString.value = '訂閱已取消'
  status.value = true
  await noteStore.getDataFromGoogleSheet()
  noteStore.isSynchronize = false
  status.value = false
}

function changePrivacy() {
  // to-do
  noteStore.changePrivacy()
  noteStore.user.isPublic = !noteStore.user.isPublic
}
</script>

<template>
  <div class="container column items-center">
    <q-form class="subscribe" @submit="subscribe">
      <q-input
        class="subscribe__input"
        placeholder="輸入 email 以訂閱筆記"
        color="green"
        v-model="emailInput"
      >
        <template v-slot:append>
          <q-btn round dense flat icon="add" @click="subscribe" />
        </template>
      </q-input>
    </q-form>
    <div class="subscriptions">
      <q-list>
        <q-item-label header>帳號隱私</q-item-label>
        <q-toggle
          :modelValue="noteStore.user.isPublic"
          @update:modelValue="changePrivacy"
          :label="noteStore.user.isPublic ? '公開' : '私人'"
          right-label
          color="light-green"
        />

        <q-item-label header>目前訂閱</q-item-label>

        <div class="row justify-center">
          <q-spinner-tail
            v-if="isLoading && userStore.targetUserList.length === 0"
            color="brown"
            size="2em"
          />
          <div v-if="!isLoading && userStore.targetUserList.length === 0" class="text-grey-8">
            還沒有訂閱喔！
          </div>
        </div>

        <Subscription
          v-for="(user, index) in userStore.targetUserEmails"
          :key="index"
          :user="user"
          @remove:user="(email) => unsubscribe(email)"
        ></Subscription>
      </q-list>
    </div>

    <q-dialog v-model="status">
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">{{ statusString }}</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 20px 0;
}

.subscribe {
  width: 300px;
}

.q-list {
  width: 100%;
}

.q-toggle {
  padding-left: 4px;
}

.subscriptions {
  width: 300px;
  padding-top: 16px;
}

.q-item__label--header {
  padding-top: 24px;
}
</style>
