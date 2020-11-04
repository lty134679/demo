<template>
  <!-- 账户详情 -->
  <div class="account-detail hide-scroll pdtop">
    <my-header :lefticon="true" @click="$router.push('/accountManage')"
      >账户详情</my-header
    >
    <div class="body">
      <div class="text">账户信息</div>
      <div class="main">
        <div class="bars">
          <div class="item">
            <div class="label">账户</div>
            <div class="content">{{ list.userName }}</div>
          </div>
          <div class="item">
            <van-field
              type="password"
              :maxlength="6"
              v-model="list.passWord"
              label="密码"
              readonly
            />
          </div>
          <div class="item">
            <div class="label">账户状态</div>
            <div class="content">
              {{ list.accountStatus ? '启用' : '禁用' }}
            </div>
          </div>
          <div class="item">
            <div class="label">关联门店</div>
            <div class="content">
              已关联{{ list.relevanceStoreList.length }}家门店
            </div>
          </div>
        </div>
        <div class="list">
          <div
            class="item"
            v-for="item in list.relevanceStoreList"
            :key="item.id"
          >
            <img
              :src="
                item.storeHeadImgUrlList !== null &&
                item.storeHeadImgUrlList.length > 0
                  ? item.storeHeadImgUrlList[0]
                  : defaultImg
              "
              alt=""
            />
            <div class="content">
              <div class="name">{{ item.storeName }}</div>
              <div>地点：{{ item.address }}</div>
              <div>签约认证：--</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from '@/utils/request';

export default {
  name: 'accountdetail',
  activated() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.getList(this.id);
    }
  },
  data() {
    return {
      defaultImg: require('@/assets/images/huluwa.jpg'),
      list: {},
    };
  },
  methods: {
    async getList(id) {
      try {
        let res = await get(
          `/api/store-manager-info/${id}/storeManagerInfoDetail`
        );
        console.log(res, 'res');
        if (res.code === '200') {
          this.list = res.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.account-detail {
  background-color: #f9f9fb;
  height: 100%;

  .body {
    color: #999999;
    .text {
      height: 30px;
      line-height: 30px;
      padding-left: 11px;
    }
    .main {
      .bars {
        .item {
          display: flex;
          align-items: center;
          padding: 14px 20px;
          margin-bottom: 1px;
          background-color: #fff;
          &:last-child {
            margin: 7px 0 1px 0;
          }
          .label {
            width: 130px;
            color: #000000;
            font-size: 15px;
            flex-shrink: 0;
          }
          .content {
            flex: 1;
            font-size: 14px;
          }
          .van-field {
            padding: 0;
            /deep/.van-cell__title {
              margin-right: 42px;
            }
          }
        }
      }
      .list {
        height: calc(100vh - 323px);
        .item {
          padding: 14px 20px;
          background-color: #fff;
          display: flex;
          align-items: center;
          margin-bottom: 2px;
          img {
            display: block;
            width: 100px;
            height: 93px;
            margin-right: 30px;
            flex-shrink: 0;
            border: 1px dashed #cccccc;
          }
          .content {
            flex: 1;
            .name {
              color: #46479e;
              font-size: 16px;
              font-weight: bold;
              margin: 3px 0 22px 0;
            }
            div:last-child {
              margin-top: 10px;
            }
            div {
              color: black;
            }
          }
        }
      }
    }
  }
}
</style>
