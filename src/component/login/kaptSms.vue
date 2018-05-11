<template>
  <div>
    <!-- <div class="item validateItem">
      <p class="kapIcon">
        <input type="text" class="form-ipt validateIpt" placeholder="验证码" v-model="kaptchaValue" @keyup="save"  @input="save" id="kap">
        <i class="iconfont icon-yes" id="yes"></i>
      </p>
      <div class="validateImg" @click="getImg"><img v-lazy="baseCode"></div>
      <p><i class="iconfont icon-shuaxin1 font1" @click="getImg"></i></p>
    </div> -->
    <div class="item">
      <input type="number" class="form-ipt validatePhone" placeholder="4位短信验证码" v-model="mess"  @keyup="save"  @input="save">
      <span class="validateFromPhone font1" v-if="isFlag" @click="getFromPhone"><i class="mid-line"></i>获取验证码</span>
      <span class="validateFromPhone validateWaiting" v-else><i class="mid-line"></i>(<span id="countDown">90</span>s)重新获取</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {commonService} from '../../service/commonService'
  import {appService} from '../../service/appService'
  import {validate} from '../../assets/js/validate'

  export default {
    props: [],
    data () {
      return {
        mess: '', // 用户输入的短信验证码
        phoneNo: '', // 手机号
        isFlag: 1, // 是否可以点击
        kaptchaValue: '',// 用户端输入验证码
        kaptchaKey: '', // 服务器端验证码
        baseCode: ''//验证码图片
      }
    },
    components: {},
    mounted () {
      let that = this
      that.getImg ();
    },
    beforeDestroy () {
      let that = this;
      if(that.$store.state.loginStore.timer!=0){
        clearInterval(that.$store.state.loginStore.timer);
      }
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
            loginCommon.showFitIcon(obj, true);
          } else {// 判断是否一致，不一致
            let errorMessage = '';
            if(res.data.code >= 511101 && res.data.code <= 511110) {
              errorMessage = res.data.message;
              that.$emit('listenToChaKey', errorMessage);
              appService.showFitIcon(obj, false);
            }
          }
        });
      },
      getImg () { //获取验证码
        var that = this
        commonService.getValidateImg().then(function (res) {
          if(res.data.success){
            that.kaptchaKey = res.data.datas.kaptchaKey
            that.baseCode = res.data.datas.imageString
          }
          else{

          }
        })
      },
      getFromPhone () {
        let that = this;
        let obj = document.getElementById('kap');
        //点击获取短信验证码，1.验证手机号是否为空；2.手机号格式是否正确；3.图片验证码是否为空；4图片验证码是否正确；
        that.phoneNo= that.$store.state.loginStore.phoneNo;
        that.$store.state.loginStore.kaptchaValue = that.kaptchaValue ; //图片验证码
        //1.验证手机号是否为空
        if(that.phoneNo.trim('').length > 0){
          //2.手机号格式是否正确
          if(!validate.isPhoneNumber(that.phoneNo)){
            that.$emit('listenToSmsCode', '请输入正确的手机号');
          }
          else {
            // 发送请求 type: 1.注册；2.手机（动态验证码）登陆并注册；3.手机充值密码
            if(that.kaptchaKey!= '' && that.kaptchaValue != ''){//3.图片验证码是否为空
//              that.valImg(event);
              //4.向服务器端发送图片验证码是否正确
              commonService.getValidateMess({phone: that.phoneNo, type: that.$store.state.loginStore.smsType, kaptchaKey:that.kaptchaKey,kaptchaValue:that.kaptchaValue}).then(function (res) {
                //console.log('mess', res);
                if(res.data.success){  // 返回正确
                  //loginCommon.showFitIcon(obj, true);
                  document.getElementById('yes').style.display = 'block';
                  let count = 0;
                  that.isFlag = 0; //显示倒计时
                  if(that.isFlag) {
                    clearInterval(that.$store.state.loginStore.timer);
                  }
                  else {
                    that.$store.state.loginStore.timer = setInterval(function () {
                      count = parseInt(document.getElementById('countDown').innerHTML) - 1;
                      if(count > 0) {
                        document.getElementById('countDown').innerHTML = count;
                      }
                      else{
                        clearInterval(that.$store.state.loginStore.timer);
                        that.isFlag = 1;
                      }
                    },1000);
                  }
                }
                else { //返回错误
                  let errorMessage = '';
                  //if(res.data.code >= 510100 && res.data.code <= 510400){
                    errorMessage = res.data.message;
                    that.$emit('listenToSmsCode', errorMessage);
                    //if(res.data.code === 511104){//验证码不正确请重新输入
                      that.kaptchaValue = '';
                      //loginCommon.showFitIcon(obj, false);
                  document.getElementById('yes').style.display = 'none';
                      that.getImg();
                    //}

                  //}
                }
              });
            }else {
              that.$emit('listenToSmsCode', '请输入图片验证码');
            }
          }
        }
        else
        {
          that.$emit('listenToSmsCode', '请输入手机号');
        }
      },
      /*validateFromPhone () {
        let that = this
        that.$store.state.loginStore.messValidate = that.mess
      },*/
      save () {
        let that = this;
        that.$store.state.loginStore.kaptchaValue = that.kaptchaValue ; //图片验证码
        if(that.kaptchaValue.trim().length <= 0){
          document.getElementById('yes').style.display = 'none';
        }
        that.$store.state.loginStore.messValidate = that.mess; // 短信验证码
      }

    }
  }
</script>
<style></style>