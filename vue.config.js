module.exports = {
  publicPath: '/',
  lintOnSave: false,
  devServer: {
    // 配置跨域代理
    proxy: {
      "/goods": {//将http://baidui.com"映射为/api
        target: "http://localhost:3000",//需要代理的baserurl，目标地址
      },
      "/goods/addCart": {//将http://baidui.com"映射为/api
        target: "http://localhost:3000",//需要代理的baserurl，目标地址
      }
    }
  }
}
