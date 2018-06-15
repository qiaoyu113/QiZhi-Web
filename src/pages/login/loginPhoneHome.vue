<template>
  <div id="login1" class="login" v-set-title="title">
      <div class="center">
          <div class="left">
              <z-logo></z-logo>
              <!--<img src="../../assets/image/common/logo.png" alt="" class="logoa">-->
              <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="" prop="phone">
                    <el-input type="phone" v-model="ruleForm2.phone" auto-complete="off" placeholder="手机号"></el-input>
                </el-form-item>
                <!--滑动验证-->
                <div id="captcha-box"></div>
                <!-- 短信验证 -->
                <div class="item">
                    <el-form-item label="" prop="smsCode">
                        <el-input type="smsCode" class="form-ipt validatePhone" v-model="ruleForm2.smsCode" auto-complete="off" placeholder="4位短信验证码"></el-input>
                    </el-form-item>
                    <!--<input type="number" class="form-ipt validatePhone" placeholder="4位短信验证码" v-model="ruleForm2.smsCode">-->
                    <span class="validateFromPhone font1" v-if="isFlag" @click="getFromPhone" style="cursor:pointer;"><i class="mid-line"></i>获取验证码</span>
                    <span class="validateFromPhone validateWaiting" v-else><i class="mid-line"></i>(<span id="countDown">90</span>s)重新获取</span>
                </div>
                <el-form-item>
                    <el-button @click="submitForm('ruleForm2')">快捷登录</el-button>
                </el-form-item>
              </el-form>
              <div class="zidong">
                  <el-checkbox v-model="checked">下次自动登录</el-checkbox>
                  <div class="forline"><router-link :to="{name:'find'}">忘记密码</router-link>&nbsp;&nbsp;|&nbsp;&nbsp;<router-link :to="{name:'register'}">注册</router-link></div>
            </div>
            <div class="moreSolve">
                <router-link :to="{name:'qrcode'}" class="solves solvesw">
                    <i class="iconfont icon-weixin"></i>
                    <p style="margin-top:7px;">微信登录</p>
                </router-link>
                <router-link :to="{name:'qrcode'}" class="solves solvesw">
                    <i class="iconfont icon-qq"></i>
                    <p style="margin-top:7px;">QQ登录</p>
                </router-link>
                <router-link :to="{name:'qrcode'}" class="solves solvesw">
                    <i class="iconfont icon-sina"></i>
                    <p style="margin-top:6px;">微博登录</p>
                </router-link>
                <router-link :to="{name:'login'}" class="solves solvesw" >
                    <i class="iconfont icon-mima"></i>
                    <p style="margin-top:11px;">密码登录</p>
                </router-link>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import {commonService} from '../../service/commonService'
