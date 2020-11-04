<template>
  <!-- 签约认证 -->
  <div
    class="signContract hide-scroll"
    ref="sign"
    :class="{ pdtop: showMap }"
    @touchstart="touchStart"
    @touchend="touchEnd"
  >
    <div class="big-container" v-show="!showMap">
      <my-header :lefticon="true" @click="$router.push('/home/index')"
        >签约认证</my-header
      >
      <!-- 步骤条 -->
      <div class="steps">
        <div class="one" @click="current = 1">经营资料</div>
        <div :class="{ current: current === 2 || current === 3 }" class="two">
          <div
            :class="{ current: current === 2 || current === 3 }"
            class="line"
          ></div>
          <div class="legal-person" @click="current = 2">法人信息</div>
        </div>
        <div :class="{ current: current === 3 }" class="three">
          <div :class="{ current: current === 3 }" class="line"></div>
          <div class="banck" @click="current = 3">结算银行</div>
        </div>
      </div>
      <!-- 经营资料----------------------------- -->
      <div v-show="current === 1" class="first-container">
        <div class="fields">
          <!-- 商户名 -->
          <van-field
            v-model="obj.merchantName"
            label="商户名称"
            required
            readonly
            right-icon="arrow"
            placeholder="请选择商户"
            @click="
              $router.push({ name: 'businessmanage', params: { mark: 'sign' } })
            "
          />
          <!-- 营业执照 -->
          <div class="business-license">
            <div class="title">营业执照</div>
            <div class="img">
              <van-uploader
                ref="uploader"
                name="license"
                :after-read="afterRead"
              >
                <img
                  class="default"
                  src="@/assets/images/yingyezhizhao.png"
                  alt=""
                />
              </van-uploader>
              <img
                :class="{ selected: showUpload }"
                class="upimg"
                :src="license.list.length > 0 ? license.list[0].content : ''"
                alt=""
                @click="handleUpload"
              />
            </div>
          </div>
          <van-form>
            <!-- 信用代码 -->
            <van-field
              v-model="obj.unifiedSocialCreditCode"
              label="统一社会信用代码"
              placeholder="请输入信用代码"
              required
              :rules="[
                { required: true, message: '信用代码不能为空' },
                { validator: creditCode, message: '格式不对' },
              ]"
            />
            <!-- 成立日期 -->
            <van-field
              v-model="obj.establishDate"
              label="成立日期"
              required
              placeholder="请输入成立日期"
              :rules="[
                { required: true, message: '成立日期不能为空' },
                { validator: date, message: '格式应为XXXX-XX-XX,如2020-01-11' },
              ]"
            />
            <!-- 营业限期 -->
            <van-field
              v-model="obj.businessEndDate"
              label="营业限期"
              required
              placeholder="请输入营业限期"
              :rules="[
                { required: true, message: '营业限期不能为空' },
                { validator: date, message: '格式应为XXXX-XX-XX,如2020-01-11' },
              ]"
            />
            <!-- 注册经营地 -->
            <van-field
              v-model="obj.registerAddress"
              label="注册经营地"
              placeholder="请输入经营地"
            />
            <!-- 实地经营地 -->
            <van-field
              v-model="obj.realityBusinessAddress"
              label="实地经营地"
              placeholder="请输入经营地"
            />
            <!-- 商户简称 -->
            <van-field
              v-model="obj.merchantShorterName"
              label="商户简称"
              readonly
              placeholder="请输入商户简称"
            />
            <!-- 客服电话 -->
            <van-field
              class="phone"
              v-model="obj.customerPhone"
              label="客服电话"
              placeholder="请输入客服电话"
              :rules="[
                { required: true, message: '客服电话不能为空' },
                { validator: fixedAndMobile, message: '格式不对' },
              ]"
            />
            <!-- 经营场景类型 -->
            <van-field
              v-model="obj.businessScenariosType"
              label="经营场景类型"
              placeholder="线下门店经营"
              readonly
            />
            <!-- 门店名称 -->
            <van-field
              v-model="obj.storeName"
              label="门店名称"
              placeholder="请输入门店名称"
            />
            <!-- 门店地址 -->
            <div class="address" @click="toMap">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bitian"></use>
              </svg>
              <div class="label">门店地址</div>
              <div class="content" :class="{ gray: !obj.storeAddress }">
                {{ obj.storeAddress ? obj.storeAddress : '请选择门店地址' }}
              </div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-ic_arrowr-copy"></use>
              </svg>
            </div>
            <!-- 门牌号 -->
            <van-field
              v-model="obj.storeAddressDoorplate"
              label="门牌号"
              placeholder="请输入门牌号"
            />
            <!-- 门店省市编码 -->
            <van-field
              class="provinces-coding"
              v-model="obj.storeProvinceCityCode"
              label="门店省市编码"
              placeholder="请输入门店省市编码"
            />
            <!-- 门店门头照片 -->
            <div class="store-logo">
              <div class="title">门店门头照片</div>
              <van-uploader
                name="storePhotos"
                v-model="storePhotos.list"
                :max-count="1"
                :after-read="afterRead"
              />
            </div>
          </van-form>
        </div>
      </div>
      <!-- 法人信息 ---------------------------- -->
      <div v-show="current === 2" class="second-container">
        <!-- 法人身份证上传 -->
        <div class="card-type">
          <div class="label">证件类型</div>
          <div class="value">{{ obj.certificateType }}</div>
          <van-dropdown-menu>
            <van-dropdown-item :options="cardType" @change="cardTypeChange" />
          </van-dropdown-menu>
        </div>
        <div class="img">
          <div class="block">
            <!-- 正面 -->
            <div class="front">
              <van-uploader
                ref="front"
                name="legalpersonFront"
                :after-read="afterRead"
              />
              <img
                class="front-img"
                :src="
                  legalpersonFront.list.length > 0
                    ? legalpersonFront.list[0].content
                    : defaultFront
                "
                alt=""
                @click="handleUpload"
              />
            </div>
            <!-- 反面 -->
            <div class="behind">
              <van-uploader
                ref="behind"
                name="legalPersonBehind"
                :after-read="afterRead"
              />
              <img
                class="behind-img"
                :src="
                  legalPersonBehind.list.length > 0
                    ? legalPersonBehind.list[0].content
                    : defaultBehind
                "
                alt=""
                @click="handleUpload"
              />
            </div>
          </div>
          <div class="title">
            <div>身份证正面</div>
            <div>身份证反面</div>
          </div>
        </div>
        <van-form>
          <!-- 姓名 -->
          <van-field
            label="姓名"
            v-model="obj.legalPerson"
            placeholder="请填写法人姓名"
          />
          <!-- 身份证号码 -->
          <van-field
            label="身份证号码"
            required
            v-model="obj.legalCard"
            placeholder="请填写法人身份证号码"
            :rules="[
              { required: true, message: '身份证号码不能为空' },
              { validator: IDCard, message: '身份证格式不正确' },
            ]"
          />
          <!-- 有效期开始时间 -->
          <van-field
            label="有效期开始时间"
            required
            v-model="obj.legalCardStartTime"
            placeholder="请填写身份证有效期开始时间"
            :rules="[
              { required: true, message: '开始时间不能为空' },
              {
                validator: date,
                message: '格式应为xxxx-xx-xx，如：2020-01-11',
              },
            ]"
          />
          <!-- 有效期结束时间 -->
          <van-field
            label="有效期结束时间"
            v-model="obj.legalCardEndTime"
            required
            placeholder="请填写身份证有效期结束时间"
            :rules="[
              { required: true, message: '结束时间不能为空' },
              {
                validator: date,
                message: '格式应为xxxx-xx-xx，如：2020-01-11',
              },
            ]"
          />
          <!-- 法人联系方式 -->
          <van-field
            label="法人联系方式"
            v-model="obj.legalPersonPhone"
            required
            placeholder="请输入法人联系方式"
            :rules="[
              { required: true, message: '联系方式不能为空' },
              { validator: mobile, message: '请填写正确的手机号' },
            ]"
          />
          <!-- 法人联系邮箱 -->
          <van-field
            label="法人联系邮箱"
            v-model="obj.legalEmail"
            required
            placeholder="请输入法人联系邮箱"
            :rules="[
              { required: true, message: '邮箱不能为空' },
              { validator: email, message: '邮箱格式不正确' },
            ]"
          />
        </van-form>
        <!-- 受益人 -->
        <div class="beneficiary">
          <div class="label">
            经营者/ 法人是否 最终受益所有人
          </div>
          <div class="content">{{ obj.isLegalBeneficiary ? '是' : '否' }}</div>
          <van-switch
            v-model="obj.isLegalBeneficiary"
            active-color="#07c160"
            inactive-color="#ccc"
            size="20px"
            @change="switchChange"
          />
        </div>
        <!-- 受益人弹窗 -->
        <van-popup
          class="hide-scroll"
          v-model="showPopup"
          round
          closeable
          duration="0.5"
          close-icon-position="top-left"
          position="bottom"
          :style="{ height: '50%' }"
        >
          <div class="prop-content">
            <!-- 受益人身份证 -->
            <div class="idcar">
              <div class="block">
                <!-- 正面 -->
                <div class="front">
                  <van-uploader
                    ref="propfront"
                    name="beneficiaryFront"
                    :after-read="afterRead"
                  />
                  <img
                    class="popup-front"
                    :src="
                      beneficiaryFront.list.length > 0
                        ? beneficiaryFront.list[0].content
                        : defaultFront
                    "
                    alt=""
                    @click="handleUpload"
                  />
                </div>
                <!-- 反面 -->
                <div class="behind">
                  <van-uploader
                    ref="propbehind"
                    name="beneficiaryBehind"
                    :after-read="afterRead"
                  />
                  <img
                    class="popup-behind"
                    :src="
                      beneficiaryBehind.list.length > 0
                        ? beneficiaryBehind.list[0].content
                        : defaultBehind
                    "
                    alt=""
                    @click="handleUpload"
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
                v-model="obj.beneficiaryName"
                label="受益人姓名"
                clearable
                placeholder="请填写受益人姓名"
                :rules="[{ required: true, message: '姓名不能为空' }]"
              />
              <!-- 身份证号码 -->
              <van-field
                v-model="obj.beneficiaryCard"
                label="身份证号码"
                clearable
                placeholder="请填写身份证号码"
                maxlength="18"
                :rules="[
                  { required: true, message: '身份证号码不能为空' },
                  { validator: IDCard, message: '格式错误' },
                ]"
                clearable
              />
              <!-- 有效期开始时间 -->
              <van-field
                v-model="obj.beneficiaryStartTime"
                label="有效期开始时间"
                placeholder="请填写有效期开始时间"
                :rules="[
                  { required: true, message: '开始时间不能为空' },
                  {
                    validator: date,
                    message: '格式应为xxxx-xx-xx，如：2020-01-11',
                  },
                ]"
                clearable
              />
              <!-- 有效期结束时间 -->
              <van-field
                v-model="obj.beneficiaryEndTime"
                label="有效期结束时间"
                placeholder="请填写有效期结束时间"
                clearable
                :rules="[
                  { required: true, message: '结束时间不能为空' },
                  {
                    validator: date,
                    message: '格式应为xxxx-xx-xx，如：2020-01-11',
                  },
                ]"
              />
            </van-form>
          </div>
          <!-- 确认 -->
          <van-button plain type="primary" @click="showPopup = false"
            ><van-icon name="success"
          /></van-button>
        </van-popup>
      </div>
      <!-- 结算银行----------------------------- -->
      <div v-show="current === 3" class="third-container">
        <!-- 账户类型 -->
        <div class="account-type">
          <div class="label">账户类型</div>
          <div class="value">{{ obj.accountType }}</div>
          <van-dropdown-menu>
            <van-dropdown-item :options="actOption" @change="accountChange" />
          </van-dropdown-menu>
        </div>
        <!-- 开户名称 -->
        <van-field
          label="开户名称"
          v-model="obj.accountName"
          placeholder="请输入开户名称"
        />
        <!-- 开户银行 -->
        <div class="witch-bank">
          <div class="label">开户银行</div>
          <div class="value" :class="{ gray: !obj.accountBank }">
            {{ obj.accountBank ? obj.accountBank : '请选择开户银行' }}
          </div>
          <van-dropdown-menu>
            <van-dropdown-item :options="bankOption" @change="bankChange" />
          </van-dropdown-menu>
        </div>
        <!-- 非17家银行弹窗 -->
        <van-popup
          class="outside17"
          v-model="outside17"
          round
          closeable
          duration="0.5"
          close-icon-position="top-left"
          position="bottom"
          :style="{ height: '60%' }"
        >
          <div class="prop-content">
            <van-form>
              <!-- 开户行全称 -->
              <van-field
                v-model="obj.accountBankFullName"
                label="开户银行全称(含支行)"
                clearable
                placeholder="请输入开户银行全称（含支行)"
                :rules="[{ required: true, message: '开户银行全称不能为空' }]"
                @input="handleLineCode"
              />
              <div
                class="outside-list hide-scroll"
                v-show="outsideList.length > 0"
              >
                <div
                  class="item"
                  v-for="item in outsideList"
                  :key="item.id"
                  @click="selectOutSide(item)"
                >
                  {{ item.bankName }}
                </div>
              </div>
              <!-- 开户银行联行号 -->
              <van-field
                v-model="obj.accountBankDepositCode"
                label="开户银行联行号"
                clearable
                placeholder="开户银行联行号"
                readonly
              />
            </van-form>
          </div>
          <!-- 确认 -->
          <van-button plain type="primary" @click="outside17 = false"
            ><van-icon name="success"
          /></van-button>
        </van-popup>
        <!-- 开户银行所在地 -->
        <div class="bank-add">
          <div class="label">开户银行所在地</div>
          <van-dropdown-menu>
            <van-dropdown-item
              v-model="provinces"
              @change="handleProvinces"
              :options="pvcOption"
            />
            <van-dropdown-item
              v-model="city"
              @change="handleCity"
              :options="ctOption"
            />
            <van-dropdown-item
              v-model="bankArea"
              :options="areaOption"
              @change="handleArea"
            />
          </van-dropdown-menu>
        </div>
        <!-- 开户银行省市编码 -->
        <van-field
          label="开户银行省市编码"
          v-model="obj.accountBankAddressCode"
          readonly
        >
        </van-field>
        <!-- 银行账户 -->
        <van-form>
          <van-field
            label="银行账户"
            v-model="obj.account"
            required
            placeholder="请输入银行账号"
            :rules="[
              { required: true, message: '银行账户不能为空' },
              {
                validator: bankCard,
                message: '格式不对',
              },
            ]"
          >
          </van-field>
        </van-form>
        <!-- 提交按钮 -->
        <div class="btn-container">
          <van-button :class="{ allowed: allowed }" @click="submit"
            >保存</van-button
          >
        </div>
      </div>
    </div>
    <!-- 地图 -->
    <div class="map-container" v-show="showMap">
      <div class="boxxx" @click="isArea = true">
        <van-field
          v-model="obj.storeArea"
          label="所属区域"
          readonly
          right-icon="arrow"
          placeholder="请选择所在区域"
        />
      </div>
      <van-popup
        class="hide-scroll"
        v-model="isArea"
        round
        position="bottom"
        style="zIndex: 10000"
      >
        <van-picker
          title="选择所在区县"
          show-toolbar
          :columns="area"
          @confirm="pressArea"
          @cancel="isArea = false"
        ></van-picker>
      </van-popup>
      <div class="detailed-add">
        <van-field
          v-model="obj.detailedAdd"
          label="详细地址"
          placeholder="请输入详细地址"
        />
      </div>
      <gdmap :back="back" @toAddShop="getAdd"></gdmap>
    </div>
  </div>
