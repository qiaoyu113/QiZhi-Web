<template>
    <div id="wxcode">
        <div class="tishi" v-if="hintN">
            <div class="tishi-top">{{codeNohas}}</div>
            <div class="tishi-btn font1" @click="btn()">确定</div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {loginService} from '../../service/loginService'
    import {commonService} from '../../service/commonService'
    export default {
        props: [],
        data(){
            return {
                GWC: {
                    version: '1.1.1',
                    urlParams: {},
                },
                hintN:false,
                codeNohas:'',
                codeId:'',
            }
        },
        mounted () {
            let that = this;
            that.getUrlParams();
            that.doRedirect();
        },
        methods: {
            appendParams: function(url, params) {
                let that = this
                if (params) {
                    var baseWithSearch = url.split('#')[0];
                    var hash = url.split('#')[1];
                    for (var key in params) {
                        var attrValue = params[key];
                        if (attrValue !== undefined) {
                            var newParam = key + "=" + attrValue;
                            if (baseWithSearch.indexOf('?') > 0) {
                                var oldParamReg = new RegExp('^' + key + '=[-%.!~*\'\(\)\\w]*', 'g');
                                if (oldParamReg.test(baseWithSearch)) {
                                    baseWithSearch = baseWithSearch.replace(oldParamReg, newParam);
                                } else {
                                    baseWithSearch += "&" + newParam;
                                }
                            } else {
                                baseWithSearch += "?" + newParam;
                            }
                        }
                    }

                    if (hash) {
                        url = baseWithSearch + '#' + hash;
                    } else {
                        url = baseWithSearch;
                    }
                }
                return url;
            },
            getUrlParams: function() {
                let that = this
                var pairs = location.search.substring(1).split('&');
                for (var i = 0; i < pairs.length; i++) {
                    var pos = pairs[i].indexOf('=');
                    if (pos === -1) {
                        continue;
                    }
                    that.GWC.urlParams[pairs[i].substring(0, pos)] = decodeURIComponent(pairs[i].substring(pos + 1));
                }
            },
            doRedirect: function() {
                let that = this
                var code = that.GWC.urlParams['code'];
                var appId = that.GWC.urlParams['appid'];
                var scope = that.GWC.urlParams['scope'] || 'snsapi_base';
                var state = that.GWC.urlParams['state'];
                var redirectUri;
                if (!code) {
                    //第一步，没有拿到code，跳转至微信授权页面获取code
                    redirectUri = that.appendParams('https://open.weixin.qq.com/connect/oauth2/authorize#wechat_redirect', {
                        'appid': appId,
                        'redirect_uri': encodeURIComponent(location.href),
                        'response_type': 'code',
                        'scope': scope,
                        'state': state,
                    });
                    window.localStorage.setItem('openId',appId);
                    location.href = redirectUri;//此处ajax发送请求
                } else {
                    that.codeId = code;
                    //第二步，从微信授权页面跳转回来，已经获取到了code，再次跳转到实际所需页面
                    var platform = that.$store.state.loginStore.platform;

                    loginService.getWXbaseCode({code: code}).then(function (res) {
                        if(res.data.success){
                            let unionid = res.data.datas.unionid
                            commonService.getUnionid({unionid:unionid,platform:'WXH5'}).then(function(res){
                                if(res.data.success){
                                    let token = res.data.datas;
                                    window.localStorage.setItem('token',token);
                                    let codeId = window.localStorage.getItem('codeId');
                                    let shopId = window.localStorage.getItem('pathId')
                                    commonService.getCode({'keyNo':codeId}).then(function(res){
                                        if(res.data.code === 526101 || res.data.code === 524101){
                                            that.hintN = true;
                                            that.codeNohas = '兑换码不能为空';
                                        }
                                        if(res.data.code === 526102 || res.data.code === 524102){
                                            that.hintN = true;
                                            that.codeNohas = '兑换码错误';
                                        }
                                        if(res.data.code === 526103 || res.data.code === 524102){
                                            that.hintN = true;
                                            that.codeNohas = '兑换码已经被使用';
                                        }
                                        if(res.data.code === 526105 || res.data.code === 524105){
                                            that.hintN = true;
                                            that.codeNohas = '兑换码错误';
                                        }
                                        if(res.data.code === 200){
                                            that.hintY = false;
                                            window.localStorage.removeItem('codeId');
                                            let shopId = window.localStorage.getItem('pathId')
                                            setTimeout(function(){
                                                window.location.href = '/shops/'+shopId+'/vip'
                                            },500)
                                        }
                                    })
                                }
                                if(res.data.code === 510112){
                                    let shopId = window.localStorage.getItem('pathId')
                                    let codeId = window.localStorage.getItem('codeId')
                                    that.$router.push({path:'shops/'+shopId+'/vipPhone/'+ codeId})
                                    window.localStorage.removeItem('codeId');
                                }
                            })
                        }
                    })
                }
            },
            btn:function(){
                let shopId = window.localStorage.getItem('pathId')
                window.location.href = '/shops/'+shopId+'/code/'+ that.codeId;
            }
        }
    }
</script>
<style lang="less">
    #wxcode{
        width:100%;
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
        .tishi{
            width: 6rem;
            height: 3rem;
            box-sizing: border-box;
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            text-align: center;
            border: 1px solid #eee;
            background: #fff;
            box-shadow: 0 2px 20px 0 rgba(0,0,0,.12);
            border-radius: 12px;
            z-index: 1000;
            .tishi-top{
                width:100%;
                height:2rem;
                text-align: center;
                line-height:2rem;
                font-size:14px;
            }
            .tishi-btn{
                width:100%;
                height:1rem;
                line-height:1rem;
                text-align: center;
                font-size:14px;
            }
        }
    }
</style>
