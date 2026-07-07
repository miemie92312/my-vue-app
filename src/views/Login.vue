<script setup>
import { getCurrentInstance, reactive, ref } from 'vue'
import { useAllDataStore } from '../stores'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const loginForm = reactive({
    username: '',
    password: ''
})

const loginRules = reactive({
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码不能少于 6 位', trigger: 'blur' }
    ]
})

const loginFormRef = ref()
const { proxy } = getCurrentInstance()
const store = useAllDataStore()
const router = useRouter()

const handleLogin = async () => {
    if (!loginFormRef.value) return

    await loginFormRef.value.validate(async (valid) => {
        if (!valid) {
            ElMessage.error('请先填写正确的账号和密码')
            return
        }

        const res = await proxy.$api.getMenu(loginForm)

        store.resetState()
        store.updateMenuList(res.menuList)
        store.state.token = res.token
        store.addMenu(router)
        router.push('/home')
    })
}
</script>

<template>
    <div class="body-login">
        <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginRules"
            class="login-container"
        >
            <h1>欢迎登录</h1>
            <el-form-item prop="username">
                <el-input
                    v-model.trim="loginForm.username"
                    type="text"
                    placeholder="请输入账号"
                    clearable
                />
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    v-model.trim="loginForm.password"
                    type="password"
                    placeholder="请输入密码"
                    show-password
                    clearable
                    @keyup.enter="handleLogin"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="less" scoped>
    .body-login{
        width:100%;
        height:100%;
        background-image:url("../assets/images/background.png");
        background-size:100%;
        overflow: hidden;
    }
    .login-container{
        width:400px;
        background-color:#fff;
        border:1px solid #eaeaea;
        border-radius: 15px;
        padding:35px 35px 15px 35px;
        box-shadow:0 0 25px #cacaca;
        margin:250px auto;
        h1{
            text-align:center;
            margin-bottom:20px;
            color: #505450;
        }
        :deep(.el-form-item__content){
            justify-content: center;
        }
    }
</style>