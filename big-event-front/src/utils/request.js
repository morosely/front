//定制请求的实例
//导入axios  npm install axios
import axios from 'axios';
import { ElMessage } from 'element-plus';


//定义一个变量,记录公共的前缀  ,  baseURL
//const baseURL = 'http://localhost:8080';
const baseURL = '/api'
const instance = axios.create({ baseURL })

//添加响应拦截器
// instance.interceptors.response.use(
//     result => {
//         return result.data;
//     },
//     err => {
//         alert('服务异常');
//         return Promise.reject(err);//异步的状态转化成失败的状态
//     }
// )

//添加响应response拦截器
import router from '@/router'
instance.interceptors.response.use(
    result => {
        //判断业务状态码。业务代码为0，操作成功
        if (result.data.code === 0) {
            return result.data;
        }
        //业务代码不为0，操作失败(统一处理失败)
        //alert('服务异常:' + result.data.message);
        ElMessage.error(result.data.message ? result.data.message : '接口异常');
        return Promise.reject(result.data);//异步的状态转化成失败的状态
    },
    err => {
        //未登录统一处理：如果响应状态码时401，代表未登录，给出对应的提示，并跳转到登录页
        if(err.response.status===401){
            ElMessage.error('请先登录！')
            router.push('/login')
        }else{
            ElMessage.error('服务异常');
        }
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

// axios.post('http://localhost:8080/article/add',article).then(result => {
//     //成功的回调
//     //result代表服务器响应的所有的数据,包含了响应头,响应体. result.data 代表的是接口响应的核心数据
//     console.log(result.data);
// }).catch(err => {
//     //失败的回调
//     console.log(err);
// });

//导入token状态
import { useTokenStore } from '@/stores/token.js';
//添加请求request拦截器:当进入主页后，将来要与后台交互，都需要携带token，如果每次请求都写这样的代码，将会比较繁琐，此时可以将携带token的代码通过请求拦截器统一处理
instance.interceptors.request.use(
    (config)=>{
        //在发送请求之前做什么
        let tokenStore = useTokenStore()
        //如果token中有值，在携带
        if(tokenStore.token){
            config.headers.Authorization = tokenStore.token
        }
        return config
    },
    (err)=>{
        //如果请求错误做什么
        Promise.reject(err)
    }
)

export default instance;