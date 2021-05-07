<template>
  <div class="header">
    <div class="header-logo">基础平台管理系统</div>
    <RightContent></RightContent>
  </div>
</template>
<script>
import RightContent from '@/components/GlobalHeader/RightContent'
export default {
  name: 'Header',
  components: {
    RightContent
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  &-logo {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    flex: 1 auto;
  }
}
</style>
