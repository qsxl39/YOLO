<script lang="ts" setup>
import { computed, ref,onMounted } from 'vue'
import { getAllAccountAPI,postdeleteAccountAPI } from '@/api/accountManage';
import AddAccountDialog from './components/AddAccountDialog.vue'
import ResetPasswordDialog from './components/ResetPasswordDialog.vue';
import { ElMessage,ElMessageBox } from 'element-plus';

interface User {
  userName: string
  userType: string
}

const search = ref('')
const filterTableData = computed(() => 
  tableData.value.filter(
    (data) => !search.value || data.userName.toLowerCase().includes(search.value.toLowerCase())
  )
)

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}

// handleEdit(1,{userName:'userType',userType:'2'})
//删除账号
const handleDelete = (index: number, row: User) => {
  ElMessageBox.confirm(
    '是否确认删除该账号?',
    '提醒',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
      // console.log(row.userName)
      const result = await postdeleteAccountAPI(row.userName)
      if (result.code === 0) {
        ElMessage.success('删除成功')
        getAllAccount()
      } else {
        ElMessage.error('删除失败')
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

//获取账号列表
const getAllAccount = async ()=>{
  const result = await getAllAccountAPI()
  //将admin置顶
  const data = result.newUserVOList
  const index = data.findIndex((item:any) => item.userType === '超级管理员')
  const admin = data.splice(index, 1);
  data.unshift(...admin)
  tableData.value = data
}

onMounted(() => {
  getAllAccount()
})

const tableData = ref<User[]>([])

const addAccountVisible = ref(false)
const resetPasswordRef = ref()
const resetPassword = (username:string) => {
  resetPasswordRef.value.openResetPasswordDialog(username)
}
</script>
<template>
  <el-card class="mx-4 card">
    <div class="flex justify-end">
    <el-button 
      type="primary"
      @click="addAccountVisible = true">
      新增账号
    </el-button>
    <!-- <el-button 
      type="danger" >
      批量删除
    </el-button> -->
    </div>
    <el-table 
    :data="filterTableData" 
    border class="mt-4" height="75vh">
    <el-table-column label="用户名" prop="userName" align="center"/>
    <el-table-column label="角色" prop="userType" align="center"/>
    <el-table-column align="center">
      <template #header>
        <el-input v-model="search" size="small" placeholder="搜索" />
      </template>
      <template #default="scope">
        <el-button size="small" type="info" @click="resetPassword(scope.row.userName)">
          重置密码
        </el-button>
        <template v-if="scope.row.userType !=='超级管理员'">
          <!-- <el-button size="small" type="warning" @click="handleEdit(scope.$index, scope.row)">
            修改
          </el-button> -->
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
            删除账号
          </el-button>
        </template>
      </template>
    </el-table-column>
    </el-table>
  </el-card>
  <AddAccountDialog v-model="addAccountVisible" @added="getAllAccount"/>
  <ResetPasswordDialog ref="resetPasswordRef"/>
</template>

<style lang="scss" scoped>

</style>
