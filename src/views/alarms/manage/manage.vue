<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column type="selection" style="width: 10%" />
    <el-table-column prop="number" label="序号" style="width: 10%" align="center" />
    <el-table-column prop="zhuangtai" label="通道状态" style="width: 10%" align="center">
      <template #default="scope">
        <el-tag type="success" v-if="scope.row.zhuangtai">在线</el-tag>
        <el-tag type="info" v-else>未配置</el-tag>
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
      <template #default="">
        <el-icon color="#409efc" class="no-inherit" :size="20" @click="handleSettingClick(scope.$index, scope.row)">
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
  <myDialog/>

</template>

<script lang="ts" setup>
import { ElTable, ElInput } from 'element-plus'
import { Setting } from '@element-plus/icons-vue'
import myDialog from './myDialog.vue';

//绑定事件




interface User {
  number: string
  zhuangtai: boolean
  dizhi: string
  mingcheng: string
  peizhi: string
  zhouije: string
  shijian: string
}

const tableData: User[] = [
  {
    number: '1',
    zhuangtai: true,
    dizhi: 'aaaaa',
    mingcheng: 'a',
    peizhi: 'a',
    zhouije: '4',
    shijian: '2016-05-04'
  },
  {
    number: '1',
    zhuangtai: true,
    dizhi: 'aaaaa',
    mingcheng: 'a',
    peizhi: 'a',
    zhouije: '4',
    shijian: '2016-05-04'
  }
]

// 对话框

</script>
