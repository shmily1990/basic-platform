import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from '@/components/echarts'
import Antd, { message } from 'ant-design-vue'
import $http from '@/plugins/request'
import moment from 'moment'
import _ from 'lodash'
import './router/permission'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.prototype.$_ = _
Vue.prototype.$moment = moment
Vue.prototype.$http = $http
Vue.prototype.$EventBus = new Vue()
Vue.prototype.$message = message
Vue.component('echarts', echarts)

Vue.use(Antd)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
