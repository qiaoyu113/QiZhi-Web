<template>
    <div class="reply1">
        <el-input 
            class="notext" 
            type="textarea" 
            resize="none" 
            maxlength="600"
            minlength="1"
            :placeholder="placeWord" 
            v-model="data" 
            v-bind:class="{'back':list=='1'}"
            @focus="checklogin()"
            @input="selectNum()">
        </el-input>
        <p class="pleaseLogin" v-if="list=='1' && !flag">请先<router-link :to="{name:'login'}">登录</router-link>再发表评论</p>
        <div class="reply1b">
            <div class="comment-no-bottom-left">剩余<span class="area-text"> {{maxNum}}</span> 字</div>
            <div class="queren" v-if="list!='1'" @click="issuefun()">确认</div>
            <div class="quxiao1" v-if="list!='1'" @click="writeing(index)">取消</div>
            <div class="queren" v-if="list=='1'" @click="issuefun()">发表评论</div>
        </div>
    </div>
</template>

<script>
    import {userService} from '../../service/userService'
    export default {
        props:['good','list','index','pagenum','name'],
        data () {
            return {
                goodisshow:false,
                flag: 0,
                collectisshow:false,
                goodbtnmun:false,
                commentbox:true,
                loginstutes:'',
                data:'',
                isgood:false,
                iscollect:false,
                collect:this.$store.state.collect,
                issue:true,
                id:'',
                agree:'',//点赞数
                btnType:1,//1.点赞。2.取消
                btn2Type:1,//1.收藏。2.取消
                shopid:'',
                goodNo:'',
                comment:{},
                maxNum:600,
                placeWord:'',
            }
        },
        mounted: function() {
            let that = this;
            if(!localStorage.token || localStorage.token =="undefined"){
                that.flag = false
            } else {
                that.flag = true
            }
            console.log('是否登录',that.flag)
            if(!that.flag && this.list == '1'){
                that.placeWord = ''
            } else if (this.list != '1'){
                that.placeWord = '回复'+this.name+'...'
            }else {
                that.placeWord = '请输入评论...'
            }
            
        },
        methods: {
            selectNum:function(){
                this.maxNum = 600 - this.data.length
            },
            checklogin:function(){
                if(!localStorage.token || localStorage.token =="undefined"){
                    this.$router.push({name:'login'})
                }
            },
            //关闭编辑区域
            writeing:function(index){
                this.$emit('close',index)
            },
            //发送评论
            issuefun:function(id,name){
                let that = this;
                that.commentbox = !that.commentbox;
                // that.$store.commit('increment',that.data);
                if(that.$store.state.type === 0){//一级回复
                console.log('一级回复')
                    that.comment = {
                        parentId:that.$store.state.replyId,
                        type:String(that.good.type),//这里需要上一页传文章类型；
                        typeId:that.good.id,
                        userName:that.$store.state.userInfo.nickname || that.$store.state.userInfo.username,
                        userId:that.$store.state.userInfo.userId,
                        originalUserId:that.$store.state.userId,//
                        originalUserName:that.$store.state.replyName,//
                        content:that.data,
                    }
                    userService.postComments(that.comment).then(function(res){
                        if(that.good.type==1){
                            that.$emit('comment',1)
                        }else{
                            if(res.datas = 'success'){
                                that.$parent.upCallback(that.pagenum)
                            }else{
                            }
                        }

                    })
                }else if(that.$store.state.type === 1){//二级回复
                 console.log('二级回复')
                    that.comment = {
                        parentId:that.$store.state.replyId,
                        type:String(that.good.type),//这里需要上一页传文章类型；
                        typeId:that.good.id,
                        originalUserId:that.$store.state.userId,//
                        userId:that.$store.state.userInfo.userId,
                        userName:that.$store.state.userInfo.nickname || that.$store.state.userInfo.username,
                        originalUserName:that.$store.state.replyName,//
                        content:that.data,
                    }
                    userService.postComments(that.comment).then(function(res){
                        if(that.good.type==1){
                            that.$emit('comment',1)
                        }else{
                            if(res.datas = 'success'){
                                that.$parent.upCallback(that.pagenum)
                            }else{
//                            that.$router.push({name:'login'});
                            }
                        }
                    })
                }else{
                     console.log('三级回复')
                    that.comment = {
                        type:that.good.type,//这里需要上一页传文章类型；
                        typeId:that.good.id,
                        userId:that.$store.state.userInfo.userId,
                        content:that.data,
                        userName:that.$store.state.userInfo.nickname || that.$store.state.userInfo.username
                    }
                    userService.postComments(that.comment).then(function(res){
                        if(that.good.type==1){
                            // alert('进入1')
                            that.$emit('comment',2)
                        }else{
                            // alert('进入2')
                            if(res.datas = 'success'){
                                that.pagenum = 1
                                that.$parent.upCallback(that.pagenum)
                            }else{
//                            that.$router.push({name:'login'});
                            }
                        }
                    })
                }
                this.data = '';
                this.$store.state.type = '';
                this.$store.state.replyId = '';
                this.$store.state.replyName = '';
            }
        },
        watch:{
            'data':function (val) {
                if(val === ''){
                    this.issue = true
                }else{
                    this.issue = false
                }
            }
        },
    }
</script>

<style lang="less">
.reply1{
    position: relative;
    .back{
        position: relative;
        .el-textarea__inner{
            background: #F9FAFC !important;
            border: 1px solid #EFF2F7 !important;
            
        }
    }
    .pleaseLogin{
        position: absolute;
        text-align: center;
        font-size: 14px;
        color: #99A9BF;
        letter-spacing: 0.5;
        line-height: 14px;
        top: 40px;
        left: 50%;
        transform: translateX(-50%);
        a{
            color: #20A0FF;
        }
    }
}

</style>