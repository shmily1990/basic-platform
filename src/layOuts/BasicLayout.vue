<template>
  <div class="basic-layout">
    <a-layout>
      <transition name="fade">
        <a-layout-header v-if="!isFullscreen">
          <Header></Header>
        </a-layout-header>
      </transition>
      <a-layout-content>
        <Screenfull :value="isFullscreen" />
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import Screenfull from '@/components/Screenfull'
import Header from './Header'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'BasicLayout',
  components: {
    Header,
    Screenfull
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['isFullscreen'])
  }
}
</script>

<style lang="scss" scoped>
.basic-layout {
  height: 100%;
  width: 100%;
  position: relative;
  .ant-layout {
    height: 100%;
  }
  .ant-layout-header {
    background: #55a5df;
    height: 50px;
    line-height: 50px;
    padding: 0 0px 0 50px;
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
