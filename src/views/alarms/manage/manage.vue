<template>
        <el-table :data="tableData" border style="width: 100% ;  ">
                <el-table-column type="selection" style="width: 10%;" />
                <el-table-column property="number" label="序号" style="width: 10%;" />
                <el-table-column prop="zhuangtai" label="通道状态" style="width: 10%;">
                        <template #default="scope">
                                <el-tag type="success" v-if="scope.row.status">启用</el-tag>
                                <el-tag type="info" v-else>禁用</el-tag>
                        </template>
                </el-table-column>

                <el-table-column prop="dizhi" label="RTSP地址" style="width: 10%;">
                        <template #default="scope">
                                <el-input property="dizhi" v-if="scope.row.dizhi" style="width: 10%;" />
                        </template>
                </el-table-column>
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
        zhuangtai: boolean
        dizhi: Input
        mingcheng: string
        peizhi: string
        zhouije: string
        shijian: string
}
const tableData: User[] = [
        {
                number:'1',
                zhuangtai: true,
                dizhi: 'aaaaa',
                mingcheng: 'a',
                peizhi: 'a',
                zhouije: '4',
                shijian: '2016-05-04',
        },
        {
                number: '2',
                zhuangtai: '线',
                dizhi: 'aaa',
                mingcheng: 'a',
                peizhi: 'a',
                zhouije: '4',
                shijian: '2016-05-04',
        },
]
</script>
