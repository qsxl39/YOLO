<template>
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
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveChanges">保存</el-button>
            <el-button @click="dialogTableVisible = false">取消</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, defineExpose } from 'vue'
import { useDialogStore } from '@/stores/useDialogStore'
// import { defineProps } from 'vue';
// const props = defineProps<{
//     rowNumber: string
// }>();

// console.log(props.rowNumber);


interface User {
    ID: number,
    mingcheng: string,
    zhuangtai: boolean,
    lingmindu: number, // 假设灵敏度初始值为50
    pinlv: number // 假设上报频率初始值为1
}



var dialogTableVisible = ref(false)
let aaa
const gridData = computed(() => store.$state as User[]); // 使用 computed 来保持响应性 
const store = useDialogStore();
if (store.$id == aaa){
}

const openDialog = (number:string) => {
    console.log('已打卡',number)
    dialogTableVisible.value = true
    console.log(dialogTableVisible)
    aaa=number

}



defineExpose({
    openDialog
})

const saveChanges = () => {
    console.log('保存的数据:', gridData.value)
    // 这里可以添加将gridData发送到服务器的逻辑
}

// 通常不需要使用defineExpose来暴露内部方法给模板，因为模板可以直接访问这些方法
// 但如果需要从外部（如父组件）访问这些方法，则可以使用defineExpose
// defineExpose({
//     openDialog: () => { dialogTableVisible.value = true; },
//     // 其他需要暴露的方法
// });

// 注意：在这个例子中，我们移除了openDialog方法，因为对话框的显示和隐藏现在通过dialogTableVisible来控制
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
