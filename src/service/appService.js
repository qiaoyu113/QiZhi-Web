/**
 * Created by LXH on 2017/11/1.
 */
import axios from './axios.js'
import store from '../vuex/'
import qs from 'qs'
import cs from'./commonService'

export const appService = {
    checkLogin: function () {
        let token
        if(typeof localStorage!='undefined') token = localStorage.token;localStorage.redirectUrl = location.href;
        if(token && token != "undefined"){
            return true
        }else{
            return false
        }
    },
    onBridgeReady(){
        function callMenu() {
            WeixinJSBridge.call('showOptionMenu'); //显示菜单
        }
        if (typeof WeixinJSBridge == "undefined" && typeof document != 'undefined'){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', callMenu, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', callMenu);
                document.attachEvent('onWeixinJSBridgeReady', callMenu);
            }
        }else{
            callMenu()
        }
    },
    getWxJssdk:function () {
        this.onBridgeReady()
        let url
        if(typeof localStorage!='undefined') url = encodeURIComponent(window.location.href)
        let p = new Promise(function(resolve, reject){
            axios.get('/wxconfig?url=' + url).then(function (res) {
                let temp = res.data.datas
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: temp.appId, // 必填，公众号的唯一标识
                    timestamp: temp.wxTimestamp+'', // 必填，生成签名的时间戳
                    nonceStr: temp.wxNoncestr, // 必填，生成签名的随机串
                    signature: temp.wxSignature, // 必填，签名，见附录1
                    jsApiList: [
                        'checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem',
                        'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice',
                        'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow',
                        'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                })
                resolve()
            })
        });
        return p;
    },
    getWxShare:function (params,title) {
        let that = this
        if(typeof localStorage!='undefined') params.url =encodeURIComponent(window.location.href)
        // alert(window.location.href)
        axios.get('/shares/'+ cs.getParam(params)).then(function (res) {
            let appShare
            if(res.data && res.data.datas){
                /*
            * 返回参数
            * dataUrl；desc；imgUrl；link；shareType
            * title；type；typeId
            * */
                appShare = {
                    title: res.data.datas.title || title,
                    imageUrl: res.data.datas.imgUrl ? store.state.picHead + res.data.datas.imgUrl : 'http://saas.shequnyi.cn/src/assets/img/sqtlogo.png',
                    brief: res.data.datas.desc || '点击查看详情',
                    url: res.data.datas.dataUrl || params.url
                }
            }else{
                appShare = {
                    title:  title,
                    imageUrl: null,
                    brief: null,
                    url: params.url
                }
            }
            that.wxShare(appShare)
        })
    },
    wxShare:function (shareInfo) {
        // alert(shareInfo.url)
        //分享到朋友圈
        wx.onMenuShareTimeline({
            title: shareInfo.title, // 分享标题
            link: shareInfo.url, // 分享链接
            imgUrl: shareInfo.imageUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            },
            trigger: function () {
                // console.log(shareInfo)
                // 用户取消分享后执行的回调函数
            }
        });
        //分享给好友
        wx.onMenuShareAppMessage({
            title: shareInfo.title, // 分享标题
            desc: shareInfo.brief, // 分享描述
            link: shareInfo.url, // 分享链接
            imgUrl: shareInfo.imageUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            },
            trigger: function () {
                // console.log(shareInfo)
                // 用户取消分享后执行的回调函数
            }
        });
        //分享到QQ
        wx.onMenuShareQQ({
            title: shareInfo.title, // 分享标题
            desc: shareInfo.brief, // 分享描述
            link: shareInfo.url, // 分享链接
            imgUrl: shareInfo.imageUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //分享到微博
        wx.onMenuShareWeibo({
            title: shareInfo.title, // 分享标题
            desc: shareInfo.brief, // 分享描述
            link: shareInfo.url, // 分享链接
            imgUrl: shareInfo.imageUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //分享到QQ空间
        wx.onMenuShareQZone({
            title: shareInfo.title, // 分享标题
            desc: shareInfo.brief, // 分享描述
            link: shareInfo.url, // 分享链接
            imgUrl: shareInfo.imageUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    },
    // 获取orderNo
    orderSubmit: function(params){
        return axios.put('/productpkgs/ordersubmit', qs.stringify(params))
        // return axios.put('/productpkgs/ordersubmit' + this.getParam(params))
    },
    // 支付页面生成支付二维码
    getErweima: function(params){
        return axios.put('/orders' + this.getParam(params))
    },
}
export default {appService}
