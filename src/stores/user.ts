import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref({
      username: '',
      password: ''
      // token: "",
    })
    const setUser = (username: string, password: string) => {
      user.value = { username, password }
    }
    const logout = () => {
      user.value = {
        username: '',
        password: ''
      }
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
