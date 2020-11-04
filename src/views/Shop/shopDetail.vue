<template>
  <!-- 门店详情 -->
  <div
    class="detailContent hide-scroll"
    @touchstart="touchstart"
    @touchend="touchend"
  >
    <my-header :lefticon="true" @click="$router.push('/shopManage')"
      >门店详情</my-header
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
      <div class="business">
        <div class="label">所属商户</div>
        <div class="content">{{ list.merchantName }}</div>
      </div>

      <div class="main">
        <div class="text">门店信息</div>
        <div class="item">
          <div class="title">营业执照</div>
          <div class="imgs">
            <div
              v-if="
                list.businessLicensePhotoUrlList &&
                  list.businessLicensePhotoUrlList.length > 0
              "
              class="block"
            >
              <img
                v-for="item in list.businessLicensePhotoUrlList"
                :src="item.url"
                alt=""
              />
            </div>
            <img v-else src="@/assets/images/changchong.jpg" alt="" />
          </div>
        </div>
        <div class="item">
          <div class="title">机动车维修经营许可证</div>
          <div class="imgs">
            <div
              v-if="
                list.carRepairBusinessPhotoUrlList &&
                  list.carRepairBusinessPhotoUrlList.length > 0
              "
              class="block"
            >
              <img
                v-for="item in list.carRepairBusinessPhotoUrlList"
                :src="item.url"
                alt=""
              />
            </div>
            <img v-else src="@/assets/images/changchong.jpg" alt="" />
          </div>
        </div>
        <div class="item">
          <div class="title">门店头像</div>
          <div class="imgs">
            <div
              v-if="
                list.storeHeadImgUrlList && list.storeHeadImgUrlList.length > 0
              "
              class="block"
            >
              <img
                v-for="item in list.storeHeadImgUrlList"
                :src="item.url"
                alt=""
              />
            </div>
            <img v-else src="@/assets/images/changchong.jpg" alt="" />
          </div>
        </div>
        <div class="item">
          <div class="title">门店照片</div>
          <div class="imgs">
            <div
              v-if="
                list.environmentPhotoUrlList &&
                  list.environmentPhotoUrlList.length > 0
              "
              class="block"
            >
              <img
                v-for="item in list.environmentPhotoUrlList"
                :src="item.url"
                alt=""
              />
            </div>
            <img v-else src="@/assets/images/changchong.jpg" alt="" />
          </div>
        </div>
        <div class="bar">
          <div class="label">门店地址</div>
          <div class="content">{{ list.address }}</div>
        </div>
        <div class="bar">
          <div class="label">负责人姓名</div>
          <div class="content">{{ list.storeManager }}</div>
        </div>
        <div class="bar">
          <div class="label">负责人联系方式</div>
          <div class="content">{{ list.storeManagerPhone }}</div>
        </div>
      </div>
    </div>
    <!-- 模块2 -->
    <div class="block2" v-show="current === 2">
      <div class="type">
        <div class="name">业务类型</div>
        <div class="block">
          <div class="value" v-for="item in list.serviceTypeList">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="rescue">
        <div class="name" :class="{ mgbt10: list.isRescue }">
          是否有救援服务
          <div class="boolean">{{ list.isRescue ? '是' : '否' }}</div>
        </div>
        <div class="block" v-show="list.isRescue">
          <div class="value" v-for="item in list.rescueTypeList">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from '@/utils/request';

export default {
  name: 'shopdetail',

  activated() {
    this.id = this.$route.query.id;
    this.getList(this.id);
  },
  data() {
    return {
      list: '',
      id: '',
      current: 1,
      startX: '',
    };
  },
  methods: {
    // 请求门店详情
    async getList(id) {
      try {
        let res = await get(`/api/store-info/${id}/storeInfoDetailExtension`);
        console.log(res);
        if (res.code === '200') {
          this.list = res.data;
          this.getBusiness(this.list.merchantId);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取商户信息
    async getBusiness(id) {
      try {
        let res = await get(`/api/merchant-info/${id}/merchantInfoDetail`);
        if (res.code === '200') {
          this.$set(this.list, 'merchantName', res.data.merchantName);
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
};
</script>

<style lang="less" scoped>
.detailContent {
  height: 100%;
  padding-top: 130px;
  color: #a1a1a3;
  font-size: 14px;

  .my-header {
    color: black;
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
  //模块1
  .block1 {
    // 商户
    .business {
      padding: 13px 19px;
      display: flex;
      align-items: center;
      color: black;
      font-size: 16px;
      .content {
        margin-left: 73px;
      }
    }
    // 信息主体
    .main {
      .text {
        padding: 7px 11px;
        background-color: #f9f9fb;
      }
      .item {
        padding: 13px 20px;
        border-bottom: 1px solid #f9f9fb;
        .title {
          font-size: 16px;
          color: #000000;
          margin-bottom: 13px;
        }
        .imgs {
          display: flex;
          img {
            display: block;
            width: 59px;
            height: 53px;
            object-fit: contain;
            border: 1px solid #cccccc;
          }
        }
      }
      .bar {
        padding: 12px 20px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f9f9fb;
        .label {
          width: 130px;
          font-size: 16px;
          color: #000000;
        }
      }
    }
  }
  // 模块2
  .block2 {
    font-size: 15px;
    color: #a1a1a3;
    .type,
    .rescue {
      padding: 15px 25px;
      border-bottom: 1px solid #f9f9fb;
      .name {
        display: flex;
        color: black;
        margin-bottom: 18px;
        .boolean {
          margin-left: 22px;
          color: #a1a1a3;
        }
      }
      .block {
        display: flex;
        .value {
          width: 100px;
          padding: 2px 5px;
          border: 1px dashed #ccc;
          border-radius: 10px;
          text-align: center;
          margin-right: 10px;
          font-size: 14px;
          color: black;
        }
      }
    }
  }
}
</style>
