<template>
  <div class="" id="vip_points" v-set-title="title">
      <div class="body">
          <div class="top">
             <div class="con">
                 <div class="tabbtn clearfix">
                     <div class="tabbtnl bordernone" @click="govip">会员中心</div>
                     <div class="tabbtnl">我的积分</div>
                 </div>
                 <div class="personal clearfix" v-if="personal==1">
                    <div class="img"><img :src="picHead + data.headImg" /></div>
                    <div class="personalr">
                        <div class="name clearfix">
                           <p>{{data.nickName}}</p><img src="../../assets/image/hot.png" />
                        </div>
                        <!-- <p class="branch">我的积分<span>208</span>分</p> -->
                        <!-- <p class="time">积分有效期<span>2018-12-31</span>积分规则》</p> -->
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
         <div class="boxteble">
                 <div class="boxthead clearfix">
                      <div class="boxth boxth1">来源/用途说明</div>
                      <div class="boxth boxth2">积分变化</div>
                      <div class="boxth boxth3">时间</div>
                 </div>
                 <div class="boxtbody">
                    <div class="boxrow clearfix">
                         <div class="boxtd boxtd1">完善个人信息</div>
                         <div class="boxtd boxtd2"><p class="p1">+5</p></div>
                         <div class="boxtd boxtd3">2017-04-06 12:00</div>
                    </div>
                    <div class="boxrow clearfix">
                         <div class="boxtd boxtd1">完善个人信息</div>
                         <div class="boxtd boxtd2"><p class="p2">-5</p></div>
                         <div class="boxtd boxtd3">2017-04-06 12:00</div>
                    </div>
                    <div class="boxrow clearfix">
                         <div class="boxtd boxtd1">完善个人信息</div>
                         <div class="boxtd boxtd2"><p class="p1">+5</p></div>
                         <div class="boxtd boxtd3">2017-04-06 12:00</div>
                    </div>
                    <div class="boxrow clearfix">
                         <div class="boxtd boxtd1">完善个人信息</div>
                         <div class="boxtd boxtd2"><p class="p1">+5</p></div>
                         <div class="boxtd boxtd3">2017-04-06 12:00</div>
                    </div>
                 </div>
                   <!--分页-->
                   <div class="v_paging">
                       <el-pagination
                           background
                          layout="prev, pager, next, jumper"
                          @current-change="handleCurrentChange"
                          :total="inde">
                   </el-pagination>
                  </div>

             </div>
             <div class="rule">
                <div class="ruleimg"><p>积分规则</p></div>
                <div class="rulebox">
                     <p class="ruleboxh3">积分说明</p>
                     <p class="ruleboxp">积分是用户在网站消费、评论、签到、发布文章等相关活动给予的优惠，积分仅可以在社群通平台使用。如账号暂停使用，则取消该账号的所有积分相关的权益。</p>
                     <p class="ruleboxp">积分可以在支付订单时用于抵现，积分支付不得超过每笔订单结算金额的一定比例，比例由发布者确定。如：不超过50%的比例，结算金额是100元，50%就是50元，那结算时此订单最多只能使用积分抵现50元。</p>
                     <p class="ruleboxp">积分有效期为获得积分的次年年末，例如：2017年获得的积分，若为使用则在2018年年底失效。</p>
                     <p class="ruleboxp">若获得的积分商品，发生退款行为，则赠送的积分扣除。</p>
                     <p class="ruleboxh3">积分现金兑换比例</p>
                     <p class="ruleboxp">获得积分</p>
                     <p class="ruleboxp marg">消费金额和积分兑换比例是10：1  </p>
                     <p class="ruleboxp">积分抵现</p>
                     <p class="ruleboxp marg">积分和现金兑换比例是100：1</p>
                </div>
             </div>
             <div class="get">
                <div class="gettitlt">获得积分</div>
                 <div class="getboxteble">
                 <div class="boxthead clearfix">
                      <div class="boxth boxth1">项目</div>
                      <div class="boxth boxth2">积分</div>
                      <div class="boxth boxth3">详细说明</div>
                 </div>
                 <div class="boxtbody">
                    <div class="boxrow clearfix">
                         <div class="boxtd boxtd1">完善注册</div>
                         <div class="boxtd boxtd2"><p class="p1">+5</p></div>
                         <div class="boxtd boxtd3">注册网站成功，即可获赠</div>
                    </div>
                    <div class="boxrow clearfix">
                         <div class="boxtd boxtd1">完善个人信息</div>
                         <div class="boxtd boxtd2"><p class="p1">+10</p></div>
                         <div class="boxtd boxtd3">设置头像及完善昵称、简介等信息</div>
                    </div>
                    <div class="boxrow clearfix">
                         <div class="boxtd boxtd1">绑定微信</div>
                         <div class="boxtd boxtd2"><p class="p1">+10</p></div>
                         <div class="boxtd boxtd3">绑定微信号</div>
                    </div>
                    <div class="boxrow clearfix">
                         <div class="boxtd boxtd1">首次关注作者</div>
                         <div class="boxtd boxtd2"><p class="p1">+5</p></div>
                         <div class="boxtd boxtd3">第一次关注专栏作者</div>
                    </div>
                    <div class="boxrow clearfix">
                         <div class="boxtd boxtd1">首次收藏</div>
                         <div class="boxtd boxtd2"><p class="p1">+5</p></div>
                         <div class="boxtd boxtd3">第一次收藏文章或者活动</div>
                    </div>
                    <div class="boxrow clearfix">
                         <div class="boxtd boxtd1">首次评论</div>
                         <div class="boxtd boxtd2"><p class="p1">+10</p></div>
                         <div class="boxtd boxtd3">第一次评论文章或者活动</div>
                    </div>
                    <div class="boxrow clearfix">
                         <div class="boxtd boxtd1">每日登录</div>
                         <div class="boxtd boxtd2"><p class="p1">+2</p></div>
                         <div class="boxtd boxtd3">每日登录签到后</div>
                    </div>
                    <div class="boxrow clearfix">
                         <div class="boxtd boxtd1">分享</div>
                         <div class="boxtd boxtd2"><p class="p1">+3</p></div>
                         <div class="boxtd boxtd3">成功分享一篇活动（文章/商品/付费知识）</div>
                    </div>
                    <div class="boxrow clearfix">
                         <div class="boxtd boxtd1">报名活动</div>
                         <div class="boxtd boxtd2"><p class="p1">+5</p></div>
                         <div class="boxtd boxtd3">成功报名活动，并且签到成功</div>
                    </div>
                    <div class="boxrow clearfix">
                         <div class="boxtd boxtd1">发表文章</div>
                         <div class="boxtd boxtd2"><p class="p1">+10</p></div>
                         <div class="boxtd boxtd3">成功发表一篇文章</div>
                    </div>
                    <div class="boxrow clearfix">
                         <div class="boxtd boxtd1">消费</div>
                         <div class="boxtd boxtd2"><p class="p1">结算金额*兑换比例</p></div>
                         <div class="boxtd boxtd3">成功在平台消费，获得相应消费金额数比例的积分</div>
                    </div>
                 </div>
             </div>
             </div>
             <div class="deduction">
                <div class="deductiontitle">扣除积分</div>
                <div class="deductionp">抵现，在平台发生消费时，可用积分抵现。购买商品、购买活动票、下载收费资料退款，如若发生订单退款，扣除相应退款金额的数值</div>
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
        title:'我的积分',
        personal:1,
        inde:10,
        data:'',
      }
    },
   
    components: {},
    computed: {
       
            picHead() {
                return this.$store.state.picHead
            },
        },
    mounted () {
      this.obtain()
    },
    methods: {
       //分页
      handleCurrentChange(val){
          this.page.num=val
          this.getMyFollow()
      },
      govip:function(){
         this.$router.replace({name:'vip'})
      },
       gologin:function(){
         this.$router.replace({name:'login'})
      },
        obtain:function(){
           let that =this
           // let token = sessionStorage.getItem('token');
           let token =localStorage.token
           console.log(token)
           if(token == '' || token == null || token == 'undefined'){
               that.personal=2
           }else{
              that.getUserCenter()
              that.personal=1
           }
       },
      
       //获取我的信息
      getUserCenter (){
        let that = this;
        modularService.getUserCenter().then(function (res) {
             console.log(res)
                  if(res.data.code==200){
                    console.log(res.data.datas.user)
                       that.data=res.data.datas.user
                      // that.inde=res.data.datas.totalPage * 10
                      // console.log(that.inde)
              
                 
                  }
        });
      },
    }
  }
