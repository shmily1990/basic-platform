<template>
  <a-layout style="height:100%;">
    <a-layout-header v-if="!isFullscreen">
      <div class="header-logo">大数据平台系统</div>
      <div class="header-bar">
        <ul class="header-nav">
          <li
            v-for="(item, index) in navList"
            :key="index"
            :class="{ isActive: isActive == index }"
            @click="goto(item)"
          >
            {{ item.title }}
          </li>
        </ul>
        <user></user>
      </div>
    </a-layout-header>
    <a-layout-content>
      <full-screen :value.sync="isFullscreen" />
      <keep-alive>
        <router-view />
      </keep-alive>
    </a-layout-content>
  </a-layout>
</template>

<script>
import user from './components/user'
import FullScreen from './components/full-screen'
export default {
  name: 'main',
  components: {
    user,
    FullScreen
  },
  data() {
    return {
      msg: '',
      isFullscreen: false,
      navList: [
        {
          title: '首页',
          index: 0,
          name: 'home'
        },
        {
          title: '运维模板',
          index: 1,
          name: 'devOpsTemplate'
        },
        {
          title: '质控模板',
          index: 2,
          name: 'qualityTemplate'
        }
      ],
      isActive: 0
    }
  },
  methods: {
    goto(data) {
      this.isActive = data.index
      this.$router.push({ name: data.name })
    }
  },
  mounted() {
    console.log(6666)
  }
}
</script>
<style lang="scss" scoped>
.ant-layout-header {
  background: #55a5df;
  display: flex;
  .header-logo {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    flex: 1 auto;
  }
  .header-bar {
    display: flex;
    .header-nav {
      display: flex;
      align-items: center;
      > li {
        margin: 0 10px;
        font-size: 16px;
        color: #fff;
        padding: 3px 20px;
        border-radius: 5px;
        line-height: 30px;
        cursor: pointer;
      }
      .isActive {
        background: blue;
      }
    }
  }
}
.ant-layout-content {
  position: relative;
}
</style>