</template>
<script>
import gdmap from '@/views/map';
import { ossUpload } from '@/utils/oss';
import { get, put, post } from '@/utils/request';
import { getLocal } from '@/utils/local';
import { timeFilter } from '@/utils/filters';
import cities from '@/assets/cityCode/city_code';
import * as myvalidator from '@/utils/validator';
import { bankOption } from '@/assets/bank/bank';

export default {
  name: 'signcontract',
  components: {
    gdmap,
  },
  data() {
    return {
      defaultFront: require('@/assets/images/shenfenzhengzhengmian.png'),
      defaultBehind: require('@/assets/images/shenfenzhengfanmian.png'),
      current: 1, //三个模块的显隐
      showMap: false, //地图显隐
      showUpload: false, //隐藏upload
      isArea: false, //区域显示
      showPopup: false, //显示受益人
      outside17: false, //非17家银行显隐
      obj: {
        marketerId: getLocal('marketer_id'), //推广员id
        //第一步的数据-------------------
        merchantName: '', //商户名
        id: '', //商户id
        businessLicensePhotoId: '', //营业执照
        unifiedSocialCreditCode: '', //信用代码
        establishDate: '', //成立日期
        businessEndDate: '', //营业期限
        registerAddress: '', //注册经营地
        realityBusinessAddress: '', //实际经营地
        merchantShorterName: '', //商户简称
        customerPhone: '', //客服电话
        detailedAdd: '', //详细地址
        businessScenariosType: '线下门店经营', //经营场景类型
        storeName: '', //门店名称
        storeAddress: '', //门店地址
        storeAddressDoorplate: '', //门店门牌号
        storeProvinceCityCode: '', //省市编码
        storeArea: '', //区域
        doorHeadPhotoId: '', //门头

        //第二步的数据----------------------
        certificateType: '身份证', //证件类型
        legalCardHeadId: '', //法人身份证正面照片
        legalCardTailId: '', //法人身份证反面照片
        legalPerson: '', //法人姓名
        legalCard: '', //法人身份证
        legalCardStartTime: '', //身份证有效期开始时间
        legalCardEndTime: '', //身份证有效期结束时间
        legalPersonPhone: '', //法人联系方式
        legalEmail: '', //法人邮箱
        isLegalBeneficiary: true, //法人是否是受益人
        beneficiaryCardHeadId: '', //受益人身份证正面照片
        beneficiaryCardTailId: '', //受益人身份证反面照片
        beneficiaryName: '', //受益人姓名
        beneficiaryCard: '', //受益人身份证号码
        beneficiaryStartTime: '', //受益人身份证有效期开始时间
        beneficiaryEndTime: '', //受益人身份证有效期结束时间

        //第三步数据--------------------------
        accountType: '经营者个体银行卡', //账户类型
        accountName: '', //开户名称
        accountBank: '', //开户银行
        accountBankFullName: '', //开户行全称
        accountBankDepositCode: '', //开户行银联号
        accountBankAddress: '', //开户行所在地
        accountBankAddressCode: '', //开户行省市编码
        account: '', //银行账号
      },
      // 营业执照辅助数据
      license: {
        list: [], //本地图片
        aly: [], //阿里云返回
        name: '营业执照',
        key: 'businessLicensePhotoId',
      },
      // 门头照片辅助数据
      storePhotos: {
        list: [], //本地图片
        aly: [], //阿里云返回
        name: '门头照片',
        key: 'doorHeadPhotoId',
      },
      //法人身份证辅助数据
      legalpersonFront: {
        list: [], //本地图片
        aly: [], //阿里云返回
        name: '法人身份证正面',
        key: 'legalCardHeadId',
      },
      legalPersonBehind: {
        list: [], //本地图片
        aly: [], //阿里云返回
        name: '法人身份证反面',
        key: 'legalCardTailId',
      },
      //受益人照片数据辅助
      beneficiaryFront: {
        list: [], //本地图片
        aly: [], //阿里云返回
        name: '受益人身份证正面',
        key: 'beneficiaryCardHeadId',
      },
      beneficiaryBehind: {
        list: [], //本地图片
        aly: [], //阿里云返回
        name: '受益人身份证反面',
        key: 'beneficiaryCardTailId',
      },
      // 计算有几组图片
      calc: {
        count: 0,
        done: 0,
      },
      //证件类型
      cardType: [
        { text: '身份证', value: 0 },
        { text: '驾驶证', value: 1 },
        { text: '学生证', value: 2 },
        { text: '学位证', value: 3 },
      ],
      //账户类型
      actOption: [
        { text: '经营者个体银行卡', value: 0 },
        { text: '对公银行账户', value: 1 },
      ],
      //开户银行
      bankOption,
      //小众银行
      outsideList: [],
      //开户银行所在地
      // 省
      provinces: '',
      pvcOption: [],
      pvcName: '',
      // 城
      city: '',
      ctOption: [],
      cityName: '',
      // 区
      bankArea: '',
      areaOption: [],
      areaName: '',
      //门店地址所在区
      area: [
        '海曙区',
        '江北区',
        '北仑区',
        '镇海区',
        '鄞州区',
        '奉化区',
        '余姚市',
        '慈溪市',
        '象山县',
        '宁海县',
      ],

      //滑动初始位置
      startX: '',
      timer: null,
    };
  },

  activated() {
    this.pvcOption = [];
    this.ctOption = [];
    this.areaOption = [];
    // 省
    cities.citycode.forEach((item) => {
      this.pvcOption.push({ text: item.name, value: item.code });
    });
    this.provinces = this.pvcOption[10].value;
    this.pvcName = this.pvcOption[10].text;

    // 城市
    cities.citycode.find((item) => {
      if (item.code === this.provinces) {
        item.city.forEach((it) => {
          this.ctOption.push({
            text: it.name,
            value: it.code,
          });
        });
        this.city = this.ctOption[1].value;
        this.cityName = this.ctOption[1].text;
        return true;
      }
    });

    //区域
    cities.citycode.find((item) => {
      if (item.code === this.provinces) {
        item.city.find((it) => {
          if (it.code === this.city) {
            console.log(it);
            it.area.forEach((area) => {
              this.areaOption.push({
                text: area.name,
                value: area.code,
              });
            });
            this.bankArea = this.areaOption[6].value;
            this.areaName = this.areaOption[6].value;
            return true;
          }
        });
        return true;
      }
    });

    this.obj.accountBankAddressCode = this.bankArea;

    if (this.$route.params.val) {
      this.obj.merchantName = this.$route.params.val.merchantName;
      this.obj.id = this.$route.params.val.id;
      this.obj.merchantShorterName = this.$route.params.val.merchantShorterName;
    }
  },
  methods: {
    //调用uploader去获取本地图片
    handleUpload(e) {
      if (
        e.target.className === 'upimg' ||
        e.target.className === 'upimg selected'
      ) {
        this.$refs.uploader.chooseFile();
      }
      if (e.target.className === 'front-img') {
        this.$refs.front.chooseFile();
      }
      if (e.target.className === 'behind-img') {
        this.$refs.behind.chooseFile();
      }
      if (e.target.className === 'popup-front') {
        this.$refs.propfront.chooseFile();
      }
      if (e.target.className === 'popup-behind') {
        this.$refs.propbehind.chooseFile();
      }
    },
    // 本地图片回调函数
    afterRead(val, val2) {
      console.log(val2);

      if (val) {
        //获取营业执照图片时
        if (val2.name === 'license') {
          this.showUpload = true;
          this.license.list = [];
          this.license.list.push(val);
        }
        if (val2.name === 'storePhotos') {
          this.storePhotos.list = [];
          this.storePhotos.list.push(val);
        }
        // 获取身份证正面时
        if (val2.name === 'legalpersonFront') {
          this.legalpersonFront.list = [];
          this.legalpersonFront.list.push(val);
        }
        // 获取身份证反面时

        if (val2.name === 'legalPersonBehind') {
          this.legalPersonBehind.list = [];
          this.legalPersonBehind.list.push(val);
        }
        //受益人身份正面

        if (val2.name === 'beneficiaryFront') {
          this.beneficiaryFront.list = [];
          this.beneficiaryFront.list.push(val);
        }
        //受益人身份反面
        if (val2.name === 'beneficiaryBehind') {
          this.beneficiaryBehind.list = [];
          this.beneficiaryBehind.list.push(val);
        }
        this.oss(val.file, this[val2.name]);
      }
    },

    // 受益人改变
    switchChange(val) {
      this.showPopup = !val;
    },
    //校验
    ...myvalidator,
    //显示地图
    toMap() {
      this.showMap = true;
      this.$nextTick(() => (this.$refs.sign.scrollTop = 0));
    },
    //区域选择
    pressArea(val) {
      this.obj.storeArea = val;
      this.isArea = false;
    },
    //从地图左上角返回
    back() {
      this.showMap = false;
      this.$nextTick(() => (this.$refs.sign.scrollTop = 300));
    },
    //接受地图数据
    getAdd(val) {
      this.showMap = false;
      this.obj.storeAddress = val.add + '' + val.name;
      this.$nextTick(() => (this.$refs.sign.scrollTop = 300));
    },

    // 身份证类型
    cardTypeChange(val) {
      let msg = '';
      switch (val) {
        case 1:
          msg = '驾驶证';
          break;
        case 2:
          msg = '学生证';
          break;
        case 3:
          msg = '学位证';
          break;
        default:
          msg = '身份证';
      }
      this.obj.certificateType = msg;
    },

    //账户类型
    accountChange(val) {
      this.obj.accountType = val ? '对公银行账户' : '经营者个体银行卡';
    },
    //开户银行
    bankChange(val) {
      if (!val) {
        this.outside17 = true;
      } else {
        this.bankOption.find((item) => {
          if (item.value === val) {
            this.obj.accountBank = item.text;
            return true;
          }
        });
      }
    },
    //搜索小众银行
    handleLineCode(val) {
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        let res = await get(`/api/contrast/systemBankContrast`, {
          bankName: val,
          limit: 20,
        });
        if (res.code === '200') {
          this.outsideList = res.data;
        }
      }, 2000);
    },
    //点击小众银行
    selectOutSide(val) {
      this.obj.accountBank = val.bankName;
      this.obj.accountBankFullName = val.bankName;
      this.obj.accountBankDepositCode = val.code;
      this.outsideList = [];
    },

    //点击省份
    handleProvinces(val) {
      if (val === 710000) {
        return;
      }
      cities.citycode.find((item) => {
        if (item.code === val) {
          this.ctOption = [];
          this.pvcName = item.name;
          item.city.forEach((it) => {
            this.ctOption.push({
              text: it.name,
              value: it.code,
            });
          });
          this.city = this.ctOption[0].value;
          this.cityName = this.ctOption[0].value;
          this.areaOption = [];
          item.city[0].area.forEach((it) => {
            this.areaOption.push({
              text: it.name,
              value: it.code,
            });
          });
          this.bankArea = this.areaOption[0].value;
          this.areaName = this.areaOption[0].text;
          this.obj.accountBankAddressCode = this.bankArea;
          return true;
        }
      });
    },
    //点击城市
    handleCity(val) {
      cities.citycode.find((item) => {
        if (item.code === this.provinces) {
          console.log(item);

          item.city.find((it) => {
            if (it.code === val) {
              console.log(it);

              this.cityName = it.name;
              this.areaOption = [];
              it.area.forEach((it) => {
                this.areaOption.push({
                  text: it.name,
                  value: it.code,
                });
              });
              this.bankArea = this.areaOption[0].value;
              this.areaName = this.areaOption[0].text;
              this.obj.accountBankAddressCode = this.bankArea;
              return true;
            }
          });

          return true;
        }
      });
    },
    //点击区县
    handleArea(val) {
      this.areaOption.find((item) => {
        if (item.code === val) {
          this.areaName = item.text;
          return true;
        }
      });
      this.obj.accountBankAddressCode = val;
    },

    // 上传阿里
    async oss(file, item) {
      console.log(item);

      let obj = {
        format: file.type,
        size: file.size,
        type: item.name,
      };
      let { code, data } = await get('/oss/config');
      if (code == '200') {
        ossUpload(file, data, async (res) => {
          if (res) {
            obj.url = res.res.requestUrls[0];
            item.aly = [];
            item.aly.push(obj);
            console.log(res);

            if (item.name !== '门头照片') {
              if (item.name === '营业执照') {
                let res = await get(`/business-license`, {
                  url: item.aly[0].url,
                });
                let { code, data } = res;
                if (code === '200') {
                  this.obj.unifiedSocialCreditCode = data['reg_num'];
                  this.obj.establishDate = timeFilter(
                    data['establish_date'],
                    'YYYY-MM-DD'
                  );
                  this.obj.businessEndDate = timeFilter(
                    data['valid_period'],
                    'YYYY-MM-DD'
                  );
                  this.obj.registerAddress = data.address;
                }
              } else {
                // 身份证
                let side = '';
                item.name === '法人身份证正面' ||
                item.name === '受益人身份证正面'
                  ? (side = 'face')
                  : (side = 'back');
                let res = await get('/id-card', {
                  side,
                  url: item.aly[0].url,
                });
                let { code, data } = res;
                console.log(res);

                if (code === '200') {
                  if (item.key === 'legalCardHeadId') {
                    this.obj.legalPerson = data.name;
                    this.obj.legalCard = data.name;
                  } else if (item.key === 'legalCardTailId') {
                    this.obj.legalCardStartTime = timeFilter(
                      data['start_date'],
                      'YYYY-MM-DD'
                    );
                    this.obj.legalCardEndTime = timeFilter(
                      data['end_date'],
                      'YYYY-MM-DD'
                    );
                  } else if (item.key === 'beneficiaryCardHeadId') {
                    this.obj.beneficiaryName = data.name;
                    this.obj.beneficiaryCard = data.name;
                  } else {
                    this.obj.beneficiaryStartTime = timeFilter(
                      data['start_date'],
                      'YYYY-MM-DD'
                    );
                    this.obj.beneficiaryEndTime = timeFilter(
                      data['end_date'],
                      'YYYY-MM-DD'
                    );
                  }
                }
              }
            }
          }
        });
      }
    },
    //将多张图片传往后台获取一个id，并存放于obj
    async backstage(item) {
      let res = await post('/file/imageFileList', item.aly);
      if (res.code == '200') {
        this.calc.done++;
        this.obj[item.key] = res.data;
      }
    },
    //最后上传
    async finally() {
      try {
        let res = await put(
          `/api/merchant-info/signingCertification`,
          this.obj
        );
        console.log(res);
        if (res.code === '200') {
          this.$toast('保存成功');
          Object.assign(this.$data, this.$options.data());
          this.$router.push('/home/index');
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 点击按钮
    async submit() {
      if (!this.allowed) {
        this.$toast('信息未完善');
        return;
      }
      // 如果开户行全称小于7 那么在17家内
      if (this.obj.accountBank.length < 7) {
        this.obj.accountBankFullName = '';
        this.obj.accountBankDepositCode = '';
      }
      //拼接开户行所在地地址
      this.obj.accountBankAddress =
        this.pvcName + this.cityName + this.areaName;

      let arr = [];
      if (this.obj.isLegalBeneficiary) {
        arr = [
          this.license,
          this.storePhotos,
          this.legalpersonFront,
          this.legalPersonBehind,
        ];
        this.obj.beneficiaryName = '';
        this.obj.beneficiaryCard = '';
        this.obj.beneficiaryStartTime = '';
        this.obj.beneficiaryEndTime = '';
      } else {
        arr = [
          this.license,
          this.storePhotos,
          this.legalpersonFront,
          this.legalPersonBehind,
          this.beneficiaryFront,
          this.beneficiaryBehind,
        ];
      }
      arr.forEach((item) => {
        if (item.list.length > 0) {
          this.calc.count++;
          this.backstage(item);
        }
      });
      if (!this.calc.count) {
        this.finally();
      }
    },

    touchStart(e) {
      this.startX = e.changedTouches[0].pageX;
    },
    //滑动结束位置
    touchEnd(e) {
      let distance = this.startX - e.changedTouches[0].pageX;
      if (distance < 0 && Math.abs(distance) > 120) {
        if (this.showMap) return;
        if (this.current === 1) {
          this.$router.push('/home/index');
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
  computed: {
    // 必填数据是否完整
    allowed() {
      if (this.obj.storeAddress === '' || this.obj.id === '') {
        return false;
      } else {
        return true;
      }
    },
  },
  watch: {
    // 营业执照
    // license: {
    //   handler(newval) {
    //     if (newval.count && newval.count === newval.done) {
    //       this.backstage(newval);
    //     }
    //   },
    //   deep: true,
    // },
    // // 门头照片
    // storePhotos: {
    //   handler(newval) {
    //     if (newval.count && newval.count === newval.done) {
    //       this.backstage(newval);
    //     }
    //   },
    //   deep: true,
    // },
    // // 法人正面
    // legalpersonFront: {
    //   handler(newval) {
    //     if (newval.count && newval.count === newval.done) {
    //       this.backstage(newval);
    //     }
    //   },
    //   deep: true,
    // },
    // //法人反面
    // legalPersonBehind: {
    //   handler(newval) {
    //     if (newval.count && newval.count === newval.done) {
    //       this.backstage(newval);
    //     }
    //   },
    //   deep: true,
    // },
    // // 受益人正面
    // beneficiaryFront: {
    //   handler(newval) {
    //     if (newval.count && newval.count === newval.done) {
    //       this.backstage(newval);
    //     }
    //   },
    //   deep: true,
    // },
    // // 受益人反面
    // beneficiaryBehind: {
    //   handler(newval) {
    //     if (newval.count && newval.count === newval.done) {
    //       this.backstage(newval);
    //     }
    //   },
    //   deep: true,
    // },
    // 总和
    calc: {
      handler(newval) {
        if (newval.count !== 0 && newval.count === newval.done) {
          this.finally();
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
.signContract {
  padding-top: 131px;
  height: 100%;
  background-color: #ffffff;
  &.pdtop {
    padding-top: 88px;
  }
  .big-container {
    // 步骤条
    .steps {
      display: flex;
      align-items: center;
      position: fixed;
      top: 88px;
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
          padding: 15px 20px;
          border-bottom: 1px solid #f9f9fb;
          background-color: #fff;
          .img {
            position: relative;
            margin-top: 15px;
            width: 320px;
            height: 184px;
            background-color: #f9f9fb;
            .van-uploader {
              margin: 73px 146px;
            }

            .upimg {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              object-fit: contain;
              background-color: transparent;
              &.selected {
                background-color: #fff;
              }
            }
          }
        }
        // 信用代码
        .credit {
          padding: 14px 20px;
          background-color: #fff;
          border-bottom: 1px solid #f9f9fb;
        }
        .van-cell {
          /deep/.van-cell__title {
            width: 120px;
            // margin-right: 40px;
            font-size: 15px;
            color: #000000;
          }
          /deep/.van-field__control {
            box-shadow: 1px 1px 999px #ffffff inset;
          }
          /deep/.van-field__right-icon {
            color: #e0e0e0;
          }
          // 客服电话
          //省市编码
          &.phone,
          &.provinces-coding {
            margin-bottom: 7px;
          }
        }
        // 地址
        .address {
          display: flex;
          align-items: center;
          padding: 15px 20px 15px 0;
          background-color: #fff;
          border-bottom: 1px solid #fbfbfb;

          .label {
            margin-right: 70px;
          }
          .content {
            flex: 1;
          }
        }
        // 门头照片
        .store-logo {
          background-color: #fff;
          padding: 18px;
          .title {
            margin-bottom: 15px;
          }
          //文件上传
          .van-uploader {
            /deep/.van-uploader__wrapper {
              /deep/.van-uploader__upload {
                width: 60px;
                height: 60px;
                margin: 0;
              }
              /deep/.van-uploader__preview {
                width: 60px;
                height: 60px;
                /deep/.van-image {
                  width: 100%;
                  height: 100%;
                  /deep/.van-image__img {
                    width: 60px;
                    height: 60px;
                  }
                }
              }
            }
          }
        }
      }
    }
    // 步骤二
    .second-container {
      background-color: #fff;
      // 证件类型
      .card-type {
        display: flex;
        align-items: center;
        padding: 0 17px;
        font-size: 15px;
        background-color: #fff;
        border-bottom: 1px solid #f9f9fb;
        .label {
          width: 130px;
        }
        .value {
          flex: 1;
        }
        .van-dropdown-menu {
          width: 50px;
          height: 100%;
          /deep/.van-dropdown-menu__bar {
            box-shadow: none;
            height: 38px;
            /deep/.van-dropdown-menu__title {
              &::after {
                top: -4px;
                width: 4px;
                height: 4px;
              }
            }
          }
        }
      }
      // 身份证
      .img {
        padding: 14px 20px 0;
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
        /deep/.van-field__control {
          box-shadow: 1px 1px 9999px #ffffff inset;
        }
      }
      //是否最终受益人
      .beneficiary {
        padding: 14px 16px;
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
      // 弹窗
      .van-popup {
        .prop-content {
          padding: 50px 15px 10px;
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
              box-shadow: 1px 1px 9999px #ffffff inset;
            }
          }
        }
        .van-button {
          position: absolute;
          right: 0;
          top: 5px;
          border: none;
          font-size: 30px;
        }
      }
    }
    //步骤三
    .third-container {
      .account-type,
      .witch-bank,
      .bank-add {
        display: flex;
        align-items: center;
        padding: 0 17px;
        font-size: 15px;
        background-color: #fff;
        border-bottom: 1px solid #f9f9fb;
        .label {
          width: 130px;
        }
        .value {
          flex: 1;
          padding: 5px 0;
        }
        .van-dropdown-menu {
          width: 50px;
          height: 100%;
          /deep/.van-dropdown-menu__bar {
            box-shadow: none;
            height: 38px;
            /deep/.van-dropdown-menu__title {
              &::after {
                top: -4px;
                width: 4px;
                height: 4px;
              }
            }
          }
        }
      }
      .outside17 {
        .prop-content {
          padding: 70px 20px 10px;
          .van-cell {
            padding: 5px 0;
            /deep/.van-field__control {
              box-shadow: 1px 1px 9999px #ffffff inset;
            }
          }
          .van-form {
            position: relative;
            .outside-list {
              position: absolute;
              left: 0;
              top: 60px;
              width: 100%;
              height: 300px;
              background-color: #ffffff;
              z-index: 2;
              .item {
                padding: 8px 10px;
                border-bottom: 1px solid #f9f9fb;
                font-size: 12px;
                color: #a1a1a3;
              }
            }
            /deep/.van-cell__title {
              margin: 0;
            }
          }
        }

        .van-button {
          position: absolute;
          right: 0;
          top: 5px;
          border: none;
          font-size: 30px;
        }
      }
      .bank-add {
        .label {
          width: 110px;
          margin-right: 0;
        }
        .van-dropdown-menu {
          flex: 1;
          /deep/.van-dropdown-menu__bar {
            box-shadow: none;
            height: 38px;
            /deep/.van-dropdown-menu__title {
              padding: 0;
              padding-right: 3px;
              font-size: 12px;
              &::after {
                top: 40%;
                right: -12px;
                width: 4px;
                height: 4px;
              }
            }
          }
        }
      }
      .van-cell {
        border-bottom: 1px solid #f9f9fb;
        /deep/.van-cell__title {
          width: 120px;
          font-size: 15px;
        }
        /deep/.van-field__control {
          box-shadow: 1px 1px 9999px #ffffff inset;
        }
        &::after {
          border: none;
        }
      }
      //提交
      .btn-container {
        padding: 8px 20px;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 60px;
        .van-button {
          width: 330px;
          height: 44px;
          border-radius: 25px;
          font-size: 16px;
          background-color: #dededf;
          color: #ffffff;
          &.allowed {
            background-color: #4849a1;
          }
        }
      }
    }
  }
  .map-container {
    background-color: #fff;
    .van-cell {
      /deep/.van-field__control {
        box-shadow: 1px 1px 9999px #ffffff inset;
      }
    }
    .boxxx,
    .detailed-add {
      border-bottom: 1px solid #f9f9fb;
    }
    .detailed-add {
      margin-bottom: 10px;
    }
  }
}
</style>
