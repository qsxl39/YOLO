<template>
        <div style="display: flex; width: 100%;">
                <div style="width: 55%; height: auto;">
                        <video src="./video1.mp4" controls></video>
                </div>
                <div style="margin-left: 20px; ">
                        <div>
                                <el-button style="width: 100px; height:80px;" :icon="Camera" />
                        </div>
                        <el-table class="custom-table" :data="tableData" border
                                style=" margin-left:0px; margin-top: 20px; width: 660px; height: auto;" :row-class-name="tableRowClassName">
                                <el-table-column prop="number" label="序号" width="100" align="center" />
                                <el-table-column prop="mingcheng" label="网络摄像头名称" width="140" align="center" />
                                <el-table-column prop="zhuangtai" label="通道状态" style="width: 10%;" align="center">
                                        <template #default="scope">
                                                <el-tag
                                                        :type="scope.row.zhuangtai === 'success' ? 'success' : scope.row.zhuangtai === 'fail' ? 'danger' : 'info'">
                                                        {{ scope.row.zhuangtai === 'success' ? '在线' :
                                                        scope.row.zhuangtai ===
                                                        'fail' ? '离线' : '未配置' }}
                                                </el-tag>
                                        </template>
                                </el-table-column>
                                <el-table-column prop="dizhi" label="RTSP地址" width="140" align="center" />
                                <el-table-column label="详细信息" align="center">
                                        <template #default="scope">
                                                <el-popover placement="right" :width="400" trigger="click"
                                                        ref="popover">
                                                        <el-table :data="[scope.row]"> <!-- 只显示当前行的数据 -->
                                                                <el-table-column width="150" property="mingcheng"
                                                                        label="网络摄像头名称" />
                                                                <el-table-column width="150" property="dizhi"
                                                                        label="RTSP地址" />
                                                                <el-table-column width="100" property="shijian"
                                                                        label="修改时间" />
                                                        </el-table>
                                                        <template #reference>
                                                                <el-icon color="#409efc" class="no-inherit" :size="20">
                                                                        <Warning />
                                                                </el-icon>
                                                        </template>
                                                </el-popover>
                                        </template>
                                </el-table-column>
                        </el-table>
                </div>
        </div>

        <!-- 图片列表 -->
        <div class="list-adapt-container layout-pd">
                <el-card>
                        <el-row :gutter="20">
                                <el-col :xs="24" :sm="12" :md="8" :lg="3" :xl="4" class="mb15"
                                        v-for="(v, k) in state.tableData.data" :key="k" @click="onTableItemClick(v)">
                                        <div class="flex-warp-item">
                                                <div class="flex-warp-item-box">
                                                        <div class="item-img" style="margin-bottom: 8px;">
                                                                <img :src="v.img" />
                                                        </div>
                                                        <div class="item-txt">
                                                                <div class="item-txt-title">{{ v.title }}</div>
                                                        </div>
                                                </div>
                                        </div>
                                </el-col>
                        </el-row>
                </el-card>
        </div>
</template>

<style scoped>
/* 表格 */
.el-table .warning-row {
        --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
        --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.custom-table {
        border: 1.5px solid #22222200;
        /* 设置外边框宽度和颜色 */
}
/* fewcode */
.el-card {
        border-radius: 2px;
        /* 使用 !important 可以确保这个规则覆盖其他可能存在的规则 */
        box-shadow: none !important;
        margin-top: 8px;
}

/* 确保flex容器 */
.flex-warp-item-box {
        display: flex;
        flex-direction: column;
        /* 如果需要垂直布局 */
        align-items: center;
        /* 垂直居中 */
        justify-content: center;
        /* 水平居中（在flex-direction为row时有效，但这里我们设置为column，所以主要用于垂直居中） */
        text-align: center;
        /* 对于块级元素，确保文本水平居中 */
        /* 其他样式，如宽度、高度等 */
}

/* 如果flex-warp-item-box不是flex容器，或者你需要更精确地控制.item-txt-title的位置 */
.item-txt-title {
        margin: auto;
        /* 这在flex容器中通常用于水平和垂直居中 */
        /* 或者，如果你知道父容器的高度和宽度，可以使用绝对定位 */
        /* position: absolute;  
  top: 50%;  
  left: 50%;  
  transform: translate(-50%, -50%); */
}


</style>


<script lang="ts" setup>
import { Warning, Camera } from '@element-plus/icons-vue'
import { ref, computed } from 'vue';
import { tableDataStore } from '@/stores/tableData'
import { useDialogStore } from '@/stores/useDialogStore'

interface User {
        number: string;
        zhuangtai: 'success' | 'fail' | 'not_configured'; // 修改为字符串类型  
        dizhi: string;
        mingcheng: string;
        peizhi: string;
        zhouije: string;
        shijian: string;
}

const tableRowClassName = ({
        row,
        rowIndex,
}: {
        row: User
        rowIndex: number
}) => {
        if (rowIndex === 1) {
                return 'warning-row'
        } else if (rowIndex === 3) {
                return 'success-row'
        }
        return ''
}

const store = tableDataStore();
const dialogStore = useDialogStore()
const tableData = computed(() => store.$state as User[]); // 使用 computed 来保持响应性   
const useDialog = computed(() => dialogStore.$state ); // 使用 computed 来保持响应性 



// 图片列表
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { filterList } from './mock';

// 定义变量内容
const router = useRouter();
const state = reactive({
        tableData: {
                data: filterList,
                total: 99,
                loading: false,
                param: {
                        pageNum: 1,
                        pageSize: 10,
                },
        },
});


</script>
