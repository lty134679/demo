<template>
  <!-- 个人详细信息 -->
  <div class="personalinfo">
    <!-- 头像编辑 -->
    <div class="edit-avatar">
      <img :src="userInfo.headPhotoUrl ? userInfo.headPhotoUrl : ''" alt="" />
      <span @click="showSelect">点击修改头像</span>
      <!-- 上传头像 -->

      <div class="my-upimg" v-show="upLoad">
        <van-uploader v-model="fileList" :max-count="1" />
        <div class="btn1" @click="select(0)">取消</div>
        <div class="btn2" @click="select(1)">确认</div>
      </div>
    </div>
    <!-- 个人信息详情 -->
    <div class="info-items">
      <div class="item">
        <div class="left">姓名</div>
        <div class="center">{{ userInfo.name }}</div>
      </div>
      <div class="item">
        <div class="left">性别</div>
        <div class="center">{{ userInfo.gander }}</div>
      </div>
      <div class="item">
        <div class="left">岗位</div>
        <div class="center">{{ userInfo.operation }}</div>
      </div>
      <div class="item">
        <div class="left">所属部门</div>
        <div class="center">{{ userInfo.groupName }}</div>
      </div>
      <div class="item">
        <div class="left">所属小组</div>
        <div class="center">{{ userInfo.operation }}</div>
      </div>
      <div class="item">
        <div class="left">领导</div>
        <div class="center">王晓燕</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ossUpload } from '@/utils/oss';
import { get, post, put, request } from '@/utils/request';
export default {
  name: 'personalinfo',

  mounted() {
    this.userInfo = this.$route.params.userinfo;
    this.id = this.userInfo.id;
    console.log(this.userInfo);
  },
  data() {
    return {
      fileList: [], //从本地选取的图片信息
      upLoad: false, //控制显示上传界面
      img: '', //要上传到后端的图片
      userInfo: {}, //用户详细信息
      id: '', //用户id
    };
  },
  methods: {
    // 切换选中展示图片
    showSelect() {
      // 展示选取界面
      this.upLoad = !this.upLoad;
    },
    // 确认上传
    async select(value) {
      if (value) {
        if (this.fileList.length === 0)
          return this.$toast('请选择要上传的图片');
        // 取得签名上传oss
        let res = await get('/oss/config');
        let { code, data } = res;
        console.log(res);

        if (code === '200') {
          ossUpload(this.fileList[0].file, data, async ({ name, res }) => {
            this.fileList = [
              {
                name,
                size: this.fileList[0].file.size,
                format: name.substr(name.lastIndexOf('.')),
                url: res.requestUrls[0],
                type: '营业执照',
              },
            ];
            // 将oss获取的图片信息传给后台
            let fromOur = await post('/file/imageFileList', this.fileList);
            if (fromOur.code === '200') {
              // 后台返回的图片id传给另一个后台
              let photo = await put(`/api/marketer-info`, {
                headPhoto: fromOur.data,
                id: this.id,
              });
              // 再请求新的数据
              if (photo.code === '200') {
                this.$toast('修改成功');
                let res = await request.get(
                  `/api/marketer-info/marketer/${this.id}/info`
                );
                let { code, data } = res;
                if (code === '200') {
                  // 隐藏选取界面
                  this.userInfo = data;
                  this.upLoad = false;
                }
              }
            }
          });
        }
      } else {
        // 隐藏选取界面
        this.upLoad = !this.upLoad;
        this.$toast({
          message: '取消成功',
          duration: 500,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.personalinfo {
  background-color: #f9f9fb;
  height: 100%;
  // 头像
  .edit-avatar {
    height: 179px;
    display: flex;
    flex-direction: column;
    background-color: #4849a1;
    align-items: center;
    position: relative;
    img {
      display: block;
      margin-top: 66px;
      width: 61px;
      height: 61px;
      border-radius: 5px;
    }
    span {
      display: block;
      margin-top: 9px;
      font-size: 11px;
      color: #cecece;
    }

    // 上传头像
    .my-upimg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #4849a1;
      padding: 50px 0 0 140px;

      .btn1,
      .btn2 {
        position: absolute;
        right: 10px;
        bottom: 10px;
        width: 50px;
        height: 30px;
        background-color: #1989fa;
        text-align: center;
        line-height: 30px;
        color: #ffffff;
        font-size: 12px;
        border-radius: 5px;
      }
      .btn1 {
        right: 70px;
      }
    }
  }
  //信息详情
  .info-items {
    margin-top: 15px;
    background-color: #fff;
    .item {
      display: flex;
      border-bottom: 1px solid #f7f7f7;
      font-size: 15px;
      height: 50px;
      align-items: center;
      .left {
        width: 100px;
        font-weight: bold;
        padding-left: 20px;
      }
      .center {
        flex: 1;
        padding-left: 30px;
        color: #a1a1a3;
        font-size: 14px;
      }
    }
  }
}
</style>
