// import store from '../store'
// import { getToken } from '@/libs/utils'
// import $http from '@/plugins/request'

class Map {
  map = null
  layer = {}
  ruler = null
  windy = {
    ins: null,
    canvasOverlayVector: null,
    customLayer: null
  }

  init(dom, options) {
    return AMapLoader.load({
      key: '4a7a02002feefb65209aeeb7b7fa29df', // 首次调用load必须填写key
      version: '1.4.15', // JSAPI 版本号
      plugins: [
        'Map3D',
        'AMap.RangingTool',
        'AMap.Geocoder',
        'AMap.CitySearch',
        'AMap.ControlBar',
        'AMap.Weather'
      ] // 同步加载的插件列表
    })
      .then(async () => {
        this.map = new AMap.Map(dom, options)
        // const tileLayer = new AMap.TileLayer({
        //   rejectMapMask: true
        // })
        // this.map.add([tileLayer])
        // await this.initPlugins()
        return Promise.resolve()
      })
      .catch(e => {
        console.error(e) // 加载错误提示
      })
    return 123
  }

  //   async initPlugins() {
  //     // this.backDefaultCity()
  //     await this.ipPosition()
  //     this.addControlBar()
  //     // this.measure()
  //   }

  //   // 打开图层
  //   openLayer(name, layInstance) {
  //     this.layer[name] = layInstance
  //     this.layer[name].setMap(this.map)
  //   }

  //   haveLayer(name) {
  //     return this.layer.hasOwnProperty(name) && this.layer[name] != null
  //   }

  //   // 关闭图层
  //   closeLayer(name) {
  //     if (this.layer[name]) {
  //       this.layer[name].setMap(null)
  //       this.layer[name] = null
  //     }
  //   }

  //   addControlBar() {
  //     this.map.addControl(
  //       new AMap.ControlBar({
  //         position: {
  //           top: '50px',
  //           right: '14px'
  //         },
  //         showZoomBar: false
  //       })
  //     )
  //   }

  //   ipPosition() {
  //     return new Promise(resolve => {
  //       const userInfo = getToken('UserInfo')
  //       if (!userInfo) {
  //         const citySearch = new AMap.CitySearch()
  //         citySearch.getLocalCity(function(status, result) {
  //           if (status === 'complete' && result.info === 'OK') {
  //             // 查询成功，result即为当前所在城市信息
  //             store.commit('setCurrentCity', {
  //               cityName: result.city,
  //               cityCode: result.adcode
  //             })
  //             store.commit('setDefaultCity', {
  //               cityName: result.city,
  //               cityCode: result.adcode
  //             })
  //           }
  //           return resolve()
  //         })
  //       } else {
  //         return resolve()
  //       }
  //     })
  //   }

  // 清楚地图上所有覆盖物
  //   clearMap() {
  //     if (this.map) {
  //       this.map.clearMap()
  //       if (Object.keys(this.layer).length) {
  //         for (const [_, v] of Object.entries(this.layer)) {
  //           v && v.clearOverlays()
  //         }
  //         this.layer = {}
  //       }
  //     }
  //   }

  //   // 回到当前城市
  //   backDefaultCity() {
  //     if (!store.state.defaultCity) return
  //     if (store.state.currentScene === 'visitor') {
  //       store.commit('setCurrentCity', {
  //         cityName: store.state.defaultCity.cityName,
  //         cityCode: store.state.defaultCity.cityCode
  //       })
  //       return
  //     }
  //     const code =
  //       store.state.defaultCity.defaultCityOrProvince === 'city'
  //         ? store.state.defaultCity.defaultCityCode
  //         : store.state.defaultCity.defaultProvinceCode
  //     const name =
  //       store.state.defaultCity.defaultCityOrProvince === 'city'
  //         ? store.state.defaultCity.defaultCityName
  //         : store.state.defaultCity.defaultProvinceName
  //     // const zoom = data.userDefaultInfo.defaultCityOrProvince === 'city' ? 14 : 8
  //     store.commit('setCurrentCity', {
  //       cityName: name,
  //       cityCode: code,
  //       defaultCityCode: store.state.defaultCity.defaultCityCode,
  //       defaultCityName: store.state.defaultCity.defaultCityName,
  //       isArea: store.state.defaultCity.defaultCityOrProvince === 'province'
  //     })
  //     const areaScene =
  //       store.state.defaultCity.defaultCityOrProvince === 'province'
  //         ? 'provinceScene'
  //         : 'cityScene'
  //     store.commit('setCurrentSceneForArea', areaScene)
  //   }

  //   measure(flag) {
  //     if (!this.ruler) {
  //       this.ruler = new AMap.RangingTool(this.map)
  //     }
  //     flag ? this.ruler.turnOn() : this.ruler.turnOff(true)
  //   }

  //   loadPitch() {
  //     let currPitch = this.map.getPitch()
  //     return new Promise(resolve => {
  //       const setPitch = () => {
  //         if (currPitch > 0) {
  //           currPitch -= 1
  //           this.map.setPitch(currPitch)
  //         } else {
  //           clearInterval(intervalId)
  //           return resolve()
  //         }
  //       }
  //       const intervalId = setInterval(setPitch, 20)
  //     })
  //   }
}

const proxyMapSingleton = (() => {
  let mapIns = null
  return function() {
    if (!mapIns) {
      mapIns = new Map()
    }

    return mapIns
  }
})()

export default proxyMapSingleton
