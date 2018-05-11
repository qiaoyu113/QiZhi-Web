<template>
    <div id="app" class="scroll" v-bind="{'minWidth':this.$route.name!='invitelogin'}">
        <navbar v-if="nocommon == 0"></navbar>
        <router-view class="view"></router-view>
        <z-footer v-if="nocommon == 0"></z-footer>
    </div>
</template>

<script>
    import {appService} from './service/appService'
    export default {
        name: 'app',
        data() {
            return{
                nocommon:null,
                loginIs:null,
                noinvite:false
            }
        },
        components: {},
        watch: {
            '$route' (to,from) {
                const that = this;
                that.hasCommon();
                that.loginWay();
                that.hasInvite();
            }
        },
        mounted: function () {
            this.hasCommon()
            this.loginWay();
            this.hasInvite()
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
    @import url('assets/css/icon/iconfont.css');
</style>
