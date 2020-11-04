<template>
  <!-- 签约详情 -->
  <div
    class="signContract hide-scroll "
    @touchstart="touchStart"
    @touchend="touchEnd"
  >
    <my-header :lefticon="true" @click="$router.push('/signmanage')"
      >签约认证</my-header
    >
    <!-- 步骤条 -->
    <div class="steps">
      <div class="one" @click="toggle(1)">经营资料</div>
      <div :class="{ current: current === 2 || current === 3 }" class="two">
        <div
          :class="{ current: current === 2 || current === 3 }"
          class="line"
        ></div>
        <div class="legal-person" @click="toggle(2)">法人信息</div>
      </div>
      <div :class="{ current: current === 3 }" class="three">
        <div :class="{ current: current === 3 }" class="line"></div>
        <div class="banck" @click="toggle(3)">结算银行</div>
      </div>
    </div>

    <!-- 经营资料 -->
    <div v-show="current === 1" class="first-container">
      <div class="fields">
        <!-- 商户名 -->
        <van-field readonly v-model="list.merchantName" label="商户名称" />
        <!-- 营业执照 -->
        <div class="business-license">
          <div class="title">营业执照</div>
          <div class="img">
            <img
              class="upimg"
              :src="
                list.businessLicensePhotoUrlList &&
                list.businessLicensePhotoUrlList.length > 0
                  ? list.businessLicensePhotoUrlList[0].url
                  : ''
              "
              alt=""
            />
          </div>
        </div>
        <!-- 信用代码 -->
        <div class="credit">
          统一社会信用代码
          <div>{{ list.unifiedSocialCreditCode }}</div>
        </div>
        <!-- 成立日期 -->
        <van-field readonly v-model="list.establishDate" label="成立日期" />
        <!-- 营业限期 -->
        <van-field readonly v-model="list.businessEndDate" label="营业限期" />
        <!-- 注册经营地 -->
        <div class="address">
          <div class="label">注册经营地</div>
          <div class="content">
            {{ list.registerAddress }}
          </div>
        </div>
        <!-- 经营地是否一致 -->
        <div class="same">
          <div class="label">注册地预经营地 是否一致</div>
          <div class="content">是</div>
        </div>
        <!-- 实地经营地 -->
        <div class="address">
          <div class="label">实地经营地</div>
          <div class="content">
            {{ list.realityBusinessAddress }}
          </div>
        </div>
        <!-- 商户简称 -->
        <van-field
          readonly
          v-model="list.merchantShorterName"
          label="商户简称"
        />
        <!-- 客服电话 -->
        <van-field
          readonly
          class="phone"
          v-model="list.customerPhone"
          label="客服电话"
        />
        <!-- 经营场景类型 -->
        <van-field
          readonly
          v-model="list.businessScenariosType"
          label="经营场景类型"
        />
        <!-- 门店名称 -->
        <van-field readonly v-model="list.storeName" label="门店名称" />
        <!-- 门店地址 -->
        <div class="address">
          <div class="label">门店地址</div>
          <div class="content">
            {{ list.storeAddress }}
          </div>
        </div>
        <!-- 门牌号 -->
        <van-field
          readonly
          v-model="list.storeAddressDoorplate"
          label="门牌号"
        />
        <!-- 门店省市编码 -->
        <van-field
          readonly
          class="provinces-coding"
          v-model="list.storeProvinceCityCode"
          label="门店省市编码"
        />
        <!-- 门店门头照片 -->
        <div class="store-logo">
          <div class="title">门店门头照片</div>
          <div class="imgs">
            <img
              :src="
                list.doorHeadPhotoUrlList &&
                list.doorHeadPhotoUrlList.length > 0
                  ? list.doorHeadPhotoUrlList[0].url
                  : ''
              "
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 法人信息 -->
    <div v-show="current === 2" class="second-container">
      <!-- 身份证上传 -->
      <van-field readonly label="证件类型" v-model="list.certificateType" />
      <div class="img">
        <div class="block">
          <!-- 正面 -->
          <div class="front">
            <img
              class="front-img"
              :src="
                list.legalCardHeadUrlList &&
                list.legalCardHeadUrlList.length > 0
                  ? list.legalCardHeadUrlList[0].url
                  : ''
              "
              alt=""
            />
          </div>
          <!-- 反面 -->
          <div class="behind">
            <img
              class="behind-img"
              :src="
                list.legalCardTailUrlList &&
                list.legalCardTailUrlList.length > 0
                  ? list.legalCardTailUrlList[0].url
                  : ''
              "
              alt=""
            />
          </div>
        </div>
        <div class="title">
          <div>身份证正面</div>
          <div>身份证反面</div>
        </div>
      </div>
      <!-- 姓名 -->
      <van-field readonly label="姓名" v-model="list.legalPerson" />
      <!-- 身份证号码 -->
      <van-field readonly label="身份证号码" v-model="list.legalCard" />
      <!-- 有效期开始时间 -->
      <van-field
        readonly
        label="有效期开始时间"
        v-model="list.legalCardStartTime"
      />
      <!-- 有效期结束时间 -->
      <van-field
        readonly
        label="有效期结束时间"
        v-model="list.legalCardEndTime"
      />
      <!-- 法人联系方式 -->
      <van-field
        readonly
        label="法人联系方式"
        v-model="list.legalPersonPhone"
      />
      <!-- 法人联系邮箱 -->
      <van-field readonly label="法人联系邮箱" v-model="list.legalEmail" />
      <!-- 经营者/法人是否最终受益所有人 -->
      <div class="beneficiary">
        <div class="label">
          经营者/ 法人是否 最终受益所有人
        </div>
        <div class="content">{{ list.isLegalBeneficiary }}</div>
      </div>
      <div
        class="beneficiary-content"
        v-show="!list.isLegalBeneficiary || list.isLegalBeneficiary === '否'"
      >
        <!-- 受益人身份证 -->
        <div class="idcar">
          <div class="block">
            <!-- 正面 -->
            <div class="front">
              <img
                class="popup-front"
                :src="
                  list.beneficiaryCardHeadUrlList &&
                  list.beneficiaryCardHeadUrlList.length > 0
                    ? list.beneficiaryCardHeadUrlList[0].url
                    : ''
                "
                alt=""
              />
            </div>
            <!-- 反面 -->
            <div class="behind">
              <img
                class="popup-behind"
                :src="
                  list.beneficiaryCardTailUrlList &&
                  list.beneficiaryCardTailUrlList.length > 0
                    ? list.beneficiaryCardTailUrlList[0].url
                    : ''
                "
                alt=""
              />
            </div>
          </div>
          <div class="title">
            <div>身份证正面</div>
            <div>身份证反面</div>
          </div>
        </div>

        <van-form>
          <!-- 受益人姓名 -->
          <van-field
            readonly
            v-model="list.beneficiaryName"
            label="受益人姓名"
          />
          <!-- 身份证号码 -->
          <van-field
            readonly
            v-model="list.beneficiaryCard"
            label="身份证号码"
          />
          <!-- 有效期开始时间 -->
          <van-field
            readonly
            v-model="list.beneficiaryStartTime"
            label="有效期开始时间"
          />
          <!-- 有效期结束时间 -->
          <van-field
            readonly
            v-model="list.beneficiaryEndTime"
            label="有效期结束时间"
          />
        </van-form>
      </div>
    </div>

    <!-- 结算银行 -->
    <div v-show="current === 3" class="third-container">
      <!-- 账户类型 -->
      <div class="account-type">
        <div class="label">账户类型</div>
        <div class="value">{{ list.accountType }}</div>
      </div>
      <!-- 开户名称 -->
      <van-field readonly label="开户名称" v-model="list.accountName" />
      <!-- 开户银行 -->
      <div class="witch-bank">
        <div class="label">开户银行</div>
        <div class="value">{{ list.accountBank }}</div>
      </div>
      <!-- 开户银行所在地 -->
      <div class="bank-add">
        <div class="label">开户银行所在地</div>
        <div>{{ list.accountBankAddress }}</div>
      </div>
      <!-- 开户银行省市编码 -->
      <van-field
        readonly
        label="开户银行省市编码"
        v-model="list.accountBankAddressCode"
      >
      </van-field>
      <!-- 银行账户 -->
      <van-field readonly label="银行账户" v-model="list.account"> </van-field>
    </div>
  </div>
