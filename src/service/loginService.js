/**
 * Created by LXH on 2017/10/31.
 */
import axios from './axios.js'
import qs from 'qs'
import store from'../vuex/'
import cs from'./commonService'
export const loginService = {
    api: {},
    /* 获取Geetest */
    getGaptchas: function (params) {
        return axios.get('/gaptchas' + cs.getParam(params))
    },
    /* 校验Geetest */
    postGaptchas: function (params) {
        return axios.post('/gaptchas',qs.stringify(params))
    },
    /* 通用：验证验证码的对错 */
    postValidateImg: function (params) {
        return axios.post('/kaptchas',qs.stringify(params))
    },
    /* 通用：获取短信验证码 */
    getValidateMess: function (params) {
        return axios.get('/sms' + cs.getParam(params))
    },
    getOauth: function (params) {
        return axios.get('/tokens/oauth' + cs.getParam(params))
    },
    getWXLoginUrl: function (params) { /* 使用微信登录，生成微信登录二维码 */
        return axios.get('/api/get/getWXLoginUrl' + cs.getParam(params))
    },
    registerNext:function(params){
        return axios.post('/users/next', qs.stringify(params))//注册下一步
    },
    
    findsus:function(params){ //忘记密码第二部
        return axios.put('/passwords/next' + cs.getParam(params));
    },
    findphone:function(params){ //忘记密码第三部
        return axios.put('/passwords/phone' + cs.getParam(params));
    },
    phoneLogin: function (params) {
        return axios.post('/tokens/phone', qs.stringify(params))//需要先注册
        // return axios.post('/tokens/bindphone', qs.stringify(params))
    },
    bindPhoneLogin: function (params) {
        return axios.post('/tokens/bindphone', qs.stringify(params))
    },
    noLogin: function() { // 退出登录
        return axios.delete('/tokens');
    },
    pwdLogin: function (params) {
        return axios.post('/tokens/password', qs.stringify(params))
    },
    getWXbind: function(params) {
        return axios.post('/tokens/wxbind', qs.stringify(params));
    },
    getWXbindNext: function(params) {
        return axios.post('/tokens/wxbind/next', qs.stringify(params));
    },
    getWXByCode: function(params) {
        return axios.get('/tokens/wxinfo' + cs.getParam(params));
    },
    getWXbaseCode: function(params) {
        return axios.get('/tokens/wxbaseinfo' + cs.getParam(params));
    },
    getWBByCode: function(params) {
        return axios.get('/tokens/weiboinfo' + cs.getParam(params));
    },
    getQQByCode: function(params) {
        return axios.get('/tokens/qqinfo' + cs.getParam(params));
    },
    bindPhone: function (params) { //绑定手机号
        return axios.put('/users' + cs.getParam(params));
    },
    bindRegister:function (params){ //完善第三方登录注册信息
        return axios.post('/users/third' + cs.getParam(params));
    },
    register: function (params) { 
        return axios.post('/users' , qs.stringify(params));
    },
    friendRegister:function(params){
        return axios.post('/users/invite', qs.stringify(params))//邀请好友注册
    },
    findPwd: function (params) {
        return axios.put('/passwords/phone' + cs.getParam(params));
    },
    modifyPwd: function (params) {
        return axios.put('/passwords/password' + cs.getParam(params));
    },
    packageUserInfo (info) {
        let that = this
        let Base64 = require('js-base64').Base64;
        let obj = eval('('+ Base64.decode(info) +')');
        store.state.userInfo.username = obj.name
        store.state.userInfo.userId = obj.userId
        store.state.userInfo.platform = obj.platform
        store.state.userInfo.exp = obj.exp
        store.state.userInfo.nbf = obj.nbf
    },
    /* 通用：获取验证码 */
    getValidateImg: function (params) {
        return axios.get('/kaptchas' + cs.getParam(params))
    },
}
export default {loginService}
