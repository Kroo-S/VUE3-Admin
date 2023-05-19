<template>
    <div>
        后台首页
        <!-- <el-button @click="set">设置</el-button>
        <el-button @click="get">读取</el-button>
        <el-button @click="remove">删除</el-button> -->
    </div>

    {{ $store.state.user.username }}

    <el-button @click="handleLogout">退出登陆</el-button>

</template>

<script setup>

// import { useCookies } from '@vueuse/integrations/useCookies'
// const cookie = useCookies()

// console.log(cookie)

// function set(){
//     cookie.set("admin-token","123456")
// }
// function get(){
//     console.log(cookie.get("admin-token"))
// }
// function remove(){
//     cookie.remove("admin-token")
// }

// 引入消息提示框

import { showModal, toast } from "~/composables/util"
import { logout } from "~/api/manager"
import { useRouter } from "vue-router"
import { useStore } from "vuex";


const router = useRouter()
const store = useStore()


//退出登陆
function handleLogout() {
    showModal("是否要退出登陆？").then(res => {
        //不管成功失败，都是一样的，所以用finally
        logout().finally(() => {
            // 移除cookie中的token

            //清楚当前用户状态vuex

            //action触发mutation
            store.dispatch("logout")

            //跳转回登陆页面
            router.push("/login")
            //提示退出登陆成功
            toast("退出登陆成功")

        })
    })
}

</script>