module.exports = {
  publicPath: '/',
  lintOnSave: false,
  devServer: {
    // 配置跨域代理
    proxy: {
      "/goods": {//将http://baidui.com"映射为/api
        target: "http://10.0.0.35:3000",//需要代理的baserurl，目标地址
      }
    }
  }
}
