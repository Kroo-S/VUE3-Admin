// 封装的cookie方法

import { useCookies } from '@vueuse/integrations/useCookies'
const TokenKey = "admin-token"
const cookie = useCookies()


//获取cookie
export function getToken(){
    return cookie.get(TokenKey)
}

//设置cookie
export function setToken(token){
    return cookie.set(TokenKey,token)
}

//删除cookie
export function removeToken(){
    return cookie.remove(TokenKey)
}