<template>
  <div class="qrcode" v-set-title="title">
    <p class="title">微信登录</p>
    <span id="login_container"></span>
    <p class="des">请使用微信扫描二维码登录合通机器人</p>
  </div>
</template>

<script>
    export default {
      data(){
        return{
            title:'微信扫码页'
        }
      },
        props: [''],
        updated() {
        },
        mounted (){
          var obj = new WxLogin({
            id: "login_container",
            appid: "wx4007f9be659079b9",
            scope: "snsapi_login",
            redirect_uri: encodeURIComponent('http://'+ location.host + "/bindwxlogin"),
            // redirect_uri: encodeURIComponent('http://front.docqbot.com/wxlogin'),
            state: Math.ceil(Math.random()*1000),
            style: "black",
            href: ""});
        },
        methods: {
        }
        
    }
</script>

<style lang="less">
    .qrcode{
        height: 700px;
        width: 100%;
        background: rgb(51,51,51);
        text-align: center;
        padding-top: 160px;
        #login_container{
            margin: 0 auto;
        }
    }
    .title{
        width:100%;
        text-align: center;
        font-size: 20px;
        color: #FFFFFF !important;
    }
    .des{
        margin: 0 auto;
        width: 168px;
        font-size: 14px;
        color: #FFFFFF;
    }

</style>
