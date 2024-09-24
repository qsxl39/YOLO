<template>
        <div style="display: flex; width: 100%;">
                <div style="width: 55%;">
                        <video src="./video1.mp4" controls></video>
                </div>
                <el-table :data="tableData" border style="width: 40%;  margin-left: 20px;"
                        :row-class-name="tableRowClassName">
                        <el-table-column prop="date" label="序号" width="100" />
                        <el-table-column prop="name" label="网络摄像头名称" width="140" />
                        <el-table-column prop="zhuangtai" label="通道状态" style="width: 10%;">
                                <template #default="scope">
                                        <el-tag type="success" v-if="scope.row.status">在线</el-tag>
                                        <el-tag type="info" v-else>未配置</el-tag>
                                </template>
                        </el-table-column>
                        <el-table-column prop="address" label="详细信息" />
                </el-table>
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

]
</script>
