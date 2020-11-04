<template>
  <!-- 关联门店 -->
  <div class="linkContent pdtop">
    <!-- 头部导航 -->
    <my-header :lefticon="true" @click="back">关联门店</my-header>
    <!-- 搜索框 -->
    <div class="content_search">
      <van-search
        v-model="params.storeName"
        placeholder="请输入门店名称"
        show-action
        :clearable="false"
        left-icon=""
        @search="search"
        @cancel="searchMsg = ''"
      >
        <svg slot="right-icon" class="icon" aria-hidden="true" @click="search">
          <use xlink:href="#icon-fangdajing"></use>
        </svg>
      </van-search>
    </div>
    <div class="msgBox">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="content_msg">
          <img
            :src="
              item.storeHeadImgUrlList !== null &&
              item.storeHeadImgUrlList.length > 0
                ? item.storeHeadImgUrlList[0]
                : defaultImg
            "
            alt=""
          />
          <div class="text">
            <ul>
              <li id="vendorName">{{ item.storeName }}</li>
              <li>地址：{{ item.address }}</li>
              <li>信息完善：未完善</li>
            </ul>
          </div>
        </div>
        <div class="selete">
          <van-checkbox v-model="item.edit" @click="changeEdit(item)"
            >编辑并查看
            <template #icon="props">
              <img
                class="img-icon"
                :src="props.checked ? activeIcon : inactiveIcon"
              />
            </template>
          </van-checkbox>
          <van-checkbox v-model="item.read" @click="changeRead(item)"
            >仅查看
            <template #icon="props">
              <img
                class="img-icon"
                :src="props.checked ? activeIcon : inactiveIcon"
              />
            </template>
          </van-checkbox>
        </div>
      </div>
    </div>
    <div class="submit">
      <input type="submit" value="确定" @click="submit" />
    </div>
  </div>
</template>
<script>
import { get, post } from '@/utils/request';
import { getLocal } from '@/utils/local';

