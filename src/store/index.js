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
import { loginInfo, branchInfo } from '../mock/userInfo'
import Vue from 'vue'
import router, { resetRouter, resetNewRoute } from '@/router'
import Vuex from 'vuex'
import $http from '../plugins/request'
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
        }
        setTagNavListInLocalstorage([...state.tagNavList])
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
    // 切换分支
    async changeBranchs({ commit, state, dispatch }, message = '切换分支') {
      return new Promise((resolve, reject) => {
        if (!state.userInfo) return false
        commit('setRouteList', null)
        // 请除标签缓存
        setTagNavListInLocalstorage([])
        commit('setTagNavList', [])
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
        const params = {
          userName: username,
          pwd: password
        }
        $http
          .post('signIn', params, {
            isMock: false,
            transformData: false,
            type: 'form'
          })
          .then(({ code, data, message }) => {
            if (code == 0) {
              const userInfo = { ...data, sinm: data.token }
              setToken('UserInfo', userInfo)
              commit('setUserInfo', userInfo)
              resolve(data)
            } else {
              reject(message)
            }
          })
          .catch(error => {
            console.log(error)
            reject(error.message)
          })
      })
    },
    getRouterInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // 接口mock
        setTimeout(() => {
          localStorage.setItem('routesInfo', JSON.stringify(loginInfo()))
          commit('SET_MEUNED')
          resolve()
        }, 1)
      })
    },
    getRouterInfo2({ commit, state }) {
      return new Promise((resolve, reject) => {
        // 接口mock
        setTimeout(() => {
          localStorage.setItem('routesInfo', JSON.stringify(branchInfo()))
          commit('SET_MEUNED')
          resolve()
        }, 1)
      })
    }
  },
  modules: {}
})
