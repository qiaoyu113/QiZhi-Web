e<template>
    <div id="app" class="scroll" v-bind="{'minWidth':this.$route.name!='invitelogin'}">
        <navbar v-if="show == true && navshow==true"></navbar>
        <router-view class="view" v-if="show == true"></router-view>
        <z-footer v-if="show == true && footershow==true"></z-footer>
    </div>
</template>

<script>
    import {appService} from './service/appService'
    import {filter} from './mixin/filter'
    export default {
        name: 'app',
         // 添加以下代码
        metaInfo () {
            return {
                meta: [
                    { vmid: 'description', name: 'description', content: this.$store.state.description },
                    { vmid: 'keyWords', name: 'keyWords', content: this.$store.state.keyWords },
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
            }
        },
        components: {},
        watch: {
            '$route' (to,from) {
                const that = this;
                // that.hasCommon();
                // that.loginWay();
                // that.hasInvite();
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
            

            this.$nextTick(function(){
                this.show = true
            })
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
