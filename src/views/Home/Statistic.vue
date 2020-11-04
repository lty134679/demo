<template>
  <!-- 统计 -->
  <div class="statistic">
    <!-- 看板 -->
    <div class="container">
      <div class="panel">
        <div class="mincontainer">
          <div class="item stores">
            <div class="nums">35</div>
            <div class="text">平台商户</div>
          </div>
          <div class="item users">
            <div class="nums">464</div>
            <div class="text">平台门店</div>
          </div>
          <div class="item insurance">
            <div class="nums">464</div>
            <div class="text">保险活动</div>
          </div>
          <div class="item ours">
            <div class="nums">84</div>
            <div class="text">平台活动</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 图表 -->
    <div class="line-echart">
      <div class="title">平台累计用户</div>
      <div class="chart"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'statistic',
  mounted() {
    this.showChart();
  },
  methods: {
    // 图表
    showChart() {
      let myChart = this.$echarts.init(
        document.querySelector('.line-echart .chart')
      );
      let option = {
        color: [
          {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#FFFFFF', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#B2BAF4', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
          {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#FFFFFF', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#CAA4A0', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
          {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#FFFFFF', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#F0CBEF', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        ],
        tooltip: {
          show: true,
          trigger: 'axis',
        },
        title: {
          text: 'CUMULATIVE USERS OF THE PLATFORM',
          textStyle: {
            color: '#333',
            fontSize: 10,
            fontWeight: 'normal',
          },
          left: 'center',
        },

        legend: {
          icon: 'rect',
          itemHeight: 8,
          // itemWidth: 10,
          bottom: 4,
          left: 'center',
          width: '100%',
          itemGap: 14,
          textStyle: {
            fontSize: 12,
            lineHeight: 12,
          },
        },
        grid: {
          left: 13,
          right: 21,
          bottom: 30,
          top: 30,
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          // 线的起始点不在轴上
          // interval: 3,
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
          axisTick: {
            show: false,
            alignWithLabel: true,
          },
          axisLabel: {
            interval: 0,
            color: '#333333',
            fontSize: 10,
          },
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
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(102, 102, 102, 0.5)',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 10,
            color: 'rgba(102, 102, 102, 1)',
            margin: 4,
          },
        },
        series: [
          {
            name: '平台用户总数',
            type: 'line',
            lineStyle: {
              color: 'transparent',
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(176, 161, 234, 0.1)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(176, 161, 234)', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            symbol: 'circle',
            symbolSize: 3,
            itemStyle: {
              color: '#0092fe',
            },
            data: [38, 22, 40, 19, 18, 25, 20, 24, 38, 18, 19, 26],
          },
          {
            name: '保险用户',
            type: 'line',
            lineStyle: {
              color: 'transparent',
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(199, 139, 163, 0.1)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(199, 139, 163)', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            symbol: 'circle',
            symbolSize: 3,
            itemStyle: {
              color: '#a17d48',
            },
            data: [18, 28, 38, 48, 58, 68, 78, 88, 78, 68, 58, 48],
          },
          {
            name: '活动用户',
            type: 'line',
            lineStyle: {
              color: 'transparent',
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(219, 138, 217, 0.1)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(219, 138, 217)', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            symbol: 'circle',
            symbolSize: 3,
            itemStyle: {
              color: '#de2cd9',
            },
            data: [58, 38, 60, 42, 65, 35, 45, 48, 50, 46, 39, 41],
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener('resize', () => {
        console.log('统计页的自适应');

        return myChart.resize();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.statistic {
  padding-bottom: 150px;
  // 看板
  .container {
    position: relative;
    height: 270px;
    background-color: #4849a1;
    .panel {
      position: absolute;
      left: 50%;
      top: 60px;
      transform: translateX(-50%);
      width: 355px;
      height: 260px;
      background: url('../../assets/images/zu6136.png') no-repeat center;
      background-size: 350px 250px;
      .mincontainer {
        width: 310px;
        height: 238px;
        margin: 9px auto;
        background: url('../../assets/images/mengban9.png');
        background-size: 100% 100%;
        background-color: #ffffff;
        box-shadow: 0 4px 5px rgba(224, 224, 224);
        border-radius: 10px;
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 50%;
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
        .stores,
        .insurance {
          position: relative;
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
      }
    }
  }
  // 图表
  .line-echart {
    margin-top: 58px;
    .title {
      height: 30px;
      color: #333333;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 700;
      line-height: 30px;
      text-align: center;
      text-shadow: 1px 0 0.5px black;
    }
    .chart {
      width: 100%;
      height: 210px;
    }
  }
}
</style>
