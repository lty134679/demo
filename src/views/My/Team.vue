<template>
  <!-- 我的组员 -->
  <div class="team pdtop">
    <my-header :lefticon="true" @click="$router.push('/home/personal')"
      >我的组员</my-header
    >
    <!-- 看板 -->
    <div class="panel">
      <div class="item first">
        <div class="nums">{{ storeCount }}</div>
        <div class="text">引入门店</div>
      </div>
      <div class="item">
        <div class="nums">2144</div>
        <div class="text">门店活动</div>
      </div>
    </div>
    <!-- 组员列表 -->
    <div class="items">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        success-text="刷新成功"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          offset="30"
          :immediate-check="false"
        >
          <div
            class="item"
            v-for="item in list"
            :key="item.id"
            @click="
              $router.push({
                path: '/performance',
                query: { item, mark: 'team' },
              })
            "
          >
            <img
              :src="
                item.headPhotoUrl && item.headPhotoUrl.length > 0
                  ? item.headPhotoUrl[0]
                  : defaultImg
              "
              alt=""
            />
            <div class="description">
              <div class="name">{{ item.name }}</div>
              <p>引进门店： {{ item.introduceStore }}个</p>
              <p>运营门店： {{ item.operatingStore }}个</p>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { get } from '@/utils/request';

export default {
  name: 'team',
  mounted() {
    this.id = this.$route.query.id;
    this.getList(this.id, { ...this.page });
  },
  data() {
    return {
      isLoading: false,
      loading: false,
      finished: false,
      list: [],
      defaultImg: require('@/assets/images/youhuiquan2.png'),
      page: {
        currenPage: 1,
        pageSize: 10,
      },
      id: '',
      storeCount: '',
    };
  },
  methods: {
    // 刷新
    onRefresh() {
      this.page.currenPage = 1;
      this.list = [];
      this.getList(this.id, { ...this.page }, () => {
        this.isLoading = false;
      });
    },
    //加载
    onLoad() {
      this.page.currenPage++;
      this.finished = false;
      this.getList(this.id, { ...this.page }, () => {
        this.loading = false;
      });
    },
    //获取数据
    async getList(id, params, callback) {
      try {
        let { data, code } = await get(
          `/api/marketer-info/${id}/groupMembers`,
          params
        );
        if (code === '200') {
          if (data.marketers.length < 10) {
            this.finished = true;
          }
          this.list = [...this.list, ...data.marketers.data].sort(
            (a, b) => b.introduceStore - a.introduceStore
          );
          this.storeCount = data.storeCount;
          callback && callback();
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.team {
  height: 100%;
  padding-bottom: 92px;
  background-color: #f9f9fb;
  .my-header {
    background-color: #4849a1;
    color: #ffffff;
    border: none;
    box-shadow: none;
  }
  // 看板
  .panel {
    height: 120px;
    display: flex;
    background-color: #4849a1;
    color: #ffffff;
    .item {
      flex: 1;
      padding-top: 20px;
      position: relative;
      .nums,
      .text {
        text-align: center;
        font-size: 14px;
      }
      .nums {
        margin-bottom: 8px;
        font-size: 46px;
        font-weight: bold;
      }
    }
    .first::after {
      content: '';
      width: 0.5px;
      height: 82px;
      background-color: #ffffff;
      position: absolute;
      right: 0;
      top: 15px;
    }
  }
  // 组员列表
  .items {
    margin-top: 17px;
    padding-bottom: 92px;
    .item {
      display: flex;
      background-color: #ffffff;
      align-items: center;
      padding: 10px 20px;
      margin-bottom: 7px;
      img {
        display: block;
        width: 55px;
        height: 55px;
        border-radius: 50%;
      }
      .description {
        flex: 1;
        padding-left: 17px;
        .name {
          padding: 7px 0;
          font-size: 14px;
        }
        p {
          font-size: 12px;
        }
      }
      &:first-of-type {
        border-top: none;
      }
    }
  }
}
</style>
