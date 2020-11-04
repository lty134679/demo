<template>
  <!-- 添加商户 -->
  <div class="add-business pdtop">
    <my-header :lefticon="true" @click="$router.push('/home/index')"
      >添加商户</my-header
    >
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.merchantName"
        name="merchantName"
        label="商户名称"
        placeholder="请输入营业执照上门店名称"
        required
        clearable
        :rules="[
          { required: true, message: '商户名称不能为空', trigger: 'onBlur' },
        ]"
      ></van-field>
      <van-field
        v-model="form.merchantShorterName"
        name="merchantShorterName"
        label="商户简称"
        placeholder="请输入商户名称"
        required
        clearable
        :rules="[
          { required: true, message: '商户简称不能为空', trigger: 'onBlur' },
        ]"
      ></van-field>
      <van-field
        v-model="level"
        label="商户评级"
        placeholder="请选择商户评级"
        readonly
        required
        right-icon="arrow"
        @click="show = true"
      ></van-field>

      <van-popup v-model="show" round position="bottom">
        <van-picker
          title="选择商户评级"
          show-toolbar
          :columns="options"
          @confirm="onConfirm"
          @cancel="show = false"
        />
      </van-popup>

      <!-- 提交按钮 -->
      <div class="button-container">
        <van-button round :color="buttonColor" block native-type="submit">
          保存
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getLocal } from '@/utils/local';
import { post } from '@/utils/request';

export default {
  name: 'addbusiness',
  data() {
    return {
      form: {
        merchantName: '',
        merchantShorterName: '',
        merchantRatings: 0,
      },
      options: ['一类汽车维修企业', '二类汽车维修企业', '三类汽车维修企业'],
      buttonColor: '#DEDEDF',
      count: '',
      show: false,
    };
  },
  methods: {
    //提交
    async onSubmit(val) {
      Object.keys(val).forEach((item) => {
        if (!val[item].trim()) {
          this.$toast('输入内容不能全是空格');
          return;
        }
      });
      console.log(val, 'val');

      let res = await post('/api/merchant-info/merchantInfo', {
        marketerId: getLocal('marketer_id'),
        ...val,
        merchantRatings: this.form.merchantRatings,
      });
      console.log(res, 'res');
      if (res.code === '200') {
        this.$toast('添加成功');
        this.$router.push('/home/index');
      }
    },
    // 商家评级
    onConfirm(val) {
      if (val === '一类汽车维修企业') {
        this.form.merchantRatings = 0;
      } else if (val === '二类汽车维修企业') {
        this.form.merchantRatings = 1;
      } else {
        this.form.merchantRatings = 2;
      }
      this.show = false;
    },
  },
  computed: {
    level() {
      if (this.form.merchantRatings === 0) {
        return '一类汽车维修企业';
      } else if (this.form.merchantRatings === 1) {
        return '二类汽车维修企业';
      } else {
        return '三类汽车维修企业';
      }
    },
  },
  watch: {
    form: {
      handler(newvalue, oldvalue) {
        this.count = 0;
        Object.keys(newvalue).forEach((item) => {
          if (newvalue[item] === '') {
            this.count++;
          }
        });

        if (this.count === 0) {
          this.buttonColor = '#4849A1';
        } else {
          this.buttonColor = '#DEDEDF';
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
.add-business {
  height: 100%;
  form {
    /deep/.van-field__label {
      font-size: 15px;
      font-weight: 600;
    }
    /deep/.van-field__control {
      box-shadow: 1px 1px 1000px #ffffff inset;
    }
  }
  .button-container {
    width: 100%;
    padding: 14px 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    .van-button {
      width: 335px;
      height: 50px;
      border-radius: 10px;
      font-size: 16px;
    }
  }
}
</style>
