(function () {
    var params = {};
    alert('进入');
    //Document对象数据
    if (document) {
        params.domain = document.domain || '';
        params.url = document.URL || '';
        params.title = document.title || '';
        params.referrer = document.referrer || '';
        //分析url存储文章类型和文章ID
        var url = params.url;
        var refer = params.referrer;
        if (url != undefined && url != null && url != "") {
            var articleTypeJson = {"article": 1, "activity": 2, "author": 3, "theme": 4};
            var urlArr = url.split("/");
            if (urlArr.length >= 5) {
                for (var json in articleTypeJson) {
                    if (url.indexOf(json) > 0) {
                        if (json == urlArr[3]) {
                            var uArr = urlArr[4]
                                params.articleType = articleTypeJson[json];
                                params.articleId = uArr;
                        }
                        if (json == urlArr[2]) {
                            var uArr = urlArr[4]
                                params.activityType = articleTypeJson[json];
                                params.activityId = uArr;
                        }
                    }
                }
            }
            var fromJson = {
                "from=singlemessage": "微信好友分享",
                "from=timeline": "朋友圈分享",
                "from=groupmessage": "微信群分享",
                "mp.weixinbridge.com":"微信公众号"
            };
            for (var json in fromJson) {
                if (url.indexOf(json) > 0) {
                    params.source = fromJson[json];
                    break;
                }
            }
            if (params.source == undefined && refer != undefined && refer != null && refer != "") {
                if (refer.indexOf("baidu.com") > 0) {
                    params.source = "百度搜索";
                } else {
                    if (urlArr.length >= 3) {
                        var urlDomain = urlArr[2];
                        var referArr = refer.split("/");
                        if (referArr.length >= 3) {
                            if (referArr[2].indexOf(urlDomain) > 0) { //url的domain和refer的domian相同
                                params.source = "直接访问";
                            } else {
                                params.source = referArr[2];
                            }
                        }
                    }
                }
            }else if(params.source == undefined && refer == ""){
                params.source = "直接访问";
            }
            //给pageurl赋值
            if (url.indexOf("?") > 0) {
                params.pageurl = url.split("?")[0];
            } else {
                params.pageurl = url;
            }
        }
    }
    //Window对象数据
    if (window && window.screen) {
        var sh = window.screen.height || 0;
        var sw = window.screen.width || 0;
        params.res = sw + "*" + sh;
        params.cd = window.screen.colorDepth || 0;
    }
    //navigator对象数据
    if (navigator) {
        params.lang = navigator.language || '';
        params.platform = navigator.platform || '';

        var ua = navigator.userAgent;
        if (ua.length > 250) {
            ua = ua.substring(0, 250);
        }
        params.brower = analyzeBrowser(ua);
    }

    params.cookieid = getStatId("zstatId");

    var phone = document.getElementById("sessionPhone");
    if (phone) {
        params.phone = phone.value;
    } else {
        params.phone = "phone";
    }

        params.country = '';
        params.province = '';
        params.city = '';
        params.isp = '';


    //解析_maq配置
    /*if (_maq) {
        for (var i in _maq) {
            switch (_maq[i][0]) {
                case 'web_id':
                    params.webid = _maq[i][1];
                    break;
                default:
                    break;
            }
        }
    }*/
    //拼接参数串
    params.webid =111111;    
    var args = '';
    for (var i in params) {
        if (args != '') {
            args += '&';
        }
        args += i + '=' + encodeURIComponent(params[i]);
    }

    //通过Image对象请求后端脚本
    var img = new Image(1, 1);
    img.src = 'http://tj.wetuc.com/stat.gif?' + args;
})();


/**
 * 获取StatId
 */
function getStatId(statIdName) {
    var statId = getCookie(statIdName);
    if (statId != null && statId.length > 0) {
        return statId;
    } else {
        setStatId(statIdName);
        return getStatId(statIdName);
    }
}
/**
 * 获取cookieId
 */
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}
/**
 * 设置StatId
 */
function setStatId(statIdName) {
    var cookieId = genStatId();
    setCookie(statIdName, cookieId, 365);
}
/**
 * 生成statId
 */
function genStatId() {
    var cookieId = getTimestamp();
    cookieId = "zstat" + "-" + cookieId + "-" + Math.round(Math.random() * 3000000000);
    return cookieId;
}
/**
 * 设置cookieId
 */
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
/**
 * 获取当前时间戳
 */
function getTimestamp() {
    var timestamp = Date.parse(new Date());
    return timestamp;
}
//根据UserAgent区分浏览器(大体)
function analyzeBrowser(userAgent) {
    var browserKeyArr = [{
        name: '遨游',
        agentKey: 'Maxthon'
    }, {
        name: '微信',
        agentKey: 'MicroMessenger'
    },{
        name: '欧朋',
        agentKey: 'Opera'
    }, {//需要放谷歌和Safari之前
        name: 'QQ浏览器',
        agentKey: 'QQBrowser'
    }, {//安卓 QQ浏览器
        name: 'QQ',
        agentKey: 'MQQBrowser'
    }, {
        name: 'QQ',
        agentKey: 'TencentTraveler'
    }, {
        name: '火狐',
        agentKey: 'Firefox'
    }, {
        name: '谷歌',
        agentKey: 'Chrome'
    }, {
        name: '360',
        agentKey: '360SE'
    }, {
        name: '360极速',
        agentKey: '360EE'
    }, {
        name: 'UC',
        agentKey: 'UCWEB'
    }, {
        name: 'UC',
        agentKey: 'UBrowser'
    }, {
        name: '搜狗',
        agentKey: 'MetaSr'
    }, {
        name: 'Navigator',
        agentKey: 'Navigator'
    }, {
        name: '猎豹',
        agentKey: 'LBBROWSER'
    }, {
        name: '世界之窗',
        agentKey: 'TheWorld'
    }, {
        name: '淘宝',
        agentKey: 'TaoBrowser'
    }, {//放最后
        name: 'Safari',
        agentKey: 'Safari'
    }, {
        name: 'IE',
        agentKey: 'MSIE'
    }, {//IE内核
        name: 'IE',
        agentKey: 'Trident'
    }, {
        name: '其他',
        agentKey: ''
    }];
    for (var i = 0, length = browserKeyArr.length; i < length; i++) {
        var pattern = new RegExp(browserKeyArr[i].agentKey);
        if (pattern.test(userAgent)) {
            return browserKeyArr[i].name;
        }
    }
}