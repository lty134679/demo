<template>
  <!-- 主页 -->
  <div class="home hide-scroll" ref="home" @touchstart="touchstart" @touchend="touchend">
    <keep-alive :exclude="['personal', 'personalinfo']">
      <router-view></router-view>
    </keep-alive>
    <!-- 导航栏 -->
    <div class="navbar">
      <!-- router-link 只有用@click.native才能注册点击事件-->
      <router-link @click.native="toggle(1)" :to="{ name: 'index' }" exact class="left">
        <div :class="{ active1: active === 1 }" class="picture picture1 "></div>
        <div :class="{ active: active === 1 }" class="text">首页</div>
      </router-link>
      <!-- 统计 -->
      <router-link @click.native="toggle(2)" :to="{ name: 'statistic' }" class="center">
        <div :class="{ active2: active === 2 }" class="picture picture2"></div>
        <div :class="{ active: active === 2 }" class="text">统计</div>
      </router-link>
      <!-- 我的 -->
      <router-link @click.native="toggle(3)" :to="{ name: 'personal' }" class="right">
        <div class="picture picture3 "></div>
        <div :class="{ active: active === 3 }" class="text">我的我的我的我的</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { setLocal } from '@/utils/local';
export default {
  name: 'home',
  data() {
    return {
      active: 1,
      startX: '',
    };
  },
  mounted() {
    // var phoneWidth = document.documentElement.clientWidth;
    // if (phoneWidth < 750) {
    //   console.log(11111111);
    //   var width = document.documentElement.clientHeight / 2.1653333333 / 10;
    //   document.documentElement.style.fontSize = width + 'px';
    // }
  },
  methods: {
    toggle(value) {
      this.active = value;
    },
    touchstart(e) {
      this.startX = e.touches[0].clientX;
    },
    touchend(e) {
      let right = this.startX - e.changedTouches[0].clientX;
      let left = this.startX - e.changedTouches[0].clientX;
      if (this.$route.name === 'index') {
        if (right > 100) {
          this.$router.push('/home/statistic');
        }
      } else if (this.$route.name === 'statistic') {
        if (right > 100) {
          this.$router.push('/home/personal');
        }
        if (left < 0 && Math.abs(left) > 100) {
          this.$router.push('/home/index');
        }
      } else if (this.$route.name === 'personal') {
        if (left < 0 && Math.abs(left) > 100) {
          this.$router.push('/home/statistic');
        }
      }
    },
  },
  watch: {
    $route(e) {
      if (e.name === 'index') {
        this.active = 1;
      } else if (e.name === 'statistic') {
        this.active = 2;
      } else if (e.name === 'personal') {
        this.active = 3;
      }
      this.$nextTick(() => {
        this.$refs.home.scrollTo(0, 0);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  background-color: #fff;

  // 导航栏
  .navbar {
    height: 88px;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    border-top: 1px solid #0d469b;
    padding: 10px;
    background-color: #fff;
    z-index: 999;
    .left,
    .center,
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .picture {
        width: 20px;
        height: 20px;
        &.picture1 {
          background: url("../../assets/images/zu604.png") center;
          background-size: 100% 100%;
        }
        &.picture2 {
          background: url("../../assets/images/tongji1.png") center;
          background-size: 100% 100%;
        }
        &.picture3 {
          background: url("../../assets/images/wode.png") center;
          background-size: 100% 100%;
        }
        &.active1 {
          background: url("../../assets/images/guanlimokuai.png");
          background-size: 100%;
        }
        &.active2 {
          background: url("../../assets/images/zu603.png");
          background-size: 100%;
        }
      }
      .text {
        margin-top: 4px;
        color: #4849a1;
        font-size: 12px;
        &.active {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
