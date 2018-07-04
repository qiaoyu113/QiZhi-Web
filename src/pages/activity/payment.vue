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
        <div class="pro_name">活动名称：<router-link :to="{name:'activityDetail',params:{id:this.$route.params.id}}">{{orderName}}</router-link></div>
          <!-- <div class="pro_price">合计金额：<span>{{parseInt(orderDetail.price/100)}}</span><span>.{{orderDetail.price%100}}</span><span> 元</span></div> -->
          <div class="pro_price">实际支付金额：<span></span>&nbsp;<span>{{detailMoneyAll}}</span></div>
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

        min:'',//倒计时分
        sec:'',//倒计时秒
        statePay:'',//1.待支付。2.交易完成。3.交易关闭。4.退款成功。5.退款中。
        orderType:'',//判断展示类型  1.orderType 知识。 2.orderType 活动。 3.orderType 会员。 4.orderType 商品 5.orderType 直播
        orderNo:'',//订单编号
        orderName:'',//订单信息中的名字
        openTime:'',//订单建立时间
        orderTime:'',//订单信息中的时间
        orderAddress:'',//订单信息中的地址
        orderImg:'',//订单信息中的图片
        orderPrice:'',//订单信息中的地址
        orderNum:'',//订单信息中的票数
        orderWeek:'',//知识订单中的期数
        orderUpdate:true,//知识订单中是否完结
        orderPer:'',//判断会员订单中是年是月
        orderSpec:'',//商品规格
        eTicker:'',//电子票号
        eTickerData:'',//电子票状态 1.待使用。2.已使用。3.已过期。4.不可用。
        detailMoney:'',//订单商品原价价格
        detailMoneyAll:'',//订单总价
        detailIntegral:'',//订单商品价格
        detailPay:'',//订单实际付款
        detailName:'',//订单用户姓名
        detailPhone:'',//订单用户手机号
        detailAddress:'',//订单用户地址
        integral:'',//返还的积分
        refundReason:'',//退款原因
        refuseReason:'',//拒绝原因
        causeText:'',//申请退款的原因
        hintShow:false,//申请退款弹窗
        hintWin:true,//申请退款样式
        timeOver:0,//倒计时
        ticet:false,//有无电子票,
        DontRefund:false,//退款是否是0元
        orderTypeId:'',//活动号
        delAct:false,//删除提示
        refund:false,//判断是否能退款
        actId:'',//判断是否能退款
      }
    },
    components: { },
    computed: {
    },
    mounted: function() {
        let that = this;
        that.orderNo = String(that.$route.params.id);
        that.orderType = this.$route.params.type;
        console.log(that.orderType);
        if(!that.orderNo){
            that.orderNo = window.localStorage.getItem("payOrderNo");
        }
        if(!that.orderType){
            that.orderType = window.localStorage.getItem("orderType");
        }
        //VIP会员
        if(that.orderType == '3'){
            indexService.orderItem(that.orderNo).then(function (res) {
                if(res.data.success){
                    let state = res.data.datas;
                    //1.待支付。2.待审核。3.已付款。4.已取消。5.交易关闭。6.退款待审核。7退款中。
                    //8.退款失败。9.已通过退款申请。10.审核不通过。11.退款申请中。12.退款被拒绝。
                    //13.撤销退款申请。14.订单支付超时。15.退款成功。16.待领取。17.待发货。18.已发货。19.交易完成。
                    if(state.status === 1){//待支付
                        that.statePay = '1';
                        let nowDate = new Date().getTime();
                        let timeOver = res.data.datas.expireTime;
                        let tt = parseInt((timeOver - nowDate) / 1000);
                        if(parseInt((timeOver - nowDate) / 1000) <= 0){
                            that.sec = 0;
                            that.time();
                        }else{
                            that.sec = parseInt((timeOver - nowDate) / 1000);
                            that.time();
                        }
                    }else if(state.status === 19 || state.status === 3){//交易完成
                        that.statePay = '2';
                    }else if(state.status === 4){//交易取消
                        that.statePay = '7';
                    }else if(state.status === 15){//退款成功
                        that.statePay = '4';
                    }else if(state.status === 7){//退款中
                        that.statePay = '5';
                    }else if(state.status === 2){//待审核
                        that.statePay = '6';
                    }else if(state.status === 5){//交易关闭
                        that.statePay = '3';
                    }else if(state.status === 9){//审核已通过
                        that.statePay = '8';
                    }else if(state.status === 6){//退款待审核
                        that.statePay = '11';
                    }
                    //订单编号
                    that.orderNo = state.orderNo;
                    that.openTime = state.createTime
                    that.orderName = state.orderDetails[0].name;
                    that.orderPrice = state.orderDetails[0].price;
                    that.orderTime = state.orderDetails[0].endTime
                    that.detailMoney = state.orderDetails[0].price * state.orderDetails[0].timeNum;
                    that.detailMoneyAll = state.amount;
                    // that.detailName = state.orderDetails[0].applyInfo.name
                    // that.detailPhone = state.orderDetails[0].applyInfo.phone
                    that.selectPay(1)
                    let userId = state.userId
                    indexService.myCenter().then(function(res){
                        let user = res.data.datas.user;
                        that.detailName = that.detailName || user.name;
                        that.detailPhone = that.detailPhone || user.phone;
                        if(user.addresses){
                            for(let i=0;i<user.addresses.length;i++){
                                if(user.addresses[i].defaultAdress){
                                    that.detailAddress = user.addresses[i].provinceName + user.addresses[i].cityName + user.addresses[i].districtName +  user.addresses[i].detailAdress;
                                    return that.detailAddress
                                }
                            }
                        }

                    })
                }else{
//                        alert(res.data.message)
                }
            })
            //知识订单
        }else if(that.orderType == '1'){
            indexService.orderItem(that.orderNo).then(function(res){
                if(res.data.success){
                    let state = res.data.datas;
                    //1.待支付。2.待审核。3.已付款。4.已取消。5.交易关闭。6.退款待审核。7退款中。
                    //8.退款失败。9.已通过退款申请。10.审核不通过。11.退款申请中。12.退款被拒绝。
                    //13.撤销退款申请。14.订单支付超时。15.退款成功。16.待领取。17.待发货。18.已发货。19.交易完成。
                    if(state.status === 1){//待支付
                        that.statePay = '1';
                        let nowDate = new Date().getTime();
                        let timeOver = res.data.datas.expireTime;
                        let tt = parseInt((timeOver - nowDate) / 1000);
                        if(parseInt((timeOver - nowDate) / 1000) <= 0){
                            that.sec = 0;
                            that.time();
                        }else{
                            that.sec = parseInt((timeOver - nowDate) / 1000);
                            that.time();
                        }
                    }else if(state.status === 19 || state.status === 3){//交易完成
                        that.statePay = '2';
                    }else if(state.status === 4){//交易取消
                        that.statePay = '7';
                    }else if(state.status === 15){//退款成功
                        that.statePay = '4';
                    }else if(state.status === 7 || state.status === 6){//退款中
                        that.statePay = '5';
                    }else if(state.status === 2){//待审核
                        that.statePay = '6';
                    }else if(state.status === 5){//交易关闭
                        that.statePay = '3';
                    }
                    //订单编号
                    that.orderNo = state.orderNo;
                    that.orderImg = state.orderDetails[0].cover;
                    that.orderWeek = state.orderDetails[0]
                    that.openTime = state.createTime
                    that.orderName = state.orderDetails[0].name;
                    that.orderTime = state.orderDetails[0].endTime
                    that.detailMoney = state.orderDetails[0].price
                    that.detailMoneyAll = state.amount;
                    that.orderUpdate = state.orderDetails[0].stopUpdate;
                    that.orderWeek = state.orderDetails[0].singleNum==null?0:state.orderDetails[0].singleNum;
                    let userId = state.userId
                    that.detailName = state.orderDetails[0].applyInfo.name
                    that.detailPhone = state.orderDetails[0].applyInfo.phone
                    indexService.myCenter().then(function(res){
                        let user = res.data.datas.user;
                        that.detailName = that.detailName || user.name;
                        that.detailPhone = that.detailPhone || user.phone;
                        if(user.addresses){
                            for(let i=0;i<user.addresses.length;i++){
                                if(user.addresses[i].defaultAdress){
                                    that.detailAddress = user.addresses[i].provinceName + user.addresses[i].cityName + user.addresses[i].districtName +  user.addresses[i].detailAdress;
                                    return that.detailAddress
                                }
                            }
                        }
                    })
                }else{
//                        alert(res.data.message)
                }
            })
        }else if(that.orderType == '5'){
            //直播
            indexService.orderItem(that.orderNo).then(function (res) {
                if(res.data.success){
                    let details = res.data.datas
                    that.orderName = details.orderDetails[0].liveTitle;
                    that.orderTime = details.orderDetails[0].liveStartTime
                    that.detailName = details.orderDetails[0].applyInfo.name
                    that.detailPhone = details.orderDetails[0].applyInfo.phone
                    that.orderPrice = that.moneyNo(details.orderDetails[0].needFee);
                    that.orderImg = details.orderDetails[0].liveCover;
                    that.orderNo = details.orderNo;
                    that.openTime = details.createTime
                    that.detailMoney = that.moneyNo(details.orderDetails[0].totalFee);
                    that.detailMoneyAll = that.moneyNo(details.orderDetails[0].needFee);
                    if(state.status === 1){//待支付
                        that.statePay = '1';
                        let nowDate = new Date().getTime();
                        let timeOver = res.data.datas.expireTime;
                        let tt = parseInt((timeOver - nowDate) / 1000);
                        if(parseInt((timeOver - nowDate) / 1000) <= 0){
                            that.sec = 0;
                            that.time();
                        }else{
                            that.sec = parseInt((timeOver - nowDate) / 1000);
                            that.time();
                        }
                    }else if(state.status === 19 || state.status === 3){//交易完成
                        that.statePay = '2';
                    }else if(state.status === 4){//交易取消
                        that.statePay = '7';
                    }else if(state.status === 15){//退款成功
                        that.statePay = '4';
                    }else if(state.status === 7 || state.status === 6){//退款中
                        that.statePay = '5';
                    }else if(state.status === 2){//待审核
                        that.statePay = '6';
                    }else if(state.status === 5){//交易关闭
                        that.statePay = '3';
                    }
                    //1.待支付。2.待审核。3.已付款。4.已取消。5.交易关闭。6.退款待审核。7退款中。
                    //8.退款失败。9.已通过退款申请。10.审核不通过。11.退款申请中。12.退款被拒绝。
                    //13.撤销退款申请。14.订单支付超时。15.退款成功。16.待领取。17.待发货。18.已发货。19.交易完成。
                }else{
//                        alert(res.data.message)
                }
            })
        }else if(that.orderType == '2'){//活动
            console.log(1);
            indexService.orderItem(that.orderNo).then(function (res) {
                that.refund = res.data.datas.refund;
                if(res.data.success){
                    that.orderTypeId = res.data.datas.orderTypeId;
                    let state = res.data.datas;
                    //1.待支付。2.待审核。3.已付款。4.已取消。5.交易关闭。6.退款待审核。7退款中。
                    //8.退款失败。9.已通过退款申请。10.审核不通过。11.退款申请中。12.退款被拒绝。
                    //13.撤销退款申请。14.订单支付超时。15.退款成功。16.待领取。17.待发货。18.已发货。19.交易完成。
                    if(state.status === 1){//待支付
                        that.statePay = '1';
                        let nowDate = new Date().getTime();
                        let timeOver = res.data.datas.expireTime;
                        let tt = parseInt((timeOver - nowDate) / 1000);
                        if(parseInt((timeOver - nowDate) / 1000) <= 0){
                            that.sec = 0;
                            that.time();
                        }else{
                            that.sec = parseInt((timeOver - nowDate) / 1000);
                            that.time();
                        }
                    }else if(state.status === 19 || state.status === 3){//交易完成
                        that.statePay = '2';
                    }else if(state.status === 4){//交易取消
                        that.statePay = '7';
                    }else if(state.status === 15){//退款成功
                        that.statePay = '4';
                    }else if(state.status === 7){//退款中
                        that.statePay = '5';
                    }else if(state.status === 2){//待审核
                        that.statePay = '6';
                    }else if(state.status === 5){//交易关闭
                        that.statePay = '3';
                    }else if(state.status === 12){//退款已拒绝
                        that.statePay = '9';
                    }else if(state.status === 10){//审核未通过
                        that.statePay = '10';
                    }else if(state.status === 6){//退款待审核
                        that.statePay = '11';
                    }
                    //订单编号
                    that.orderNo = state.orderNo;
                    that.openTime = state.createTime
                    that.actId = state.orderDetails[0].actId;
                    that.orderName = state.orderDetails[0].actName;
                    that.orderTime = state.orderDetails[0].actStartTime
                    that.detailMoney = state.orderDetails[0].price * state.orderDetails[0].timeNum;
                    that.detailMoneyAll = state.amount;
                    that.orderAddress = state.orderDetails[0].address;
                    that.orderPrice = state.orderDetails[0].ticketPrice / 100;
//                        console.log(state.refundLogs)
                    if(state.refundLogs != null){
                        that.refundReason = state.refundLogs[0].refundReason;
                    }
                    if(state.refundLogs != null){
                        that.refuseReason = state.refundLogs[0].refuseReason;
                    }
                    if(that.orderPrice === 0){
                        that.DontRefund = false;
                    }else{
                        that.DontRefund = true;
                    }
                    that.orderNum = state.orderDetails[0].ticketNum;
                    that.orderImg = state.orderDetails[0].activityPoster;
                    that.detailMoney = that.orderPrice;
                    that.detailMoneyAll = that.orderPrice * that.orderNum;
                    let userId = state.userId;
                    that.detailName = state.orderDetails[0].applyInfo.name
                    that.detailPhone = state.orderDetails[0].applyInfo.phone
                    // console.log(111,state.orderDetails[0].applyInfo);
                    that.selectPay(1)
                    indexService.myCenter().then(function(res){
                        let user = res.data.datas.user;
                        if(user.addresses){
                            for(let i=0;i<user.addresses.length;i++){
                                if(user.addresses[i].defaultAdress){
                                    that.detailAddress = user.addresses[i].provinceName + user.addresses[i].cityName + user.addresses[i].districtName +  user.addresses[i].detailAdress;
                                    return that.detailAddress
                                }
                            }
                        }
                    });
                    //电子票获取
                    let order1 = that.$route.params.orderNo;
                    /*indexService.getTicket(order1).then(function(res){
                        if(res.data.datas.length !== 0){
                            let ticket = res.data.datas[0]
                            that.ticet = true;
                            that.eTicker = ticket.ticketNo;
                            that.eTickerData = ticket.status
                        }else{
                            that.ticet = false;
                        }
                    })*/
                }else{
//                        alert(res.data.message)
                }
            })
        }else if(that.orderType == '10'){//退款状态
            indexService.orderItem(that.orderNo).then(function (res) {
                if(res.data.success){
                    let state = res.data.datas;
                    //1.待支付。2.待审核。3.已付款。4.已取消。5.交易关闭。6.退款待审核。7退款中。
                    //8.退款失败。9.已通过退款申请。10.审核不通过。11.退款申请中。12.退款被拒绝。
                    //13.撤销退款申请。14.订单支付超时。15.退款成功。16.待领取。17.待发货。18.已发货。19.交易完成。
                    if(state.status === 1){//待支付
                        that.statePay = '1';
                        let nowDate = new Date().getTime();
                        let timeOver = res.data.datas.expireTime;
                        let tt = parseInt((timeOver - nowDate) / 1000);
                        if(parseInt((timeOver - nowDate) / 1000) <= 0){
                            that.sec = 0;
                            that.time();
                        }else{
                            that.sec = parseInt((timeOver - nowDate) / 1000);
                            that.time();
                        }
                    }else if(state.status === 19 || state.status === 3){//交易完成
                        that.statePay = '2';
                    }else if(state.status === 4){//交易取消
                        that.statePay = '7';
                    }else if(state.status === 15){//退款成功
                        that.statePay = '4';
                    }else if(state.status === 7 || state.status === 6){//退款中
                        that.statePay = '5';
                    }else if(state.status === 2){//待审核
                        that.statePay = '6';
                    }else if(state.status === 5){//交易关闭
                        that.statePay = '3';
                    }
                    //订单编号
                    that.orderNo = state.orderNo;
                    that.openTime = state.createTime
                    that.orderName = state.orderTitle;
                    that.orderTime = state.orderDetails[0].actStartTime
                    that.detailMoney = state.orderDetails[0].price * state.orderDetails[0].timeNum;
                    that.detailMoneyAll = state.amount;
                    that.orderAddress = state.orderDetails[0].address;
                    that.orderPrice = state.orderDetails[0].ticketPrice / 100;
                    if(that.orderPrice === 0){
                        that.DontRefund = false;
                    }else{
                        that.DontRefund = true;
                    }
                    that.orderNum = state.orderDetails[0].ticketNum;
                    that.orderImg = state.orderDetails[0].activityPoster;
                    that.detailMoney = that.orderPrice;
                    that.detailMoneyAll = that.orderPrice * that.orderNum;
                    let userId = state.userId;
                    indexService.myCenter().then(function(res){
                        let user = res.data.datas.user;
                        if(user.addresses){
                            for(let i=0;i<user.addresses.length;i++){
                                if(user.addresses[i].defaultAdress){
                                    that.detailAddress = user.addresses[i].provinceName + user.addresses[i].cityName + user.addresses[i].districtName +  user.addresses[i].detailAdress;
                                    return that.detailAddress
                                }
                            }
                        }
                    });
                    that.detailName = state.orderDetails[0].applyInfo.name
                    that.detailPhone = state.orderDetails[0].applyInfo.phone
                    //电子票获取
                    let order1 = String(that.$route.params.id);
                    indexService.getTicket(order1).then(function(res){
                        if(res.data.datas.length !== 0){
                            let ticket = res.data.datas[0]
                            that.ticet = true;
                            that.eTicker = ticket.ticketNo;
                            that.eTickerData = ticket.status
                        }else{
                            that.ticet = false;
                        }
                    })
                }else{
//                        alert(res.data.message)
                }
            })
            that.hintBackpay()
        }
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
        getQrcodeUrl:function (item) {
            const that = this
            console.log(that.orderNo);
            // console.log(String(that.$route.params.id));
            indexService.getErweima({
                orderNo: String(that.orderNo),
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
                // let aliUrl = 'http://www.test.front.docqbot.com/'+ that.lan+'/alipay?orderNo='+that.orderNo+'&channelId='+that.channelId
                let aliUrl = 'http://'+location.host+'/alipay?orderNo='+that.orderNo+'&channelId='+that.channelId;
                console.log(aliUrl);
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
            indexService.orderItem(that.orderNo).then(function (res) {
                if(res.data.datas.status == 3){
                    that.showzhezhao = true
                    that.$router.push({name:'purchase'})
                } else {
                    that.showzhezhao = false
                }
            })
            
        },

        //计时器
        time:function(){
            let that = this;
            let s = that.sec;
            let timeOver = that.timeOver;
            let y,m,d,min,second;
            min = Math.floor(s / 60);
            second = s % 60;
            if (second < 10) { second = '0' + second;}
            if (min < 10) { min = '0' + min;}
            timeOver = min + '分' + second + '秒';
            that.timeOver = timeOver;
            let settime = setInterval(function(){
                s -=1;
                min = Math.floor(s / 60);
                second = s % 60;
                if (second < 10) { second = '0' + second;}
                if (min < 10) { min = '0' + min;}
                if(parseInt(min) <= 0 && parseInt(second) <= 0){
                    min = '00';
                    second = '00';
//                        alert('时间到');
                    that.statePay = '3';
                    clearTimeout(settime)
                    //这里到时间的方法
                }
                timeOver = min + '分' + second + '秒';
                that.timeOver = timeOver;
                return that.timeOver
            },1000);
        },
        //上一页返回值
        back:function(){
            let that = this;
            if(String(this.hintWin)==='1'){
                that.$router.push({name:'myOrders'});
            }else if(this.hintWin==false){
                this.hintWin = 1
            }else{
                let i = that.$store.state.fromPath.length
                if(that.$store.state.fromPath[i-2]=='home'){
                    that.$router.push({name:'home'});
                }else{
                    that.$router.push({path:that.$store.state.fromPath[i-2]});
                }


                /*console.log(i,String(that.$store.state.fromPath),'to');
                console.log(i,that.$store.state.fromPath[i-1],'to');
                if(that.$store.state.fromPath[i-1].indexOf('ticket')>-1) {
                    that.$router.go(-3)
                }else{
                    that.$router.go(-1)
                }*/
            }
        },
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

