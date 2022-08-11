// 配置引入
import axios from 'axios'
import store from '@/store'
// 配置根路径
axios.defaults.baseURL = 'http://interview-api-t.itheima.net/'
axios.defaults.timeout = 5000
// 请求拦截器
axios.interceptors.request.use(config => {
// Do something before request is sent
config.headers.Authorization = store.state.user.token
return config;
},error => {
// Do something with request error
return Promise.reject(error);
});
// 响应拦截器
axios.interceptors.response.use(response => {
// Do something before response is sent
return response;
},error => {
// Do something with response error
return Promise.reject(error);
});






// 导出
export default axios