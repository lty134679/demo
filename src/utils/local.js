/**
 * @name 获取本地数据
 * @params {数据名} String
 */
export const getLocal = (name) => {
  let res = localStorage.getItem(name);
  if (res) {
    return JSON.parse(res);
  } else {
    return res;
  }
};

/**
 * @name 存储本地
 * @params {数据名} String
 * @params {数据} Object
 */
export const setLocal = (name, data) => {
  let res = JSON.stringify(data);
  localStorage.setItem(name, res);
};

/**
 * @name 删除本地数据
 * @params {数据名} String
 */
export const removeLocal = (name) => {
  localStorage.removeItem(name);
};


