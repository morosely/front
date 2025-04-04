<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)

//定义数据模型
const registerData = ref({
    username: '',
    password: '',
    rePassword: ''
})

//自定义确认密码的校验函数
const rePasswordValid = (rule, value, callback) => {
    //console.log(registerData.value.password + ' -----> ' + value);
    if (value == null || value === '') {
        return callback(new Error('请再次确认密码'))
    } else if (registerData.value.password !== value) {
        return callback(new Error('两次输入密码不一致'))
    } else {
        callback()
    }
}

//用于注册的表单校验模型
const registerDataRules = ref({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 6, max: 16, message: '用户名的长度必须为6~16位', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 16, message: '密码长度必须为6~16位', trigger: 'blur' }
    ],
    rePassword: [
        { validator: rePasswordValid, trigger: 'blur' }
    ]
})

//用于注册事件的函数
import { registerService,loginService } from '@/api/user.js'
const register = async () => {
    //console.log('注册...');
    //registerData是一个响应式对象，如果要获取值，需要.value
    let result = await registerService(registerData.value);
    //console.log('result -----> ' + result.code);
    //登陆、注册相同回调方式，提取到request.js响应拦截器中
    // if (result.code === 0) {
    //     alert(result.message ? result.message : '注册成功');
    // } else {
    //     alert("注册失败！！！");
    // }
    // alert(result.message ? result.message : '注册成功');
    
    ElMessage.success('注册成功');
}

//用于登陆事件的函数
import { useRouter } from 'vue-router'
const router = useRouter();

//导入token状态
import { useTokenStore } from '@/stores/token.js'
//调用useTokenStore得到状态
const tokenStore = useTokenStore();
const login = async () => {
    let result = await loginService(registerData.value);
    // if (result.code === 0) {
    //      alert(result.message ? result.message : '登陆成功');
    // } else {
    //     alert("登陆失败！！！");
    // }
    // alert(result.message ? result.message : '登陆成功');

    ElMessage.success('登陆成功');
    //保存token
    tokenStore.setToken(result.data)
    router.push('/');
}

//定义函数，清空模型数据
const clearRegisterData = () => {
    registerData.value = {
        username: '',
        password: '',
        rePassword: ''
    }
}

</script>


<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData"
                :rules="registerDataRules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码"
                        v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码"
                        v-model="registerData.rePassword"></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register(registerData)">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false; clearRegisterData()">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>

            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="registerDataRules">
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                        v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login(registerData)">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true; clearRegisterData()">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>


<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
            url('@/assets/login_bg.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>