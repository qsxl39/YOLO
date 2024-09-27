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
        <el-icon color="#409efc" class="no-inherit" :size="20" @click=" dialogTableVisible = true">
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
  <div class="dialog-footer" style="margin: 5px;">
    <el-button >重启通道</el-button>
    <el-button >重置配置</el-button>
  </div>
  <!-- 对话框 -->
  <el-dialog v-model="dialogTableVisible" title="算法配置" width="1100">
    <el-table border stripe :data="gridData" style="width: 100%">
      <el-table-column property="mingcheng" label="算法名称" width="120" align="center" />
      <el-table-column label="开关状态" width="120" align="center">
        <template #default="{ row }">
          <el-switch v-model="row.zhuangtai" size="large" inline-prompt active-text="开" inactive-text="关" />
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
          <el-input-number v-model="row.pinlv" :min="1" :max="10" />
        </template>
      </el-table-column>
    </el-table>
    <div class="dialog-footer" style="margin: 5px;">
      <el-button type="primary" @click="saveChanges">保存</el-button>
      <el-button @click="dialogTableVisible = false">取消</el-button>
    </div>
  </el-dialog>

</template>

<script lang="ts" setup>
import { ElTable, ElInput } from 'element-plus'
import { Setting } from '@element-plus/icons-vue'
import { ref } from 'vue';

const dialogTableVisible = ref(false);

const gridData = ref([
  {
    mingcheng: '人数统计',
    zhuangtai: true,
    lingmindu: 50, // 假设灵敏度初始值为50  
    pinlv: 1,      // 假设上报频率初始值为1  
  },
  {
    mingcheng: '车辆统计',
    zhuangtai: false,
    lingmindu: 30, // 假设灵敏度初始值为30  
    pinlv: 5,      // 假设上报频率初始值为5  
  },
]);

const saveChanges = () => {
  dialogTableVisible.value = false
  console.log('保存的数据:', gridData.value);
  // 这里可以添加将gridData发送到服务器的逻辑  
};  




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
    dizhi: 'rtsp://xxxx',
    mingcheng: 'ID-00',
    peizhi: 'ID-00',
    zhouije: '4',
    shijian: '2016-05-04 23:12:11'
  },
  {
    number: '2',
    zhuangtai: true,
    dizhi: 'rtsp://xxxx',
    mingcheng: 'ID-01',
    peizhi: 'ID-00',
    zhouije: '4',
    shijian: '2016-05-04 23:12:11'
  },
  {
    number: '3',
    zhuangtai: true,
    dizhi: 'rtsp://xxxx',
    mingcheng: 'ID-02',
    peizhi: 'ID-00',
    zhouije: '4',
    shijian: '2016-05-04 23:12:11'
  },
  {
    number: '4',
    zhuangtai: false,
    dizhi: 'rtsp://xxxx',
    mingcheng: 'ID-03',
    peizhi: 'ID-00',
    zhouije: '4',
    shijian: '2016-05-04 23:12:11'
  }
]

// 对话框

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
</style>