import {validate} from '../../assets/js/validate'
import {loginCommon} from '../../assets/js/common/loginCommon'
import {loginService} from '../../service/loginService'
    export default {
      components: {},
      data(){
        let validatePhone = (rule, value, callback) => {
            var mobile=/^(1+\d{10})$/
            if (!value) {
                return callback(new Error('手机号不能为空'));
            } else if (!mobile.test(value)){
                return callback(new Error('请输入正确的手机号'));
            }else{
                callback();
            }
        };
        let validatePassa = (rule, value, callback) => {
            var pass=/^[0-9]{4}$/
           if (value === '') {
                callback(new Error('请填写验证码'))
            } else if(!pass.test(value)) {
                callback(new Error('验证码不正确'))
            }else {
                callback();
            }
        };
        return{
            title:'手机号登录',
            challenge1:"",
            validate1:"",
            seccode1:"",
            phoneNo: '', // 手机号
            isFlag: 1, // 是否可以点击
            kaptchaValue: '',// 用户端输入验证码
            kaptchaKey: '', // 服务器端验证码
            baseCode: '',//验证码图片
            platform: 'WXH5',
            checked:true,
            ruleForm2: {
                geetesst: false,
                phone:'',
                platform:'',
                smsCode:"",
            },
            rules2: {
                smsCode: [
                    { validator: validatePassa, trigger: 'blur' }
                ],
                phone: [
                    { validator: validatePhone, trigger: 'blur' }
                ]
            }
        }
      },
        props: [],
        updated() {
        },
        mounted (){
            this.getPlatform() //初始化Platform
            this.getgaptchas() //初始化滑块
            document.body.scrollTop = 0;
        },
        methods: {
            getgaptchas:function(){
                const captchaBox = document.getElementById('captcha-box');
                const that = this
                loginService.getGaptchas().then(function(res){
                    initGeetest({
                        // 以下配置参数来自服务端 SDK
                        gt:res.data.gt,
                        challenge: res.data.challenge,
                        product: "float", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
                        offline: res.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
                        width: '100%',
                    }, function (captchaObj) {
                        // 这里可以调用验证实例 captchaObj 的实例方法
                        captchaObj.appendTo(captchaBox);
                        captchaObj.onSuccess(function () {
                            let result = captchaObj.getValidate();
                            that.challenge1 = result.geetest_challenge
                            that.validate1 = result.geetest_validate
                            that.seccode1 = result.geetest_seccode
                            that.ruleForm2.geetesst = true;
                        })
                    })
                })
            },
            getPlatform:function(){
                const that = this
                that.ruleForm2.platform = loginCommon.getPlatForm();
            },
            getFromPhone () {
                let that = this;
                let obj = document.getElementById('kap');
                //点击获取短信验证码，1.验证手机号是否为空；2.手机号格式是否正确；3验证滑块；
                if(that.ruleForm2.phone.trim('').length == 0){
                    that.$notify({
                        title: '手机号不能为空',
                        type: 'warning'
                    });
                    return
                } else if(!validate.isPhoneNumber(that.ruleForm2.phone)){
                    that.$notify({
                        title: '请输入正确手机号',
                        type: 'warning'
                    })
                    return
                } else if (that.ruleForm2.geetesst == false){
                    that.$notify({
                        title: '请重新拖动滑块',
                        type: 'warning'
                    })
                    return
                } else {
                    let seccode2 = that.seccode1.split('|')
                    seccode2 = seccode2.join(',')
                    loginService.getValidateMess({phone: that.ruleForm2.phone, type: 3,challenge:that.challenge1,validate:that.validate1,seccode:seccode2}).then(function (res) {
                        if(res.data.success){  // 返回正确
                            // document.getElementById('yes').style.display = 'block';
                            let count = 0;
                            that.isFlag = 0; //显示倒计时
                            if(that.isFlag) {
                                clearInterval(that.$store.state.loginStore.timer);
                            } else {
                            that.$store.state.loginStore.timer = setInterval(function () {
                            count = parseInt(document.getElementById('countDown').innerHTML) - 1;
                            if(count > 0) {
                                document.getElementById('countDown').innerHTML = count;
                            }else{
                                clearInterval(that.$store.state.loginStore.timer);
                                that.isFlag = 1;
                                var removeObj = document.getElementsByClassName('geetest_holder')[0];
                                removeObj.parentNode.removeChild(removeObj);
                                that.getgaptchas()
                            }
                            },1000);
                            }
                        }else { //返回错误
                            let errorMessage = '';
                            errorMessage = res.data.message;
                            that.$notify({
                                title: errorMessage,
                                type: 'warning'
                            })
                            var removeObj = document.getElementsByClassName('geetest_holder')[0];
                            removeObj.parentNode.removeChild(removeObj);
                            that.getgaptchas()
                        }
                    });
                }
            },
            submitForm(formName) {
                const that = this;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        loginService.phoneLogin({phone:that.ruleForm2.phone,smsCode:that.ruleForm2.smsCode,type:3,platform:that.ruleForm2.platform}).then(function (res) {
                            if(res.data.success){
                                that.$notify({
                                    title: '登录成功',
                                    type: 'success'
                                })
                                localStorage.token = res.data.datas;
                                if(localStorage.redirectUrl == "undefined"){
                                    that.$router.replace({name: 'home'});
                                }else if (localStorage.redirectUrl && localStorage.redirectUrl!="undefined" && localStorage.redirectUrl.indexOf('login')==-1 && localStorage.redirectUrl.indexOf('set')==-1){
                                    let url = localStorage.redirectUrl
                                    localStorage.removeItem('redirectUrl')
                                    window.location.href = url;
                                }else{
                                    that.$router.replace({name: 'home'});
                                }
                            }else{
                                that.$notify({
                                    title: res.data.message,
                                    type: 'warning'
                                })
                            }
                        });
                    } else {
                        return false;
                    }
                });
                
            }
        }
        
    }
</script>

