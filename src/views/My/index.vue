<template>
  <div class="personal">
    <!-- <my-header>我的</my-header> -->
    <!-- 用户简介 -->
    <div class="introduction">
      <img :src="userInfo.headPhotoUrl ? userInfo.headPhotoUrl : defaultImg" />
      <span class="name">{{ userInfo.name }}</span>
      <div class="bgi"></div>
    </div>
    <div class="navigationbar">
      <my-navbar @click="goAway">
        <img src="@/assets/images/lujing243.png" slot="left-icon" alt="" />
        <span>个人信息</span></my-navbar
      >
      <my-navbar class="performance" @click="$router.push('/performance')">
        <img src="@/assets/images/lujing244.png" alt="" />
        <span>我的业绩</span></my-navbar
      >
      <my-navbar
        class="team"
        @click="
          $router.push({
            path: '/team',
            query: { id: userInfo.belongSuperiorId },
          })
        "
        ><img src="@/assets/images/lujing245.png" alt="" /><span
          >我的组员</span
        ></my-navbar
      >
      <my-navbar class="logout" @click="logout">
        <img src="@/assets/images/zu660.png" alt="" />
        <span>退出登录</span></my-navbar
      >
    </div>
  </div>
</template>

<script>
import { post, request } from '@/utils/request';
import { removeLocal, getLocal } from '@/utils/local';
export default {
  name: 'personal',
  data() {
    return {
      id: getLocal('marketer_id'),
      userInfo: {},
      defaultImg: require('@/assets/images/img-err.jpg'),
    };
  },
  mounted() {
    this.getUserinfo();
  },
  methods: {
    // 退出
    logout() {
      // 选择是否退出
      this.$dialog
        .confirm({
          title: '确认退出账户？',
        })
        .then(async () => {
          let res = await post('/api/marketer-info/logout');
          console.log(res, 'res');

          let { code, data } = res;
          if (code === '200' || code === '21007') {
            // 退出同时删除本地个人信息
            removeLocal('lxluserInfo');
            removeLocal('X-Token');
            removeLocal('marketer_id');
            this.$router.push('/login');
            // 给个退出成功的提示
            this.$toast({
              message: data || '登录过期，请重新登录',
              duration: 500,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取用户信息
    async getUserinfo() {
      let res = await request(`/api/marketer-info/marketer/${this.id}/info`);
      console.log(res, '个人信息');

      let { code, data } = res;
      if (code === '200') {
        this.userInfo = data;
      }
    },
    // 去信息详情页
    goAway() {
      this.$router.push({
        name: 'personalinfo',
        params: {
          userinfo: this.userInfo,
        },
      });
    },
  },
  computed: {
    headImg() {},
  },
};
</script>

<style lang="less" scoped>
.personal {
  background-color: #f9f9fb;
  height: 100%;
  .introduction {
    position: relative;
    height: 179px;
    display: flex;
    background-color: rgba(72, 73, 161, 1);
    img {
      width: 61px;
      height: 61px;
      margin: 89px 20px 0 21px;
      border-radius: 5px;
    }
    span {
      display: block;
      margin-top: 109px;
      font-size: 16px;
      color: white;
    }
    .bgi {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url('../../assets/images/mengzuban9.png') no-repeat 0 -173px;
      background-size: 106% 201%;
      opacity: 0.15;
    }
  }
  .navigationbar {
    margin-top: 10px;
    .my-navbar {
      padding-left: 21px;
      font-size: 14px;
      img {
        width: 14.46px;
        height: 16px;
        vertical-align: top;
      }
      span {
        padding-left: 10px;
      }
    }
    /deep/.performance {
      margin-top: 7px;
      border-bottom: 1px solid #f3f3f3;
      img {
        width: 15px;
        height: 13px;
      }
    }
    /deep/.team {
      margin-bottom: 7px;
      img {
        width: 15px;
        height: 12px;
      }
    }
  }
}
</style>
