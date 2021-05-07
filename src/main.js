import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd, { message } from 'ant-design-vue'
import _ from 'lodash'
import './router/permission'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.prototype.$_ = _

Vue.use(Antd)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')