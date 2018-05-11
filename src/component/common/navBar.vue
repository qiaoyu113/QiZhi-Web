<template>
  <div id="navBar" v-bind:class="{'dingwei':this.$route.name=='home','backcolor1 bordbu1':this.$route.name=='home' && ticking==false}">
    <div class="nav_center">
        <div id="img" v-bind:class="{'backlogo':this.$route.name=='home'&& ticking==false}" @click="goHome()"></div>
        <!-- <img src="../../assets/image/common/logo.png" alt=""> -->
        <div class="nav_ul">
            <router-link :to="{name:'home'}" v-bind:class="{'colorfont1':this.$route.name=='home'&& ticking==false,'li_red':current1}">首页<span v-if="current1" class="select_line"></span></router-link>
            <router-link :to="{name:'production'}" v-bind:class="{'colorfont1':this.$route.name=='home'&& ticking==false, 'li_red':current2}">合通产品<span v-if="current2" class="select_line"></span></router-link>
            <router-link :to="{name:'partner'}" v-bind:class="{'colorfont1':this.$route.name=='home'&& ticking==false, 'li_red':current3}">合通合作伙伴<span v-if="current3" class="select_line"></span></router-link>
            <router-link :to="{name:'news'}" v-bind:class="{'colorfont1':this.$route.name=='home'&& ticking==false, 'li_red':current4}">合通新闻<span v-if="current4" class="select_line"></span></router-link>
            <router-link :to="{name:'concern'}" v-bind:class="{'colorfont1':this.$route.name=='home'&& ticking==false, 'li_red':current5}">关于合通机器人<span v-if="current5" class="select_line"></span></router-link>
            <router-link :to="{name:'free'}" v-bind:class="{'colorfont1':this.$route.name=='home'&& ticking==false, 'li_red':current6}">免费模板<span v-if="current6" class="select_line"></span></router-link>
        </div>
        <router-link v-if="!loginFlag" :to="{name:'register'}" v-bind:class="{'colorfont1 backcolor1 bordsize1':this.$route.name=='home'&& ticking==false}" id="nav_register">注册</router-link>
        <router-link v-if="!loginFlag" :to="{name:'login'}" v-bind:class="{'colorfont1 backcolor1 bordsize1':this.$route.name=='home'&& ticking==false}" id="nav_login">登录</router-link>
        <router-link v-if="!loginFlag" :to="{name:'search'}" v-bind:class="{'colorfont1':this.$route.name=='home'&& ticking==false}" id="nav_search"><i class="iconfont icon-sousuo"></i>搜索</router-link>

        <router-link v-if="loginFlag" class="personname" v-bind:class="{'colorfont1':this.$route.name=='home'&& ticking==false,'li_red':this.$route.path=='/'}" :to="{name:'myContract'}">{{name}}</router-link>
        <router-link v-if="loginFlag" class="personimg" :to="{name:'myContract'}"><img v-if="indexLogo!=null && indexLogo!=''" :src="this.$store.state.picHead + indexLogo" alt=""></router-link>
        <router-link v-if="loginFlag" :to="{name:'search'}" v-bind:class="{'colorfont1':this.$route.name=='home'&& ticking==false}" id="nav_search"><i class="iconfont icon-sousuo"></i></router-link>
    </div>
  </div>
</template>

