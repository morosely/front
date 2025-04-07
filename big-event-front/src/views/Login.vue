<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)

//定义数据模型
const formData = reactive({
    username: '',
    password: '',
    repassword: ''
})

//重复密码一致性校验
const checkPass = (rule, value, callback) => {
    //console.info(formData.password + " --- " +value)
    if (value === '') {
        callback(new Error('Please input the password again'))
    } else if (value !== formData.password) {
        callback(new Error("Two inputs don't match!"))
    } else {
        callback()
    }
}

//定义表单校验规则
const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, max: 16, message: '用户名长度5-16位', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 16, message: '密码长度5-16位', trigger: 'blur' }
    ],
    repassword: [{ validator: checkPass, trigger: 'blur' }]
}

//调用后台接口，完成注册功能
import { userRegService, loginService } from '@/api/user.js'

const register = async () => {
    let result = await userRegService(formData);
    /* if (result.code === 0) {
        //alert("Success");
        let msg = result.message ? result.message : '注册成功';
        ElMessage({
            message: msg,
            type: 'success',
        })
    } else {
        //alert("Failture");
        let msg = result.message ? result.message : '注册失败';
        ElMessage({
            showClose: true,
            message: msg,
            type: 'error',
        })
    } */
    ElMessage.success(result.message ? result.message : '注册成功');
}

//绑定数据复用注册时表单数据
//调用后台登陆接口
import { useRouter } from 'vue-router'
const router = useRouter();

//导入token状态
import { useTokenStore } from '@/stores/token.js'
//调用useTokenStore得到状态
const tokenStore = useTokenStore();

const login = async () => {
    let result = await loginService(formData);
    /* if (result.code === 0) {
        //alert("Success");
        let msg = result.message ? result.message : '登陆成功';
        ElMessage({
            message: msg,
            type: 'success',
        })
    } else {
        //alert("Failture");
        let msg = result.message ? result.message : '登陆失败';
        ElMessage({
            showClose: true,
            message: msg,
            type: 'error',
        })
    } */
    //保存token
    tokenStore.setToken(result.data);
    ElMessage.success(result.message ? result.message : '登陆成功');
    router.push('/')
}

//登陆和注册切换时，清空模型中数据
const clearData = () => {
    formData.username = '';
    formData.password = '';
    formData.repassword = '';
}

</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="formData" :rules="rules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="formData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码"
                        v-model="formData.password"></el-input>
                </el-form-item>
                <el-form-item prop="repassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码"
                        v-model="formData.repassword"></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register(formData)">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false; clearData()">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="formData" :rules="rules">
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="formData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                        v-model="formData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login(formData)">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true; clearData()">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>

    <el-alert title="success alert" type="success" effect="dark" />
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