export default {
  name: 'linkshop',
  props: ['back', 'outside', 'username'],
  data() {
    return {
      defaultImg: require('@/assets/images/huluwa.jpg'),
      // 选中的图片
      activeIcon: require('@/assets/images/duoxuan1.png'),
      inactiveIcon: require('@/assets/images/duoxuan0.png'),
      // 搜索关键字
      params: {
        currentPage: 1,
        pageSize: 10,
        storeName: '',
      },
      //搜索出来的数据
      list: [],
      //选中数组
      shopList: [],
    };
  },
  mounted() {
    this.getList();
  },

  methods: {
    // 搜索
    async search() {
      if (!this.searchMsg.trim()) {
        this.searchMsg = '';
        this.$toast('门店名称不能为空！');
        return;
      }
      this.getList(this.params);
    },
    // 获取列表
    async getList(params) {
      try {
        let res = await get('/api/store-info/storeInfoListExtension', params);
        if (res.code === '200') {
          if (res.data.data.length === 0) {
            this.$toast('暂无数据,请重新搜索！');
            return;
          }
          if (this.outside) {
            this.outside.forEach((item) => {
              res.data.data.some((it, index) => {
                if (item.id === it.id) {
                  res.data.data[index] = item;
                  return true;
                }
              });
            });
          }
          // 判断新请求的数据中是否有之前操作过 有就复制 没有就新增2个属性
          this.list = res.data.data.map((item) => {
            let it = this.shopList.find((it) => {
              if (it.id === item.id) {
                return it;
              }
            });
            if (it) {
              item = it;
            } else {
              if (item.isCheck === 0) {
                this.$set(item, 'edit', true);
              } else if (item.isCheck === 1) {
                this.$set(item, 'read', true);
              } else {
                this.$set(item, 'edit', '');
                this.$set(item, 'read', '');
              }
            }
            return item;
          });

          if (this.shopList.length === 0) {
            this.list.forEach((item) => {
              if (item.isCheck === 0 || item.isCheck === 1) {
                this.shopList.push(item);
              }
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 选中编辑
    changeEdit(val) {
      // 空数组就直接添加
      if (this.shopList.length === 0) {
        this.shopList.push(val);
      } else {
        // 不空的话对比是否里面已经有了
        let res = this.shopList.find((item) => item.id === val.id);
        // 没有就直接添加
        if (!res) {
          this.shopList.push(val);
        } else {
          // 有的话就找出来修改
          this.shopList.forEach((item) => {
            if (item.id === val.id) {
              console.log(item.edit, val.edit);
              if (item.edit) {
                item.read = false;
              }
              // 2个属性都为空就剔除
              if (!item.edit && !item.read) {
                this.shopList = this.shopList.filter((it) => it.id !== val.id);
              }
            }
          });
        }
      }
    },
    // 选中查看
    changeRead(val) {
      if (this.shopList.length === 0) {
        this.shopList.push(val);
      } else {
        let res = this.shopList.find((item) => item.id === val.id);
        if (!res) {
          this.shopList.push(val);
        }
        if (res) {
          this.shopList.forEach((item) => {
            if (item.id === val.id) {
              if (item.read) {
                item.edit = false;
              }
              if (!item.edit && !item.read) {
                this.shopList = this.shopList.filter((it) => it.id !== val.id);
              }
            }
          });
        }
      }
    },
    //确定
    submit() {
      if (this.shopList.length === 0) {
        this.$toast('请选择关联门店');
        return;
      } else {
        this.$dialog
          .confirm({
            title: '温馨提示',
            message: `您已选中${this.shopList.length}家门店，是否确认`,
          })
          .then(() => {
            this.$emit('toAddShop1', this.shopList);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.linkContent {
  font-size: 12px;
  background: #f9f9fb;
}

// 搜索

.content_search {
  position: fixed;
  top: 87px;
  z-index: 999;
  width: 100%;
  line-height: 60px;
  height: 60px;
  background: #fbf8fb;
  .van-search {
    background-color: #f9f9fb;
    /deep/.van-cell {
      border-radius: 22px;
      background-color: #fff;
    }
    /deep/.van-icon-search::before {
      font-size: 20px;
    }
    /deep/.van-search__action {
      color: #46479e;
    }
    /deep/.van-field__control {
      padding-left: 20px;
    }
  }
}
.msgBox {
  width: 100%;
  background-color: #f9f9fb;
  padding-bottom: 80px;
}
.item {
  padding: 14px 23px 7px 20px;
  margin-bottom: 7px;
  background-color: #fff;
  // 店铺信息
  .content_msg {
    border-bottom: 1px solid #707070;
    display: flex;
    position: relative;
    padding-bottom: 20px;
    font-size: 12px;
    background: #ffffff;

    img {
      display: block;
      width: 100px;
      height: 94px;
      border: 1px solid #cccccc;
      object-fit: cover;
    }

    .text {
      line-height: 35px;
      margin-left: 39px;
      display: flex;
      color: #666666;
      justify-content: space-around;
      flex-direction: column;
    }
  } //店铺名称颜色
  #vendorName {
    font-size: 16px;
    font-weight: bold;
    text-shadow: 0.1px 0.1px 0.1px #46479e;
    color: #46479e;
  } //编辑查看
  .selete {
    height: 30px;
    background: #ffffff;
    font-size: 12px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    /deep/.van-checkbox {
      margin-right: 10px;
      /deep/.van-checkbox__label {
        font-weight: bold;
      }
      /deep/.van-checkbox__icon {
        margin-bottom: 5px;
      }
    }
  }
}
// 确定
.submit {
  height: 70px;
  background: #ffffff;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px 20px;
  input {
    width: 335px;
    height: 50px;
    background: #4849a1;
    font-size: 16px;
    color: white;
    border-radius: 10px;
  }
}
</style>
