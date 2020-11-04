<template>
  <!-- 参与情况 -->
  <div class="join-state hide-scroll">
    <my-header :lefticon="true" @click="$router.push('/shopmanage')"
      >套餐管理</my-header
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
        @cancel="params.search = ''"
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
        <div class="status">
          <p>参与状态：</p>
          <div class="button-container">
            <button :class="{ active: params.status === 3 }" @click="select(3)">
              审核中
            </button>
            <button :class="{ active: params.status === 1 }" @click="select(1)">
              通过
            </button>
            <button :class="{ active: params.status === 2 }" @click="select(2)">
              驳回
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
          <div class="setmeal-name">
            <div class="label">套餐名称</div>
            <div class="content">{{ item['package_name'] }}</div>
          </div>
          <div class="up-service">
            <div class="label">增值服务名称</div>
            <div class="content">{{ item['vas_name'] }}</div>
          </div>
          <div class="master">
            <div class="label">发行方</div>
            <div class="content">{{ item.publisher }}</div>
          </div>
          <div class="state">
            <div class="label">审核状态</div>
            <div
              class="content"
              :class="{
                success: item.storeStatus === 1,
                fail: item.storeStatus === 2,
              }"
            >
              {{ item.storeStatus | handleStatus }}
              <div
                v-show="item.storeStatus === 2"
                class="buttons"
                @click="reason()"
              >
                驳回原因
              </div>
            </div>
          </div>
        </div>
        <div v-show="finished" class="nomore">{{ finishedText }}</div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { get } from '@/utils/request';

export default {
  name: 'joinstate',
  data() {
    return {
      defaultImg: require('@/assets/images/huluwa.jpg'),
      activeIcon: require('@/assets/images/lujing505.png'),
      inactiveIcon: require('@/assets/images/lujing503.png'),
      list: [],
      refreshing: false,
      finished: false,
      finishedText: '没有更多了',
      loading: true,
      checked: 0,
      params: {
        storeId: '',
        currentPage: 1,
        pageSize: 10,
        status: '',
        storeName: '',
      },
      // 显隐弹出框
      toggle: false,
    };
  },
  activated() {
    this.params.storeId = this.$route.query.id;
    this.getList(this.params);
  },
  methods: {
    // 请求数据
    async getList(params, callback) {
      try {
        let res = await get(`/api/packageDetailStoreId`, params);
        console.log(res);

        let { code, data } = res;
        if (code === '200') {
          if (data.data.length < 10) {
            this.finishedText = '没有更多了';
            this.finished = true;
          }
          this.list = [];
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
      this.params.currentPage = 1;
      try {
        let res = await get('/api/packageDetailStoreId', this.params);
        let { code, data } = res;
        if (code === '200') {
          this.list = [];
          if (data.data.length < 10) {
            this.finishedText = '没有更多了';
            this.finished = true;
          }
          if (data.data.length === 0) {
            this.$toast('搜索不到哦！');
            return;
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
      this.params.currentPage = 1;
      this.params.status = '';
      this.list = [];
      this.finished = false;
      this.getList(this.params, () => (this.refreshing = false));
    },
    // 筛选
    select(val) {
      this.params.status = val;
      this.params.currentPage = 1;
      this.getList(this.params);
      this.toggle = false;
    },
    // 驳回原因
    reason(val) {
      this.$dialog({ title: '驳回原因', message: '提示' });
    },
  },
  filters: {
    handleStatus(val) {
      let msg = '';
      switch (val) {
        case 1:
          msg = '通过';
          break;
        case 2:
          msg = '驳回';
          break;
        default:
          msg = '审核中';
      }
      return msg;
    },
  },
};
</script>

<style lang="less" scoped>
.join-state {
  height: 100%;
  padding-top: 146px;

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
    .status {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 13px 20px 20px;
      background-color: #ffffff;
      z-index: 4;
      p {
        font-size: 14px;
      }
      .button-container {
        padding: 10px 0;
        display: flex;
        button {
          width: 80px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border: 1px solid #46479e;
          border-radius: 10px;
          background-color: #fff;
          color: #46479e;
          font-size: 12px;
          margin-right: 20px;
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
    height: calc(100vh - 146px);
    background-color: #f9f9fb;
    .item {
      padding: 0 20px;
      background-color: #fff;
      margin-bottom: 7px;
      font-size: 15px;

      .setmeal-name,
      .up-service,
      .master,
      .state {
        display: flex;
        align-items: center;
        padding: 14px 0;
        border-bottom: 1px solid #f9f9fb;
        .label {
          width: 130px;
        }
        .content {
          color: black;
          &.success {
            color: #099533;
          }
          &.fail {
            color: red;
          }
        }
      }
      .setmeal-name {
        color: #46479e;
        .content {
          color: #46479e;
        }
      }
      .state {
        position: relative;
        .buttons {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 70px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          background-color: #46479e;
          color: #ffffff;
          font-size: 12px;
          border-radius: 15px;
        }
      }
    }
    .nomore {
      padding: 15px 0;
      text-align: center;
      font-size: 14px;
      color: #cccccc;
    }
  }
}
</style>
