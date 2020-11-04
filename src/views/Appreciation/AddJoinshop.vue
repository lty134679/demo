<template>
  <!-- 添加参与门店 -->
  <div class="add-joinshop hide-scroll ">
    <my-header :lefticon="true" @click="$router.push('/setmeal')"
      >参与门店</my-header
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
        <div class="perfect">
          <p>信息完善</p>
          <div class="select">
            <button
              :class="{ active: params.perfect === 1 }"
              @click="select(1)"
            >
              已完善
            </button>
            <button
              :class="{ active: params.perfect === 0 }"
              @click="select(0)"
            >
              未完善
            </button>
          </div>
        </div>
        <div class="mask" @click="toggle = !toggle"></div>
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
            <div class="name">{{ item.storeName }}</div>
            <div class="perfect">
              信息完善：{{ item.isPerfect ? '已完善' : '未完善' }}
            </div>
          </div>
          <div class="ischeck" @click="item.isSelect = !item.isSelect">
            <img :src="item.isSelect ? activeIcon : inactiveIcon" alt="" />
          </div>
        </div>
      </van-pull-refresh>
      <div v-show="finished" class="nomore">{{ finishedText }}</div>
    </div>
    <!-- 提交 -->
    <div class="button-container">
      <van-button @click="submit">
        立即参与
      </van-button>
    </div>
  </div>
</template>

<script>
import { get, put } from '@/utils/request';

export default {
  name: 'addjoinshop',
  data() {
    return {
      defaultImg: require('@/assets/images/huluwa.jpg'),
      activeIcon: require('@/assets/images/lujing505_2.png'),
      inactiveIcon: require('@/assets/images/lujing503_2.png'),
      list: [],
      refreshing: false,
      finished: false,
      finishedText: '没有更多了',
      loading: true,
      checked: 0,
      params: {
        currentPage: 1,
        pageSize: 10,
        packageId: 5,
        perfect: '',
        storeName: '',
        vasId: '', //增值服务id
      },
      // 显隐弹出框
      toggle: false,
    };
  },
  activated() {
    if (this.$route.params.packageId) {
      this.params.packageId = this.$route.params.packageId;
    }
    this.list = [];
    this.getList(this.params);
  },
  methods: {
    // 请求数据
    async getList(params, callback) {
      console.log(params.packageId);

      try {
        let res = await get(
          `/api/${this.params.packageId}/${2}/storeIdDetailPackage`,
          params
        );
        console.log(res);

        let { code, data } = res;
        if (code === '200') {
          if (data.data.length < 10) {
            this.finishedText = '没有更多了';
            this.finished = true;
            if (data.data.length === 0) {
              this.$toast('搜索不到哦！');
              return;
            }
          }

          this.list = [...this.list, ...data.data];
          this.list.forEach((item) => {
            this.$set(item, 'isSelect', false);
          });
          console.log(this.list);

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
      this.getList(this.params);
    },
    // 上拉加载
    pullUp(e) {
      // 没有分页
      // let scrollBottom =
      //   e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
      // if (!this.finished && scrollBottom < 200 && this.loading) {
      //   this.loading = false;
      //   this.params.currentPage++;
      //   this.getList(this.params, () => (this.loading = true));
      // }
    },
    // 下拉刷新
    onRefresh() {
      this.params.currentPage = 1;
      this.list = [];
      this.finished = false;
      this.getList(this.params, () => (this.refreshing = false));
    },
    // 筛选
    select(val) {
      this.params.perfect = val;
      this.toggle = false;
    },
    // 提交
    submit() {
      let arr = [];
      this.list.forEach((item) => {
        if (item.isSelect) {
          arr.push(item.id);
        }
      });
      if (arr.length === 0) {
        return this.$toast('请选择要参与的门店');
      }

      this.$dialog
        .confirm({
          title: `已选择${arr.length}家门店，是否确认参与？`,
          message: '确认参与后不可取消',
        })
        .then(async () => {
          let res = await put(`/api/storeInPackage`, {
            packageIds: [this.params.packageId],
            storeIds: arr,
          });
          this.$router.push({
            name: 'feedback',
            params: { mark: 'add', res },
          });
        })
        .catch((err) => {
          if (err !== 'cancel') {
            console.log(err);
          } else {
            this.$toast('取消成功');
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.add-joinshop {
  height: 100%;
  padding-top: 151px;
  padding-bottom: 60px;

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
    height: 110px;
    left: 0;
    top: 151px;
    background-color: #fff;
    z-index: 2;
    .perfect {
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
      padding: 0 0 63px 21px;
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
    height: calc(100vh - 211px);
    background-color: #f9f9fb;
    .item {
      position: relative;
      display: flex;
      padding: 20px 27px;
      background-color: #fff;
      margin-bottom: 7px;
      img {
        display: block;
        width: 68px;
        height: 68px;
        margin-right: 20px;
        border: 1px solid #cccccc;
      }
      .discription {
        font-size: 12px;
        color: #666666;
        padding-top: 12px;
        .name {
          font-size: 16px;
          color: #46479e;
          margin-bottom: 6px;
          font-weight: bold;
        }
      }
      .ischeck {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        border: 1px dashed #cccccc;
        width: 24px;
        height: 24px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
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
  // 提交
  .button-container {
    padding: 8px 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #f9f9fb;
    .van-button {
      width: 335px;
      height: 44px;
      background-color: #4849a1;
      color: #ffffff;
      font-size: 16px;
      border-radius: 25px;
    }
  }
}
</style>
