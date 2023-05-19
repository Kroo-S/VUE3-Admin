import axios from '~/axios'    //获得的是自定义实例

export function login(username, password) {
    return axios.post('/admin/login', {
        username,
        password
    })
}

export function getinfo() {
    return axios.post("/admin/getinfo")
}

export function logout() {
    return axios.post("/admin/logout")
}
