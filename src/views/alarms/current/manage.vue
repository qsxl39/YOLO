<template>
        <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="selection" style="width: 10%;" />
                <el-table-column property="number" label="序号" style="width: 10%;" />
                <el-table-column property="zhuangtai" label="通道状态" style="width: 10%;" />
                <el-table-column property="dizhi" label="* RTSP地址" style="width: 10%;" />
                <el-table-column property="mingcheng" label="* 通道名称" style="width: 10%;" />
                <el-table-column property="peizhi" label="算法配置" style="width: 10%;" />
                <el-table-column property="zhouije" label="周界" style="width: 10%;" />
                <el-table-column label="修改时间" style="width: 10%;">
                        <template #default="scope">{{ scope.row.shijian }}</template>
                </el-table-column>
        </el-table>
</template>

<script lang="ts" setup>
import { ElTable } from 'element-plus'
import { Input } from 'postcss';
interface User {
        number:string
        zhuangtai: string
        dizhi: Input
        mingcheng: string
        peizhi: string
        zhouije: string
        shijian: string
}
const tableData: User[] = [
        {
                number:'1',
                zhuangtai: '在线',
                dizhi: 'aaa',
                mingcheng: 'a',
                peizhi: 'a',
                zhouije: '4',
                shijian: '2016-05-04',
        },
]
</script>
