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
  name: 'HeaderNav',
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
      console.log(this.routeList)
      if (this.routeList && this.routeList.length > 0) {
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
  align-items: center;
  > li {
    margin: 0 10px;
    font-size: 16px;
    color: #fff;
    padding: 3px 20px;
    border-radius: 5px;
    line-height: 30px;
    cursor: pointer;
  }
  .isActive {
    background: blue;
  }
}
</style>
