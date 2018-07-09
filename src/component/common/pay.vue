<!--
支付组件
参数：key
-->
<template>
  <div id="pay-comp">
    <div class="pro_way"><span>支付方式：</span>
      <div class="zhifubao box" @click="selectPay(1)" v-bind:class="{'boxOk':choose == 1,'boxNo':choose == 2}"><span v-if="choose == 1" id="triangle"></span><i class="iconfont icon-yes"></i></div>
      <div class="weixin box" @click="selectPay(2)" v-bind:class="{'boxOk':choose == 2,'boxNo':choose == 1}"><span v-if="choose == 2" id="triangle"></span><i class="iconfont icon-yes"></i></div>
    </div>
    <div v-if="choose == 1" class="pro_query">
      <div class="erweima" >
        <canvas class="canvas" id="canvas1"></canvas>
      </div>
      <p>支付宝扫码，完成支付</p>
    </div>
    <div v-if="choose == 2" class="pro_query">
      <div class="erweima">
        <canvas class="canvas" id="canvas2"></canvas>
      </div>
      <p>微信扫码，完成支付</p>
    </div>
  </div>
</template>
<script>
 import QRCode from 'qrcode'
 import {appService} from '../../service/appService'
  export default {
    props: ['option'],
    data () {
      return {
        orderNo: '', // 分享标题
        alipayUrl: '', // 分享描述
        channelId: '', // 分享图片链接
        choose: '', // 分享图片链接
      }
    },
    props: ['key'],
    mounted () {
        this.getorderNo()
    },
    methods: {
        selectPay:function(item){
            if(item == 1){
                this.choose = 1
                this.getQrcodeUrl('ALIPAY_WAP')
            } else if(item == 2){
                this.choose = 2
                this.getQrcodeUrl('WX_NATIVE')
            }
        },
        getQrcodeUrl:function (item) {
            const that = this
            // console.log('orderNo',that.orderNo,'channelId',item)
            appService.getErweima({
                orderNo: that.orderNo,
                channelId: item, // 微信h5支付 ALIPAY_PC WX_NATIVE
            }).then(function (res) {
                that.alipayUrl = res.data.datas.codeUrl
                that.channelId = res.data.datas.channelId
                // console.log('alipayUrl',that.alipayUrl)
                // console.log('channelId',that.channelId)
                that.createQRCode(that.alipayUrl,item)
            })
        },
        createQRCode:function (url, way) {
            const that = this;
            if(way == 'ALIPAY_WAP'){
                let canvas1 = document.getElementById('canvas1');
                let aliUrl = 'http://'+location.host+'/alipay?orderNo='+that.orderNo+'&channelId='+that.channelId
                // let aliUrl = 'http://'+location.host+'/alipay?orderNo='+that.orderNo+'&channelId='+that.channelId
                QRCode.toCanvas(canvas1, aliUrl, (error) => {
                    if (error) {
                    } else {
                    }
                })
            } else if(way == 'WX_NATIVE'){
                let canvas2 = document.getElementById('canvas2');
                QRCode.toCanvas(canvas2, url, (error) => {
                    if (error) {
                    } else {
                    }
                })
            }

        },
        getorderNo:function () {
            const that = this
            if(localStorage.utm_source == 'undefined'){
                appService.orderSubmit({
                    key: that.key,
                }).then(function (res) {
                    that.orderNo = res.data.datas
                    that.getQrcodeUrl('ALIPAY_WAP')
                })
            } else {
                appService.orderSubmit({
                    key: that.key,
                    utm_source:localStorage.utm_source,
                    utm_content:localStorage.utm_content,
                    utm_exp:localStorage.utm_exp,
                    utm_sign:localStorage.utm_sign,
                    utm_medium:localStorage.utm_medium,
                    utm_content_type:localStorage.utm_content_type,
                }).then(function (res) {
                    that.orderNo = res.data.datas
                    that.getQrcodeUrl('ALIPAY_WAP')
                })
            }

        },
    },
    watch: {

    }
  }
</script>
<style lang="less">
  #pay-comp{

    .pro_way{
      margin-bottom: 26px;

      span{
        float: left;
        font-size: 16px;
        color: #666666;
        display: inline-block;
        height: 54px;
        line-height: 54px;
      }
      .box{
        width: 140px;
        height: 50px;
        background: #FFFFFF;
        display: inline-block;
        margin-left: 20px;
        position: relative;
        #triangle {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 0;
          height: 0;
          border-bottom: 17px solid #FF3831;
          border-left: 20px solid transparent;
        }
        .icon-yes{
          position: absolute;
          right: -1px;
          bottom: -1px;
          color: #FFFFFF;
          font-size: 10px;
        }
      }
      .box:hover{
        cursor: pointer;
      }
      .zhifubao{
        background-image: url(../../assets/image/pay1.png);
        background-repeat: no-repeat;
        background-size:center;
        background-position: center;
      }
      .weixin{
        background-image: url(../../assets/image/pay2.png);
        background-repeat: no-repeat;
        background-size:center;
        background-position: center;
        background-position: center;
      }
    }

    .boxOk{
      border: 1px solid #FF3831;
    }
    .boxNo{
      border: 1px solid #CCCCCC;
    }
    .pro_query{
      p{
        background: #EEEEEE;
        padding:9px 25px;
        font-size: 14px;
        color: #666666;
        margin-left: 100px;
        display: inline-block;
      }
    }
  }
</style>