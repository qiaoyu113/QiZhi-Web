<template>
  <div id="login" class="login" v-set-title="title">
      <div class="center">
          <div class="left">
              <z-logo></z-logo>
              <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="" prop="phone">
                    <el-input type="phone" v-model="ruleForm2.phone" auto-complete="off" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="数字和密码组合,且不少于6位"></el-input>
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
                <router-link :to="{name:'qrcode'}" class="solves solvesw"></router-link>
                <router-link :to="{name:'phone'}" class="solves solvesp"></router-link>
            </div>
          </div>
          <div class="right">
              <div class="ceng"></div>
              <p>合通机器人是中国首个综合性线上 /线下AI商务交易支持服务云平台</p>
          </div>
      </div>
  </div>
</template>

<script>
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
                callback(new Error('数字和密码组合,且不少于6位'));
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
        //    console.log(localStorage.redirectUrl,1111)
            that.ruleForm2.platform = commonService.getPlatForm();
            that.$store.state.loginStore.platform = that.ruleForm2.platform;
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
                            /*that.$notify({
                                title: res.data.message,
                                type: 'warning'
                            })*/
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
        /*background-image: url(../../assets/image/common/login3.png);*/
        background-repeat: no-repeat;
        background-size:cover;
        position: relative;
        .center{
            width: 800px;
            height: 500px;
            position: absolute;
            top:50%;
            left: 50%;
            transform: translate(-50%,-50%);
            background: #FFFFFF;
            box-shadow: 0 2px 40px 0 rgba(105,102,102,0.40);
            border-radius: 10px;
            overflow: hidden;
            .left{
                width: 288px;
                height: 500px;
                padding: 0px 56px;
                float: left;
                text-align: center;
                .logo{
                    height: 48.5px;
                    width: auto;
                    margin-top: 80px;
                    margin-bottom: 35px;
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
                    background: #B9002D;
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
                    margin-top: 60px;
                    .solves{
                        width: 40px;
                        height: 40px;
                        background-repeat: no-repeat;
                        background-size:cover;
                        display: inline-block;
                        cursor: pointer;
                    }
                    .solvesw{
                        margin-right: 50px;
                        /*background-image: url(../../assets/image/common/weixin.png);*/
                    }
                    .solvesw:hover{
                        margin-right: 50px;
                        /*background-image: url(../../assets/image/common/weixin1.png);*/
                    }
                    .solvesp{
                        /*background-image: url(../../assets/image/common/phone.png);*/
                    }
                    .solvesp:hover{
                        /*background-image: url(../../assets/image/common/phone1.png);*/
                    }
                }
            }
            .right{
                width: 400px;
                height: 500px;
                float: left;
                /*background-image: url(../../assets/image/common/login1.jpg);*/
                background-repeat: no-repeat;
                // background-size:cover;
                position: relative;
                .ceng{
                    position: absolute;
                    top:0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                    background-image: linear-gradient(-180deg, rgba(0, 0, 0, 0) 3%, #000000 151%);
                }
                // background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 3%, #000000 94%);
                p{
                    width: 306px;
                    z-index: 2;
                    position: absolute;
                    bottom:40px;
                    left: 32px;
                    font-size: 16px;
                    color: #FFFFFF;
                    line-height: 30px;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.50);
                }
            }
        }
    }
</style>