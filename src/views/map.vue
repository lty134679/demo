<template>
  <div class="gdMap">
    <my-header :lefticon="true" @click="back">选择地址</my-header>

    <el-amap-search-box
      class="search-box"
      ref="search"
      :search-option="searchOption"
      :on-search-result="onSearchResult"
    ></el-amap-search-box>
    <div class="_map">
      <div class="amap-page-container">
        <el-amap
          ref="map"
          vid="amapDemo"
          :plugin="plugin"
          :zoom="zooms"
          :center="center"
          class="amap-demo"
          :events="events"
        >
          <el-amap-marker
            v-for="(marker, index) in makerConf"
            :position="marker"
            :key="index"
          ></el-amap-marker>
        </el-amap>
      </div>
      <div class="adrs">
        <ul class="hide-scroll">
          <li
            class="render"
            v-for="(item, index) in list"
            :key="index"
            :class="currIndex == index ? 'active' : ''"
            @click="select(item, index)"
          >
            <p class="nm">{{ item.name }}</p>
            <p class="address">{{ item.address }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import '../assets/css/allVant.css';

export default {
  props: ['back', 'msg'],
  name: 'amap-page',
  components: {},
  data() {
    var me = this;
    me.city = me.city || '宁波';
    return {
      seac: '',
      list: [],
      currIndex: 0,
      zooms: 18,
      center: [121.465791, 29.822459],
      scrollWheel: false,
      events: {
        init: (o) => {
          o.setCity(me.city, (result) => {
            // console.log("----------setCity", result);
            if (result && result.length > 0) {
              me.zooms = 16;
              me.makerConf[0] = result;
              me.getList(result);
            }
          });
          //去掉logo
          document.getElementsByClassName('amap-logo')[0].style.display =
            'none';
        },
        // 拖拽后的中心点
        dragend: function(e) {
          let point = this.getCenter();
          let pos = [point.lng, point.lat];
          me.makerConf[0] = [point.lng, point.lat];
          me.getList(pos);
        },
        // 点击获取的坐标
        click(e) {
          let { lng, lat } = e.lnglat;
          me.center = [lng, lat];
          me.makerConf[0] = [lng, lat];
          me.$nextTick();
          me.getList([lng, lat]);
        },
      },
      // 中心点
      makerConf: [[121.465791, 29.822459]],
      searchOption: {
        city: me.city,
        citylimit: false,
      },
      plugin: [
        'ToolBar',
        'Scale',
        {
          pName: 'Geolocation',
          events: {
            init(o) {},
            complete: function(result) {
              //定位成功
              var address = result.formattedAddress;
              var point = result.position;
              var obj = {
                address: address,
                name: '',
                location: point,
              };
              me.list = [obj];
              me.makerConf[0] = [point.lng, point.lat];
            },
            error: function() {},
          },
        },
      ],
    };
  },
  created() {
    var me = this;
  },
  mounted() {},
  methods: {
    // 点击搜索结果
    select: function(item, index) {
      var me = this;
      me.currIndex = index;
      var point = item.location;
      me.makerConf[0] = [point.lng, point.lat];
      me.center = [point.lng, point.lat];
      console.log(item);
      var data = {
        add: item.address,
        name: item.name,
        position: [point.lng, point.lat],
      };
      this.$emit('toAddShop', data);
    },
    //  this.$refs.map.$$getCenter()
    getList: function(result) {
      //获取列表
      var me = this;
      me.$Geocoder({
        lnglatXY: result,
        success: function(res) {
          if (res.regeocode && res.regeocode.pois) {
            // console.log(res.regeocode.pois)
            me.list = res.regeocode.pois;
          } else {
            me.list = [];
          }
        },
        error: function(res) {
          me.list = [];
        },
      });
    },
    onSearchResult(pois) {
      console.log(pois, 'pois');

      //搜索
      let latSum = 0;
      let lngSum = 0;
      var me = this;
      var mymap = me.$refs.map.$$getInstance();
      console.log(mymap, 'mymap');

      if (pois && pois.length > 0) {
        //如果长度为1则无需转化
        var poi = pois[0];
        var lng = poi['lng'];
        var lat = poi['lat'];
        me.center = [lng, lat];
        me.makerConf[0] = [lng, lat];
        // me.makerConf.content = poi.name;
        me.list = pois;
      } else {
        me.list = [];
      }
    },
    $Geocoder(options) {
      //将坐标点转化为，详细地址
      options = options || {};
      if (AMap) {
        AMap.plugin(['AMap.Geocoder'], () => {
          const geocoder = new AMap.Geocoder({
            radius: options.radius || 1000,
            extensions: options.extensions || 'all',
          });
          var lnglatXY = options.lnglatXY || [114.397169, 30.50576]; //已知点坐标
          geocoder.getAddress(lnglatXY, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              options.success && options.success(result);
            } else {
              options.error && options.error(status, result);
            }
          });
        });
      }
    },
  },
  watch: {
    list: function() {
      this.currIndex = 0;
    },
    msg(newval) {
      if (newval) {
        this.$refs.search.keyword = newval;
        this.$refs.search.search();
      } else {
        this.$refs.search.keyword = '';
      }
    },
  },
}; //   me.$Geocoder({
//             	lnglatXY:[center.lng, center.lat],
//             	success:function(res){
//             		console.log(res);
//             	}
//     });
</script>

<style lang="less" scoped>
.amap-page-container {
  height: 300px;
  position: relative;
}

.amap-copyright {
  bottom: -50px;
  display: none;
}

.amap-scalecontrol {
  bottom: 2px !important;
}
/deep/.amap-geolocation-con {
  bottom: 15px !important;
  z-index: 199 !important;
}

ul li.active {
  color: blue;
}

.el-vue-search-box-container,
.search-box-wrapper {
  height: 30px;
  line-height: 30px;
  box-shadow: none;
  margin-bottom: 10px;
  width: 100% !important;
  /deep/input {
    border: 1px solid #cccccc !important;
    padding: 0;
    margin-left: 0 !important;
    box-shadow: 1px 1px 10000px #ffffff inset;
  }
}
.el-vue-search-box-container {
  /deep/.search-tips {
    border: none;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 1px;
      background-color: transparent;
    }
  }
}
.render {
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 5px;
  padding-left: 10px;
}
// 名称
.nm {
  /* color: blue; */
  margin: 5px 0;
  font-size: 12px;
  font-weight: bold;
}
// 地址
.address {
  color: grey;
  font-size: 11px;
}
.adrs {
  ul {
    height: calc(100vh - 536px);
  }
}
</style>
