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

        // picHead:'http://test.resource.vjuzhen.com/',// 测试版
        // redirect_uri:'http://wetuc.dtfind.com/wxlogin', 
        // apiUrl:'https://mini.dtfind.com',
        // appId:'wxd5dd1b24ea1e7c02',
        // url:'http://wetuc.dtfind.com',

        logoUrl:'/src/assets/image/logo.png', //王俊测试
        fromPath:['home'],
        description:'运联description',
        keyWords:'运联keyWords',

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