<template>
  <div id="findPass" class="findPass" v-set-title="title">
      <div class="center">
          <div class="left" v-if="step==1">
              <p class="title">找回密码</p>
              <div class="progress">
                  <div class="leftline redback"></div>
                  <div class="prodiv redback">
                      <span class="redback num">1</span>
                      <span class="text redfont">填写账号</span>
                  </div>
                  <div class="prodiv">
                      <span class="num">2</span>
                      <span class="text">验证身份</span>
                  </div>
                  <div class="prodiv">
                      <span class="num">3</span>
                      <span class="text">设置新密码</span>
                  </div>
                  <div class="prodiv">
                      <span class="num">4</span>
                      <span class="text">完成</span>
                  </div>
                  <div class="leftline"></div>
              </div>
              <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
                <el-form-item label="" prop="phone">
                    <el-input type="phone" v-model="ruleForm1.phone" auto-complete="off" placeholder="输入绑定的手机号"></el-input>
                </el-form-item>
                <!--滑动验证-->
                <div id="captcha-box"></div>
                <!-- 短信验证 -->
                <el-form-item>
                    <el-button @click="nextStepa('')">下一步</el-button>
                </el-form-item>
              </el-form>
          </div>
          <div class="left" v-if="step==2">
            <p class="title">找回密码</p>
            <div class="progress">
                <div class="leftline redback"></div>
                <div class="prodiv redback">
                    <span class="redback num">1</span>
                    <span class="text redfont">填写账号</span>
                </div>
                <div class="prodiv redback">
                    <span class="num redback">2</span>
                    <span class="text redfont">验证身份</span>
                </div>
                <div class="prodiv">
                    <span class="num">3</span>
                    <span class="text">设置新密码</span>
                </div>
                <div class="prodiv">
                    <span class="num">4</span>
                    <span class="text">完成</span>
                </div>
                <div class="leftline"></div>
            </div>
            <p class="phonenum">手机号：&nbsp;<span>{{ruleForm1.phone}}</span></p>
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="" prop="smsCode">
                    <el-input type="smsCode" v-model="ruleForm2.smsCode" auto-complete="off" placeholder="验证码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="nextStepb('')">下一步</el-button>
                </el-form-item>
                <!-- <p class="tishi">校验码已发出，请注意查收短信，如果没有收到，你可以在<span class="redfont">106</span>秒后要求系统<span class="redfont" style="cursor:pointer;">&nbsp;重新发送</span></p> -->
            </el-form>
          </div>
          <div class="left" v-if="step==3">
              <p class="title">找回密码</p>
              <div class="progress">
                <div class="leftline redback"></div>
                <div class="prodiv redback">
                    <span class="redback num">1</span>
                    <span class="text redfont">填写账号</span>
                </div>
                <div class="prodiv redback">
                    <span class="num redback">2</span>
                    <span class="text redfont">验证身份</span>
                </div>
                <div class="prodiv redback">
                    <span class="num redback">3</span>
                    <span class="text redfont">设置新密码</span>
                </div>
                <div class="prodiv">
                    <span class="num">4</span>
                    <span class="text">完成</span>
                </div>
                <div class="leftline"></div>
            </div>
              <el-form :model="ruleForm3" status-icon :rules="rules3" ref="ruleForm3" label-width="100px" class="demo-ruleForm">
                <el-form-item label="" prop="password">
                    <el-input type="password" v-model="ruleForm3.password" auto-complete="off" placeholder="新密码登录"></el-input>
                </el-form-item>
                <el-form-item label="" prop="newPassword">
                    <el-input type="newPassword" v-model="ruleForm3.newPassword" auto-complete="off" placeholder="确认新密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="nextStepc('')">提交新密码</el-button>
                </el-form-item>
              </el-form>
          </div>
          <div class="left" v-if="step==4">
              <p class="title">找回密码</p>
              <div class="progress">
                <div class="leftline redback"></div>
                <div class="prodiv redback">
                    <span class="redback num">1</span>
                    <span class="text redfont">填写账号</span>
                </div>
                <div class="prodiv redback">
                    <span class="num redback">2</span>
                    <span class="text redfont">验证身份</span>
                </div>
                <div class="prodiv redback">
                    <span class="num redback">3</span>
                    <span class="text redfont">设置新密码</span>
                </div>
                <div class="prodiv redback">
                    <span class="num redback">4</span>
                    <span class="text redfont">完成</span>
                </div>
                <div class="leftline redback"></div>
            </div>
              <i class="iconfont icon-icon_right"></i>
              <p class="cona">恭喜你，成功找回密码</p>
              <p class="cona"><span class="redfont">3</span> 秒后返回&nbsp;<span class="redfont">登录页</span></p>
          </div>
      </div>
  </div>
</template>

