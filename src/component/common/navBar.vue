<template>
  <div id="navBar" v-bind:class="{'dingwei':this.$route.name=='home','backcolor1 bordbu1':this.$route.name=='home' && ticking==false}">
    <div class="nav_center">
        <div id="img" v-bind:class="{'backlogo':this.$route.name=='home'&& ticking==false}" @click="goHome()"></div>
        <!-- <img src="../../assets/image/common/logo.png" alt=""> -->
        <div class="nav_ul">
            <router-link :to="{name:'home'}" v-bind:class="{'li_red':current1}">首页<span v-if="current1" class="select_line"></span></router-link>
            <router-link :to="{name:'news'}" v-bind:class="{'li_red':current2}">资讯<span v-if="current2" class="select_line"></span></router-link>
            <router-link :to="{name:'activity'}" v-bind:class="{'li_red':current3}">活动<span v-if="current3" class="select_line"></span></router-link>
            <router-link :to="{name:'concern'}" v-bind:class="{'li_red':current4}">关注<span v-if="current4" class="select_line"></span></router-link>
            <router-link :to="{name:'subject'}" v-bind:class="{'li_red':current5}">专题<span v-if="current5" class="select_line"></span></router-link>
            <router-link :to="{name:'database'}" v-bind:class="{'li_red':current6}">资料库<span v-if="current6" class="select_line"></span></router-link>
            <router-link :to="{name:'vip'}" v-bind:class="{'li_red':current7}">会员中心<span v-if="current7" class="select_line"></span></router-link>
        </div>
        <!-- <router-link v-if="!loginFlag" :to="{name:''}" id="vip">会员中心</router-link> -->
        <router-link v-if="!loginFlag" :to="{name:'register'}" id="nav_register">注册</router-link>
        <router-link v-if="!loginFlag" :to="{name:'login'}" id="nav_login">登录</router-link>
        <router-link v-if="loginFlag" class="personname" :to="{name:'myContract'}">{{name}}</router-link>
        <i v-bind:class="{'enterMycenter':loginFlag}" class="iconfont icon-pep" @click="clickIcon()"></i>
        <router-link :to="{name:'search'}" id="nav_search"><i class="iconfont icon-sousuo"></i>搜索</router-link>
        <a href="http://admin.wetuc.com/admin/login" class="fabu">发布</a>

        
        <!-- <router-link v-if="loginFlag" class="personimg" :to="{name:''}"><img v-if="indexLogo!=null && indexLogo!=''" :src="this.$store.state.picHead + indexLogo" alt=""></router-link> -->
    </div>
  </div>
</template>

<script>
    import {indexService} from '../../service/indexService'
    export default {
        data() {
            return{
                select_nav:0,
                pos:0,
                ticking:false,
                loginFlag:false,
                name:'',
                indexLogo:'',
                current1:false,
                current2:false,
                current3:false,
                current4:false,
                current5:false,
                current6:false,
                current7:false,

            }
        },
        computed:{
        },
        watch:{
            '$route' (to,from) {
                this.currentPage() //nav
                this.getlogin()
            }
        },
        mounted() {
          const that = this;
          that.currentPage()
          that.getlogin()
          window.addEventListener('scroll', that.handleScroll)
        },
        updated: function () {
        },
        methods: {
          clickIcon(){
            if(loginFlag){
              this.$router.push({name:'personal'})
            } 
          },
          getlogin(){
            const that = this;
            if(localStorage.token && localStorage.token!='undefined'){
              that.loginFlag = true;
              indexService.myCenter({
                }).then(function (res) {
                  let User = res.data.datas
                  that.name = User.user.nickName
              })
            }
          },
          currentPage(){
            let currentUrl = this.$route.path
            if(currentUrl == '/'){
              this.current1 = true
              this.current2=false
              this.current3=false
              this.current4=false
              this.current5=false
              this.current6=false
              this.current7=false
            } else if (currentUrl.indexOf('news') != -1) {
              this.current2 = true
              this.current1 = false
              this.current3=false
              this.current4=false
              this.current5=false
              this.current6=false
              this.current7=false
              
            } else if (currentUrl.indexOf('activity') != -1) {
              this.current3 = true
              this.current1 = false
              this.current2=false
              this.current4=false
              this.current5=false
              this.current6=false
              this.current7=false
            } else if (currentUrl.indexOf('concern') != -1) {
              this.current4 = true
              this.current1 = false
              this.current2=false
              this.current3=false
              this.current5=false
              this.current6=false
              this.current7=false
            } else if (currentUrl.indexOf('subject') != -1) {
              this.current5 = true
              this.current1 = false
              this.current2=false
              this.current3=false
              this.current4=false
              this.current6=false
              this.current7=false
            } else if (currentUrl.indexOf('database') != -1) {
              this.current6 = true
              this.current1 = false
              this.current2=false
              this.current3=false
              this.current4=false
              this.current5=false
              this.current7=false
            } else if (currentUrl.indexOf('vip') != -1) {
              this.current6 = false
              this.current1 = false
              this.current2=false
              this.current3=false
              this.current4=false
              this.current5=false
              this.current7=true
            }
            //console.log('当前页面', currentUrl.indexOf('production'))
          },
          goHome(){
            this.$router.push({name:'home'})
          },
          handleScroll () {
            this.pos = window.scrollY;
            if(this.pos > 1&&!this.ticking){
              this.ticking = true;
            }
            if(this.pos < 1 && this.ticking){
              this.ticking = true;

            }
          }
        }
        
    }
