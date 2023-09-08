import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { user } from '@/types/user'

export const useCounterStore = defineStore(
  'counter',
  () => {
    const userList = ref<user>()

    const setUser = (e: user) => {
      userList.value = e
    }

    const setLoginOut = () => {
      userList.value = undefined
    }

    return { userList, setUser, setLoginOut }
  },
  {
    persist: true
  }
)
