<template>
  <div class="item validateItem">
    <p class="kapIcon">
      <input type="text" class="form-ipt validateIpt" placeholder="验证码" v-model="kaptchaValue" @keyup="save"  @input="save" id="kap">
      <i class="iconfont icon-yes" id="yes"></i>
    </p>
    <div class="validateImg" @click="getImg"><img v-lazy="baseCode"></div>
    <p><i class="iconfont icon-shuaxin1 font1" @click="getImg"></i></p>
  </div>
</template>
<script type="text/ecmascript-6">
  import {commonService} from '../../service/commonService'
  import {appService} from '../../service/appService'

  export default {
    props: ['chaKey'],
    data () {
      return {
        /*msg: '',*/
        baseCode: '',
        kaptchaValue: '',// 用户端输入验证码
        kaptchaKey: '' // 服务器端验证码
      }
    },
    components: {},
    mounted () {
      let that = this
      that.getImg ();
    },
    methods: {
      valImg (event) {// 失去焦点验证验证码是否正确
        let that = this
        let obj = event.currentTarget;
        that.kaptchaKey = that.$store.state.loginStore.kaptchaKey
        commonService.postValidateImg({kaptchaKey:that.kaptchaKey,kaptchaValue:that.kaptchaValue}).then(function (res) {
         // 如一致，刷新按钮，变成对号按钮:如下代码
         if(res.data.success) {
           that.$store.state.loginStore.kaptchaValue = that.kaptchaValue // 用户端输入验证码
           //loginCommon.showFitIcon(obj, true);
         } else {// 判断是否一致，不一致
           let errorMessage = '';
           if(res.data.code >= 511101 && res.data.code <= 511110) {
               errorMessage = res.data.message;
               that.$emit('listenToChaKey', errorMessage);
               //loginCommon.showFitIcon(obj, false);
           }
          }
         });
      },
      getImg () { //获取验证码
        var that = this
        commonService.getValidateImg().then(function (res) {
          if(res.data.success){
            that.$store.state.loginStore.kaptchaKey = res.data.datas.kaptchaKey
            that.baseCode = res.data.datas.imageString
          }
        })
      },
      save () {
        let that = this;
        that.$store.state.loginStore.kaptchaValue = that.kaptchaValue ; //图片验证码
      }
    }
  }
</script>
<style></style>