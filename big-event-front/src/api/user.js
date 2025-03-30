//导入请求工具request.js
import request from '@/utils/request.js'

//用户注册
export const registerService = (registerData) => {
    //registerData是个json对象,借助URLSearchParams完成传递
    var urlSearchParams = new URLSearchParams();
    for(let key in registerData){
        console.info(key + ' ----->>> ' + registerData[key]);
        urlSearchParams.append(key,registerData[key]);
    }
    console.info("/user/register =====> params:" + urlSearchParams)
    return request.post('/user/register',urlSearchParams);
} 

//用户登陆
export const loginService = (registerData) => {
    var urlSearchParams = new URLSearchParams();
    for(let key in registerData){
        console.info(key + ' ----->>> ' + registerData[key]);
        urlSearchParams.append(key,registerData[key]);
    }
    console.info("/user/login =====> params:" + urlSearchParams)
    return request.post('/user/login',urlSearchParams);
}