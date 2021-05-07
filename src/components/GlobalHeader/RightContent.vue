<template>
  <div class="right-content">
    <header-nav></header-nav>
    <avatar-dropdown @dropdown-clike="login"></avatar-dropdown>
    <jump-entrance></jump-entrance>
    <login v-if="loginShow" :isShow.sync="loginShow"></login>
  </div>
</template>

<script>
import HeaderNav from '../HeaderNav'
import AvatarDropdown from './AvatarDropdown'
import JumpEntrance from '../JumpEntrance'
import login from '@/views/login'
export default {
  name: 'rightContent',
  components: {
    HeaderNav,
    AvatarDropdown,
    JumpEntrance,
    login
  },
  data() {
    return {
      loginShow: false
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
.right-content {
  display: flex;
}
</style>
