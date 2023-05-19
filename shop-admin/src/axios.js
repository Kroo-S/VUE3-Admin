import axios from "axios";

//element中的通知组件
//错误提示全部放在拦截器中
// import { ElNotification } from 'element-plus'    
// 消息提示就从util中导入，不从elementplus中导入
import { toast } from '~/composables/util'  



// //引入vueuse中的cookie方法
// import { useCookies } from '@vueuse/integrations/useCookies'
//引入auth.js中的getToken方法
import { getToken } from '~/composables/auth'



// 配置baseURL
const service = axios.create({
    baseURL: '/api',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});


// axios拦截器
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    // 往header头自动添加token
    const token = getToken()
    if (token) {
        config.headers["token"] = token
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data.data;
}, function (error) {
    // 对响应错误做点什么

    // .catch的内容,错误统一放在响应拦截器中
    //element中的弹窗组件  提示错误
    // ElNotification({
    //     title: '错误提示',
    //     message: error.response.data.msg || '请求错误',
    //     type: 'error',
    //     //弹窗持续时间
    //     duration: 3000
    // })

    //错误提示全部封装到toast中
    toast(
        error.response.data.msg || '请求错误',
        'error'
    )



    return Promise.reject(error);
});




//记得导出
export default service