<template>
  <div>
      <div class="jiathis_style_32x32">
        <a class="jiathis_button_tsina"></a>
        <a class="jiathis_button_weixin"></a>
      </div>
      <a class="bds_qzone J-share" @click="shareQQzone" target="_blank"></a>
  </div>
</template>
<script>
 import SocialSharing  from 'vue-social-sharing'
  export default {
    props: ['option'],
    data () {
      return {
        title: '', // 分享标题
        desc: '', // 分享描述
        pics: '', // 分享图片链接
      }
    },
    components: {},
    mounted () {
      let that = this;
      //以下为js加载部分
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = 'http://v3.jiathis.com/code/jia.js';
      document.body.appendChild(s);
      var jiathis_config={
        summary:that.desc, //分享的文本摘要
        url:window.location.href,     //自定义分享路径
        title:that.title,      //自定义网页标题
        pic:that.pics
      }
    },
    methods: {
      //QQ空间分享方法:这样写可以对分享事件进行绑定
      shareQQzone (){
        let that = this;
        (function(){
          var p = {
            url: window.location.href, /*获取URL，可加上来自分享到QQ标识，方便统计*/
            desc: that.desc, /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
            title: that.title, /*分享标题(可选)*/
            summary: that.desc, /*分享摘要(可选)*/
            pics: that.pics, /*分享图片(可选)*/
            flash: '', /*视频地址(可选)*/
            site:'', /*分享来源(可选) 如：QQ分享*/
            style:'201',
            width:32,
            height:32
          };
          var s = [];
          for(var i in p){
            s.push(i + '=' + encodeURIComponent(p[i]||''));
          }
          window.location.target = '_blank';
          window.location.href = 'http://connect.qq.com/widget/shareqq/index.html?' + s.join('&');
        })();
      }
    },
    watch: {
      title (cur, old) {
      },
      desc (cur, old) {
      },
      pics (cur, old) {
      },
    }
  }
</script>
<style lang="less">
  .bdshare-button-style0-16 a{
    width:20px !important;
    height:20px !important;
    line-height:20px;
    padding:0 0 0 -20px;
    margin: 0;
    background-image:none;
  }
  .jiathis_style_32x32 .jiathis_button_tsina .jtico{height:20px !important;width:20px !important;padding-left:12px !important;}
  .jiathis_style_32x32 .jiathis_button_weixin .jtico{height:20px !important;width:20px !important;padding-left:12px !important;}
  .jiathis_style_32x32{float: left;}
  .jtico_tsina{background: url('../../assets/image/sina.png') no-repeat !important;background-position:0 0 !important;background-size:contain !important;}
  .jtico_weixin{background: url('../../assets/image/wechat.png') no-repeat !important;background-position:0 0 !important;background-size:contain !important;}
  .bds_qzone{float: left;width:20px;height:20px;display:block;background-image:url('../../assets/image/common/qq.png');background-position:0 0;background-size:contain;}
  .bdshare-button-style0-16 a, .bdshare-button-style0-16 .bds_more{padding-left:10px;}
  .bdshare-button-style0-16 a:nth-of-type(1){background-image:url('../../assets/image/common/sina.png');background-position:0 0;background-size:contain;}
  .bdshare-button-style0-16 a:nth-of-type(2){background-image:url('../../assets/image/common/wechat.png');background-position:0 0;background-size:contain;}
  .bdshare-button-style0-16 a:nth-of-type(3){background-image:url('../../assets/image/common/qq.png');background-position:0 0;background-size:contain;}
</style>