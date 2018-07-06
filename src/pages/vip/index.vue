<template>
  <div class="" id="vip" v-set-title="title">
      <div class="body">
          <div class="top">
             <div class="con">
                 <div class="tabbtn clearfix">
                     <div class="tabbtnl">会员中心</div>
                     <!-- <div class="tabbtnl bordernone" @click="govipPoints">我的积分</div> -->
                 </div>
                 <div class="personal clearfix" v-if="personal==1">
                    <div class="img"><img :src="picHead + data.headImg" /></div>
                    <div class="personalr">
                        <div class="name clearfix">
                           <p>{{data.nickName}}</p><img src="../../assets/image/viptit.png" v-if="myVip==true"/>
                        </div>
                        <!-- <p class="branch">我的积分<span>208</span>分</p> -->
                        <!-- <p class="time" v-if="data.myVip.vip==true">积分有效期<span>{{data.myVip.endTime | stampFormate}}</span>积分规则》</p> -->

                    </div>
                 </div>
                 <div class="gologin" v-if="personal==2">
                     <img class="gologinimg" src="../../assets/image/vipname.png" />
                     <div class="gologinbtn" @click="gologin">立即登录</div>
                     <div class="gologinprompt">登录后可查看您的会员等级和积分哦</div>
                 </div>

             </div>
          </div>
          <div class="boxcon">
               <div class="openup">
                  <p class="title">会员套餐</p>
                  <div class="block clearfix">
                     <div class="blockli" v-for="list in vipdata">
                        <div class="money">{{list.time}}<i v-if="list.per==1">年</i><i v-if="list.per==2">月</i>/<span>{{list.price_s}}元</span></div>
                        <div class="btn" @click="gopayment(list.id,list.vipId)">立即开通</div>
                     </div>
                  <!--    <div class="blockli">
                        <div class="money">180天/<span>58元</span></div>
                        <div class="btn">立即开通</div>
                     </div>
                     <div class="blockli">
                        <div class="money">365天/<span>116元</span></div>
                        <div class="btn">立即开通</div>
                     </div> -->
                  </div>
               </div>
               <div class="zx">
                  <p class="title">会员专享</p>
                  <div class="zxbox clearfix">
                      <div class="zxboxli">
                         <div class="zximg"><img src="../../assets/image/vipzx1.png" /></div>
                                 <p class="zxboxtit">会员专享</p>
                                 <p class="zxboxtxt">参与会员用户专属内容</p>
                      </div>
                      <div class="zxboxli">
                          <div class="zximg"><img class="img2" src="../../assets/image/vipzx2.png" /></div>
                                 <p class="zxboxtit">尊贵身份标识</p>
                                 <p class="zxboxtxt">点亮会员专属标识</p>
                      </div>
                      <div class="zxboxli">
                          <div class="zximg"><img class="img3" src="../../assets/image/vipzx3.png" /></div>
                                 <p class="zxboxtit">会员折扣</p>
                                 <p class="zxboxtxt">会员购买付费内容享会员价</p>
                      </div>
                      <div class="zxboxli">
                          <div class="zximg"><img class="img3" src="../../assets/image/vipzx4.png" /></div>
                                 <p class="zxboxtit">线下活动优先权</p>
                                 <p class="zxboxtxt">线下活动无需审核即可参与</p>
                      </div>
                  </div>
               </div>
               <div class="notes">
                 <p class="title">会员须知</p>
                <div class="notescon">
                   <p class="notesp">1.会员属平台会员，适用于运联全平台;</p>
                   <p class="notesp">2.会员的购买及续期均按小时计算，从开通成功之时算起，多次购买按累加计算会员有效期;</p>
                   <p class="notesp">3.会员一经购买不可退费;</p>
                   <p class="notesp">4.最终解释权归运联网平台所有。</p>
                </div>
                 
               </div>
          </div>

      </div>

  </div>
