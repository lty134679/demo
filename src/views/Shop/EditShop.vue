<template>
  <!-- 编辑门店 -->
  <div
    class="edit-shop hide-scroll"
    :class="{ pdtop60: showMap }"
    ref="editShop"
    @touchstart="touchstart"
    @touchend="touchend"
  >
    <div v-show="!showMap">
      <my-header :lefticon="true" @click="$router.push('/shopManage')"
        >编辑门店</my-header
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
        <div class="main">
          <!-- 所属商户 -->
          <van-cell-group
            @click="
              $router.push({
                name: 'businessmanage',
                params: { mark: 'editshop' },
              })
            "
          >
            <van-field
              v-model="userInfo.merchantName"
              :readonly="true"
              label="所属商户"
              :required="true"
            >
              <svg slot="right-icon" class="icon" aria-hidden="true">
                <use xlink:href="#icon-ic_arrowr-copy"></use>
              </svg>
            </van-field>
          </van-cell-group>
          <div class="body">
            <div class="text">门店信息</div>
            <!-- 图片 -->
            <div class="photo-list">
              <div class="business-license item">
                <div class="title">营业执照</div>
                <van-uploader v-model="business.list" multiple :max-count="1" />
              </div>
              <div class="repair-license item">
                <div class="title">机动车维修经营许可证</div>
                <van-uploader
                  v-model="repairPhotos.list"
                  multiple
                  :max-count="6"
                />
              </div>
              <div class="avatar item">
                <div class="title">门店头像</div>
                <van-uploader
                  v-model="storeAvatar.list"
                  multiple
                  :max-count="1"
                />
              </div>
              <div class="photos item">
                <div class="title">门店照片</div>
                <van-uploader
                  v-model="storePhotos.list"
                  multiple
                  :max-count="6"
                />
              </div>
            </div>
            <!-- 条 -->
            <div class="bars">
              <van-cell-group>
                <!-- 地址 -->
                <van-field
                  :readonly="true"
                  :required="true"
                  label="门店地址"
                  @click="toggle"
                >
                  <div slot="right-icon" class="block">
                    <div>
                      {{ add }}
                    </div>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-ic_arrowr-copy"></use>
                    </svg>
                  </div>
                </van-field>
                <!-- 联系人 -->
                <van-field
                  v-model="obj.storeManager"
                  :required="true"
                  label="负责人姓名"
                />
                <!-- 手机号 -->
                <van-field
                  v-model="userInfo.storeManagerPhone"
                  :required="true"
                  readonly
                  label="负责人联系方式"
                >
                  <div
                    class="change"
                    slot="right-icon"
                    @click="phone.showPopup = true"
                  >
                    更换号码
                  </div>
                </van-field>
                <!-- 修改号码 -->
                <van-popup
                  v-model="phone.showPopup"
                  position="bottom"
                  closeable
                  round
                  :style="{ height: '40%' }"
                >
                  <van-form @submit="onSubmit">
                    <van-field
                      v-model="phone.value1"
                      name="value1"
                      maxlength="6"
                      :required="true"
                      label="验证码"
                      placeholder="请输入验证码"
                      :rules="[
                        {
                          required: true,
                          message: '验证码不能为空',
                          trigger: 'onBlur',
                        },
                        {
                          pattern: phone.pattern,
                          message: '验证码应为6位数字',
                          trigger: 'onChange',
                        },
                      ]"
                    >
                      <div
                        slot="right-icon"
                        :class="{ oldsvg: phone.getOld }"
                        class=" svg"
                        @click="getOld"
                      >
                        {{ phone.oldmsg }}
                      </div>
                    </van-field>
                    <van-field
                      v-model="phone.newphone"
                      name="newphone"
                      maxlength="11"
                      :required="true"
                      :clearable="true"
                      label="新手机号"
                      placeholder="请输入新手机号"
                      :rules="[
                        { required: true, message: '号码不能为空' },
                        { validator, message: '格式不正确' },
                      ]"
                    />
                    <van-field
                      v-model="phone.value2"
                      maxlength="6"
                      name="value2"
                      :required="true"
                      label="新验证码"
                      placeholder="请输入验证码"
                      :rules="[
                        {
                          required: true,
                          message: '验证码不能为空',
                        },
                        {
                          pattern: phone.pattern,
                          message: '验证码应为6位数字',
                        },
                      ]"
                    >
                      <div
                        slot="right-icon"
                        :class="{ newsvg: phone.getNew }"
                        class=" svg"
                        @click="getNew"
                      >
                        {{ phone.newmsg }}
                      </div>
                    </van-field>
                    <div style="margin: 16px">
                      <van-button
                        round
                        block
                        :style="[
                          { backgroundColor: '#4849a1' },
                          { color: '#fff' },
                        ]"
                        native-type="submit"
                      >
                        下一步
                      </van-button>
                    </div>
                  </van-form>
                </van-popup>
              </van-cell-group>
            </div>
          </div>
        </div>
      </div>
      <!-- 模块2 -->
      <div class="block2" v-show="current === 2">
        <!-- 业务类型 -->
        <div class="type">
          <van-field label="业务类型" readonly required />
          <div class="items">
            <div
              class="item"
              :class="{ select: obj.serviceType.upkeep }"
              @click="obj.serviceType.upkeep = !obj.serviceType.upkeep"
            >
              保养
            </div>
            <div
              class="item"
              :class="{ select: obj.serviceType.beautify }"
              @click="obj.serviceType.beautify = !obj.serviceType.beautify"
            >
              美容洗车
            </div>
            <div
              class="item"
              :class="{ select: obj.serviceType.repair }"
              @click="obj.serviceType.repair = !obj.serviceType.repair"
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
          <transition name="fade">
            <div class="items" v-show="userInfo.isRescue">
              <div
                class="item"
                :class="{ select: obj.rescueType.pull }"
                @click="obj.rescueType.pull = !obj.rescueType.pull"
              >
                拖车
              </div>
              <div
                class="item"
                :class="{ select: obj.rescueType.recharge }"
                @click="obj.rescueType.recharge = !obj.rescueType.recharge"
              >
                搭电
              </div>
              <div
                class="item"
                :class="{ select: obj.rescueType.tyre }"
                @click="obj.rescueType.tyre = !obj.rescueType.tyre"
              >
                换胎
              </div>
            </div>
          </transition>
        </div>
        <div class="button">
          <van-button type="info" @click="submit">保存</van-button>
        </div>
      </div>
    </div>
    <!-- 选址 -->
    <div class="map" v-show="showMap">
      <div class="boxxx">
        <van-field
          v-model="userInfo.district"
          label="所属区域"
          required
          readonly
          placeholder="请选择所属区域"
          right-icon="arrow"
          @click="isArea = true"
        />
        <van-popup
          v-model="isArea"
          round
          position="bottom"
          style="zIndex: 10000"
          :style="{ height: '40%' }"
        >
          <van-picker
            title="选择所在区县"
            show-toolbar
            :columns="area"
            @confirm="selectArea"
            @cancel="isArea = false"
          ></van-picker>
        </van-popup>
      </div>
      <div class="detailed-add">
        <van-field
          v-model="detailedAdd"
          label="详细地址"
          placeholder="请输入详细地址"
        />
      </div>
      <mymap :back="toggle" @toAddShop="address" :msg="searchMsg"></mymap>
    </div>
  </div>
