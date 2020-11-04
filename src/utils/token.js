import { get } from '../utils/request';
import { removeLocal } from '../utils/local';
/**
 * 判断设备类型
 * @params null
 * @returns {string}
 */
const browserType = () => {
  let sUserAgent = navigator.userAgent.toLowerCase(); //浏览器的用户代理设置为小写，再进行匹配
  let isIpad = sUserAgent.match(/ipad/i) == 'ipad'; //或者利用indexOf方法来匹配
  let isIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone';
  let isMidp = sUserAgent.match(/midp/i) == 'midp'; //移动信息设备描述MIDP是一套Java应用编程接口，多适用于塞班系统
  let isUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4'; //CVS标签
  let isUc = sUserAgent.match(/ucweb/i) == 'ucweb';
  let isAndroid = sUserAgent.match(/android/i) == 'android';
  let isCe = sUserAgent.match(/windows ce/i) == 'windows ce';
  let isWM = sUserAgent.match(/windows mobil/i) == 'windows mobil';

  if (
    isIpad ||
    isIphoneOs ||
    isMidp ||
    isUc7 ||
    isUc ||
    isAndroid ||
    isCe ||
    isWM
  ) {
    return 'phone';
  } else {
    return 'pc';
  }
};

/**
 * 查询token
 * @params null
 * @returns {string}
 */
export const inquireToken = async () => {
  let res = await get('/token');
  if (res.code === '200') {
    return 'ok';
  } else {
    return 'err';
  }
};

/**
 * 刷新token
 * @params {string} 客户端类型
 * @params {string} 用户角色
 * @params {string} 用户登录名
 * @returns {string} 新token
 */
export const refreshToken = async (type, role, username) => {
  let res = await get('/token/renovation', {
    clientType: type,
    userType: role,
    username: username,
  });
  console.log(res);
};

/**
 * 不同客户端的本地token时效是否过期
 * @params {string} 客户端类型
 * @params {object} token的信息
 * @returns {boolean} 是否过期
 */
export const overTime = (type, token) => {
  if (type === 'phone') {
    //七天
    let limit = 7 * 24 * 60;
    let res = Date.now() - token.date;

    if (res > limite) {
      removeLocal('X-Token');
      removeLocal('lxluserInfo');
      removeLocal('marketer_id');
      return true;
    } else {
      return false;
    }
  } else {
    // 一天
    let limit = 24 * 60;
    let res = Date.now() - token.date;
    if (res > limit) {
      removeLocal('X-Token');
      removeLocal('lxluserInfo');
      removeLocal('marketer_id');
      return true;
    } else {
      return false;
    }
  }
};
