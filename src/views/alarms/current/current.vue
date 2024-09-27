<template>
        <div style="display: flex; width: 100%;">
                <div style="width: 55%;">
                        <video src="./video1.mp4" controls></video>
                </div>
                <div style="margin: 0px 10px 0px 30px;">
                        <el-button :icon="Camera" />
                </div>
                <el-table :data="tableData" border style="width: 40%;  margin-left: 20px;"
                        :row-class-name="tableRowClassName">
                        <el-table-column prop="date" label="序号" width="100" align="center" />
                        <el-table-column prop="name" label="网络摄像头名称" width="140" align="center" />
                        <el-table-column prop="zhuangtai" label="通道状态" style="width: 10%;" align="center">
                                <template #default="scope">
                                        <el-tag type="success" v-if="scope.row.status">在线</el-tag>
                                        <el-tag type="danger" v-if="scope.row.status">离线</el-tag>
                                        <el-tag type="info" v-else>未配置</el-tag>
                                </template>
                        </el-table-column>
                        <el-table-column prop="address" label="详细信息" align="center">
                                <el-popover placement="top-start" title="01 :ID-00" :width="200" trigger="hover"
                                        content="RTSP地址  :  rtsp://  xxxxxx       修改时间:2023-6-27 12:14  算法配置 ">
                                        <template #reference>
                                                <el-icon color="#409efc" class="no-inherit" :size="20">
                                                        <Warning />
                                                </el-icon>
                                        </template>
                                </el-popover>
                        </el-table-column>
                </el-table>
        </div>

        <!-- 图片列表 -->
        <div class="list-adapt-container layout-pd">
                <el-card>
                        <el-row :gutter="15">
                                <el-col :xs="24" :sm="12" :md="8" :lg="3" :xl="4" class="mb15"
                                        v-for="(v, k) in state.tableData.data" :key="k" @click="onTableItemClick(v)">
                                        <div class="flex-warp-item">
                                                <div class="flex-warp-item-box">
                                                        <div class="item-img">
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
</style>


<script lang="ts" setup>
import { Warning, Camera } from '@element-plus/icons-vue'

interface User {
        date: string
        name: string
        address: string
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

const tableData: User[] = [
        {
                date: '01',
                name: 'ID-00',
                address: 'No. 189, Grove St, Los Angeles',
        },
        {
                date: '02',
                name: 'ID-01',
                address: 'No. 189, Grove St, Los Angeles',
        },
        {
                date: '03',
                name: 'ID-02',
                address: 'No. 189, Grove St, Los Angeles',
        },
        {
                date: '04',
                name: 'ID-03',
                address: 'No. 189, Grove St, Los Angeles',
        },

]


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