</template>
<script>
import { get, post, put } from '@/utils/request';
import { ossUpload } from '@/utils/oss';
import mymap from '@/views/map';
import { getLocal } from '@/utils/local';
export default {
  name: 'editshop',
  components: {
    mymap,
  },
  activated() {
    if (this.$route.params.id) {
      this.userInfo.id = this.$route.params.id;
      this.getStoreInfo(this.userInfo.id);
    }
    if (this.$route.params.val) {
      this.userInfo.merchantName = this.$route.params.val.merchantName;
      this.userInfo.merchantId = this.$route.params.val.id;
    }
  },
  data() {
    return {
      obj: {},
      current: 1,
      startX: '',
      //最终要传给后台的对象
      userInfo: {
        id: '',
        marketerId: getLocal('marketer_id'),
        merchantName: '', //商户名称
        merchantId: '', // 所属商户id
        // storeName: '', //门店名称
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
        isRescue: false, //是否有救援类型
        rescueTypeList: [], //救援类型
        serviceTypeList: [], //业务类型
      },
      // 营业执照
      business: {
        list: [],
        aly: [],
        count: 0, //这2个
        length: 0, //记录每个图片是否上传完毕
        key: 'businessLicensePhotoId',
        name: '营业执照',
        mark: '', //记录是否有原图还是有新增
      },
      //修理执照
      repairPhotos: {
        list: [],
        aly: [],
        count: 0,
        length: 0,
        key: 'carRepairBusinessPhotoId',
        name: '修理执照',
        mark: '',
      },
      //门店头像
      storeAvatar: {
        list: [],
        aly: [],
        count: 0,
        length: 0,
        key: 'storeHeadImgId',
        name: '门店头像',
        mark: '',
      },
      //门店照片
      storePhotos: {
        list: [],
        aly: [],
        count: 0,
        length: 0,
        key: 'environmentPhotoId',
        name: '门店照片',
        mark: '',
      },
      // 所有的是否上传成功
      calc: {
        count: 0,
        length: 0,
      },
      // 手机号
      phone: {
        value1: '', //输入的旧手机验证码
        oldsvg: '', //获取的旧手机验证码
        getOld: false, //是否获得了旧手机验证码
        oldmsg: '获取验证码',
        newphone: '', //新号码
        value2: '', //输入的新手机验证码
        newsvg: '', //获取的新手机验证码
        getNew: false, //是否获得了新手机验证码
        newmsg: '获取验证码',
        pattern: /\d{6}/,
        showPopup: false, //显隐
      },
      showMap: false, //显隐地图
      isArea: false, //显示区域
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
      // 输入地址
      detailedAdd: '',
    };
  },
  computed: {
    // 门店地址
    add() {
      return this.obj.address ? this.obj.address : '请选择门店地址';
    },
    searchMsg() {
      if (this.detailedAdd.trim()) {
        return this.detailedAdd;
      }
    },
  },
  methods: {
    // 获取门店信息
    async getStoreInfo(id) {
      try {
        let res = await get(`/api/store-info/${id}/storeInfoDetailExtension`);
        console.log(res);

        if (res.code === '200') {
          this.obj = res.data;
          this.handleObj();
          this.getBusiness(this.obj.merchantId);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 处理门店信息
    handleObj() {
      // 将之前存放的数据初始化
      if (
        this.business.list.length > 0 ||
        this.repairPhotos.list.length > 0 ||
        this.storeAvatar.list.length > 0 ||
        this.storePhotos.list.length > 0
      ) {
        Object.assign(this.$data.business, this.$options.data().business);
        Object.assign(
          this.$data.repairPhotos,
          this.$options.data().repairPhotos
        );
        Object.assign(this.$data.storeAvatar, this.$options.data().storeAvatar);
        Object.assign(this.$data.storePhotos, this.$options.data().storePhotos);
      }
      // 处理图片
      let arr = [
        this.business,
        this.repairPhotos,
        this.storeAvatar,
        this.storePhotos,
      ];
      arr.forEach((item) => {
        if (item.name === '营业执照') {
          if (
            this.obj.businessLicensePhotoUrlList !== null &&
            this.obj.businessLicensePhotoUrlList.length > 0
          ) {
            this.obj.businessLicensePhotoUrlList.forEach((it) => {
              console.log(it, '////');

              item.list.push({
                url: it.url,
              });
            });
          }
        }
        if (item.name === '修理执照') {
          if (
            this.obj.carRepairBusinessPhotoUrlList !== null &&
            this.obj.carRepairBusinessPhotoUrlList.length > 0
          ) {
            this.obj.carRepairBusinessPhotoUrlList.forEach((it) => {
              item.list.push({
                url: it.url,
              });
            });
          }
        }
        if (item.name === '门店头像') {
          if (
            this.obj.storeHeadImgUrlList !== null &&
            this.obj.storeHeadImgUrlList.length > 0
          ) {
            this.obj.storeHeadImgUrlList.forEach((it) => {
              item.list.push({
                url: it.url,
              });
            });
          }
        }
        if (item.name === '门店照片') {
          if (
            this.obj.environmentPhotoUrlList !== null &&
            this.obj.environmentPhotoUrlList.length > 0
          ) {
            this.obj.environmentPhotoUrlList.forEach((it) => {
              item.list.push({
                url: it.url,
              });
            });
          }
        }
      });
      this.userInfo.storeManagerPhone = this.obj.storeManagerPhone;
      // 处理业务类型
      let serviceType = {
        upkeep: false,
        beautify: false,
        repair: false,
      };
      this.$set(this.obj, 'serviceType', serviceType);
      if (this.obj.serviceTypeList.length > 0) {
        this.obj.serviceTypeList.forEach((item) => {
          if (item === '保养') {
            this.obj.serviceType.upkeep = true;
          }
          if (item === '美容洗车') {
            this.obj.serviceType.beautify = true;
          }
          if (item === '维修') {
            this.obj.serviceType.repair = true;
          }
        });
      }

      // 处理救援服务
      let rescueType = {
        pull: false,
        recharge: false,
        tyre: false,
      };
      this.$set(this.obj, 'rescueType', rescueType);
      if (this.obj.rescueTypeList.length > 0) {
        this.userInfo.isRescue = true;
        this.obj.rescueTypeList.forEach((item) => {
          if (item === '拖车') {
            this.obj.rescueType.pull = true;
          }
          if (item === '搭电') {
            this.obj.rescueType.recharge = true;
          }
          if (item === '换胎') {
            this.obj.rescueType.tyre = true;
          }
        });
      }
    },
    // 获取商户信息
    async getBusiness(id) {
      try {
        let res = await get(`/api/merchant-info/${id}/merchantInfoDetail`);
        if (res.code === '200') {
          this.userInfo.merchantName = res.data.merchantName;
          this.userInfo.merchantId = res.data.id;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 保存提交
    submit() {
      let arr = [
        this.business,
        this.repairPhotos,
        this.storeAvatar,
        this.storePhotos,
      ];
      arr.forEach((item) => {
        let arr1 = item.list.filter((it) => it.file);
        let arr2 = item.list.filter((it) => !it.file);
        if (arr1.length > 0 && arr2.length > 0) {
          //既有新增又有原图的情况
          item.length = arr1.length;
          item.mark = 3;
          this.calc.count++;
          arr1.forEach((it) => this.oss(it.file, item));
        }
        if (arr1.length > 0 && arr2.length === 0) {
          //只有新增的图片
          item.length = arr1.length;
          item.mark = 2;
          this.calc.count++;
          arr1.forEach((it) => this.oss(it.file, item));
        }
        if (arr1.length === 0 && arr2.length > 0) {
          //只有原图
          this.calc.count++;
          item.mark = 1;
          arr2.forEach((it) => {
            let obj = {
              type: item.name,
            };
            obj.url = it.url;
            item.aly.push(obj);
          });
          this.backstage(item);
        }
      });
      if (this.calc.count === 0) {
        //啥图片都没有的情况
        this.handleFinal();
      }
    },
    // 上传oss
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
    // 上传后台
    async backstage(value) {
      let res = await post('/file/imageFileList', value.aly);
      if (res.code == '200') {
        this.calc.length++;
        this.userInfo[value.key] = res.data;
      }
    },
    // 切换地图
    toggle() {
      this.showMap = !this.showMap;
      if (this.showMap) {
        this.$nextTick(() => (this.$refs.editShop.scrollTop = 0));
      } else {
        this.$nextTick(() => (this.$refs.editShop.scrollTop = 900));
      }
    },
    // 接收地图组件传来的地址
    address(val) {
      this.showMap = false;
      this.$nextTick(() => (this.$refs.editShop.scrollTop = 900));
      this.obj.address = val.add + '' + val.name;
      this.userInfo.storeLongitude = val.position[0];
      this.userInfo.storeLatitude = val.position[1];
    },
    //区域选择
    selectArea(val) {
      this.userInfo.district = val;
      this.isArea = false;
    },
    //获取旧验证
    async getOld() {
      if (this.phone.getOld) return;
      try {
        let res = await get(`/sms/validation/${this.obj.storeManagerPhone}`);
        if (res.code === '200') {
          this.phone.oldsvg = res.data;
          this.phone.getOld = true;
          let num = 60;
          let id = setInterval(() => {
            num--;
            this.phone.oldmsg = num + 's重新获取';
            if (num == 0) {
              this.phone.getOld = false;
              this.phone.oldmsg = '获取验证码';
              clearInterval(id);
            }
          }, 1000);
        }
      } catch (err) {
        console.log(err);
      }
    },
    //获取新手机的验证码
    async getNew() {
      if (!this.validator(this.phone.newphone)) {
        this.$toast('请输入正确的手机号');
        return;
      }
      if (this.phone.getNew) return;
      try {
        let res = await get(`/sms/validation/${this.phone.newphone}`);
        if (res.code === '200') {
          this.phone.newsvg = res.data;
          this.phone.getNew = true;
          let num = 60;
          let id = setInterval(() => {
            num--;
            this.phone.newmsg = num + 's重新获取';
            if (num == 0) {
              this.phone.getNew = false;
              this.phone.newmsg = '获取验证码';
              clearInterval(id);
            }
          }, 1000);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 校验手机号
    validator(val) {
      return /^1[3456789]\d{9}$/.test(val);
    },
    // 确定更换号码
    async onSubmit({ newphone, value1, value2 }) {
      if (value1 !== this.phone.oldsvg) {
        this.$toast('旧验证码不正确，请重新输入');
        return;
      }
      if (value2 !== this.phone.newsvg) {
        this.$toast('新验证码不正确，请重新输入');
        return;
      }
      try {
        let res = await get(`/sms/validation/check`, {
          mobile: this.obj.storeManagerPhone,
          verificationCode: value1,
        });
        if (res.code == '400') {
          this.$toast('旧验证码' + res.message + '，请重新获取');
          return;
        }
        let res2 = await get(`/sms/validation/check`, {
          mobile: newphone,
          verificationCode: value2,
        });
        if (res2.code === '400') {
          this.$toast('新验证码' + res.message + '，请重新获取');
          return;
        }
      } catch (err) {
        console.log(err);
      }
      this.userInfo.storeManagerPhone = newphone;
      this.phone.value1 = '';
      this.phone.value2 = '';
      this.phone.newphone = '';
      this.phone.showPopup = false;
    },
    // 所有数据准备完毕
    async handleFinal() {
      // 判断服务类型不为空
      let service = Object.keys(this.obj.serviceType).find(
        (item) => this.obj.serviceType[item]
      );
      if (!service) return this.$toast('请选择服务类型');
      Object.keys(this.obj.serviceType).forEach((item) => {
        if (this.obj.serviceType[item]) {
          if (item === 'upkeep') {
            this.userInfo.serviceTypeList.push('保养');
          }
          if (item === 'beautify') {
            this.userInfo.serviceTypeList.push('美容洗车');
          }
          if (item === 'repair') {
            this.userInfo.serviceTypeList.push('维修');
          }
        }
      });
      // 判断救援类型不为空
      if (this.userInfo.isRescue) {
        let rescue = Object.keys(this.obj.rescueType).find(
          (item) => this.obj.rescueType[item]
        );
        if (!rescue) return this.$toast('请选择救援类型');
        Object.keys(this.obj.rescueType).forEach((item) => {
          if (this.obj.rescueType[item]) {
            if (item === 'pull') {
              this.userInfo.rescueTypeList.push('拖车');
            }
            if (item === 'recharge') {
              this.userInfo.rescueTypeList.push('搭电');
            }
            if (item === 'tyre') {
              this.userInfo.rescueTypeList.push('换胎');
            }
          }
        });
      }

      this.userInfo.address = this.obj.address;
      this.userInfo.storeLongitude = this.obj.storeLongitude;
      this.userInfo.storeLatitude = this.obj.storeLatitude;
      this.userInfo.storeManager = this.obj.storeManager;

      try {
        let res = await put('/api/store-info', this.userInfo);
        console.log(res, 'res');

        if (res.code == 200) {
          this.showOverlay = false;
          this.$toast('修改成功');
          Object.assign(this.$data, this.$options.data());
          this.$router.push('/shopManage');
        }
      } catch (err) {
        console.log(err);
      }
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
  watch: {
    business: {
      handler(nv) {
        if (nv.mark === 3) {
          // 混合态
          if (nv.count !== 0 && nv.count === nv.length) {
            nv.list
              .filter((item) => !item.file)
              .forEach((it) => nv.aly.push(it));
            this.backstage(nv);
            nv.count = 0;
          }
        }
        if (nv.mark === 2) {
          //只有新增
          if (nv.count !== 0 && nv.count === nv.length) {
            this.backstage(nv);
            nv.count = 0;
          }
        }
      },
      deep: true,
    },
    storePhotos: {
      handler(nv) {
        if (nv.mark === 3) {
          // 混合态
          if (nv.count !== 0 && nv.count === nv.length) {
            nv.list
              .filter((item) => !item.file)
              .forEach((it) => nv.aly.push(it));
            this.backstage(nv);
            nv.count = 0;
          }
        }
        if (nv.mark === 2) {
          //只有新增
          if (nv.count !== 0 && nv.count === nv.length) {
            this.backstage(nv);
            nv.count = 0;
          }
        }
      },
      deep: true,
    },
    repairPhotos: {
      handler(nv) {
        if (nv.mark === 3) {
          // 混合态
          if (nv.count !== 0 && nv.count === nv.length) {
            nv.list
              .filter((item) => !item.file)
              .forEach((it) => nv.aly.push(it));
            this.backstage(nv);
            nv.count = 0;
          }
        }
        if (nv.mark === 2) {
          //只有新增
          if (nv.count !== 0 && nv.count === nv.length) {
            this.backstage(nv);
            nv.count = 0;
          }
        }
      },
      deep: true,
    },
    storeAvatar: {
      handler(nv) {
        if (nv.mark === 3) {
          // 混合态
          if (nv.count !== 0 && nv.count === nv.length) {
            nv.list
              .filter((item) => !item.file)
              .forEach((it) => nv.aly.push(it));
            this.backstage(nv);
            nv.count = 0;
          }
        }
        if (nv.mark === 2) {
          //只有新增
          if (nv.count !== 0 && nv.count === nv.length) {
            this.backstage(nv);
            nv.count = 0;
          }
        }
      },
      deep: true,
    },
    calc: {
      handler(nv) {
        if (nv.count !== 0 && nv.count === nv.length) {
          this.handleFinal();
        }
      },
      deep: true,
    },
  },
};
</script>
<style lang="less" scoped>
.edit-shop {
  padding-top: 130px;
  height: 100%;

  &.pdtop60 {
    padding-top: 60px;
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
  // 模块1
  .block1 {
    .main {
      .body {
        .text {
          padding: 7px 11px;
          font-size: 12px;
          color: #999999;
          background-color: #f9f9fb;
        }
        .photo-list {
          .item {
            padding: 13px 20px;
            border-bottom: 1px solid #f9f9fb;
            .title {
              font-size: 16px;
              margin-bottom: 13px;
            }
            .van-uploader {
              /deep/.van-image {
                width: 59px;
                height: 53px;
              }
              /deep/.van-uploader__upload {
                width: 59px;
                height: 53px;
                margin: 0;
              }
            }
          }
        }
        .bars {
          .van-cell {
            display: flex;
            align-items: center;
            padding: 13px 23px 13px 11px;
            border-bottom: 1px solid #f9f9fb;
            // 左侧文本
            /deep/.van-cell__title {
              padding-left: 8px;
              width: 120px;
              color: black;
            }
            // input框
            /deep/.van-field__body {
              /deep/.van-field__control {
                color: #a1a1a3;
                box-shadow: 1px 1px 99999px #ffffff inset;
              }
              /deep/.van-field__right-icon {
                padding: 0;
              }
            }
            .block {
              display: flex;
              align-items: center;
              justify-content: space-between;
              div:first-child {
                padding-right: 5px;
                width: 200px;
                text-align: left;
              }
            }
            &::after {
              width: 0;
            }
            .change {
              border: 1px solid #4849a1;
              padding: 2px 14px;
              border-radius: 16px;
              color: #4849a1;
              font-size: 12px;
            }
          }
          // 换号码弹窗
          .van-popup {
            .van-form {
              padding: 40px 5px 0 10px;
              .van-cell {
                /deep/.van-field__control {
                  color: black;
                }
                /deep/.van-field__right-icon {
                  position: absolute;
                  top: 50%;
                  right: 0;
                  transform: translateY(-50%);
                  .svg {
                    padding: 2px 6px;
                    border: 1px solid #4849a1;
                    border-radius: 15px;
                    font-size: 10px;
                    color: #4849a1;
                    &.oldsvg {
                      color: #cccccc;
                      background-color: #f0f0f0;
                      border: 1px solid #cccccc;
                    }
                    &.newsvg {
                      color: #cccccc;
                      background-color: #f0f0f0;
                      border: 1px solid #cccccc;
                    }
                  }
                }
              }
            }
          }
        }
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
    // 保存
    .button {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 74px;
      padding: 12px 20px;
      background-color: #fff;
      .van-button {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background-color: #4849a1;
        font-size: 16px;
      }
    }
  }
  // 地图模块
  .map {
    margin: 0;
    .van-cell {
      padding: 12px 20px;
      /deep/.van-field__control {
        box-shadow: 1px 1px 999px #ffffff inset;
      }
      &::after {
        content: none;
      }
    }
    .detailed-add,
    .boxxx {
      border-bottom: 1px solid #f9f9fb;
    }
    .detailed-add {
      margin-bottom: 10px;
    }
  }
}
</style>
