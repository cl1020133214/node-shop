import api from './install'
import Vue from 'vue'

Vue.use(api);
//微信分享内容
var share = {
    title: '',
    desc: '',
    link: '',
    imgUrl: ''
};
export default {
    install(Vue) {
        //获取页面上的参数信息 ：使用方式this.GetUrlParam("***")
        Vue.prototype.GetUrlParam = function (paraName) {
            var url = document.location.toString();
            var arrObj = url.split("?");

            if (arrObj.length > 1) {
                var arrPara = arrObj[1].split("&");
                var arr;

                for (var i = 0; i < arrPara.length; i++) {
                    arr = arrPara[i].split("=");

                    if (arr != null && arr[0] == paraName) {
                        return arr[1];
                    }
                }
                return "";
            } else {
                return "";
            }
        };
        //微信SDK
        Vue.prototype.wxConfig = function (callback) {
            // 这里用try catch包裹，请求失败的时候就执行catch里的
            try {
                let params = {
                    Url: encodeURIComponent(window.location.href.split('#')[0])
                };
                this.$api.matches.wx_get_sdk_config(params).then(data => {
                    wx.config({
                        debug: false,
                        appId: data.data.app_id,
                        timestamp: data.data.config.timestamp,
                        nonceStr: data.data.config.noncestr,
                        signature: data.data.config.signature,
                        jsApiList: ['updateTimelineShareData', 'updateAppMessageShareData']
                    });
                    wx.ready(function () {
                        wx.updateTimelineShareData({
                            title: data.data.share.title,
                            link: data.data.share.path,
                            imgUrl: data.data.share.image_url,
                            success: function () {
                                callback && typeof callback === 'function' && callback();
                            }
                        });

                        wx.updateAppMessageShareData({
                            title: data.data.share.title,
                            desc: data.data.share.desc,
                            link: data.data.share.path,
                            imgUrl: data.data.share.image_url,
                            success: function () {
                                callback && typeof callback === 'function' && callback();
                            }
                        });
                    });
                })
            } catch (e) {
                console.log('​catch -> e', e)
            }
        };
        //接口
        // Vue.prototype.getlog = function (paraName) {
        //     return new Promise((resolve, reject) => {
        //         let params = {
        //         };
        //         this.$api.matches.log(params).then(res => {
        //             resolve(res);
        //         }).catch(err => {
        //             console.log(err);
        //             reject(err);
        //         });
        //     })
        // };
    }
}
