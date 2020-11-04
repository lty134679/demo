import Vue from 'vue';
import App from './App.vue';
import router from './router';
import echarts from 'echarts';

// import Vconsole from 'vconsole';
// new Vconsole(); //手机里看到控制台的打印

// 全局组件导入
import MyHeader from '@/components/MyHeader';
import MyNavbar from '@/components/MyNavbar';
import MyInput from '@/components/MyInput';

// 全局过滤
import { timeFilter } from './utils/filters';

// vant
import {
  Form,
  Button,
  Field,
  Checkbox,
  CheckboxGroup,
  Dialog,
  Toast,
  Uploader,
  List,
  PullRefresh,
  Popup,
  Picker,
  Cell,
  CellGroup,
  Icon,
  Switch,
  Skeleton,
  Pagination,
  ImagePreview,
  Search,
  Overlay,
  DropdownMenu,
  DropdownItem,
  Tab,
  Tabs,
  DatetimePicker,
} from 'vant';
Vue.use(Form);
Vue.use(Button);
Vue.use(Field);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Uploader);
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Icon);
Vue.use(Switch);
Vue.use(Skeleton);
Vue.use(Pagination);
Vue.use(ImagePreview);
Vue.use(Search);
Vue.use(Overlay);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(DatetimePicker);

//引入地图组件
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '195fa18ea70101f133a07f02742af48a',
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
    'AMap.Geolocation',
  ],
  v: '1.4.4',
  uiVersion: '1.0',
});
// 屏幕自适应
import 'lib-flexible';
// 基础样式导入
import './style/base.less';

// 图标引入
import './assets/icon2/iconfont';
import './assets/icon2/icon.css';

// axios基础路径
// 不加前缀http的话 在发请求时的路径中系统会自动把本地地址加进去
// axios.defaults.baseURL = 'http://192.168.1.113:10002';

// echarts绑定原型
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

// 全局组件
// 公共头部
Vue.component('my-header', MyHeader);
// 公共导航条
Vue.component('my-navbar', MyNavbar);
//公共表单
Vue.component('my-input', MyInput);

// 全局过滤
Vue.filter('timeFilter', timeFilter);

// 设置手机顶部状态栏颜色
// function plusReady() {
//   // 设置系统状态栏背景为红色
//   var type = plus.os.name;
//   if (type == 'iOS') {
//     console.log('ios');
//     plus.navigator.setStatusBarBackground('red');
//   } else {
//     console.log('非ios');

//     plus.navigator.setStatusBarBackground('black');
//   }
// }

// if (window.plus) {
//   plusReady();
// } else {
//   document.addEventListener('plusready', plusReady, false);
// }

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

// 事件总线
Vue.prototype.$event = new Vue();
