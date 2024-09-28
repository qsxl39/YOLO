<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column type="selection" style="width: 10%" />
    <el-table-column prop="number" label="序号" style="width: 10%" align="center" />
    <el-table-column prop="zhuangtai" label="通道状态" style="width: 10%" align="center">
      <template #default="scope">
        <el-tag
          :type="scope.row.zhuangtai === 'success' ? 'success' : scope.row.zhuangtai === 'fail' ? 'danger' : 'info'">
          {{ scope.row.zhuangtai === 'success' ? '在线' : scope.row.zhuangtai === 'fail' ? '离线' : '未配置' }}
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
  <!-- 对话框 -->
  <HistoryDialog ref="HistoryDialogRef" />
</template>

<script lang="ts" setup>
import { ElTable, ElInput, SCOPE } from 'element-plus'
import { Setting } from '@element-plus/icons-vue'
// import myDialog from './myDialog.vue'
import { defineAsyncComponent } from 'vue'
import { ref, computed } from 'vue';
import { tableDataStore } from '@/stores/tableData'
import { log } from 'util';
// import { log } from 'console';
// import { Row } from 'element-plus/es/components/table-v2/src/components/index.mjs';
// console.log('@@@', tableDataStore.$id);

const HistoryDialog = defineAsyncComponent(() => import('./myDialog.vue'))
const HistoryDialogRef = ref()

const open = (number: string) => {
  console.log('打开')
  HistoryDialogRef.value.openDialog(number)
};


interface User {
  number: string;
  zhuangtai: 'success' | 'fail' | 'not_configured'; // 修改为字符串类型  
  dizhi: string;
  mingcheng: string;
  peizhi: string;
  zhouije: string;
  shijian: string;
}



const store = tableDataStore();
const tableData = computed(() => store.$state as User[]); // 使用 computed 来保持响应性   
// 对话框
</script>
