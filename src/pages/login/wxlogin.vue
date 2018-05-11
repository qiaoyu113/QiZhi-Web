<template>
  <div></div>
</template>
<script>
  import {appService} from '../../service/appService'
  import {loginService} from '../../service/loginService'
  export default {
    props: [],
    data(){
      // document.title = '微信登录';
      return {
        GWC: {
          version: '1.1.1',
          urlParams: {},
        }
      }
    },
    mounted () {
      let that = this
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
          location.href = redirectUri;//此处ajax发送请求
        } else {
          //第二步，从微信授权页面跳转回来，已经获取到了code，再次跳转到实际所需页面
          let platform = appService.getPlatForm();
          let statea = appService.getState();
          loginService.getWXByCode({code: code,state: statea,platform: platform}).then(function (res) {
            if(res.data.success){
              // that.$router.push({path: '/register'});
              if(res.data.code === 210101) { //登录成功请绑定手机号
                setTimeout(function () {
                  that.$store.state.loginStore.thirdInfo = res.data.datas;
                  that.$router.push({path: '/bind'});
                },2000)
              }else if(res.data.code === 210100){ //登录成功  获取token
                localStorage.token = res.data.datas;
                if(localStorage.redirectUrl && localStorage.redirectUrl!="undefined")
                {
                  let url = localStorage.redirectUrl
                  localStorage.removeItem('redirectUrl')
                  window.location.href = url;
                }
                else {
                  that.$route.params.shopId = localStorage.pathId;
                  that.$router.replace({name: 'home'});
                }

              }else if(res.data.code === 210105){
                  that.$router.push({name: 'mySet'});
              }
            }else {
              /*if(res.data.code === 210101) {

              }*/
            }
          })
        }
      }
    }
  }
</script>
<style></style>