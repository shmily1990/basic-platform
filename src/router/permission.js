//  进度条引入设置如上面第一种描述一样
import router, { layoutRoute } from './index'
import Vue from 'vue'
import store from '../store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/libs/util'
import { getAsyncRoutes } from './asyncRouter'

const whiteList = ['/home', '/login']
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const token = getToken('UserInfo')
  if (token) {
    const menuSetted = store.state.menuSetted
    if (!menuSetted) {
      const userMenus = JSON.parse(localStorage.getItem('routesInfo'))
      store.commit('SET_MEUNED')
      if (!Vue.prototype.$_.isEmpty(userMenus)) {
        const accessRoutes = getAsyncRoutes(userMenus)
        layoutRoute.push(...accessRoutes)
        router.options.routes = [...router.options.routes, ...layoutRoute]
        router.addRoutes(layoutRoute)
        store.commit('setRouteList', router.options.routes)
      }
      next({ ...to, replace: true })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
