<template>
  <div id="register" class="register" v-set-title="title">
      <div class="center">
          <div class="left">
              <!-- <p class="title">注册</p> -->
              <img class="png" src="../../assets/image/logo.png" alt="">
              <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="" prop="phone">
                    <el-input type="phone" v-model="ruleForm2.phone" auto-complete="off" placeholder="手机号"></el-input>
                </el-form-item>
                <!--滑动验证-->
                <div id="captcha-box"></div>
                <!-- 短信验证 -->
                <div class="item">
                    <el-form-item label="" prop="smsCode">
                        <el-input type="smsCode" class="form-ipt validatePhone" v-model="ruleForm2.smsCode" auto-complete="off" placeholder="短信验证码" @keyup.enter="submitForm('ruleForm2')"></el-input>
                    </el-form-item>
                    <span class="validateFromPhone font1" v-if="isFlag" @click="getFromPhone"><i class="mid-line">获取验证码</i></span>
                    <span class="validateFromPhone validateWaiting" v-else><i class="mid-line"></i>(<span id="countDown">90</span>s)重新获取</span>
                </div>
                <el-form-item label="" prop="password">
                    <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="" prop="password1">
                    <el-input type="password" v-model="ruleForm2.password1" auto-complete="off" placeholder="请确认密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="nextStep('ruleForm2')">注册并登录</el-button>
                </el-form-item>
                <el-form-item class="zidong" prop="checked">
                    <el-checkbox-group v-model="ruleForm2.checked">
                        <el-checkbox name="checked" label="1">我已注册并同意</el-checkbox>
                    </el-checkbox-group>
                    <router-link class="argumentItem" to="">《运联通服务协议》</router-link>
                </el-form-item>
              </el-form>
          </div>
          </div>
      </div>
  </div>
</template>

