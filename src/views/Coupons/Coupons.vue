<template>
  <!-- 优惠券 -->
  <div class="coupons">
    <my-header :lefticon="true" @click="$router.push('/home/index')"
      >优惠券</my-header
    >
    <!-- 切换 -->
    <div class="menu">
      <div>
        <div class="current" :class="{ active: active }" @click="toggle(true)">
          可用优惠券
        </div>
      </div>
      <div>
        <div
          class="overdue"
          :class="{ active: !active }"
          @click="toggle(false)"
        >
          下架优惠券
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="items hide-scroll" ref="items" @scroll="handleScroll">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        success-text="刷新成功"
      >
        <div class="item" v-for="item in list" :key="item.id">
          <div class="description">
            <div class="left">
              <div class="name">{{ item.name }}</div>
              <p>可用门店：{{}}</p>
              <p>
                有效期：
                <span>{{ item.startDate | timeFilter('YYYY.MM.DD') }}</span>
                -
                <span>{{ item.overdueDate | timeFilter('YYYY.MM.DD') }}</span>
              </p>
            </div>

            <div v-if="item.shelves" class="sold-out"></div>
            <div class="line"></div>
          </div>
          <div class="mask" v-if="item.shelves"></div>
        </div>
        <div class="nomore" v-show="finished">没有更多了</div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { get } from '@/utils/request';

export default {
  name: 'coupons',
  data() {
    return {
      active: true,
      isLoading: false,
      loading: true,
      finished: false,
      list: [],
      img: require('@/assets/images/0shopmanage.png'),
      params: {
        currentPage: 1,
        pageSize: 10,
        shelves: false,
      },
    };
  },
  mounted() {
    this.getList(this.params);
  },
  methods: {
    // 切换
    toggle(value) {
      this.params.currentPage = 1;
      this.active = value;
      if (value) {
        this.params.shelves = false;
      } else {
        this.params.shelves = true;
      }
      this.finished = false;
      this.getList(this.params);
      this.$nextTick(() => (this.$refs.items.scrollTop = 0));
    },
    // 下拉
    async onRefresh() {
      this.params.currentPage = 1;
      this.finished = false;
      this.getList(this.params, false, () => (this.isLoading = false));
    },

    // 获取优惠券数据
    async getList(params, mark, callback) {
      try {
        let { code, data } = await get(`/api/coupon/info/coupon`, this.params);
        if (code === '200') {
          if (data.data.length < 10) {
            this.finished = true;
          }
          if (mark) {
            this.list = [...this.list, ...data.data];
          } else {
            this.list = data.data;
          }
          callback && callback();
          console.log('this', this.list);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 监听滚动条
    handleScroll(e) {
      let scrollBottom =
        e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
      if (!this.finished && scrollBottom < 200 && this.loading) {
        this.loading = false;
        this.params.currentPage++;
        this.getList(this.params, true, () => (this.loading = true));
      }
    },
  },
};
</script>

<style lang="less" scoped>
.coupons {
  height: 100%;
  padding: 148px 0 10px 0;
  position: relative;
  background-color: #f9f9fb;
  .my-header {
    box-shadow: 1px 1px 6px #f3f3f9;
  }
  // 切换
  .menu {
    position: fixed;
    left: 0;
    top: 88px;
    width: 100%;
    padding-bottom: 10px;
    background-color: #fff;
    display: flex;
    z-index: 999;
    div {
      flex: 1;
      .current,
      .overdue {
        width: 93px;
        margin: 0 auto;
        text-align: center;
        font-size: 18px;
        height: 40px;
        line-height: 40px;
        color: #000000;
        &.active {
          color: #4849a1;
          font-weight: bold;
          border-bottom: 3px solid #4849a1;
        }
      }
    }
  }
  //   列表
  .items {
    height: calc(100vh - 148px);
    padding: 10px 24px 10px 27px;

    .item {
      width: 100%;
      height: 100px;
      margin-bottom: 15px;
      padding: 0 20px;
      background-color: #4849a1;
      border-radius: 7px;
      position: relative;
      .mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #cccccc;
        opacity: 0.5;
      }
      .description {
        color: #ffffff;
        .left {
          padding-top: 15px;
          .name {
            margin-bottom: 6px;
            font-weight: bold;
            font-size: 16px;
          }

          p:nth-child(3) {
            width: 220px;
            position: absolute;
            bottom: 6px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 12px;
          }
        }
        .sold-out {
          position: absolute;
          right: 11px;
          top: 10px;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: url('../../assets/images/zu177.png') no-repeat center;
          background-size: 100% 100%;
        }
      }
      &::before {
        content: '';
        width: 14px;
        height: 14px;
        background-color: #ffffff;
        border-radius: 50%;
        position: absolute;
        bottom: 18px;
        left: -7px;
      }
      &::after {
        content: '';
        width: 14px;
        height: 14px;
        background-color: #ffffff;
        border-radius: 50%;
        position: absolute;
        bottom: 18px;
        right: -7px;
      }
      .line {
        position: absolute;
        bottom: 25px;
        right: 0;
        width: 100%;
        height: 1px;
        border-bottom: 0.1px dashed #ffffff;
      }
    }
    .nomore {
      height: 30px;
      text-align: center;
      color: #cccccc;
      font-size: 16px;
      line-height: 30px;
    }
  }
}
</style>
