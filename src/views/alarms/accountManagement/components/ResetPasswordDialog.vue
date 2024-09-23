<script setup lang="ts">
import { ref } from "vue"
import { postResetPasswordAPI } from "@/api/accountManage";
import { ElMessage } from "element-plus";
const isShow = ref()
const data = ref({
    password: "",
    username: ""
})
const resetPassword = async () => {
    isShow.value = false
    const result = await postResetPasswordAPI(data.value.username, data.value.password)
    if (result.code === 0) {
        ElMessage.success('重置成功')
    } else {
        ElMessage.error('重置失败')
    }
}
const openResetPasswordDialog = (username:string) => {
    isShow.value = true
    data.value.username = username
}
defineExpose({
    openResetPasswordDialog 
})
</script>

<template>
    <el-dialog v-model="isShow" title="重置密码" width="500" :align-center="true">
        <el-form label-width="60">
            <el-form-item label="新密码">
                <el-input v-model="data.password" placeholder="请输入新密码"/>
            </el-form-item>
            <div class="flex justify-center">
                <el-button 
                    type="primary"
                    :disabled="!data.password"
                    @click="resetPassword">
                    提交
                </el-button>
            </div>
        </el-form>
    </el-dialog>
</template>
