import Vue from 'vue'
import store from '../vuex'
import {commonService} from '../service/commonService'

Vue.filter('dateFormate', function (value) {
    function getDateTimeStamp(dateStr){
        return Date.parse(dateStr.replace(/-/gi,"/"));
    }
    // 返回处理后的值
    let result = ''
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - value;
    if(diffValue < 0){return;}
    var monthC =diffValue/month;
    var weekC =diffValue/(7*day);
    var dayC =diffValue/day;
    var hourC =diffValue/hour;
    var minC =diffValue/minute;
    // if(monthC>=6){
    //     result = common.getFormatOfDate(value*1, 'yyyy-MM-dd')
    //     console.log(result,'result')
    // }
    // else if(monthC>=1){
    // 	result="" + parseInt(monthC) + "月前";
    // }
    // else if(weekC>=1){
    // 	result="" + parseInt(weekC) + "周前";
    // }
    if(dayC>1){
        result = commonService.getFormatOfDate(value*1, 'yyyy-MM-dd');
    }
    else if(dayC==1){ //文章信息流时间显示
        result=""+ "昨天";
    }
    else if(hourC>=1){
        result=""+ parseInt(hourC) +"小时前";
    }
    else if(minC>=1){
        result=""+ parseInt(minC) +"分钟前";
    }else
        result="刚刚";
    return result;
})

Vue.filter('readNumFormate',function(value) {
    let result =''
    if(value >= 1000000000){
        result = parseInt(value/1000000000) + "B"
    } else if(value >= 1000000){
        result = parseInt(value/1000000) + "m"
    } else if(value >= 10000){
        result = parseInt(value/1000) + "k"
    } else if(value <= 9999){
        result = value
    }
    return result
})
Vue.filter('picTurn',function(value) {
    let result = store.state.picHead + value
    return result
})
Vue.filter('actDateFormate', function (value) {
    function getDateTimeStamp(dateStr){
        return Date.parse(dateStr.replace(/-/gi,"/"));
    }
    // 返回处理后的值
    let result = ''
    result = tl.getFormatOfDate(value*1, 'MM-dd hh:mm')
    console.log(result,'result')
    return result;
})

Vue.filter('readNumFormate',function(value) {
    let result =''
    if(value >= 1000000000){
        result = parseInt(value/1000000000) + "B"
    } else if(value >= 1000000){
        result = parseInt(value/1000000) + "m"
    } else if(value >= 10000){
        result = parseInt(value/1000) + "k"
    } else if(value <= 9999){
        result = value
    }
    return result
})

Vue.filter('stampFormate',function(id) {
    var date = new Date(id*1);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() < 10 ? '0'+ date.getDate() + ' ': date.getDate() + ' ';
    var h = date.getHours() < 10 ? '0'+ date.getHours() + ':': date.getHours() + ':';
    var m = date.getMinutes() < 10 ? '0'+ date.getMinutes() + ':': date.getMinutes() + ':';
    var s = date.getSeconds() < 10 ? '0'+ date.getSeconds() : date.getSeconds();
    return Y+M+D;
})
Vue.filter('stampFormate2',function(id) {
    var date = new Date(id*1);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() < 10 ? '0'+ date.getDate() + ' ': date.getDate() + ' ';
    var h = date.getHours() < 10 ? '0'+ date.getHours() + ':': date.getHours() + ':';
    var m = date.getMinutes() < 10 ? '0'+ date.getMinutes() + ':': date.getMinutes() + ':';
    var s = date.getSeconds() < 10 ? '0'+ date.getSeconds() : date.getSeconds();

    return Y+M+D+h+m+s;
})
Vue.filter('stampFormate3',function(id) {
    var date = new Date(id*1);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() < 10 ? '0'+ date.getDate() + ' ': date.getDate() + ' ';
    var h = date.getHours() < 10 ? '0'+ date.getHours() + ':': date.getHours() + ':';
    var m = date.getMinutes() < 10 ? '0'+ date.getMinutes()+' ' : date.getMinutes()+' ';
    return M+D+h+m;
})
Vue.filter('stampFormate4',function(id) {
    var date = new Date(id*1);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() < 10 ? '0'+ date.getDate() + ' ': date.getDate() + ' ';
    var h = date.getHours() < 10 ? '0'+ date.getHours() + ':': date.getHours() + ':';
    var m = date.getMinutes() < 10 ? '0'+ date.getMinutes() + ':': date.getMinutes();

    return Y+M+D+h+m;
})
Vue.filter('money',function(id) {
    return ((id / 100).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');;
})
Vue.filter('moneyFormate',function(v) {
    let l = 2
    if((v/100+'').indexOf('.')>-1){
        l = (v/100+'').split('.')[1].length
    }else{
        l=0
    }
    return ((v / 100).toFixed(l) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');;
})
