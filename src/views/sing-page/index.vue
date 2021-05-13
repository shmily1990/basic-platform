<template>
  <div class="sing-page">
    <div class="content">
      这是单页
    </div>
  </div>
</template>
<script>
// import topHeader from '@/layOuts/TopHeader'
export default {
  name: 'singPage',
  components: {
    // topHeader
  },
  mounted() {
    console.log(2)
  },
  created() {
    console.log(1)
  },
  // 进入keep-alive
  activated() {
    console.log(3)
  },
  // 离开keep-alive
  deactivated() {
    console.log(4)
  }
}
</script>
