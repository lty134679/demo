<template>
  <!-- 添加门店 -->
  <div
    class="content hide-scroll"
    ref="content"
    :class="{ pdtop: isAdd === 3 }"
    @touchstart="touchstart"
    @touchend="touchend"
  >
    <!-- 基本信息 -->
    <div v-show="isAdd == 1" class="main">
      <my-header :lefticon="true" @click="$router.push('/home/index')"
        >添加门店</my-header
      >
      <!-- 步骤条 -->
      <div class="progress-bar">
        <div class="first" @click="current = 1">
          <span class="label">门店信息</span>
          <span class="line"></span>
        </div>
        <div
          class="second"
          :class="{ current: current === 2 }"
          @click="current = 2"
        >
          基本信息
        </div>
      </div>
      <!-- 模块1 -->
      <div class="block1" v-show="current === 1">
        <!-- 所属商户 -->
        <div class="boxxx">
          <van-field
            label="所属商户"
            placeholder="选择商户"
            readonly
            v-model="userInfo.merchantName"
            label-class="labelName"
            label-width="120px"
            right-icon="arrow"
            :required="true"
            :rules="[
              {
                required: true,
                message: '所属商户不能为空',
                trigger: 'onBlur',
              },
            ]"
            @click="
              $router.push({
                name: 'businessmanage',
                params: { mark: 'addshop' },
              })
            "
          />
        </div>
        <div class="shopMsg">门店信息</div>
        <van-form>
          <div>
            <!-- 门店名称 -->
            <div class="boxxx">
              <van-field
                v-model="userInfo.storeName"
                name="storeName"
                label="门店名称"
                label-class="labelName"
                label-width="120px"
                :required="true"
                placeholder="请输入门店名称"
                clearable
                :rules="[
                  {
                    required: true,
                    message: '门店名称不能为空',
                    trigger: 'onBlur',
                  },
                ]"
              ></van-field>
            </div>
            <!-- 营业执照 -->
            <div class="uploader-item">
              <div class="boxxx" id="special">
                <van-cell title="营业执照" title-class="labelName"></van-cell>
              </div>
              <van-uploader
                v-model="businessPhotos.list"
                multiple
                :max-count="1"
              ></van-uploader>
            </div>
            <!-- 维修经营许可证 -->
            <div class="uploader-item">
              <div class="boxxx" id="special">
                <van-cell
                  title="机动车维修经营许可证"
                  title-class="labelName"
                ></van-cell>
              </div>
              <van-uploader v-model="repairPhotos.list" multiple></van-uploader>
            </div>

            <!-- 门店头像 -->
            <div class="uploader-item">
              <div class="boxxx" id="special">
                <van-cell title="门店头像" title-class="labelName"></van-cell>
              </div>
              <van-uploader
                v-model="storeAvatar.list"
                multiple
                :max-count="1"
              ></van-uploader>
            </div>
            <!-- 门店照片 -->
            <div class="uploader-item">
              <div class="boxxx" id="special">
                <van-cell title="门店照片" title-class="labelName"></van-cell>
              </div>
              <van-uploader
                v-model="storePhotos.list"
                multiple
                :max-count="6"
              ></van-uploader>
            </div>
            <!-- 门店地址 -->
            <div class="boxxx store-address" @click="showMap">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bitian"></use>
              </svg>
              <div class="label">门店地址</div>
              <div class="value">
                {{ userInfo.address ? userInfo.address : '请选择门店地址' }}
              </div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-ic_arrowr-copy"></use>
              </svg>
            </div>
          </div>
          <!-- 负责人姓名 -->
          <div style="background:#F9F9FB">
            <div class="boxxx">
              <span></span>
              <van-field
                v-model="userInfo.storeManager"
                name="storeManager"
                label-class="labelName"
                label="负责人姓名"
                label-width="120px"
                placeholder="请输入负责人姓名"
                clearable
                :required="true"
                :rules="[
                  {
                    required: true,
                    message: '负责人姓名不能为空',
                    trigger: 'onBlur',
                  },
                ]"
              ></van-field>
            </div>
            <!-- 负责人联系方式 -->
            <div class="boxxx">
              <van-field
                v-model="userInfo.storeManagerPhone"
                name="storeManagerPhone"
                label-class="labelName"
                label="负责人联系方式"
                label-width="120px"
                placeholder="请输入负责人联系方式"
                clearable
                :required="true"
                :rules="[
                  {
                    required: true,
                    message: '负责人联系方式不能为空',
                    trigger: 'onBlur',
                  },
                ]"
              ></van-field>
            </div>
            <!-- 验证码 -->
            <div class="boxxx">
              <div id="svgBox">
                <van-field
                  v-model="svg"
                  name="验证码"
                  label-class="labelName"
                  label="验证码"
                  label-width="120px"
                  :required="true"
                  :placeholder="svgHolder"
                  :class="{ err: !svgBlur }"
                  @blur="svgRe()"
                ></van-field>
                <p id="svg" @click="getSvg" v-show="showSvg">获取验证码</p>
                <p v-show="!showSvg" id="svg">{{ count }}秒后获取</p>
              </div>
            </div>
          </div>
        </van-form>
      </div>
      <!-- 模块2 -->
      <div class="block2" v-show="current === 2">
        <!-- 业务类型 -->
        <div class="type">
          <van-field label="业务类型" readonly required />
          <div class="items">
            <div
              class="item"
              :class="{ select: serviceType.upkeep }"
              @click="serviceType.upkeep = !serviceType.upkeep"
            >
              保养
            </div>
            <div
              class="item"
              :class="{ select: serviceType.beautify }"
              @click="serviceType.beautify = !serviceType.beautify"
            >
              美容洗车
            </div>
            <div
              class="item"
              :class="{ select: serviceType.repair }"
              @click="serviceType.repair = !serviceType.repair"
            >
              维修
            </div>
          </div>
        </div>
        <!-- 救援服务 -->
        <div class="rescue">
          <div class="label">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bitian"></use>
            </svg>
            <div class="text">是否有救援服务</div>
            <div class="value">{{ userInfo.isRescue ? '是' : '否' }}</div>
            <van-switch v-model="userInfo.isRescue" size="18px" />
          </div>
          <div class="items" v-show="userInfo.isRescue">
            <div
              class="item"
              :class="{ select: rescueType.pull }"
              @click="rescueType.pull = !rescueType.pull"
            >
              拖车
            </div>
            <div
              class="item"
              :class="{ select: rescueType.recharge }"
              @click="rescueType.recharge = !rescueType.recharge"
            >
              搭电
            </div>
            <div
              class="item"
              :class="{ select: rescueType.tyre }"
              @click="rescueType.tyre = !rescueType.tyre"
            >
              换胎
            </div>
          </div>
        </div>
      </div>
      <div class="button-container">
        <button
          @click="toAccount"
          :class="{ allowed: trueSave }"
          :disabled="!trueSave"
        >
          保存
        </button>
      </div>
    </div>
    <!-- 地址选择 -->
    <div class="gdMap" v-show="isAdd == 3">
      <div class="boxxx" @click="isArea = true">
        <van-field
          v-model="userInfo.district"
          label="所属区域"
          readonly
          right-icon="arrow"
          placeholder="请选择所在区域"
        />
      </div>
      <van-popup v-model="isArea" round position="bottom" style="zIndex: 10000">
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
          v-model="detailedAdd"
          label="详细地址"
          placeholder="请输入详细地址"
        />
      </div>
      <gdmap @toAddShop="acceptMap" :back="back"></gdmap>
    </div>
    <van-overlay :show="showOverlay" />
  </div>
