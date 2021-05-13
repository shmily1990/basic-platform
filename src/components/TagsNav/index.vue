<template>
  <div class="tags-nav">
    <div class="close-con">
      <a-dropdown>
        <a-button type="link" shape="circle" icon="close-circle" />
        <a-menu slot="overlay">
          <!-- <a-menu-item>
            <a href="javascript:;">关闭所有</a>
          </a-menu-item> -->
          <a-menu-item @click="closeAll">
            <a href="javascript:;">关闭其他</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <div class="btn-con left-btn">
      <a-button type="text" @click="handleScroll(240)">
        <a-icon type="left" />
      </a-button>
    </div>
    <div class="btn-con right-btn">
      <a-button type="text" @click="handleScroll(-240)">
        <a-icon type="right" />
      </a-button>
    </div>
    <div
      class="scroll-outer"
      ref="scrollOuter"
      @DOMMouseScroll="handlescroll"
      @mousewheel="handlescroll"
    >
      <div
        class="scroll-body"
        ref="scrollBody"
        :style="{ left: tagBodyLeft + 'px' }"
      >
        <transition-group name="taglist-moving-animation">
          <a-tag
            style="cursor: pointer;"
            v-for="(item, index) in tagNavList"
            :key="item.name"
            @close="close(item, index)"
            @click="changeTag(item)"
            :closable="tagNavListLength"
            ><span
              :style="{
                background: $route.name == item.name ? '#2d8cf0' : '#e8eaec'
              }"
            ></span
            >{{ showTitleInside(item) }}</a-tag
          >
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { showTitle, routeEqual, setTagNavListInLocalstorage } from '@/libs/util'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'TagsNav',
  data() {
    return {
      tagBodyLeft: 0
    }
  },
  computed: {
    ...mapState(['isFullscreen', 'tagNavList']),
    tagNavListLength() {
      return this.tagNavList.length > 1
    }
  },
  methods: {
    ...mapMutations(['closeTag', 'setTagNavList']),
    showTitleInside(item) {
      return showTitle(item, this)
    },
    closeAll() {
      const res = this.tagNavList.filter(item => {
        return item.name === this.$route.name
      })
      this.setTagNavList(res)
    },
    close(route) {
      const flg = this.$route.name === route.name
      const res = this.tagNavList.filter(item => !routeEqual(route, item))
      const obj = {
        route,
        flg
      }
      this.closeTag(obj)
      // setTagNavListInLocalstorage([...res])
      console.log(res)
      this.setTagNavList(res)
    },
    changeTag(data) {
      console.log(data)
      this.$router.push({ name: data.name })
    },
    handlescroll(e) {
      console.log(this.list)
      var type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.handleScroll(delta)
    },
    handleScroll(offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            // this.tagBodyLeft = this.tagBodyLeft
          } else {
            this.tagBodyLeft = Math.max(
              this.tagBodyLeft + offset,
              outerWidth - bodyWidth
            )
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tags-nav {
  position: relative;
  border-bottom: 1px solid #f0f0f0;
  width: 100%;
  height: 100%;
  .close-con {
    position: absolute;
    line-height: 40px;
    right: 0;
    top: 0;
    height: 100%;
    width: 32px;
    background: #fff;
    text-align: center;
    z-index: 10;
  }
  .btn-con {
    position: absolute;
    top: 0px;
    height: 100%;
    background: #fff;
    padding-top: 3px;
    z-index: 10;
  }
  .left-btn {
    left: 0;
  }
  .right-btn {
    right: 32px;
    border-right: 1px solid #f0f0f0;
  }
  .ant-btn {
    border: none;
    padding: 0 7px;
  }
  .scroll-outer {
    position: absolute;
    left: 28px;
    right: 61px;
    top: 0;
    bottom: 0;
    -webkit-box-shadow: 0px 0 3px 2px rgb(100 100 100 / 10%) inset;
    box-shadow: 0px 0 3px 2px rgb(100 100 100 / 10%) inset;
    line-height: 37px;
    .scroll-body {
      height: calc(100% - 1px);
      display: inline-block;
      padding: 1px 4px 0;
      position: absolute;
      overflow: visible;
      white-space: nowrap;
      -webkit-transition: left 0.3s ease;
      transition: left 0.3s ease;
    }
    .ant-tag {
      line-height: 26px;
      border: none;
      span {
        width: 11px;
        height: 11px;
        background: #ccc;
        display: inline-block;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 15px;
      }
      ::v-deep .anticon-close {
        margin-left: 15px;
      }
    }
  }
}
</style>
