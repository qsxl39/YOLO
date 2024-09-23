<template>
    <el-form :inline="true" ref="ruleFormRef" style="max-width: 100%" :model="ruleForm" :rules="rules"
        label-width="auto" class="demo-ruleForm" :size="formSize" status-icon>

        <el-form-item style="width: 160px;" prop="region">
            <el-select v-model="ruleForm.region" placeholder="选择通道">
                <el-option label="通道一" value="yi" />
                <el-option label="通道二" value="er" />
            </el-select>
        </el-form-item>
        <el-form-item style="width: 160px;" prop="region2">
            <el-select v-model="ruleForm.region2" placeholder="告警类型">
                <el-option label="人数统计" value="renshu" />
                <el-option label="车辆统计" value="cheliang" />
            </el-select>
        </el-form-item>

        <el-form-item required>
            <el-col :span="11">
                <el-form-item style="margin: 0;" prop="date1">
                    <el-date-picker v-model="ruleForm.date1" type="date" placeholder="起始日期" style="width: 100%" />
                </el-form-item>
            </el-col>
            <el-col class="text-center" :span="2">
                <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
                <el-form-item style="margin: 0;" prop="date2">
                    <el-date-picker v-model="ruleForm.date2" type="date" placeholder="截止日期" style="width: 100%" />
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-button type="success" plain :icon="Search" @click="submitForm(ruleFormRef)">
                查询记录
            </el-button>
            <el-button type="danger" plain :icon="Delete" @click="submitForm(ruleFormRef)">
                删除记录
            </el-button>
            <el-button type="primary" plain @click="resetForm(ruleFormRef)"> 导出记录<el-icon class="el-icon--right">
                    <Upload />
                </el-icon></el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { Delete, Search, Upload } from '@element-plus/icons-vue'

interface RuleForm {
    region: string
    region2: string
    date1: string
    date2: string
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    region: '',
    region2: '',
    date1: '',
    date2: '',
})

const locationOptions = ['Home', 'Company', 'School']

const rules = reactive<FormRules<RuleForm>>({

    region: [
        {
            required: true,
            message: '请选择通道',
            trigger: 'change',
        },
    ],
    region2: [
        {
            required: true,
            message: '请选择告警',
            trigger: 'change',
        },
    ],

    date1: [
        {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change',
        },
    ],
    date2: [
        {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change',
        },
    ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>
