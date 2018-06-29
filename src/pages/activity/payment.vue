<template>
  <div class="payment" v-set-title="title">
    <div class="center">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ name: 'singlePro',params:{id:this.$route.params.id} }">活动</el-breadcrumb-item>
        <el-breadcrumb-item>付款信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div class="pay_title">付款信息</div>
      <div class="bottom">
        <div class="pro_name">活动名称：<router-link :to="{name:'activityDetail',params:{id:this.$route.params.id}}">{{orderDetail.name}}</router-link></div>
          <!-- <div class="pro_price">合计金额：<span>{{parseInt(orderDetail.price/100)}}</span><span>.{{orderDetail.price%100}}</span><span> 元</span></div> -->
          <div class="pro_price">{{ $t("message.gu6") }}：<span> {{ $t("message.jin37") }}</span>&nbsp;<span>{{orderDetail.price/100}}</span></div>
          <div class="pro_way"><span>{{ $t("message.gu7") }}：</span>
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
          <div class="payover" @click="buyAlready()">已完成支付</div>
      </div>
    </div>
    <div v-show="showzhezhao==true || showzhezhao==false" class="zhezhaop"></div>
    <div v-show="showzhezhao==true" class="pay payok">
        <i class="iconfont icon-icon_right"></i>
        <p class="title">付款成功</p>
        <p class="des">恭喜您订阅成功，可在<router-link :to="{name:''}">个人中心-我的订单</router-link> 中查看。</p>
        <div @click="finished()">完成</div>
    </div>
    <div v-show="showzhezhao==false" class="pay payno">
        <i class="iconfont icon-wrong"></i>  
        <p class="title">付款失败</p>
        <p class="des">付款失败，请点击按钮重新付款，如有问题联系客服</p>
        <div @click="close()">关闭</div>
    </div>
  </div>
</template>

