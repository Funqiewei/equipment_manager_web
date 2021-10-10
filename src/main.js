import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入样式表
import './assets/css/global.css'
import axios from 'axios'

//配置请求根路径
// axios.defaults.baseURL = 'http://47.96.116.218:8889/api/private/v1/'
axios.defaults.withCredentials=true;
axios.interceptors.request.use(config=>{
  //console.log(config)
  config.headers.Authorization=window.sessionStorage.getItem('token')
  return config
})

Vue.prototype.$http=axios
Vue.use(ElementUI);
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
