import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicLayout from '../layOuts/BasicLayout'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import ModelLayout from '../layOuts/ModelLayout'
import Main from '@/components/main'
import { getToken } from '@/libs/util'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: BasicLayout,
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
    path: '/devOps',
    name: 'devOps',
    component: () => import('../layOuts/Layout'),
    meta: {
      authName: '运维',
      showName: '运维',
      authCode: '',
      needAuth: true
    },
    redirect: { name: 'devOpsAnalysis' },
    children: [
      {
        path: 'devOpsAnalysis',
        name: 'devOpsAnalysis',
        component: () => import('@/views/devOps/devOpsAnalysis'),
        meta: {
          authName: '运维分析1',
          showName: '运维分析1',
          authCode: '',
          needAuth: true,
          icon: 'user'
        }
      },
      {
        path: 'devOpsAnalysis2',
        name: 'devOpsAnalysis2',
        component: () => import('@/views/devOps/devOpsAnalysis2'),
        meta: {
          authName: '运维分析2',
          showName: '运维分析2',
          authCode: '',
          needAuth: true,
          icon: 'user'
        }
      },
      {
        path: 'devOpsAnalysis3',
        name: 'devOpsAnalysis3',
        component: () => import('@/views/devOps/devOpsAnalysis3'),
        meta: {
          authName: '运维分析3',
          showName: '运维分析3',
          authCode: '',
          needAuth: true,
          icon: 'user',
          subMenu: true
        },
        redirect: { name: 'devOpsAnalysis3-01' },
        children: [
          {
            path: 'devOpsAnalysis3-01',
            name: 'devOpsAnalysis3-01',
            component: () =>
              import('@/views/devOps/devOpsAnalysis3/devOpsAnalysis301'),
            meta: {
              authName: '运维分析3-01',
              showName: '运维分析3-01',
              authCode: '',
              needAuth: true
            }
          },
          {
            path: 'devOpsAnalysis3-02',
            name: 'devOpsAnalysis3-02',
            component: () =>
              import('@/views/devOps/devOpsAnalysis3/devOpsAnalysis302'),
            meta: {
              authName: '运维分析3-02',
              showName: '运维分析3-02',
              authCode: '',
              needAuth: true
            }
          }
        ]
      },
      {
        path: 'devOpsAnalysis4',
        name: 'devOpsAnalysis4',
        component: () => import('@/views/devOps/devOpsAnalysis4'),
        meta: {
          authName: '运维分析4',
          showName: '运维分析4',
          authCode: '',
          needAuth: true,
          icon: 'user'
        }
      },
      {
        path: 'devOpsAnalysis5',
        name: 'devOpsAnalysis5',
        component: () => import('@/views/devOps/devOpsAnalysis5'),
        meta: {
          authName: '运维分析5',
          showName: '运维分析5',
          authCode: '',
          needAuth: true,
          icon: 'user',
          subMenu: true
        },
        redirect: { name: 'devOpsAnalysis5-01' },
        children: [
          {
            path: 'devOpsAnalysis5-01',
            name: 'devOpsAnalysis5-01',
            component: () =>
              import('@/views/devOps/devOpsAnalysis5/devOpsAnalysis501'),
            meta: {
              authName: '运维分析5-01',
              showName: '运维分析5-01',
              authCode: '',
              needAuth: true
            }
          },
          {
            path: 'devOpsAnalysis5-02',
            name: 'devOpsAnalysis5-02',
            component: () =>
              import('@/views/devOps/devOpsAnalysis5/devOpsAnalysis502'),
            meta: {
              authName: '运维分析5-02',
              showName: '运维分析5-02',
              authCode: '',
              needAuth: true
            }
          }
        ]
      }
    ]
  },
  {
    path: '/quality',
    name: 'quality',
    meta: {
      authName: '质控',
      showName: '质控',
      authCode: '',
      needAuth: true
    },
    component: () => import('@/views/quality'),
    redirect: { name: 'dataCenter' },
    children: [
      {
        path: 'dataCenter',
        name: 'dataCenter',
        meta: {
          authName: '数据中心',
          showName: '数据中心',
          authCode: '',
          needAuth: true,
          icon: 'user',
          subMenu: true
        },
        component: () => import('@/views/quality/dataCenter'),
        redirect: { name: 'dataSearch' },
        children: [
          {
            path: 'dataSearch',
            name: 'dataSearch',
            component: () => import('@/views/quality/dataCenter/dataSearch'),
            meta: {
              authName: '数据查询',
              showName: '数据查询',
              authCode: '',
              needAuth: true
            }
          },
          {
            path: 'freliminary-review',
            name: 'freliminary-review',
            component: () =>
              import('@/views/quality/dataCenter/freliminaryReview'),
            meta: {
              authName: '数据初审',
              showName: '数据初审',
              authCode: '',
              needAuth: true
            }
          }
        ]
      }
    ]
  }
]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  // next()
  const token = getToken('UserInfo')
  // console.log(token)
  if (token) {
    next()
  } else {
    if (to.path !== '/home') {
      console.log(666)
      next({ path: '/' })
    } else {
      next()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
