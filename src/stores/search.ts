import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore(
  'search',
  () => {
    const searchList = ref<string[]>([])

    const setinp = (e: string) => {
      searchList.value.unshift(e)
    }

    const delSearchList = () => {
      // localStorage.removeItem('search')
      searchList.value = []
    }
    return { searchList, setinp, delSearchList }
  },
  {
    persist: true
  }
)
