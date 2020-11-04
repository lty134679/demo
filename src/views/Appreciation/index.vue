<template>
  <!-- 增值服务 -->
  <div class="appreciation hide-scroll">
    <my-header :lefticon="true" @click="back">增值服务</my-header>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model="params.searchKey"
        shape="round"
        background="#f9f9fb"
        :clearable="false"
        show-action
        left-icon="none"
        placeholder="请输入商品关键词或用户名"
        @search="search"
        @cancel="value = ''"
      >
        <svg slot="right-icon" class="icon" aria-hidden="true" @click="search">
          <use xlink:href="#icon-fangdajing"></use>
        </svg>
      </van-search>
    </form>
    <!-- 列表 -->
    <div class="items hide-scroll" @scroll.passive="pullUp">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        success-text="刷新成功"
      >
        <div class="item" v-for="item in list" :key="item.id">
          <div class="top">
            <div class="label">增值服务名称</div>
            <div class="content">{{ item.vasName }}</div>
          </div>
          <div class="bottom">
            <div class="label">发行方</div>
            <div class="content">{{ item.publisher }}</div>
          </div>
          <div class="buttons">
            <div
              v-show="!params.storeId"
              @click="
                $router.push({ name: 'joinshop', params: { vasId: item.id } })
              "
            >
              参与门店
            </div>
            <div
              @click="
                $router.push({
                  name: 'setmeal',
                  params: {
                    storeId: params.storeId,
                    vasId: item.id,
                    vasName: item.vasName,
                  },
                })
              "
            >
              查看套餐
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
  name: 'appreciation',
  data() {
    return {
      defaultImg: require('@/assets/images/xiulichang-1_2.png'),
      list: [],
      params: {
        searchKey: '',
        currentPage: 1,
        pageSize: 10,
        storeId: '',
      },
      finished: false,
      loading: true,
      isLoading: false,
      finishedText: '没有更多了',
    };
  },

  activated() {
    this.getList();
  },
  methods: {
    // 搜索
    search() {
      let res = this.params.searchKey.trim();
      if (!res) {
        this.$toast('请输入搜索关键字');
        return;
      }
      this.getList(this.params);
    },
    //获取数据
    async getList(params, callback) {
      try {
        let res = await get(`/api/vasDetail`, params);
        console.log(res);
        let { code, data } = res.data;
        if (code === '200') {
          if (data.data.length < 10) {
            this.finished = true;
            this.finishedText = '没有更多了';
            if (data.data.length === 0) {
              this.finishedText = '暂无数据';
            }
          }
          this.list = data.data;
          callback && callback();
        }
      } catch (err) {
        console.log(err);
      }
    },

    onRefresh() {
      this.params.currentPage = 1;
      this.list = [];
      this.finished = false;
      this.getList(this.params, () => {
        this.isLoading = false;
      });
    },
    pullUp(e) {
      let scrollBottom =
        e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
      if (!this.finished && scrollBottom < 200 && this.loading) {
        this.loading = false;
        this.params.currentPage++;
        this.getList(this.params, () => (this.loading = true));
      }
    },
    back() {
      if (this.params.storeId) {
        this.$router.push('/shopManage');
      } else {
        this.$router.push('/home/index');
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.name === 'shopmanage') {
        vm.params.storeId = vm.$route.query.storeId;
      }
      if (from.name === 'index') {
        vm.params.storeId = '';
      }
    });
  },
};
</script>

<style lang="less" scoped>
.appreciation {
  height: 100%;
  padding-top: 146px;
  background-color: #f9f9fb;

  //搜索框
  form {
    position: fixed;
    left: 0;
    top: 88px;
    width: 100%;
    height: 58px;
    .van-search {
      /deep/.van-search__content {
        background-color: #ffff;
        width: 303px;
        height: 37px;
        box-shadow: 1px 1px 2px #ffffff;
      }
      /deep/.van-search__action {
        color: #46479e;
        font-size: 12px;
      }
    }
  }
  //   列表
  .items {
    height: calc(100vh - 148px);
    .item {
      padding: 0 20px 45px;
      position: relative;
      margin-bottom: 7px;
      background-color: #fff;
      .top,
      .bottom {
        display: flex;
        padding: 14px 0;
        border-bottom: 1px solid #f9f9fb;
        .label {
          width: 132px;
          font-size: 15px;
          color: #46479e;
        }
        .content {
          font-size: 14px;
          color: #46479e;
        }
      }
      .bottom {
        .label {
          color: black;
        }
        .content {
          color: #a1a1a3;
        }
      }
      .buttons {
        position: absolute;
        right: 20px;
        bottom: 14px;
        display: flex;
        div:first-child {
          margin-right: 14px;
        }
        div {
          background-color: #46479e;
          padding: 3px 10px;
          font-size: 10px;
          border-radius: 7px;
          color: #ffffff;
        }
      }
    }
    .nomore {
      padding: 15px;
      font-size: 14px;
      color: #cccccc;
      text-align: center;
    }
  }
}
</style>
