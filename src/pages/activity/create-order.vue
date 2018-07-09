<template>
<div id="dingdan">
    <div class="live-trade-detail">
        <!-- 1支付确认(知识) -->
        <div class="type-block" v-if="subType == '1'">
            <!--导航-->
            <div class="activity-dh">
                <span class="layui-breadcrumb">
                  <router-link :to="{name:'home'}">首页</router-link>&nbsp;>&nbsp;
                  <router-link :to="{name:'activity'}">付费读</router-link>&nbsp;>&nbsp;付款信息
                </span>
            </div>
            <div class="trans-common">
                <div class="middle confirm">
                    <div class="block det">
                        <p class="title">{{ liveData1.name }}</p>
                        <div class="con">
                            <div class="left">
                                <img class="image" :src="$store.state.picHead + liveData1.cover">
                            </div>
                            <div class="right">
                                <p class="des">
                                    <span v-if="liveData1.singleNum != null">{{liveData1.singleNum}}期</span>
                                    <span v-if="!liveData1.stopUpdate">（更新中...）</span>
                                    <span v-if="liveData1.stopUpdate">（已完结）</span>
                                </p>
                                <p class="des">价格：￥{{ liveData1.price }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="block det" v-if="hasPoints">
                        <div class="pointSwitch marBotNeg">
                            <span class="ps-left">积分   共124积分，可用50积分，抵¥1.00</span>
                            <span class="ps-right" :class="isPoints ? 'switch-on' : 'switch-off'" @click="swing()"><i></i></span>
                        </div>
                    </div>
                    <div class="block det">
                        <p class="bot marClear"><span class="txt-lab">商品金额:</span><span class="txt-lab">￥{{ oder1.price }}</span></p>
                        <!--<p class="bot marClear" v-if="oder1.freeMoney > 0"><span class="txt-lab">使用积分:</span><span class="txt-lab">-￥{{ oder1.points }}</span></p>-->
                        <p class="bot marClear" v-if="oder1.priceWay == '2' || oder1.priceWay == '3' || oder1.priceWay == '7'">
                            <span class="txt-lab" v-if="oder1.priceWay == '2'">使用积分:</span>
                            <span class="txt-lab" v-if="oder1.priceWay == '3'">折扣优惠:</span>
                            <span class="txt-lab" v-if="oder1.priceWay == '7'">会员优惠:</span>
                            <span class="txt-lab">-￥{{ oder1.freeMoney/100 }}</span>
                        </p>
                        <!--<p class="bot marClear" v-if="order.freight > 0"><span class="txt-lab">运费:</span><span class="txt-lab">+￥{{ order.freight }}</span></p>-->
                        <p class="bot"><span class="txt-lab">实付款：</span><span class="txt-price font1">￥{{(oder1.price*100 - oder1.freeMoney)/100}}</span></p>
                    </div>
                </div>
                <div class="">
                    <span class="txt">合计：￥{{ totalPrices }}</span>
                    <p class="btn1 btn ok" @click="ledgePay()">去支付</p>
                </div>
            </div>
        </div>
        <!--2支付确认(活动)-->
        <div class="type-block" v-if="subType == '2'">
            <!--导航-->
            <div class="activity-dh">
                <span class="layui-breadcrumb">
                  <router-link :to="{name:'home'}">首页</router-link>&nbsp;>&nbsp;
                  <router-link :to="{name:'activity'}">活动</router-link>&nbsp;>&nbsp;付款信息
                </span>
            </div>
            <div class="wrap">
                <div class="title">订单确认</div>
                <el-table
                        :data="[actList]"
                        style="width: 930px">
                    <el-table-column
                            label="活动信息"
                            width="410">
                        <template slot-scope="scope">
                            <div class="info">
                                <img :src="$store.state.picHead + scope.row.activityPoster">
                                <div class="linItem-top">{{scope.row.actName}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="ticketName"
                            label="票种"
                            width="160">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="单价"
                            width="120"  style="text-align:center">
                        <template slot-scope="scope">
                            <div class="price">
                                ￥{{scope.row.ticketPrice | moneyFormate}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="ticketNum"
                            label="数量"
                            width="100" style="text-align:center">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="小计"
                            width="140" >
                        <template slot-scope="scope">
                            <div class="total">
                                ￥{{scope.row.ticketPrice * scope.row.ticketNum | moneyFormate}}
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <!--<div class="lineItem">
                    <div class="linItem-top">{{actList.actName}}</div>
                    <div class="linItem-bottom">
                        <div class="linItem-img">
                            <img :src="$store.state.picHead + actList.activityPoster">
                        </div>
                        <div class="linItem-right">
                            <p>时间：{{actList.actStartTime | stampFormate2}}</p>
                            <p>地址：{{actList.address}}</p>
                            <p>票价：￥{{actList.ticketPrice | moneyFormate}}</p>
                            <p>张数：{{actList.ticketNum}}</p>
                        </div>
                    </div>
                </div>
                <div class="orderPrice">
                    <div class="orderPrice-top">
                        <div>优惠：<span>￥{{actList.ticketPrice * actList.ticketNum | moneyFormate}}</span></div>
                        <div v-if="Preferential === 1">使用积分：<span>-￥123.00</span></div>
                        <div v-if="Preferential === 2">折扣优惠：<span>-￥123.00</span></div>
                        <div v-if="Preferential === 3">会员优惠：<span>-￥123.00</span></div>
                        <div v-if="Preferential === 4">运费：<span>+￥123.00</span></div>
                    </div>
                    <div class="orderPrice-bottom">合计：<span class="font1">￥{{actList.ticketPrice * actList.ticketNum |moneyFormate}}</span></div>
                </div>-->
                <div class="pay-bottom">
                    <div class="txt">合计：<span class="total">￥{{actList.ticketPrice * actList.ticketNum | moneyFormate}}</span></div>
                    <div class="btn1 btn ok" @click="activityPay(actList.actId,actList.ticketId,actList.ticketNum,actList.detailKey)">去支付</div>
                </div>
            </div>
        </div>
        <!--3支付确认（会员）-->
        <div class="type-block" v-if="subType == '3'">
            <!--导航-->
            <div class="activity-dh">
                <span class="layui-breadcrumb">
                  <router-link :to="{name:'home'}">首页</router-link>&nbsp;>&nbsp;
                  <router-link :to="{name:'activity'}">活动</router-link>&nbsp;>&nbsp;付款信息
                </span>
            </div>
            <div class="Vip">
                <p>{{vip.name}}</p>
                <p>当前身份：{{currVip}}</p>
                <p>价格：{{vip.price}}/<span v-if="vip.vipPer === '1'">年</span><span v-if="vip.vipPer === '2'">月</span></p>
                <p>到期时间：{{vip.endTime | stampFormate2}}</p>
            </div>
            <div class="orderPrice">
                <div class="orderPrice-top">
                    <div>商品金额：<span>￥{{vipTotal}}</span></div>
                    <div v-if="Preferential === 1">使用积分：<span>-￥123.00</span></div>
                    <div v-if="Preferential === 2">折扣优惠：<span>-￥123.00</span></div>
                </div>
                <div class="orderPrice-bottom">实付款：<span class="font1">￥{{vipTotal}}</span></div>
            </div>
            <div class="">
                <span class="txt">合计：￥{{ vipTotal }}</span>
                <p class="btn1 btn ok" @click="vipPay1()">去支付</p>
            </div>
        </div>
        <!--4支付确认（商品）-->
        <div class="type-block" v-if="subType == '4'">
            <!--导航-->
            <div class="activity-dh">
                <span class="layui-breadcrumb">
                  <router-link :to="{name:'home'}">首页</router-link>&nbsp;>&nbsp;
                  <router-link :to="{name:'activity'}">活动</router-link>&nbsp;>&nbsp;付款信息
                </span>
            </div>
            <div class="lineItem">
                <div class="linItem-top">这里是知识</div>
                <div class="linItem-bottom">
                    <div class="linItem-img">
                        <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3971716529,1826076687&fm=173&s=6715598B4A133BE5648454CF0300A015&w=218&h=146&img.JPEG">
                    </div>
                    <div class="linItem-right">
                        <p>规格名称：这里是超爱的更阿斯钢阿斯蒂芬阿斯蒂芬</p>
                        <p>价格：￥100.00</p>
                        <p>数量：2</p>
                    </div>
                </div>
            </div>
            <div class="orderPrice">
                <div class="orderPrice-top">
                    <div>商品金额：<span>￥123</span></div>
                    <div v-if="Preferential === 1">使用积分：<span>-￥123.00</span></div>
                    <div v-if="Preferential === 2">折扣优惠：<span>-￥123.00</span></div>
                    <div v-if="Preferential === 3">会员优惠：<span>-￥123.00</span></div>
                    <div v-if="Preferential === 4">运费：<span>+￥123.00</span></div>
                </div>
                <div class="orderPrice-bottom">实付款：<span class="font1">￥19.00</span></div>
            </div>
            <div class="">
                <span class="txt">合计：￥{{ totalPrices }}</span>
                <p class="btn1 btn ok" @click="activityPay()">去支付</p>
            </div>
        </div>
        <!--5支付确认（直播）-->
        <div class="type-block" v-if="subType == '5'">
            <!--导航-->
            <div class="activity-dh">
                <span class="layui-breadcrumb">
                  <router-link :to="{name:'home'}">首页</router-link>&nbsp;>&nbsp;
                  <router-link :to="{name:'activity'}">活动</router-link>&nbsp;>&nbsp;付款信息
                </span>
            </div>
            <div class="lineItem">
                <div class="linItem-top">{{lives.liveTitle}}</div>
                <div class="linItem-bottom">
                    <div class="linItem-img">
                        <img :src="$store.state.picHead + lives.liveCover">
                    </div>
                    <div class="linItem-right">
                        <p>时间：{{lives.liveStartTime | stampFormate2}}</p>
                        <p>价格：￥{{lives.price}}</p>
                    </div>
                </div>
            </div>
            <div class="orderPrice">
                <div class="orderPrice-top">
                    <div>商品金额：<span>￥{{lives.price}}</span></div>
                    <div v-if="Preferential === 1">使用积分：<span>-￥0.00</span></div>
                    <div v-if="Preferential === 2">折扣优惠：<span>-￥0.00</span></div>
                    <div v-if="Preferential === 3">会员优惠：<span>-￥0.00</span></div>
                    <div v-if="Preferential === 4">运费：<span>+￥0.00</span></div>
                </div>
                <div class="orderPrice-bottom">实付款：<span class="font1">￥{{lives.needFee}}</span></div>
            </div>
            <div class="">
                <span class="txt">合计：￥{{lives.needFee}}</span>
                <p class="btn1 btn ok" @click="livesPay(livesId)">去支付</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    /* 组件 */
//    import infoPart from './info.vue'
//    import statePart from './state.vue'
//    import dealPart from './deal.vue'
//    import dealtPart from './dealt.vue'
//    import desPart from './des.vue'
    /* 页面用到的js */
    import { indexService } from '../../service/indexService'

    export default {
        props: [],
        components: {
//            'info-part': infoPart,
//            'state-part': statePart,
//            'deal-part': dealPart,
//            'dealt-part': dealtPart,
//            'des-part': desPart
        },
        data () {
            return {
                title:'支付详情',
                type:1,
                subType: '5', /* 判断当前订单的状态；1：确认支付；2：申请退款；3待支付、 4交易完成、 5交易关闭、6退款中、7退款成功 */
                actual: 0,// 实际支付金额
                isPoints: false, //是否使用积分
                hasPoints: false, //是否有积分
                Preferential:0,//1.使用积分。2.折扣优惠。3.会员优惠。4.运费
                timerEn: '',
                //timerZh: this.$store.state.tranStore.order.downCount,
                payTime: 1,
                No:'',
                liveData1:'',
                oder1:'',//拿到订单的key
                totalPrices:'',//实付金额
                key:'',
                vip:'',
                vipTotal:'',
                lives:'',//直播数据
                livesId:'',//直播的Id
                actList:{},
                shopId:'',
                currVip:'',
                ActorderId:'',
            }
        },
        mounted () {
            this.getInfo();
            window.scrollTo(0,0);
        },
        methods: {
            goOrder(){
                this.$router.push({name:'purchase'})
            },
            coded: function(item) {
                const that = this;
                if(item.code === 200){
                    that.ActorderId = item.datas;
                    window.localStorage.setItem('orderId',that.ActorderId)
                    let total =that.actList.ticketPrice * that.actList.ticketNum
                    if(total*1 === 0){
                        that.$router.push({name:'purchase'})
                    }else{
                        that.$router.push({name:'payment',params:{id:that.ActorderId,type:that.subType}})
                    }
                    // that.$router.replace({name:'createOrder',params:{type:'2',comNo:item.datas}})
                } else if (item.code === 517107){ //您有一个待支付订单,请先处理(datas会有待支付订单号) ===携带订单编号，跳转到订单页
                    that.$confirm(item.message, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        that.goOrder()
                    }).catch(() => {

                    });
                } else if (item.code === 517109){ //您有一个待审核订单,请先处理(datas会有待审核订单号)  ===携带审核订单号，跳转到审核页面

                    that.$confirm(item.message, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        that.goOrder()
                    }).catch(() => {

                    });
                } else { //当前票种不可售,请选择其它票种 === 刷新活动详情页
                    commonService.autoCloseModal(that,item.message,1)
                    setTimeout(function(){
                        that.$router.go(0)
                    },2000)
                }
            },
            getInfo () {
                let that = this;
                let type = that.type;
                that.subType = that.$route.params.type;
                let comNo = that.$route.params.comNo;//公共参数
                let code;
                let orderType;
                //知识购买
                if(that.subType == '1'){
                    indexService.getInfo({columnId:comNo}).then(function (res) {
                        that.liveData1 = res.data.datas;
                        that.liveData1.price = that.money(that.liveData1.price);
                        code = res.data.code;
                        if(code === 519112){
                            //已经购买了该专栏
//                            console.log('跳转支付成功的页面')
                        }else if(code === 519109){
                            //key不能为空
//                            console.log('跳转到上一页')
                        }else if(code === 519107){
                            //key已过期需要重新下单
//                            console.log('跳转到上一页重新下单')
                        }else{
                            that.oder1 = res.data.datas;
//                            console.log(that.oder1)
                            that.key = that.oder1.key;
                            that.totalPrices = (that.oder1.price*100 - that.oder1.freeMoney)/100;
                        }
                    })
                }
                //活动购买
                if(that.subType == '2'){
                    // console.log(9999999999999,that.$route.query.activityPoster)
                    that.actList.activityPoster = that.$route.query.activityPoster
                    that.actList.actName = that.$route.query.name
                    that.actList.ticketName = that.$route.query.ticketName
                    that.actList.address = that.$route.query.address
                    that.actList.ticketNum = that.$route.query.ticketNum
                    that.actList.ticketPrice = that.$route.query.ticketPrice
//                     indexService.getOrder(that.$route.params.comNo).then(function(res){
//                         console.log(res);
//                         if(res.data.success){
//                             that.actList = res.data.datas.orderDetails[0];
//                             console.log('99999999999',that.actList)
// //                            that.actList.ticketPrice = that.money(that.actList.ticketPrice);
// //                            that.actList.actStartTime = common.getFormatOfDate(that.actList.actStartTime,'yyyy-MM-dd h:m:s')
//                         }else{
//                             that.$router.back(-1);
//                         }
//                     })
                }
                //Vp购买
                if(that.subType == '3'){
                    that.currVip = window.localStorage.getItem('vipName');
                    commonService.getVip(comNo).then(function (res) {
//                        console.log(res.data.datas);
                        if(res.data.success) {
                            that.vip = res.data.datas;
                            that.vip.price = that.money(res.data.datas.price);
                            that.vipTotal = that.vip.price * res.data.datas.timeNum;
                            that.key = that.vip.key;
//                            that.vip.endTime = common.getFormatOfDate(that.vip.endTime,'yyyy-MM-dd')
                        }else{
                            that.$router.back(-1);
                        }
                    })
                }
                //直播购买
                if(that.subType == '5'){
                    indexService.getLivesOrder(comNo).then(function (res) {
//                        console.log(res);
                        if(res.data.code === 518113){//已经购买过
                            that.$router.replace({name:'liveDetails',params:{did:order.orderDetails[0].liveWatchNo,shopId:shopId}})
                        }else if(res.data.code === 200){//购买成功
                            that.lives = res.data.datas;
                            that.lives.price = that.money(that.lives.price);
                            that.lives.needFee = that.money(that.lives.needFee);
//                            that.lives.liveStartTime = common.getFormatOfDate(that.lives.liveStartTime,'yyyy-MM-dd h:m:s')
                            that.livesId = that.lives.id;
                        }
                    })
                }
            },
            //知识支付
            ledgePay () {
                let that = this;
                let orderId = that.$route.params.comNo;
//                alert(orderId)
                window.localStorage.setItem('orderId',orderId)
                indexService.getOder({key:this.key}).then(function (res) {
                    let orderNum = res.data.datas;
                    //local本地保存订单号、价格、订单种类
                    // console.log(that.totalPrices)
                    if(that.totalPrices === 0){
//                        console.log('这里是免费的')
                        that.$router.go(-1);
                    }else{
                        window.localStorage.removeItem('checked');
                        that.$router.push({name:'payment',params:{orderNo:orderNum,type:that.subType,money:that.liveData1.price}})
                    }
                })
            },
            //活动支付按钮
            activityPay(actid,ticId,num,key){
                let that = this;
                indexService.createOrder({actId:that.$route.query.actId,key:that.$route.query.key}).then(function(res){
                    that.coded(res.data);
                    // console.log(res.data.datas)
                    
                })
                
            },
            //vip支付
            vipPay1(){
                let that = this;
                indexService.vipSubmit({key:that.key}).then(function(res){
                    let code = res.data.code;
                    let orderNum = res.data.datas;
//                    console.log(res.data)
//                    let moneyNum = res.data.datas.orderDetails[0].price;
//                    moneyNum = that.money(moneyNum);
                    if(code == 211100){
                        //免费直接支付成功，
                        that.$router.replace({name:'vip'})
                    }else if(code == 211101){
                        //需要付费跳转支付页
                        that.$router.push({name:'pay',params:{orderNo:orderNum,type:that.subType}})
                    }
                })
            },
            //直播支付
            livesPay(livesId){
                let that = this;
                let orderId = that.$route.params.comNo;
                window.localStorage.setItem('orderId',orderId);
                indexService.LivesOrderPay(livesId).then(function(res){
                    let orderNum = res.data.datas;
                    if(res.data.success){
                        if(that.lives.price === 0){
                            that.$router.go(-1)
                        }else{
                            that.$router.push({name:'pay',params:{orderNo:orderNum,type:that.subType}})
                        }
                    }else{
                        that.$router.push({name:'payment',params:{orderNo:orderNum,type:that.subType,key:that.$route.params.key}})
                    }
                })
            },
            //是否使用积分开关
            swing(){
                this.isPoints = !this.isPoints
            },
            //转换价格
            money(number){
                let that = this;
                return  isNaN(number) ? 0.00 : parseFloat((number/100).toFixed(2));
            },
            //返回
            back(){
                this.$router.back(-1);
            },
        },
    }
</script>

<style lang="less">
    /*@import "../../assets/css/component/transaction.less";*/
    @import url('../../assets/css/theme.less');
    @font9:0.24rem;/* 9px */
    @font12:0.32rem;/* 12px */
    @bodyBgColor:#f9f9f9;
    @baseBlue:#69f;
    @desColor:#666;
    @font5:0.1333rem;/* 5px */
    @font6:0.16rem;/* 6px */
    @font7:0.1867rem;/* 7px */
    @font10:0.2667rem;/* 10px */
    @font13:0.3467rem;/* 13px */
    @font14:0.3733rem;/* 14px */
    @font15:0.4rem;/* 15px */
    @font16:0.4267rem;/* 16px */
    @font17:0.4533rem;/* 17px */
    @font18:0.48rem;/* 18px */
    @font20:0.5333rem;/* 20px */
    @font22:0.5867rem;/* 22px */
    @font25:0.6667rem;/* 25px */
    @font28:0.7467rem;/* 28px */
    @font30:0.8rem;/* 30px */
    @font33:0.88rem;/* 33px */
    @font34:0.9067rem;/* 34px */
    @font36:0.96rem;/* 36px */
    @font40:1.0667rem;/* 40px */
    @font44:1.1733rem;/* 44px */
    @font45:1.2rem; /* 45px */
    @font50:1.3333rem;/* 50px */
    @font69:1.84rem;/* 69px */
    @font77:2.0533rem;/* 77px */
    @font80:2.1333rem;/* 80px */
    @font100:2.6667rem;/* 100px */
    @font120:3.2rem;/* 120px */
    @font335:8.9333rem;/* 335px */

    #dingdan{
        background: #f4f4f4;
    }
    .live-trade-detail{
        width: 1200px;
        margin: 60px auto;
        .activity-dh {
            width: 1200px;
            margin: 25px auto;
            font-size:16px;
        }
        .wrap{
            background:#fff;padding:25px 100px 200px;
            .title{
                font-size: 24px;
                color: #333333;
                line-height:70px;
            }
            .info{
                img{
                    width:100px;
                }
                .linItem-top {
                width: 280px;
                display: inline-block;
                }
            }
            .el-table__row{
                font-size:14px;
                cursor: pointer;
            }
            .el-table thead th {
                font-size: 14px;
                color: #333333;
                font-weight: normal;
                background: #f0f0f0;
                text-align:center;
            }
            .el-table__header-wrapper{
                background: #f0f0f0;
            }
            .el-table_1_column_2,.el-table_1_column_3,.el-table_1_column_4,.el-table_1_column_5{
                text-align:center;
            }
            .total{
                color: #20A0FF;
            }
            .pay-bottom {
                float:  right;
                margin-right: 70px;
                font-size:  14px;
                .btn1.btn.ok {
                    background: #20A0FF;
                    border-radius: 2px;
                    color:  #fff;
                    text-align:  center;
                    padding: 8px 0;
                    width: 90px;
                    float: right;
                    cursor: pointer;
                }
                .total{
                    width:100px;display:inline-block;
                    font-size: 20px;
                    color: #20A0FF;
                    text-align: right;
                    padding: 15px 0;
                }
            }
        }
        .type-block{
            .top{height:@font44;line-height:@font44;text-align:center;font-size: @font18;color: #333;letter-spacing: 0.3px;position:relative;background:#fff;border-bottom:1px solid rgba(221,221,221,.5);
                .icon-fanhui{font-size:.6933rem;color:#999;text-align:left;position:absolute;top:0;left:@font10;}
            }
            .remain{height:@font33;line-height:@font33;font-size:@font13;color:@baseBlue;background: #F0F7FF;border-bottom:1px solid #D3DCE6;}
            .middle{padding-bottom:@font20;position:absolute;left:0;right:0;bottom:@font50;overflow-y:auto;-webkit-overflow-scrolling: touch;
                .block{padding:@font10 @font20 @font20;margin-top:@font5;background:#fff;
                    .fontStyle{ .fontStyle1;text-align:left;line-height:@font22;margin-bottom:@font10;}
                    .subGrey{line-height:@font20;font-size:@font14;color:@desColor;text-align:left;}
                    .marBotSmall{margin-bottom:@font5;}
                }
                .det{
                    .tit{line-height:@font20;font-size: @font14;color:#333;text-align:left;margin-bottom:@font10;
                        .red{color:#f00;}
                        .blue{font-size:@font16;color:@baseBlue;}
                    }
                    .tit.clear{margin-bottom:@font5;}
                    .des{line-height:@font18;font-size: @font13;color:#333;text-align:left;}
                    .uInfo{line-height:@font20;margin-bottom: @font5;color:#333;font-weight: bold;text-align:left;
                        .big{font-size: @font14;margin-right: @font20;}
                        .normal{font-size: @font13;}
                    }
                    .bot{line-height:@font18;margin-top:@font22;padding-top:@font15;border-top:1px solid #eee;display:flex;justify-content: space-between;
                        .txt-lab{font-size:@font13;color:#333;}
                        .txt-price{font-size:@font15;color:@baseBlue;font-weight:bold;}
                        .txt-price.black{color:#333;}
                    }
                    .bot.marClear{margin-top:0;margin-bottom:@font10;padding-top:0;border-top:none;}
                    .bot.marClearZero{margin-top:0;padding-top:0;border-top:none;}
                    .pointSwitch{display:flex;justify-content: space-between; align-items: center;
                        .ps-left{font-size: @font13;color: #333;}
                        .ps-right{width:@font50;height: @font30;display:block;-webkit-border-radius: @font40;-moz-border-radius: @font45;border-radius: @font45;
                            -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;
                            i{width: .7467rem;height: .7467rem;background:#fff;display:block;-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}
                        }
                        .ps-right.switch-off{background:#fff;border:.0267rem solid #eee;
                            i{margin-left:.0533rem;border:.0267rem solid #eee;/*box-shadow:0 0 .1333rem #eee;*/}
                        }
                        .ps-right.switch-on{background:#44DB5E;
                            i{margin-top:.0267rem;margin-right:.0533rem;float:right;}
                        }
                    }
                    .text-area{width: @font335;height: @font80;padding:@font10;font-size: @font16;color: #333;outline:none;resize:none; border: 1px solid #ddd;letter-spacing: 0.27px;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}
                    .pay-title{margin:@font13 0 @font5;font-size:@font13; color:#333;}
                    .pay-time{line-height:@font40;font-size: @font28;font-weight:bold;color: #333;}
                }
                .payTxt{font-size:@font13;color:#999;}
                .payMet{line-height:@font25;
                    label{display:flex;justify-content: space-between;align-items:center;}
                    input[type=radio]{width:@font16;height: @font16;}
                    .iconfont{font-size:@font22;margin-right: @font6;}
                    .icon-icon_weixinzhifu{color:#41B035;}
                    .icon-icon_zhifubao{color:#19A0E5;}
                    .payLeft{display:flex;align-items:center;}
                }
                .payMet.mar1{margin:@font5 0 @font20;}
                .payMet.mar2{margin-bottom:-@font5;}
                .payTxt.singleTit{margin: @font17 @font20 @font7;text-align:left;}
                .return-btnBig{width:@font335;height:@font45;line-height:@font45; margin:@font40 auto 0; font-size:@font16; .btnStyle(#69f,#fff);border-radius:@font100;}
                .e-ticket-block{display:flex;justify-content: space-between;align-items: center;
                    .iconfont{font-size:@font40;color:#999;}
                }
                .marBotNeg{margin-bottom:-.2667rem!important;}
            }
            .middle::-webkit-scrollbar{width:0;height:0;}
            .waiting{top:@font77;}
            .confirm{top:@font44;}
            .conFull{bottom:0;}
            .bottom{max-width:450px;margin:0 auto;height:@font50;background:#fff;display:flex;justify-content: flex-end;align-items:center;position:fixed;bottom:0;left:0;right:0;
                .btn{width:@font120;height:@font50;line-height: @font50;text-align:center;font-size:@font16;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}
                .cancel{.btnStyle(#F0F7FF,#69f);border-top:1px solid #C0CCDA;}
                .ok{ .btnStyle(#69f,#fff)}
                .txt{line-height: @font50;margin-right: @font36;font-size:@font16;color:#333;}
                .return{width: @font80;height: @font34;line-height: @font34;text-align:center;border:1px solid @baseBlue;font-size: @font14;color:@baseBlue;-webkit-border-radius: @font69;-moz-border-radius: @font69;border-radius: @font69;}
                .return.mar{margin-right:@font20;}
            }
        }
        .lineItem{
            width:100%;
            background:#fff;
            margin-top:0.13rem;
            .linItem-top{
                width:100%;
                padding:0.27rem 0.53rem;
                box-sizing: border-box;
                font-size: 16px;
                color: #333333;
                max-height:1.47rem;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .linItem-bottom{
                width:100%;
                padding:0 0.53rem 0.59rem 0.53rem;
                box-sizing: border-box;
                overflow: hidden;
                .linItem-img{
                    width:3.2rem;
                    height:2.13rem;
                    float:left;
                    img{
                        width:100%;
                        height:100%;
                    }
                }
                .linItem-right{
                    width:5.47rem;
                    height:2.13rem;
                    float:left;
                    margin-left:0.27rem;
                    p{
                        font-size: 12px;
                        color: #666666;
                        margin-bottom:0.13rem;
                        white-space:nowrap;
                        text-overflow:ellipsis;
                        overflow:hidden;
                    }
                    p:nth-child(2){
                        width:100%;
                        height:0.45rem;
                        line-height:0.45rem;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                    p:last-child{
                        margin-bottom:0;
                    }
                }
            }
        }
        .orderPrice{
            width:100%;
            background:#fff;
            margin-top:0.13rem;
            padding:0 0.45rem;
            box-sizing: border-box;
            .orderPrice-top{
                padding:0.43rem 0 ;
                box-sizing: border-box;
                border-bottom:1px solid #EEE;
                div{
                    width:100%;
                    line-height:0.75rem;
                    font-size: 13px;
                    color: #333333;
                    span{
                        float:right;
                    }
                }
            }
            .orderPrice-bottom{
                width:100%;
                height:1.41rem;
                line-height:1.41rem;
                span{
                    float:right;
                    font-size: 15px;
                    color: #6699FF;
                }
            }
        }
        .trans-common{
            background:#fff;
            .title{margin-bottom: @font9;line-height: @font22;text-align:left;font-size: @font16;color: #333;font-weight:bold;}
            .con{
                display:flex;justify-content:flex-start;
                .left{
                    width: @font80;height: @font80;overflow:hidden;
                    .image{min-width: @font50;height: @font80;}
                }
                .right{
                    margin-left: @font10;
                    .des{margin-bottom: @font5;line-height: @font17;font-size: @font12;color: #666;text-align:left;}
                }
            }
        }
        .Vip{
            width:100%;
            padding:0.27rem 0.53rem;
            box-sizing: border-box;
            background:#fff;
            margin-top:0.13rem;
            p:nth-child(1){
                width:100%;
                font-size: 16px;
                color: #333333;
                line-height:0.59rem;
                margin-top:0;
            }
            p{
                width:100%;
                font-size: 12px;
                color: #666666;
                line-height:0.45rem;
                margin-top:0.13rem;
                span{
                    font-size:12px;
                }
            }
        }
        .bottomBtn{
            width:100%;
            height:1.33rem;
            line-height:1.33rem;
            background:#fff;
            box-shadow: inset 0 0 0 0 rgba(221,221,221,0.50);
            position:absolute;
            bottom:0;
            left:0;
            right:0;
            .btn-left{
                width:68%;
                height:1.33rem;
                float:left;
            }
            .btn-right{
                width:100%;
                height: 1.33rem;
                float:right;
                background: #6699FF;
                box-shadow: inset 0 0 0 0 #C0CCDA;
                text-align: center;
                font-size: 16px;
                color: #FFFFFF;
                letter-spacing: 0;
            }
        }
    }

    .fontStyle1(@size:@font16,@color:#69f){
        font-size:@size;color:@color;
    }
    .btnStyle(@bgColor:#fff;@color:#333){
        background:@bgColor;color:@color;
    }
</style>