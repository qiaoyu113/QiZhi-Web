<template>
  <div class="personal">
    <!--账号设置--> 
    <div class="formbottom">            
    <el-form :model="userForm" :rules="rules" ref="userForm" label-width="110px" class="accountSet">
      <el-form-item label="头像" prop="imgUrl">
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

      <el-form-item label="手机号" size="mini" prop="phone">
        <el-input v-model="userForm.phone" placeholder="请输入手机号" maxlength="30"></el-input>
        <!-- <span class="txtWZ">用户邀请码，用户成功关联后可接受您发布的项目需求</span> -->
      </el-form-item>
      <el-form-item label="姓名" size="mini" prop="nickName">
        <el-input v-model="userForm.nickName" placeholder="请输入" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" size="mini" prop="email">
        <el-input v-model="userForm.email" placeholder="请输入" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="公司名称" size="mini" prop="company">
        <el-input v-model="userForm.company" placeholder="请输入" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="职位" size="mini" prop="job">
        <el-input v-model="userForm.job" placeholder="请输入" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="简介" size="mini" prop="descripthion">
        <el-input type="textarea" :rows="3" v-model="userForm.descripthion" placeholder="请输入"></el-input>
      </el-form-item>
    
    
      <!--<el-form-item label="绑定微信" size="mini" prop="hostWX">-->
        <!--<el-input v-model="userForm.hostWX" placeholder="绑定微信" maxlength="30"></el-input><span class="txtBtn">绑定微信</span>-->
      <!--</el-form-item>-->
      <el-form-item  size="mini" class="baochun" >
        <el-button type="primary" @click="submit('userForm')" class="primary-button">保存</el-button>
      </el-form-item>
    </el-form>
    </div>
    <div class="binding">
        <div class="wx clearfix">
             <div class="wxl">绑定微信</div>
             <div class="wxcon" v-if="unionid==null || unionid==''">未绑定</div>
             <div class="wxcon" v-if="unionid!=null && unionid!=''">已绑定</div>
             <div class="wxr" v-if="unionid==null || unionid==''" @click="gowx">去绑定</div>
             <!-- <div class="wxr" v-if="unionid!=null">去解绑</div> -->
        </div>
        <div class="password clearfix">
             <div class="passwordl">密码</div>
             <div class="passwordcon">******</div>
             <div class="passwordr" @click="popupfun">修改</div>
        </div>
    </div>
    <!-- 弹出层 -->
    <div class="popup">
       <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
         <el-form :model="form">
           <el-form-item label="原密码" size="mini" :label-width="formLabelWidth">
              <el-input v-model="form.oldPassword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" size="mini" :label-width="formLabelWidth">
              <el-input v-model="form.newPassword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" size="mini" :label-width="formLabelWidth">
              <el-input v-model="form.newPassword2" auto-complete="off"></el-input>
            </el-form-item>
           
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
            <el-button size="mini" type="primary" @click="putPasswordsPassword">确 定</el-button>
  </div>
</el-dialog>
        
    </div>
    <div id="login_container" v-show="wxshow==true"></div>
  </div>
