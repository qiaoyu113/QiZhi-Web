<template>
  <div class="" id="comments">
    <!--活动提问标题-->
    <div class="quiz-title">
        <div class="quiz-text"><img src="../../assets/image/comments.png" alt=""> 活动提问</div>
    </div>
    <!--评论窗口（未登录）-->
    <div class="comment-no" v-if="!loginflag">
        <el-input class="notext" type="textarea" resize="none" placeholder="参与评论请先登录" @focus="checkLogin()"></el-input>
        <div class="comment-no-bottom">
            <div class="comment-no-bottom-left">剩余<span class="area-text"> 600</span> 字</div>
            <div class="comment-no-bottom-right">
                <button class="comment-btn">发表评论</button>
            </div>
        </div>
    </div>

    <!--评论窗口（登录）-->
    <div class="comment-no" v-if="loginflag">
        <el-input class="notext" type="textarea" resize="none" placeholder="写评论"></el-input>
        <div class="comment-no-bottom">
            <div class="comment-no-bottom-left">剩余<span class="area-text"> 600</span> 字</div>
            <div class="comment-no-bottom-right">
                <button class="comment-btn" @click="publish()">发表评论</button>
            </div>
        </div>
    </div>
    <!-- 未发表评论 -->
    <div class="none_comment">还没有用户发表评论</div>
    <!-- 所有评论条数(有评论) -->
    <div class="common_num">
        全部评论<span class="num">（118）</span>
        <span class="line"></span>
    </div>
    
    <!--评论内容（个人）/ 未登录-->
    <div class="comment-center">
        <div class="ping_top">
            <div class="comment-center-left">
                <img src="../../assets/image/default_photo.png" height="40" width="40"/>
            </div>
            <div class="comment-center-right">
                <p class="comment-center-right-p1">木臂阿童铁</p>
                <p class="comment-center-right-p2">2016-02-09 16:09:50</p>
            </div>
        </div>
        <div>
            <p class="comment-center-right-p3">非常给力的活动，我已经迫不及待想要参加了，有没有人跟我一起的啊，求组队！非常给力的活动，我已经迫不及待想要参加了，有没有人跟我一起的啊，求组队！非常给力的活动，我已经迫不及待想要参加了，有没有人跟我一起的啊，求组队！</p>
            <p class="comment-center-right-p4"><img src="../../assets/image/huifu.png" alt=""> 回复</p>
        </div>
        <!-- <div class="comment-center-right">
            <div class="comment-center-reply">
                <div class="comment-center-reply-top">
                    <textarea class="area1" placeholder="请输入评论内容"></textarea>
                </div>
                <div class="comment-center-reply-bottom">
                    <div class="comment-center-reply-left">还可以输入 <span>200</span> 字</div>
                    <div class="comment-center-reply-right">
                        <p>您必须<a href="###">登录</a>以后才可以提问</p>
                        <button class="comment-center-ok" disabled>发表评论</button>
                        <button class="comment-center-no">取消</button>
                    </div>
                </div>
            </div>
        </div> -->
        <!-- <div style="clear:both;"></div> -->
    </div>

            <!--分页-->
            <!-- <div id="demo1" style="position:relative;left:40px;"></div> -->
  </div>
</template>

<script type="text/ecmascript-6">
    import {modularService} from '../../service/modularService'
    import {indexService} from '../../service/indexService'
    export default {
    props: [],
    data () {
      return {
        loginflag:'',
        
      }
    },
    mounted () {
        if(localStorage.token && localStorage.token!='undefined'){this.loginflag = true} else {this.loginflag = false}
    },
    methods: {
        publish(){
            
        },
        checkLogin(){
            console.log('进入')
            this.$router.push({name:'login'})
        },
    }
  }