</template>
<script>
import {modularService} from '../../service/modularService'
  export default {
    props: [],
    data () {
      return {
        title:'会员中心',
        personal:1,
        data:'',
        vipdata:[],
        myVip:'',
        vip:[{
          "time":"1",
          "per":"2",
          "price_s":"01",

        },{
          "time":"1",
          "per":"2",
          "price_s":"01",

        },{
          "time":"1",
          "per":"2",
          "price_s":"01",

        },{
          "time":"1",
          "per":"2",
          "price_s":"01",

        },{
          "time":"1",
          "per":"2",
          "price_s":"01",

        }],
      }
    },
    computed: {
       
            picHead() {
                return this.$store.state.picHead
            },
        },
    mounted () {
       this.obtain()
       this.getVips()
    },
    methods: {
      govipPoints:function(){
         this.$router.replace({name:'vipPoints'})
      },
      gologin:function(){
         this.$router.replace({name:'login'})
      },
       obtain:function(){
           let that =this
           let token =localStorage.token
           if(token == '' || token == null || token == 'undefined'){
               that.personal=2
           }else{
              that.getUserCenter()
              that.personal=1
           }
       },
       //订单弹出
       gopayment(id,vipItemId) {
        this.$confirm('您正在购买会员，确定开通会员吗?', '开通会员', {
          confirmButtonText: '开通会员',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '去支付!'
          });
          this.putVipsOrderconfirm(id,vipItemId)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      },
       //去付款
       // gopayment:function(id,vipItemId){
         // this.$router.push({name:'payment',params:{id:id,type:3}})
         // this.putVipsOrderconfirm(id,vipItemId)
       // },
      
       //获取我的信息
      getUserCenter (){
        let that = this;
        modularService.getUserCenter().then(function (res) {
                  if(res.data.code==200){
                       that.data=res.data.datas.user
                       that.myVip=that.data.myVip.vip
                  }
        });
      },
      //确认订单
      putVipsOrderconfirm:function(id,vipItemId){
         let that=this
         modularService.putVipsOrderconfirm({vipId:vipItemId,vipItemId:id}).then(function (res) {
                  if(res.data.code==200){
                      that.putVipsOrdersubmit(res.data.datas.key)
                  }
        });
      },
     //生成订单
      putVipsOrdersubmit:function(key){
         let that=this
         modularService.putVipsOrdersubmit({key:key}).then(function (res) {
                  if(res.data.code==211101){
                   that.$router.push({name:'payment',params:{id:res.data.datas,type:3}})
                  }
        });
      },

       //获取vip
      getVips (){
        let that = this;
        modularService.getVips().then(function (res) {
                  if(res.data.code==200){
                       that.vipdata=res.data.datas.vipItems
                  }
        });
      },
      
    }
  }
