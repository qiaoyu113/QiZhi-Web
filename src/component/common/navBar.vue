<template>
  <div id="navBar" v-bind:class="{'dingwei':this.$route.name=='home','backcolor1 bordbu1':this.$route.name=='home' && ticking==false}">
    <div class="nav_center">
        <div id="img" v-bind:class="{'backlogo':this.$route.name=='home'&& ticking==false}" @click="goHome()"></div>
        <div class="shu"></div>
        <!-- <img src="../../assets/image/common/logo.png" alt=""> -->
        <div class="nav_ul">
            <router-link :to="{name:'home'}" v-bind:class="{'li_red':current1}">首页<span v-if="current1" class="select_line"></span></router-link>
            <router-link :to="{name:'news',params:{id:1}}" v-bind:class="{'li_red':current2}">资讯<span v-if="current2" class="select_line"></span></router-link>
            <router-link :to="{name:'activity'}" v-bind:class="{'li_red':current3}">活动<span v-if="current3" class="select_line"></span></router-link>
            <router-link :to="{name:'concern'}" v-bind:class="{'li_red':current4}">关注<span v-if="current4" class="select_line"></span></router-link>
            <router-link :to="{name:'database'}" v-bind:class="{'li_red':current5}">资料库<span v-if="current5" class="select_line"></span></router-link>
            <router-link :to="{name:'vip'}" v-bind:class="{'li_red':current6}">会员中心<span v-if="current6" class="select_line"></span></router-link>
        </div>
        <!-- <router-link v-if="!loginFlag" :to="{name:''}" id="vip">会员中心</router-link> -->
        <router-link v-if="!loginFlag" :to="{name:'register'}" id="nav_register">注册</router-link>
        <router-link v-if="!loginFlag" :to="{name:'login'}" id="nav_login">登录</router-link>
       <div class="tokenr clearfix">
        <router-link v-if="loginFlag" class="personname" to="">{{name}}</router-link>
        <i v-bind:class="{'enterMycenter':loginFlag}" class="iconfont icon-pep" @click="clickIcon()"></i>
        <div class="layer" v-if="loginFlag">
           <i></i>
           <ul>
             <li><router-link :to="{name:'purchase'}">我的购买</router-link> </li>
             <!-- <li><router-link :to="{name:''}">我的推广</router-link> </li> -->
             <!-- <li><router-link :to="{name:'integral'}">我的积分</router-link> </li> -->
             <!-- <li><router-link :to="{name:'code'}">兑换码</router-link> </li> -->
             <li><router-link :to="{name:'setup'}">账号设置</router-link> </li>
             <li class="no-border" @click="signout">退出</li>
           </ul>
        </div>
       </div>
        
        <router-link :to="{name:'search'}" id="nav_search"><i class="iconfont icon-sousuo"></i>搜索</router-link>
        <a href="http://admin.wetuc.com/admin/login" class="fabu">发布</a>
        <!-- <router-link v-if="loginFlag" class="personimg" :to="{name:''}"><img v-if="indexLogo!=null && indexLogo!=''" :src="this.$store.state.picHead + indexLogo" alt=""></router-link> -->
    </div>
  </div>
</template>