<style lang="less">
@import "../../assets/css/login.less";
    #login1{
         width: 100%;
        height:750px;
        background-image: url(../../assets/image/loginback.png);
        background-repeat: no-repeat;
        background-size:cover;
        background-position: center;
        position: relative;
        .iconfont {
            font-size:32px;
        }
        .icon-mima{
            font-size: 25px;
            margin-top: 4px;
            display: inline-block;
            color: #20A0FF;
        }
        .icon-weixin{
            color:#82D349;
        }
        .icon-qq{
            color: #20A0FF;
        }
        .icon-sina{
            color:#F3595C;
        }
        .center{
            width: 400px;
            height: 580px;
            position: absolute;
            top:50%;
            left: 50%;
            transform: translate(-50%,-50%);
             border: 1px solid #EEEEEE;
            // background: #FFFFFF;
            // box-shadow: 0 2px 40px 0 rgba(105,102,102,0.40);
            box-shadow: 0 2px 20px 0 rgba(203,203,203,0.4);
            border-radius: 10px;
            overflow: hidden;
            .left{
                width: 288px;
                height: 100%;
                padding: 0px 56px;
                float: left;
                text-align: center;
                .logo{
                    height: 41px;
                    width: auto;
                    margin-top: 60px;
                    margin-bottom: 50px;
                    // margin: 80px 140px 35px 140px;
                }
                .geetest_holder.geetest_wind{
                    height: 42px;
                }
                #captcha-box{
                    margin-bottom: 20px;
                }
                .geetest_holder.geetest_wind .geetest_radar_btn, .geetest_holder.geetest_wind .geetest_success_btn{
                    border: 1px solid #eee;
                }
                .geetest_radar_tip_content{
                    color: #999;
                }
                .item{
                    width: 100%;
                    height: 42px;
                    background: #F9F9F9;
                    border: 1px solid #EEEEEE;
                    margin-bottom: 20px;
                    .el-form-item{
                        width: 150px;
                        height: 100%;
                        display: inline;
                        float: left;
                    }
                    .el-form-item__content{
                        width: 150px;
                        display: inline-block;
                    }
                    .validatePhone {
                        height:100% !important;
                        margin-top:0px !important;
                        margin-left:0px !important;
                    }
                    .el-input__inner{
                        border:none !important;
                    }
                    .validateFromPhone{
                        font-size: 14px;
                        color: #20A0FF;
                        display: inline-block;
                        height: 100%;
                        line-height: 40px;
                    }
                }
                .form-ipt.validatePhone{
                    font-size: 14px;
                    color: #999999;
                    background: transparent;
                    height: 30px;
                    border: none;
                    margin-top: 5px;
                    outline: none;
                    margin-left: -20px;
                }
                .validateFromPhone.font1{
                    font-size: 14px;
                    color: #20A0FF;
                }
                input::-webkit-input-placeholder{
                    color: #999999 !important;
                }
                .logoa{
                    height: 48.5px;
                    width: auto;
                    margin-top: 40px;
                    margin-bottom: 35px;
                }
                .el-form-item__content{
                    margin-left: 0px !important;
                }
                .el-input__inner{
                    background: #F9F9F9;
                    border: 1px solid #EEEEEE;
                    border-radius: 0px;
                    color: #999999;
                    height: 42px;
                }
                .el-button{
                    width: 100%;
                    border-radius: 0px;
                    background: #20A0FF;
                    font-size: 14px;
                    color: #FFFFFF;
                    border: none
                }
                #countDown{
                    color: #6699FF;
                }
                .zidong{
                    font-size: 12px;
                    color: #666666;
                    width: 100%;
                    height: 20px;
                    line-height: 20px;
                    margin-top: -15px;
                    .el-checkbox{
                        float: left;
                        font-size: 12px;
                        color: #666666;
                    }
                    .el-checkbox__label{
                        font-size: 12px;
                        color: #666666;
                    }
                    .el-checkbox__input.is-checked{
                        float: left;
                        margin-top: 2px;
                    }
                    .forline{
                        float: right;
                        font-size: 12px;
                        color: #666666;
                        a{
                            font-size: 12px;
                            color: #666666;
                        }
                    }
                }
                .moreSolve{
                    width: 100%;
                    height: fit-content;
                    margin-top: 80px;
                    display: flex;
                    .solves{
                        width: 40px;
                        height: 40px;
                        background-repeat: no-repeat;
                        background-size:cover;
                        display: inline-block;
                        cursor: pointer;
                    }
                    .solves{
                        width: 40px;
                        height: 40px;
                        background-repeat: no-repeat;
                        background-size:cover;
                        display: inline-block;
                        cursor: pointer;
                        flex: 1;
                        p{
                            font-size: 9.9px;
                            color: #666666;
                            letter-spacing: 0;
                            line-height: 10.8px;
                        }
                    }
                }
            }
        }
    }
</style>