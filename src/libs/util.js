import { forEach, hasOneOf, objEqual } from '@/libs/tools'
import Cookies from 'js-cookie'
const useI18n = true
/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
  localStorage.basicTagNaveList = JSON.stringify(list)
}
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = localStorage.basicTagNaveList
  return list ? JSON.parse(list) : []
}

export const getRouteTitleHandled = route => {
  const router = { ...route }
  const meta = { ...route.meta }
  let title = ''
  if (meta.title) {
    if (typeof meta.title === 'function') {
      meta.__titleIsFunction__ = true
      title = meta.title(router)
    } else title = meta.title
  }
  meta.title = title
  router.meta = meta
  return router
}

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
  const len = tagNavList.length
  let res = false
  doCustomTimes(len, index => {
    if (routeEqual(tagNavList[index], routeItem)) res = true
  })
  return res
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return (
    route1.name === route2.name &&
    objEqual(params1, params2) &&
    objEqual(query1, query2)
  )
}

export const showTitle = (item, vm) => {
  const { showName } = item.meta
  // if (!showName) return
  // if (useI18n) {
  //   if (showName.includes('{{') && showName.includes('}}') && useI18n)
  //     showName = showName.replace(/({{[\s\S]+?}})/, (m, str) =>
  //       str.replace(/{{([\s\S]*)}}/, (m, _) => vm.$t(_.trim()))
  //     )
  //   else if (__titleIsFunction__) showName = item.meta.showName
  //   else showName = vm.$t(item.name)
  // } else showName = (item.meta && item.meta.showName) || item.name
  return showName
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
  let res = {}
  // if (list.length === 2) {
  //   res = getHomeRoute(list)
  // } else {
  const index = list.findIndex(item => routeEqual(item, route))
  if (index === list.length - 1) res = list[list.length - 2]
  else res = list[index + 1]
  return res
}

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = (routers, homeName = 'home') => {
  let i = -1
  const len = routers.length
  let homeRoute = {}
  while (++i < len) {
    const item = routers[i]
    if (item.children && item.children.length) {
      const res = getHomeRoute(item.children, homeName)
      if (res.name) return res
    } else {
      if (item.name === homeName) homeRoute = item
    }
  }
  return homeRoute
}

export function getToken(key) {
  return Cookies.get(key)
}

export function setToken(key, token) {
  return Cookies.set(key, token)
}

export function removeToken(key) {
  return Cookies.remove(key)
}
