<template>
  <!-- 业绩 -->
  <div class="performance hide-scroll">
    <my-header :lefticon="true" @click="back">{{ name }}的业绩</my-header>
    <div class="container">
      <!-- 看板 -->
      <div class="panel">
        <div class="mincontainer">
          <!-- 入驻 -->
          <div class="item settled">
            <div class="nums">35</div>
            <div class="text">引入门店</div>
          </div>
          <!-- 待认证 -->
          <div class="item wait">
            <div class="nums">125</div>
            <div class="text">待认证门店</div>
          </div>
          <!-- 门店活动 -->
          <div class="item activitis">
            <div class="nums">75</div>
            <div class="text">门店活动</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 门店排名 -->
    <div class="stores">
      <!-- 头部 -->
      <div class="title">
        <div class="text">
          <p>门店排名</p>
          <p>Store ranking</p>
        </div>
        <div
          class="more"
          @click="$router.push({ path: '/pmlist', query: { id, name } })"
        >
          <span>查看更多</span>
          <img src="@/assets/images/more.png" alt="" />
        </div>
      </div>
      <!-- 列表 -->
      <div class="items">
        <div
          class="item"
          v-for="(item, idx) in sort"
          :key="item.id"
          @click="
            $router.push({
              path: `/storeinfo/${item.id}`,
              query: { mark: 'fromA' },
            })
          "
        >
          <div class="order">{{ idx + 1 }}</div>
          <div class="store-info">
            <img
              :src="
                item.storeHeadImgUrlList !== null &&
                item.storeHeadImgUrlList.length > 0
                  ? item.storeHeadImgUrlList[0]
                  : defaultimg
              "
              alt=""
            />
            <div class="center">
              <p class="name">{{ item.storeName }}</p>
              <p>引流数：{{ item.houseNumber }}个</p>
              <p>阳光保险：{{ item.legalCard }}个</p>
            </div>
            <div class="right">
              入驻时间:{{ item.ctime | timeFilter('YYYY.MM.DD') }}
            </div>
          </div>
        </div>
      </div>
      <!-- 门店图表 -->
      <div class="chart"></div>
    </div>
  </div>
</template>

