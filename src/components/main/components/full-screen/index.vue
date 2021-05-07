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
      this.$emit('update:value', !this.value)
    }
  }
}
</script>
<style lang="scss" scoped>
.full-screen-btn {
  position: absolute;
  right: 20px;
  top: 50px;
}
</style>
