<template>
  <div id="findPass" class="findPass" v-set-title="title">
      <div class="center">
          <div class="left" v-if="step==1">
              <p class="title">修改密码</p>
              <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
                <el-form-item label="" prop="oldPassword">
                    <el-input type="oldPassword" v-model="ruleForm1.oldPassword" auto-complete="off" placeholder="原始密码"></el-input>
                </el-form-item>
                <el-form-item label="" prop="newPassword">
                    <el-input type="newPassword" v-model="ruleForm1.newPassword" auto-complete="off" placeholder="新密码"></el-input>
                </el-form-item>
                <el-form-item label="" prop="newPassword1">
                    <el-input type="newPassword1" v-model="ruleForm1.newPassword1" auto-complete="off" placeholder="确认新密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submitForm('ruleForm1')">提交新密码</el-button>
                </el-form-item>
              </el-form>
              <router-link :to="{name:'mySet'}" class="return"> 返回个人中心 ></router-link>
          </div>
          <div class="left" v-if="step==2">
              <i class="iconfont icon-icon_right"></i>
              <p class="cona">恭喜你，修改密码成功，请重新登录</p>
              <span class="cona redfont" @click="toLogin()">重新登录</span>
          </div>
      </div>
  </div>
</template>

<script>
import {commonService} from '../../service/commonService'
import {appService} from '../../service/appService'
import {loginService} from '../../service/loginService'
    export default {
      components: {},
      data(){
        let validateoldPass = (rule, value, callback) =>{
            var pass=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/
            if (value === '') {
                callback(new Error('请输入原密码'));
            } else if(!pass.test(value)) {
                callback(new Error('数字和密码组合,且不少于6位'));
            }else{
                callback();
            }
        }
        let validatenewPass = (rule, value, callback) =>{
            var pass=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/
            if (value === '') {
                callback(new Error('请输入新密码'));
            } else if(!pass.test(value)) {
                callback(new Error('数字和密码组合,且不少于6位'));
            } else if(value == this.ruleForm1.oldPassword) {
                callback(new Error('新密码和原密码不能相同'));
            }else{
                callback();
            }
        }
        let validatenewPass1 = (rule, value, callback) =>{
            var pass=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/
            if (value === '') {
                callback(new Error('请重新输入新密码'));
            } else if(!pass.test(value)) {
                callback(new Error('数字和密码组合,且不少于6位'));
            } else if(value != this.ruleForm1.newPassword) {
                callback(new Error('新密码不一致'));
            }else{
                callback();
            }
        }
        return{
            title:'修改密码页',
            step:1,
            platform: 'WXH5',
            ruleForm1:{
                oldPassword:'',
                newPassword:'',
                newPassword1:''
            },
            rules1: {
                oldPassword: [
                    { required: true, validator: validateoldPass, trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, validator: validatenewPass, trigger: 'blur' }
                ],
                newPassword1: [
                    { required: true, validator: validatenewPass1, trigger: 'blur' }
                ],
            }
        }
      },
        props: [],
        updated() {
        },
        mounted (){
            // this.getPlatform() //初始化Platform
        },
        methods: {
            // getPlatform:function(){
            //     const that = this
            //     that.ruleForm1.platform = loginCommon.getPlatForm();
            //     that.$store.state.loginStore.platform = that.ruleForm1.platform;
            // },
            toLogin(){
                this.$router.replace({name:'login'})
            },
            submitForm(formName) {
                const that = this;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        loginService.modifyPwd(that.ruleForm1).then(function (res) {
                            if(res.data.success){
                                that.step = 2
                                
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
            height: 440px;
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
            .return{
                margin-top: 40px;
                display: block;
                width: 100%;
                text-align: center;
                font-size: 14px;
                color: #333333;
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
                margin-top: 130px;
                font-size: 50px;
                color: #B9002D;
            }
            .cona{
                font-size: 14px;
                color: #475669;
                letter-spacing: 0;
                line-height: 21px;
                margin-top: 10px;
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