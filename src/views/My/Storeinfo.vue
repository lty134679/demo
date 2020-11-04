<template>
  <!-- 商家详情 -->
  <div class="store-info hide-scroll">
    <my-header :lefticon="true" @click="back">商家详情</my-header>
    <!-- 看板 -->
    <div class="container">
      <div class="panel">
        <div class="mincontainer">
          <div class="item left">
            <div class="nums">35</div>
            <div class="text">门店活动</div>
          </div>
          <div class="item center">
            <div class="nums">125</div>
            <div class="text">保险活动</div>
          </div>
          <div class="item right">
            <div class="nums">75</div>
            <div class="text">核销数</div>
          </div>
          <div class="tip">
            门店信息
          </div>
        </div>
      </div>
    </div>

    <!-- 优惠券 -->
    <div class="discounts">
      <div class="title">
        <p>优惠券</p>
        <p>COUPONS</p>
      </div>
      <div class="item">
        <div class="text">优惠券名称</div>
        <div class="description">
          <div class="name">全场洗车免费</div>
          <div class="limit">有效日期： 2020.06.01-2020.12.01</div>
          <div class="counts">
            <span>发行数量： 200</span>
            <span>剩余数量： 100</span>
          </div>
        </div>
      </div>
    </div>
    <!--卡券  -->
    <div class="coupon">
      <div class="title">
        <p>卡券</p>
        <p>COUPONS</p>
      </div>
      <div class="item">
        <div class="text">优惠券名称</div>
        <div class="description">
          <div class="name">充值200送200</div>
          <div class="limit">有效日期： 2020.06.01-2020.12.01</div>
          <div class="counts">
            <span>发行数量： 200</span>
            <span>剩余数量： 100</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 图表 -->
    <div class="chartbox">
      <div class="title">
        <p>保险活动客户分布情况</p>
        <p>Client distribution of insurance activities</p>
        <div class="chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from '@/utils/request';

export default {
  name: 'storeinfo',
  data() {
    return {
      activitis: [100, 200, 300, 400, 500],
      id: '',
      discounts: [],
      coupons: [],
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getList(this.id);
    this.showChart();
  },
  activated() {
    this.id = this.$route.params.id;
    this.getList(this.id);
    this.showChart();
  },
  methods: {
    // 图表
    showChart() {
      let myChart = this.$echarts.init(
        document.querySelector('.chartbox .chart')
      );
      let res = 0;
      this.activitis.map((item) => {
        res += item;
        return;
      });

      let option = {
        color: ['#407fff', '#a682e6', '#e15d68', '#f29961', '#00cccd'],
        title: {
          text: '总数',
          subtext: res + '',
          left: '49%',
          top: '42%',
          subtextStyle: {
            fontSize: 16,
            color: 'black',
            fontWeight: 'bold',
          },
          textAlign: 'center',
          itemGap: 8,
        },
        legend: {
          left: 'center',
          bottom: 10,
          icon: 'rect',
          itemWidth: 20,
          itemHeight: 8,
          itemGap: 4,
          textStyle: {
            fontSize: 10,
            color: 'black',
          },
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '60%'],
            center: 'center',
            avoidLabelOverlap: false,
            label: {
              show: true,
              formatter: '{d}%',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 12,
                fontWeight: 'bold',
                formatter: '{b}\n{c}\n{d}%',
              },
            },
            labelLine: {
              show: true,
            },
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' },
            ],
          },
        ],
      };

      myChart.setOption(option);
      window.addEventListener('resize', () => myChart.resize());
    },
    // 获取数据
    async getList(id) {
      let res = await get(`/api/store-info/${id}/storeInfoDetailExtension`);
      console.log('res', res);
      if (res.code === '200') {
      }
    },
    //返回
    back() {
      if (this.$route.query.mark === 'fromA') {
        this.$router.push('/performance');
      } else {
        this.$router.push('/pmlist');
      }
    },
  },
};
</script>

