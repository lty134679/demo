<template>
  <div class="login">
    <!-- logo -->
    <div class="logo">
      <img src="@/assets/images/shiliang1.png" alt="" />
      <span>亲车吧推广端</span>
    </div>
    <!-- 登录面板 -->
    <div class="login-panel">
      <!-- 表单 -->
      <van-form @submit="onSubmit">
        <!--用户名 -->
        <van-field v-model="userName" name="userName" placeholder="账号" :clearable="true" :rules="[
            { required: true, message: '账号不能为空', trigger: 'onBlur' },
          ]"></van-field>
        <!-- 密码 -->
        <van-field v-model="passWord" type="password" name="passWord" :clearable="true" placeholder="密码" maxlength="6" :rules="[
            { required: true, message: '密码不能为空', trigger: 'onBlur' },
            {
              validator,
              message: '密码格式错误，应为6位数字',
              trigger: 'onChange',
            },
          ]"></van-field>
        <van-checkbox v-model="remember" shape="square">记住密码</van-checkbox>
        <div class="btn">
          <van-button square type="info" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { getLocal, setLocal } from '@/utils/local';
import { post, get } from '@/utils/request';

export default {
  name: 'login',
  data() {
    return {
      userName: '',
      passWord: '',
      remember: false,
    };
  },
  mounted() {
    if (navigator.onLine) {
    } else {
      this.$toast({
        message: '还没有联网哦，请检查您的网络设置',
        type: 'warning',
        duration: 2000,
      });
    }
    // 首先从本地获取用户信息
    let userInfo = getLocal('lxluserInfo') || '';
    if (userInfo) {
      this.remember = true;
      this.username = userInfo.userName;
      this.password = userInfo.passWord;
    }
  },
  methods: {
    // 表单提交函数
    async onSubmit(values) {
      console.log('value', values);

      let res = await post('/api/marketer-info/login', {
        ...values,
        clientType: 'h5',
        userType: 'user',
      });
      console.log(res);

      let { code, data, message } = res;
      if (code === '200') {
        if (this.remember) {
          // 如果勾选了记住密码 就存入本地 下次直接从本地获取
          setLocal('lxluserInfo', values);
        }
        setLocal('X-Token', data.token);
        setLocal('marketer_id', data.marketer_id);
        this.$router.replace('/');
        this.$toast(message);
      } else {
        this.$toast(message);
      }
    },
    // 密码校验
    validator(val) {
      return /^\d{6}$/.test(val);
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  background-color: #fff;
  padding: 125px 0 125px 0;
  // logo
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 151px;
      height: 99px;
      margin-bottom: 24px;
    }
    span {
      font-size: 24px;
      color: #5b6090;
      font-weight: Bold;
    }
  }
  // 表单框
  .login-panel {
    width: 335px;
    margin: 75px auto 0;
    background-color: #fff;

    .van-checkbox {
      margin-top: 20px;
      width: 80px;
      /deep/.van-checkbox__icon .van-icon {
        width: 15px;
        height: 15px;
        font-size: 10px;
        border-radius: 3px;
        border: 1px solid #4849a1;
        margin-top: 2px;
      }
    }

    .van-button {
      margin-top: 79px;
      width: 100%;
      height: 50px;
      border: 1px solid #4849a1;
      background-color: #4849a1;
      color: #ffffff;
      border-radius: 10px;
      font-size: 16px;
    }
    .van-cell {
      padding: 0;
      &:first-child {
        margin-bottom: 33px;
      }
      /deep/.van-field__body {
        height: 48px;
        width: 335px;
        border: 1px solid #4849a1;
        border-radius: 10px;
        padding-left: 13px;
        padding-right: 13px;

        /deep/.van-field__control {
          font-size: 16px;
          // input在chrome下 自动填充后会有一个默认的样式
          box-shadow: inset 0 0 0 1000px #ffffff !important;
        }
      }
      &::after {
        bottom: -1px;
      }
    }
  }
}
</style>
