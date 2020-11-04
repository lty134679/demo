<template>
  <!-- 商户详情 -->
  <div class="business-detail pdtop">
    <my-header :lefticon="true" @click="$router.push('/businessmanage')"
      >商户详情</my-header
    >
    <div class="main">
      <div class="item">
        商户名称：
        <div>{{ list.merchantName }}</div>
      </div>
      <div class="item">
        商户简称：
        <div>{{ list.merchantShorterName }}</div>
      </div>
      <div class="item">
        商户评级：
        <div>{{ level }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'businessdetail',
  activated() {
    if (this.$route.params.val) {
      this.list = this.$route.params.val;
    }
    console.log(this.list);
  },
  data() {
    return {
      list: '',
    };
  },
  computed: {
    level() {
      let msg = '';
      switch (this.list.merchantRatings) {
        case 1:
          msg = '一类汽车维修企业';
          break;
        case 2:
          msg = '二类汽车维修企业';
          break;
        default:
          msg = '三类汽车维修企业';
      }
      return msg;
    },
  },
};
</script>

<style lang="less" scoped>
.business-detail {
  height: 100%;
  .main {
    .item {
      display: flex;
      border-bottom: 0.5px solid #f9f9fb;
      color: #000000;
      font-size: 15px;
      height: 48px;
      line-height: 48px;
      padding-left: 20px;
      div {
        line-height: 48px;
        align-items: center;
        padding-left: 20px;
        color: #a1a1a3;
        font-size: 14px;
        height: 100%;
      }
    }
  }
}
</style>
