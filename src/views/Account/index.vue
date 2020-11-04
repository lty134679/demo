<template>
  <!-- 账户管理 -->
  <div class="account-manage pdtop">
    <my-header :lefticon="true" @click="$router.push('/home/index')"
      >账户管理</my-header
    >
    <div class="content">
      <!-- 搜索框 -->
      <div class="content_search">
        <van-search
          v-model="searchMsg"
          placeholder="请输入账号"
          show-action
          :clearable="false"
          left-icon=""
          @search="search"
          @cancel="searchMsg = ''"
        >
          <svg
            slot="right-icon"
            class="icon"
            aria-hidden="true"
            @click="search"
          >
            <use xlink:href="#icon-fangdajing"></use>
          </svg>
        </van-search>
      </div>
      <div class="items hide-scroll" @scroll="handleScoll">
        <van-pull-refresh
          v-model="isLoading"
          @refresh="onRefresh"
          success-text="刷新成功"
        >
          <div class="item" v-for="(item, index) in list" :key="item.id">
            <ul>
              <li id="vendorName">
                <span> 账号：</span>
                {{ item.userName }}
              </li>
              <li>
                <span> 关联门店：</span>
                {{ item.stores }}
              </li>
              <li>
                <span> 账号状态：</span>
                {{ item.accountStatus == 1 ? '启用' : '禁用' }}
              </li>
              <li>
                <span> 创建时间：</span>
                {{ item.ctime | timeFilter('YYYY.MM.DD') }}
              </li>
            </ul>
            <div class="button">
              <div
                class="edit"
                @click="
                  $router.push({ path: '/editaccount', query: { id: item.id } })
                "
              >
                编辑
              </div>
              <div
                class="read-only"
                @click="
                  $router.push({
                    path: '/accountdetail',
                    query: { id: item.id },
                  })
                "
              >
                查看
              </div>
            </div>
          </div>
        </van-pull-refresh>
        <div class="no-more" v-show="finished">{{ finishedTxt }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from '@/utils/request';
import { getLocal } from '@/utils/local';
export default {
  name: 'accountmanage',
  data() {
    return {
      isLoading: false,
      loading: true,
      finished: false,
      finishedTxt: '没有更多了',
      searchMsg: '',
      list: [],
      params: {
        userName: this.searchMsg,
        currentPage: 1,
        pageSize: 10,
        sortType: '',
      },
    };
  },
  //渲染账号列表
  mounted() {
    this.getList();
  },
  methods: {
    //点击搜索
    search() {
      if (!this.searchMsg.trim()) {
        this.searchMsg = '';
        return this.$toast('关键字不能为空');
      }
      this.list = [];
      this.getList();
    },
    //获取页面账号列表
    async getList(params, callback) {
      try {
        let res = await get(
          '/api/store-manager-info/storeManagerInfoList',
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
          res.data.data.map((item) => {
            let str = '';
            if (item.relevanceStoreNameList.length > 0) {
              item.relevanceStoreNameList.forEach((it) => {
                str += `${it}、`;
              });
            } else {
              str = '暂无关联门店';
            }
            this.$set(item, 'stores', str);
          });
          this.list = [...this.list, ...res.data.data];
          callback && callback();
        }
      } catch (err) {}
    },
    //刷新
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
        console.log('aaaaaaaa');
        this.loading = false;
        this.params.currentPage++;
        this.getList(this.params, () => (this.loading = true));
      }
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  position: relative;
  font-size: 8px;
  padding-top: 65px;
  background-color: #f9f9fb;
  // 搜索
  .content_search {
    position: fixed;
    left: 0;
    top: 88px;
    width: 100%;
    height: 65px;
    z-index: 2;
    .van-search {
      height: 100%;
      background-color: #f9f9fb;
      /deep/.van-search__content {
        padding-left: 0;
        /deep/.van-cell {
          background-color: #fff;
          border-radius: 22px;
          height: 37px;
          /deep/.van-field__body {
            height: 100%;
            padding: 0 15px;
          }
        }
      }
      /deep/.van-search__action {
        color: #46479e;
        font-size: 12px;
      }
    }
  }
  //列表
  .items {
    height: calc(100vh - 153px);
    .item {
      position: relative;
      padding: 14px 20px 35px 20px;
      background-color: #fff;
      margin-bottom: 7px;
      ul {
        li {
          margin-top: 7px;
          color: #666666;
          font-size: 12px;
          &#vendorName {
            margin: 0 0 3px 0;
            font-size: 16px;
            color: black;
          }
        }
      }
      // 按钮
      .button {
        position: absolute;
        right: 20px;
        bottom: 14px;
        display: flex;
        div {
          flex: 1;
          padding: 3px 14px;
          border: 1px solid #46479e;
          font-size: 10px;
          border-radius: 11px;
          color: #46479e;
        }
        div:first-child {
          margin-right: 7px;
        }
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