<script>
    import {indexService} from '../../service/indexService'
    import {modularService} from '../../service/modularService'
    
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
            if(this.loginFlag){
              this.$router.push({name:'purchase'})
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
          //跳个人中心
          gopersonal:function(){
             this.$router.replace({name:'personal'})
          },
          // 退出
          signout(){
             let that =this
            modularService.daleteTokens({}).then(function (res) {
                  localStorage.token = undefined
                  sessionStorage.removeItem('token');
                  that.$router.go(0)
              })
          },
          currentPage(){
            let currentUrl = this.$route.name
            if(currentUrl == 'home'){
              this.current1 = true
              this.current2=false
              this.current3=false
              this.current4=false
              this.current5=false
              this.current6=false
              this.current7=false
            } else if (currentUrl == 'news') {
              this.current2 = true
              this.current1 = false
              this.current3=false
              this.current4=false
              this.current5=false
              this.current6=false
              this.current7=false
              
            } else if (currentUrl == 'activity') {
              this.current3 = true
              this.current1 = false
              this.current2=false
              this.current4=false
              this.current5=false
              this.current6=false
              this.current7=false
            } else if (currentUrl == 'concern') {
              this.current4 = true
              this.current1 = false
              this.current2=false
              this.current3=false
              this.current5=false
              this.current6=false
              this.current7=false
            } else if (currentUrl == 'database') {
              this.current5 = true
              this.current1 = false
              this.current2=false
              this.current3=false
              this.current4=false
              this.current6=false
              this.current7=false
            } else if (currentUrl == 'vip') {
              this.current6 = true
              this.current1 = false
              this.current2=false
              this.current3=false
              this.current4=false
              this.current5=false
              this.current7=false
            } else {
              this.current6 = false
              this.current1 = false
              this.current2=false
              this.current3=false
              this.current4=false
              this.current5=false
              this.current7=false
            }
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
    background: #FFFFFF;
    box-shadow: 0 5px 4px 0 rgba(201,201,201,0.10), inset 0 -1px 0 0 rgba(224,224,224,0.50);
    .nav_center{
      margin:0 auto;
      width: 90%;
      width: 1200px;
      height: 100%;
      position: relative;
      .layer{
        display: none;
        position: absolute;
        left: 50%;
        top: 50px;
        transform: translateX(-50%);
        background: #fff;
        width: 120px;
        border:1px solid #e0e0e0;
        i{
          width: 6px;
          height: 6px;
          position: absolute;
          left: 50%;
          top: -5px;
          margin-left: -5px;
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          -ms-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          transform: rotate(-45deg);
          background-color: #fff;
          border-top: 1px solid #e0e0e0;
          border-right: 1px solid #e0e0e0;
          display: inline-block;
        }
        ul{
           padding: 4px 10px;
           background-color: #fff;
           overflow: hidden;
           display: block;
           li{
             width: 100%;
             height: 40px;
             line-height: 40px;
             text-align: center;
             font-size: 15px;
             color: #7f7f7f;
             border-bottom: 1px solid #e0e0e0;
             cursor: pointer;
             a{
               font-size: 15px;
                color: #7F7F7F;
             }
           }
           li:hover{
             color: #389BFF;
             a{
                color: #389BFF;
             }
           }
           .no-border{
              border-bottom: none;
           }
        }
      }
     
      .enterMycenter{
        cursor: pointer;
      }
      .fabu{
        float: right;
        font-size: 15px;
        display: inline-block;
        padding: 4px 15px;
        margin-top: 15px;
        color: #389BFF;
        border: 1px solid #389BFF;
        border-radius: 20px;
      }
      .fabu:hover{
        background: -webkit-linear-gradient(-5deg, #22a7f0 0%, #3a75c2 100%);
        color: #ffffff;
        border: 1px solid #389BFF;
      }
      .icon-pep{
        display: inline-block;
        float: right;
        color: #B2B2B2;
        margin-top: 17px;
        font-size: 20px;
        margin-left: 25px;
      }
      #img{
        margin-top: 13px;
        width:136px;
        height:34px;
        float: left;
        margin-right: 22px;
        background-image: url('../../assets/image/logo.png');
        background-repeat: no-repeat;
        background-size:cover;
        cursor:pointer;
      }
      .shu{
        width: 1px;
        height: 60px;
        opacity: 0.5;
        background: #D8D8D8;
        float: left;
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
          font-size: 15px;
          color: #4E4E4E;
          letter-spacing: 1.17px;
          .select_line{
            position: absolute;
            left:50%;
            bottom: 0;
            transform: translateX(-50%);
            display: inline-block;
            width: 32px;
            height: 3px;
            background: #389BFF;
          }
        }
      }
      #nav_search{
        cursor: pointer;
        padding: 6px 0px;
        margin-top: 13px;
        margin-left: 25px;
        float: right;
        display: inline-block;
        font-size: 15px;
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
      .tokenr{
        position: relative;
        float: right;
      }
      .tokenr:hover .layer{
         display: block;
      }
      .personname{
        float: right;
        line-height: 60px;
        height: 60px;
        font-size: 15px;
        color: #7F7F7F;
        padding-left: 3px;
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