<script>
import {commonService} from '../../service/commonService'
import {validate} from '../../assets/js/validate'
import {appService} from '../../service/appService'
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
        let validatePass = (rule, value, callback) => {
            var pass=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/
           if (value === '') {
                callback(new Error('请输入新密码'));
            } else if(!pass.test(value)) {
                callback(new Error('数字和密码组合,且不少于6位'));
            }else {
                callback();
            }
        };
        let validatenewPass = (rule, value, callback) =>{
            var pass=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/
            if (value === '') {
                callback(new Error('请输入新密码'));
            } else if(!pass.test(value)) {
                callback(new Error('数字和密码组合,且不少于6位'));
            }else if(value != this.ruleForm3.password) {
                callback(new Error('密码不一致，请重新输入'));
            }{
                callback();
            }
        }
        return{
            title:'找回密码',
            step:1,
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
            newphone:'',
            ruleForm1:{
                phone:''
            },
            ruleForm2: {
                phone:'',
                smsCode:'',
                type:3
            },
            ruleForm3:{
                uuid:'',
                password:'',
                phone:'',
                newPassword:''
            },
            rules1: {
                phone: [
                    { required: true, validator: validatePhone, trigger: 'blur' }
                ]
            },
            rules2: {
                smsCode: [
                    { message: '请输入短信验证码', trigger: 'blur' },
                ],
            },
            rules3: {
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                newPassword: [
                    { validator: validatenewPass, trigger: 'blur' }
                ],
            }
        }
      },
        props: [],
        updated() {
        },
        mounted (){
            this.getPlatform() //初始化Platform
            this.getgaptchas() //初始化滑块
            
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
                            that.geetesst = true;
                        })
                    })
                })
            },
            getPlatform:function(){
                const that = this
                that.ruleForm1.platform = appService.getPlatForm();
                that.$store.state.loginStore.platform = that.ruleForm1.platform;
            },
            nextStepa () {
                let that = this;
                let obj = document.getElementById('kap');
                //点击获取短信验证码，1.验证手机号是否为空；2.手机号格式是否正确；3验证滑块；
                if(that.ruleForm1.phone.trim('').length == 0){
                    that.$notify({
                        title: '手机号不能为空',
                        type: 'warning'
                    });
                    return
                } else if(!validate.isPhoneNumber(that.ruleForm1.phone)){
                    that.$notify({
                        title: '请输入正确手机号',
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
                    commonService.getValidateMess({phone: that.ruleForm1.phone, type: 3,challenge:that.challenge1,validate:that.validate1,seccode:seccode2}).then(function (res) {
                        if(res.data.success){  // 返回正确
                            that.ruleForm2.phone = that.ruleForm1.phone
                            that.ruleForm3.phone = that.ruleForm1.phone
                            document.getElementsByClassName('geetest_holder')[0].style.display = "none"
                            that.step = 2
                        }else { //返回错误
                            let errorMessage = '';
                            errorMessage = res.data.message;
                            that.$notify({
                                title: errorMessage,
                                type: 'warning'
                            })
                        }
                    });
                }
            },
            nextStepb(){
                let that = this;
                if(that.ruleForm2.smsCode.trim('').length == 0){
                    that.$notify({
                        title: '短信验证码不能为空',
                        type: 'warning'
                    });
                }
                loginService.findsus(that.ruleForm2).then(function (res) {
                    if(res.data.success){
                        that.ruleForm3.uuid = res.data.datas
                        that.step = 3
                    }else{
                    
                    }
                })
            },
            nextStepc(){
                let that = this;
                if(that.ruleForm3.password.trim('').length == 0){
                    that.$notify({
                        title: '密码不能为空',
                        type: 'warning'
                    });
                }
                if(that.ruleForm3.newPassword.trim('').length == 0){
                    that.$notify({
                        title: '密码不能为空',
                        type: 'warning'
                    });
                }
                loginService.findphone(that.ruleForm3).then(function (res) {
                    if(res.data.success){
                        that.step = 4
                        setTimeout(function() { 
                            that.$router.push({name:'login'})
                        },3000)
                    }else{
                    
                    }
                })
            },
            nextStep() {
                const that = this;
                that.$store.state.loginStore.phone = that.ruleForm2.phone; //手机号
                that.$store.state.loginStore.password = that.ruleForm2.password; // 密码
                loginService.registerNext(that.ruleForm2).then(function (res) {
                    if(res.data.success){
                        that.$notify({
                            title: '下一步',
                            type: 'success'
                        })
                        that.$store.state.loginStore.redisKey = res.data.datas
                        that.ruleForm1.redisKey = that.$store.state.loginStore.redisKey
                        clearInterval(that.$store.state.loginStore.timer)
                        that.count = 0
                        
                        that.$store.state.loginStore.registerStep = that.step
                    }else{
                    
                    }
                })
            },
            submitForm() {
                const that = this;
                if(that.ruleForm1.checked == false){

                }
                that.$store.state.loginStore.name = that.ruleForm1.name; //手机号
                that.$store.state.loginStore.job = that.ruleForm1.job; // 密码
                loginService.register(that.ruleForm1).then(function (res) {
                    if(res.data.success){
                        that.$notify({
                            title: '成功找回密码',
                            type: 'success'
                        })
                        that.step = 1
                        that.$store.state.loginStore.registerStep = that.step
                    }else{
                    
                    }
                })
            }
        }
        
    }