<script>
import { get } from '@/utils/request';
import { getLocal } from '@/utils/local';
export default {
  name: 'performance',
  data() {
    return {
      defaultimg: require('@/assets/images/xiulichang-1_2.png'),
      currentPage: 1,
      pageSize: 10,
      list: [], //总数据
      sort: [], //门店前三
      name: '我的',
      id: '',
    };
  },

  activated() {
    if (this.$route.query.item) {
      this.id = this.$route.query.item.id;
      this.name = this.$route.query.item.name;
    } else {
      this.id = getLocal('marketer_id');
      this.name = '我';
    }
    this.getList();
  },
  methods: {
    // 图表
    showChart() {
      let data = this.selectEchart();
      let allData = data[0];
      // let specialData = data[1];
      let myChart = this.$echarts.init(document.querySelector('.chart'));

      let option = {
        color: ['#D1AFAC', '#BBC2F5'],
        title: {
          text: '我的门店',
          subtext: 'MY STORE',
          left: 'center',
          textStyle: {
            fontSize: 16,
          },
          subtextStyle: {
            color: '#333333',
            fontSize: 12,

            textShadowColor: 'Microsoft YaHei',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
          },
        },
        grid: {
          right: 10,
        },
        legend: {
          icon: 'rect',
          bottom: 10,
          itemWidth: 26,
          itemHeight: 8,
          itemGap: 60,
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月',
            ],
            axisPointer: {
              type: 'shadow',
            },
            axisLine: {
              lineStyle: {
                color: '#ADADCB',
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: '#666666',
              interval: 0,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            interval: 20,
            max: 100,
            axisLine: {
              lineStyle: {
                color: '#ADADCB',
              },
            },
            axisLabel: {
              color: '#666666',
              fontSize: 10,
              margin: 6,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: '门店数量',
            type: 'bar',
            data: allData,
          },
          // {
          //   name: '特殊商家',
          //   type: 'bar',
          //   data: specialData,
          //   barGap: 0,
          //   barCategoryGap: 8,
          // },
        ],
      };
      myChart.setOption(option);
      window.addEventListener('resize', () => myChart.resize());
    },
    // 门店列表
    async getList() {
      let res = await get('/api/store-info/storeInfoListExtension', {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });
      console.log(res, 'res');

      if (res.code === '200') {
        this.list = res.data.data;
        this.sort = res.data.data.slice(0, 3);
        // this.sort = res.data.data
        //   .sort((a, b) => b.houseNumber - a.houseNumber)
        //   .slice(0, 3);

        this.showChart();
      }
    },
    // 筛选图表数据
    selectEchart() {
      let month = [
        '-01-',
        '-02-',
        '-03-',
        '-04-',
        '-05-',
        '-06-',
        '-07-',
        '-08-',
        '-09-',
        '-10-',
        '-11-',
        '-12-',
      ];
      let allStoreData = month.map((item) => {
        let arr = [];
        this.list.forEach((it) => {
          if (it.createTime && it.createTime.indexOf(item) !== -1) {
            arr.push(it);
          }
        });
        return arr.length;
      });

      // // 特殊商家
      // let specialStore = this.list.filter(
      //   (item) => item.specialtyStore === true
      // );
      // let specialData = month.map((item) => {
      //   let arr = [];
      //   specialStore.forEach((it) => {
      //     if (it.createTime && it.createTime.indexOf(item) !== -1) {
      //       arr.push(it);
      //     }
      //   });
      //   return arr.length;
      // });

      return [allStoreData];
    },
    back() {
      this.$route.query.mark === 'team'
        ? this.$router.push('/team')
        : this.$router.push('/home/personal');
    },
  },
  beforeDestroy() {
    // 在组件销毁前创建事件
    this.$event.$emit('fromPerformance', { list: this.list });
  },
};
</script>

<style lang="less" scoped>
.performance {
  background-color: #f9f9fb;
  height: 100%;
  // 头部
  /deep/.my-header {
    background-color: #4849a1;
    border: none;
    box-shadow: none;
    color: #cccccc;
    z-index: 999;
  }
  // 看板
  .container {
    position: relative;
    height: 248px;
    background-color: #4849a1;
    .panel {
      position: absolute;
      left: 50%;
      top: 100px;
      transform: translateX(-50%);
      width: 355px;
      height: 239px;
      background: url('../../assets/images/zu6136.png') no-repeat center;
      background-size: 350px 250px;
      // 内盒子
      .mincontainer {
        width: 310px;
        height: 226px;
        margin: 9px auto;
        background: url('../../assets/images/mengban9.png');
        background-size: 100% 100%;
        background-color: #ffffff;
        box-shadow: 0 4px 5px rgba(224, 224, 224);
        border-radius: 10px;
        display: flex;
        align-items: center;
        // 三个
        .item {
          flex: 1;
          display: flex;
          flex-direction: column;
          // justify-content: center;
          align-items: center;
          // padding-top: 15px;
          .nums {
            font-size: 46px;
            font-weight: 700;
          }
          .text {
            margin-top: 10px;
            font-size: 16px;
            text-shadow: 1px 0 0.5px black;
          }
        }
        // 两条分割线
        .wait {
          position: relative;
          &::after {
            content: '';
            width: 1px;
            height: 70px;
            background-color: #4849a1;
            position: absolute;
            top: 8px;
            right: 0;
          }
          &::before {
            content: '';
            width: 1px;
            height: 70px;
            background-color: #4849a1;
            position: absolute;
            top: 8px;
            left: 0;
          }
        }
      }
    }
  }
  // 门店排名
  .stores {
    margin-top: 100px;
    // 头部
    .title {
      display: flex;
      position: relative;
      .text {
        flex: 1;
        p {
          text-align: center;
          padding: 5px 0;
          &:first-child {
            font-size: 16px;
            font-weight: bold;
          }
          &:last-child {
            font-size: 10px;
          }
        }
      }
      .more {
        position: absolute;
        right: 0;
        bottom: 5px;
        padding-right: 5px;
        color: rgba(34, 63, 145, 1);
        span {
          font-size: 9px;
        }
        img {
          width: 6.57px;
          height: 5.5px;
          margin-left: 3px;
        }
      }
    }
    // 列表
    .items {
      .item {
        margin-bottom: 9px;
        box-shadow: 0px 3px 6px rgba(218, 218, 220, 1);
        display: flex;
        align-items: center;
        background-color: #ffffff;
        padding: 10px 12px;
        .order {
          font-size: 30px;
          color: #4849a1;
        }
        .store-info {
          display: flex;
          position: relative;
          flex: 1;
          img {
            width: 65px;
            height: 61px;
            border: 1px solid #cccccc;
            margin: 2px 10px 0 10px;
          }
          .center {
            margin-right: 9px;
            flex: 1;
            .name {
              font-size: 14px;
              color: rgba(70, 71, 158, 1);
              font-weight: bold;
              text-shadow: 0.5px 0 0.1px #46479e;
              font-family: 'Microsoft YaHei';
              margin-bottom: 11px;
            }
            p {
              font-size: 12px;
              margin-bottom: 2px;
              width: 120px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
          .right {
            position: absolute;
            right: 0;
            bottom: 0;
            font-size: 12px;
          }
        }
      }
    }
    // 图表
    .chart {
      height: 236px;
      background-color: #f9f9fb;
    }
  }
}
</style>
