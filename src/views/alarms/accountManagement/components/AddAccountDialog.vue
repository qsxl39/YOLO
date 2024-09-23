<script setup lang="ts">
import { ref } from "vue"
import { postaddAccountAPI } from "@/api/accountManage";
import { ElMessage } from "element-plus";
import { http } from '@/utils/http'

console.log({http});

const isShow = defineModel()
const account = ref({
    userName: '',
    userType: '',
    password: ''
})
const emit = defineEmits(['added'])
const addAccount = async () => {
    isShow.value = false
    const result = await postaddAccountAPI(account.value.userName, account.value.userType, account.value.password)
    if (result.code === 0) {
        ElMessage.success('添加成功')
        emit('added')
    } else {
        ElMessage.error('添加失败')
    }
}
</script>

<template>
    <el-dialog v-model="isShow" title="新增账号" width="500" :align-center="true">
        <el-form :model="account" label-width="60">
            <el-form-item label="用户名" >
            <el-input v-model="account.userName" placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item label="角色">
                <el-select v-model="account.userType" placeholder="请选择角色">
                    <el-option label="医生" value="医生"/>
                    <el-option label="超级管理员" value="超级管理员"/>
                </el-select>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="account.password" placeholder="请输入密码"/>
            </el-form-item>
            <div class="flex justify-center">
                <el-button 
                    type="primary"
                    :disabled="!account.userName || !account.userType || !account.password"
                    @click="addAccount">
                    提交
                </el-button>
            </div>
        </el-form>
    </el-dialog>
</template>
