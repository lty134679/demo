<template>
  <!-- 首页 -->
  <div class="index">
    <!-- 看板 -->
    <div class="panel">
      <div class="store-nums">
        <div class="nums">35</div>
        <div class="text">平台门店</div>
      </div>
      <div class="user-nums">
        <div class="nums">8</div>
        <div class="text">平台商户</div>
      </div>
    </div>
    <!-- 导航菜单 -->
    <div class="menu">
      <div class="top">
        <div class="left">
          <div @click="$router.push('/addbusiness')">
            <div class="circle">
              <div>1</div>
              <img src="@/assets/images/lujing.png" alt="" />
            </div>
            <div class="txt">添加商户</div>
          </div>
          <div @click="$router.push('/addShop')">
            <div class="circle">
              <div>2</div>
              <img src="@/assets/images/lujing.png" alt="" />
            </div>
            <div class="txt">添加门店</div>
          </div>
          <div>
            <div class="circle" @click="$router.push('/addAccount')">
              <div>3</div>
              <img src="@/assets/images/lujing.png" alt="" />
            </div>
            <div class="txt">添加账户</div>
          </div>
        </div>
        <div class="sign-contract" @click="$router.push('/signContract')">
          <div class="circle">4</div>
          <div class="txt ">签约认证</div>
        </div>
      </div>
      <div class="bottom">
        <div class="menu-item " @click="$router.push('/businessmanage')">
          <img src="@/assets/images/shanghuguanli.png" alt="" />
          <div class="text">
            商户管理
          </div>
        </div>
        <div class="menu-item" @click="$router.push('/shopManage')">
          <img src="@/assets/images/mendianguanli.png" alt="" />
          <div class="text">
            门店管理
          </div>
        </div>
        <div class="menu-item" @click="$router.push('/accountManage')">
          <img src="@/assets/images/zhanghuguanli.png" alt="" />
          <div class="text">
            账户管理
          </div>
        </div>
        <div class="menu-item" @click="$router.push('/signmanage')">
          <img src="@/assets/images/qianyueguanli.png" alt="" />
          <div class="text">
            签约管理
          </div>
        </div>
        <div class="menu-item" @click="$router.push('/platformactivities')">
          <img src="@/assets/images/pingtaihuodong.png" alt="" />
          <div class="text">
            平台活动
          </div>
        </div>
        <div class="menu-item" @click="$router.push('/coupons')">
          <img src="@/assets/images/youhuiquan.png" alt="" />
          <div class="text">优惠券</div>
        </div>
        <div class="menu-item" @click="$router.push('/appreciation')">
          <img src="@/assets/images/zengzhifuwu.png" alt="" />
          <div class="text">增值服务</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  methods: {},
};
</script>

<style lang="less" scoped>
.index {
  padding-bottom: 86px;
  // 看板
  .panel {
    width: 100%;
    height: 196px;
    display: flex;
    background: url('../../assets/images/beijing.png') no-repeat center;
    background-size: 100% 100%;
    position: relative;

    .store-nums,
    .user-nums {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      .nums {
        font-size: 46px;
        font-weight: bold;
        color: #ffffff;
        margin-top: 79px;
      }
      .text {
        margin-top: 8px;
        font-size: 16px;
        color: #ffffff;
      }
    }
    .store-nums {
      position: relative;

      &::after {
        content: '';
        width: 1px;
        height: 93px;
        background-color: #ffffff;
        position: absolute;
        top: 75px;
        right: 0;
      }
    }
  }
  // 导航菜单
  .menu {
    padding: 0 17px;
    margin-top: 34px;
    .top {
      display: flex;
      .left {
        display: flex;
        flex: 1;
        justify-content: space-evenly;
        div {
          width: 83px;
          .circle {
            margin-right: 9px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            div {
              width: 55px;
              height: 55px;
              border-radius: 50%;
              background-color: #4849a1;
              text-align: center;
              line-height: 55px;
              color: #ffffff;
              font-size: 24px;
              margin-right: 8px;
            }
            img {
              display: block;
              width: 18px;
              height: 14px;
            }
          }
          .txt {
            margin-top: 11px;
            font-size: 12px;
            padding-left: 4px;
          }
        }
      }
      .sign-contract {
        .circle {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background-color: #4849a1;
          text-align: center;
          line-height: 55px;
          color: #ffffff;
          font-size: 24px;
          margin-right: 8px;
        }
        .txt {
          margin-top: 11px;
          font-size: 12px;
          padding-left: 4px;
        }
      }
    }
    .bottom {
      padding: 31px 0;
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-evenly;
      .menu-item {
        width: 102px;
        height: 100px;
        margin-bottom: 13px;
        border: 1px solid #4849a1;
        border-radius: 7px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          display: block;
          width: 39px;
          height: 41px;
          margin-top: 20px;
          margin-bottom: 11px;
        }
        .text {
          font-size: 12px;
          text-align: center;
          font-weight: bold;
        }
      }
      .menu-item:nth-child(3n + 2) {
        margin: 0 13.5px;
      }
    }
  }
}
</style>
