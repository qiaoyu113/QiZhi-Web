/**
 * Created by 乔宇 on 2018/8/28.
 */
/**
 * Created by LXH on 2017/10/31.
 */
import axios from './axios.js'
import qs from 'qs'
import store from'../vuex/'
import cs from'./commonService'
export const brandService = {
    api: {},

    // 获取我的收藏
    getBrand: function(params,id){
        return axios.get('/brands/'+ id +'/home' + this.getParam(params))
    },
    getBrandContent: function(params,id){
        return axios.get('/brands/content/' + id + this.getParam(params))
    },
    getBrandNews: function(params,id){
        return axios.get('/brands/' + id + '/news' + this.getParam(params))
    },
    getDocuments: function(params,id){
        return axios.get('/brands/'+ id +'/document' + this.getParam(params))
    },
    getBrandImg: function(params,id){
        return axios.get('/brands/'+ id +'/media' + this.getParam(params))
    },
    // 取消收藏文章
    postArticlesIdCollect: function(id,params){
        return axios.post('/articles/'+id+'/collect',qs.stringify(params))
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
export default {brandService}
