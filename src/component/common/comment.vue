<template>
  <div class="" id="comments">
    <!--活动提问标题-->
    <div class="quiz-title">
        <div class="quiz-text"><div></div> 文章评论</div>
    </div>
    <!-- 发表评论 -->
    <commentInput :good="good" class="reply11" :list="1" v-on:comment="comment"></commentInput>
    <!-- 未发表评论 -->
    <div class="none_comment" v-if="commentlists.length < 1">还没有评论，快来抢沙发吧~</div>
    <!-- 所有评论条数(有评论) -->
    <div class="common_num" v-if="commentlists.length > 0">
        {{count}}条评论
    </div>
    
    <!--评论内容（个人）/ 未登录-->
    <div class="comment-center" v-for="(item,index) in commentlists" :key="index">
        <div class="ping_top">
            <div class="comment-center-left">
                <img v-if="item.userHeadImg != null && item.userHeadImg != ''" :src="item.userHeadImg | picTurn" height="40" width="40"/>
                <img v-if="item.userHeadImg == null || item.userHeadImg == ''" src="../../assets/image/default_photo.png" height="40" width="40"/>
            </div>
            <div class="comment-center-right">
                <div style="overflow:hidden;">
                    <p class="comment-center-right-p1">{{item.userName}}</p>
                    <p class="comment-center-right-p2">{{item.commentTime | stampFormate2}}</p>
                    <span class="huifu" @click="onreply(item.id,item.userName,item.userId,0,index)">回复</span>
                </div>
                <p class="comment-center-right-p3">{{item.content}}</p>
                <commentInput ref="selectfood" class="reply2" :name="item.userName" :pagenum="page.num" :good="good" :index="index" @comment="comment" @close="close" v-if="show[index]"></commentInput>
            </div>
        </div>
        <div style="overflow:hidden;">
            <div class="replaylist" v-if="item.comments != null && item.comments.length != 0">
                <div class="single_reply" v-for="(replyuser,index1) in item.comments" :key="index1">
                    <div class="single-top">
                        <div class="name_right">
                            <div class="namet"><span class="name1">{{replyuser.userName}}</span>&nbsp;&nbsp;回复&nbsp;&nbsp;<span class="name2">{{replyuser.originalUserName}}</span>：<span>{{replyuser.content}}</span> </div>
                            <p class="nameb">
                                <span class="time">{{replyuser.commentTime | stampFormate2}}</span>
                                <span class="hf1" @click="addreply(item.id,replyuser.userName,replyuser.userId,1,index,item.comments.length,index1)">回复</span>
                            </p>
                        </div>
                    </div>
                    <div class="single-bottom">
                        <commentInput ref="selectfood" class="reply3" :name="replyuser.userName" :pagenum="page.num" :good="good" :index="index+'000'+index1" @comment="comment" @close="close1" v-if="addShow[index+'000'+index1]"></commentInput>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <el-pagination
        v-if="count>5"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page.num"
        :page-size="5"
        layout="prev, pager, next, jumper"
        :total="count*1">
      </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
    import {modularService} from '../../service/modularService'
    import {indexService} from '../../service/indexService'
    import {userService} from '../../service/userService'
    import commentInput from './commentInput.vue'
    export default {
    components:{'commentInput':commentInput},
    props:['good'],
    data () {
      return {
        loginflag:'',
        id:'',
        pageNo:1,
        text:[],
        backShow:false,
        commentlists:[],
        page:{num:1,size:5,total:''},
        count:null,
        showreplay:['','','','',''],
        showreplay1:false,
        show:[false,false,false,false,false],
        addShow:[],
        commentHtml:'',
        // good
      }
    },
    watch:{
        show (cur, old) {
            this.show = cur;
            console.log('变化')
        }
    },
    mounted () {
        this.upCallback()
        if(localStorage.token && localStorage.token!='undefined'){this.loginflag = true} else {this.loginflag = false}
    },
    methods: {
        handleSizeChange(val) {
            this.page.num = val
            this.upCallback(val)
        },
        handleCurrentChange(val) {
            this.page.num = val
            this.upCallback(val)
        },
        //回复楼主
        onreply:function(id,name,userId,type,index){
            for(var i=0;i<this.show.length;i++){
                this.show[i] = false
                this.$set(this.show, i, false)
            }
            this.show[index] = true
            this.$set(this.show, index, true)
            if(this.loginflag == false){
                this.$router.push({name:'login'})
            } else {
                this.$store.state.userId = userId;
                this.$store.state.replyId = id;
                this.$store.state.replyName = name;
                this.$store.state.type = type;
            }
        },
        //有回复
        addreply:function(id,name,userId,type,index,list,index1){
            //调用组件
            for(var i=0;i<list;i++){
                this.addShow[i] = false
                this.$set(this.addShow, i, false)
            }
            // console.log('sssssssssss',this.addShow)
            this.addShow[index1] = true
            this.$set(this.addShow, index+'000'+index1, true)
            // console.log('sssssssssss11',this.addShow)
            if(this.loginflag == false){
                this.$router.push({name:'login'})
            } else {
                this.$store.state.userId = userId;
                this.$store.state.replyId = id;
                this.$store.state.replyName = name;
                this.$store.state.type = type;
            }
        },
        upCallback(val){
            let that = this;
            console.log(val)
            if(val != undefined){
                that.page.num = val
            } else {
                that.page.num = 1
            }
            for(var i=0;i<that.addShow.length;i++){
                that.addShow[i] = false
                that.$set(that.addShow, i, false)
            }
            for(var i=0;i<that.show.length;i++){
                that.show[i] = false
                that.$set(that.show, i, false)
            }
            let params = {level:'1',pageNo:that.page.num,pageSize:that.page.size,parentId:'',typeId:that.good.id,type:that.good.type}

            userService.getComments(params).then(function(res){
                if(!res.data || !res.data.datas) return
                let list = res.data.datas.datas
                that.commentlists=res.data.datas.datas
                that.count = res.data.datas.totalCount
                if(that.good.type==1)that.$parent.total=res.data.datas.totalCount
            })
        },
        close(close){
            this.show[close] = false
            this.$set(this.show, close, false)
            // for(var i = 0;i<this.show.length){

            // }
        },
        close1(close){
            this.addShow[close] = false
            this.$set(this.addShow, close, false)
        },
        comment(comment){
            this.commentlists=[]
            if(comment == 2){
                 this.upCallback()
            } else {

            }
            this.upCallback(this.page.num)
        }
    }
  }
