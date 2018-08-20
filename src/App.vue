<template>
    <div id="app" class="scroll" v-bind="{'minWidth':this.$route.name!='invitelogin'}">
        <navbar v-show="navshow==true"></navbar>
        <router-view class="view"></router-view>
        <z-footer v-show="footershow==true"></z-footer>
    </div>
</template>

<script>
    import {appService} from './service/appService'
    import {indexService} from './service/indexService'
    import {za} from './assets/js/demo'
    // import jsonp from 'jsonp'
    // import axios from 'axios'
    // import qs from 'qs'
    // import {getRecommend} from './assets/js/jsonp/recommend'
    // import {ERR_OK} from './assets/js/jsonp/config'
    import {filter} from './mixin/filter'
    export default {
        name: 'app',
            // 添加以下代码
        metaInfo () {
            const title = '运联网_让世界重新看见物流'
            const desc = '运联网是国内专注于物流产业的新媒体，是物流人成长与价值链接的平台，集物流趋势观察、行业研究、信息共享为一体，致力于物流产业链的共同繁荣和整体提升'
            const keyword = '运联网、专线、供应链、三方物流、零担、快递、快运、整车、园区、仓储、大车队、公路货运、无车承运人、智慧物流、云仓、同城配送、最后一公里、冷链、物联网'
            return {
                title,
                meta: [
                    { vmid: 'description', name: 'description', content: desc },
                    { vmid: 'keyWords', name: 'keyWords', content: keyword},
                ]
            }
        },
        data() {
            return{
                nocommon:null,
                loginIs:null,
                noinvite:false,
                show:false,
                navshow:true,
                footershow:true,
                ip:'',
            }
        },
        components: {},
        watch: {
            '$route' (to,from) {
                const that = this;
                that.IpNum()
                if(to.name!='qrcode' &&to.name!='qrcode' && to.name!='login' && to.name!='phone' && to.name!='register' && to.name!='find' && to.name!='bind' && to.name!='modifyPass'&& to.name!='wxlogin'&& to.name!='bindQrcode'&& to.name!='bindwxlogin'){
                    appService.checkLogin()
                }
                   that.watchticket()
            }
        },
        mounted: function () {
            // 获取ip
            this.IpNum()
           if(this.$route.name == 'ticket' || this.$route.name == 'activityPlace'){
                this.navshow =false 
                this.footershow=false
            }
            appService.onBridgeReady()
        },
        methods: {
            // taobaoIp: function(item) {
            //     const that = this
            //     if (item != undefined && item != '') {
            //         var url = 'http://ip.taobao.com/service/getIpInfo.php?ip='+item;
            //         console.log('请求路径',url)
            //         jsonp(url, { emulateJSON: true }, function (err, data) {
            //             if (err) {
            //                 console.error(err.message);
            //             } else {
            //                 console.log('淘宝返回', data)
            //             }
            //         });
            //     }
            // },
            getId(item) {
                // var url = 'http://ip.taobao.com/service/getIpInfo.php?ip='+item;
                var url = 'http://ip.taobao.com/service/getIpInfo.php?ip=myip'
                // axios.post(url, qs.stringify({ emulateJSON: true }))
                //     .then(
                //     (response) => {
                //         console.log('7777777',response.data)
                //         // if (parseInt(response.data.status) == 0) {
                            
                //         // }
                //     }
                // ).catch(function (error) {
                //     console.log(error);
                // });
                var script = document.createElement('script');  
                script.src = url;  
                document.body.appendChild(script);
                // getRecommend(item).then((res) => {
                //     if (res.code === ERR_OK) {
                //     console.log(2222222222,res.data)
                // }
                // })
            },
            IpNum(){
                const that = this
                indexService.getIp({
                }).then(function (res) {
                    if(res.data.code == 200){
                        if(res.data.datas != undefined){
                            that.ip = res.data.datas.data
                            za(that.ip.country,that.ip.region,that.ip.city,that.ip.isp)
                        } else {
                            za('其他','其他','其他','其他')
                        }
                    } else {
                        za('其他','其他','其他','其他')
                    }
                    
                })
            },
            goRegister:function(){
                this.$router.push({name:'register'})
            },
            loginWay:function(){
                if(localStorage.token && localStorage.token!='undefined'){
                    this.loginIs = true
                } else {
                    this.loginIs = false
                }
            },
            watchticket:function(){
                  if(this.$route.name == 'ticket' || this.$route.name == 'activityPlace'){
                       this.navshow =false 
                       this.footershow=false
                     }else{
                        this.navshow =true 
                       this.footershow=true
                    }
            },
            hasCommon:function(){
                const that = this
				if(that.$route.name == 'bindwxlogin' || that.$route.name == 'payok' || that.$route.name == 'invitelogin' || that.$route.name == 'invitecode' || that.$route.name == 'inviterule' || that.$route.name == 'alipay' || that.$route.name == 'paySuccess'){
                    that.nocommon = 1
                } else{
                    that.nocommon = 0
                }
            },
            hasInvite:function(){
                const that = this
				if(that.$route.name == 'paySuccess' || that.$route.name == 'bindwxlogin' || that.$route.name == 'payok' || that.$route.name == 'invitelogin' || that.$route.name == 'invitecode' || that.$route.name == 'inviterule' || that.$route.name == 'alipay' || that.$route.name == 'paySuccess'){
                    that.noinvite = true
                } else{
                    that.noinvite = false
                }
            }
        }
    }
</script>

<style lang="less">
    @import url('assets/css/base.less');
     @import url('assets/css/html.less');
    @import url('assets/css/icon/iconfont.css');
    .v-modal {
        display: none!important;
    }

    .view{
        margin-top: 60px;
        min-height:700px;
        overflow: hidden;
        padding-bottom: 100px;
    }
</style>
