<script setup>
import CommAside from "@/components/CommonAside.vue"
import CommonHeader from "@/components/CommonHeader.vue";
</script>

<template>
<div class="common-layout">
    <el-container class="lay-container">
        <!-- 自定义左侧组件 -->
         <common-aside />
        <el-container>
            <el-header class="el-header">
                <!-- 自定义头部组件 -->
                <common-header />
            </el-header>
            <el-main class="right-main">
                <!-- 路由出口 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

</div>
</template>

<style scoped lang="less">
    .common-layout,.lay-container{
        height: 100%;
    }
    .el-header{
        background-color: #333

    }
</style>