</template>
<script>
import { get } from '@/utils/request';
import { timeFilter } from '@/utils/filters';
export default {
  name: 'signdetail',
  data() {
    return {
      defaultFront: require('@/assets/images/shenfenzhengzhengmian.png'),
      defaultBehind: require('@/assets/images/shenfenzhengfanmian.png'),
      current: 1, //三个模块的显隐
      id: '',
      list: {},
      //滑动初始位置
      startX: '',
    };
  },

  activated() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.getList();
    }
  },
  methods: {
    // 请求数据
    async getList() {
      try {
        let res = await get(
          `/api/merchant-info/${this.id}/merchantInfoSignedDetail`
        );
        let { code, data } = res;
        console.log(res);

        if (code === '200') {
          data.establishDate = timeFilter(data.establishDate, 'YYYY-MM-DD');
          data.businessEndDate = timeFilter(data.businessEndDate, 'YYYY-MM-DD');
          data.legalCardStartTime = timeFilter(
            data.legalCardStartTime,
            'YYYY-MM-DD'
          );
          data.legalCardEndTime = timeFilter(
            data.legalCardEndTime,
            'YYYY-MM-DD'
          );
          data.beneficiaryStartTime = timeFilter(
            data.beneficiaryStartTime,
            'YYYY-MM-DD'
          );
          data.beneficiaryEndTime = timeFilter(
            data.beneficiaryEndTime,
            'YYYY-MM-DD'
          );
          data.isRegisterSameBusiness = data.isRegisterSameBusiness
            ? '是'
            : '否';
          data.isLegalBeneficiary = data.isLegalBeneficiary ? '是' : '否';
          this.list = res.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 切换3个
    toggle(val) {
      this.current = val;
    },
    //滑动起始位置
    touchStart(e) {
      this.startX = e.changedTouches[0].pageX;
    },
    //滑动结束位置
    touchEnd(e) {
      let distance = this.startX - e.changedTouches[0].pageX;
      if (distance < 0 && Math.abs(distance) > 120) {
        if (this.current === 1) {
          this.$router.push('/signmanage');
        } else if (this.current === 2) {
          this.current = 1;
        } else if (this.current === 3) {
          this.current = 2;
        }
      }
      if (distance && distance > 120) {
        if (this.current === 1) {
          this.current = 2;
        } else if (this.current === 2) {
          this.current = 3;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.signContract {
  padding-top: 130px;
  height: 100%;
  background-color: #f9f9fb;

  // 步骤条
  .steps {
    display: flex;
    align-items: center;
    position: fixed;
    top: 87px;
    left: 0;
    z-index: 2;
    background-color: #f9f9fb;
    width: 100%;
    height: 43px;
    padding: 0 23px 0 11px;
    .one {
      font-size: 14px;
      color: #4849a1;
      font-weight: bold;
    }
    .two,
    .three {
      flex: 1;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #484848;
      font-weight: bold;
      .line {
        margin: 0 2px;
        width: 80px;
        height: 1px;
        background-color: #cccccc;
        &.current {
          background-color: #4849a1;
        }
      }
      &.current {
        color: #4849a1;
      }
    }
  }
  // 步骤一
  .first-container {
    .fields {
      font-size: 15px;
      //营业执照
      .business-license {
        padding: 13px 16px;
        border-bottom: 1px solid #f9f9fb;
        background-color: #fff;
        .img {
          margin-top: 15px;
          height: 190px;
          background-color: #f9f9fb;

          .upimg {
            width: 100%;
            height: 100%;
            object-fit: contain;
            background-color: #ffffff;
          }
        }
      }
      // 信用代码
      .credit {
        display: flex;
        padding: 13px 16px;
        background-color: #fff;
        border-bottom: 1px solid #f9f9fb;
        div {
          padding-left: 12px;
        }
      }
      .van-cell {
        /deep/.van-cell__title {
          margin-right: 40px;
          font-size: 15px;
          color: #000000;
        }
        /deep/.van-field__control {
          color: black;
        }
        // 客服电话
        //省市编码
        &.phone,
        &.provinces-coding {
          margin-bottom: 7px;
        }
      }
      //经营地是否一致
      .same {
        display: flex;
        align-items: center;
        padding: 13px 16px;
        background-color: #fff;
        border: 1px solid #f9f9f9;
        .label {
          width: 105px;
          margin-right: 30px;
        }
        .content {
          flex: 1;
        }
      }
      // 地址
      .address {
        display: flex;
        align-items: center;
        padding: 13px 20px 13px 16px;
        background-color: #fff;
        border-bottom: 1px solid #fbfbfb;
        .label {
          width: 120px;
          margin-right: 15px;
        }
        .content {
          flex: 1;
        }
      }
      // 门头照片
      .store-logo {
        background-color: #fff;
        padding: 16px;
        .title {
          margin-bottom: 15px;
        }
        .imgs {
          display: flex;
          align-items: center;
          img {
            display: block;
            width: 60px;
            height: 60px;
            border: 1px dashed #cccccc;
          }
        }
      }
    }
  }
  // 步骤二
  .second-container {
    background-color: #fff;
    // 身份证
    .img {
      padding: 13px 20px 0;
      border-bottom: 1px solid #f9f9fb;
      .block {
        display: flex;
        align-items: center;
        .front,
        .behind {
          width: 162px;
          height: 102px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            object-fit: contain;
            background-color: #fff;
            border: 1px dashed #cccccc;
          }
        }
        .front {
          margin-right: 10px;
        }
      }
      .title {
        display: flex;
        justify-content: space-between;
        div {
          flex: 1;
          padding: 12px 0;
          text-align: center;
          font-size: 12px;
        }
      }
    }
    .van-cell {
      /deep/.van-cell__title {
        width: 110px;
        margin-right: 30px;
        font-size: 15px;
        color: #000000;
      }
    }
    //是否最终受益人
    .beneficiary {
      padding: 13px 16px;
      display: flex;
      font-size: 15px;
      align-items: center;
      .label {
        width: 100px;
      }
      .content {
        padding-left: 40px;
        flex: 1;
      }
    }
    .beneficiary-content {
      padding: 10px 15px;
      // 身份证
      .idcar {
        .block {
          display: flex;
          align-items: center;
          .front,
          .behind {
            width: 162px;
            height: 102px;
            position: relative;
            img {
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              object-fit: contain;
              background-color: #fff;
              border: 1px dashed #cccccc;
            }
          }
          .front {
            margin-right: 10px;
          }
        }
        .title {
          display: flex;
          justify-content: space-between;
          div {
            flex: 1;
            padding: 12px 0;
            text-align: center;
            font-size: 12px;
          }
        }
      }

      .van-cell {
        padding: 5px 0;
        /deep/.van-field__control {
          color: black;
          box-shadow: 1px 1px 9999px #ffffff inset;
        }
      }
    }
  }
  //步骤三
  .third-container {
    .account-type,
    .witch-bank,
    .bank-add {
      display: flex;
      padding: 13px 16px;
      background-color: #fff;
      border-bottom: 1px solid #f9f9fb;
      font-size: 15px;
      color: black;
      .label {
        width: 110px;
        margin-right: 20px;
        font-size: 15px;
      }
    }

    .van-cell {
      border-bottom: 1px solid #f9f9fb;
      /deep/.van-cell__title {
        width: 120px;
        font-size: 15px;
        color: black;
      }
      /deep/.van-field__control {
        color: black;
        font-size: 15px;
      }
      &::after {
        border: none;
      }
    }
  }
}
</style>
