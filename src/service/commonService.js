/**
 * Created by LXH on 2017/11/1.
 */
import axios from './axios.js'
import store from '../vuex/'
import qs from 'qs'
import {validate} from '../assets/js/validate'
import {utility} from '../assets/js/utility/utility'

export const commonService = {
    api: {},
    /* 页面头部名称 */
    pageTitle: function (str) {
        document.title = str
    },
    /* 显示密码和隐藏密码切换 */
    hideExchange: function(obj) {
        let part = obj.parentNode;
        let first = part.firstChild;
        if (obj.className === 'iconfont icon-biyan'){
            first.setAttribute('type','password');
            obj.className = 'iconfont icon-yanjing';
        }
        else if (obj.className === 'iconfont icon-yanjing'){
            first.setAttribute('type','text');
            obj.className = 'iconfont icon-biyan';
        }
    },
    /* 图片验证码等一系列 */
    showFitIcon (obj,isRight) {
        let parentN = obj.parentNode;
        let icon =parentN.getElementsByTagName('i');
        if(isRight){
            icon[0].style.display = 'none';
            icon[1].style.display = 'block';

        }else {
            icon[0].style.display = 'block';
            icon[1].style.display = 'none';
        }
    },
    validateImage: function (obj, event) {
        let parentN = obj.parentNode;
        let icon =parentN.getElementsByTagName('i');
        if(event === 'keyup') {
            if(obj.value.trim().length <= 0 ){
                for(let i=0;i< icon.length;i++){
                    if(icon[i].className === 'iconfont icon-shuaxin1'){
                        icon[i].style.display = 'block'
                    }else{
                        icon[i].style.display = 'none'
                    }
                }
            }
        }else if(event === 'click') {
            if(obj.value.trim().length <= 0 ){
                for(let i=0;i< icon.length;i++){
                    if(icon[i].className === 'iconfont icon-shuaxin1'){
                        icon[i].style.display = 'block'
                    }else{
                        icon[i].style.display = 'none'
                    }
                }
            }else {
                for(let i=0;i< icon.length;i++){
                    if(icon[i].className === 'iconfont icon-shuaxin1'){
                        icon[i].style.display = 'none'
                    }else{
                        icon[i].style.display = 'block'
                    }
                }
            }
        }
    },
    /* 清空帐号文本框里面的内容 */
    iptLength (obj) {
        let parent = obj.parentNode;
        let lastChild = parent.lastChild;
        if(obj.value.trim().length > 0 ){
            lastChild.className = 'iconfont icon-Shape'
        }else{
            lastChild.className = 'iconfont icon-Shape hide'
        }
    },
    /* 获取短信验证码的效果功能 */
    validateFromPhone: function (obj, id, flag) {
        let timer;
        if(flag == 0) {
            var count = 0;
            timer = setInterval(function () {
                count = parseInt(document.getElementById('countDown').innerHTML) - 1;
                if(count > 0) {
                    document.getElementById('countDown').innerHTML = count;
                }
                else{
                    clearInterval(timer);
                    obj.innerHTML = '获取验证码';
                    obj.className = 'validateFromPhone'
                    flag = 1;
                }
            },1000);
        }
        return {
            isFlag: flag
        }
    },
    /* 表单验证 */
    formValidate (isPhone, isPwd, isName, isJob, isCompany,params) {
        //1.验证手机号是否为空
        //2. 验证手机号是否正确
        //3.验证图片验证码是否为空
        //4.验证短信验证码是否为空
        //5.密码是否为空
        //6.密码是否是6-24位的字母数字组合

        if(isPhone){ //是否验证手机号
            if(!validate.isEmpty(params.phoneNo)){
                return '请输入手机号';
            }
            if(!validate.isPhoneNumber(params.phoneNo)){
                return '请输入正确的手机号';
            }
        }
        if(isPwd){ //是否验证密码
            if(!validate.isEmpty(params.pwd)){
                return '请输入密码';
            }
            if(!validate.isBetweenMAndN(params.pwd, 6, 24)){
                return '请输入6~24位数字、字母密码组合';
            }
            if(validate.isEnLetter(params.pwd)){//是否只有英文字母
                return '请输入6~24位数字、字母密码组合';
            }
            if(validate.isNumber(params.pwd)){ // 是否只有数字
                return '请输入6~24位数字、字母密码组合';
            }
        }
        if(isName){ //是否验证姓名
            if(!validate.isEmpty(params.name)){
                return '请输入姓名';
            }
            if(!validate.isName(params.name)){
                return '请输入正确的姓名';
            }
        }
        if(isJob){ //是否验证工作
            if(!validate.isEmpty(params.job)){
                return '请选择工作';
            }
        }
        if(isCompany){ //是否验证公司类型
            if(!validate.isEmpty(params.unitType)){
                return '请选择公司类型';
            }
        }
    },
    getPlatForm () {
        let isWx = utility.is_weixin().isWX;
        if(isWx){
            return 'WXH5';
        }else{
            return 'WAPH5';
        }
    },
    getState () {
        let isWx = utility.is_weixin().isWX;
        if(isWx){
            return 'wx';
        }else{
            return 'web';
        }
    },
    /* 验证类弹框n秒后自动关闭 */
    showLoginModal: function (obj) {
        let that = obj
        that.$store.state.msg = {
            text: '请登录后使用',
            type: 1
        };
        setTimeout(function () {
            that.$store.state.msg.type = 0;
        },1000)
    },
    /* 验证类弹框n秒后自动关闭 */
    autoCloseModal: function (obj, mess, typeNo) {
        let that = obj
        that.$message({
            type: 'info',
            message: mess
        });
    },
    /* 根据code获取授权地址 */
    getInfoByCode: function(that, url, code,path) {
        axios.get(url,{code: code}).then(function (res) {
            var infoId = res.data.serinfoid;
            var WGT = res.data.WGT;
            if(!infoId){
                that.$router.push(path)
            }else if(!WGT){
                that.$router.push(window.fromPath)
            }
        });
    },
    /* 转换时间戳为时间 */
    getFormatOfDate: function (date, format) {
        var that = new Date(date*1);
        var date = {
            "M+": that.getMonth() + 1,
            "d+": that.getDate(),
            "h+": that.getHours(),
            "m+": that.getMinutes(),
            "s+": that.getSeconds(),
            "q+": Math.floor((that.getMonth() + 3) / 3),
            "S+": that.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (that.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    },
    /* 价格转换分为元 */
    getFormatOfPrice: function (fen) {
        var yuan;
        yuan = parseFloat(parseInt(fen)/100).toFixed(2);
        return yuan;
    },
    getTimer: function (timesamp) {  /* 倒计时 */
        var ts = (new Date(timesamp*1)) - (new Date());//计算剩余的毫秒数
        var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
        var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
        var mm = parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟数
        var ss = parseInt(ts / 1000 % 60, 10);//计算剩余的秒数
        dd = this.checkTime(dd);
        hh = this.checkTime(hh);
        mm = this.checkTime(mm);
        ss = this.checkTime(ss);
        return {
            dd: dd,
            hh: hh,
            mm: mm,
            ss: ss
        }
    },
    checkTime: function (i){
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    },
    getRedirectPath: function(that) { //获得来的路径
        let token = localStorage.token;
        localStorage.redirectUrl = window.location.href
        if(typeof token != 'undefined' && token.trim().length > 0){ //情况一：存在token
            return 1;
        }else { //情况二：不存在token
            that.$store.state.toolBox.redirect_uri.name = that.$route.name;
            that.$store.state.toolBox.redirect_uri.params = that.$route.params;
            return 0;
        }
    }
}
export default {commonService}
