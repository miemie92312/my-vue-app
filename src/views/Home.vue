<script setup>
import {ref,getCurrentInstance,onMounted} from 'vue'
const getImageUrl = (user2) => {
    return new URL(`../assets/images/${user2}.png`, import.meta.url).href
}
const {proxy} = getCurrentInstance()
const tableData = ref([
    
])

const countData = ref([
    
])

const tableLabel = ref({
    name: "课程",
    todayBuy: "今日购买",
    monthBuy: "本月购买",
    totalBuy: "总购买",
})

const getTableData =async () => {
    const data = await proxy.$api.getTableData()
    console.log(data);
    tableData.value = data.tableData
}

const getCountData =async () => {
    const data = await proxy.$api.getCountData()
    console.log(data);
    // countData.value = data.countData
}

onMounted(()=>{
    getTableData()
    getCountData()
})
</script>

<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 20px;">
             <el-card shadow="hover" >
                    <div class="user">
                        <img :src="getImageUrl('user2')" class="user"/>
                        <div class="user-info">
                            <p class="user-info-admin">admin</p>
                            <p class="user-info-p">粉色奶龙</p>
                        </div>
                    </div>
                    <div class="login-info">
                        <p>上次登录时间：<span>2026.6.6</span></p>
                        <p>上次登录地点：<span>南京</span></p>
                    </div>
            </el-card>
            
            <el-card shadow="hover" class="user-table">
                <el-table :data="tableData" style="width: 100%">
               <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
                </el-table>
            </el-card>
        </el-col>
    </el-row>
    </template>

<style scoped lang="less">
  .home{
    height: 100%;
    overflow: hidden;
    .user{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
        img{
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 40px;
        }
    }
    .user-info{
        p{
            line-height: 40px;
        }
        .user-info-p{
             font-size: 20px;
             color: #999;
        }
        .user-info-admin{
            font-size: 35px;
        }
    }

    .login-info{
        p{
            line-height: 30px;
            font-size: 14px;
            color: #999;
            span{
                color: #666;
                margin-left: 60px;
            }
        }
    }
     .user-table{
    margin-top: 20px;
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-bottom: 20px;
    }
    .icons {
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .detail {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num {
        font-size: 30px;
        margin-bottom: 10px;
      }
      .txt {
        font-size: 14px;
        text-align: center;
        color: #999;
      }
    }
  }
  .top-echart{
    height: 280px
  }
  .graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card {
      width: 48%;
      height: 260px;
    }
  }
}
   
</style>