</script>

<style lang="less">
  // class变化
  #navBar{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    height: 60px;
    width: 100%;
    background: #FAFAFA;
    box-shadow: inset 0 -1px 0 0 rgba(224,224,224,0.50);
    .nav_center{
      margin:0 auto;
      width: 90%;
      min-width:1200px;
      max-width:1400px;
      height: 100%;
      .enterMycenter{
        cursor: pointer;
      }
      .fabu{
        float: right;
        font-size: 14px;
        display: inline-block;
        padding: 4px 15px;
        margin-top: 15px;
        color: #389BFF;
        border: 1px solid #389BFF;
        border-radius: 20px;
      }
      .icon-pep{
        display: inline-block;
        float: right;
        color: #B2B2B2;
        margin-top: 17px;
        font-size: 20px;
        margin-left: 30px;
      }
      #img{
        margin-top: 13px;
        width:136px;
        height:34px;
        float: left;
        background-image: url('../../assets/image/logo.png');
        background-repeat: no-repeat;
        background-size:cover;
        cursor:pointer;
      }
      #vip{
        float: right;
        line-height: 60px;
        font-size: 14px;
        color: #7F7F7F;
        letter-spacing: 1.17px;
        margin-left: 10px;
      }
      .nav_ul{
        display:inline-block;
        height: 100%;
        .li_red{
          color:#389BFF !important;
        }
        a{
          position: relative;
          cursor: pointer;
          display: inline-block;
          float: left;
          margin-left: 45px;
          height: 100%;
          line-height: 60px;
          font-size: 14px;
          color: #4E4E4E;
          letter-spacing: 1.17px;
          .select_line{
            position: absolute;
            left:-10px;
            top: 50%;
            transform: translateY(-50%);
            display: inline-block;
            width: 4px;
            height: 4px;
            background: #389BFF;
          }
        }
      }
      #nav_search{
        cursor: pointer;
        padding: 6px 15px;
        margin-top: 13px;
        margin-left: 20px;
        float: right;
        display: inline-block;
        font-size: 14px;
        color: #7F7F7F;
        letter-spacing: 1.33px;
        .icon-sousuo{
          margin-right:5px;
          font-size: 18px;
        }
      }
      #nav_login{
        cursor: pointer;
        margin-top: 20px;
        padding:0 10px;
        float: right;
        display: inline-block;
        font-size: 14px;
        color: #7F7F7F;
      }
      #nav_register{
        cursor: pointer;
        padding:0 10px;
        margin-top: 20px;
        float: right;
        display: inline-block;
        font-size: 14px;
        color: #7F7F7F;
        border-left: 1px solid #d8d8d8;
      }
      .personname{
        float: right;
        line-height: 60px;
        height: 60px;
        font-size: 14px;
        color: #7F7F7F;
        margin-left: 3px;
      }
      .personimg{
          float: right;
          width: 30px;
          height: 30px;
          background-image: url('../../assets/image/default_photo.png');
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          border: 1px solid #DDDDDD;
          border-radius: 100%;
          overflow: hidden;
          margin: 14px 12px 0 30px;
        img{
          width: 100%;
          height: auto;
        }
      }

    }
  }
</style>