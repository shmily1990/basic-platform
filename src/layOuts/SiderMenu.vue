<template>
  <div class="sider-menu">
    <a-menu
      mode="inline"
      theme="dark"
      :default-selected-keys="[defaultKey]"
      :style="{ height: '100%', borderRight: 0 }"
      @select="menuClick"
      :defaultOpenKeys="openKeysList"
      :selectedKeys="[$route.name]"
    >
      <template v-for="item in menus">
        <a-menu-item :key="item.ename" v-if="!item.children">
          <a-icon :type="item.icon" />
          <span>{{ item.name }}</span>
        </a-menu-item>
        <a-sub-menu :key="item.ename" v-else>
          <span slot="title"><a-icon type="user" />{{ item.name }}</span>
          <a-menu-item v-for="cItem in item.children" :key="cItem.ename">{{
            cItem.name
          }}</a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>
<script>
export default {
  name: 'SiderMenu',
  data() {
    return {
      defaultKey: '',
      menus: [],
      selectedKeys: [],
      openKeysList: []
    }
  },
  watch: {
    $route(newRoute) {
      const hash = this.getHash()
      if (hash.length > 2) {
        this.openKeysList[0] = hash[1]
      }
    }
  },
  methods: {
    menuClick({ key }) {
      this.defaultKey = key
      this.$router.push({ name: this.defaultKey })
    },
    getHash() {
      const hash = window.location.hash.split('/')
      const b = window.location.hash
      hash.shift()
      return hash || []
    },
    getOneMenu() {
      const hash = this.getHash()
      const r1 = this.$router.options.routes.filter(item => {
        return item.name === hash[0]
      })
      if (r1.length < 1) return null
      const r2 = r1[0].children.filter(item => {
        return item.name === hash[1]
      })
      if (r2.length < 1) return null
      if (r2[0].meta.subMenu) {
        const r3 = r2[0].children.filter(item => {
          return item.name === hash[2]
        })
        return r3.length < 1 ? null : r3[0].name
      } else {
        return null
      }
    },
    getMenuList() {
      const hash = this.getHash()
      const r1 = this.$router.options.routes.filter(item => {
        return item.name === hash[0]
      })
      console.log(r1)
      if (r1.length < 1) {
        return []
      }
      this.menus = r1[0].children.map(menu => {
        const subMenu = menu.meta.subMenu || false
        const option = {
          name: menu.meta.showName,
          ename: menu.name,
          icon: menu.meta.icon,
          authCode: menu.meta.authCode
        }
        if (subMenu) {
          option.children = menu.children.map(cMenu => {
            return {
              name: cMenu.meta.showName,
              ename: cMenu.name,
              authCode: cMenu.meta.authCode
            }
          })
        }
        return option
      })
    }
  },
  created() {
    const hash = this.getHash()
    const menu = this.getOneMenu()
    if (menu) {
      this.defaultKey = menu
    } else {
      this.defaultKey = hash.length > 1 ? hash[1] : ''
    }
    this.selectedKeys[0] = this.defaultKey
    if (hash.length > 2) {
      this.openKeysList[0] = hash[1]
    }
  },
  mounted() {
    const menus = this.getMenuList()
  }
}
</script>

<style lang="scss" scoped>
.sider-menu {
  height: 100%;
}
</style>
