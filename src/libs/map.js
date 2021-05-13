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
        const tileLayer = new AMap.TileLayer({
          rejectMapMask: true
        })
        this.map.add([tileLayer])
        // await this.initPlugins()
        return Promise.resolve()
      })
      .catch(e => {
        console.error(e) // 加载错误提示
      })
  }
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
