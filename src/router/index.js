import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicLayout from '../layOuts/BasicLayout'
import store from '../store'
import { getAsyncRoutes } from './asyncRouter'

Vue.use(VueRouter)

export let layoutRoute = []
export const constantRoutes = [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('@/views/login')
  // },
  {
    path: '/',
    component: BasicLayout,
    name: 'home',
    meta: {
      authCode: '',
      authName: '首页',
      needAuth: true,
      showName: '首页'
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/home')
      }
    ]
  },
  {
    path: '/singlePage',
    component: BasicLayout,
    name: 'singlePage',
    meta: {
      authCode: '',
      authName: '单页',
      needAuth: true,
      showName: '单页'
    },
    redirect: '/singlePage',
    children: [
      {
        path: '/singlePage',
        name: 'singlePage',
        component: () =>
          import(/* webpackChunkName: "singPage" */ '../views/single-page')
      }
    ]
  },
  ...layoutRoute
]

const createRouter = () =>
  new VueRouter({
    base: process.env.BASE_URL,
    routes: constantRoutes
  })
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
  router.options.routes = [router.options.routes[0], router.options.routes[1]]
  layoutRoute = []
}

export function resetNewRoute() {
  const userMenus = JSON.parse(localStorage.getItem('routesInfo'))
  store.commit('SET_MEUNED')
  if (!Vue.prototype.$_.isEmpty(userMenus)) {
    console.log(666)
    const accessRoutes = getAsyncRoutes(userMenus)
    layoutRoute.push(...accessRoutes)
    router.options.routes = [...router.options.routes, ...layoutRoute]
    // console.log(router.options.routes)
    store.commit('setRouteList', router.options.routes)
    console.log(store.state.routeList)
    console.log(layoutRoute)
    router.addRoutes(layoutRoute)
  }
}

export default router
