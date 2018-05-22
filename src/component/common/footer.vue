<template>
<div id="footer">
  <div class="color-line"></div>
  <div class="new-footer-center">
      <div class="fot-left">
          <img src="../../assets/image/wx.png">
          <div class="right">
              <p class="title"><span class="big">运联传媒</span>关注货运业 · 关怀货运人</p>
              <p class="des"> 2012-2017  版权所有 运联（北京）会展有限公司<br>
              北京市海淀区学清路甲18号中关村东升科技园学院园D609室<br>
              京ICP备17001150号-1
                  
              </p>
          </div>
      </div>
      <ul>
          <li class="title">关于</li>
          <li><a href="">关于我们</a></li>
          <li><a href="">加入我们</a></li>
          <li><a href="">合作伙伴</a></li>
      </ul>
      <ul class="margin-left-no">
          <li class="title">合作&联系</li>
          <li>电话：<a>010-62958252</a></li>
          <li>传真：<a>010-52071951</a></li>
          <li>客服微信：<a>010-62958252</a></li>
      </ul>
  </div>
</div>
  
</template>

<script type="text/ecmascript-6">
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
    min-width:1200px;/*height:238px;*/overflow:hidden;margin-top:55px;background-color:#fafafa;height:238px;
    .new-footer-center{width:1200px;margin:0 auto;}
    .color-line{height:2px;background-image: linear-gradient(47deg, #4D8BFF 0%, #E56E97 85%, #FF6985 100%);}
    .fot-left{height:120px;margin:50px 0 0 0;display:inline-block;}
    .fot-left > img {width:120px;height:120px;float:left;}
    .fot-left .right{margin-left:26px;float:right;}
    .fot-left .title{line-height:38px;font-size:14px;color: #303958;}
    .fot-left .title .big{font-size:18px;}
    ul{margin: 50px 30px 0 49px;float:right;}
    li, li a, .fot-left .des{line-height: 22px;font-size: 12px;color: #666;}
    .fot-left .des2{margin-top:10px;}
    li a:hover{text-decoration:underline;cursor:pointer;}
    li a.l{margin-right:10px;}
    li a.r{margin-left:10px;}
    li.title{line-height:38px;font-size: 18px;color: #303958;}
    .margin-right{margin-right:258px;}
    .margin-left-no{margin-left:0;}
    .friendly-links{width:1200px;margin:20px auto 40px;line-height:38px;overflow:hidden;}
    .friendly-links .title{font-size:18px;color: #303958;float:left;}
    .friendly-links a{margin-right:8px;font-size: 12px;color: #666;float:left;}
  }

</style>