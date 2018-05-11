<template>
  <div id="register" v-bind:class="{'register2':step==2}" class="register" v-set-title="title">
      <div class="center" v-bind:class="{'center2':step==2}">
          <div class="left" v-if="step==1" v-bind:class="{'step1':step==1}">
              <p class="title">注册</p>
              <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="" prop="phone">
                    <el-input type="phone" v-model="ruleForm2.phone" auto-complete="off" placeholder="手机号"></el-input>
                </el-form-item>
                <!--滑动验证-->
                <div id="captcha-box"></div>
                <!-- 短信验证 -->
                <el-form-item class="item" label="" prop="sms">
                    <el-input type="phone" class="form-ipt validatePhone" v-model="ruleForm2.smsCode" auto-complete="off" placeholder="短信验证码"></el-input>
                    <span class="validateFromPhone font1" v-if="isFlag" @click="getFromPhone" style="cursor:pointer;"><i class="mid-line"></i>获取验证码</span>
                    <span class="validateFromPhone validateWaiting" v-else><i class="mid-line"></i>(<span id="countDown">90</span>s)重新获取</span>
                </el-form-item>
                <!-- <div class="item">
                    <input type="number" class="form-ipt validatePhone" placeholder="4位短信验证码" v-model="ruleForm2.smsCode">
                    <span class="validateFromPhone font1" v-if="isFlag" @click="getFromPhone"><i class="mid-line"></i>获取验证码</span>
                    <span class="validateFromPhone validateWaiting" v-else><i class="mid-line"></i>(<span id="countDown">90</span>s)重新获取</span>
                </div> -->
                <el-form-item label="" prop="password">
                    <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="数字和密码组合,且不少于6位"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="nextStep('ruleForm2')">下一步</el-button>
                </el-form-item>
              </el-form>
            <div class="moreSolve">
                <router-link :to="{name:'phone'}" class="solves solves1"></router-link>
                <router-link :to="{name:'login'}" class="solves solves2"></router-link>
            </div>
          </div>
          <div class="left" v-if="step==2" v-bind:class="{'step2':step==2}">
              <p class="title" style="margin-top:70px;">完善信息</p>
              <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名称：" label-position="top" prop="name">
                    <el-input v-model="ruleForm1.name" placeholder="请输入你的名称" class="nameinput"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" label-position="top" prop="email">
                    <el-input v-model="ruleForm1.email" placeholder="请输入你的邮箱" class="nameinput"></el-input>
                </el-form-item>
                <el-form-item label="组织类型：" label-position="top" prop="organType">
                    <el-select v-model="ruleForm1.organType" placeholder="请选择你的组织类型">
                        <el-option :label="item" v-for="(item,index) in companys1" :key="index" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="组织名称：" label-position="top" prop="organName">
                    <el-input v-model="ruleForm1.organName" placeholder="请输入你的组织名称" class="nameinput"></el-input>
                </el-form-item>
                <el-form-item label="所在地区" prop="resource">
                    <el-radio-group v-model="ruleForm1.countryType">
                        <el-radio :label="1">中国</el-radio>
                        <el-radio :label="2">国外</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="ruleForm1.countryType==1" label="" prop="bankCity">
                    <el-cascader
                    size="large"
                    :defaultValue = "ruleForm1.bankCity"
                    :options="options"
                    placeholder="请选择地区"
                    v-model="ruleForm1.bankCity"
                    @change="handleChange">
                    </el-cascader>
                </el-form-item>
                <el-form-item v-if="ruleForm1.countryType==2" label="" label-position="top" prop="foreignAddress" style="margin-bottom:0px !important;">
                    <el-input v-model="ruleForm1.foreignAddress" placeholder="请输入你的国家" class="nameinput"></el-input>
                </el-form-item>
                <el-form-item label="选择行业：" label-position="top" prop="unitType">
                    <el-select v-model="ruleForm1.unitType" placeholder="请选择你的行业">
                        <el-option :label="item" v-for="(item,index) in companys" :key="index" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职位：" label-position="top" prop="job">
                    <el-input v-model="ruleForm1.job" placeholder="请输入你的职位" class="nameinput"></el-input>
                </el-form-item>
                <el-form-item label="最常见的交易类型(选择所有适用的)：" label-position="top" prop="tranType">
                    <el-checkbox-group v-model="ruleForm1.tranType">
                        <el-checkbox :label="1" border>境内交易（中国对中国）</el-checkbox>
                        <el-checkbox :label="2" border>境外贸易和投资交易（从中国到外国）</el-checkbox>
                        <el-checkbox :label="3" border>入境贸易和投资交易（从外国到中国）</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                
                <el-form-item style="margin-top:20x;">
                    <el-button @click="submitForm('ruleForm1')" id="agree">确认并登录</el-button>
                </el-form-item>

                <!-- <el-form-item label="活动性质" prop="type">
                    <el-checkbox-group v-model="ruleForm.type">
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                        <el-checkbox label="地推活动" name="type"></el-checkbox>
                        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item> -->

                <el-form-item class="zidong" prop="checked">
                    <el-checkbox-group v-model="ruleForm1.checked">
                        <el-checkbox name="checked" @change="changeCheck()" label="1">我已阅读并同意</el-checkbox>
                    </el-checkbox-group>
                    <router-link class="argumentItem" :to="{name:'items'}">《用户服务协议》</router-link>
                    <!-- <a class="argumentItem" @click="isAgree">《用户服务协议》</a> -->
                </el-form-item>
              </el-form>
            <div class="moreSolve">
                <router-link :to="{name:'phone'}" class="solves solves1"></router-link>
                <router-link :to="{name:'login'}" class="solves solves2"></router-link>
            </div>
          </div>
          <div class="right" v-if="step==1">
              <div class="ceng"></div>
              <!--<img src="../../assets/image/common/logo.png" alt="" class="rightpic">-->
              <p>合通机器人是中国首个综合性线上 /线下AI商务交易支持服务云平台</p>
          </div>
      </div>
  </div>
