<template>
  <a-dropdown placement="bottomRight" class="drop-down-con">
    <span class="icon"></span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item key="center" @click="change">
          <a-icon type="user" />
          爱蓝网平台
        </a-menu-item>
        <a-menu-item key="settings">
          <a-icon type="setting" />
          云上超站平台
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="logout">
          <a-icon type="logout" />
          后台管理系统
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script>
export default {
  name: 'avatarDrop',
  methods: {
    change() {
      console.log(888)
    }
  }
}
</script>
<style lang="scss" scoped>
.icon {
  width: 5px;
  display: inline-block;
  line-height: 30;
  border-radius: 2px;
  height: 26px;
  background-image: linear-gradient(to bottom right, #e8e8e8, #f1efef);
}
</style>
