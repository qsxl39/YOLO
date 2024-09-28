import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref({
    account: "",
    username: "",
    // token: "",
    type: "",
  });
  const setUser = (
    account: string,
    username: string,
    type: string,
  ) => {
    user.value = { account,username,type }
  };
  const logout = () => {
    user.value = {
      account: "",
      username: "",
      type: "",
    };
  };
  return {
    user,
    setUser,
    logout,
  };
},
{
    persist:true
});