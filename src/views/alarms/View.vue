<script setup lang="ts">
import Header from './components/Header.vue';
import { RouterView } from 'vue-router';
</script>
<template>
    <Header/>
    <!-- <main class="main">
        <RouterView />
    </main> -->
</template>
<style lang="scss" scoped>
.main {
    height: 90vh;
    padding-top: 20px;
}
</style>