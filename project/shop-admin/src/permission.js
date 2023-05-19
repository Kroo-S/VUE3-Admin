// 权限验证相关内容

// 路由导航守卫

//router引入
import router from '~/router'
// 引入token信息、element中的消息提示toast
import { getToken } from '~/composables/auth'
import {
    toast,
    showFullLoading,
    hideFullLoading
} from '~/composables/util'

// 引入store
import store from './store'

// 全局前置守卫
router.beforeEach(async (to, from, next) => {     //写了next参数，后面要使用next()方法

    // 显示loading
    showFullLoading()

    // 拿下token，看存不存在
    const token = getToken()

    // 没有token表示没有登陆，强制跳转到login页面
    if (!token && to.path != "/login") {
        toast('请先登陆', 'error')
        // return是为了只执行一次函数，不然页面会一直跳转; return不仅可以返回值，还可以结束函数执行
        return next({ path: '/login' })
    }

    // 防止重复登陆    如果有用户登陆之后，又进入登陆页
    if (token && to.path == '/login') {
        toast('请勿重复登陆', 'error')
        //哪里来回哪去，或者首页
        return next({ path: from.path ? from.path : '/' })
    }

    // 如果用户登陆了，自动获取用户信息，并存储在vuex中
    if (token) {
        await store.dispatch("getinfo")
    }

    // 设置页面标题
    let title = (to.meta.title?to.meta.title:"")+"--后台管理系统"
    document.title = title

    next()

})

//全局后置守卫    放置清除Loading
router.afterEach((to, from) => {
    hideFullLoading()
  })