<style lang="less" scoped>
.store-info {
  height: 100%;
  padding-bottom: 20px;

  /deep/.my-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #4849a1;
    box-shadow: none;
    border: none;
    color: #cccccc;
    z-index: 999;
  }
  // 看板
  .container {
    position: relative;
    height: 245px;
    background-color: #4849a1;
    .panel {
      position: absolute;
      left: 50%;
      top: 88px;
      transform: translateX(-50%);
      width: 350px;
      height: 230px;
      border: 1px dashed #888888;
      background: url('../../assets/images/zu6136.png') no-repeat center;
      background-size: 350px 232px;
      .mincontainer {
        position: relative;
        width: 310px;
        height: 210px;
        margin: 9px auto;
        background: url('../../assets/images/mengban9.png');
        background-size: 100% 100%;
        background-color: #ffffff;
        box-shadow: 0 4px 5px rgba(224, 224, 224);
        border-radius: 10px;
        display: flex;
        padding-top: 45px;
        .item {
          flex: 1;
          display: flex;
          flex-direction: column;
          // justify-content: center;
          align-items: center;
          padding-top: 15px;
          .nums {
            font-size: 46px;
            font-weight: 700;
          }
          .text {
            margin-top: 1px;
            font-size: 16px;
            text-shadow: 1px 0 0.5px black;
          }
        }
        .center {
          position: relative;
          &::before {
            content: '';
            width: 1px;
            height: 66.67px;
            background-color: #4849a1;
            position: absolute;
            top: 20px;
            left: 0;
          }
          &::after {
            content: '';
            width: 1px;
            height: 66.67px;
            background-color: #4849a1;
            position: absolute;
            top: 20px;
            right: 0;
          }
        }
        .tip {
          width: 80px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          position: absolute;
          right: 0;
          bottom: 0;
          color: white;
          font-size: 12px;
          border-bottom-right-radius: 10px;
          background-color: #4849a1;
        }
      }
    }
  }
  // 优惠券
  .discounts {
    margin-top: 80px;
    padding: 0 7px;
    .title {
      p {
        text-align: center;
        padding: 2px 0;
        &:first-child {
          font-size: 16px;
          color: #333333;
          font-weight: bold;
          text-shadow: 0.5px 0 1px black;
        }
      }
    }
    .item {
      border: 1px dashed #888888;
      width: 356px;
      height: 137px;
      display: flex;
      background: url('../../assets/images/mengban11.png') no-repeat center
        bottom;
      background-size: 96% 95%;
      .text {
        width: 130px;
        padding: 48px 0 0 17px;
        font-size: 21px;
        color: #ffffff;
        font-weight: bold;
      }
      .description {
        flex: 1;
        padding-top: 36px;
        height: 100%;
        width: 215px;
        .name {
          margin-bottom: 17px;
          font-size: 24px;
          color: #000000;
          text-align: center;
        }
        .limit {
          text-align: center;
          margin-bottom: 15px;
          font-size: 11px;
        }
        .counts {
          color: #cccccc;
          text-align: right;
          padding-right: 15px;
          font-size: 10px;
        }
      }
    }
  }
  //   卡券
  .coupon {
    margin-top: 13px;
    padding: 0 7px;
    .title {
      p {
        text-align: center;
        padding: 2px 0;
        &:first-child {
          font-size: 16px;
          color: #333333;
          font-weight: bold;
          text-shadow: 0.5px 0 1px black;
        }
      }
    }
    .item {
      width: 354px;
      height: 137px;
      display: flex;
      border: 1px dashed #888888;
      background: url('../../assets/images/mengban11.png') no-repeat center
        bottom;
      background-size: 95% 95%;
      .text {
        width: 130px;
        padding: 42px 0 0 18px;
        font-size: 21px;
        color: #ffffff;
        font-weight: bold;
      }
      .description {
        flex: 1;
        padding-top: 36px;
        height: 100%;
        width: 215px;
        .name {
          font-size: 24px;
          color: #000000;
          margin-bottom: 17px;
          text-align: center;
        }
        .limit {
          text-align: center;
          margin-bottom: 15px;
          font-size: 11px;
        }
        .counts {
          color: #cccccc;
          text-align: right;
          padding-right: 15px;
          font-size: 10px;
        }
      }
    }
  }
  //   图表
  .chartbox {
    padding-top: 15px;
    .title {
      p {
        text-align: center;
        font-size: 10px;
        padding: 5px;
        &:first-child {
          font-size: 16px;
          color: black;
          font-weight: bold;
          text-shadow: 0.5px 0 1px black;
        }
      }
    }
    .chart {
      width: 100%;
      height: 250px;
    }
  }
}
</style>
