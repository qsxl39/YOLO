<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { postDoctorLoginAPI } from '@/api/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const returnLogin = () => {
  router.push('') // 路由配置中的路径
}
console.log('@@@', router)
const loginData = ref({
  username: '',
  password: ''
})
const login = async () => {
  try {
    const res = await postDoctorLoginAPI(loginData.value.username, loginData.value.password)
    console.log(res)
    if (res.code === 200) {
      ElMessage.success('登录成功')
      // if (loginData.value.username === 'admin') {
      //   userStore.setUser(loginData.value.username, 'admin')
      // } else {
      //   userStore.setUser(loginData.value.username, 'doctor')
      // }
      router.push('/current')
      return
    } else {
      ElMessage.error(res.error)
    }
  } catch {
    ElMessage.error('登录失败')
  }
}
</script>

<template>
  <h1 class="text-3xl text-white font-bold flex items-center tracking-wide">YOLO算法盒子</h1>
  <div class="flex w-1/4 flex-wrap mx-auto justify-center">
    <div class="flex flex-col w-full text-xl">
      <label class="my-4 font-bold text-xl"> 账户名 </label>
      <input
        v-model="loginData.username"
        class="w-full border-b-gray-600 border-b pb-1"
        placeholder="请输入账户名"
      />
    </div>
    <div class="flex flex-col w-full text-xl">
      <label class="my-4 font-bold text-xl"> 密码 </label>
      <input
        v-model="loginData.password"
        class="w-full border-b-gray-600 border-b pb-1"
        placeholder="请输入密码"
      />
    </div>
    <span class="w-full text-center tracking-wide mt-4 text-gray-600">忘记密码请联系管理员</span>
    <el-button @click="login" color="#000" size="large" class="btn mt-8"> 确定 </el-button>
  </div>
</template>

<style scoped lang="scss">
.btn {
  width: 200px;
  height: 60px;
  border-radius: 15px;
  font-size: 24px;
  letter-spacing: 3px;
}
h1 {
  background-color: rgb(0, 0, 0);
  height: 10vh;
  margin-bottom: 14vh;
}
</style>