</script>
<style lang="less">
  #comments{
    /*--活动提问标题--*/
    .el-pagination{
        padding: 20px 0;
        text-align: right;
    }
    .huifu{
        font-size: 14px;
        color: #389BFF;
        letter-spacing: 0.54px;
        line-height: 14px;
        float: right;
        cursor: pointer;
    }
    .reply11{
        margin-top: 15px;
    }
    .reply2{
        background: #F3FAFF;
        border: 1px solid #EFF2F7;
        padding: 20px !important;
        margin-top: 15px;
    }
    .reply3{
        background: #F3FAFF;
        // border: 1px solid #EFF2F7;
        padding: 20px !important;
    }
    .reply1{
        // margin-top: 15px;
        overflow: hidden;
        padding-bottom: 15px;
        .queren{background: #4EAAFE;
            border: 1px solid #1698F9;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.06);
            font-size: 14px;
            color: #FFFFFF;
            letter-spacing: 0;
            line-height: 14px;
            text-align: center;
            padding: 8px 20px;
            float: right;
            cursor: pointer;
        }
        .reply1b{
            overflow: hidden;
            margin-top: 15px;
        }
        .quxiao1{
            font-size: 14px;
            color: #1F2D3D;
            letter-spacing: 0;
            line-height: 14px;
            width: 84px;
            line-height: 32px;
            height: 32px;
            text-align: center;
            float: right;
            cursor: pointer;
        }
        .notext{
            .el-textarea__inner{
                width: 100%;
                height: 100px;
                border-radius: 2px;
            }
        }
    }
    .replaylist{
        margin-top: 30px;
        width: 698px;
        height: auto;
        // padding: 20px;
        float: right;
        // background: #F9FAFC;
        border: 1px solid #EFF2F7;
        overflow: hidden;
        .single_reply{
            overflow: hidden;
            // margin-top: 40px;
            .single-top{
                overflow: hidden;
                padding: 20px;
                background: #F9FAFC;
                .touxiang{
                    border-radius: 100%;
                    float: left;
                }
                .name_right{
                    width: 100%;
                    float: left;
                    .namet{
                        font-size: 14px;
                        color: #666666;
                        letter-spacing: 0;
                        line-height: 22px;
                        .name1{
                            color: #1F2D3D;
                        }
                        .name2{
                            color: #1F2D3D;
                        }
                        .time{
                            font-size: 12px;
                            color: #8D8D8D;
                            letter-spacing: 0;
                            margin-left: 15px;
                        }
                    }
                    .nameb{
                        margin-top: 12px;
                        text-align: right;
                        color: #99A9BF;
                        .name1{
                            font-size: 12px;
                            color: #99A9BF;
                            letter-spacing: 0;
                        }
                        .hf1{
                            font-size: 14px;
                            color: #389BFF;
                            letter-spacing: 0.54px;
                            line-height: 14px;
                            cursor: pointer;
                            margin-left: 20px;
                        }
                        
                    }
                }
            }
        }
        .single_reply:nth-child(1){
            margin-top: 0px;
        }
        
    }
    
    .quiz-title{background:#ffffff;width:100%;margin:auto;margin-top:40px;}
    .quiz-text{height:22px;line-height:22px;text-align: left;font-size: 16px;color: #1F2D3D;div{    float: left;display: inline-block;margin-right: 15px;width: 4px;height:20px;background: #4EAAFE;margin-top: 1px; }img{margin-top: 11px;margin-right: 15px;}}
    .comment-no{background:#ffffff;border-radius:2px;width:100%;height:auto;margin:30px auto;.el-textarea__inner{height: 100px;background: #FFFFFF;border: 1px solid #C0CCDA;border-radius: 2px;}}
    .comment-no-top{height:91px;box-sizing: border-box;padding:11px 16px;}
    .comment-no-top textarea{background:#ffffff;width:100%;height:66px;border:none;display: block;resize: none;}
    .comment-no-bottom{background:#fff;width:100%;height:41px;}
    .comment-no-bottom-left{float:left;Font-size: 14px;
color: #99A9BF;
letter-spacing: 0.54px;
line-height: 14px;letter-spacing: 0.54px;.area-text{color: #20A0FF;}}
    .comment-no-bottom-right{float:right;}
    .comment-no-bottom-right p{float:left;line-height:41px;margin-right:10px;color:#999999;font-size:13px;}
    .comment-no-bottom-right p a{color:#000000;}
    .comment-no-bottom-right button{background:#bbbbbb;border:1px solid #bbbbbb;width:64px;height:28px;margin-top:7px;color:#fff;}
    .comment-no-bottom-right .comment-btn{background: #4EAAFE;border: 1px solid #1698F9;box-shadow: 0 2px 4px 0 rgba(0,0,0,0.06);width:100px;height:36px;}
    .comment-no-bottom-right .comment-btn:hover{cursor: pointer;}
    .comment-no-bottom-right p span{color: #303030}

    .common_num{
        height: 42px;line-height: 42px;
        margin-top: 20px;
        background: #FFFFFF;
        box-shadow: 0 1px 0 0 #E5E9F2;font-size: 14px;
        color: #1F2D3D;
        letter-spacing: 0;
        // line-height: 14px;
        }
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
    .comment-center-left{width:40px;height:auto;float:left;img{border-radius: 100%;}}
    .comment-center-right{width:90%;margin-left:15px;float:left;}
    .comment-center-right-p1{font-size:14px;color:#000000;text-align:left;float: left;}
    .comment-center-right-p2{font-size:12px;color:#8D8D8D;text-align:left;float: left;line-height: 20px;margin-left: 20px;}
    .comment-center-right-p3{font-size:13px;color: #555555;letter-spacing: 0.5px;line-height: 22px;text-align:left;margin-top: 15px;}
    .comment-center-right-p4{line-height:19px;font-size: 13px;color: #666666;letter-spacing: 0.5px;text-align:right;margin-top:20px;}
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