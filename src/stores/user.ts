import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref({
      account: '',
      username: ''
      // token: false
    })
    const setUser = (account: string, username: string) => {
      user.value = { account, username }
    }
    const logout = () => {
      localStorage.removeItem('user')
    }
    return {
      user,
      setUser,
      logout
    }
  },
  {
    persist: true
  }
)