</script>
<style lang="less">
  #vip_points{
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
                     border: 1px solid;
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
                             margin-left: 20px;
                             width: 105px;
                             height: 24px;
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
           // margin-top: 40px;
           width: 940px;
           margin: 40px auto 0;
           padding-bottom: 100px;
           .boxteble{
                display: none;
                .boxthead{
                    background: #F9FAFC;
                    box-shadow: inset 0 0 0 0 rgba(224,230,237,0.50), inset -1px 1px 0 0 rgba(224,230,237,0.50), inset 1px -1px 0 0 rgba(224,230,237,0.50), inset 0 0 0 0 rgba(224,230,237,0.50);
                   .boxth{
                     color: #324057;
                     font-size: 12px;
                     line-height: 60px;
                     text-align: center;

                   }
                   .boxth1{
                       width: 475px;
                       float: left;
                   }
                   .boxth2{
                      width: 174px;
                      float: left;
                   }
                   .boxth3{
                      width: 290px;
                      float: left;
                   }
                }
                .boxtbody{
                   .boxtd{
                        background: #FFFFFF;
                        box-shadow: inset 0 0 0 0 rgba(224,230,237,0.50), inset -1px 0 0 0 rgba(224,230,237,0.50), inset 0 -1px 0 0 rgba(224,230,237,0.50), inset 0 0 0 0 rgba(224,230,237,0.50);
                        line-height: 60px;
                        text-align: center;
                        color: #324057;
                        .p1{
                           color: #50C87E;
                        }
                        .p2{
                           color: #324057;
                        }

                   }
                  .boxtd1{
                       width: 475px;
                       float: left;
                   }
                   .boxtd2{
                      width: 174px;
                      float: left;
                   }
                   .boxtd3{
                      width: 290px;
                      float: left;
                   }

                }
                .v_paging{
                   margin-top: 20px;
                }
           }
           .rule{
              margin-top: 100px;
              .ruleimg{
                  height: 94px;
                  width: 300px;
                  margin: 0 auto;
                  background-image: url("../../assets/image/viprule.png");
                  background-size: 100% 100%;
                  p{
                  line-height: 94px;
                  text-align: center;
                  font-size: 18px;
                  color: #505050;
                  letter-spacing:8px;
                  margin-left: 4px;
                }
              }
              .rulebox{
                   margin-top: 40px;
                   width: 890px;
                   padding: 0 25px;
                   background: #FFFFFF;
                   border: 1px solid #E0E6ED;
                   padding-bottom: 27px;
                   .ruleboxh3{
                      font-size: 18px;
                      line-height: 24px;
                      color: #333;
                      margin-top: 30px;
                   }
                   .ruleboxp{
                      font-size: 12px;
                      line-height: 24px;
                      margin-top: 20px;
                      color: #333;
                   }
                   .marg{
                      margin-top: 0;
                   }
              }
           }
           .get{
              .gettitlt{
                   font-size: 18px;
                   line-height: 24px;
                   color: #333;
                   margin: 40px 0 20px;
              }
              .getboxteble{
                .boxthead{
                    background: #F9FAFC;
                    box-shadow: inset 0 0 0 0 rgba(224,230,237,0.50), inset -1px 1px 0 0 rgba(224,230,237,0.50), inset 1px -1px 0 0 rgba(224,230,237,0.50), inset 0 0 0 0 rgba(224,230,237,0.50);
                   .boxth{
                     color: #324057;
                     font-size: 12px;
                     line-height: 60px;
                     text-align: center;

                   }
                   .boxth1{
                       width: 348px;
                       float: left;
                   }
                   .boxth2{
                      width: 128px;
                      float: left;
                   }
                   .boxth3{
                      width: 464px;
                      float: left;
                   }
                }
                .boxtbody{
                   .boxtd{
                        background: #FFFFFF;
                        box-shadow: inset 0 0 0 0 rgba(224,230,237,0.50), inset -1px 0 0 0 rgba(224,230,237,0.50), inset 0 -1px 0 0 rgba(224,230,237,0.50), inset 0 0 0 0 rgba(224,230,237,0.50);
                        line-height: 60px;
                        text-align: center;
                        color: #324057;
                        .p1{
                           color: #50C87E;
                        }
                        .p2{
                           color: #324057;
                        }

                   }
                  .boxtd1{
                       width: 348px;
                       float: left;
                   }
                   .boxtd2{
                      width: 128px;
                      float: left;
                   }
                   .boxtd3{
                      width: 464px;
                      float: left;
                   }

                }
                .v_paging{
                   margin-top: 20px;
                }
           }
           }
           .deduction{
              margin-top: 30px;
              background: #FFFFFF;
              border: 1px solid #E0E6ED;
              width: 890px;
              padding: 17px 25px 20px;
              .deductiontitle{
                  font-size: 18px;
                  line-height: 24px;
                  color: #333;
              }
              .deductionp{
                  font-size: 14px;
                  line-height: 20px;
                  color: #555;
                  margin-top: 10px;
              }
           }
         
         
        
        }
      }
    }
</style>