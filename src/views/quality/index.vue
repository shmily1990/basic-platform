<template>
  <div class="model-layout">
    <a-layout id="components-layout-demo-top-side-2">
      <transition name="fade">
        <a-layout-header class="header" v-if="!isFullscreen">
          <Header></Header>
        </a-layout-header>
      </transition>
      <a-layout>
        <a-layout-sider
          width="200"
          style="background: #fff"
          v-if="!isFullscreen"
        >
          <SiderMenu></SiderMenu>
        </a-layout-sider>
        <a-layout>
          <a-layout-content>
            <div class="tag-nav-wrapper" v-if="showTagNavBar">
              <tags-nav></tags-nav>
            </div>
            <Screenfull :value="isFullscreen" />
            <router-view></router-view>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import TagsNav from '@/components/TagsNav'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Screenfull from '@/components/Screenfull'
import SiderMenu from '@/layOuts/SiderMenu'
import Header from '@/layOuts/Header'
export default {
  name: 'quality',
  components: {
    Header,
    SiderMenu,
    Screenfull,
    TagsNav
  },
  watch: {
    $route(newRoute) {
      const { name, query, params, meta } = newRoute
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['isFullscreen', 'showTagNavBar'])
  },
  methods: {
    ...mapMutations(['setTagNavList', 'addTag'])
  },
  mounted() {
    this.setTagNavList()
    const { name, params, query, meta } = this.$route
    this.addTag({
      route: { name, params, query, meta }
    })
    console.log('>>>>haha', this.tagNavList)
  }
}
</script>

<style lang="scss" scoped>
.model-layout {
  height: 100%;
  .ant-layout {
    height: 100%;
  }
  .ant-layout-header {
    background: #55a5df;
    height: 50px;
    line-height: 50px;
    padding: 0 0px 0 50px;
  }
  .tag-nav-wrapper {
    padding: 0;
    height: 40px;
    background: #f0f0f0;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: height 0.3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    height: 0;
  }
}
</style>
