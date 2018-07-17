/**
 * Created by LXH on 2017/10/31.
 */
import axios from './axios.js'
import qs from 'qs'
import store from'../vuex/'
import {tl} from'../mixin/tool'
import {utility} from '../assets/js/utility/utility'

export const userService = {
    api: {},
    /* 获取个人中心 */
    myCenter: function () {
        return axios.get('/users/center')
    },
    /*  评论接口（接收）  */
    getComments:function(params){
        return axios.get('/comments'+ tl.getParam(params));
    },
    /*  评论接口（发送）
     * id,parentId,type,typeId,typeTitle,
     * originalUserId,originalUserName,userId, userName,
     * userHeadImg,content,commentTime,top,show,admin,adminId
     * */
    postComments:function(param){
        return axios.post('/comments',qs.stringify(param));
    }
}
