import axios from "axios";
import router from "@/router";
const request = axios.create({
    baseURL: 'http://localhost:9090/api',
    timeout: 10000
})


request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    const adminJson = localStorage.getItem("admin")
    if (adminJson) {
        config.headers['token'] = JSON.parse(adminJson).token
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


        if (res.code === "401") {
            router.push("/login")
        }

        return res;
    },
    error => {
        console.log('err' + error)
        return Promise.reject(error)
    }
)

export default request