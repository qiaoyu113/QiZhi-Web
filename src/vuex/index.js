/**
 * Created by LXH on 2017/11/10.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import userInfo from './modules/userInfo'
import homeStore from './modules/homeStore'
import loginStore from './modules/loginStore'
import payStore from './modules/payStore'

const store = new Vuex.Store({
    // 定义状态
    state: {
        //正式版
        apiUrl:'https://mini.wetuc.com',
        picHead:'http://resource.wetuc.com/',// 资源地址
        redirect_uri:'http://wetuc.com/wxlogin', //微信指向页面
        appId:'wx7160f239f04c65da',
        url:'http://wetuc.com',

        // apiUrl:'https://mini.dtfind.com',
        // picHead:'http://test.resource.vjuzhen.com/',// 测试版
        // redirect_uri:'http://wetuc.dtfind.com/wxlogin',
        // appId:'wxd5dd1b24ea1e7c02',
        // url:'http://wetuc.dtfind.com',

        logoUrl:'/src/assets/image/logo.png', //王俊测试
        fromPath:['home'],
        description:'运联网是国内专注于物流产业的新媒体，是物流人成长与价值链接的平台，集物流趋势观察、行业研究、信息共享为一体，致力于物流产业链的共同繁荣和整体提升。',
        keyWords:'运联网、专线、供应链、三方物流、零担、快递、快运、整车、园区、仓储、大车队、公路货运、无车承运人、智慧物流、云仓、同城配送、最后一公里、冷链、物联网',
        // 评论数据
        msg:{},
        userId:'',
        replyId:'',
        replyName:'',
        type:'',

    },
    mutations:{
    },
    actions: {
    },
    modules: {
        homeStore: homeStore,
        loginStore: loginStore,  // 登录注册
        userInfo: userInfo,  // 登录注册
        payStore: payStore,  // 支付
    }
})
export default store