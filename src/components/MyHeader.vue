<template>
  <div class="my-header">
    <div class="left">
      <svg class="icon" aria-hidden="true" v-if="lefticon" @click="handle">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
    </div>
    <div class="center">
      <slot />
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  props: {
    lefticon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    handle() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="less" scoped>
.my-header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  box-shadow: 0 0.026667rem 0.053333rem #f3f3f3;
  height: 87px;
  border-bottom: 1px solid #f3f3f3;
  background-color: #fff;
  padding-top: 44px;
  z-index: 100000000;
  .left,
  .right {
    width: 40px;
    height: 42px;
    text-align: center;
    line-height: 42px;
    padding: 0 5px;
  }
  .center {
    flex: 1;
    text-align: center;
    line-height: 42px;
    height: 42px;
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
