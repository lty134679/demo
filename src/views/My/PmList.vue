<template>
  <!-- 更多业绩 -->
  <div class="pm-list hide-scroll pdtop">
    <my-header :lefticon="true" @click="$router.push('/performance')"
      >{{ name }}的业绩</my-header
    >
    <!-- 门店列表 -->
    <div class="items hide-scroll" @scroll.passive="handleScroll">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        success-text="刷新成功"
      >
        <div
          class="item"
          v-for="(item, idx) in list"
          :key="item.id"
          @click="$router.push(`/storeinfo/${item.id}`)"
        >
          <div class="order">{{ idx + 1 }}</div>
          <div class="store-info">
            <img
              :src="
                item.storePhotoUrlList && item.storePhotoUrlList.length > 0
                  ? item.storePhotoUrlList[0]
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
      </van-pull-refresh>
      <div class="nomore" v-show="finished">没有更多了</div>
    </div>
  </div>
</template>

<script>
import { get } from '@/utils/request';
import { getLocal } from '@/utils/local';

export default {
  name: 'pmlist',
  pulldownId: '',
  pullupId: '',
  data() {
    return {
      defaultimg: require('@/assets/images/img-err.jpg'), //默认图片
      // 控制无数据
      finished: false,
      // 控制上拉加载是否提示
      loading: true,
      // 控制下拉刷新
      isLoading: false,
      list: [],
      page: {
        currentPage: 1,
        pageSize: 10,
      },
      operationalPeopleId: '',
      name: '我的',
    };
  },

  activated() {
    if (this.$route.query.id) {
      this.operationalPeopleId = this.$route.query.id;
      this.name = this.$route.query.name;
    } else {
      this.operationalPeopleId = getLocal('marketer_id');
      this.name = '我的';
    }
    this.page.currentPage = 1;
    this.list = [];
    this.getList({
      ...this.page,
      operationalPeopleId: this.operationalPeopleId,
    });
  },
  methods: {
    // 上拉加载
    handleScroll(e) {
      let scrollBottom =
        e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
      if (!this.finished && scrollBottom < 200 && this.loading) {
        this.loading = false;
        this.page.currentPage++;
        this.getList(this.page, () => (this.loading = true));
      }
    },
    // 下拉刷新
    onRefresh() {
      this.finished = false;
      this.list = [];
      this.page.currentPage = 1;
      this.getList(this.page, () => (this.isLoading = false));
    },
    //获取门店数据
    async getList(params, callBack) {
      try {
        let res = await get('/api/store-info/storeInfoListExtension', params);
        let { code, data } = res;
        console.log(res);

        if (code === '200') {
          if (data.data.length < 10) {
            console.log('111');

            this.finished = true;
          }
          this.list = [...this.list, ...data.data].sort(
            (a, b) => b.houseNumber - a.houseNumber
          );
        }
        callBack && callBack();
      } catch (err) {
        console.log(err);
      }
    },
  },
  beforeDestroy() {
    // 事件销毁前记得移除事件
    this.$event.$off('fromPerformance');
    clearTimeout(this.pullupId);
    clearTimeout(this.pulldownId);
  },
};
</script>

<style lang="less" scoped>
// 我的业绩
.pm-list {
  height: 100%;
  background-color: #f9f9fb;
  .my-header {
    box-shadow: 1px 1px 10px #cccccc;
  }
  .items {
    height: calc(100vh - 90px);
    margin-top: 5px;

    .item {
      margin-bottom: 9px;
      box-shadow: 0px 3px 6px rgba(218, 218, 220, 1);
      display: flex;
      align-items: center;
      background-color: #ffffff;
      padding: 10px 12px 10px 0;
      .order {
        width: 50px;
        font-size: 30px;
        color: #4849a1;
        text-align: center;
      }
      .store-info {
        display: flex;
        position: relative;
        flex: 1;
        img {
          width: 65px;
          height: 61px;
          border: 1px solid #cccccc;
          margin: 2px 10px 0 2px;
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
    .nomore {
      height: 50px;
      color: #cccccc;
      font-size: 15px;
      text-align: center;
      line-height: 50px;
    }
  }
}
</style>
