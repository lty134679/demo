<template>
  <!-- 签约管理 -->
  <div class="sign-manage hide-scroll">
    <my-header :lefticon="true" @click="$router.push('/home/index')"
      >签约管理</my-header
    >
    <!-- 搜索 -->
    <van-search
      v-model="params.merchantName"
      shape="round"
      background="#f9f9fb"
      show-action
      :clearable="false"
      left-icon="none"
      placeholder="请输入商户名称"
      @search="search"
      @cancel="merchantName = ''"
    >
      <svg slot="right-icon" class="icon" aria-hidden="true" @click="search">
        <use xlink:href="#icon-fangdajing"></use>
      </svg>
    </van-search>

    <!-- 列表 -->
    <div class="items hide-scroll" @scroll="handleScoll">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        success-text="刷新成功"
      >
        <div class="item" v-for="(item, index) in list" :key="item.id">
          <div class="info">
            <img src="@/assets/images/changchong.jpg" alt="" />
            <div class="description">
              <div class="name">{{ item.merchantShorterName }}</div>
              <div>信息完善：{{ item.isPerfect ? '已完善' : '未完善' }}</div>
              <div class="statu">
                签约状态：<span
                  :class="{
                    success: item.contractStatus === 5,
                    fail: item.contractStatus === 3,
                  }"
                  >{{ item.contractStatus | handleStatus }}</span
                >
              </div>
            </div>
          </div>
          <div class="button" v-show="item.contractStatus !== 3">
            <div
              class="edit"
              @click="
                $router.push({ path: '/signedit', query: { id: item.id } })
              "
            >
              编辑
            </div>
            <div
              class="read-only"
              @click="
                $router.push({
                  path: '/signdetail',
                  query: { id: item.id },
                })
              "
            >
              查看
            </div>
          </div>

          <div
            class="reason"
            v-show="item.contractStatus === 3"
            @click="$toast('信息有误')"
          >
            驳回原因
          </div>
        </div>
        <div class="no-more" v-show="finished">{{ finishedTxt }}</div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { get } from '@/utils/request';
import { getLocal } from '@/utils/local';

export default {
  name: 'signmanage',
  data() {
    return {
      isLoading: false,
      loading: true,
      finished: false,
      finishedTxt: '没有更多了',
      list: [],
      params: {
        currentPage: 1,
        pageSize: 10,
        operationalPeopleId: getLocal('marketer_id'),
        merchantName: '',
      },
    };
  },
  activated() {
    this.list = [];
    this.params.currentPage = 1;
    this.getList();
  },
  methods: {
    //   搜索
    search() {
      if (!this.params.merchantName.trim()) {
        this.params.merchantName = '';
        return this.$toast('关键字不能为空');
      }
      this.params.currentPage = 1;
      this.list = [];
      this.getList();
    },
    //获取页面账号列表
    async getList(params, callback) {
      try {
        let res = await get(
          '/api/merchant-info/merchantInfoListExtension',
          this.params
        );
        console.log(res);
        if (res.code == '200') {
          if (res.data.data.length < 10) {
            this.finished = true;
            if (res.data.data.length === 0) {
              this.finishedTxt = '暂无数据';
            }
          }

          this.list = [...this.list, ...res.data.data];
          callback && callback();
        }
      } catch (err) {
        console.log(err);
      }
    },
    //下拉
    onRefresh() {
      this.params.currentPage = 1;
      this.list = [];
      this.finished = false;
      this.getList(this.params, () => (this.isLoading = false));
    },
    //上拉加载
    handleScoll(e) {
      let scrollBottom =
        e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
      if (!this.finished && scrollBottom < 200 && this.loading) {
        this.loading = false;
        this.params.currentPage++;
        this.getList(this.params, () => (this.loading = true));
      }
    },
  },
  filters: {
    //签约状态
    handleStatus(val) {
      let msg = '';
      switch (val) {
        case 1:
          msg = '全部';
          break;
        case 2:
          msg = '审核中';
          break;
        case 3:
          msg = '驳回';
          break;
        case 4:
          msg = '待签约';
          break;
        default:
          msg = '签约成功';
      }
      return msg;
    },
  },
};
</script>

<style lang="less" scoped>
.sign-manage {
  padding-top: 152px;
  background-color: #f9f9fb;
  height: 100%;

  // 搜索
  .van-search {
    position: fixed;
    top: 87px;
    left: 0;
    width: 100%;
    height: 65px;

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
  //列表
  .items {
    height: calc(100vh - 152px);

    .item {
      position: relative;
      padding: 10px 20px 7px 20px;
      background-color: #fff;
      margin-bottom: 7px;
      .info {
        display: flex;
        img {
          display: block;
          width: 35px;
          height: 35px;
          border: 1px dashed #cccccc;
          margin-right: 15px;
        }
        .description {
          font-size: 10px;
          color: black;
          .name {
            color: #46479e;
            font-size: 16px;
            margin-bottom: 10px;
          }
          div:last-child {
            margin-top: 5px;
          }
          .statu {
            span {
              &.success {
                color: green;
              }
              &.fail {
                color: red;
              }
            }
          }
        }
      }
      // 按钮
      .button {
        position: absolute;
        right: 15px;
        bottom: 9px;
        display: flex;
        div {
          flex: 1;
          padding: 2px 15px;
          border: 1px solid #46479e;
          font-size: 10px;
          border-radius: 11px;
          color: #ffffff;
          background-color: #46479e;
        }
        div:first-child {
          margin-right: 7px;
        }
      }
      .reason {
        position: absolute;
        right: 15px;
        bottom: 9px;
        padding: 2px 10px;
        border: 1px solid #46479e;
        font-size: 10px;
        border-radius: 11px;
        color: #ffffff;
        background-color: #46479e;
      }
    }
    .no-more {
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 16px;
      color: #cccccc;
    }
  }
}
</style>
