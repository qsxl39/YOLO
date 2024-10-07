<template>
  <el-dialog v-model="dialogTableVisible" title="算法配置" width="1100">
    <el-table border stripe :data="gridData" style="width: 100%">
      <el-table-column property="mingcheng" label="算法名称" width="120" align="center" />
      <el-table-column label="开关状态" width="120" align="center">
        <template #default="{ row }">
          <el-switch
            v-model="row.zhuangtai"
            size="large"
            inline-prompt
            active-text="开"
            inactive-text="关"
          />
        </template>
      </el-table-column>
      <el-table-column label="灵敏度" width="600" align="center">
        <template #default="{ row }">
          <div class="slider-demo-block">
            <el-slider v-model="row.lingmindu" show-input :min="0" :max="100" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="上报频率" align="center">
        <template #default="{ row }">
          <el-input-number v-model="row.pinlv" :min="0" :max="1000" />
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-checkbox v-model="checked" label="同步至所有通道" size="large" />
      <div class="button-group">
        <el-button type="primary" @click="saveChanges">保存</el-button>
        <el-button @click="dialogTableVisible = false">取消</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, defineExpose, reactive } from 'vue'
import { useDialogStore } from '@/stores/useDialogStore'
// import { defineProps } from 'vue';
// const props = defineProps<{
//     rowNumber: string
// }>();

// console.log(props.rowNumber);

interface User {
  ID: string
  mingcheng: string
  zhuangtai: boolean
  lingmindu: number // 假设灵敏度初始值为50
  pinlv: number // 假设上报频率初始值为1
}

var dialogTableVisible = ref(false)
const gridData = reactive([])
let aaa = ref()

const store = useDialogStore()
// let currentdate = store.storedate //store.$state as User[]
import { storeToRefs } from 'pinia'
const { storedate } = storeToRefs(store)
// let currentdate = storedate
// if (store.$id == aaa){

// }
// const gridDataNew=reactive([
//     gridData.value[aaa.value]
// ])

import { show } from '@/api/user'
import { stringify } from 'querystring'

var the_id: string
const openDialog = (number: string) => {
  the_id = number
  const currentShow = async () => {
    let res = await show(number)
    storedate.value[+number * 2 - 1].lingmindu = +res.data.data.cdegree
    storedate.value[+number * 2 - 1].zhuangtai = res.data.data.copen_close
    storedate.value[+number * 2 - 1].pinlv = res.data.data.cpinglv
    storedate.value[+number * 2 - 2].lingmindu = +res.data.data.pdegree
    storedate.value[+number * 2 - 2].zhuangtai = res.data.data.popen_close
    storedate.value[+number * 2 - 2].pinlv = res.data.data.ppinglv
    dialogTableVisible.value = true
    aaa.value = number
    for (let i = 0; i < 8; i++) {
      if (storedate.value[i].ID === number) {
        gridData.push(storedate.value[i])
      }
    }
    if (gridData.length >= 4) {
      gridData.shift()
      gridData.shift()
    }
  }
  currentShow()
}

defineExpose({
  openDialog
})
//保存按钮

import { newSetting, simulate } from '@/api/user'
import { tableDataStore } from '@/stores/tableData'
const tableData = tableDataStore()

const saveChanges = async () => {
  // console.log('保存的数据:', storedate.value)

  dialogTableVisible.value = false
  // 这里可以添加将gridData发送到服务器的逻辑
  const res = await newSetting(
    the_id,
    // tableData.$state[+the_id - 1].zhuangtai,
    tableData.$state[+the_id - 1].dizhi,
    tableData.$state[+the_id - 1].mingcheng,
    storedate.value[+the_id * 2 - 2].zhuangtai,
    `${storedate.value[+the_id * 2 - 2].lingmindu}`,
    `${storedate.value[+the_id * 2 - 2].pinlv}`,
    // tableData.$state[+the_id - 1].shijian,
    'now',
    storedate.value[+the_id * 2 - 1].zhuangtai,
    `${storedate.value[+the_id * 2 - 1].lingmindu}`,
    `${storedate.value[+the_id * 2 - 1].pinlv}`
  )

  const currentShow = async () => {
    const res = await show(the_id)
    console.log(res)
    tableData.$state[the_id - 1].shijian = res.data.data.update_time
    tableData.$state[the_id - 1].mingcheng = res.data.data.channel_name
    tableData.$state[the_id - 1].dizhi = res.data.data.address
    tableData.$state[the_id - 1].shijian = res.data.data.update_time
    if (res.data.data.satuation === '在线') {
      tableData.$state[the_id - 1].zhuangtai = 'success'
    } else if (res.data.data.satuation === '离线') {
      tableData.$state[the_id - 1].zhuangtai = 'fail'
    } else {
      tableData.$state[the_id - 1].zhuangtai = 'not_configured'
    }
  }
  currentShow()

  if (checked.value) {
    console.log('同步到所有通道', checked.value)
    const manage = async () => {
      const res = await simulate(the_id)
    }
    manage()
  }
}

// 通常不需要使用defineExpose来暴露内部方法给模板，因为模板可以直接访问这些方法
// 但如果需要从外部（如父组件）访问这些方法，则可以使用defineExpose
// defineExpose({
//     openDialog: () => { dialogTableVisible.value = true; },
//     // 其他需要暴露的方法
// });

// 注意：在这个例子中，我们移除了openDialog方法，因为对话框的显示和隐藏现在通过dialogTableVisible来控制

//一键同步
const checked = ref(true)
</script>

<style scoped>
.slider-demo-block {
  max-width: 600px;
  display: flex;
  align-items: center;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
.dialog-footer {
  margin-top: 15px;
}
.dialog-footer {
  display: flex;
  align-items: center;
  /* 垂直居中对齐 */
}

.button-group {
  display: flex;
  /* 让按钮组也使用 Flexbox 布局 */
  margin-left: auto;
  /* 将按钮组推向右侧，并为右侧的 checkbox 留出空间 */
}

.checkbox-right {
  margin-right: auto;
  /* 将 checkbox 推向左侧 */
}

/* 确保按钮的样式不会干扰布局 */
.dialog-footer .el-button {
  margin: 0;
  /* 移除可能的默认边距 */
}

/* 可选：为按钮组内的按钮添加一些间距 */
.button-group .el-button + .el-button {
  margin-left: 30px;
  /* 根据需要调整间距 */
}
</style>
