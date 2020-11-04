<template>
  <div class="my-navbar" @click="handle">
    <div class="left">
      <slot name="left-icon"></slot>
      <slot />
    </div>
    <div class="right">
      <span v-if="rtext">{{ rtext }} </span>
      <span class="iconfont icon-ic_arrowr-copy"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rtext: {
      type: String,
      default: '',
    },
  },
  methods: {
    handle(value) {
      this.$emit('click', value);
    },
  },
};
</script>

<style lang="less" scoped>
.my-navbar {
  display: flex;
  background-color: #fff;
  height: 40px;
  padding: 0 15px;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  .right {
    span {
      vertical-align: middle;
      font-size: 12px;
      color: rgba(214, 214, 214);
    }
    .iconfont {
      font-size: 22px;
      color: #cccccc;
    }
  }
}
</style>
