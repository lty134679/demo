<template>
  <div class="join-shop hide-scroll">
    <my-header :lefticon="true" @click="back">参与门店</my-header>
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
      <div v-show="toggle" class="popup" @click.self="toggle = false">
        <div class="name">
          <p>套餐名称:</p>
          <div class="select">
            <button
              :class="{ active: params.type.wash }"
              @click="params.type.wash = !params.type.wash"
            >
              洗车套餐
            </button>
            <button
              :class="{ active: params.type.upkeep }"
              @click="params.type.upkeep = !params.type.upkeep"
            >
              保养套餐
            </button>
          </div>
        </div>
        <div class="status">
          <p>参与状态：</p>
          <div class="select">
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
            :src="item.urls.length > 0 ? item.urls[0].url : defaultImg"
            alt
          />

          <div class="discription">
            <div class="name">{{ item['store_name'] }}</div>
            <div>套餐名称：{{ item['package_name'] }}</div>
            <div
              :class="{
                success: item['store_status'] === 1,
                fail: item['store_status'] === 2,
              }"
            >
              审核信息：{{ item['store_status'] | handleStatus }}
            </div>
          </div>

          <div
            v-show="item['store_status'] === 2"
            class="button-container"
            @click="reason(1)"
          >
            驳回原因
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
  name: 'joinshop',
  data() {
    return {
      defaultImg: require('@/assets/images/huluwa.jpg'),
      list: [],
      refreshing: false,
      finished: false,
      finishedText: '没有更多了',
      loading: true,
      checked: 0,
      params: {
        currentPage: 1,
        pageSize: 10,
        status: '',
        type: {
          wash: false,
          upkeep: false,
        },
        storeName: '',
      },
      vasId: '', //增值服务id
      // 显隐弹出框
      toggle: false,
    };
  },
  activated() {
    if (this.$route.params.vasId) {
      this.vasId = this.$route.params.vasId;
    } else {
    }
    this.list = [];
    this.getList(this.params);
  },
  deactivated() {
    Object.assign(this.$data.params, this.$options.data().params);
  },
  methods: {
    // 请求数据
    async getList(params, callback) {
      try {
        let res = await get(`/api/storeDetailByVasId`, {
          ...params,
          vasId: this.vasId,
        });
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
    //获取套餐列表
    async getPackge(val) {
      try {
        let res = await get(`/api/${this.vasId}/packageDetailVasId`);
        console.log(res);
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
        let res = await get('/api/store-info/storeInfoList', {
          vasid: this.vasId,
          ...this.params,
        });
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
      this.params.currentPage = 1;
      this.params.status = '';
      this.list = [];
      this.finished = false;
      this.getList(this.params, () => (this.refreshing = false));
    },
    // 筛选
    select(val) {
      this.params.status = val;
      this.toggle = false;
      this.list = [];
      this.getList();
    },
    // 顶部左箭头返回
    back() {
      if (this.$route.params.vasId) {
        this.$router.push('/appreciation');
      } else {
        this.$router.push('/setmeal');
      }
    },
    // 驳回原因
    reason(val) {
      this.$dialog({
        title: '驳回原因',
        message: '该店存在违规行为',
      });
    },
  },
  computed: {
    // 处理套餐类型
    hanleType() {
      if (this.params.type.wash && this.params.type.upkeep) {
        return ['洗车套餐', '保养套餐'];
      }
      if (this.params.type.wash && !this.params.type.upkeep) {
        return ['洗车套餐'];
      }
      if (this.params.type.upkeep && !this.params.type.wash) {
        return ['保养套餐'];
      }
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
  watch: {
    hanleType(newval) {
      if (newval) {
        this.getPackge(newval);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.join-shop {
  height: 100%;
  padding-top: 151px;

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
    height: 100vh;
    left: 0;
    top: 150px;
    background-color: #e0e0e0;
    z-index: 2;
    .name,
    .status {
      padding: 12px 0 0 21px;
      background-color: #fff;
      z-index: 4;
      p {
        font-size: 14px;
      }
      .select {
        padding: 10px 0;
        display: flex;
        button {
          padding: 3px 10px;
          border: 1px solid #46479e;
          border-radius: 7px;
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
    .status {
      padding-left: 21px;
    }
  }
  // 列表
  .items {
    height: calc(100vh - 151px);
    background-color: #f9f9fb;
    .item {
      position: relative;
      display: flex;
      padding: 25px;
      background-color: #fff;
      margin-bottom: 7px;
      img {
        width: 68px;
        height: 68px;
        margin-right: 20px;
        border: 1px solid #cccccc;
      }
      .discription {
        font-size: 12px;
        color: #333333;
        div {
          margin-bottom: 6px;
          &.name {
            font-size: 16px;
            color: #46479e;
            margin-bottom: 14px;
            font-weight: bold;
          }
          &.success {
            color: #1abc9c;
          }
          &.fail {
            color: red;
          }
        }
        div:last-child {
          margin: 0;
        }
      }
      .button-container {
        position: absolute;
        right: 15px;
        bottom: 12px;
        width: 90px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 12px;
        border-radius: 15px;
        color: #ffffff;
        background-color: #46479e;
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
