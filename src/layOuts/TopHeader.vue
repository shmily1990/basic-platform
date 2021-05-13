<template>
  <div class="header" :class="{ 'home-style': isHome }">
    <div class="logo">
      <div class="logo-text">BASIC-PLATFORM</div>
    </div>
    <div class="menus">
      <header-nav></header-nav>
      <avatar-dropdown @dropdown-clike="login"></avatar-dropdown>
      <jump-entrance></jump-entrance>
    </div>
    <login v-if="loginShow" :isShow.sync="loginShow"></login>
  </div>
</template>

<script>
import headerNav from './HeaderNav'
import AvatarDropdown from './AvatarDropdown'
import JumpEntrance from './JumpEntrance'
import login from '@/views/login'
export default {
  name: 'tNeader',
  watch: {
    $route: {
      handler(data) {
        this.isHome = data.name == 'home'
      },
      deep: true,
      immediate: true
    }
  },
  components: {
    headerNav,
    AvatarDropdown,
    JumpEntrance,
    login
  },
  data() {
    return {
      loginShow: false,
      isHome: true
    }
  },
  methods: {
    login() {
      this.loginShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: #4292d6;
  padding-left: 50px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  .logo {
    display: flex;
    font-size: 33px;
    color: #323233;
    font-family: fantasy;
    flex: 1 auto;
  }
  .menus {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin: 0 30px;
  }
}
.home-style {
  position: absolute;
  height: 56px;
  top: 0;
  left: 0;
  z-index: 1;
  background: none;
  .logo {
    color: #fff;
  }
  .menus {
    .header-nav {
      color: #fff;
    }
    .box {
      color: #fff;
    }
  }
}
</style>
