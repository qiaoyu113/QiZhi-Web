<template>
  <div class="" id="purchase" v-set-title="title">
    <div class="title clearfix">
    	<div class="titleli"><p :class="titlep==1?'v_p':''" @click="titleindex(1)">活动</p></div>
    	<!-- <div class="titleli"><p :class="titlep==2?'v_p':''" @click="titleindex(2)">付费读</p></div> -->
    </div>
    <div class="box1" v-if="titlep==1">
       
        <div class="rowbox"  v-for="list in data">
          <div class="rowtype">
              <p class="paymentp" v-if="list.status ==1">待付款</p>
              <p class="paymentp" v-if="list.status ==2">待审核</p>
              <p class="paymentp" v-if="list.status ==3">已付款</p>
              <p class="paymentp" v-if="list.status ==4">已取消</p>
              <p class="paymentp" v-if="list.status ==5">交易关闭</p>
              <p class="paymentp" v-if="list.status ==6">退款待审核</p>
              <p class="paymentp" v-if="list.status ==7">退款中</p>
              <p class="paymentp" v-if="list.status ==8">退款失败</p>
              <p class="paymentp" v-if="list.status ==9">审核通过</p>
              <p class="paymentp" v-if="list.status ==10">审核不通过</p>
              <p class="paymentp" v-if="list.status ==11">退款申请中</p>
              <p class="paymentp" v-if="list.status ==12">退款拒绝</p>
              <p class="paymentp" v-if="list.status ==13">撤销申请</p>
              <p class="paymentp" v-if="list.status ==14">支付超时</p>
              <p class="paymentp" v-if="list.status ==15">退款成功</p>
              <p class="paymentp" v-if="list.status ==16">待领取</p>
              <p class="paymentp" v-if="list.status ==17">待发货</p>
              <p class="paymentp" v-if="list.status ==18">已发货</p>
              <p class="paymentp" v-if="list.status ==19">交易完成</p>
          </div>
          <div class="rownumber">
              <p>下单时间: {{list.createTime | stampFormate2}} | 订单编号: {{list.orderNo}}</p>
          </div>
        <div class="row clearfix">
        	 <div class="rowl"><img :src="picHead + list.orderDetails[0].activityPoster"/></div>
        	 <div class="rowr">
        	 	 <p class="h3" @click="goactivity(list.orderTypeId)">{{list.orderDetails[0].actName}}</p>
        	 	 <p class="time">开始时间 : {{list.orderDetails[0].actStartTime | stampFormate2}}</p>
        	 	 <p class="place">活动地点 : {{list.orderDetails[0].address}}</p>
             <p class="place">票价 : <span>￥{{list.orderDetails[0].ticketPrice | money}}</span></p>
             <p class="place">票数 : {{list.orderDetails[0].ticketName}}*{{list.orderDetails[0].ticketNum}}张</p>
        	 </div>
        <!-- 	 <div class="roworder">
        	 	  <div class="top clearfix"><p class="topl">{{list.orderDetails[0].ticketNum}}张</p><p class="topr">共<span>￥{{list.amount | money}}</span></p></div>
        	 	  <p class="paymentp" v-if="list.status ==1">待付款</p>
              <p class="paymentp" v-if="list.status ==2">待审核</p>
              <p class="paymentp" v-if="list.status ==3">已付款</p>
              <p class="paymentp" v-if="list.status ==4">已取消</p>
              <p class="paymentp" v-if="list.status ==5">交易关闭</p>
              <p class="paymentp" v-if="list.status ==6">退款待审核</p>
              <p class="paymentp" v-if="list.status ==7">退款中</p>
              <p class="paymentp" v-if="list.status ==8">退款失败</p>
              <p class="paymentp" v-if="list.status ==9">审核通过</p>
              <p class="paymentp" v-if="list.status ==10">审核不通过</p>
              <p class="paymentp" v-if="list.status ==11">退款申请中</p>
              <p class="paymentp" v-if="list.status ==12">退款拒绝</p>
              <p class="paymentp" v-if="list.status ==13">撤销申请</p>
              <p class="paymentp" v-if="list.status ==14">支付超时</p>
              <p class="paymentp" v-if="list.status ==15">退款成功</p>
              <p class="paymentp" v-if="list.status ==16">待领取</p>
              <p class="paymentp" v-if="list.status ==17">待发货</p>
              <p class="paymentp" v-if="list.status ==18">已发货</p>
              <p class="paymentp" v-if="list.status ==19">交易完成</p>
             <div class="ticket touming" v-if="list.status !=3 && list.status !=9">查看电子票</div>
             <div class="ticket" v-if="list.status ==3 || list.status ==9" @click="goticket(list.orderNo,list.orderDetails[0].actId)">查看电子票</div>

        	 </div> -->
           <div class="floftdiv">
             <div class="cancelorder" v-if="list.status==1" @click="opencancel(list.orderNo)">取消订单</div>
           <div class="cancelorder cancelorderbak" v-if="list.status==1" @click="gopayment(list.orderNo,list.orderDetails[0].ticketPrice)">去付款</div>
            <div class="cancelorder cancelorderbak" v-if="list.status ==3 || list.status ==9 || list.status ==19" @click="goticket(list.orderNo,list.orderDetails[0].actId)">查看电子票</div>

           <div class="cancelorder" v-if="list.status==3" @click="open3(list.orderNo)">申请退款</div>
           <!-- <div class="cancelorder fei" v-if="list.status==5">交易关闭</div> -->
           <!-- <div class="cancelorder fei" v-if="list.status==2">待审核</div> -->
           <!-- <div class="cancelorder fei" v-if="list.status==4">已取消</div> -->
           <!-- <div class="cancelorder fei" v-if="list.status==6">退款审核</div> -->
           <!-- <div class="cancelorder fei" v-if="list.status==7">退款中</div> -->
           <!-- <div class="cancelorder fei" v-if="list.status==8">退款失败</div> -->
           <div class="cancelordermoney" v-if="list.status==1">需支付: <span>￥{{list.amount | money}}</span></div>
           </div>
        </div>
        </div>
        <load-more :page="page.num" :total="$store.state.homeStore.page.total" :status="loadStatus" @loadMore="loadmore"></load-more>
    </div>
    <div class="box2" v-if="titlep==2">
        <div class="row clearfix">
        	 <div class="rowl"><img src="../../assets/image/hot.png"/></div>
        	 <div class="rowr">
        	 	 <p class="h3">天地有多大梦有多潇洒少年不识愁什么DOU</p>
        	
        	 	 <p class="cancel">2016.5.6 10:00</p>
        	 </div>
        </div>
        <div class="row clearfix">
        	 <div class="rowl"><img src="../../assets/image/hot.png"/></div>
        	 <div class="rowr">
        	 	 <p class="h3">天地有多大梦有多潇洒少年不识愁什么DOU</p>
        	
        	 	 <p class="cancel">2016.5.6 10:00</p>
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
        title:'我的购买',
        titlep:1,
        page:{
           num:1,
           size:10,
           totalCount: 0,
           totalPage:0
        },
        data:[],
        loadStatus:0,
        total:1,
      }
    },
    components: {},
    computed: {
            picHead() {
                return this.$store.state.picHead
            },
        },
    mounted () {
         this.getOrdersUser()
    },
    methods: {
    	titleindex:function(index){
              this.titlep=index
    	},
      goticket:function(id,actId){

         // this.$router.push({path:"/ticket",query:{id:id,actId:actId}}) 
            window.open(window.location. origin + '/ticket?id='+id+'&actId='+actId)
      },
      gopayment:function(orderNo,money){
          // console.log(orderNo)
          // return false

          // this.$router.push({name:'payment',params:{orderNo:orderNo,type:2,money:money}})
          if(money !=0){
            this.$router.push({name:'payment',params:{id:orderNo,type:2}})
          }
      },
       //活动详情页
      goactivity:function(id){
       this.$router.push({path:"/activity/"+id}) 

      },
      //获取我的已购
      getOrdersUser (){
        let that = this;
        modularService.getOrdersUser({pageNo: that.page.num, pageSize:that.page.size,orderType:2}).then(function (res) {
                  if(res.data.code==200){
                  //      that.data=res.data.datas.datas
                  //     that.inde=res.data.datas.totalPage * 10
                  //     // console.log(that.inde)
                   let newArr=res.data.datas.datas
                    that.page.totalPage = res.data.datas.totalPage
                    that.total=res.data.datas.total
                    that.page.totalCount = res.data.datas.totalCount == null ? 0 : parseInt(res.data.datas.totalCount);
                    if(newArr!=null){
                      for(let i=0;i<newArr.length;i++){
                        that.data.push(newArr[i]);
                    }
                    }
              
                    console.log(that.data)
                    if(res.data.datas.pageNo>=res.data.datas.totalPage){
                        that.loadStatus = 2
                    }else {
                        that.loadStatus = 0
                    }
                  }
        });
      },
      loadmore(i){
                //loadstatus为加载状态，每次收到接口数据后要修改该状态
                let that = this
                that.$store.state.homeStore.loadStatus = 1
                that.page.num = i
                that.getOrdersUser()
            },
        opencancel(id) {
        this.$confirm('是否确定取消订单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(({ value }) => {
          this.putOrdersIdCancel(id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });       
        });
      },
      //取消订单
      putOrdersIdCancel (id){
        let that = this;
        modularService.putOrdersIdCancel(id).then(function (res) {
             console.log(res)
                  if(res.data.code==200){
                  that.page.num =1
                  that.data=[]
                   that.$message.success('取消订单成功');
                     that.getOrdersUser()
                  }else{
                   that.$message.error(res.data.message);
                  }
        });
      },
       open3(id) {
        this.$prompt('请退款理由', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: '',
          inputErrorMessage: 'you'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '申请退款操作成功'
          });
          this.putOrdersIdRefundApply(id,value)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
  
      
       //申请退款
      putOrdersIdRefundApply (id,value){
        let that = this;
        modularService.putOrdersIdRefundApply(id,{reason:value}).then(function (res) {
             console.log(res)
                  if(res.data.code==200){
                  that.page.num =1
                  that.data=[]
                   // that.$message.success('申请退款操作成功');
                     that.getOrdersUser()
                  }else{
                   that.$message.error(res.data.message);
                  }
        });
      },
      
    }
  }
