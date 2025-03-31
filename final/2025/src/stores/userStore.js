import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import noteSheetAPI from '@/features/noteSheetAPI'

export const useUserStore = defineStore('userStore', () => {
  const targetUserList = ref([
    // { user: '114522663789798422365', name: '橘冬子', email: 'maple51327@gmail.com' },
  ])
  const subscriptions = computed(() => targetUserList.value.map((target) => target.email))

  async function getTargetUserList() {
    const res = await noteSheetAPI.GET()
    targetUserList.value = res.targetUserList
  }

  async function subscribe(email) {
    const res = await noteSheetAPI.SUBSCRIBE(email)
    await getTargetUserList()
    return res
  }

  async function unsubscribe(email) {
    const res = await noteSheetAPI.UNSUBSCRIBE(email)
    await getTargetUserList()
    return res
  }

  return {
    targetUserList,
    subscriptions,
    getTargetUserList,
    subscribe,
    unsubscribe,
  }
})
