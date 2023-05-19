//Vuex 状态管理

// 引入Vuex
import { createStore } from 'vuex'

//引入getinfo
import { login, getinfo } from '~/api/manager'

// 引入setToken
import { setToken, removeToken } from '~/composables/auth'


// 创建一个新的 store 实例
const store = createStore({
    
    state() {
        return {

            //用户信息
            user: {}

        }
    },

    mutations: {

        // 记录用户信息
        SET_USERINFO(state, user) {
            state.user = user
        }

    },

    actions: {    //异步函数

        // 登陆
        login({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                login(username, password).then(res => {
                    setToken(res.token)

                    resolve(res)
                }).catch(err => reject(err))
            })
        },

        // 获取当前登陆用户信息
        getinfo({ commit }) {
            return new Promise((resolve, reject) => {
                // 获取用户相关信息
                getinfo().then(res => {
                    // commit触发mutation
                    commit("SET_USERINFO", res)
                    //console.log(res);
                    resolve(res) //成功调用resolve
                }).catch(err => reject(err))    //失败调用reject
            })
        },

        //退出登陆
        logout({ commit }) {

            // 移除cookie中的token
            removeToken()

            //清除当前用户状态vuex
            commit("SET_USERINFO", {})

        }
    }

})

export default store