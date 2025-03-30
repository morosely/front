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

//添加响应拦截器
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
        alert('服务异常');
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)



export default instance;

// axios.post('http://localhost:8080/article/add',article).then(result => {
//     //成功的回调
//     //result代表服务器响应的所有的数据,包含了响应头,响应体. result.data 代表的是接口响应的核心数据
//     console.log(result.data);
// }).catch(err => {
//     //失败的回调
//     console.log(err);
// });