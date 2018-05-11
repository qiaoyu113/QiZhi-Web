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
        redisInfoKey:'',
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
      open2() {
        this.$confirm('该已经绑定过账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '绑定成功!'
          });
          loginService.getWXbindNext({plat:'pc',redisInfoKey: this.redisInfoKey}).then(function (res) {
            if(res.data.code == 200){
              this.$router.push({name:'mySet'});
            } else {
              this.$router.push({name:'mySet'});
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消绑定'
          });
          this.$router.push({name:'mySet'});          
        });
        // const h = this.$createElement;
        // this.$msgbox({
        //   title: '消息',
        //   message: h('p', null, [
        //     h('span', null, '该已经绑定过账号,是否继续 '),
        //   ]),
        //   showCancelButton: true,
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   beforeClose: (action, instance, done) => {
        //     if (action === 'confirm') {
        //       loginService.getWXbindNext({plat:'pc',redisInfoKey: this.redisInfoKey}).then(function (res) {
        //           if(res.data.code == 212102){
        //             this.open2()
        //           } else if(res.data.success){
        //             this.$router.push({name: 'mySet'});
        //           }
        //       })
        //       instance.confirmButtonLoading = true;
        //       instance.confirmButtonText = '执行中...';
        //       setTimeout(() => {
        //         done();
        //         setTimeout(() => {
        //           instance.confirmButtonLoading = false;
        //         }, 300);
        //       }, 3000);
        //       this.$router.push({name: 'mySet'});
        //     } else {
        //       done();
        //     }
        //   }
        // }).then(action => {
        //   this.$message({
        //     type: 'info',
        //     message: 'action: ' + action
        //   });
        // });
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
          
        }
      }
    }
  }
</script>
<style></style>