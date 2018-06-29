<template>
  <div>
    <!-- <share :config="config"></share> -->
      <div class="jiathis_style_32x32">
        <a class="jiathis_button_tsina jtico_tsina" :href="'https://service.weibo.com/share/share.php?appkey=&title='+title+'&description='+desc+'&url='+url+'&searchPic=false&pic='+pics+'&style=simple'" target="_blank"></a>
        <a class="jiathis_button_weixin jtico_weixin weixinshare1" @click="toOpen()"></a>
      </div>
      <a class="bds_qzone J-share qqshare1" @click="shareQQzone" target="_blank"></a>
      <div class="dialog">
      <div class="content">
        <p class="title">分享到微信朋友圈 <i class="iconfont icon-guanbi" @click="toClose()"></i></p>
        <canvas class="qrCode" id="qrCode"></canvas>
        <!-- <div id="qrCode" class="qrCode"></div> -->
        <p class="subtitle">微信扫描进入，并分享到朋友圈</p>
      </div>
    </div>
  </div>
</template>
<script>
//  import Share from 'vue-social-sharing'
 import QRCode from 'qrcode'
  // const QRCode = (resolve) => {require(['../../assets/js/qrcodejs2/qrcode.js'],resolve)} 
  // require('../../assets/js/qrcodejs2/qrcode')
  export default {
    props: ['option'],
    data () {
      return {
        config:{},
        title: '', // 分享标题
        desc: '', // 分享描述
        pics: '', // 分享图片链接
        url:''
      }
    },
    components: {},
    mounted () {
      let that = this;
      //以下为js加载部分
      this.url = window.location.href,
      this.config={
        url                 : window.location.href, // 网址，默认使用 window.location.href
        title               : that.title, // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        description         : that.desc, // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        image               : that.pics, // 图片, 默认取网页中第一个img标签
        sites               : ['qq', 'weibo','wechat'], // 启用的站点
        disabled            : ['google', 'facebook', 'twitter'], // 禁用的站点
        wechatQrcodeTitle   : '微信扫一扫：分享', // 微信二维码提示文字
        wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
      }
      // const s = document.createElement('script');
      // s.type = 'text/javascript';
      // s.src = 'https://v3.jiathis.com/code/jia.js';
      // document.body.appendChild(s);
      // var jiathis_config={
      //   summary:that.desc, //分享的文本摘要
      //   url:window.location.href,     //自定义分享路径
      //   title:that.title,      //自定义网页标题
      //   pic:that.pics
      // }
    },
    methods: {
      toOpen(){
        let qrCode = document.getElementById('qrCode');
        let aliUrl = this.url
        // let aliUrl = 'http://'+location.host+'/alipay?orderNo='+that.orderNo+'&channelId='+that.channelId
        QRCode.toCanvas(qrCode, aliUrl, (error) => {
            if (error) {
            } else {
            }
        })
        // let qrcode = new QRCode(document.getElementById('qrCode'), {
        //   width: 200,
        //   height: 200,
        //   colorDark: '#000000',
        //   colorLight: '#ffffff'
        // })
        // let text = this.url
        // // console.log('url', text)
        // qrcode.makeCode(text)
        document.getElementsByClassName('dialog')[0].style.display = 'block'
        // $('.dialog').show(300)
      },
      toClose () {
        document.getElementsByClassName('dialog')[0].style.display = 'none'
        document.getElementById('qrCode').innerHTML = ''
        // $('#qrCode').empty()
      },
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
          window.location.href = 'https://connect.qq.com/widget/shareqq/index.html?' + s.join('&');
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
  .qqshare1{left:127px !important;}
  .jiathis_style_32x32 .jiathis_button_tsina{display:inline-block;height:25px !important;width:25px !important;padding-left:12px !important;}
  .jiathis_style_32x32 .jiathis_button_weixin{display:inline-block;height:25px !important;width:25px !important;padding-left:12px !important;}
  .jiathis_style_32x32{float: left;}
  .jtico_tsina{background: url('../../assets/image/sina.png') no-repeat !important;background-position:0 0 !important;background-size:contain !important;}
  .jtico_weixin{background: url('../../assets/image/wechat.png') no-repeat !important;background-position:0 0 !important;background-size:contain !important;}
  .bds_qzone{float: left;width:20px;height:20px;display:block;background-image:url('../../assets/image/qq.png');background-position:0 0;background-size:contain;}
  .bdshare-button-style0-16 a, .bdshare-button-style0-16 .bds_more{padding-left:10px;}
  .bdshare-button-style0-16 a:nth-of-type(1){background-image:url('../../assets/image/sina.png');background-position:0 0;background-size:contain;}
  .bdshare-button-style0-16 a:nth-of-type(2){background-image:url('../../assets/image/wechat.png');background-position:0 0;background-size:contain;}
  .bdshare-button-style0-16 a:nth-of-type(3){background-image:url('../../assets/image/qq.png');background-position:0 0;background-size:contain;}
  /* 弹出层 */
  .dialog{position:fixed;top:0;right:0;bottom:0;left:0;z-index:150;background:rgba(0,0,0,.5);display:none;}
  .dialog .content{width:260px;height:320px;position:absolute;top:50%;left:50%;margin:-160px 0 0 -130px;background:#fff;}
  .dialog .content .title{font-size: 16px;
    text-indent: 10px;
    color: #333;
    margin-left: 13px;
    margin-top: 10px;}
    // .activity-message-bottom-left .p1 a:nth-child(2){left:121px;}
  .dialog .content .title i{margin:-2px 10px 0 0;color:#333;font-size:16px !important;vertical-align:top;float:right;cursor:pointer;}
  .dialog .content .qrCode{width:200px ;height:200px;margin:20px auto;    margin-top: 30px;
    margin-left: 43px;}
  .dialog .content .qrCode img{width:200px !important;height:200px !important;}
  .dialog .content .subtitle{font-size:12px;color:#999;text-align:center;}
  .icon-guanbi{color:#333 !important;}
</style>