import { createRouter, createWebHashHistory } from 'vue-router'


// 引入index.vue 路由页面
import Index from "~/pages/index.vue"
import Login from "~/pages/login.vue"
import NotFound from "~/pages/404.vue"


const routes = [
    {
        path: "/",
        component: Index,
        meta:{
            title:"后台首页"
        }
    },
    {
        path: "/login",
        component: Login,
        meta:{
            title:"登陆页"
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
]


const router = createRouter({

    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})


export default router