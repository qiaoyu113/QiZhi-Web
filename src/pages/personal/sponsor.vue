<template>
  <div class="invitelogin" id="invitelogin" v-set-title="title">
      <div class="form">
        <p class="title">申请成为主办方</p>
        <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="160px" class="demo-ruleForm">
            <el-form-item label="账号设置" label-position="left" prop="varifyType">
                <el-radio-group v-model="ruleForm1.varifyType">
                    <el-radio label="0" value="">作者</el-radio>
                    <el-radio label="4" value="">主办方</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="账号" prop="account">
                <el-input v-model="ruleForm1.account" placeholder="用作登录账号，字母和数字组合" class="nameinput"></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="adminName">
                <el-input v-model="ruleForm1.adminName" placeholder="名称" class="nameinput"></el-input>
            </el-form-item>
            <el-form-item label="所属组织/单位正式名称" prop="adminCompany">
                <el-input v-model="ruleForm1.adminCompany" placeholder="名称" class="nameinput"></el-input>
            </el-form-item>
            <el-form-item label="组织/单位简介" prop="describe">
                <el-input type="textarea" v-model="ruleForm1.describe" placeholder="100字以内，申请成功后将在主页中展示"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="adminLogo">
                <div style="font-size:13px;color:#666;float: right;
    margin-right: 197px;
    line-height: 30px;
    margin-top: 20px;">
                    建议尺寸：200*200</br>
                    图片大小：不超过2M</br>
                    支持格式：JPG、GIF、PNG</br>
                </div>
                <div id="demo"> 
                        <!-- 遮罩层 --> 
                    <div class="container" v-show="panel">
                        <div> 
                        <img id="image" :src="url" alt="Picture"> 
                    </div>
                    <button type="button" id="button2" @click="crop2">取消</button>
                    <button type="button" id="button" @click="crop">确定</button>
                </div> 
                <div class="v_nox clearfix"> 
                    <div class="show"> 
                        <div class="picture" > 
                            <img :src="headerImage" :onerror="errorImg01"/>
                        </div> 
                    </div>
                    <div class="v_show"> 
                        <div class="v_file">
                            <input type="file" id="change" accept="image" @change="change"> 上传图片</div>
                            <label for="change"></label> 
                        </div> 
                    </div>  
                </div>
            </el-form-item>
             <el-form-item label="联系人姓名" prop="adminContactName">
                <el-input v-model="ruleForm1.adminContactName" placeholder="请输入联系人姓名" class="nameinput"></el-input>
            </el-form-item>

            <el-form-item label="联系人邮箱" label-position="top" prop="adminEmail">
                <el-input v-model="ruleForm1.adminEmail" placeholder="请输入联系人邮箱" class="nameinput"></el-input>
            </el-form-item>

            <el-form-item label="联系人手机号" prop="adminPhone">
                <el-input type="phone" v-model="ruleForm1.adminPhone" placeholder="请输入联系人手机号"></el-input>
            </el-form-item>

            <!--滑动验证-->
            <div id="captcha-box"></div>
            <!-- 短信验证 -->
            <el-form-item class="item" label="" prop="smsCode">
                <el-input type="phone" class="form-ipt validatePhone" v-model="ruleForm1.smsCode" auto-complete="off" placeholder="短信验证码"></el-input>
                <span class="validateFromPhone font1" v-if="isFlag" @click="getFromPhone" style="cursor:pointer;"><i class="mid-line"></i>获取验证码</span>
                <span class="validateFromPhone validateWaiting" v-else><i class="mid-line"></i>(<span id="countDown">90</span>s)重新发送</span>
            </el-form-item>
            <p style="font-size: 14px;color: #666666;margin-left:166px;">提交即表示同意<span @click="enterAgree()" style="color:#20A0FF;">《运联通服务协议》</span> </p>
            <el-form-item>
                <el-button class="submitButton" @click="submitForm('ruleForm1')">提交审核</el-button>
            </el-form-item>
        </el-form>
      </div>
      <div class="xiaoxi1" v-show="xiaoxishow">
          <div class="top">
              <p class="top1">申请已收到，请静候佳音</p>
              <p class="top2">感谢您的申请，我们将尽快处理。处理结果将通过短信通知到联系人，敬请留意。</p>
          </div>
          <div class="bottom" @click="enterHome()">
              返回首页
          </div>
      </div>
  </div>
