<template>
  <div class="my-input">
    <label for=""></label>
    <input :type="type" placeholder="ah" />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text',
    },
  },
};
</script>

<style lang="less" scoped>
.my-input {
  input {
    height: 50px;
    border: none;
  }
}
</style>