<script>
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
          getlogin(){
            const that = this;
            if(localStorage.token && localStorage.token!='undefined'){
              that.loginFlag = true;
            }
          },
          currentPage(){
            let currentUrl = this.$route.path
            //console.log('111currentUrl', currentUrl.indexOf('production'))
            if(currentUrl == '/'){
              this.current1 = true
              this.current2=false
              this.current3=false
              this.current4=false
              this.current5=false
              this.current6=false
            } else if (currentUrl.indexOf('production') != -1) {
              this.current2 = true
              this.current1 = false
              this.current3=false
              this.current4=false
              this.current5=false
              this.current6=false
            } else if (currentUrl.indexOf('partner') != -1) {
              this.current3 = true
              this.current1 = false
              this.current2=false
              this.current4=false
              this.current5=false
              this.current6=false
            } else if (currentUrl.indexOf('news') != -1) {
              this.current4 = true
              this.current1 = false
              this.current2=false
              this.current3=false
              this.current5=false
              this.current6=false
            } else if (currentUrl.indexOf('aboutus') != -1) {
              this.current5 = true
              this.current1 = false
              this.current2=false
              this.current3=false
              this.current4=false
              this.current6=false
            } else if (currentUrl.indexOf('free') != -1) {
              this.current6 = true
              this.current1 = false
              this.current2=false
              this.current3=false
              this.current4=false
              this.current5=false
            } else {
              this.current6 = false
              this.current1 = false
              this.current2=false
              this.current3=false
              this.current4=false
              this.current5=false
            }
            //console.log('当前页面', currentUrl.indexOf('production'))
          },
          goHome(){
            this.$router.push({name:'home'})
          },
          // getlogin(){
          //   const that = this;
          //   if(localStorage.token && localStorage.token!='undefined'){
          //     that.loginFlag = true;
          //     that.name=that.$store.state.loginStore.name,
          //     that.indexLogo=that.$store.state.loginStore.headImg
          //     // indexService.myCenter({
          //     // }).then(function (res) {
          //     //   that.name = res.data.datas.baseUser.name
          //     //   that.$store.state.indexName = res.data.datas.baseUser.name

          //     //   console.log('0000', that.name)
          //     //   if(res.data.datas.baseUser.headimgurl == null){
          //     //     that.indexLogo = ''
          //     //   } else {
          //     //     that.indexLogo = that.$store.state.picHead + res.data.datas.baseUser.headimgurl
          //     //     that.$store.state.indexLogo = res.data.datas.baseUser.headimgurl
          //     //   }
          //     //     console.log('获取个人信息', res.data.datas)
          //     // }
          //   }
          // },
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
  .backcolor1{}
  .bordbu1{}
  .colorfont1{}
  .bordsize1{}
  .backlogo{}
  .dingwei{}
  // .backcolor1{transition:background 2s;background-color: transparent !important;}
  // .bordbu1{border-bottom: 0px !important;}
  // .colorfont1{color:#fff !important;}
  // .bordsize1{border: 1px solid #fff !important;}
  // .backlogo{background-image: url('../../assets/image/common/logo2.png') !important;}
  // .dingwei{z-index: 10;position: absolute;top:0;left: 0;}


  #navBar{
    height: 60px;;
    width: 100%;
    border-bottom: 1px solid #eeeeee;
    transition:background .5s;
    background-color: #FFF;
    .nav_center{
      margin:0 auto;
      width: 90%;
      min-width:1200px;
      max-width:1400px;
      height: 100%;
      #img{
        margin-top: 13px;
        width:90px;
        height:34px;
        float: left;
        /*background-image: url('../../assets/image/common/logo.png');*/
        background-repeat: no-repeat;
        background-size:cover;
        cursor:pointer;
      }
      .nav_ul{
        display:inline-block;
        height: 100%;
        .li_red{
          color:#B8002E !important;
        }
        a{
          position: relative;
          cursor: pointer;
          display: inline-block;
          float: left;
          margin-left: 50px;
          height: 100%;
          line-height: 70px;
          font-size: 16px;
          color: #333333;
          letter-spacing: 1.33px;
          .select_line{
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            display: inline-block;
            width: 20px;
            height:3px;
            background: #B8002E;
          }
        }
      }
      #nav_search{
        cursor: pointer;
        padding: 6px 15px;
        margin-top: 16px;
        margin-left: 20px;
        float: right;
        display: inline-block;
        font-size: 16px;
        color: #333333;
        letter-spacing: 1.33px;
        .icon-sousuo{
          margin-right:5px;
          font-size: 20px;
        }
      }
      #nav_login{
        cursor: pointer;
        margin-top: 16px;
        margin-left: 20px;
        float: right;
        display: inline-block;
        padding: 6px 15px;
        font-size: 16px;
        color: #B8002E;
        letter-spacing: 1.33px; 
        background: #FFFFFF;
        border: 1px solid #B8002E;
      }
      #nav_register{
        cursor: pointer;
        margin-top: 16px;
        margin-left: 20px;
        float: right;
        display: inline-block;
        padding: 6px 15px;
        font-size: 16px;
        color: #fff;
        letter-spacing: 1.33px; 
        background: #B8002E;
        border: 1px solid #B8002E;
      }
      .personname{
        float: right;
        line-height: 60px;
        height: 60px;
        font-size: 16px;
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