</template>

<script>
 import {modularService} from '../../service/modularService'
  import Cropper from 'cropperjs'
import {loginCommon} from '../../assets/js/login/loginCommon'
import {commonService} from '../../service/commonService'
import {indexService} from '../../service/indexService'
import {loginService} from '../../service/loginService'
import {validate} from '../../assets/js/common/validate'
  export default {
    // components: {vueCropper:vueCropper},
    data () {
        let validateEmail = (rule, value, callback) => {
            var email=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
           if (value === '') {
                callback(new Error('请填写邮箱'));
            } else if(!email.test(value)) {
                callback(new Error('邮箱格式不正确'));
            }else {
                callback();
            }
        };
        let validatePhone = (rule, value, callback) => {
            var mobile=/^(1+\d{10})$/
            if (!value) {
                return callback(new Error('请填写手机号'));
            } else if (!mobile.test(value)){
                return callback(new Error('手机号格式不正确'));
            }else{
                callback();
            }
        };
        let validateAccount = (rule, value, callback) =>{
            var pass=/^(?![^a-zA-Z]+$)(?!\D+$)/
            if (value === '') {
                callback(new Error('请填写账号'));
            }
            else if(!pass.test(value)) {
                callback(new Error('数字和字母组合'));
            }
            else{
                callback();
            }
        };
        let validatesmsCode = (rule, value, callback) => {
        //     var code=/^\d{4})$/
        //    if (value === '') {
        //         callback(new Error('请填写验证码'));
        //     } else if(!code.test(value)) {
        //         callback(new Error('验证码不正确'));
        //     }else {
        //         callback();
        //     }
            // var mobile=/^\d{4})$/
            // if (!value) {
            //     return callback(new Error('请填写手机号'));
            // } else if (!mobile.test(value)){
            //     return callback(new Error('手机号格式不正确'));
            // }else{
            //     callback();
            // }
        };
        
        return {
            title:'申请成为主办方',
            errorImg01:'',
            headerImage:'', 
            panel:false, 
            url:'',
            width:'',
            height:'',
            headImg:'',
            wxshow:false,
            dialogFormVisible: false,
            english:null,
            optioncitys:[],
            options: null,
            isFlag: 1, // 是否可以点击
            kaptchaValue: '',// 用户端输入验证码
            kaptchaKey: '', // 服务器端验证码
            baseCode: '',//验证码图片
            platform: 'WXH5',
            geetesst: false,
            count: 0,
            challenge1:"",
            validate1:"",
            seccode1:"",
            type1:['作者','主办方'],
            url:'',
            panel:false,
            xiaoxishow:false,
            picValue:'',
            ruleForm1:{
                varifyType:'',
                type:2, // 短信的type
                account:'',
                platform:'',
                adminName:'',
                adminCompany:'',
                describe:'',
                adminContactName:'',
                adminPhone:'',
                adminEmail:'',
                smsCode:'',
                adminLogo:'',
                phone:'',
            },
            rules1: {
                varifyType: [
                    { required: true, message: '请选择账号设置', trigger: 'change' }
                ],
                account: [
                    { required: true, validator: validateAccount, trigger: 'blur' },
                ],
                adminName: [
                    { required: true, message:'请填写名称', trigger: 'blur' },
                    { min: 2, max: 20, message: '名称请控制在2到20个字符之间', trigger: 'blur' }
                ],
                describe:[
                    { required: true, message:'请填写组织单位简介', trigger: 'blur' },
                    {max: 100, message: '简介请控制在100个字符以内', trigger: 'blur' }
                ],
                adminLogo:[
                    { required: true, message:'请上传头像', trigger: 'change' },
                ],
                adminContactName: [
                    { required: true, message:'请填写联系人名称', trigger: 'blur' },
                    { min: 2, max: 20, message: '联系人名称请控制在2到20个字符之间', trigger: 'blur' }
                ],
                adminCompany: [
                    { required: true, message:'请填写联系人名称', trigger: 'blur' },
                    { min: 2, max: 20, message: '联系人名称请控制在2到20个字符之间', trigger: 'blur' }
                ],
                adminEmail:[
                    { required: true, validator: validateEmail, trigger: 'blur' },
                ],
                adminPhone: [
                    { required: true, validator: validatePhone, trigger: 'blur' }
                ],
                smsCode: [
                    { required: true, message:'请填写短信验证码', trigger: 'blur' },
                    { min: 4, max: 4, message: '4位验证码', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        picHead() {
            return this.$store.state.picHead
        },
      //将存在store中的数据取出
    },
    mounted: function() {
        this.getPlatform() //初始化Platform
        this.getgaptchas() //初始化滑块
        var self = this; 
        var image = document.getElementById('image'); 
        this.cropper = new Cropper(image, { 
            aspectRatio: 1, 
            viewMode: 1, 
            background:false, 
            zoomable:false, 
            spectRatio: 1,
            crop: function () { 
                self.croppable = true; 
            } 
        });
    },
    methods: {
        enterAgree(){
            window.open('http://'+location.host+'/agreement')
        },
        checkAccount () {
            const that = this
            
        },
        getObjectURL (file) { 
                    var url = null ;  
                    if (window.createObjectURL!=undefined) { // basic 
                     url = window.createObjectURL(file) ; 
                    } else if (window.URL!=undefined) { // mozilla(firefox) 
                     url = window.URL.createObjectURL(file) ; 
                    } else if (window.webkitURL!=undefined) { // webkit or chrome 
                     url = window.webkitURL.createObjectURL(file) ; 
                    } 
                    return url ; 
                   }, 
         change (e) { 
                       let files = e.target.files || e.dataTransfer.files; 
                       if (!files.length) return; 
                      
                      
                       this.picValue = files[0]; 
                        if(this.picValue.type!="image/image" && this.picValue.type!="image/jpeg" && this.picValue.type!="image/bmp" && this.picValue.type!="image/png" && this.picValue.type!="image/jpg"){
                             this.$message.error('上传头像只能是jpg、jpeg、png、bmp格式!');
                             return false
                       } 
                        if(this.picValue.size / 1024 / 1024 > 2){
                             this.$message.error('上传头像大小不能超过 2MB!');
                             return false
                       }
                       this.panel = true; 
                       this.url = this.getObjectURL(this.picValue); 
                         //每次替换图片要重新得到新的url 
                       if(this.cropper){ 
                        this.cropper.replace(this.url); 
                       } 
                       this.panel = true; 
                      }, 
              crop () { 
                      let that=this
                       this.panel = false; 
                       var croppedCanvas; 
                       var roundedCanvas; 
                       if (!this.croppable) { 
                        return; 
                       } 
                       croppedCanvas = this.cropper.getCroppedCanvas(); 
                   
                       roundedCanvas = this.getRoundedCanvas(croppedCanvas); 

                       this.headerImage = roundedCanvas.toDataURL(); 
                modularService.postBase({base64Img:that.headerImage,width:that.width,height:that.height}).then(function(res){
                   console.log(res)
                    that.headImg = res.data.datas;
                    that.ruleForm1.adminLogo = that.headImg
                    console.log('图片地址',that.ruleForm1.adminLogo)
                          // commonService.putUpdate({headImg:img}).then(function(res){
                          //               // that.getUsersprofile()
                          //          })
                  
                })

                     }, 
              getRoundedCanvas (sourceCanvas) { 
                let that = this;
                      var canvas = document.createElement('canvas'); 
                      var context = canvas.getContext('2d'); 
                      var width = sourceCanvas.width; 
                      var height = sourceCanvas.height; 

                      that.width = 270;
                      that.height = 270;
                      canvas.width = that.width; 
                      canvas.height = that.height; 

                      context.imageSmoothingEnabled = true; 
                      context.drawImage(sourceCanvas, 0, 0, that.width, that.height); 
                      context.globalCompositeOperation = 'destination-in'; 
                      context.beginPath(); 
                      context.arc(that.width / 2, that.height / 2, Math.min(that.width, that.height) / 2, 0, 2 * Math.PI, true); 
                      context.fill(); 
                      return canvas; 
                     },
                 crop2:function(){
                   this.panel=false
                 },
        handleChange (value) {
            this.ruleForm1.bankCity = value
        },
        getFromPhone () {
            let that = this;
            let obj = document.getElementById('kap');
            //点击获取短信验证码，1.验证手机号是否为空；2.手机号格式是否正确；3验证滑块；
            if(that.ruleForm1.adminPhone.trim('').length == 0){
                that.$message('手机号不能为空');
                return
            } else if(!validate.isPhoneNumber(that.ruleForm1.adminPhone)){
                that.$message('手机号格式不正确');
                return
            } else if (that.geetesst == false){
                that.$message('请拖动滑块');
                return
            } else {
                let seccode2 = that.seccode1.split('|')
                seccode2 = seccode2.join(',')
                commonService.getValidateMess({phone: that.ruleForm1.adminPhone, type: 2,challenge:that.challenge1,validate:that.validate1,seccode:seccode2}).then(function (res) {
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
                    } else if(res.data.code == 513109){
                        that.$message(res.data.message);
                        var removeObj = document.getElementsByClassName('geetest_holder')[0];
                        removeObj.parentNode.removeChild(removeObj);
                        that.ruleForm1 = ''
                        that.getgaptchas()
                    }else { //返回错误
                        that.$message(res.data.message);
                        var removeObj = document.getElementsByClassName('geetest_holder')[0];
                        removeObj.parentNode.removeChild(removeObj);
                        that.getgaptchas()
                    }
                });
            }
        },
        getPlatform:function(){
            const that = this
            that.ruleForm1.platform = loginCommon.getPlatForm();
            that.$store.state.loginStore.platform = that.ruleForm1.platform;
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
        enterHome:function(){
            this.$router.push({name:'home'})
        },
        submitForm:function(formName){
            const that = this;
            that.ruleForm1.phone = that.ruleForm1.adminPhone
            // that.checkAccount();
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    indexService.getAccountcheck({account:that.ruleForm1.account}).then(function(res){
                        if(!res.data.datas){
                            that.$message.error('账号已存在');
                            return false;
                        } else {
                            indexService.postApplyadmin(that.ruleForm1).then(function (res) {
                                if(res.data.success){
                                    that.$message('提交成功');
                                    that.xiaoxishow = true
                                    // 弹窗
                                }else{
                                that.$message(res.data.message);
                                }
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
.xiaoxi1{
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    width:480px;
    background: #FFFFFF;
    border: 1px solid #ccc;
    .top{
        height: 110px;
        text-align: center;
        border-bottom: 1px solid #ccc;
    }
    .top1{
        margin-top: 20px;
        font-size: 18px;
        color: #333333;
    }
    .top2{
        font-size: 14px;
        color: #999999;
        letter-spacing: 0;
        line-height: 24px;
        width: 80%;
        margin: 0 auto;
        margin-top: 20px;
    }
    .bottom{
        cursor: pointer;
        text-align: center;
        height: 61px;
        line-height: 61px;
        font-size: 16px;
        color: #555555;
        letter-spacing: 0;
        line-height: 61px;
    }
}
 #demo #button2{
              position: absolute;
              left: 10px;
              top: 10px;
              width: 80px;
              height: 40px;
              border: none;
              border-radius: 5px;
              background: white;
         }
          @keyframes myfirst
{
    0%   {right: -160px;}
    // 25%  {right: -80px;}
    // 50%  {right: -40px;}
    100% {right: 0px;}
}
 
@-webkit-keyframes myfirst /* Safari 与 Chrome */
{
    0%   {right: -160px;}
    // 25%  {right: -80px;}
    // 50%  {right: -40px;}
    100% {right: 0px;}
}  
     #demo #button { 
        position: absolute; 
        right: 10px; 
        top: 10px; 
        width: 80px; 
         height: 40px; 
         border:none; 
        border-radius: 5px; 
 background:white; 
}
#demo .show { 
  float: left;
  // margin-top: 0.2rem;
  // margin-left: 0.2rem;
 // width: 100%; 
 // height: 100%; 
 overflow: hidden; 
 position: relative; 
 border-radius: 50%; 
 // border: 1px solid #d5d5d5; 
}
#demo .picture { 
 width: 140px; 
 height: 140px; 
border-radius: 50%;
 // margin: -1px -1px;
 background: #F9F9F9;
 border: 1px solid #bbb;
 overflow: hidden; 
 background-position: center center; 
 background-repeat: no-repeat; 
 background-size: cover; 
  img{
    width: 142px;
    height: 142px;
    margin-top: -1px;
    margin-left: -1px;
  }
}
#demo .v_nox{
   position: relative;
    // height: 100px;
}
#demo .v_show{
    // float: right;
    // margin-top: 0.6rem;
    // width: 1rem;
    // margin-right: 0.2667rem;
     // height: 1rem;
     position: absolute;
     left: 0;
     // bottom: 4px;
     width: 140px;
     height: 140px;
     // height: 100px;
     .v_file{
        // display: inline-block;
        position: relative;
        height: 140px;
        // padding: 3px 5px;
        // border-radius: 50%;
        line-height: 30px;
        width: 140px;
        text-align: center;
        // overflow: hidden;
        color:#fff;
        opacity: 0;
        line-height: 140px;
        background: #ddd; 
input{
      position: absolute;
      width: 100%;
      height: 100%;
      // height: 30px;
      top: 0;
      left: 0;
      outline: none;
      background-color: transparent;
      filter:alpha(opacity=0);
      -moz-opacity:0;
      -khtml-opacity: 0;
      opacity: 0;
    }
     }
     .v_file:hover{
         opacity: 1;
         background: rgba(221, 221, 221, 0.5); 
     }
 
   

}
#demo .container { 
 z-index: 99; 
 position: fixed; 
 padding-top: 60px; 
 left: 0; 
 top: 60px; 
 right: 0; 
 bottom: 0; 
 background:rgba(0,0,0,1); 
}
  
#demo #image { 
 max-width: 100%; 
} 
  
.cropper-view-box,.cropper-face { 
 border-radius: 100% !important; 
} 
/*! 
 * Cropper.js v1.0.0-rc 
 * https://github.com/fengyuanchen/cropperjs 
 * 
 * Copyright (c) 2017 Fengyuan Chen 
 * Released under the MIT license 
 * 
 * Date: 2017-03-25T12:02:21.062Z 
 */
  
.cropper-container { 
 font-size: 0; 
 line-height: 0; 
  
 position: relative; 
  
 -webkit-user-select: none; 
  
  -moz-user-select: none; 
  
  -ms-user-select: none; 
  
   user-select: none; 
  
 direction: ltr; 
 -ms-touch-action: none; 
  touch-action: none 
} 
  
.cropper-container img { 
 /* Avoid margin top issue (Occur only when margin-top <= -height) */
 display: block; 
 min-width: 0 !important; 
 max-width: none !important; 
 min-height: 0 !important; 
 max-height: none !important; 
 width: 100%; 
 height: 100%; 
 image-orientation: 0deg 
} 
  
.cropper-wrap-box, 
.cropper-canvas, 
.cropper-drag-box, 
.cropper-crop-box, 
.cropper-modal { 
 position: absolute; 
 top: 0; 
 right: 0; 
 bottom: 0; 
 left: 0; 
} 
  
.cropper-wrap-box { 
 overflow: hidden; 
} 
  
.cropper-drag-box { 
 opacity: 0; 
 background-color: #fff; 
} 
  
.cropper-modal { 
 opacity: .5; 
 background-color: #000; 
} 
  
.cropper-view-box { 
 display: block; 
 overflow: hidden; 
  
 width: 100%; 
 height: 100%; 
  
 outline: 1px solid #39f; 
 outline-color: rgba(51, 153, 255, 0.75); 
} 
  
.cropper-dashed { 
 position: absolute; 
  
 display: block; 
  
 opacity: .5; 
 border: 0 dashed #eee 
} 
  
.cropper-dashed.dashed-h { 
 top: 33.33333%; 
 left: 0; 
 width: 100%; 
 height: 33.33333%; 
 border-top-width: 1px; 
 border-bottom-width: 1px 
} 
  
.cropper-dashed.dashed-v { 
 top: 0; 
 left: 33.33333%; 
 width: 33.33333%; 
 height: 100%; 
 border-right-width: 1px; 
 border-left-width: 1px 
} 
  
.cropper-center { 
 position: absolute; 
 top: 50%; 
 left: 50%; 
  
 display: block; 
  
 width: 0; 
 height: 0; 
  
 opacity: .75 
} 
  
.cropper-center:before, 
 .cropper-center:after { 
 position: absolute; 
 display: block; 
 content: ' '; 
 background-color: #eee 
} 
  
.cropper-center:before { 
 top: 0; 
 left: -3px; 
 width: 7px; 
 height: 1px 
} 
  
.cropper-center:after { 
 top: -3px; 
 left: 0; 
 width: 1px; 
 height: 7px 
} 
  
.cropper-face, 
.cropper-line, 
.cropper-point { 
 position: absolute; 
  
 display: block; 
  
 width: 100%; 
 height: 100%; 
  
 opacity: .1; 
} 
  
.cropper-face { 
 top: 0; 
 left: 0; 
  
 background-color: #fff; 
} 
  
.cropper-line { 
 background-color: #39f 
} 
  
.cropper-line.line-e { 
 top: 0; 
 right: -3px; 
 width: 5px; 
 cursor: e-resize 
} 
  
.cropper-line.line-n { 
 top: -3px; 
 left: 0; 
 height: 5px; 
 cursor: n-resize 
} 
  
.cropper-line.line-w { 
 top: 0; 
 left: -3px; 
 width: 5px; 
 cursor: w-resize 
} 
  
.cropper-line.line-s { 
 bottom: -3px; 
 left: 0; 
 height: 5px; 
 cursor: s-resize 
} 
  
.cropper-point { 
 width: 5px; 
 height: 5px; 
  
 opacity: .75; 
 background-color: #39f 
} 
  
.cropper-point.point-e { 
 top: 50%; 
 right: -3px; 
 margin-top: -3px; 
 cursor: e-resize 
} 
  
.cropper-point.point-n { 
 top: -3px; 
 left: 50%; 
 margin-left: -3px; 
 cursor: n-resize 
} 
  
.cropper-point.point-w { 
 top: 50%; 
 left: -3px; 
 margin-top: -3px; 
 cursor: w-resize 
} 
  
.cropper-point.point-s { 
 bottom: -3px; 
 left: 50%; 
 margin-left: -3px; 
 cursor: s-resize 
} 
  
.cropper-point.point-ne { 
 top: -3px; 
 right: -3px; 
 cursor: ne-resize 
} 
  
.cropper-point.point-nw { 
 top: -3px; 
 left: -3px; 
 cursor: nw-resize 
} 
  
.cropper-point.point-sw { 
 bottom: -3px; 
 left: -3px; 
 cursor: sw-resize 
} 
  
.cropper-point.point-se { 
 right: -3px; 
 bottom: -3px; 
 width: 20px; 
 height: 20px; 
 cursor: se-resize; 
 opacity: 1 
} 
  
@media (min-width: 768px) { 
  
 .cropper-point.point-se { 
 width: 15px; 
 height: 15px 
 } 
} 
  
@media (min-width: 992px) { 
  
 .cropper-point.point-se { 
 width: 10px; 
 height: 10px 
 } 
} 
  
@media (min-width: 1200px) { 
  
 .cropper-point.point-se { 
 width: 5px; 
 height: 5px; 
 opacity: .75 
 } 
} 
  
.cropper-point.point-se:before { 
 position: absolute; 
 right: -50%; 
 bottom: -50%; 
 display: block; 
 width: 200%; 
 height: 200%; 
 content: ' '; 
 opacity: 0; 
 background-color: #39f 
} 
  
.cropper-invisible { 
 opacity: 0; 
} 
  
.cropper-bg { 
 background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC'); 
} 
  
.cropper-hide { 
 position: absolute; 
  
 display: block; 
  
 width: 0; 
 height: 0; 
} 
  
.cropper-hidden { 
 display: none !important; 
} 
  
.cropper-move { 
 cursor: move; 
} 
  
.cropper-crop { 
 cursor: crosshair; 
} 
  
.cropper-disabled .cropper-drag-box, 
.cropper-disabled .cropper-face, 
.cropper-disabled .cropper-line, 
.cropper-disabled .cropper-point { 
 cursor: not-allowed; 
} 
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
.validatePhone{
    width: 70%;
}
.validateFromPhone.font1{
    font-size: 14px;
    color: #39f;
    margin-left: 20px;
}
#captcha-box{
    overflow: hidden;
    // margin-bottom: 20px;
}
    .invitelogin{
        background: #f4f4f4;
        .geetest_holder.geetest_wind{
            min-height: initial;
            width: 489px !important;
            float: right;
            margin-bottom: 22px;
            margin-right: 50px;
        }
        .nav{
            height: 50px;
            line-height:50px;
            background: #FFFFFF;
            box-shadow: inset 0 -1px 0 0 rgba(221,221,221,0.50);
            .logo{
                width: 70px;
                float: left;
                margin-left: 20px;
                margin-top: 12px;
            }
            .list{
                width: 25px;
                height:auto;
                float: right;
                margin:20px;
            }
            .iconfont{
                float: right;
                font-size: 20px;
                color: #39f;
                margin-top: 4px;
                margin-right: 5px;
            }
        }
        .el-textarea{
            width: 90%;
        }
        .form{
            overflow: hidden;
            width: 700px;
            padding:0 50px;
            margin: 40px auto;
            background: #fff;
            .el-checkbox.is-bordered{
                height: 35px;
                float: left;
                margin-left: 10px !important;
                margin-bottom: 8px;
            }
            .el-checkbox__input.is-checked+.el-checkbox__label{
                color: #39f;
            }
            .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
                border-color: #39f;
                background: #39f;
            }
            .el-checkbox.is-bordered.is-checked{
                border-color: #39f;
            }
            .el-checkbox__input{
                display: none;
            }
            .el-radio.is-bordered.is-checked{
                border-color: #39f;
            }
            .el-radio__input.is-checked .el-radio__inner {
                border-color: #39f;
                background: #39f;
            }
            .el-radio__input.is-checked+.el-radio__label{
                color: #39f;
            }
            .el-radio-group{
                display: block;
                margin: 8px 0;
                float: left;
                margin-left: 15px;
            }
            .el-radio.is-bordered{
                float:left;
                margin-left: 0;
                margin: 5px 0;
            }
            .el-radio.is-bordered{
                height:35px;
                background: #fff;
            }
            .el-cascader{
                width: 100%;
            }
            .title{
                width: 100%;
                text-align: center;
                margin: 30px 0 20px 0;
                font-size: 22px;
                color: #333333;
            }
            .el-form-item.is-required .el-form-item__label:before{
                content:'';
            }
            .el-form--label-top .el-form-item__label{
                padding: 0 0 0 20px;
            }
            .el-form-item__label{
                font-size: 13px;
                color: #666666;
            }
            .el-input__inner{
                width: 90%;
                height: 42px;
                border: 1px solid #eee;
                background: #F9F9F9;
                border-radius: 0px;
                padding: 0 20px;
            }
            .el-select{
                width: 100%;
            }
            .el-form-item__error{
                left:20px;
            }
            .el-form-item__label{
                line-height: 30px;
            }
            .submitButton{
                margin:20px 116px !important;
                background: #39f;
                width: 150px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-size: 16px;
                color: #FFFFFF;
                padding:0;
                display: block;
                border:none;
            }
        }
        .introduce{
            overflow: hidden;
            padding: 10px 20px 60px 20px;
            .title{
                font-size: 16px;
                color: #333333;
                margin-bottom: 16px;
            }
            .intro{
                font-size: 14px;
                line-height: 22px;
                color: #666666;
                margin-bottom: 15px;
            }
        }
    }
</style>

