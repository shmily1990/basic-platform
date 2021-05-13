<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { getToken } from '@/libs/util'
export default {
  name: 'app',
  created() {
    const userInfo = getToken('UserInfo')
    userInfo
      ? this.$store.commit('setUserInfo', JSON.parse(userInfo))
      : this.$store.commit('setUserInfo', null)
  }
}
</script>

<style lang="scss">
@import '~@/assets/css/index';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #323233;
  width: 100%;
  height: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