</script>

<style lang="less">
@import "../../assets/css/login.less";
    .redback{
        background: #B9002D !important;
    }
    .redfont{
        color: #B9002D !important;
    }
    #findPass{
        width: 100%;
        height:750px;
        /*background-image: url(../../assets/image/common/login2.jpg);*/
        background-repeat: no-repeat;
        background-size:cover;
        position: relative;
        #countDown{
            color: #666;
        }
        .left{
            width: 300px;
            height: 400px;
            position: absolute;
            top:40%;
            left: 50%;
            transform: translate(-50%,-50%);
            padding: 0px 150px;
            text-align: center;
            background: #FFFFFF;
            border: 1px solid #EEEEEE;
            .title{
                width: 100%;
                text-align: center;
                font-size: 18px;
                color: #333333;
                margin-top: 45px;
                margin-bottom: 35px;
            }
            .phonenum{
                height: 20px;
                width: 100%;
                margin-bottom: 15px;
                font-size: 14px;
                color: #999999;
                text-align: left;
                span{
                    font-size: 14px;
                    color: #151515;
                    line-height: 20px
                }
            }
            .tishi{
                font-size: 12px;
                color: #999999;
                text-align: left;
                margin-top: -10px;
            }
            .progress{
                width: 100%;
                height: 66px;
                
                .leftline{
                    width: 20px;
                    height: 2px;
                    background: #DDDDDD;
                    float: left;
                }
                .prodiv{
                    width: 65px;
                    height: 2px;
                    background: #DDDDDD;
                    float: left;
                    position: relative;
                    .num{
                        padding: 2px 7px;
                        border-radius: 100%;
                        background: #DDDDDD;
                        text-align: center;
                        line-height: 16px;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        color: #fff;
                        font-size: 10px;
                        transform: translate(-50%,-50%);
                    }
                    .text{
                        width: 60px;
                        position: absolute;
                        left: 50%;
                        margin-top: 20px;
                        color: #BBBBBB;
                        font-size: 10px;
                        transform: translate(-50%, 0%);
                    }
                }
            }
            .item{
                .el-form-item__content{
                    height: 40px;
                    .validatePhone{
                        font-size: 14px;
                        width: 60%;
                        color: #999999;
                        background: transparent;
                        height: 30px;
                        border: none;
                        outline: none;
                        margin-top: 0px;
                    }
                    .el-input__inner{
                        background: #F9F9F9;
                        border: none;
                        border-radius: 0px;
                        color: #999999;
                        height: 42px;
                    }
                }
            }
            .icon-icon_right{
                display: block;
                margin-top: 30px;
                font-size: 50px;
                color: #B9002D;
            }
            .cona{
                font-size: 14px;
                color: #475669;
                letter-spacing: 0;
                line-height: 21px;
                margin-top: 7px;
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
                color: #B9002D;
                margin-left: 20px;
            }
            .el-select{
                width: 100%;
                margin-bottom: 20px;
            }
            .nameinput{
                margin-bottom: 20px;
            }
            input::-webkit-input-placeholder{
                color: #999999 !important;
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
                background: #B9002D;
                font-size: 14px;
                color: #FFFFFF;
                border: none
            }
            // .el-checkbox__input.is-checked+.el-checkbox__label
            .zidong{
                font-size: 12px;
                color: #666666;
                width: 100%;
                height: 20px;
                line-height: 20px;
                margin-top: -15px;
                .argumentItem{
                    font-size: 12px;
                    color: #519DEB;
                    line-height: 17px;
                    margin-left: -85px;
                }
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
                .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
                    background-color: #B9002D;
                    border-color: #B9002D;
                }
                .el-checkbox__input.is-focus .el-checkbox__inner{
                    border-color: #B9002D;
                }
                .el-checkbox__inner:hover{
                    border-color: #B9002D;
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
                margin-top: 50px;
                .solves{
                    width: 40px;
                    height: 40px;
                    background-repeat: no-repeat;
                    background-size:cover;
                    display: inline-block;
                    cursor: pointer;
                }
                .solves1{
                    margin-right: 50px;
                    /*background-image: url(../../assets/image/common/weixin.png);*/
                }
                .solves1:hover{
                    margin-right: 50px;
                    /*background-image: url(../../assets/image/common/weixin1.png);*/
                }
                .solves2{
                    /*background-image: url(../../assets/image/common/pass.png);*/
                }
                .solves2:hover{
                    /*background-image: url(../../assets/image/common/pass1.png);*/
                }
            }
        }
        
    }
</style>