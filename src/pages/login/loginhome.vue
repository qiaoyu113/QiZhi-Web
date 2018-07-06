<template>
  <div id="login" class="login" v-set-title="title">
      <div class="center">
          <div class="left">
              <z-logo></z-logo>
              <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item prop="phone">
                    <el-input type="phone" v-model="ruleForm2.phone" auto-complete="off" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submitForm('ruleForm2')">登录</el-button>
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
                <!-- <router-link :to="{name:'qrcode'}" class="solves solvesw">
                    <i class="iconfont icon-qq"></i>
                    <p style="margin-top:7px;">QQ登录</p>
                </router-link>
                <router-link :to="{name:'qrcode'}" class="solves solvesw">
                    <i class="iconfont icon-sina"></i>
                    <p style="margin-top:6px;">微博登录</p>
                </router-link> -->
                <router-link :to="{name:'phone'}" class="solves solvesw" >
                    <i class="iconfont icon-shouji1"></i>
                    <p style="margin-top:11px;">手机号登录</p>
                </router-link>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
// require ('../../assets/css/icon/iconfont')
import {commonService} from '../../service/commonService'
import {loginService} from '../../service/loginService'
    export default {
      components: { },
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
        let validateoldPass = (rule, value, callback) =>{
            var pass=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if(!pass.test(value)) {
                callback(new Error('数字和字母组合,且不少于6位'));
            }else{
                callback();
            }
        }
        return{
            title:'登录',
            platform: 'WXH5',
            checked:true,
            ruleForm2: {
                password: '',
                phone:'',
                platform:''
            },
            rules2: {
                password: [
                    { required: true, validator: validateoldPass, trigger: 'blur' }
                ],
                phone: [
                    { required: true, validator: validatePhone, trigger: 'blur' }
                ]
            }
        }
      },
        props: [],
        updated() {
        },
        mounted (){
          let that = this
            that.ruleForm2.platform = commonService.getPlatForm();
            that.$store.state.loginStore.platform = that.ruleForm2.platform;
            document.body.scrollTop = 0;
        },
        methods: {
          submitForm(formName) {
            const that = this;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    loginService.pwdLogin(that.ruleForm2).then(function (res) {
                        if(res.data.success){
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
    #login{
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
        .icon-shouji1{
            font-size:28px;
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
            height: 540px;
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
                width: 284px;
                height: 100%;
                padding: 0px 56px;
                text-align: center;
                .logo{
                    height: 41px;
                    width: auto;
                    margin-top: 60px;
                    margin-bottom: 50px;
                    // margin: 80px 140px 35px 140px;
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
                    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
                        background: #20A0FF;
                        // background: #20A0FF;
                    }
                    .el-checkbox__input.is-focus .el-checkbox__inner{
                        // background: #20A0FF;
                    }
                    .el-checkbox__inner:hover{
                        background: #20A0FF;
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