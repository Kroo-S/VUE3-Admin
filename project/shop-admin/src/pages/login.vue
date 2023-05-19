<template>
    <el-row class="login-container">
        <el-col :lg="16" :md="12" class="left">
            <div>
                <div>欢迎光临</div>
                <div>此站点是《vue3 + vite实战商城后台开发》视频课程的演示地址</div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="right">
            <h2 class="title">欢迎回来</h2>
            <div>
                <span class="line"></span>
                <span>账号密码登录</span>
                <span class="line"></span>
            </div>
            <el-form :model="form" class="w-[250px]" :rules="rules" ref="formRef">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon>
                                <user />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" placeholder="请输入密码" type="password">
                        <template #prefix>
                            <el-icon>
                                <lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button round color="#626aef" class="w-[250px]" type="primary" @click="onSubmit"
                        :loading="loading">登 录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'

// import { login } from '~/api/manager'   login放到action中去了

// element中的通知组件
// import { ElNotification } from 'element-plus'
// 消息组件从util中导入
import { toast } from '~/composables/util'

//引入useRouter
import { useRouter } from 'vue-router'

// // 引入vueues，使用其中的cookie方法
// import { useCookies } from '@vueuse/integrations/useCookies'
//封装方法后，直接引入
// import { setToken } from '~/composables/auth'

//引入状态管理的store
import { useStore } from 'vuex'

const router = useRouter()

const store = useStore()

// do not use same name with ref
const form = reactive({
    username: "",
    password: "",
});

// 表单验证规则
const rules = {
    username: [
        {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
        },
    ],
    password: [
        {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
        },
    ]
}

//模版引用，变成响应式的
const formRef = ref(null)

//定义loading的值等于false
const loading = ref(false)


const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return flase
        }

        //请求前让设置loading=true
        loading.value = true


        //登陆从vuex的action中调用
        store.dispatch("login", form).then(res => {
            toast("登陆成功")
            router.push("/")
        }).finally(() => {
            loading.value = false
        })

        // login(form.username, form.password).then(res => {

        //         //请求成功部分  
        //         console.log(res)

        //         // // 1. 提示登陆成功
        //         // ElNotification({
        //         //     message: '登陆成功',
        //         //     type: 'success',
        //         //     //弹窗持续时间
        //         //     duration: 3000
        //         // })
        //         // 此处登陆成功的消息提示，从toast中导入    
        //         toast("登陆成功")





        //         // 2. 存储token和用户相关信息
        //        setToken(res.token)


        //         // // 获取用户相关信息   放到store/index.js状态管理中去了
        //         // getinfo().then(res2 => {
        //         //     // commit触发mutation
        //         //     store.commit("SET_USERINFO",res2)
        //         //     console.log(res2);
        //         // })

        //         // 跳转到后台首页
        //         router.push("/")

        //     })
        //     // .catch(err => {

        //     //    这里的错误放进了axios的响应拦截
        //     // })
        //     .finally(() => {  //最后状态回归
        //         loading.value = false
        //     })

    })
};

// 监听回车事件
function onKeyUp(e) {
    if (e.key == "Enter") onSubmit()
}

// 添加键盘监听     页面加载前
onMounted(() => {
    document.addEventListener("keyup", onKeyUp)
})
// 移除键盘监听     页面移除后
onBeforeUnmount(() => {
    document.removeEventListener("keyup", onKeyUp)
})


</script>

<style scoped>
.login-container {
    @apply min-h-screen bg-indigo-500;
}

.login-container .left,
.login-container .right {
    @apply flex items-center justify-center;
}

.login-container .right {
    @apply bg-light-50 flex-col;
}

.left>div>div:first-child {
    @apply font-bold text-5xl text-light-50 mb-4;
}

.left>div>div:last-child {
    @apply text-gray-200 text-sm;
}

.right .title {
    @apply font-bold text-3xl text-gray-800;
}

.right>div {
    @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.right .line {
    @apply h-[1px] w-16 bg-gray-200;
}

</style>