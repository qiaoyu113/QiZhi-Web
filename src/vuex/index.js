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
        picHead:'http://test.resource.vjuzhen.com/',// 测试版
        // picHead:'http://resource.docqbot.com/', // 正式版

        apiUrl:'https://mini.dtfind.com', //测试版
        // apiUrl:'http://api.docqbot.com', //正式版
        // apiUrl:'http://hyxesa.natappfree.cc', //王俊测试

        logoUrl:'/src/assets/image/logo.png', //王俊测试

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