</template>
<script>
import gdmap from '@/views/map';
import { ossUpload } from '@/utils/oss';
import { get, post } from '@/utils/request';
import { getLocal } from '@/utils/local';
export default {
  name: 'addshop',
  components: {
    gdmap,
  },
  data() {
    return {
      current: 1, //当前模块
      // 搜索框
      searchMsg: '',
      //必填项数据开始------------------------------------
      ContactPhoneHolder: '请输入负责人联系方式',
      ContactPhoneBlur: true,
      svgHolder: '请输入验证码',
      svgBlur: true,
      //手机号码验证
      isPhone: true,
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
      isArea: false, //显隐区域
      //必填项数据结束---------------------------------------
      isAdd: 1,
      //存储后台获得的验证码
      svg: '',
      saveSvg: '',
      //倒计时
      count: '',
      //切换验证码与倒计时
      showSvg: true,
      // 最终上传的用户信息
      userInfo: {
        marketerId: getLocal('marketer_id'),
        merchantName: '', //商户名称
        merchantId: '', // 所属商户id
        storeName: '', //门店名称
        businessLicensePhotoId: '', //营业执照
        carRepairBusinessPhotoId: '', //修理执照
        environmentPhotoId: '', //门店照片
        storeHeadImgId: '', //门店头像
        district: '', //区域
        storeManager: '', //门店负责人
        storeManagerPhone: '', //门店负责人电话
        address: '', //地址
        storeLongitude: '', //经
        storeLatitude: '', //纬
        isRescue: true, //救援服务
        rescueTypeList: [], //救援服务的值
        serviceTypeList: [], //业务类型
      },
      //业务类型和救援类型的辅助数据
      rescueType: {
        pull: true,
        recharge: false,
        tyre: false,
      },
      serviceType: {
        upkeep: false,
        beautify: false,
        repair: false,
      },
      //营业执照
      businessPhotos: {
        list: [],
        aly: [],
        count: 0, //这2个
        length: 0, //记录每个图片是否上传完毕
        key: 'businessLicensePhotoId',
        name: '营业执照',
      }, //门店照片
      storePhotos: {
        list: [],
        aly: [],
        count: 0,
        length: 0,
        key: 'environmentPhotoId',
        name: '门店照片',
      }, //修理执照
      repairPhotos: {
        list: [],
        aly: [],
        count: 0,
        length: 0,
        key: 'carRepairBusinessPhotoId',
        name: '修理执照',
      }, //门店头像
      storeAvatar: {
        list: [],
        aly: [],
        count: 0,
        length: 0,
        key: 'storeHeadImgId',
        name: '门店头像',
      },
      // 所有的是否上传成功
      calc: {
        count: 0,
        length: 0,
      },
      // 遮罩
      showOverlay: false,
      // 保存高亮
      trueSave: false,
      // 校验手机号码格式
      checkPhone: true,
      //详细地址
      detailedAdd: '',
      startX: '',
    };
  },
  mounted() {},
  activated() {
    if (this.$route.params.val) {
      this.userInfo.merchantName = this.$route.params.val.merchantName;
      this.userInfo.merchantId = this.$route.params.val.id;
    }
  },
  methods: {
    //必填项
    // name :字段名 ，blur ：必填项样式控制 ， holder:修改placeHolder， text :placeHolder内容
    requireOp(name, blur, holder, text) {
      if (name == 'svg' ? this[name] == '' : this.userInfo[name] == '') {
        this[blur] = false;
        this[holder] = text;
      }
    },

    //负责人联系方式
    storeContactPhoneRe() {
      this.requireOp(
        'storeManagerPhone',
        'ContactPhoneBlur',
        'ContactPhoneHolder',
        '负责人联系方式不能为空'
      );
      if (this.userInfo.storeManagerPhone !== '') {
        if (!/^1[3456789]\d{9}$/.test(this.userInfo.storeManagerPhone)) {
          this.checkPhone = false;
          this.$toast('手机号码格式不正确');
          return false;
        } else {
          this.checkPhone = true;
        }
      }
    },
    //验证码
    svgRe() {
      this.requireOp('svg', 'svgBlur', 'svgHolder', '验证码不能为空');
    },
    //获取验证码及倒计时
    async getSvg() {
      var phone = this.userInfo.storeManagerPhone;
      try {
        let res = await get('/sms/validation/' + phone);
        if (res.code == 200) {
          this.$toast('获取验证码成功');
          this.saveSvg = res.data;
          clearTimeout(this.timer1);
          this.timer1 = setTimeout(() => {
            this.saveSvg = '';
          }, 1000 * 60 * 5);
        } else {
          this.$toast('获取验证码失败');
        }
        this.showSvg = false;
        const timeCount = 60;
        if (!this.timer) {
          this.count = timeCount;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= timeCount) {
              this.showSvg = false;
              this.count--;
            } else {
              this.showSvg = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
      } catch (err) {
        if (err) {
          this.$toast('请输入正确手机号');
        }
      }
    },
    //上传oss获取图片阿里云地址，存储本地
    // file：upload组件自带图片的信息    imgName：图片传往后台的type名，方便查找  imglist：阿里云地址存放数组
    async oss(file, item) {
      var obj = {
        format: file.type,
        size: file.size,
        type: item.name,
      };
      let { code, data } = await get('/oss/config');
      if (code == '200') {
        ossUpload(file, data, (res) => {
          if (res) {
            obj.url = res.res.requestUrls[0];
            item.aly.push(obj);
            item.count++;
          }
        });
      }
    },

    //提交按钮
    async toAccount() {
      this.showOverlay = true;
      // 处理业务类型
      Object.keys(this.serviceType).forEach((item) => {
        if (this.serviceType[item] === 'upkeep') {
          this.userInfo.serviceTypeList.push('保养');
        }
        if (this.serviceType[item] === 'beautify') {
          this.userInfo.serviceTypeList.push('汽车美容');
        }
        if (this.serviceType[item] === 'repair') {
          this.userInfo.serviceTypeList.push('维修');
        }
      });
      // 处理救援类型
      if (this.userInfo.isRescue) {
        Object.keys(this.rescueType).forEach((item) => {
          if (this.rescueType[item] === 'pull') {
            this.rescueTypeList.push('拖车');
          }
          if (this.rescueType[item] === 'recharge') {
            this.rescueTypeList.push('搭电');
          }
          if (this.rescueType[item] === 'tyre') {
            this.rescueTypeList.push('换胎');
          }
        });
      }

      let all = [
        this.businessPhotos,
        this.storePhotos,
        this.repairPhotos,
        this.storeAvatar,
      ];
      // 判断是否有添加任意一个图片 有就上传到oss
      all.forEach((item, index) => {
        if (item.list.length > 0) {
          this.calc.count++;
          item.length = item.list.length;
          item.list.forEach((it) => this.oss(it.file, item));
        }
      });
      // 如果没有 就直接保存
      if (this.calc.count === 0) {
        try {
          let res = await post('/api/store-info/storeInfo', this.userInfo);
          if (res.code == 200) {
            this.showOverlay = false;
            this.$toast('保存成功');
            Object.assign(this.$data, this.$options.data());
            this.$router.push('/home/index');
          }
        } catch (err) {
          this.showOverlay = false;
          console.log(err);
        }
      }
    },
    //将多张图片传往后台获取一个id，并存放于userInfo
    async backstage(value) {
      let res = await post('/file/imageFileList', value.aly);
      if (res.code == '200') {
        this.calc.length++;
        this.userInfo[value.key] = res.data;
      }
    },
    //接收地图传来的地址信息
    acceptMap(data) {
      this.isAdd = 1;
      this.$nextTick(() => (this.$refs.content.scrollTop = 900));
      this.userInfo.address = data.add + '' + data.name;
      this.userInfo.storeLongitude = data.position[0];
      this.userInfo.storeLatitude = data.position[1];
    },
    //选择区县
    pressArea(value, index) {
      this.isArea = false;
      this.userInfo.district = value;
    },
    // 返回
    back() {
      this.$nextTick(() => {
        this.$refs.content.scrollTop = 900;
      });
      this.isAdd = 1;
    },
    // 显示地图
    showMap() {
      this.$nextTick(() => {
        this.$refs.content.scrollTop = 0;
      });
      this.isAdd = 3;
    },
    // 滑动开始
    touchstart(e) {
      this.startX = e.touches[0].clientX;
    },
    //滑动结束
    touchend(e) {
      let distance = e.changedTouches[0].clientX - this.startX;
      if (distance > 100) {
        if (this.current === 2) {
          this.current = 1;
        }
      }
      if (distance < -100) {
        if (this.current === 1) {
          this.current = 2;
        }
      }
    },
  },
  // 高亮保存按钮
  computed: {
    require() {
      const { storeName, storeManager, storeManagerPhone } = this.userInfo;
      let obj = {
        storeName,
        storeManager,
        storeManagerPhone,
        svg: this.svg,
      };

      let service = Object.keys(this.serviceType).find(
        (item) => this.serviceType[item]
      );

      let isRescue = this.userInfo.isRescue;
      let rescue = '';
      if (this.userInfo.isRescue) {
        rescue = Object.keys(this.rescueType).find(
          (item) => this.rescueType[item]
        );
      }

      let res = Object.keys(obj).find((item) => !!obj[item] === false);

      if (isRescue) {
        // 必填项均填写，手机号码格式正确,验证码不为空，并且正确，方显示高亮
        if (
          !res &&
          service &&
          rescue &&
          this.checkPhone !== false &&
          this.svg !== '' &&
          this.svg == this.saveSvg
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (
          !res &&
          service &&
          this.checkPhone !== false &&
          this.svg !== '' &&
          this.svg == this.saveSvg
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  watch: {
    require(val) {
      val ? (this.trueSave = true) : (this.trueSave = false);
    },
    businessPhotos: {
      handler(nv) {
        if (nv.count !== 0 && nv.count === nv.length) {
          this.backstage(nv);
          nv.count = 0;
        }
      },
      deep: true,
    },
    storePhotos: {
      handler(nv) {
        if (nv.count !== 0 && nv.count === nv.length) {
          this.backstage(nv);
          nv.count = 0;
        }
      },
      deep: true,
    },
    repairPhotos: {
      handler(nv) {
        if (nv.count !== 0 && nv.count === nv.length) {
          this.backstage(nv);
          nv.count = 0;
        }
      },
      deep: true,
    },
    storeAvatar: {
      handler(nv) {
        if (nv.count !== 0 && nv.count === nv.length) {
          this.backstage(nv);
          nv.count = 0;
        }
      },
      deep: true,
    },
    calc: {
      async handler(nv) {
        if (nv.count !== 0 && nv.count === nv.length) {
          this.userInfo.marketerId = getLocal('marketer_id');
          try {
            let res = await post('/api/store-info/storeInfo', this.userInfo);
            if (res.code == 200) {
              this.showOverlay = false;
              this.$toast('保存成功');
              Object.assign(this.$data, this.$options.data());
              this.$router.push('/home/index');
            }
          } catch (err) {
            console.log(err);
          }
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
//大盒子

.content {
  height: 100%;
  font-size: 12px;
  background: #ffffff;
  padding-top: 130px; //如果用margin的话 滚动条获取不到 有可能是塌陷问题
  font-family: 'Microsoft Yahei';
  &.pdtop {
    padding-top: 87px;
  }
  .main {
    padding-bottom: 60px;

    .block1 {
      .uploader-item {
        padding: 0 20px 10px 20px;
        border-bottom: 1px solid #f9f9fb;
        //营业执照等。。。标题
        #special {
          border: none;
          .van-cell {
            padding: 13px 20px 9px 0;
          }
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
      //各种输入框
      .boxxx {
        position: relative;
        border-bottom: 1px solid #f2f2f2;
        // label样式
        ::v-deep .labelName {
          font-size: 15px;
          font-weight: 400;
          color: #000000;
          // padding-left: 6px;
        }
        // 单元格
        .van-cell {
          padding: 12px 20px;
          /deep/.van-field__control {
            box-shadow: 1px 1px 999px white inset;
          }
        }
        &.store-address {
          display: flex;
          align-items: center;
          padding: 14px 20px 14px 2px;
          font-size: 15px;

          .label {
            margin-right: 70px;
          }
          .value {
            flex: 1;
            margin-right: 5px;
            color: #a1a1a3;
          }
        }
      }
    }
    // 进度条
    .progress-bar {
      position: fixed;
      top: 88px;
      left: 0;
      width: 100%;
      height: 43px;
      background-color: #f9f9fb;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      .first,
      .second {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #484848;
        .label {
          font-weight: bold;
          color: #4849a1;
        }
        .line {
          width: 80px;
          height: 1px;
          margin: 0 3px;
          background-color: #4849a1;
        }
        &.current {
          color: #4849a1;
          font-weight: bold;
        }
      }
    }
    // 模块2
    .block2 {
      // 业务类型
      .type {
        .items {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 0;
          .item {
            padding: 5px 10px;
            width: 86px;
            text-align: center;
            border-radius: 7px;
            border: 1px solid #cccccc;
            margin-right: 14px;
            &.select {
              border: 1px solid #4849a1;
              background-color: #4849a1;
              color: #ffffff;
            }
          }
        }
      }
      // 救援服务
      .rescue {
        .label {
          display: flex;
          align-items: center;
          padding: 15px 3px;
          border-top: 1px solid #f9f9fb;
          border-bottom: 1px solid #f9f9fb;
          font-size: 14px;
          .value {
            flex: 1;
            margin-left: 20px;
          }
          .van-switch {
            margin-right: 10px;
          }
        }
        .items {
          display: flex;
          padding: 10px 0;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid #f9f9fb;
          .item {
            padding: 5px 10px;
            width: 86px;
            text-align: center;
            border-radius: 7px;
            border: 1px solid #cccccc;
            margin-right: 14px;
            &.select {
              border: 1px solid #4849a1;
              background-color: #4849a1;
              color: #ffffff;
            }
          }
        }
      }
    }
    // 提交
    .button-container {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 60px;
      padding: 8px 15px;
      background-color: #fff;
      button {
        width: 340px;
        height: 44px;
        background-color: #dededf;
        border-radius: 25px;
        border: none;
        color: #ffffff;
        font-size: 16px;
        &.allowed {
          background-color: #4849a1;
        }
      }
    }
  }
}

//基本信息小横条
.shopMsg {
  height: 30px;
  background: #f9f9fb;
  font-size: 12px;
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

//验证码
#svgBox {
  position: relative;
}
#svg {
  position: absolute;
  right: 10px;
  top: 50%;
  margin-top: -12.5px;
  text-align: center;
  width: 70px;
  height: 20px;
  border: 1px solid #4849a1;
  border-radius: 20px;
  line-height: 20px;
  color: #4849a1;
  white-space: nowrap;
}

.gdMap {
  padding-top: 5px;
}

.err {
  /deep/ input::-webkit-input-placeholder {
    color: red;
  }
}
</style>
