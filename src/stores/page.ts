import { defineStore } from 'pinia'
import { ref } from 'vue'

export const pageStore = defineStore(
  'pages',
  () => {
    const page = ref({
      total: '',
      current_page: '',
      url: []
    })
    const setPage = (total: string, current_page: string, url: any) => {
      page.value = { total, current_page, url }
    }
    return {
      page,
      setPage
    }
  },
  {
    persist: false
  }
)
