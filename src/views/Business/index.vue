<template>
  <!-- 商户管理 -->
  <div class="business-manage">
    <my-header :lefticon="true" @click="route">{{ title }}</my-header>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model="value"
        shape="round"
        background="#f9f9fb"
        :clearable="false"
        show-action
        left-icon="none"
        placeholder="请输入商户名称"
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
        <div class="item" v-for="(item, index) in list" :key="index">
          <img
            :src="
              item.storePhotoUrlList ? item.storePhotoUrlList[0] : defaultImg
            "
            alt=""
          />
          <div class="name">{{ item.merchantName }}</div>
          <div class="button" @click="redirect(item)">
            {{ $route.params.mark ? text : '查看' }}
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
  name: 'businessmanage',
  data() {
    return {
      title: '商户管理',
      value: '',
      defaultImg: require('@/assets/images/xiulichang-1_2.png'),
      list: [],
      text: '确认',
      page: {
        currentPage: 1,
        pageSize: 20,
      },
      finished: false,
      loading: true,
      isLoading: false,
      finishedText: '没有更多了',
    };
  },
  mounted() {
    this.getList(this.page);
  },
  activated() {
    if (this.$route.params.mark) {
      this.title = '选择商户';
    } else {
      this.title = '商户管理';
    }
  },
  methods: {
    // 搜索
    async search() {
      if (this.value.trim() === '') {
        this.$toast('请输入商户名称');
        return;
      }
      this.finished = false;
      this.list = [];
      this.loading = false;
      this.page.currentPage = 1;
      try {
        let res = await get('/api/merchant-info/merchantInfoListExtension', {
          merchantName: this.value,
          ...this.page,
        });
        let { code, data } = res;
        if (code === '200') {
          if (data.data.length < 10) {
            this.finished = true;
            this.finishedText = '没有更多了';
          }
          if (data.data.length === 0) {
            this.finishedText = '暂无数据';
            this.$toast({
              message: '搜索不到哦',
              type: 'warning',
              duration: 1200,
            });
          }
          this.list = [...this.list, ...data.data];
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取商户数据
    async getList(params, callback) {
      try {
        let res = await get(
          '/api/merchant-info/merchantInfoListExtension',
          params
        );
        console.log(res);

        let { code, data } = res;
        if (code === '200') {
          if (data.data.length < 10) {
            this.finished = true;
            this.finishedText = '没有更多了';
          }
          this.list = [...this.list, ...data.data];
          callback && callback();
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 刷新
    onRefresh() {
      this.page.currentPage = 1;
      this.list = [];
      this.finished = false;
      this.getList({ merchantName: this.value, ...this.page }, () => {
        this.isLoading = false;
      });
    },
    // 加载
    pullUp(e) {
      let scrollBottom =
        e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
      if (!this.finished && scrollBottom < 200 && this.loading) {
        this.loading = false;
        this.page.currentPage++;
        this.getList(this.page, () => (this.loading = true));
      }
    },
    // 点击数据跳转
    redirect(val) {
      if (this.$route.params.mark === 'addshop') {
        this.$router.push({ name: 'addshop', params: { val } });
      } else if (this.$route.params.mark === 'editshop') {
        this.$router.push({ name: 'editshop', params: { val } });
      } else if (this.$route.params.mark === 'sign') {
        this.$router.push({ name: 'signcontract', params: { val } });
      } else if (this.$route.params.mark === 'editsign') {
        this.$router.push({ name: 'signedit', params: { val } });
      } else {
        this.$router.push({
          name: 'businessdetail',
          params: { val },
        });
      }
    },
    // 点击左上角跳转
    route() {
      if (this.$route.params.mark === 'addshop') {
        this.$router.push('/addshop');
      } else if (this.$route.params.mark === 'editshop') {
        this.$router.push('/editshop');
      } else if (this.$route.params.mark === 'sign') {
        this.$router.push('/signContract');
      } else if (this.$route.params.mark === 'editsign') {
        this.$router.push('/signedit');
      } else {
        this.$router.push('/home/index');
      }
    },
  },
};
</script>

<style lang="less" scoped>
.business-manage {
  padding-top: 150px;
  background-color: #f9f9fb;
  height: 100%;
  .my-header {
    box-shadow: 1px 1px 10px #ececf4;
  }
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
  //列表
  .items {
    height: calc(100vh - 150px);

    .item {
      background-color: #fff;
      margin-bottom: 10px;
      height: 46px;
      padding: 6px 15px 6px 21px;
      display: flex;
      align-items: center;
      img {
        width: 35px;
        height: 35px;
        border: 1px dashed #cccccc;
      }
      .name {
        padding-left: 14px;
        font-size: 15px;
        flex: 1;
      }
      .button {
        width: 70px;
        height: 28px;
        font-size: 10px;
        border: 1px solid #46479e;
        color: #ffffff;
        line-height: 28px;
        text-align: center;
        border-radius: 999px;
        background-color: #46479e;
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
