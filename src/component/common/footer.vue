<template>
  <div class="footer" id="footer">
    <div class="footer_center">
      <div class="foot_left">
        <!--<img class="fot_image" src="../../assets/image/common/fot_lft.png">-->
        <p class="zong">关注我们获取更多信息</p>
      </div>
      <div class="foot_center">
        <ul class="typ1">
          <li class="tit">010-12345678</li>
          <li class="sub">客服电话</li>
          <!--<li class="sub"><img class="fot-logo" src="../../assets/image/common/logo_footer.png"></li>-->
        </ul>
        <ul class="typ-line"></ul>
        <ul class="typ2">
          <li class="tit">合通产品</li>
          <li class="sub"><router-link :to="{name:'free'}">免费试用</router-link></li>
          <li class="sub"><router-link :to="{name:'demoList'}">演示视频</router-link></li>
        </ul>
        <ul class="typ2">
          <li class="tit">关于我们</li>
          <li class="sub"><router-link :to="{name:'concern'}">关于合通机器人</router-link></li>
          <li class="sub"><router-link :to="{name: 'partner'}">合通合作伙伴</router-link></li>
        </ul>
        <ul class="typ2">
          <li class="tit">其它</li>
          <li class="sub"><router-link :to="{name:'items'}">用户条款</router-link></li>
          <li class="sub"><router-link :to="{name:'statement'}">免责声明</router-link></li>
        </ul>
      </div>
      <div class="foot_right">
        <!--<img class="fot_image" @click="jumpUrl()" src="../../assets/image/common/fot_rit.png" alt="">-->
      </div>
    </div>
    <div class="foot_bottom">
      <p>© 2018 北京慧问数据科技有限公司 版权所有 京ICP备18001904号-1</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
//  import {indexService} from '../../service/indexService'
  export default {
    data() {
      return{
      }
    },
    mounted() {
      const that = this;


    },
    updated: function () {
    },
    methods: {
      jumpUrl:function(){
        this.$router.push({name:'inviterule'})
      }
    }

  }
</script>

<style lang="less" scoped>
  #footer{
    width: 100%;
    height: 240px;
    background-color:  #333333;
  .footer_center{
    padding-top: 40px;
    width: 832px;
    height: 150px;
    margin: 0 auto;
    display:flex; align-items:center; justify-content: space-between;
    .fot_image{width: 120px;height: 120px;cursor: pointer;}
    .zong{width: 14px;font-size: 10px;
      margin-left:11px;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      -o-transform: scale(1);
      transform: scale(1);
      color: #FFFFFF;
      letter-spacing: 0.83px;
      line-height: 14px;}
    .foot_left{
      display:flex;align-items:center; justify-content: space-between;
    }
    .foot_center{
       width: 493px;
      display:flex; align-items:center; justify-content: space-between;
      .fot-logo{width:70px;height:26px;}
      .typ1 .sub,.typ2 .sub{
        font-size: 12px;
        color: #FFFFFF;
        letter-spacing: 1px;
        margin-bottom: 10px;
        a{
          font-size: 12px;
          color: #FFFFFF;
          letter-spacing: 1px;
        }
      }
      .typ1{
      .tit{font-size: 16px;
        margin-bottom: 15px;
        color: #FFFFFF;
        letter-spacing: 1.33px;}
      }
      .typ2{
      .tit{font-size: 14px;
        margin-bottom: 15px;
        color: #FFFFFF;
        letter-spacing: 1.17px;}
      }
      .typ-line{width:0;height:101px;border: 1px solid #404040;}
    }
  }
  .foot_bottom{
    height: 50px;
    line-height: 30px;
    text-align: center;
  P{
    font-size: 12px;
    color: #999;
    letter-spacing: 1px;
  }
  }
  }

</style>