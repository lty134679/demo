import Vue from 'vue';
import VueRouter from 'vue-router';
import { getLocal, setLocal } from '../utils/local';

// 路由懒加载 可以分开打包并且命名
// 登录页
const Login = () => import(/*webpackChunkName: 'Login'*/ '@/views/Login/index');
// 主页
const Home = () => import(/*webpackChunkName: 'Home'*/ '@/views/Home/Home');
// 首页
const Index = () => import(/*webpackChunkName: 'Index'*/ '@/views/Home/Index');
// 统计
const Statistic = () =>
  import(/*webpackChunkName: 'Statistic'*/ '@/views/Home/Statistic');

// 我的模块
const Personal = () => import(/*webpackChunkName: 'my'*/ '@/views/My/index');
const Personalinfo = () =>
  import(/*webpackChunkName: 'my'*/ '@/views/My/Personalinfo');
const Performance = () =>
  import(/*webpackChunkName: 'my'*/ '@/views/My/Performance');
const PmList = () => import(/*webpackChunkName: 'my'*/ '@/views/My/PmList');
const StoreInfo = () =>
  import(/*webpackChunkName: 'my'*/ '@/views/My/Storeinfo');
const Team = () => import(/*webpackChunkName: 'my'*/ '@/views/My/Team');

// 优惠券系列
const Coupons = () =>
  import(/*webpackChunkName: 'Coupons'*/ '@/views/Coupons/Coupons');
const PlatformActivities = () =>
  import(/*webpackChunkName: 'Coupons'*/ '@/views/Coupons/PlatformActivities');

// 商户模块
const BusinessManage = () =>
  import(/*webpackChunkName: 'BusinessManage'*/ '@/views/Business/index');
const BusinessDetail = () =>
  import(
    /*webpackChunkName: 'BusinessManage'*/ '@/views/Business/BusinessDetail'
  );
const AddBusiness = () =>
  import(/*webpackChunkName: 'BusinessManage'*/ '@/views/Business/AddBusiness');

//店铺模块
const shopManage = () =>
  import(/*webpackChunkName: 'shop'*/ '@/views/Shop/index');
const shopDetail = () =>
  import(/*webpackChunkName: 'shop'*/ '@/views/Shop/shopDetail');
// const addShop = () => import(/*webpackChunkName: 'addShop'*/ '@/views/addShop');
//路由懒加载导致地图加载会报错“v.w.uh is not a constructor”，所以使用普通引入的方式
import addShop from '@/views/Shop/addShop';
const EditShop = () =>
  import(/*webpackChunkName: 'shop'*/ '@/views/Shop/EditShop');
const Joinstate = () =>
  import(/*webpackChunkName: 'shop'*/ '@/views/Shop/joinstate');

//账户模块
const addAccount = () =>
  import(/*webpackChunkName: 'account'*/ '@/views/Account/addAccount');
const accountManage = () =>
  import(/*webpackChunkName: 'account'*/ '@/views/Account/index');
const editAccount = () =>
  import(/*webpackChunkName: 'account'*/ '@/views/Account/editAccount');
const accountDetail = () =>
  import(/*webpackChunkName: 'account'*/ '@/views/Account/accountDetail');

//签约认证
const signContract = () =>
  import(
    /*webpackChunkName: 'signContract'*/ '@/views/SignContract/signContract'
  );
const signDetail = () =>
  import(/*webpackChunkName:'signContract'*/ '@/views/SignContract/signDetail');
const signManage = () =>
  import(/*webpackChunkName:'signContract'*/ '@/views/SignContract/index');
const signEdit = () =>
  import(/*webpackChunkName:'signContract'*/ '@/views/SignContract/signEdit');

// 增值服务
const Appreciation = () =>
  import(/*webpackChunkName:'appreciation'*/ '@/views/Appreciation/index');
const Joinshop = () =>
  import(/*webpackChunkName:'appreciation'*/ '@/views/Appreciation/Joinshop');
const Setmeal = () =>
  import(/*webpackChunkName:'appreciation'*/ '@/views/Appreciation/Setmeal');
