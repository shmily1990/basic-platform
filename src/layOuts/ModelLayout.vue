<template>
  <div class="model-layout">
    <a-layout id="components-layout-demo-top-side-2">
      <a-layout-header class="header">
        <Header></Header>
      </a-layout-header>
      <a-layout>
        <a-layout-sider width="200" style="background: #fff">
          <SiderMenu></SiderMenu>
        </a-layout-sider>
        <a-layout style="padding: 0 24px 24px">
          <a-layout-content>
            <router-view></router-view>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import SiderMenu from './SiderMenu'
import Header from './Header'
export default {
  name: 'ModelLayout',
  components: {
    Header,
    SiderMenu
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.model-layout {
  .ant-layout {
    height: 100%;
  }
  .ant-layout-header {
    background: #55a5df;
    height: 50px;
    line-height: 50px;
  }
}
</style>
