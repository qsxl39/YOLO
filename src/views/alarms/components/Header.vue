<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { RouterView } from 'vue-router';
import { ArrowRight,SwitchButton } from '@element-plus/icons-vue'
import { Ref } from 'vue';

import { Warning, Operation, VideoCamera, Picture, Calendar } from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}


</script>
<template>
    <el-header class="header">
        YOLO算法盒子
        <RouterLink style="margin-left: 85%;" active-class="active" :to="{ name: 'login' }">
            <el-icon>
                <SwitchButton />
            </el-icon>
        </RouterLink>
        userName

    </el-header>


    <el-container style="max-width: 100vw;">
        <el-aside style="min-height: 90vh; max-width: 150px;">
            <!-- <el-row class="tac"> -->
            <el-menu active-text-color="#ffd04b" background-color="#fff" class="el-menu-vertical-demo"
                default-active="/" text-color="#000" @open="handleOpen" @close="handleClose">
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <Warning />
                        </el-icon>告警中心
                    </template>
                    <el-menu-item index="1-1">
                        <el-icon>
                            <VideoCamera />
                        </el-icon>
                        <RouterLink :to="{
                                name: 'current',
                            }" active-class="active-item">
                            实时告警
                        </RouterLink>
                    </el-menu-item>
                    <el-menu-item index="1-2">
                        <el-icon>
                            <Picture />
                        </el-icon>
                        <RouterLink :to="{
                                name: 'query',
                            }" active-class="active-item">
                            告警查询
                        </RouterLink>
                    </el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                            <Operation />
                        </el-icon>
                        <span>通道配置</span>
                    </template>
                    <el-menu-item index="2-1">
                        <el-icon>
                            <Calendar />
                        </el-icon>
                        <RouterLink :to="{
                                name: 'manage',
                            }" active-class="active-item">
                            通道管理
                        </RouterLink>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
            <!-- </el-row> -->
        </el-aside>
        <el-main>
            <main class="main">
                <el-breadcrumb :separator-icon="ArrowRight" style="margin-bottom: 20px;">
                    <el-breadcrumb-item :to="{ path: '/' }"></el-breadcrumb-item>
                    <el-breadcrumb-item> 告警中心</el-breadcrumb-item>
                    <el-breadcrumb-item>实时告警</el-breadcrumb-item>
                </el-breadcrumb>
                <RouterView />
            </main>
        </el-main>
    </el-container>
</template>
<style lang="scss" scoped>
.header{
    background-color: #000000;
    height: 10vh;
    line-height: 10vh;
    color: white;
}
.menu-item{
    margin-right: 50px;
    color: rgb(148, 28, 28);
    font-size: 24px;
    font-weight: 600;
}
.active-item span{
    color: rgb(150, 29, 29);
}
.el-icon {
width: 20px;
height: 20px;
}
</style>