const Feedback = () =>
  import(/*webpackChunkName:'appreciation'*/ '@/views/Appreciation/Feedback');
const AddJoinshop = () =>
  import(
    /*webpackChunkName:'appreciation'*/ '@/views/Appreciation/AddJoinshop'
  );

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home/index',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home/index',
    component: Home,
    children: [
      {
        path: 'index',
        name: 'index',
        component: Index,
      },
      {
        path: 'statistic',
        name: 'statistic',
        component: Statistic,
      },
      {
        path: 'personal',
        name: 'personal',
        component: Personal,
      },
      {
        path: 'personalinfo',
        name: 'personalinfo',
        component: Personalinfo,
      },
    ],
  },
  //我的系列
  {
    path: '/performance',
    name: 'performance',
    component: Performance,
  },
  {
    path: '/team',
    name: 'team',
    component: Team,
  },
  {
    path: '/pmlist',
    name: 'pmlist',
    component: PmList,
  },
  //统计系列
  {
    path: '/storeinfo/:id',
    name: 'storeinfo',
    component: StoreInfo,
  },
  //门店系列
  {
    path: '/shopManage',
    name: 'shopmanage',
    component: shopManage,
  },
  {
    path: '/shopdetail',
    name: 'shopdetail',
    component: shopDetail,
  },
  {
    path: '/addShop',
    name: 'addshop',
    component: addShop,
  },
  {
    path: '/editshop',
    name: 'editshop',
    component: EditShop,
  },
  {
    path: '/joinstate',
    name: 'joinstate',
    component: Joinstate,
  },
  //账户系列
  {
    path: '/addAccount',
    name: 'addaccount',
    component: addAccount,
  },
  {
    path: '/accountManage',
    name: 'accountmanage',
    component: accountManage,
  },
  {
    path: '/editAccount',
    name: 'editAccount',
    component: editAccount,
  },
  {
    path: '/accountdetail',
    name: 'accountdetail',
    component: accountDetail,
  },
  //优惠券系列
  {
    path: '/platformactivities',
    name: 'platformactivities',
    component: PlatformActivities,
  },
  {
    path: '/coupons',
    name: 'coupons',
    component: Coupons,
  },
  //商户系列
  {
    path: '/businessmanage',
    name: 'businessmanage',
    component: BusinessManage,
  },
  {
    path: '/businessdetail',
    name: 'businessdetail',
    component: BusinessDetail,
  },
  {
    path: '/addbusiness',
    name: 'addbusiness',
    component: AddBusiness,
  },
  //认证系列
  {
    path: '/signContract',
    name: 'signcontract',
    component: signContract,
  },
  {
    path: '/signdetail',
    name: 'signdetail',
    component: signDetail,
  },
  {
    path: '/signmanage',
    name: 'signmanage',
    component: signManage,
  },
  {
    path: '/signedit',
    name: 'signedit',
    component: signEdit,
  },
  //增值服务
  {
    path: '/appreciation',
    name: 'appreciation',
    component: Appreciation,
  },
  {
    path: '/joinshop',
    name: 'joinshop',
    component: Joinshop,
  },
  {
    path: '/setmeal',
    name: 'setmeal',
    component: Setmeal,
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: Feedback,
  },
  {
    path: '/addjoinshop',
    name: 'addjoinshop',
    component: AddJoinshop,
  },
];

const router = new VueRouter({
  routes,
});

// 设置状态栏字体颜色
function setStyle(to) {
  if (to.fullPath.includes('home')) {
    plus.navigator.setStatusBarStyle('light');
  } else {
    plus.navigator.setStatusBarStyle('dark');
  }
}

// 路由守卫
// router.beforeEach((to, from, next) => {
//   // 设置状态栏字体颜色
//   if (window.plus) {
//     setStyle(to);
//   } else {
//     document.addEventListener('setStyle', setStyle, false);
//   }

//   // 获取之前存的token
//   let token = getLocal('X-Token');
//   if (token !== null) {
//     next();
//   } else {
//     if (to.path === '/login') {
//       next();
//     } else {
//       next('/login');
//     }
//   }
// });
export default router;
