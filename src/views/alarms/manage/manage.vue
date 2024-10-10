<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    highlight-current-row
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" style="width: 10%" />
    <el-table-column prop="number" label="序号" style="width: 10%" align="center" />
    <el-table-column prop="zhuangtai" label="通道状态" style="width: 10%" align="center">
      <template #default="scope">
        <el-tag
          :type="
            scope.row.zhuangtai === 'success'
              ? 'success'
              : scope.row.zhuangtai === 'fail'
                ? 'danger'
                : 'info'
          "
        >
          {{
            scope.row.zhuangtai === 'success'
              ? '在线'
              : scope.row.zhuangtai === 'fail'
                ? '离线'
                : '未配置'
          }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="dizhi" label="RTSP地址" style="width: 10%" align="center">
      <template #default="scope">
        <el-input v-model="scope.row.dizhi" style="width: 100%" />
      </template>
    </el-table-column>
    <el-table-column prop="mingcheng" label="通道名称" style="width: 10%" align="center">
      <template #default="scope">
        <el-input v-model="scope.row.mingcheng" style="width: 100%" />
      </template>
    </el-table-column>
    <el-table-column prop="peizhi" label="算法配置" style="width: 10%" align="center">
      <template #default="scope">
        <el-icon color="#409efc" class="no-inherit" :size="20" @click="open(scope.row.number)">
          <setting />
        </el-icon>
      </template>
    </el-table-column>
    <!-- <el-table-column prop="peizhi" label="算法配置" style="width: 10%;" /> -->
    <el-table-column prop="zhouije" label="周界" style="width: 10%" align="center" />
    <el-table-column label="修改时间" style="width: 10%" align="center">
      <template #default="scope">{{ scope.row.shijian }}</template>
    </el-table-column>
  </el-table>
  <div class="dialog-footer" style="margin: 5px">
    <el-button @click="restartChannel()">重启通道</el-button>
    <el-button @click="restartSetting()">重置配置</el-button>
  </div>
  <!-- 对话框 -->
  <HistoryDialog ref="HistoryDialogRef" />
</template>

<script lang="ts" setup>
import { ElTable, ElInput, SCOPE } from 'element-plus'
import { Setting } from '@element-plus/icons-vue'
// import myDialog from './myDialog.vue'
import { defineAsyncComponent } from 'vue'
import { ref, computed, onMounted } from 'vue'
import { tableDataStore } from '@/stores/tableData'
// import { log } from 'console';
// import { Row } from 'element-plus/es/components/table-v2/src/components/index.mjs';
// console.log('@@@', tableDataStore.$id);

const HistoryDialog = defineAsyncComponent(() => import('./myDialog.vue'))
const HistoryDialogRef = ref()

const open = (number: string) => {
  console.log('打开')
  HistoryDialogRef.value.openDialog(number)
}

interface User {
  number: string
  // zhuangtai: 'success' | 'fail' | 'not_configured' // 修改为字符串类型
  zhuangtai: string
  dizhi: string
  mingcheng: string
  peizhi: string
  zhouije: string
  shijian: string
}

const store = tableDataStore()
const tableData = computed(() => store.$state as User[]) // 使用 computed 来保持响应性
// 对话框

import { channel, restart, newSetting, show } from '@/api/user'

//通道信息呈现

const currentShow = async (the_id: any) => {
  let res = await show(the_id)
  tableData.value[+the_id - 1].mingcheng = res.data.data.channel_name
  tableData.value[+the_id - 1].dizhi = res.data.data.address
  tableData.value[+the_id - 1].shijian = res.data.data.update_time
  if (res.data.data.satuation === '在线') {
    tableData.value[+the_id - 1].zhuangtai = 'success'
  } else if (res.data.data.satuation === '离线') {
    tableData.value[+the_id - 1].zhuangtai = 'fail'
  } else {
    tableData.value[+the_id - 1].zhuangtai = 'not_configured'
  }

  // storedate.storedate[the_id * 2].lingmindu = res.data.data.cdegree
  // storedate.storedate[the_id * 2].zhuangtai = res.data.data.copen_close
  // storedate.storedate[the_id * 2].pinlv = res.data.data.cpinglv
  // storedate.storedate[the_id * 2 - 1].lingmindu = res.data.data.pdegree
  // storedate.storedate[the_id * 2 - 1].zhuangtai = res.data.data.popen_close
  // storedate.storedate[the_id * 2 - 1].pinlv = res.data.data.ppinglv
}

re()

function re() {
  var the_id: number = 1
  for (; the_id <= 4; ) {
    // console.log('the_id=', the_id)
    currentShow(the_id)
    the_id++
  }
}

// var the_id: number = 1
// for (; the_id <= 4; ) {
//   // console.log('the_id=', the_id)
//   storedate.currentShow(the_id)
//   the_id++
// }

//遍历序号并绑定按钮(重启通道)(重置配置)
// 响应式数据

const selectedRows: any = ref([])
const tableRef = ref(null)

// 处理选中行变化
const handleSelectionChange = (val: any) => {
  selectedRows.value = val
}
// 重启通道
const restartChannel = async () => {
  if (selectedRows.value.length === 0) {
    alert('请至少选择一个通道')
    return
  }
  try {
    // 假设后端API接受一个包含序号的数组作为请求体
    for (const item of selectedRows.value) {
      const response = await channel(item.number)
      currentShow(item.number)
      if ((response.data.code = 200)) {
        alert('重启通道成功')
      } else {
        alert(response.data.error)
      }
    }

    // 可以在这里处理响应数据，比如更新tableData
  } catch (error) {
    alert('重启通道失败')
    console.error(error)
  }
}

// 重置配置
const restartSetting = async () => {
  if (selectedRows.value.length === 0) {
    alert('请至少选择一个通道')
    return
  }
  try {
    // 假设后端API接受一个包含序号的数组作为请求体
    for (const item of selectedRows.value) {
      const response = await restart(item.number)
      currentShow(item.number)

      if ((response.data.code = 200)) {
        alert('重置配置成功')
      } else {
        alert(response.data.error)
      }
    }

    // 可以在这里处理响应数据，比如更新tableData
  } catch (error) {
    alert('重置配置失败')
    console.error(error)
  }
}
</script>
