<script setup>
import {ref,computed} from 'vue'
import { Menu } from '@element-plus/icons-vue'
import { useAllDataStore } from '@/stores'

const menuIcon = Menu   
const getImageUrl = (user2) => {
    return new URL(`../assets/images/${user2}.png`, import.meta.url).href
}
const store = useAllDataStore()
const handleCollapse = () => {
    store.state.isCollapse = !store.state.isCollapse
}

</script>


<template>
  <div class="header">
    <div class="left-content">
        <el-button size="small" @click = "handleCollapse" >
           <component class="icons" :is="menuIcon"></component>
        </el-button>
            <el-breadcrumb separator="/" class="bread">
                <el-breadcrumb-item :to="{ path: '/' }"> &nbsp;&nbsp;&nbsp;首页</el-breadcrumb-item>
            </el-breadcrumb>
    </div>
    <div class="right-content">
         <el-dropdown>
    <span class="el-dropdown-link">
      <img :src="getImageUrl('user2')" class="user"/>
      <el-icon class="el-icon--right">
                <!-- <arrow-down /> -->
            </el-icon>
            </span>
            <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
  </div>
</template>




<style lang="less" scoped>
.header{
    display:flex;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    height: 100%;
    background-color: #333;
}

.icons{
    width: 20px;
    height: 20px;
}
.left-content{
    display: flex;
    align-items: center;
    .left-content{
        margin-right: 20px;
    }
}
.right-content{
    .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-top:10px ;
    }
}

</style>