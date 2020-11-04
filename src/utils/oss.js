import moment from 'moment';

/**
 * @name 上传图片到oss
 * @params {图片} f
 * @params {签名参数} Object
 * @params {回调函数} function
 */
export const ossUpload = (f, options, callback) => {
  // 创建oss实例
  let client = new OSS.Wrapper({
    // region不行 这个带.com的
    // 不要region属性名反而可以
    // endpoint: options.endpoint,
    accessKeyId: options.accessKeyId,
    accessKeySecret: options.accessKeySecret,
    // 不能用backetName
    bucket: options.bucketName,
    stsToken: options.osstoken,
    // urlPrefix: 'oss-cn-hangzhou.aliyuncs.com',
    // secure:true
  });

  //文件格式限制
  let suffix = f.name.substr(f.name.lastIndexOf('.'));
  // console.info('suffix-----------------', suffix);
  //支持的文件格式
  let fileTypes =
    '视频格式:.mp4 .avi .rmvb ' + '图片格式： .jpg .jpeg .gif .png';
  if (fileTypes.indexOf(suffix) == -1) {
    alert('暂不支持该文件格式');
    return;
  }

  //文件大小限制
  if (f.size > 100 * 1000 * 1000) {
    alert('文件不得大于100M');
    return;
  }

  //进度显示 开
  let obj = Date.now(); // 这里是生成文件名
  obj = moment(obj).format('YY-MM-DD');
  let now = Date.parse(new Date());
  let storeAs = '/images/' + obj + '/' + 'images' + obj + '-' + now + f.name; //命名空间

  client
    .multipartUpload(storeAs, f)
    .then((result) => {
      if (result.res.statusCode === 200) {
        // console.log('上传成功', result);
        let url = result.res.requestUrls[0];
        // console.log('上传地址', url);
        if (callback) {
          //去除多余字符
          if (url && url.indexOf('?') != -1) {
            // alert('去除多余字符' + url.indexOf('?'));
            url = url.toString().substring(0, url.indexOf('?'));
          }
          result.res.requestUrls[0] = url;
          callback(result);
        }
      }
    })
    .catch((err) => {
      callback(err);
    });
};