</template>

<script>
import { provinceAndCityData } from 'element-china-area-data'
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
                callback(new Error('请输入密码'));
            } else if(!pass.test(value)) {
                callback(new Error('数字和密码组合,且不少于6位'));
            }else {
                callback();
            }
        };
         let validateEmail = (rule, value, callback) => {
            var email=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
           if (value === '') {
                callback(new Error('请输入你的邮箱'));
            } else if(!email.test(value)) {
                callback(new Error('请输入正确的邮箱'));
            }else {
                callback();
            }
        };
        return{
            options: provinceAndCityData,
            title:'注册',
            jobs:[
                "生活 | 服务业",
                "人力 | 行政 | 管理",
                "销售 | 客服 | 采购 | 淘宝",
                "酒店",
                "市场 | 媒介 | 广告 | 设计",
                "生产 | 物流 | 质控 | 汽车",
                "网络 | 通信 | 电子",
                "法律 | 教育 | 翻译 | 出版",
                "财会 | 金融 | 保险",
                "医疗 | 制药 | 环保",
                "建筑 | 物业 | 其他 "
            ],
            jiaoyi:["境内交易（中国对中国）","境外贸易和投资交易（从中国到外国）","入境贸易和投资交易（从外国到中国）"],
            companys1:["中国律师事务所","外国律师事务所在华办公室","中国公司/组织","中国境外的外国公司/组织","中国境内的外商投资企业","中国境外的外国律师事务所","其他"],
            companys:["金融|银行|保险 ","IT|互联网|通信|电子 ","政府|非赢利机构 ","法律服务|管理咨询|中介服务 ","房产|建筑建设|物业 ","广告|传媒|印刷出版 ","消费零售|贸易 ","教育科研 ","交通物流 ","加工制造|仪表设备 ","医药生物|医疗保健 ","酒店旅游 ","能源矿产|石油化工 ","其他"],
            checked: true, //用户协议是否选中
            name:'',
            job:'',
            newjob: '',
            unitType:'',
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
            ruleForm2: {
                phone:'',
                smsCode:"",
                password: '',
                type:1,
            },
            ruleForm1:{
                foreignAddress:'',
                bankCity:[],
                myProv:'',
                myCity:'',
                provCode:'',
                cityCode:'',
                countryType:1,
                email:'',
                organType:'',
                organName:'',
                tranType:[],
                name:'',
                job:'',
                unitType:'',
                platform:'',
                redisKey:'',
                checked:['1']
            },
            rules2: {
                sms: [
                    { message: '请输入短信验证码', trigger: 'blur' },
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                phone: [
                    { validator: validatePhone, trigger: 'blur' }
                ]
            },
            rules1: {
                foreignAddress: [
                    { required: true, message: '请输入你的国家', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                bankCity: [
                    { required: true, message: '请选择所在地区', trigger: 'change' }
                ],
                email:[
                    { required: true, message: '请输入你的邮箱', validator: validateEmail, trigger: 'blur' },
                ],
                countryType: [
                    { required: true, message: '请选择地区', trigger: 'change' }
                ],
                tranType: [
                    { required: true, type: 'array', message: '请选择交易类型', trigger: 'change' }
                ],
                checked:[
                    {  type: 'array',required: true, message: '请同意服务协议', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入你的名称', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                job: [
                    { required: true, message: '请选择你的职业', trigger: 'change' }
                ],
                unitType: [
                    { required: true, message: '请选择你的单位类型', trigger: 'change' }
                ],
                organType: [
                    { required: true, message: '请选择你的组织类型', trigger: 'change' }
                ],
                organName: [
                    { required: true, message: '请输入你的组织名称', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
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
            handleChange (value) {
                this.ruleForm1.bankCity = value
            },
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
                that.ruleForm1.platform = appService.getPlatForm();
                that.$store.state.loginStore.platform = that.ruleForm1.platform;
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
                } else if (that.geetesst == false){
                    that.$notify({
                        title: '请重新拖动滑块',
                        type: 'warning'
                    })
                    return
                } else {
                    let seccode2 = that.seccode1.split('|')
                    seccode2 = seccode2.join(',')
                    commonService.getValidateMess({phone: that.ruleForm2.phone, type: 1,challenge:that.challenge1,validate:that.validate1,seccode:seccode2}).then(function (res) {
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
            },
            submitForm(formName) {
                const that = this;
                that.ruleForm1.provCode = that.ruleForm1.bankCity[0]
                that.ruleForm1.cityCode = that.ruleForm1.bankCity[1]
                let children = []
                for(var i = 0; i<that.options.length;i++){
                    if(that.options[i].value == that.ruleForm1.bankCity[0]){
                        that.ruleForm1.myProv = that.options[i].label
                        children = that.options[i].children
                    }
                }
                // 获取市
                for(var j = 0; j<children.length;j++){
                    if(children[j].value == that.ruleForm1.bankCity[1]){
                        that.ruleForm1.myCity = children[j].label
                    }
                }
                // console.log(that.ruleForm1,'所有信息')
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        that.lastStep()
                    } else {
                        return false;
                    }
                });
            },
            lastStep(){
                const that = this;
                that.$store.state.loginStore.name = that.ruleForm1.name; //手机号
                that.$store.state.loginStore.job = that.ruleForm1.job; // 密码
                that.$store.state.loginStore.unitType = that.ruleForm1.unitType; // 密码
                let newjob = that.ruleForm1.job.split("|");
                that.ruleForm1.job = newjob.join(",");
                // that.ruleForm1.job = that.ruleForm1.job.split("|");
                // that.ruleForm1.job = that.ruleForm1.job(",");
                loginService.register(that.ruleForm1).then(function (res) {
                    if(res.data.success){
                        that.$notify({
                            title: '注册成功',
                            type: 'success'
                        })

                        that.step = 1
                        that.$store.state.loginStore.registerStep = that.step
                        localStorage.token = res.data.datas;
                        if(localStorage.redirectUrl && localStorage.redirectUrl!="undefined"){
                            let url = localStorage.redirectUrl
                            localStorage.removeItem('redirectUrl')
                            window.location.href = url;
                        } else {
                            that.$route.params.shopId = localStorage.pathId;
                            that.$router.replace({name: 'home'});
                        }
                    }else{
                         that.$notify({
                            title: res.data.message,
                            type: 'warning'
                        })
                    }
                })
            }
            
        }
        
    }
</script>

<style lang="less">
@import "../../assets/css/login.less";
    .register2{
        height: fit-content !important;
        padding:40px 0;
    }
    .guowai{
        margin-bottom: 0px !important;
    }
    #register{
        width: 100%;
        height:750px;
        /*background-image: url(../../assets/image/common/login2.jpg);*/
        background-repeat: no-repeat;
        background-size:cover;
        position: relative;
        #countDown{
            color: #666;
        }
        .center2{
            padding: 0 0 50px 0 !important;
            height:auto !important;
            position: inherit !important;
            margin:0 auto;
            top:0 !important;
            left:0 !important;
            transform:none !important;
        }
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
            .step1{
                .el-form-item{
                    margin-bottom: 20px !important;
                }
            }
            .step2{
                padding:0 !important;
                float: none !important;
                width:320px !important;
                margin: 0 auto !important;
                height:auto !important;
                 .el-form-item:nth-child(5){
                    margin-bottom: 0px !important;
                }
                .el-form-item:nth-last-child(3){
                    .el-form-item__error{
                        top:94% !important;
                    }
                }
            }
            .el-checkbox.is-bordered{
                height: 35px;
                float: left;
                margin-left: 0px !important;
                margin-bottom: 8px;
            }
            .el-checkbox__input.is-checked+.el-checkbox__label{
                color: #B9002D;
            }
            .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
                border-color: #B9002D;
                background: #B9002D;
            }
            .el-checkbox.is-bordered.is-checked{
                border-color: #B9002D;
            }
            .el-checkbox__input{
                display: none;
            }
            .zidong .el-checkbox__input{
                display: block !important;
            }


            .el-form-item.is-required .el-form-item__label:before{
                content:''
            }
            .el-form-item__label{
                text-align: left;
                font-size: 12px;
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
                margin: 8px 0;
                float: left;
            }
            .el-form-item{
                // margin-bottom: 0px !important;
            }
            
            .el-form-item:nth-child(6){
                margin-bottom: 20px !important;
            }
            .el-form-item:nth-child(6){
                .el-form-item__error{
                    // padding-top:15px;
                }
            }
            .el-form-item:nth-last-child(2){
                margin-top: 20px !important;
            }
            .el-radio.is-bordered.is-checked{
                border-color: #B9002D;
            }
            .el-form-item__error{
                // top:77%;
            }
            .el-radio__input.is-checked .el-radio__inner {
                border-color: #B9002D;
                background: #B9002D;
            }
            .el-radio__input.is-checked+.el-radio__label{
                color: #B9002D;
            }
            .left{
                width: 288px;
                height: 500px;
                padding: 0px 56px;
                float: left;
                text-align: center;
                .title{
                    width: 100%;
                    text-align: center;
                    font-size: 18px;
                    color: #333333;
                    margin-top: 45px;
                    margin-bottom: 25px;
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
                    // margin-bottom: 20px;
                }
                .nameinput{
                    // margin-bottom: 20px;
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
                    margin-top: 5px;
                    .argumentItem{
                        font-size: 12px;
                        color: #519DEB;
                        line-height: 17px;
                        margin-left: -109px;
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
                    .el-checkbox__input{
                        float: left;
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
                .rightpic{
                    width: 90px;
                    height: auto;
                    position: absolute;
                    top:20px;
                    right: 20px;
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