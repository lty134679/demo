import axios from 'axios';
import { getLocal } from '../utils/local';

export let request = axios.create({
  // baseURL: 'http://121.196.185.245:8071',
  // baseURL: 'http://192.168.1.129:8073',
  baseURL: 'http://192.168.1.155:8071',
});

// 请求拦截
request.interceptors.request.use((config) => {
  config.headers['X-Token'] = getLocal('X-Token');

  return config;
}),
  (err) => {
    return Promise.reject(err);
  };

// 响应拦截
request.interceptors.response.use((response) => {
  return response.data;
}),
  (err) => {
    return Promise.reject(err);
  };

/**
 *@name get请求
 * @params {请求地址} String
 * @params {参数} Object
 */
export const get = (url, params) =>
  request.get(url, {
    params,
  });
/**
 *@name post请求
 * @params {请求地址} String
 * @params {参数} Object
 */
export const post = (url, data) => request.post(url, data);
/**
 *@name put请求
 * @params {请求地址} String
 * @params {参数} Object
 */
export const put = (url, data) => request.put(url, data);
/**
 *@name delete请求
 * @params {请求地址} String
 * @params {参数} Object
 */
export const deletes = (url, data) =>
  request.deletes(url, {
    data,
  });
