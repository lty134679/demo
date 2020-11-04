const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    open: true,
    port: 9191,
    // proxy: {
    //   '/api': {
    //     target: 'http://192.168.1.155:8071', // 要访问的接口域名
    //     ws: true, // 是否启用websockets
    //     changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //     pathRewrite: {
    //       '^/api': '/api', //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
    //     },
    //   },
    // },
  },
  // px转rem配置
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 37,
          }),
        ],
      },
    },
    requireModuleExtension: true,
  },
  // 引入路径的配置，解决文件层级嵌套太深 ../太多的问题
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'));
    config.resolve.alias.set('assets', resolve('src/assets'));

    // svg rule loader
    // const svgRule = config.module.rule('svg'); // 找到svg-loader
    // svgRule.uses.clear(); // 清除已有的loader, 如果不这样做会添加在此loader之后
    // svgRule.exclude.add(/node_modules/); // 正则匹配排除node_modules目录
    // svgRule // 添加svg新的loader处理
    //   .test(/\.svg$/)
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]',
    //   });
    // // 修改images loader 添加svg处理
    // const imagesRule = config.module.rule('images');
    // imagesRule.exclude.add(resolve('src/assets/icons'));
    // config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
  },
  // 去掉打包后的文件的hashing名
  filenameHashing: false,
  // 打包时不生成生产环境的.map文件
  productionSourceMap: false,
  // 打包后的路径 默认是'/'
  publicPath: './',
};
