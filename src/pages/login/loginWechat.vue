<template>
  <div class="login">
    <p class="login-close"><i class="iconfont icon-guanbi2" @click="closeCurrent"></i></p>
    <form class="login-form">
      <p class="login-title">微信登录</p>
      <div class="canvas" id="canvas"></div>
      <p class="canvas-des">保存二维码到相册微信扫码登录</p>
      <p class="btn-under" @click="goToLoginPage">返回登录</p>
    </form>
  </div>
</template>
<script type="text/ecmascript-6">
  import QRCode from 'qrcodejs2'
  import {loginService} from '../../service/loginService'
  export default {
    props: [],
    data () {
      return {
        // url: 'www.baidu.com'
      }
    },
    mounted: function () {
      let that = this;
      loginService.getWXLoginUrl().then(function (res) {
        let url = res.data.wxLoginUrl
        that.createQRCode(url);
      })
    },
    methods: {
      createQRCode (url) {
        let qrcode = new QRCode(document.getElementById('canvas'),{
          width:180,
          height:180,
          correctLevel : QRCode.CorrectLevel.H,
          text: url
        });
      },
      closeCurrent () {
        //跳转到登录之前的页面
          if(this.$store.state.fromPath.length>1){
              this.$router.back();
          }else{
              this.$router.replace({name:"home"})
          }
      },
      goToLoginPage () {
          this.$router.push({path:'/login'});
      }
    }
  }
</script>
<style lang="less">
  @import "../../assets/css/login.less";
</style>