</script>
<style lang="less">
  #comments{
    /*--活动提问标题--*/
    .quiz-title{background:#ffffff;box-shadow:inset 0px -1px 0px 0px #eeeeee;width:100%;height:45px;margin:auto;margin-top:40px;}
    .quiz-text{height:45px;line-height:45px;text-align: left;font-size: 16px;color: #3C4350;img{margin-top: 11px;margin-right: 15px;}}
    .comment-no{background:#ffffff;border-radius:2px;width:100%;height:auto;margin:30px auto;.el-textarea__inner{height: 126px;background: #FFFFFF;border: 1px solid #C0CCDA;border-radius: 2px;}}
    .comment-no-top{height:91px;box-sizing: border-box;padding:11px 16px;}
    .comment-no-top textarea{background:#ffffff;width:100%;height:66px;border:none;display: block;resize: none;}
    .comment-no-bottom{background:#fff;width:100%;height:41px;}
    .comment-no-bottom-left{float:left;line-height:41px;font-size: 14px;color: #6F6F6F;letter-spacing: 0.54px;.area-text{font-size: 16px;color: #20A0FF;}}
    .comment-no-bottom-right{float:right;}
    .comment-no-bottom-right p{float:left;line-height:41px;margin-right:10px;color:#999999;font-size:13px;}
    .comment-no-bottom-right p a{color:#000000;}
    .comment-no-bottom-right button{background:#bbbbbb;border:1px solid #bbbbbb;width:64px;height:28px;margin-top:7px;color:#fff;}
    .comment-no-bottom-right .comment-btn{background: #4EAAFE;border: 1px solid #1698F9;box-shadow: 0 2px 4px 0 rgba(0,0,0,0.06);width:100px;height:36px;}
    .comment-no-bottom-right .comment-btn:hover{cursor: pointer;}
    .comment-no-bottom-right p span{color: #303030}

    .common_num{padding-left:15px;position: relative;;height: 45px;line-height: 45px;margin-top: 30px;background: #FFFFFF;box-shadow: inset 0 -1px 0 0 rgba(224,224,224,0.50);font-size: 16px;color: #3C4350;.num{font-size: 13px;color: #999999;}.line{width: 116px;height: 2px;background: rgba(56,155,255,1);position: absolute;bottom: 0px;left: 0px;}}
    .none_comment{font-size: 14px;
        height: 80px;
        text-align: center;
        color: #999;
        letter-spacing: 0.5px;
        line-height: 80px;
    }
    .ping_top{overflow: hidden;}

    /*--您还没有发表提问--*/
    .quiz-no{width:100%;margin:auto;height:400px;text-align: center;box-sizing: border-box;padding:130px 400px;}
    .quiz-no-left{float:left;background:url("../../assets/image/border.png")no-repeat;width:120px;height:120px;}
    .quiz-no-right{font-size:16px;color:#999999;letter-spacing:0px;text-align:center;margin-top:50px;}

    /*--评论内容--*/
    .comment-center{background:#ffffff;box-shadow:inset 0px -1px 0px 0px #eeeeee;width:100%;margin:auto;padding-bottom:30px;margin-top:30px;overflow: hidden;}
    .comment-center-left{width:40px;height:auto;float:left;}
    .comment-center-right{width:90%;margin-left:15px;float:left;}
    .comment-center-right-p1{font-size:14px;color:#000000;text-align:left;}
    .comment-center-right-p2{font-size:12px;color:#8D8D8D;text-align:left;margin-top:6px;margin-bottom:20px;}
    .comment-center-right-p3{padding: 0 10px;font-size:13px;color: #555555;letter-spacing: 0.5px;line-height: 22px;text-align:left;}
    .comment-center-right-p4{line-height:19px;padding: 0 10px;font-size: 13px;color: #666666;letter-spacing: 0.5px;text-align:left;float:right;margin-top:35px;}
    .comment-center-right-p4:hover{cursor: pointer;}
    .comment-center-right-p5{font-size:13px;color:#20a0ff;letter-spacing:0.49px;text-align:left;float:right;margin-top:15px;cursor: pointer;margin-right: 20px}
    /*--评论内容，官方回复--*/
    .comment-center-right-reply{background:#fff9ef;width:90%;min-height:82px;margin-top:16px;padding:16px 12px;}
    .comment-center-right-reply1{font-size:15px;color:#616161;text-align:left;}
    .comment-center-right-reply1 span{font-size:12px;color:#c0c0c0;text-align:left;margin-left:15px;}
    .comment-center-right-reply2{font-size:14px;color:#555555;line-height:24px;text-align:left;margin-top:16px;}
    /*--回复别人的输入框--*/
    .comment-center-reply{display:none;background:#ffffff;border:1px solid #dddddd;border-radius:2px;width:90%;height:132px;float:right;margin-top:22px;}
    .comment-center-reply-top{height:91px;width:90%;text-align: center;padding-top:10px;box-sizing: border-box;}
    .comment-center-reply-top textarea{background:#ffffff;width:948px;height:66px;border:none;resize: none;}
    .comment-center-reply-bottom{width:90%;height:41px;background:#fafafa;box-shadow:inset 0px 1px 0px 0px #f5f5f5;}
    .comment-center-reply-left{float:left;line-height: 41px;margin-left:16px;color:#999999;font-size:13px;}
    .comment-center-reply-right{float:right;line-height:41px;color:#999999;font-size:13px;}
    .comment-center-reply-right button:hover{cursor: pointer;}
    .comment-center-reply-right p{float:left;}
    .comment-center-reply-right p span{color: #303030}
    .comment-center-ok{float:left;background:#bbbbbb;border:1px solid #bbbbbb;width:64px;height:28px;color:#fff;margin-top:6px;margin-left:10px;}
    .comment-center-no{float:left;background:#fafafa;border:1px solid #eeeeee;width:58px;height:28px;margin-top:6px;margin-left:10px;margin-right:10px;}
    .comment-center-yes{float:left;background:#20a0ff;color:#fff;border:1px solid #0e8ce9;width:58px;height:28px;margin-top:6px;margin-left:10px;margin-right:10px;}
    .comment-center-right-p1 span:nth-child(1){background:#ffffff;border:1px solid #5fb878;color:#5fb878;padding:1px 3px;font-size:12px;margin-left:4px;margin-right:4px;}
  }
</style>