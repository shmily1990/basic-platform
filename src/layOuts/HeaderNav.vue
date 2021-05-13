<template>
  <ul class="header-nav">
    <li
      v-for="(item, index) in navList"
      :key="index"
      :class="{ isActive: isActive == item.name }"
      @click="gotoPages(item, index)"
    >
      {{ item.meta.showName }}
    </li>
  </ul>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'HomeNav',
  data() {
    return {}
  },
  computed: {
    ...mapState(['routeList']),
    isActive() {
      const st = this.$route.path.split('/')[1]
      return st
    },
    navList() {
      if (this.routeList && this.routeList.length > 0) {
        // let arr = this.routeList.splice(1, 1)
        return this.routeList
      } else {
        console.log(999)
        return [
          {
            name: 'home',
            meta: {
              showName: '首页'
            }
          }
        ]
      }
    }
  },
  methods: {
    gotoPages(data, index) {
      console.log(data)
      console.log(this.$router)
      this.$router.push({ name: data.name })
    }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.header-nav {
  display: flex;
  color: #323233;
  line-height: 40px;
  font-size: 16px;
  > li {
    margin: 0 20px;
    border-bottom-style: solid;
    &.isActive {
      border-bottom: 1px solid #888677;
    }
  }
}
</style>
