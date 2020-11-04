<template>
  <!-- 反馈 -->
  <div class="feed-back pdtop">
    <my-header>{{ title }}</my-header>
    <div class="main">
      <img :src="res.code === '200' ? success : err" alt="" />
      <div class="text">
        {{ res.code === '200' ? msg1 : msg2 }}
      </div>
      <div class="button-container">
        <van-button @click="$router.push('/home/index')">返回首页</van-button>
        <van-button @click="$router.push('/appreciation')">继续参与</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'feedback',
  data() {
    return {
      title: '参与成功',
      success: require('@/assets/images/lujing505_2.png'),
      err: require('@/assets/images/lujing503_2.png'),
      msg1: `恭喜您，参与成功!请耐心等待审核结果`,
      msg2: '抱歉，参与失败！',
      res: {},
    };
  },
  activated() {
    this.res = this.$route.params.res;
    if (this.res.code !== '200') {
      this.msg2 = this.res.message;
    }
  },
};
</script>

<style lang="less" scoped>
.feed-back {
  height: 100%;
  background-color: #f9f9fb;
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 36px 0;

    img {
      display: block;
      width: 110px;
      height: 110px;
      border: 1px dashed black;
      margin-bottom: 33px;
    }
    .text {
      width: 110px;
      text-align: center;
    }
    .button-container {
      margin-top: 31px;
      display: flex;
      justify-content: space-around;
      .van-button {
        width: 100px;
        height: 30px;
        font-size: 14px;
        background-color: #46479e;
        color: #ffffff;
        border-radius: 8px;
        &:first-child {
          margin-right: 47px;
          color: #46479e;
          border: 1px solid #46479e;
          background-color: transparent;
        }
      }
    }
  }
}
</style>
