<template>
  <!-- 套餐管理 -->
  <div class="set-meal hide-scroll pdtop">
    <my-header :lefticon="true" @click="$router.push('/appreciation')"
      >套餐管理</my-header
    >
    <div class="main hide-scroll">
      <van-tabs
        color="#4849A1"
        title-active-color="#4849A1"
        v-model="active"
        @change="change"
        animated
        swipeable
        :ellipsis="false"
        sticky
        offset-top="86px"
      >
        <van-tab
          v-for="item in list"
          :key="item.id"
          :name="item.id"
          :title="item.packageName"
        >
          <div class="block">
            <!-- 福利简介 -->
            <div class="description">
              <div class="item">
                <div class="label">套餐名称</div>
                <div class="content">{{ item.packageName }}</div>
              </div>
              <div class="item">
                <div class="label">增值服务名称</div>
                <div class="content">{{ vasName }}</div>
              </div>
              <div class="item">
                <div class="label">发行方</div>
                <div class="content">{{ item.publisher }}</div>
              </div>
            </div>
            <!-- 可用项目 -->
            <div class="allow-production">
              <div class="title">
                可用项目
              </div>
              <div class="items">
                <div class="label">
                  <div>业务类型</div>
                  <div class="center">项目名称</div>
                  <div>成本</div>
                </div>
                <div
                  class="item"
                  v-for="(item, index) in item.baseItemPackageDetailVOS"
                  :key="index"
                >
                  <div>{{ item.itemType }}</div>
                  <div class="center">{{ item.itemName }}</div>
                  <div>¥{{ item.price }}</div>
                </div>
              </div>
            </div>
            <!-- 可用商品 -->
            <div class="allow-goods">
              <div class="title">
                可用商品
              </div>
              <div class="items">
                <div class="label">
                  <div>商品名称</div>
                  <div class="center">规格</div>
                  <div class="guidePrice">成本</div>
                  <div>数量</div>
                </div>
                <div
                  class="item"
                  v-for="(item, index) in item.partPackageDetailVOS"
                  :key="index"
                >
                  <div>{{ item.accessoriesName }}</div>
                  <div class="center">{{ item.specification }}</div>
                  <div class="guidePrice">{{ item.costPrice }}</div>
                  <div>{{ item.amount }}</div>
                </div>
              </div>
            </div>
            <!-- 告知 -->
            <div class="inform">
              <div class="title">
                服务须知
              </div>
              <div class="items">
                <div class="item">
                  有效期：{{ item.startTime | timeFilter('YYYY.MM.DD') }}至{{
                    item.endTime | timeFilter('YYYY.MM.DD')
                  }}
                </div>
                <div class="item">预约信息：{{ item.reserveInfo }}</div>
                <div class="item">服务对象：5座以上车辆不予服务</div>
                <div class="item rules">
                  <div class="label">规则描述：</div>
                  <div>{{ item.ruleDescription }}</div>
                </div>
                <div class="item tips">
                  <div class="label">温馨提示：</div>
                  <div>
                    为了保障您的权益，建议使用亲车吧线上支付。若使
                    用其他支付方式导致纠纷的，亲车吧不承担任何责任，
                    感谢你的理解和支持！
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>

      <!-- 立即参与 -->
      <div class="button-container">
        <van-button @click="join">{{ txt ? txt : '选择参与门店' }}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { get, put } from '@/utils/request';
