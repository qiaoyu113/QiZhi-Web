/**
 * Created by LXH on 2017/10/31.
 */
import axios from './axios.js'
import qs from 'qs'
import store from'../vuex/'
import cs from'./commonService'
export const modularService = {
    api: {},
    // 所有社群号（1作者，2主办方）
   // allAdminUser: function(params){
   //      return axios.get('/allAdminUser'+ this.getParam(params))
   //  },
   //  // 关注社群号
   //  postFollow: function(params){
   //      return axios.post('/myFollow/'+params.adminId,qs.stringify(params))
   //  },
   // 获取我的收藏
   getUsersCollect: function(params){
        return axios.get('/users/collect'+ this.getParam(params))
    },
   // 取消收藏文章
    postArticlesIdCollect: function(id,params){
        return axios.post('/articles/'+id+'/collect',qs.stringify(params))
    },
     // 取消收藏活动
    postActivitiesIdCollect: function(id,params){
        return axios.post('/activities/'+id+'/collect',qs.stringify(params))
    },
    // 获取我的收藏
   getMyFollow: function(params){
        return axios.get('/myFollow'+ this.getParam(params))
    },
    // 账户设置
    postUsersInfo: function(params){
        return axios.post('/users/info',qs.stringify(params))
    },
    // 获取账户信息
   getUserCenter: function(params){
        return axios.get('/users/center'+ this.getParam(params))
    },
     // 图片上传  
    postBase: function (params) {
        return axios.post('/files/base64',qs.stringify(params))
    },
     // 修改密码  
    putPasswordsPassword: function (params) {
        return axios.put('/passwords/password'+ this.getParam(params))
    },
     // 取消关注  
    putCancleFollow: function (params) {
        return axios.put('/cancleFollow'+ this.getParam(params))
    },
    // 我的订单
   getOrdersUser: function(params){
        return axios.get('/orders/user'+ this.getParam(params))
    },
     // 我的消息
   getInnerletter: function(params){
        return axios.get('/innerletter'+ this.getParam(params))
    },
    // 取消订单  
    putOrdersIdCancel: function (id) {
        return axios.put('/orders'+ id +'/cancel')
    },
    // 订单申请退款  
    putOrdersIdRefundApply: function (id,params) {
        return axios.put('/orders/'+ id +'/refundApply'+this.getParam(params))
    },


    getParam: function(param){
        let url = '';
        for(let key in param){
            if(param[key] !== null){
                url ? url += '&'+key+'='+param[key] : url += key+'='+param[key]
            }
        }
        return url ? '?'+url : ''
    },
    checkLogin: function () {
        localStorage.redirectUrl = location.href
        let token = localStorage.token
        if(token && token != "undefined"){
            return true
        }else{
            /*localStorage.redirectUrl = window.location.href
            setTimeout(function () {
                    localStorage.redirectUrl = location.href
                location.href = location.origin+'/shops/'+store.state.shopId+ '/login/phone'
            },3000)*/
            return false
        }
    }
}
export default {modularService}
