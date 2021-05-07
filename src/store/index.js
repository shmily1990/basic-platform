import {
  setTagNavListInLocalstorage,
  getTagNavListFromLocalstorage,
  getRouteTitleHandled,
  getNextRoute,
  routeHasExist,
  routeEqual,
  removeToken,
  setToken
} from '@/libs/util'
import { loginInfo } from '../mock/userInfo'
import Vue from 'vue'
import router, { resetRouter, resetNewRoute } from '@/router'
import Vuex from 'vuex'
import { reject } from 'q'
import { message } from 'ant-design-vue'
Vue.use(Vuex)

const closePage = (state, route, flg) => {
  const arr = JSON.parse(JSON.stringify(state.tagNavList))
  const nextRoute = getNextRoute(arr, route)
  state.tagNavList = state.tagNavList.filter(item => {
    return item.name !== route.name
  })
  flg && router.push({ name: nextRoute.name })
}
export default new Vuex.Store({
  state: {
    // 全屏开关
    isFullscreen: false,
    // 标签菜单
    tagNavList: [],
    // tagNav开关
    showTagNavBar: true,
    userInfo: null,
    // 菜单设置
    menuSetted: false,
    // 路由列表
    routeList: null
  },
  getters: {
    isVisitor: state => {
      if (state.userInfo == null) {
        return true
      }

      if (Object.keys(state.userInfo).length == 0) {
        return true
      }

      return false
    }
  },
  mutations: {
    SET_MEUNED(state) {
      state.menuSetted = true
    },
    setUserInfo(state, data) {
      console.log(data)
      state.userInfo = data
    },
    setRouteList(state, data) {
      state.routeList = data
    },
    // 设置全屏
    setScreen(state, value) {
      state.isFullscreen = value
    },
    setTagNavStatus(state, value) {
      state.showTagNavBar = value
    },
    setTagNavList(state, list) {
      let tagList = []
      if (list) {
        tagList = [...list]
      } else tagList = getTagNavListFromLocalstorage() || []
      state.tagNavList = tagList
      setTagNavListInLocalstorage([...tagList])
    },
    addTag(state, { route, type = 'unshift' }) {
      const router = getRouteTitleHandled(route)
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router)
        else {
          state.tagNavList.splice(1, 0, router)
          // if (router.name === homeName) state.tagNavList.unshift(router)
          // else state.tagNavList.splice(1, 0, router)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      } else {
        console.log(666)
      }
    },
    closeTag(state, obj) {
      let { route, flg } = obj
      const tag = state.tagNavList.filter(item => item.name === route.name)
      route = tag[0] ? tag[0] : null
      if (!route) return
      closePage(state, route, flg)
    }
  },
  actions: {
    // 退出登录
    loginOut({ commit, state, dispatch }, message = '您已回到游客模式') {
      return new Promise((resolve, reject) => {
        if (!state.userInfo) return false
        removeToken('UserInfo')
        commit('setUserInfo', null)
        commit('setRouteList', null)
        Vue.prototype.$message.success(message, 1, async () => {
          localStorage.removeItem('routesInfo')
          resetRouter()
          resolve()
        })
      })
    },
    // 登录
    handleLogin({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        // 接口mock
        setTimeout(() => {
          const userInfo = {
            username,
            userId: '123456',
            remarkName: '测试人员',
            sinm: 'Bearer' + ' ' + '74185adsf9344555ff'
          }
          if (username == 'admin') {
            userInfo.remarkName = '管理员'
          }
          setToken('UserInfo', userInfo)
          commit('setUserInfo', userInfo)
          resolve()
        }, 1000)
      })
    },
    getRouterInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // 接口mock
        setTimeout(() => {
          console.log(loginInfo())
          localStorage.setItem('routesInfo', JSON.stringify(loginInfo()))
          commit('SET_MEUNED')
          console.log(state.menuSetted)
          resolve()
        }, 1)
      })
    }
  },
  modules: {}
})