</template>
<script>
  import {modularService} from '../../service/modularService'
  // import uploadOriginal from '../../../component/upload/uploadLR.vue'
  import Cropper from 'cropperjs'

  export default {
    // props: [],
    data () {
      return {
     
        
         errorImg01: 'this.src="' + require('../../assets/image/default_photo.png') + '"',
         // errorImg01:'',
         headerImage:'', 
         panel:false, 
         url:'',
         width:'',
         height:'',
         headImg:'',
         wxshow:false,
         dialogFormVisible: false,
         form: {
          oldPassword: '',
          newPassword:'',
          newPassword2:'',
        },
        formLabelWidth: '120px',
        rules: {
          imgUrl: [],
          account: [],
          hostName: [
            { required: true, message: '请输入发布商名称', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入简介', trigger: 'blur' },
            { min: 1, max: 150, message: '150个字符内', trigger: 'blur' }
          ],
        },
        userForm:{
          hostName:'', // 用户名称
          description: '', // 简介

          phone:'',   // 手机号
          nickName:'',    //姓名
          email:'',              //邮箱
          company:'',     //公司名称
          job:'',         //职位
          descripthion:'', //简介

        },
        unionid:null,
     
      }
    },
    computed: {
       
            picHead() {
                return this.$store.state.picHead
            },
        },
    mounted () {
      // let that = this;

      var obj = new WxLogin({
              id: "login_container",
              appid: "wxed782be999f86e0e",
              scope: "snsapi_login",
              redirect_uri: encodeURIComponent("https://wetuc.dtfind.com/wxlogin"),
              state: Math.ceil(Math.random()*1000),
              style: "black",
              href: ""});

      this.getUserCenter();
    
      var self = this; 
             var image = document.getElementById('image'); 
             this.cropper = new Cropper(image, { 
             aspectRatio: 1, 
             viewMode: 1, 
             background:false, 
             zoomable:false, 
             crop: function () { 
                  self.croppable = true; 
              } 
  });

    },
    methods: {
        // 提交
      submit(formName){
        let that=this;
        this.$refs[formName].validate((valid) => {
          if (valid) { // 验证成功
            modularService.postUsersInfo({
             
              phone:that.userForm.phone,
              nickName: that.userForm.nickName,
              email: that.userForm.email,
              company: that.userForm.company,
              job: that.userForm.job,
              descripthion: that.userForm.descripthion,
            
              headImg:that.headImg
            }).then(function(res){
              if(res.data.success){
                // that.$router.replace({name: 'setup'});
                that.$message.success('修改成功');
                // that.$router.go(0);
              }else{
                 that.$message.error(res.data.message);
              }
            });
          }
        });
      },
       //绑定微信登陆
         gowx(){
           // this.$router.push wxlogin
           this.$router.push({name:'bindQrcode'})
         },
      // 获取账号信息
      getUserCenter(){
        let that=this;
        modularService.getUserCenter().then(function(res){

          if(res.data.success){
            let obj = res.data.datas.user;
            that.userForm ={
              phone:obj.phone,
              nickName: obj.nickName,
              company: obj.company,
              email:obj.email,
              job: obj.job,
              descripthion: obj.descripthion, 
            };
            that.unionid=res.data.datas.baseUser.unionid
            if(obj.headImg != null){
              that.headImg = obj.headImg;
              that.headerImage = that.picHead + obj.headImg; // 头像
            }
          }else{

             }
          })
        },
        popupfun(){
            this.form.oldPassword = ""
            this.form.newPassword = ""
            this.form.newPassword2 = ""
            this.dialogFormVisible = true
        },
        // 修改密码
        putPasswordsPassword(){
             let that=this
         modularService.putPasswordsPassword({oldPassword:that.form.oldPassword,newPassword:that.form.newPassword}).then(function(res){
          if(res.data.success){
                that.$message.success('修改成功');
                that.$router.push({path:"/login"})
             }else{
                 that.$message.error(res.data.message);
             }
          })
                
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
                    that.headImg = res.data.datas;
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
    }
  }
</script>
<style lang="less">
@import url('../../assets/css/base.less');
  .personal{
    padding-top: 15px;
    .formbottom{
         border-bottom: 1px solid #EEEEEE;
    }
    .binding{
        .wx{
            margin-top: 30px;
            .wxl{
                float: left;
                width: 110px;
                padding-right: 12px;
                text-align: right;
                font-size: 14px;
                color: #666;
                line-height: 20px;
            }
            .wxcon{
                float: left;
                font-size: 14px;
                color: #333;
                line-height: 20px;
            }
            .wxr{
                float: left;
                font-size: 14px;
                color: #20A0FF;
                line-height: 20px;
                margin-left: 20px;
                cursor: pointer;
            }
        }
    }
    .password{
         margin-top: 20px;
        .passwordl{
                float: left;
                width: 110px;
                padding-right: 12px;
                text-align: right;
                font-size: 14px;
                color: #666;
                line-height: 20px;
        }
        .passwordcon{
                float: left;
                font-size: 14px;
                color: #333;
                line-height: 20px;
        }
        .passwordr{
                float: left;
                font-size: 14px;
                color: #20A0FF;
                line-height: 20px;
                margin-left: 20px;
                cursor: pointer;
        }

    }
    .accountSet{width: 510px;position: relative;}
    .baochun{
         .el-form-item__content{
             position: absolute;
             bottom: 20px;
             right: -100px;
         }
    }
    .txtWZ{font-size: 12px; color:#999;}
    .txtBtn{font-size: 12px; color:#409EFF;}
    .el-select--mini{
       width: 100%;
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
 // border-radius: 50%; 
 // border: 1px solid #d5d5d5; 
}
#demo .picture { 
 width: 140px; 
 height: 140px; 
 // margin: -1px -1px;
 overflow: hidden; 
 border-radius: 50%;
 background-position: center center; 
 background-repeat: no-repeat; 
 background-size: cover; 
  img{
    width: 142px;
    height: 142px;
    margin-top: -1px;
    margin-left: -1px;
    border-radius: 50%;
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
        border-radius: 50%;
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
 border-radius: 50%; 
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
    
   }
  
</style>