// //导入axios  npm install axios
// import axios from 'axios';
// //定义一个变量,记录公共的前缀  ,  baseURL
// const baseURL = 'http://localhost:8080';
// const instance = axios.create({baseURL}) 

import request from '@/util/request.js'

// export async function articleGetAllService() {
//    return await instance.get('article/getAll')
//     .then(result=>{
//         //把服务器相应的数据保存起来
//         articlelist.value = result.data;
//     }).catch(err=>{
//         console.log(err);
//     });
// }

export function articleGetAllService() {
    return request.get('/article/getAll');
}

// export async function articleSearchService(conditions) {
//     return await instance.get('article/search', {params:conditions})
//         .then(result => {
//             articleList.value = result.data
//         }).catch(err => {
//             console.log(err);
//         });
// }

export function articleSearchService(conditions) {
    return request.get('/article/search', { params: conditions });
}