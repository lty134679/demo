<template>
  <!-- 添加账户 -->
  <div class="addAccount pdtop">
    <van-form v-show="isAdd == 1">
      <my-header :lefticon="true" @click="$router.push('/home/index')"
        >添加账户</my-header
      >
      <!-- 账号设置 -->
      <div style="background:#F9F9FB">
        <div class="shopMsg">账户信息</div>
        <div class="boxxx">
          <van-field
            v-model="userInfo.userName"
            name="userName"
            label="账户"
            label-width="145px"
            placeholder="请输入账户"
            :required="true"
            :rules="[
              {
                required: true,
                message: '账户不能为空',
                trigger: 'onBlur',
              },
            ]"
          ></van-field>
        </div>
        <!-- 密码 -->
        <div class="boxxx">
          <van-field
            v-model="userInfo.passWord"
            name="password"
            type="password"
            label="密码"
            label-width="145px"
            placeholder="请输入密码"
            :maxlength="6"
            :rules="[
              {
                required: true,
                message: '密码不能为空',
                trigger: 'onBlur',
              },
            ]"
          ></van-field>
        </div>
        <!-- 状态 -->
        <div class="boxxx">
          <span></span>
          <van-cell title="账号状态" is-link @click="showState"
            >{{ storeState }}
          </van-cell>
          <van-popup v-model="isState" round position="bottom">
            <van-picker
              title="请选择账号状态"
              show-toolbar
              :columns="state"
              @confirm="pressState"
              @cancel="onCancle"
            ></van-picker>
          </van-popup>
        </div>
        <div class="line"></div>
        <!-- 关联门店 -->
        <div class="boxxx">
          <span></span>
          <van-cell title="关联门店" :value="link" is-link @click="isAdd = 2">{{
            link
          }}</van-cell>
        </div>
        <div v-for="item in message" :key="item.id">
          <div class="content_msg">
            <div class="image">
              <img
                :src="
                  item.storePhotoUrlList && item.storePhotoUrlList.length > 0
                    ? item.storePhotoUrlList[0]
                    : defaultImg
                "
                alt
              />
              <img src="" alt="" v-show="item.storePhotoUrlList == null" />
            </div>
            <div class="text">
              <ul>
                <li id="vendorName">{{ item.storeName }}</li>
                <li>地点：{{ item.address }}</li>
                <li>入驻时间：{{ item.ctime | timeFilter('YYYY.MM.DD') }}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="next" id="submit">
          <input
            :class="{ greenlight: greenLight === 3 }"
            class="button"
            type="submit"
            value="提交"
            @click="onSubmit"
          />
        </div>
      </div>
    </van-form>
    <!-- 门店选择 -->
    <div style="height: 100%;backgroundColor:#f9f9fb" v-show="isAdd == 2">
      <linkshop @toAddShop1="acceptLink" :back="toggle"></linkshop>
    </div>
  </div>
</template>

