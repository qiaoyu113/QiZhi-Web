<template>
  <div  id="ticket" v-set-title="title">
     <div class="box clearfix">
        <div class="boxl">
           <div class="tit">您的电子票</div>
           <div class="tic">使用说明 :</div>
           <div class="txt">1.本活动凭票入场，一票一码一次性，请勿复制或转寄他人；</div>
           <div class="txt">2.请截图保存至手机或打印携带，保持二维码清晰完整；</div>
           <div class="txt">3.本活动由「ID时候说的返回」提供票券服务，其拥有最终解释权。</div>
        </div>
        <div class="boxr" >
          <div class="piao" v-for="(list,index) in data" @click="yy(index)">
            <!-- <div class="boxr1">第一张</div> -->
            <div class="boxr2"> <canvas id="canvas" class="canvas"></canvas></div>
            <div class="boxr3">票号: {{list.ticketNo}}</div>
            <div class="boxr4">名称：<span>{{orderDetails.activityTitle}}</span></div>
            <div class="boxr5">时间：<span>{{orderDetails.actStartTime | stampFormate2}}</span></div>
            <div class="boxr6 clearfix"><div class="box6l">地点:</div><div class="box6r">{{orderDetails.prov}}{{orderDetails.city}}{{orderDetails.dist}}{{orderDetails.activityAddress}}</div></div>
            <div class="boxr7">状态：<span v-if="list.ticket.status==1">待使用</span>
                                     <span v-if="list.ticket.status==2">已使用</span>
                                     <span v-if="list.ticket.status==3">已过期</span>
                                     <span v-if="list.ticket.status==4">退票中</span>
                                     <span v-if="list.ticket.status==5">已退票</span>
                                     <span v-if="list.ticket.status==6">不同意退票</span>
                                    </div>
            <div class="boxr8">票价：<span>¥{{list.ticket.price}}</span></div>
           </div>
        <!--     <div class="index clearfix">
               <div class="indexli"></div>
               <div class="indexli"></div>
               <div class="indexli"></div> 
            </div> -->
        </div> 

     </div>
   
   
  </div>
</template>
<script>
import {modularService} from '../../service/modularService'
// import QRCode from 'qrcodejs2'
var QRCode = require('qrcode')
    var canvas = ''
  export default {
    props: [],
    data () {
      return {
        title:'电子票',
      
    
        data:'',
        ticketUrl:[],
        orderDetails:'',
      
      }
    },
    components: {},
    
    computed: {
            apiUrl() {
                return this.$store.state.apiUrl
            },
        },
    mounted () {
       this.getMyticketsOrderNoid()
       this.getActivitiesId()
    },
    methods: {
    
        getQRCode (url) {
        let that = this;
        let ele = document.getElementById('canvas');
          QRCode.toCanvas(ele, url, (error) => {
              if (error) {
              } else {
              }
          });
      },
         //获取我的h活动信息
      getActivitiesId (){
        let that = this;
        let actId = that.$route.query.actId
        modularService.getActivitiesId(actId).then(function (res) {
             console.log(res)
                  if(res.data.code==200){
                      that.orderDetails=res.data.datas
                      // that.ticketUrl="http://wetuc.dtfind.com/d/" + that.data[0].ticketUrl
                
      
                  }
        });
      },
    
    	 //获取我的消息
      getMyticketsOrderNoid (){
        let that = this;
        let id = that.$route.query.id
        modularService.getMyticketsOrderNoid(id).then(function (res) {
             // console.log(res)
                  if(res.data.code==200){
                      that.data=res.data.datas
                       
                       for(let i=0;i<that.data.length;i++){
                         that.ticketUrl[i]="http://wetuc.dtfind.com/d/" + that.data[i].ticketUrl
                     // console.log(that.ticketUrl)
                       setTimeout( () => {
                       that.getQRCode(that.ticketUrl[i])
                        },0)
                       }
                     
                     // that.getQRCode(that.ticketUrl)
                  }
        });
      },
   


      
    }
  }
</script>
<style lang="less">
  #ticket{
      background: #eee;
      padding-bottom: 100px;
      margin-bottom: 0;
     .box{
        width: 782px;
        margin: 178px auto 0;
        .boxl{
           float: left;
           width: 377px;
           .tit{
             font-size: 20px;
             line-height: 26px;
             color: #333;
           }
           .tic{
              margin: 8px 0 18px;
              font-size: 16px;
              line-height: 45px;
              border-bottom: 1px solid #20A0FF;
              width: 78px;

           }
           .txt{
             width: 377px;
             font-size: 14px;
             line-height: 32px;
             color: #999;
           }
        }
        .boxr{
           float: left;
           margin-left: 70px;

           .piao{
            width: 335px;
            height: 578px;
            background-image: url("../../assets/image/tic.png");
            background-size: 100% 100%;
            border-top: 1px solid #eee;
            .boxr2{
               width: 164px;
               height: 168px;
               // background:red;
               margin:47px auto 0; 
               .canvas{
                 width: 100%;
                 height: 100%;
               }
            }
            .boxr3{
               margin-top: 10px;
               font-size: 14px;
               text-align: center;
               line-height: 20px;
               color: #333;
            }
            .boxr4{
               margin-top: 58px;
               padding: 0 20px;
               width: 295px;
               overflow: hidden;
               text-overflow:ellipsis;
               white-space:nowrap;
               font-size: 14px;
               line-height: 20px;
               color: #333;
               span{
                 color: #151515;
               }
            }
            .boxr5{
                margin-top: 30px;
               padding: 0 20px;
               width: 295px;
               overflow: hidden;
               text-overflow:ellipsis;
               white-space:nowrap;
               font-size: 14px;
               line-height: 20px;
               color: #333;
               span{
                 color: #151515;
               }
            }
            .boxr6{
              margin-top: 30px;
              padding: 0 20px;
              width: 295px;
              .box6l{
                 float: left;

                 font-size: 14px;
                 color: #333;
                 line-height: 20px;
              }
              .box6r{
                 float: left;
                 width: 253px;
                 margin-left: 4px;
                 height: 40px;
                 overflow: hidden;
                 color: #151515;
                 line-height: 20px;
                 font-size: 14px;
              }
            }
            .boxr7{
                margin-top: 30px;
               padding: 0 20px;
               width: 295px;
               overflow: hidden;
               text-overflow:ellipsis;
               white-space:nowrap;
               font-size: 14px;
               line-height: 20px;
               color: #333;
               span{
                 color: #20A0FF;
               }
            }
            .boxr8{
                margin-top: 30px;
               padding: 0 20px;
               width: 295px;
               overflow: hidden;
               text-overflow:ellipsis;
               white-space:nowrap;
               font-size: 14px;
               line-height: 20px;
               color: #333;
               span{
                 color: #151515;
               }
            }
          }
            .index{
                margin-top: 20px;
                .indexli{
                   float: left;
                   width: 36px;
                   height: 2px;
                   background: #ddd;
                }
                .lu{
                   background: #20A0FF;
                }
            }

        }


     }
  	    
      
     
     }
</style>