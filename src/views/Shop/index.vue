<template>
  <!-- 门店管理 -->
  <div class="shopManage hide-scroll">
    <my-header :lefticon="true" @click="$router.push('/home/index')"
      >门店管理</my-header
    >

    <!-- 搜索框 -->
    <div class="content_search">
      <van-search
        v-model="params.storeName"
        shape="round"
        show-action
        background="#f9f9fb"
        :clearable="false"
        left-icon="none"
        placeholder="请输入商品关键词或用户名"
        @search="search"
        @cancel="params.storeName = ''"
      >
        <svg slot="right-icon" class="icon" aria-hidden="true" @click="search">
          <use xlink:href="#icon-fangdajing"></use>
        </svg>
      </van-search>
      <img src="@/assets/images/zu628.png" alt="" @click="toggle = !toggle" />
    </div>

    <!-- 弹出框 -->
    <transition name="fade">
      <div v-show="toggle" class="popup">
        <div>
          <p>信息完善:</p>
          <div class="button-container">
            <button :class="{ active: !active }" @click="isPerfect(0)">
              未完善
            </button>
            <button :class="{ active: active }" @click="isPerfect(1)">
              已完善
            </button>
          </div>
        </div>
        <div class="mask" @click="toggle = false"></div>
      </div>
    </transition>

    <!-- 列表 -->
    <div class="items hide-scroll" @scroll.passive="pullUp">
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        success-text="刷新成功"
      >
        <div class="item" v-for="item in list" :key="item.id">
          <img
            :src="
              item.storeHeadImgUrlList !== null &&
              item.storeHeadImgUrlList.length > 0
                ? item.storeHeadImgUrlList[0].url
                : defaultImg
            "
            alt
          />

          <div class="discription">
            <div class="name">{{ item.storeName }}</div>
            <div class="state">
              信息完善：{{ item.isPerfect ? '已完善' : '未完善' }}
            </div>
          </div>

          <div class="button-container">
            <div
              @click="
                $router.push({ name: 'editshop', params: { id: item.id } })
              "
            >
              编辑
            </div>
            <div
              @click="
                $router.push({ path: '/shopdetail', query: { id: item.id } })
              "
            >
              门店详情
            </div>
            <div
              @click="
                $router.push({ path: '/joinstate', query: { id: item.id } })
              "
            >
              参与情况
            </div>
            <div
              @click="
                $router.push({
                  path: '/appreciation',
                  query: { storeId: item.id },
                })
              "
            >
              参与套餐
            </div>
          </div>
        </div>
        <div v-show="finished" class="nomore">{{ finishedText }}</div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { get, post } from '@/utils/request';

export default {
  name: 'shopmanage',
  data() {
    return {
      defaultImg: require('@/assets/images/huluwa.jpg'),
      list: [],
      refreshing: false,
      finished: false,
      finishedText: '没有更多了',
      loading: true,
      params: {
        currentPage: 1,
        pageSize: 10,
        isPerfect: '',
        storeName: '',
      },
      // 显隐弹出框
      toggle: false,
      active: 1,
    };
  },

  activated() {
    this.list = [];
    this.params.currentPage = 1;
    this.getList(this.params);
  },
  methods: {
    // 请求数据
    async getList(params, callback) {
      try {
        let res = await get('/api/store-info/storeInfoListExtension', params);
        console.log(res);

        let { code, data } = res;
        if (code === '200') {
          if (data.data.length < 10) {
            this.finishedText = '没有更多了';
            this.finished = true;
          }
          this.list = [...this.list, ...data.data];
          callback && callback();
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 搜索
    async search() {
      let res = this.params.storeName.trim();
      if (!res) {
        this.$toast('请输入搜索关键字');
        return;
      }
      this.list = [];
      this.params.currentPage = 1;
      try {
        let res = await get(
          '/api/store-info/storeInfoListExtension',
          this.params
        );
        let { code, data } = res;
        if (code === '200') {
          if (data.data.length < 10) {
            this.finishedText = '没有更多了';
            this.finished = true;
          }
          if (data.data.length === 0) {
            this.$toast('搜索不到哦！');
          }
          this.list = [...this.list, ...data.data];
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 上拉加载
    pullUp(e) {
      let scrollBottom =
        e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
      if (!this.finished && scrollBottom < 200 && this.loading) {
        this.loading = false;
        this.params.currentPage++;
        this.getList(this.params, () => (this.loading = true));
      }
    },
    // 下拉刷新
    onRefresh() {
      Object.assign(this.$data, this.$options.data());
      this.list = [];
      this.finished = false;
      this.getList(this.params, () => (this.refreshing = false));
    },
    // 是否完善
    isPerfect(val) {
      this.active = val;
      this.params.isPerfect = val;
      this.toggle = false;
      this.list = [];
      this.params.currentPage = 1;
      this.getList(this.params);
    },
  },
};
</script>

<style lang="less" scoped>
.shopManage {
  height: 100%;
  padding-top: 150px;

  // 搜索框
  .content_search {
    position: fixed;
    top: 88px;
    left: 0;
    width: 100%;
    height: 63px;
    padding: 13px 21px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f9f9fb;
    z-index: 9999;
    .van-search {
      padding: 0;
      flex: 1;
      height: 37px;
      /deep/.van-search__content {
        padding: 0;
        /deep/.van-cell {
          padding: 0 12px 0 0;
          display: flex;
          align-items: center;
          border-radius: 22px;
          width: 250px;
          height: 37px;
          background-color: #fff;
        }
      }
      /deep/.van-search__action {
        padding: 0 14px;
        color: #46479e;
      }
    }
    img {
      display: block;
      width: 22px;
      height: 16px;
    }
  }
  // 弹出框
  .popup {
    position: fixed;
    width: 100%;
    height: 144px;
    left: 0;
    top: 150px;
    background-color: #fff;
    z-index: 2;
    div:first-child {
      position: relative;
      height: 144px;
      padding: 12px 0 0 21px;
      background-color: #fff;
      z-index: 4;
      p {
        font-size: 14px;
      }
      .button-container {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        width: 160px;
        button {
          width: 69px;
          height: 26px;
          border: 1px solid #46479e;
          border-radius: 7px;
          background-color: #fff;
          color: #46479e;
          font-size: 12px;
          &.active {
            background-color: #46479e;
            color: #fff;
          }
        }
      }
    }
    .mask {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 540px;
      background-color: black;
      opacity: 0.2;
      // z-index: 2;
    }
  }
  // 列表
  .items {
    height: calc(100vh - 150px);
    background-color: #f9f9fb;
    .item {
      position: relative;
      display: flex;
      padding: 14px 15px 52px 14px;
      background-color: #fff;
      margin-bottom: 20px;
      img {
        display: block;
        width: 68px;
        height: 68px;
        margin-right: 20px;
        border: 1px solid #cccccc;
      }
      .discription {
        font-size: 12px;
        color: #333333;
        padding-top: 7px;
        .name {
          font-size: 16px;
          color: #46479e;
          margin-bottom: 11px;
          font-weight: bold;
        }
      }
      .button-container {
        position: absolute;
        right: 0;
        bottom: 12px;
        display: flex;
        justify-content: space-around;
        width: 100%;
        div {
          width: 70px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          font-size: 12px;
          border-radius: 15px;
          border: 1px solid #46479e;
          color: #46479e;
        }
      }
    }
    .nomore {
      padding: 15px 0;
      text-align: center;
      font-size: 14px;
      color: #cccccc;
    }
    .item:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
