import axios from "axios";
import router from "@/router";
const request = axios.create({
    baseURL: 'http://localhost:9090',
    timeout: 5000
})


request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    const admin=localStorage.getItem("admin")
    if(!admin){
        router.push("/login")
    }
    return config
}, error => {
    return Promise.reject(error)
});


request.interceptors.response.use(
    response => {
        let res = response.data;
        // 兼容服务器字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        console.log('err' + error)
        return Promise.reject(error)
    }
)

export default request