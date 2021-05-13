<template>
  <a-dropdown placement="bottomRight" class="box">
    <span class="ant-pro-account-avatar">
      <a-avatar
        size="small"
        src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
        class="antd-pro-global-header-index-avatar"
      />
      <span class="text">{{ isVisitor ? '游客' : userInfo.remarkName }}</span>
    </span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <!-- <a-menu-item key="center">
          <a-icon type="user" />
          基本平台
        </a-menu-item> -->
        <a-menu-item key="platform" @click="changeBranch">
          <a-icon type="user" />
          切换分支
        </a-menu-item>
        <a-menu-item key="settings" @click="setTagNavStatus(!showTagNavBar)">
          <a-icon type="setting" />
          {{ showTagNavBar ? '关闭标记菜单' : '显示标记菜单' }}
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="logout" v-if="!isVisitor" @click="LoginOut">
          <a-icon type="logout" />
          退出登录
        </a-menu-item>
        <a-menu-item key="logoin" v-else @click="logIn">
          <a-icon type="logout" />
          登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script>
import router, { resetNewRoute } from '@/router'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
// import login from '@/views/login'
export default {
  name: 'avatarDrop',
  components: {
    // login
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['showTagNavBar', 'userInfo']),
    ...mapGetters(['isVisitor'])
  },
  methods: {
    ...mapMutations(['setTagNavStatus']),
    ...mapActions(['loginOut', 'changeBranchs']),
    LoginOut() {
      this.loginOut().then(async () => {
        if (this.$route.path !== '/') {
          await this.$router.push({ name: 'home' })
        }
        // this.$message.success('退出成功')
      })
    },
    logIn() {
      this.$emit('dropdown-clike')
    },
    // 切换分支
    changeBranch() {
      this.changeBranchs().then(async () => {
        if (this.$route.path !== '/') {
          await this.$router.push({ name: 'home' })
        }
        this.$store.dispatch('getRouterInfo2').then(() => resetNewRoute())
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.avatar-con {
  width: 100%;
}
.box {
  color: #323233;
  margin: 0 10px;
  width: 108px;
  text-align: center;
  line-height: 30px;
  .text {
    padding-left: 10px;
  }
}
</style>