import { timeFilter } from '@/utils/filters';
export default {
  name: 'setmeal',
  data() {
    return {
      active: '',
      list: [],
      storeId: '',
      vasId: '',
      vasName: '',
      txt: '',
    };
  },
  activated() {
    if (this.$route.params.storeId) {
      this.storeId = this.$route.params.storeId;
      this.txt = '立即参与';
    } else {
      this.txt = '';
    }
    if (this.$route.params.vasId) {
      this.vasId = this.$route.params.vasId;
      this.vasName = this.$route.params.vasName;
      this.list = [];
      this.getList();
    }
  },
  methods: {
    // 请求数据
    async getList() {
      try {
        let res = await get(`/api/${this.vasId}/packageDetailVasId`);
        console.log(res, 'res1');
        let { code, data } = res;
        if (code === '200') {
          data.data.forEach(async (item) => {
            let res2 = await get(`/api/${item.id}/packageDetail`);
            console.log(res2, 'res2');
            if (res2.code === '200') {
              this.list.push(res2.data);
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 切换
    change(name, title) {
      console.log(name);
    },
    // 参与
    join() {
      if (this.$route.params.storeId) {
        this.$dialog
          .confirm({
            title: `是否确认参与？`,
            message: '确认参与后不可取消',
          })
          .then(async () => {
            let res = await put(`/api/storeInPackage`, {
              packageIds: [this.active],
              storeIds: [this.$route.params.storeId],
            });
            console.log(res);

            this.$router.push({
              name: 'feedback',
              params: {
                res,
              },
            });
          })
          .catch((err) => {
            if (err !== 'cancel') {
              console.log(err);
            } else {
              this.$toast('取消成功');
            }
          });
      } else {
        this.$router.push({
          name: 'addjoinshop',
          params: { packageId: this.active },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.set-meal {
  width: 100%;
  height: 100%;
  .main {
    //标签栏
    height: calc(100vh - 160px);
    .van-tabs {
      /deep/.van-tabs__nav {
        background-color: #f9f9fb;
        /deep/.van-tab--active {
          font-weight: bold;
        }
      }
    }

    //   套餐
    .block {
      //   福利简介
      .description {
        .item {
          display: flex;
          padding: 13px 20px;
          background-color: #fff;
          border-bottom: 1px solid #f9f9fb;
          .label {
            width: 132px;
            color: black;
            font-size: 15px;
          }
          .content {
            color: #a1a1a3;
            font-size: 14px;
          }
        }
      }
      // 可用项目
      .allow-production {
        .title {
          padding: 7px 11px;
          color: #999999;
          font-size: 12px;
          background-color: #f9f9fb;
        }
        .items {
          background-color: #fff;
          padding: 14px 20px;
          .label {
            display: flex;
            font-size: 15px;
            color: #000000;
            div {
              text-align: center;
              &.center {
                flex: 1;
              }
            }
            div:first-child {
              width: 80px;
            }
            div:last-child {
              width: 45px;
            }
          }
          .item {
            padding-top: 8px;

            display: flex;
            div {
              font-size: 14px;
              color: #a1a1a3;
              text-align: center;
              &.center {
                flex: 1;
              }
            }
            div:first-child {
              width: 80px;
            }
            div:last-child {
              width: 45px;
            }
          }
        }
      }
      // 可用商品
      .allow-goods {
        .title {
          font-size: 12px;
          color: #999999;
          padding: 7px 11px;
          background-color: #f9f9fb;
        }
        .items {
          background-color: #fff;
          color: #a1a1a3;
          font-size: 14px;
          padding: 14px 20px;
          .label {
            color: black;
            font-size: 15px;
            display: flex;
            div {
              text-align: center;
              &.center {
                flex: 1;
              }
              &.guidePrice {
                width: 80px;
              }
            }

            div:first-child {
              width: 90px;
            }
            div:last-child {
              width: 45px;
            }
          }
          .item {
            display: flex;
            align-items: center;
            padding-top: 8px;
            div {
              text-align: center;
              &.center {
                flex: 1;
              }
              &.guidePrice {
                width: 80px;
              }
            }
            div:last-child {
              width: 45px;
            }
            div:first-child {
              width: 90px;
            }
          }
        }
      }
      // 告知
      .inform {
        .title {
          padding: 7px 11px;
          color: #999999;
          background-color: #f9f9fb;
        }
        .items {
          font-size: 12px;
          padding: 14px 20px;
          background-color: #fff;
          .item {
            margin-bottom: 8px;
            &.tips {
              display: flex;
              .label {
                flex-shrink: 0;
              }
            }
            &.rules {
              .label {
                margin-bottom: 8px;
              }
            }
          }
        }
      }
    }
    // 立即参与
    .button-container {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 68px;
      padding: 0 20px 18px 20px;
      background-color: #fff;
      .van-button {
        width: 335px;
        height: 50px;
        background-color: #4849a1;
        color: #ffffff;
        font-size: 16px;
        border-radius: 10px;
      }
    }
  }
}
</style>
