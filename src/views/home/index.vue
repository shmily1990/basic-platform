<template>
  <div class="home">
    <div id="map"></div>
  </div>
</template>

<script>
import mapConf from '@/config/map'
import proxyMapSingleton from '@/libs/map'
let mapIns
export default {
  name: 'home',
  components: {},
  data() {
    return {}
  },
  methods: {
    async initMap() {
      const config = this.$_.pick(mapConf, [
        'mapStyle',
        'mapStyleDark',
        'initCenter',
        'initZoom',
        'initPitch',
        'zooms',
        'visitor'
      ])
      console.log(config)
      // console.log(proxyMapSingleton())
      mapIns = await proxyMapSingleton()
      console.log(mapIns)
      const chinaBounds = await this.getChinaBounds()
      console.log(chinaBounds)
      await mapIns.init('map', {
        mask: chinaBounds,
        viewMode: '3D',
        mapStyle: config.mapStyleDark,
        zooms: config.zooms,
        zoom: config.visitor.initZoom,
        // center: config.visitor.initCenter,
        pitch: config.initPitch,
        showLabel: true
        // features: ['bg', 'road', 'building', 'point']
      })
    },
    // 获取中国边界
    getChinaBounds() {
      return new Promise(resolve => {
        const script = document.createElement('script')
        script.onload = () => {
          return resolve(window.getBounds())
        }
        script.async = true
        script.src = 'http://116.62.150.185/chinabounds.js'
        document.head.appendChild(script)
      })
    }
  },
  mounted() {
    console.log(666)
    this.initMap()
  }
}
</script>
<style lang="scss" scoped>
.home,
#map {
  height: 100%;
}

.home {
  position: relative;
}
</style>
