<template>
  <div class="full-screen-btn">
    <a-tooltip :title="value ? '退出全屏' : '全屏'">
      <a-icon
        style="font-size:23px;"
        :type="value ? 'fullscreen' : 'fullscreen-exit'"
        @click.native="handleChange"
      />
    </a-tooltip>
  </div>
</template>

<script>
export default {
  name: 'fullScreen',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleChange() {
      this.$store.commit('setScreen', !this.value)
    }
  }
}
</script>
<style lang="scss" scoped>
.full-screen-btn {
  width: 55px;
  position: absolute;
  right: 0;
  bottom: 8px;
  z-index: 9;
}
</style>
