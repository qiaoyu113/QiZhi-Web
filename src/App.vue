<template>
    <div id="app" class="scroll" v-bind="{'minWidth':this.$route.name!='invitelogin'}">
        <navbar v-show="navshow==true"></navbar>
        <router-view class="view"></router-view>
        <z-footer v-show="footershow==true"></z-footer>
    </div>
</template>

<script>
    import {appService} from './service/appService'
    import {filter} from './mixin/filter'
    export default {
        name: 'app',
        data() {
            return{
                nocommon:null,
                loginIs:null,
                noinvite:false,
                show:false,
                navshow:true,
                footershow:true,
            }
        },
        components: {},
        watch: {
            '$route' (to,from) {
                const that = this;
                // that.hasCommon();
                // that.loginWay();
                // that.hasInvite();
                if(to.name!='qrcode' &&to.name!='qrcode' && to.name!='login' && to.name!='phone' && to.name!='register' && to.name!='find' && to.name!='bind' && to.name!='modifyPass'&& to.name!='wxlogin'&& to.name!='bindQrcode'&& to.name!='bindwxlogin'){
                    appService.checkLogin()
                }
                   that.watchticket()
            }
        },
        mounted: function () {
             
            // this.hasCommon()
            // this.loginWay();
            // this.hasInvite()
           if(this.$route.name == 'ticket' || this.$route.name == 'activityPlace'){
                       this.navshow =false 
                       this.footershow=false
                     }

            appService.onBridgeReady()
        },
        methods: {
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
    .view{
        margin-top: 60px;
        min-height:700px;
        overflow: hidden;
        padding-bottom: 100px;
    }
</style>
