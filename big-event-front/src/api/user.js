//导入request.js请求工具
import request from '@/utils/request.js'

//提供调用注册接口的函数
//请求参数格式：x-www-form-urlencoded 请求数据样例：username=zhangsan&password=123456
export const userRegService = (regData)=>{
    console.info("regData:" + regData)
    const params = new URLSearchParams();
    for(let key in regData){
        params.append(key,regData[key]);
    }
    console.info("/user/register ===> params:" + params)
    return request.post("/user/register",params);
}

//提供登陆接口的函数
export const loginService = (loginData)=>{
    console.info("loginData:" + loginData)
    const params = new URLSearchParams();
    for(let key in loginData){
        params.append(key,loginData[key]);
    }
    console.info("/user/login ===> params:" + params)
    return request.post("/user/login",params);
}

//获取个人信息
export const userInfoGetService = ()=>{
    return request.get('/user/userInfo');
}

//修改个人信息
export const userInfoUpdateService = (userInfo)=>{
    return request.put('/user/update',userInfo)
}

//修改头像
export const userAvatarUpdateService=(avatarUrl)=>{
    let params = new URLSearchParams();
    params.append('avatarUrl',avatarUrl)
    return request.patch('/user/updateAvatar',params)
}