</script>
<style lang="less">
  #purchase{
  	.title{
  		 height: 60px;
  		 background: #FFFFFF;
  		 width: 100%;
         border: 1px solid #EEEEEE;
         border-radius: 6px;
         .titleli{
         	 float: left;
         	 padding: 0 30px;
         	 p{
         	 	font-size: 18px;
         	 	color: #999;
         	 	line-height: 58px;
         	 	cursor: pointer;
         	 	
         	 	// box-sizing: border-box;
         	 	// box-sizing: content-box;
         	 }
         	 .v_p{
         	 	 line-height: 58px;
         	 	 border-bottom: 2px solid #000;
         	 }
         }
  	}
  	.box1{
  		 width: 100%;
       .rowbox{
         .rowtype{
           margin-top: 25px;
           color: #20A0FF;
           font-size: 16px;
           line-height: 21px;
         }
         .rownumber{
            margin-top: 5px;
            p{
               font-size: 14px;
               color: #666;
               line-height: 20px;
            }
         }
       }
  		 .row{
  		 	 padding: 25px 0 25px;
  		 	 background: #FFFFFF;
             box-shadow: inset 0 -1px 0 0 #DDDDDD;
  		 	 // border-bottom: 1px solid 
          position: relative;
          .floftdiv{
            position: absolute;
            right: 36px;
            bottom: 26px;
          .cancelorder{
            float: right;  
            margin-left: 10px;
            width: 85px;
            height: 30px;
            border: 1px solid #20A0FF;
            font-size: 14px;
            line-height: 30px;
            text-align: center;
            color:#20a0ff;
            cursor: pointer;
         }
         .fei{
            border:1px solid #999;
            color: #999;
            cursor: default;
         }
         .cancelorderbak{
            background: #20A0FF;
            color: #fff;
         }
         .cancelordermoney{
            float: right;  
            margin-left: 10px;
            margin-top: 10px;
            // border: 1px solid #20A0FF;
            font-size: 14px;
            line-height: 20px;
            text-align: center;
            color:#999;
            span{
               font-size: 16px;
               color: #20a0ff;
            }
            
         }
          }
         
  		 	 .rowl{
  		 	 	 float: left;
  		 	 	 width: 224px;
  		 	 	 height: 150px;
  		 	 	 position: relative;
  		 	 	 div{
  		 	 	 	 position: absolute;
  		 	 	 	 top: 0;
  		 	 	 	 left: 0;
  		 	 	 	 width: 60px;
  		 	 	 	 height: 28px;
  		 	 	 	 line-height: 28px;
  		 	 	 	 font-size: 12px;
  		 	 	 	 color: #fff;
  		 	 	 	 background: rgba(210, 210, 210, 0.8);
  		 	 	 	 text-align: center;
  		 	 	 }
  		 	 	 img{
  		 	 	 	 width: 100%;
  		 	 	 	 height: 100%;
  		 	 	 }
  		 	 }
  		 	 .rowr{
  		 	 	 float: left;
  		 	 	 margin-left: 25px;
  		 	 	 // width: calc(900 - 249px);
  		 	 	 width: 432px;
  		 	 	 height: 150px;
  		 	 	 position: relative;
  		 	 	 .h3{
  		 	 	 	 font-weight: 700;
  		 	 	 	 font-size: 16px;
              width: 320px;
              line-height: 40px;
  		 	 	 	 color: #303030;
  		 	 	 	 line-height: 40px;
             overflow: hidden;
             text-overflow:ellipsis;
             white-space:nowrap;
             cursor: pointer;
  		 	 	 }
  		 	 	 .time{
  		 	 	 	 margin-top: 5px;
  		 	 	 	 font-size: 14px;
  		 	 	 	 color: #999;
  		 	 	 	 line-height: 19px;
  		 	 	 }
  		 	 	 .place{
  		 	 	 	 font-size: 14px;
  		 	 	 	 color: #999;
  		 	 	 	 line-height: 19px;
  		 	 	 	 margin-top: 10px;
             width: 320px;
             height: 19px;
             overflow: hidden;
             text-overflow:ellipsis;
             white-space:nowrap;
  		 	 	 	 span{
  		 	 	 	 	 	 color: #20A0FF;
  		 	 	 	 }
  		 	 	 }
  		 	 }
  		 	 .roworder{
  		 	 	 float: left;
  		 	 	 padding: 17px 15px;
  		 	 	 width: 150px;
  		 	 	 height: 106px;
  		 	 	 background: #FFFFFF;
                 border: 1px solid #EEEEEE;
                 .top{
                   height: 30px;
                 	 border-bottom: 2px solid #eee;
                 	 .topl{
                 	 	 float: left;
                     font-size: 14px;
                     line-height: 30px;
                     color:#505050;
                 	 }
                 	 .topr{
                 	 	 float: right;
                     font-size: 12px;
                     color: #FF6463;
                     line-height: 30px;
                     span{
                       font-size: 18px;
                       line-height: 30px;
                       color:#FF6463;
                     }

                 	 }
                 }
                 .paymentp{
                   font-size: 12px;
                   color: #505050;
                   line-height: 16px;
                   margin: 10px 0 20px 0;
                 }
                 .ticket{
                   width: 100%;
                   height: 28px;
                   color: #BA8502;
                   background: rgb(253, 245, 153);
                   border:1px solid rgb(252, 227, 140);
                   line-height: 28px;
                   text-align: center;
                   cursor: pointer;
                 }
                 .touming{
                     opacity: 0.2;
                     cursor: default;
                 }


  		 	 }
  		 } 
  	}
  	.box2{
  		 width: 100%;
  		 .row{
  		 	 padding: 25px 0;
  		 	 background: #FFFFFF;
             box-shadow: inset 0 -1px 0 0 #DDDDDD;
  		 	 // border-bottom: 1px solid 
  		 	 .rowl{
  		 	 	 float: left;
  		 	 	 width: 224px;
  		 	 	 height: 150px;
  		 	 	 img{
  		 	 	 	 width: 100%;
  		 	 	 	 height: 100%;
  		 	 	 }
  		 	 }
  		 	 .rowr{
  		 	 	 float: left;
  		 	 	 margin-left: 25px;
  		 	 	 // width: calc(900 - 249px);
  		 	 	 width: 650px;
  		 	 	 height: 150px;
  		 	 	 position: relative;
  		 	 	 .h3{
  		 	 	 	 font-weight: 700;
  		 	 	 	 font-size: 16px;
  		 	 	 	 color: #303030;
  		 	 	 	 line-height: 50px;
  		 	 	 }
  		 	 	
  		 	 	 .cancel{
  		 	 	 
  		 	 	 	  position: absolute;
  		 	 	 	  left: 0;
  		 	 	 	  bottom: 0;
  		 	 	 	  font-size: 14px;
  		 	 	 	  line-height: 34px;
  		 	 	 	  color: #999;
  		 	 	 	
  		 	 	 }

  		 	 }

  		 } 
  	}
    
      
     }
</style>