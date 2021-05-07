<template>
  <div class="user-avatar-dropdown">
    <img src="@/assets/images/userIcon.png" />
    <a-dropdown>
      <span>测试用户 <a-icon type="down"/></span>
      <a-menu slot="overlay">
        <a-menu-item>
          <a href="javascript:;">菜单一</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">打开tag标签</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">退出登录</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>
<style lang="scss" scoped>
.user-avatar-dropdown {
  margin-left: 20px;
  > img {
    padding-right: 10px;
  }
}
</style>
