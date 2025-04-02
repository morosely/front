//导入请求工具request.js
import request from '@/utils/request.js'

//导入token状态
import { useTokenStore } from '@/stores/token.js'

// //文章分类列表查询
// export const articleCategoryListService = ()=>{
//     return request.get('/category')
// }

// //文章分类列表查询
// export const articleCategoryListService = () => {
//     //获取token状态
//     const tokenStore = useTokenStore()
//     //通过请求头Authorization携带token
//     return request.get('/category', { headers: { 'Authorization': tokenStore.token } })
// }

//文章分类列表查询:当进入主页后，将来要与后台交互，都需要携带token，如果每次请求都写这样的代码，将会比较繁琐，此时可以将携带token的代码通过请求拦截器统一处理
export const articleCategoryListService = () => {
    //通过请求头Authorization携带token
    return request.get('/category')
}

//添加文章分类
export const articleCategoryAddService = (categoryModel) => {
    return request.post('/category', categoryModel)
}

//修改分类
export const articleCategoryUpdateService = (categoryModel)=>{
    return request.put('/category',categoryModel)
}

//删除分类
export const articleCategoryDeleteService = (id) => {
    return request.delete('/category?id='+id)
}