<script>
import {commonService} from '../../service/commonService'
import {validate} from '../../assets/js/common/validate'
// import {common} from '../../assets/js/common/common'
import {loginCommon} from '../../assets/js/common/loginCommon'
import {loginService} from '../../service/loginService'
// import {indexService} from '../../service/indexService'
    export default {
      components: {},
      data(){
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
        let validatePhone = (rule, value, callback) => {
            var mobile=/^(1+\d{10})$/
            if (!value) {
                return callback(new Error('请填写手机号'));
            } else if (!mobile.test(value)){
                return callback(new Error('请输入正确的手机号'));
            }else{
                callback();
            }
        };
        let validatePass = (rule, value, callback) => {
            var pass=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/
           if (value === '') {
                callback(new Error('请输入密码'));
            } else if(!pass.test(value)) {
                callback(new Error('数字和字母组合不少于6位'));
            }else {
                callback();
            }
        };
        let validatePass1 = (rule, value, callback) => {
            var pass=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/
           if (value === '') {
                callback(new Error('请输入密码'));
            } else if(!pass.test(value)) {
                callback(new Error('数字和字母组合不少于6位'));
            } else if(this.ruleForm2.password != this.ruleForm2.password1) {
                callback(new Error('密码不一致'));
            }else {
                callback();
            }
        };
        return{
            english:null,
            optioncitys:[],
            options: null,
            title:'注册页面',
            checked: true, //用户协议是否选中
            name:'',
            job:'',
            newjob: '',
            unitType:'',
            count: 0,
            challenge1:"",
            validate1:"",
            seccode1:"",
            phoneNo: '', // 手机号
            isFlag: 1, // 是否可以点击
            kaptchaValue: '',// 用户端输入验证码
            kaptchaKey: '', // 服务器端验证码
            baseCode: '',//验证码图片
            platform: 'WXH5',
            geetesst: false,
            ruleForm2: {
                phone:'',
                smsCode:"",
                password: '',
                type:1,
                password1:"",
                checked:['1'],
                platform:"",
            },
            rules2: {
                checked: [
                    { type: 'array', required: true, message: '请同意服务协议', trigger: 'change' }
                ],
                smsCode: [
                    { validator: validatePassa, trigger: 'blur' },
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                password1:[
                    { validator: validatePass1, trigger: 'blur' }
                ],
                phone: [
                    { validator: validatePhone, trigger: 'blur' }
                ]
            },
            num:'',
            
        }
      },
        props: [],
        updated: function () {
           
        },
        mounted (){
            this.getPlatform() //初始化Platform
            this.getgaptchas() //初始化滑块
            document.body.scrollTop = 0;
        },
        watch:{
        },
        methods: {
            changeCheck:function(){
                const that = this
                if(!that.ruleForm1.checked.length){
                    document.getElementsByClassName('el-button')[0].style.background = "#666"
                } else{
                    document.getElementsByClassName('el-button')[0].style.background = "#B9002D"
                }
            },
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
                            that.geetesst = true;
                        })
                    })
                })
            },
            getPlatform:function(){
                const that = this
                that.ruleForm2.platform = loginCommon.getPlatForm();
                that.$store.state.loginStore.platform = that.ruleForm2.platform;
            },
            getFromPhone () {
                let that = this;
                let obj = document.getElementById('kap');
                //点击获取短信验证码，1.验证手机号是否为空；2.手机号格式是否正确；3验证滑块；
                if(that.ruleForm2.phone.trim('').length == 0){
                    that.$notify({
                        title: '请填写手机号',
                        type: 'warning'
                    });
                    return
                } else if(!validate.isPhoneNumber(that.ruleForm2.phone)){
                    that.$notify({
                        title: '手机号格式不正确',
                        type: 'warning'
                    })
                    return
                } else if (that.geetesst == false){
                    that.$notify({
                        title: '请重新拖动滑块',
                        type: 'warning'
                    })
                    return
                } else {
                    let seccode2 = that.seccode1.split('|')
                    seccode2 = seccode2.join(',')
                    loginService.getValidateMess({phone: that.ruleForm2.phone, type: 1,challenge:that.challenge1,validate:that.validate1,seccode:seccode2}).then(function (res) {
                        if(res.data.success){  // 返回正确
                            that.isFlag = 0; //显示倒计时
                            if(that.isFlag) {
                                clearInterval(that.$store.state.loginStore.timer);
                            } else {
                            that.$store.state.loginStore.timer = setInterval(function () {
                            that.count = parseInt(document.getElementById('countDown').innerHTML) - 1;
                            if(that.count > 0) {
                                document.getElementById('countDown').innerHTML = that.count;
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
            nextStep(formName) {
                const that = this;
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    that.$store.state.loginStore.phone = that.ruleForm2.phone; //手机号
                    that.$store.state.loginStore.password = that.ruleForm2.password; // 密码
                    loginService.register(that.ruleForm2).then(function (res) {
                        if(res.data.success){
                            that.$notify({
                                title: '注册成功',
                                type: 'success'
                            })
                            that.$store.state.loginStore.redisKey = res.data.datas
                            that.ruleForm1.redisKey = that.$store.state.loginStore.redisKey
                            clearInterval(that.$store.state.loginStore.timer)
                            that.count = 0
                            document.getElementsByClassName('geetest_holder')[0].style.display = "none"
                            that.step = 2
                            that.$store.state.loginStore.registerStep = that.step
                        }else{
                            that.$notify({
                                title: res.data.message,
                                type: 'warning'
                            })
                        }
                    })
                } else {
                    return false;
                }
                });
                
            }
        }
        
    }
</script>

<style lang="less">
// @import "../../assets/css/login/login.less";

.el-select-dropdown{
    width: 100% !important;
    left:0 !important;
}
.el-select-dropdown__item{
    white-space:initial !important;
    height: auto !important;
}
    .el-checkbox{
        white-space: inherit !important;
        height: auto !important;
        text-align: left !important;
    }
    .el-checkbox.is-bordered{
        max-width: 96% !important;
        padding: 9px 10px 9px 10px !important;
    }
    .register2{
        height: fit-content !important;
    }
    .guowai{
        margin-bottom: 0px !important;
    }
    #register{
        width: 100%;
        height:auto;
        background-image: url('../../assets/image/loginback.png');
        background-size: cover;
        background-position: center;
        #countDown{
            color: #6699FF;
        }
        .argumentItem{
            float: left;
            height: 20px;
            color: #6699FF;
            line-height: 20px;
            margin-top: 5px;
        }
        .center2{
            padding: 0 0 50px 0 !important;
            background: #eee !important;
            height:auto !important;
            position: inherit !important;
            margin:0 auto;
            top:0 !important;
            left:0 !important;
            transform:none !important;
            .el-form-item:nth-child(1){
                margin-bottom:22px !important;
            }
        }
        .center{
           width: 100%;
            height: auto;
            // background: #FFFFFF;
            overflow: hidden;
            .step1{
                
            }
            .el-checkbox.is-bordered{
                height: 35px;
                float: left;
                margin-left: 0px !important;
                margin: 8px 0;
            }
            .el-checkbox__input{
                display: none;
            }
            .el-checkbox-group{
                float: left;
                margin-top: 5px;
            }
            .zidong .el-checkbox__input{
                display: inline-block !important;
            }
            .el-form-item.is-required .el-form-item__label:before{
                content:''
            }
            .el-form-item__label{
                text-align: left;
                font-size: 13px;
                color: #666666;
                height: 25px;
                line-height: 25px;
                width:100% !important;
            }
            .el-radio.is-bordered{
                float:left;
                margin-left: 0;
                margin: 5px 0;
            }
            .el-radio.is-bordered{
                height:35px;
            }
            .el-cascader{
                width: 100%;
            }
            .el-radio-group{
                display: block;
                margin: 8px 10px;
                float: left;
            }
            .geetest_holder.geetest_wind .geetest_radar_btn, .geetest_holder.geetest_wind .geetest_success_btn{
                border: 1px solid #eee;
            }
            .el-form-item:nth-child(6){
                margin-bottom: 20px !important;
            }
            .left{
                height: 100%;
                width: 300px;
                margin: 50px auto;
                padding: 0px 50px;
                text-align: center;
                // background: #FFFFFF;
                border: 1px solid #EEEEEE;
                box-shadow: 0 2px 20px 0 rgba(203,203,203,0.4);
                border-radius: 10px;
                margin-top: 100px;
                .png{
                    margin-top: 60px;
                    margin-bottom: 50px;
                }
                .geetest_holder.geetest_wind{
                    margin-bottom: 20px;
                }
                .item{
                    width: 100%;
                    height: 42px;
                    border: 1px solid #EEEEEE;
                    background: #f9f9f9;
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
                        cursor: pointer;
                        padding-left: 20px;
                        float: right;
                        font-size: 14px;
                        color: #6699FF;
                        display: inline-block;
                        height: 100%;
                        line-height: 40px;
                        padding-right:10px;
                    }
                }
                .title{
                    margin-top: 40px;
                    margin-bottom: 30px;
                    text-align: center;
                    font-size: 18px;
                    color: #333333;
                }
                .el-form-item__content{
                    margin-left: 0px !important;
                }
                .el-input__inner{
                    border-radius: 0px;
                    color: #999999;
                    height: 42px;
                    background: #F9F9F9;
                    border: 1px solid #EEEEEE;
                }
                .el-button{
                    width: 100%;
                    border-radius: 0px;
                    background: #20A0FF;
                    font-size: 16px;
                    color: #FFFFFF;
                    border: none;
                    span{
                        color:#FFFFFF;
                    }
                }
                .zidong{
                    font-size: 12px;
                    color: #666666;
                    width: 100%;
                    height: 20px;
                    line-height: 20px;
                    margin-top: -15px;
                    margin-bottom: 37px;
                    .forline{
                        float: right;
                        font-size: 13px;
                        color: #999;
                        a{
                            font-size: 13px;
                            color: #999;
                        }
                    }
                }
                .forline1{
                    float: left;
                    font-size: 12px;
                    color: #999999;
                    margin-top: 10px;
                    a{
                        font-size: 12px;
                        color: #6699FF;
                        letter-spacing: 0;
                        line-height: 17px;
                    }
                }
               
            }
             
        }
        .moreSolve{
                width: 100%;
                height: fit-content;
                margin-top: 110px;
                position: relative;
                .line{
                    height: 2px;
                    width: 100%;
                    background: #eee;
                }
                p{
                    text-align: center;
                    width:100%;
                    font-size: 13px;
                    color: #999999;
                    letter-spacing: 0;
                    margin-bottom: 20px;
                }
                .line-text{
                    text-align: center;
                    position: absolute;
                    width: 100px !important;
                    background: #fff;
                    top: -9px;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .solves{
                    width: 40px;
                    height: 40px;
                    background-repeat: no-repeat;
                    background-size: cover;
                    display: inline-block;
                    cursor: pointer;
                    margin-top: 40px;
                    margin-bottom: 20px;
                }
                .solves2{
                    // background-image: url(../../assets/image/common/pass.png);
                }
                .solvesw{
                    margin-right: 50px;
                    // background-image: url(../../assets/image/common/weixin.png);
                }
                .solvesw:hover{
                    margin-right: 50px;
                    // background-image: url(../../assets/image/common/weixin1.png);
                }
                .solvesp{
                    // background-image: url(../../assets/image/common/phone.png);
                }
                .solvesp:hover{
                    // background-image: url(../../assets/image/common/phone1.png);
                }
            }
    }
</style>