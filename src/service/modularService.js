/**
 * Created by LXH on 2017/10/31.
 */
import axios from './axios.js'
import qs from 'qs'
import store from'../vuex/'
import cs from'./commonService'
export const modularService = {
    api: {},

   //  // 关注社群号
    postFollow: function(params){
        return axios.post('/myFollow',qs.stringify(params))
    },
    // 获取我的收藏
   daleteTokens: function(params){
        return axios.delete('/tokens'+ this.getParam(params))
    },
    

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
     // 消息已读
   postInnerletter: function(params){
        return axios.post('/innerletter'+ this.getParam(params))
    },
     // 我的未读消息
   getInnerletterIsunread: function(params){
        return axios.get('/innerletter/isunread'+ this.getParam(params))
    },
    // 取消订单  
    putOrdersIdCancel: function (id) {
        return axios.put('/orders/'+ id +'/cancel')
    },
    // 订单申请退款  
    putOrdersIdRefundApply: function (id,params) {
        return axios.put('/orders/'+ id +'/refundApply'+this.getParam(params))
    },
     // 所有社群号
   getAllAdminUser: function(params){
        return axios.get('/allAdminUser'+ this.getParam(params))
    },
     // 社群号详情
   getMyFollowMain: function(params){
        return axios.get('/myFollowMain'+ this.getParam(params))
    },
     // 社群号下的活动
   getActivities: function(params){
        return axios.get('/activities'+ this.getParam(params))
    },

      // 根据订单号查询票
   getMyticketsOrderNoid: function(id){
        return axios.get('/mytickets/orderNo/'+ id)
    },
      // 获取我的活动信息
   getActivitiesId: function(id){
        return axios.get('/activities/'+ id)
    },
      // 获取vip价格
   getVips: function(){
        return axios.get('/vips')
    },
     // 确认订单  
    putVipsOrderconfirm: function (params) {
        return axios.put('/vips/orderconfirm'+this.getParam(params))
    },
     // 生成订单  
    putVipsOrdersubmit: function (params) {
        return axios.put('/vips/ordersubmit'+this.getParam(params))
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
