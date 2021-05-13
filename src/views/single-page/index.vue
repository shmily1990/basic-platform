<template>
  <div class="single-page">
    <!-- 1 -->
    <a-row :gutter="20" style="margin-bottom:20px;">
      <a-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`info-${i}`">
        <a-card>
          <div class="card-content-con">
            <div class="left-area" :style="{background: infor.color}">
              <i :class="infor.icon"></i>
            </div>
            <div class="right-area">
              <p v-if="infor.title == '优良天'" class="count-style">{{ infor.status }}</p>
              <count-to :end="infor.count" class="count-style" v-else />
              <p><span>{{ infor.title }}</span></p>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <!-- 2 -->
    <a-row :gutter="20" style="margin-bottom:20px;">
      <a-col :md="24" :lg="8">
        <a-card>
          <div class="card-content-chart">
            <echarts :option="pieOption" width="100%" height="310px"></echarts>
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="16">
        <a-card>
          <div class="card-content-chart">
            <echarts :option="barOption" width="100%" height="310px"></echarts>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <!-- 3 -->
    <a-row>
      <a-card>
        <echarts :option="lineOption" width="100%" height="400px"></echarts>
      </a-card>
    </a-row>
  </div>
</template>
<script>
// import topHeader from '@/layOuts/TopHeader'
import CountTo from '@/components/count-to'
import { getPieModel, getBarModel, getLineModel } from './res'
export default {
  name: 'singlePage',
  components: {
    CountTo
    // topHeader
  },
  data() {
    return {
      inforCardData: [
        {
          title: '空气质量',
          icon: 'adv-leaf2',
          count: 50,
          color: '#2d8cf0'
        },
        {
          title: '优良天',
          icon: 'adv-wth-01',
          count: null,
          color: '#19be6b',
          status: '优'
        },
        {
          title: '超站',
          icon: 'adv-radio-tower',
          count: 2,
          color: '#ff9900'
        },
        {
          title: '传输状态',
          icon: 'adv-nodeline',
          count: 70,
          color: '#ed3f14'
        },
        {
          title: '监测因子',
          icon: 'adv-interpolation',
          count: 803,
          color: '#E46CBB'
        },
        {
          title: '报警',
          icon: 'adv-lightbubble-shine',
          count: 10,
          color: '#9A66E4'
        }
      ],
      pieOption: null,
      barOption: null,
      lineOption: null
    }
  },
  mounted() {
    this.pieOption = getPieModel()
    this.barOption = getBarModel()
    this.lineOption = getLineModel()
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
<style lang="scss" scoped>
.single-page {
  width: 100%;
  padding: 18px;
  background: #f5f7f9;
  height: 100%;
  .card-content-con {
    display: flex;
    height: 110px;
    .left-area {
      width: 34%;
      text-align: center;
      line-height: 110px;
      font-size: 38px;
      color: #fff;
    }
    .right-area {
      flex: 1;
      text-align: center;
      .count-style {
        font-size: 50px;
      }
    }
  }
  .card-content-chart {
    padding: 20px;
  }
  ::v-deep .ant-card-body {
    padding: 0;
    // border-radius: 5px;
  }
}
</style>