<script>
  import QRCode from 'qrcode'
  import {indexService} from '../../service/indexService'
  export default {
    data () {
      return {
        title:'支付页面',
        contractDetail:{},
        choose:1,
        orderDetail:{},
        key:'',
        orderNo:'',
        wechartUrl:'',
        alipayUrl:'',
        channelId:'',
        showzhezhao:null,
        lan:'',
      }
    },
    components: { },
    computed: {
    },
    mounted: function() {
       this.getorderDetail();
       this.selectPay()
    },
    methods: {
        close:function(){
            this.showzhezhao = null;
        },
        finished:function(){
            this.$router.push({name:'singlePro',params:{id:this.$route.params.id}})
        },
        selectPay:function(item){
            if(item == 1){
                this.choose = 1
                this.getQrcodeUrl('ALIPAY_WAP')
            } else if(item == 2){
                this.choose = 2
                this.getQrcodeUrl('WX_NATIVE')
            }
        },
        // subscribeOrder  orderSubmit getErweima
        getorderDetail:function(){
            const that = this
            indexService.subscribeOrder({
                productPkgId: that.$route.params.id,
            }).then(function (res) {
                that.orderDetail = res.data.datas
                that.key = res.data.datas.key
                that.getorderNo()
            })
        },
        getorderNo:function () {
            const that = this
            if(localStorage.utm_source == 'undefined'){
                indexService.orderSubmit({
                    key: that.key,
                }).then(function (res) {
                    that.orderNo = res.data.datas
                    that.getQrcodeUrl('ALIPAY_WAP')
                })
            } else {
                indexService.orderSubmit({
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
        getQrcodeUrl:function (item) {
            const that = this
            indexService.getErweima({
                orderNo: that.orderNo,
                channelId: item, // 微信h5支付 ALIPAY_PC WX_NATIVE
            }).then(function (res) {
                that.alipayUrl = res.data.datas.codeUrl
                that.channelId = res.data.datas.channelId
                that.createQRCode(that.alipayUrl,item)
            })
        },
        createQRCode:function (url, way) {
            const that = this;
            if(way == 'ALIPAY_WAP'){
                let canvas1 = document.getElementById('canvas1');
                let aliUrl = 'https://docqbot.com/'+ that.lan+'/alipay?orderNo='+that.orderNo+'&channelId='+that.channelId
                // let aliUrl = 'http://www.test.front.docqbot.com/'+ that.lan+'/alipay?orderNo='+that.orderNo+'&channelId='+that.channelId
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
        buyAlready:function() {
            const that = this
            indexService.mySinglePro({
                type: 12,
                id: that.$route.params.id, // 微信h5支付 ALIPAY_PC WX_NATIVE
            }).then(function (res) {
                if(res.data.datas.result == true){
                    that.showzhezhao = true
                    // that.$router.push({name:'singlePro',params:{id:that.$route.params.id}})
                } else {
                    that.showzhezhao = false
                }
            })
            
        }
    }
  }
</script>
<style lang="less">
    .boxOk{
        border: 1px solid #FF3831;
    }
    .boxNo{
        border: 1px solid #CCCCCC;
    }
  .payment{
    width:100%;
    height:fit-content;
    min-height:750px;
    background-color:#f4f4f4;
    .center{
      width:1000px;
      margin:0 auto;
      .el-breadcrumb {
        font-size: 14px;
        width: 100%;
        height: 45px;
        line-height: 55px;
        .el-breadcrumb__inner, .el-breadcrumb__inner a{
          font-size: 12px;
          color: #666666;
          letter-spacing: 0;
          font-weight:400;
        }
        .el-breadcrumb__item{
          font-size: 12px;
          color: #666666;
          letter-spacing: 0;
          font-weight:400;
        }
      }
    }
    .content{
        width: 1000px;
        padding: 0 100px;
        height: 650px;
        margin: 0 auto;
        background: #fff;
        min-height: 540px;
        overflow: hidden;
        .pay_title{
            font-size: 24px;
            color: #333333;
            width: 100%;
            height: 100px;
            line-height: 100px;
            border-bottom: 2px solid #EDEDED;
        }
        .bottom{
            width: 100%;
            height:440px; 
            margin-top: 40px;
            .pro_name{
                margin-bottom: 26px;
                font-size: 16px;
                color: #666666;
                span{
                    margin-left: 20px;
                    font-size: 16px;
                    color: #333333;
                }
            }
            .pro_price{
                margin-bottom: 26px;
                font-size: 16px;
                color: #666666;
                span:nth-child(2){
                    // margin-left: 20px;
                    font-size: 20px;
                    color: #FF3831;
                }
                span:nth-child(1){
                    font-size: 16px;
                    color: #FF3831;
                    letter-spacing: 0;
                    line-height: 28px;
                }
                span:nth-child(3){
                    font-size: 16px;
                    color: #151515;
                    letter-spacing: 0;
                    line-height: 28px;
                }
            }
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
            .payover{
                cursor: pointer;
                margin-top: 27px;
                background: #B9002D;
                padding: 10px 20px;
                font-size: 18px;
                color: #FFFFFF;
                margin-left: 100px;
                display: inline-block;
            }
            .canvas{
                margin-left: 95px;
                width: 189px !important;
                height: auto !important;
            }
        }
    }
  }
  .red{
    color: #B9002D;
  }
  .red:hover{
    cursor: pointer;
  }
  .el-breadcrumb__inner, .el-breadcrumb__inner a{
    font-weight: 400;
  }
  .el-breadcrumb__inner a:hover, .el-breadcrumb__inner:hover{
    color:#606266;
  }
.pay{
    text-align: center;
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    width: 260px;
    padding: 40px 20px;
    background: #FFFFFF;
    border: 1px solid #DDDDDD;
    z-index: 6;
    .iconfont{
        font-size: 58px;
        margin-bottom: 15px;
    }
    .title{
        width: 100%;
        text-align: center;
        font-size: 24px;
        color: #333333;
        margin-bottom: 12px;
    }
    .des{
        width: 100%;
        text-align: center;
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        line-height: 28px;
        margin-bottom: 25px;
        a{
            font-size: 16px;
            color: #333333;
        }
    }
    div{
        width: 100%;
        height: 40px;
        border: 1px solid #B9002D;
        font-size: 16px;
        color: #B9002D;
        text-align: center;
        line-height: 40px;
    }
    div:hover{
        cursor: pointer;
    }
}
.zhezhaop{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    background: rgba(0,0,0,0.5);
    z-index: 5;
}
.payok{
    .iconfont{
        color: #02C800;
    }
}
.payno{
    .iconfont{
        color: #B9002D;
    }
}
</style>

