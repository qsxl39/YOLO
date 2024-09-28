import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const userToken = ref({
      username: '',
      password: ''
      // token: "",
    })
    const setUser = (username: string, password: string) => {
      userToken.value = { username, password }
    }
    const logout = () => {
      userToken.value = {
        username: '',
        password: ''
      }
    }
    const Page = ref({
      total: '',
      current_page: '',
      url: ''
    })
    const pageUser = (total: string, current_page: string, url: string) => {
      Page.value = { total, current_page, url }
    }
    // const pic_url:Array<string> = ref([

    // ])
    // const pic_urlUser=(aaa:Array<string>)=>{
    //   pic_url=aaa
    // }
    return {
      userToken,
      setUser,
      logout,
      Page,
      pageUser
    }
  },
  {
    persist: true
  }
)