</script>
<style lang="less">
  #vip{
     padding-bottom: 0;
    .body{
        background: #f3f3f3;
        .top{
           width: 100%;
           height: 400px;
           // background: red;
           background-image: url("../../assets/image/vipback.png");
           background-size: 100% 100%;
           .con{
               width: 940px;
               margin: 0 auto;
               .tabbtn{
                  padding-top: 40px;
                  .tabbtnl{
                     float: left;
                     width: 114px;
                     height: 38px;
                     border: 2px solid;
                     border-color: -webkit-linear-gradient(90deg,#474747, #A58455) 1 30;
                     border-color: -moz-linear-gradient(90deg,#474747, #A58455) 1 30;
                     border-image: linear-gradient(90deg,#474747, #A58455) 1 30;
                     margin-right: 20px;
                     font-size: 18px;
                     font-weight: bold;
                     line-height: 38px;
                     color: #333333;
                     text-align: center;
                     cursor: pointer;
                  }
                  .bordernone{
                     border:none;
                  }
               }
               .personal{
                   margin-top: 64px;
                   .img{
                      width: 100px;
                      height: 100px;
                      border:4px solid #FFE0B4;
                      border-radius: 50%;
                      overflow: hidden;
                      float: left;
                      img{
                         width: 100%;
                         height: 100%;
                      }
                   }
                   .personalr{
                       float: left;
                       margin-left: 30px;
                       .name{
                          p{
                            float: left;
                            font-size: 18px;
                            color: #fff;
                            line-height: 25px;
                          }
                          img{
                             float: left;
                             margin-left: 8px;
                             margin-top: 5px;
                             width: 32px;
                             height: 15px;
                          }
                       }
                       .branch{
                          margin-top: 18px;
                          font-size: 14px;
                          color: #fff;
                          span{
                             font-size: 20px;
                             line-height: 20px;
                             margin-left: 20px;
                          }
                       }
                       .time{
                         margin-top: 15px;
                         color: #fff;
                         line-height: 17px;
                         span{
                            margin: 0 20px;
                         }
                       }
                   }
               }
               .gologin{
                    width: 240px;
                    margin: 36px auto 0;
                    .gologinimg{
                       display: block;
                       margin: 0 auto;
                    }
                    .gologinbtn{
                        margin-top: 40px;
                        width: 240px;
                        height: 46px;
                        border-radius: 23px;
                        background: #fff;
                        box-shadow: 0 6px 5px 0 rgba(98,98,98,0.05), 0 3px 6px 0 rgba(98,98,98,0.10);
                        color: #A58455;
                        font-size: 18px;
                        line-height: 46px;
                        text-align: center;
                        cursor: pointer;
                    }
                    .gologinprompt{
                        margin-top: 10px;
                        color: #fff;
                        font-size: 14px;
                        line-height: 24px;
                        width: 240px;
                        text-align: center;
                    }

               }
           }
        }
        .boxcon{
           margin-top: 40px;
           padding-bottom: 100px;
           .openup{
             width: 1100px;
             // height: 370px;
             padding-bottom: 40px;
             margin: 0 auto;
             background: #FFFFFF;
             border: 1px solid #DDDDDD;
             .title{
                   margin-top: 30px;
                   text-align: center;
                   font-size: 24px;
                   line-height: 31px;
                   color: #333;
             }
             .block{
               margin-top: 50px;
               margin-left: 100px;
               .blockli{
                 float: left;
                  width: 300px;
                  height: 220px;
                  background-image: url('../../assets/image/viphei.png');
                  background-size: 100% 100%;
                  .money{
                     margin-top: 40px;
                     color: #fff;
                     text-align: center;
                     font-size: 25px;
                     span{
                       font-size: 32px;
                       color: #a58455;
                     }

                  }
                  .btn{
                      width: 120px;
                      height: 42px;
                      margin: 20px auto 0;
                      color: #FDE4A4;
                      font-size: 20px;
                      line-height: 42px;
                      border:2px solid;
                      border-color: -webkit-linear-gradient(90deg,#D1BA8E, #A58455) 1 30;
                      border-color: -moz-linear-gradient(90deg,#D1BA8E, #A58455) 1 30;
                      border-image: linear-gradient(90deg,#D1BA8E, #A58455) 1 30;
                      text-align: center;
                      cursor: pointer;
                  }
                 
               }
             }
           }
           .zx{
             width: 1100px;
             height: 310px;
             margin: 30px auto 0;
             background: #FFFFFF;
             border: 1px solid #DDDDDD;
             .title{
                   margin-top: 30px;
                   text-align: center;
                   font-size: 24px;
                   line-height: 31px;
                   color: #333;
             }
             .zxbox{
                 margin-top: 50px;
                 margin-left: 142px;
                 .zxboxli{
                    float: left;
                    margin-right: 40px;
                    width: 170px;
                    .zximg{
                       width: 80px;
                       // display: block;
                       height: 64px;
                       margin: 0 auto;
                       img{

                         display: block;
                         margin: 0 auto;
                         line-height: 64px;
                       }
                       .img2{
                          padding-top: 20px;
                       }
                       .img3{
                           padding-top: 4px;
                       }
                    }
                    .zxboxtit{
                       margin-top: 16px;
                       font-size: 18px;
                       line-height: 24px;
                       color: #333;
                       text-align: center;
                    }
                    .zxboxtxt{
                       width: 169px;
                       margin-top: 10px;
                       font-size: 14px;
                       line-height: 20px;
                       color: #666;
                       text-align: center;
                    }

                 }

             }

           }
           .notes{
             width: 1100px;
             height: 270px;
             margin: 30px auto;
             background: #FFFFFF;
             border: 1px solid #DDDDDD;
             .title{
                   margin-top: 30px;
                   text-align: center;
                   font-size: 24px;
                   line-height: 31px;
                   color: #333;
             }
             .notescon{
                   margin-top: 20px;
                   margin-left: 30px;
                  .notesp{
                     font-size: 14px;
                     line-height: 36px;
                     color: #333;
                  }
             }

           }
        }
      }
    }
</style>