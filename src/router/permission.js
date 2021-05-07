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
      console.log(777)
      const userMenus = JSON.parse(localStorage.getItem('routesInfo'))
      console.log(userMenus)
      store.commit('SET_MEUNED')
      if (!Vue.prototype.$_.isEmpty(userMenus)) {
        const accessRoutes = getAsyncRoutes(userMenus)
        layoutRoute.push(...accessRoutes)
        console.log(layoutRoute)
        router.options.routes = [...router.options.routes, ...layoutRoute]
        router.addRoutes(layoutRoute)
        console.log(layoutRoute)
        store.commit('setRouteList', router.options.routes)
      }
      next({ ...to, replace: true })
    } else {
      next()
    }
    // if (to.path === '/home') {
    //   next()
    // } else {
    //   const menuSetted = store.state.menuSetted
    //   console.log(menuSetted)
    //   if (!menuSetted) {
    //     console.log(666)
    //     const userMenus = JSON.parse(localStorage.getItem('routesInfo'))
    //     console.log(userMenus)
    //     store.commit('SET_MEUNED')
    //     const accessRoutes = getAsyncRoutes(userMenus)
    //     console.log(accessRoutes)
    //     router.options.routes = [...router.options.routes, ...accessRoutes]
    //     router.addRoute(accessRoutes)
    //     // store.commit('setRouteList', router.options.routes)
    //     next({ ...to, replace: true })
    //   } else {
    //     next()
    //   }
    // }
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