<script>
import linkshop from '@/views/Shop/linkShop';
import { get, post } from '@/utils/request';
import { getLocal } from '@/utils/local';
export default {
  name: 'addaccount',
  components: {
    linkshop,
  },

  data() {
    return {
      defaultImg: require('@/assets/images/maliao.jpg'),
      //账户状态
      isState: false,
      state: ['启用', '禁用'],
      isAdd: 1,
      link: '请选择关联门店',
      message: [],
      userInfo: {
        accountStatus: 1,
        marketerId: getLocal('marketer_id'), //推广员ID
        userName: '', //用户名
        passWord: '', //密码
        relevanceStoreList: [],
      },
      greenLight: '',
    };
  },
  mounted() {},
  methods: {
    //账号状态弹窗
    showState() {
      this.isState = true;
    },
    //选择状态
    pressState(value, index) {
      this.isState = false;
      this.userInfo.accountStatus = value === '启用' ? 1 : 0;
    },
    //取消选择
    onCancle() {
      this.isState = false;
    },
    toggle() {
      this.isAdd = 1;
    },
    //接收门店传回信息
    acceptLink(data) {
      this.isAdd = 1;
      this.userInfo.relevanceStoreList = JSON.parse(JSON.stringify(data)); //深度拷贝 不然下面删除属性会影响到原数组
      this.message = this.userInfo.relevanceStoreList;
      var msg = '';
      msg = `已选择${this.userInfo.relevanceStoreList.length}家门店`;
      msg == '' ? (this.link = '请选择关联门店') : (this.link = msg);
    },
    // 提交
    async onSubmit() {
      if (this.greenLight !== 3) {
        return this.$toast('信息未完善！');
      }
      try {
        // ischeck才是需要的属性 另两个是辅助的 所以没用了就删掉 保持简洁
        this.userInfo.relevanceStoreList.forEach((item) => {
          if (item.read) {
            item.isCheck = 1;
          }
          if (item.edit) {
            item.isCheck = 0;
          }
          delete item.edit;
          delete item.read;
        });
        let res = await post(
          '/api/store-manager-info/storeManagerInfo',
          this.userInfo
        );
        if (res.code == 200) {
          this.$toast('添加成功');
          Object.assign(this.$data, this.$options.data());
          this.$router.push('/');
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    //门店状态
    storeState() {
      return this.userInfo.accountStatus ? '启用' : '禁用';
    },
  },
  watch: {
    userInfo: {
      handler(newval) {
        this.greenLight = '';
        Object.keys(newval).forEach((it) => {
          if (it !== 'passWord' && it !== 'marketerId') {
            if (it === 'relevanceStoreList' && newval[it].length > 0) {
              this.greenLight++;
            }
            if (it !== 'relevanceStoreList' && newval[it] !== '') {
              this.greenLight++;
            }
          }
        });
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
//大盒子
.addAccount {
  height: 100%;
  font-size: 12px;
  padding-bottom: 80px;
  background-color: #f9f9fb;
  .van-form {
    padding-bottom: 80px;
  }
} //基本信息小横条
.shopMsg {
  height: 30px;
  background: #f9f9fb;
  font-size: 14px;
  color: #999999;
  padding-left: 11px;
  line-height: 30px;

  input,
  span {
    vertical-align: middle;
  }
  input {
    width: 10px;
    height: 10px;
  }
  span {
    padding-left: 10px;
  }
}
.van-field {
  padding-left: 19px;
  /deep/.van-field__control {
    box-shadow: 1px 1px 999px #ffffff inset;
  }
} //各种输入框
.boxxx {
  position: relative;
  border-bottom: 1px solid #f2f2f2;
  > span {
    background-image: url('../../assets/images/require.png');
    margin-left: 11px;
    width: 105px;
    display: block;
    background-repeat: no-repeat;
    background-size: 7.5px;
    background-position: left;
    color: #000000;
    font-size: 15px;
    height: 25px;
    position: absolute;
    top: 50%;
    margin-top: -12.5px;
    left: -2.5px;
    z-index: 100;
  }
}
.van-cell__value {
  text-align: left;
}
/deep/.van-cell__title,
.van-cell__title {
  font-size: 14px;
  color: black;
}
// 店铺信息
.content_msg {
  border-top: 1px solid #f9f9fb;
  border-bottom: 1px solid #f9f9fb;
  display: flex;
  position: relative;
  padding: 10px 20px;
  font-size: 12px;
  background: #ffffff;

  .image {
    width: 90px;
    height: 90px;
    border: 1px solid #f9f9fb;
    background: #e4e4e4;

    img {
      width: 90px;
      height: 90px;
      border: 1px solid #f9f9fb;
      background: #e4e4e4;
      object-fit: cover;
    }
  }

  .text {
    line-height: 25px;
    margin-left: 25px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
  }
} //店铺名称颜色
#vendorName {
  color: #1abc9c;
}

#submit {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 70px;
  padding: 10px 20px;
  background: #f9f9fb;
  input {
    width: 335px;
    height: 50px;
    background: #dededf;
    line-height: 50px;
    color: #ffffff;
    font-size: 16px;
    border-radius: 10px;
    border: none;
    &.greenlight {
      background-color: #4849a1;
      box-shadow: 1px 1px 1px black, 1px 1px 1px #ffffff inset;
    }
  }
}
.err {
  /deep/ input::-webkit-input-placeholder {
    color: red;
  }
}
</style>
