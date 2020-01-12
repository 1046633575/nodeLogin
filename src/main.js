import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)

const http = Axios.create({
  baseURL: 'http://localhost:3001/'
})

//拦截所有请求给header加上token信息
http.interceptors.request.use(function (config) {
  if(sessionStorage.token) {
    config.headers.Authorization = sessionStorage.token
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

//拦截所有服务端返回的错误并显示
http.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    
    if(err.response.status === 401) {
      router.push('/login')
    }
  }
})

Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')