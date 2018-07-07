<template>
  <div class="" id="new">
    <div class="content-sy">
        <div class="left">
           <!--文章信息-->
            <div class="detail-container">
                <div class="article-title">{{$store.state.homeStore.article.title}}</div>
                <div class="article-label">
                    <span class="user-role" style="cursor: pointer">{{$store.state.homeStore.article.originAuthor}}</span>
                    <span class="article-time">发表于{{$store.state.homeStore.article.createDate | dateFormate}}</span>
                    <!-- <span class="shuxian">.</span> -->
                    <router-link :to="{name:'news',params:{id:$store.state.homeStore.article.classId}}" v-if="canClick" class="category" style="cursor: pointer">·&nbsp;&nbsp;{{$store.state.homeStore.article.classification}}</router-link>
                    <span v-if="!canClick" class="category">{{$store.state.homeStore.article.classification}}</span>
                </div>
                <blockquote class="blockquote" v-html="$store.state.homeStore.article.summary"></blockquote>
                <div class="html-content" v-html="$store.state.homeStore.article.content"></div>
                <!--关联文章-->
                <div class="article-associated"></div>
                <div class="article-keywords" v-if="$store.state.homeStore.article.tag!=null && $store.state.homeStore.article.tag.length!=0">
                    <span class="text" style="margin-right: 10px">关键词：</span>
                    <span class="label1" v-for="(item,index) in $store.state.homeStore.article.tag" :key="index"><i class="shape iconfont icon-pinpai"></i>{{item}}</span>
                </div>
                <div class="line"></div>
                <div class="article-look">
                    <span class="praise" v-bind:class="{'praise1':isLike}" @click="likeClick"><i class="iconfont icon-xianxingzan"></i>赞<span class="num">{{$store.state.homeStore.article.thumbsNum | readNumFormate}}</span></span>
                    <!-- <span class="praise"><i class="iconfont icon-xing"></i>赞<span class="num">23</span></span> -->
                    <span class="collection" v-bind:class="{'praise1':isSave}" @click="saveClick"><i class="iconfont icon-xianxingxing"></i>收藏<span class="num">{{$store.state.homeStore.article.collectNum | readNumFormate}}</span></span>
                    <!-- <span class="collection"><i class="iconfont icon-zan"></i>收藏<span class="num">1</span></span> -->
                    <span class="m-read" v-bind:class="{'praise1':phoneRead}" @click="clickPhone"><i class="iconfont icon-shoujiyuedu" style="font-size:18px;"></i>手机阅读</span>
                    <div v-show="phoneRead" class="ceng"></div>
                    <div v-show="phoneRead" class="phone">
                        <div class="top">
                            <span>扫描二维码在手机上继续阅读本文</span> 
                            <i class="iconfont icon-guanbi2" @click="clickPhone"></i>
                        </div>
                        <canvas class="canvas" id="canvas1"></canvas>
                    </div>
                    <div class="p1" style="height:60px;float:right;"><span style="margin-top:10px;float:left;">分享到 :</span>
                        <div class="bdsharebuttonbox" style="float:left;display:inline-block;transform: scale(.8);margin-left:0px;">
                            <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
                            <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
                            <a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ"></a>
                            <!-- <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a> -->
                            <!-- <a href="#" class="bds_more" data-cmd="more"></a>
                            <a class="bds_count" data-cmd="count"></a> -->
                        </div>
                    </div>
                    <div class="code-img hide"><img src="" width="280" height="280"></div>
                </div>
            </div>
        </div>
        <div class="right">
          <!-- 热门文章 -->
          <div>
              <div class="author">
                  <router-link :to="{name:'concernDetail',query:{id:author.id,isFollow:isFollow}}">
                      <img class="authorimg":src="picHead + author.hostLogo">
                  </router-link>
                <div class="authorname">{{author.hostCompany}}</div>
                <div class="authorcon">{{author.hostDesc}}</div>
                <div class="authorbtn" @click="postFollow(author.id)" v-if="isFollow==false && id!='1'"><i class="iconfont icon-jiahao"></i> 关注</div>
                <div class="hoverdiv" v-if="id!='1'">
                    <div class="authorbtn1" v-if="isFollow==true"><i class="iconfont icon-yes"></i>已关注</div>
                    <div class="authorbtn2" @click="open2(author.id)" v-if="isFollow==true">取消关注</div>
                </div>
                
            </div>
            <div class="fenge"></div>
              <div class="sm_list_head" v-if="hotArticleLists.length!=0">
                  <!-- <div class="blueline"></div> -->
                  <span>最新文章</span>
              </div>
              <div class="sm_list_content">
                  <hotPost v-for="(item,key) in hotArticleLists" :item="item" :key="key"></hotPost>
              </div>
          </div>
          <!-- 作者推荐 -->
          <!-- <div v-if="hotAuthors.length!=0">
              <div class="sm_list" style="margin-top: 40px">
                <div class="sm_list_head">
                  <div class="blueline"></div>
                  <span>作者推荐</span>
                </div>
                <recommendAuth v-for="(item,key) in hotAuthors" :item="item" :key="key"></recommendAuth>
                <div class="sm_list_content">
                  <div class="recommendauth_list_more">
                    <router-link :to="{name:'concern'}" class="see-more">查看更多</router-link>
                  </div>
                </div>
              </div>
            </div> -->
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import {modularService} from '../../service/modularService'
    import QRCode from 'qrcode'
    import {indexService} from '../../service/indexService'
    import homeList from '../../component/list/home-list.vue'
    import hotPost from '../../component/list/hot-post.vue'
    import recommendAuth from '../../component/list/recommend-auth.vue'
    export default {
    name: 'app',
    // 添加以下代码
    metaInfo () {
        const title = this.title
        return {
            title
        }
    },
    props: [],
    asyncData({store,route}){
        function getNewDetai(){
            return indexService.getArticleDetail({id:route.params.id,}).then(function (res) {
                store.state.homeStore.article = res.data;
                store.state.homeStore.adminId = res.data.createUserId;
            });
        }
        function getAdminUsers(){
            return indexService.allAdminUser({pageNo:1,pageSize:5,adminType:1,}).then(function (res) {
                store.state.homeStore.hotAuthors = res.data.datas.datas;
            });
        }
        function getHotNews(){
            return indexService.hotArticles({pageNo:1,pageSize:5,adminId:'5b03cb415a70005fde728993'}).then(function (res) {
                store.state.homeStore.hotArticleList = res.data.datas.datas;
            });
        }
        return Promise.all([
            getNewDetai(),getHotNews(),getAdminUsers()
        ])
    },
    computed:{
         //将存在store中的数据取出
         // getter
         // setter
        newDetail: {
            get: function () { return this.$store.state.homeStore.article || []},
            set: function (newValue) {return newValue}
        },
        hotArticleList: {
            get: function () { return this.$store.state.homeStore.hotArticleList || []},
            set: function (newValue) {return newValue}
        },
        hotAuthors:{
            get: function () { return this.$store.state.homeStore.hotAuthors || []},
            set: function (newValue) {return newValue}
        },
        picHead() {
            return this.$store.state.picHead
        },
    },
    data () {
      return {
        title:'',
        // newDetail:{},
        articleTypes:[],
        newsData:[],
        hotNews:[],
        aClassId:'',
        adminUsers:[],
        loadStatus:0,
        moren:'1',
        page: { // 分页
            num: 1,
            size:2,
            totalCount: 0,
            totalPage:0
        },
        canClick:false,
        isSave:false,
        isLike:false,
        phoneRead:false,
        data:[],
        author:'',
        id:'',//id
        isFollow:'', //是否关注
        hotArticleLists:{}
      }
    },
    components: {homeList:homeList,hotPost:hotPost,recommendAuth:recommendAuth},
    beforeCreate(){
        window._bd_share_main = "";
    },
    watch: {
        '$route' (to,from) {
            this.$router.go(0)
        },
        title (cur, old) {
            return cur;
        }
    },
    mounted () {
        this.getHotNewsa()
        document.body.scrollTop = 0
        let _this=this
         _this.title = _this.newDetail.title
         console.log('社群号',_this.hotArticleList)
        //引入百度分享
        _this.$nextTick(function () {
            window._bd_share_config ={
                "common":{
                    "bdSnsKey":{},
                    "bdText" : _this.$store.state.homeStore.article.title,
                    "bdDesc" : _this.$store.state.homeStore.article.summary,
                    "bdPic" : _this.$store.state.picHead + _this.$store.state.homeStore.article.poster,
                    "bdMini":"2",
                    "bdStyle":"1",
                    "bdSize":"32",
                    onAfterClick:_this.syt
                },
                "share":{
                    "bdSize":"32",
                },
                "image":{"viewList":["qzone","tsina","tqq","renren","weixin"],
                "viewText":"分享到：","viewSize":"30"},
                "selectShare":{"bdContainerClass":null,"bdSelectMiniList":null}
            };
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5);
            document.body.appendChild(s);
        })
        _this.getMyFollowMain()
        _this.getType()
        _this.articleRead()
        _this.codelDetail()
        if(localStorage.token && localStorage.token!='undefined'){
            _this.saveIs()
            _this.likeIs()
            if(_this.newDetail.createUserId != '1'){
                _this.isFollowMain()
            }
        }
        
        console.log(this.$store.state.homeStore.article)
    },
    methods: {
        // {name:'concernDetail',query:{id:item.id,isFollow:item.isFollow}
        getHotNewsa(){
            let that = this;
            let id = that.$route.params.id
            console.log(id)
            if(id){
                that.newDetail.createUserId = id
            }
            indexService.getArticles({pageNo:1,pageSize:5,adminId:that.newDetail.createUserId,queryType:1}).then(function (res) {
                console.log(res.data.datas)
                that.hotArticleLists = res.data.datas.datas
            })
        },
        //是否关注某个主办方
        isFollowMain (){
            let that = this;
            console.log('9999',that.newDetail.createUserId)
            indexService.isFollowMain({adminId:that.newDetail.createUserId}).then(function (res) {
                if(res.data.code==200){
                    that.isFollow = res.data.datas
                    console.log('是否关注',res.data.datas)
                }
            });
        },
        //获取社群号信息
        getMyFollowMain (){
            let that = this;
            modularService.getMyFollowMain({type:2,adminId:that.newDetail.createUserId}).then(function (res) {
                console.log(res)
                    if(res.data.code==200){
                        that.author=res.data.datas
                        that.getActivities(that.author.id)
                    }
            });
        },
        
        //获取社群号活动
        getActivities (id){
            let that = this;
            modularService.getActivities({pageNo:that.page.num,pageSize:that.page.size,sortKey:'sortNumber',adminId:id,queryType:1}).then(function (res) {
                console.log(res)
                    if(res.data.code==200){
                        // that.data=res.data.datas.datas
                        // that.inde=res.data.datas.totalPage * 10
                        // console.log(that.inde)
                        // that.author=res.data.datas
                            let newArr=res.data.datas.datas
                        that.page.totalPage = res.data.datas.totalPage
                        that.total=res.data.datas.total
                        that.page.totalCount = res.data.datas.totalCount == null ? 0 : parseInt(res.data.datas.totalCount);
                        if(newArr != null){
                        for(let i=0;i<newArr.length;i++){
                            that.data.push(newArr[i]);
                        }
                        }
                        
                
                        if(res.data.datas.pageNo>=res.data.datas.totalPage){
                            that.loadStatus = 2
                        }else {
                            that.loadStatus = 0
                        }
                
                    
                    }
            });
        },
        //关注社群号
        postFollow (id){
            let that = this;
            if(localStorage.token && localStorage.token!='undefined'){
                modularService.postFollow({adminId:id}).then(function (res) {
                    if(res.data.code==200){
                        // that.getAllAdminUser()
                            that.$message.success('关注成功');
                            that.isFollow=true
                        //  that.data=res.data.datas.datas
                        // that.inde=res.data.datas.totalPage * 10
                        // console.log(that.inde)
                
                    
                    }
                });
            } else {
                that.$router.push({name:'login'})
            }
            
        },
        //取消关注
        putCancleFollow(id){
            let that=this
            modularService.putCancleFollow({adminId:id}).then(function (res) {
                console.log(res)
                    if(res.data.code==200){
                        that.$message.success('取消关注成功');
                        that.isFollow=false
                    
                    }
            });

        },
        // 取消关注弹出层
        open2(id) {
            this.$confirm('是否取消关注?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            this.$message({
                type: 'success',
                message: '取消关注成功!'
            });
            this.putCancleFollow(id)
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消'
            });          
            });
        },
        clickPhone:function(){
            this.phoneRead = !this.phoneRead
        },
        codelDetail:function(){
            const that = this
            let canvas1 = document.getElementById('canvas1');
            let url = window.location.href
            QRCode.toCanvas(canvas1, url, (error) => {
                if (error) {
                } else {
                }
            })
        },
        //是否收藏
        saveIs:function(){
            const that = this;
            indexService.isCollect({
                type:1,
                typeId: that.$route.params.id,
            }).then(function (res) {
                that.isSave = res.data.datas
            })
        },
        //是否点赞
        likeIs:function(){
            const that = this;
            indexService.isCollect({
                type:0,
                typeId: that.$route.params.id,
            }).then(function (res) {
                that.isLike = res.data.datas
            })
        },
        //点赞
        likeClick:function(){
            const that = this;
            let type1
            if(that.isLike == true){type1 = 0} else {type1 = 1}
            indexService.hasLike({
                type:type1,
                articleId: that.$route.params.id,
            }).then(function (res) {
                that.isLike = !that.isLike
                if(localStorage.token && localStorage.token!='undefined'){
                    that.getsaveNum();
                }
            })
        },
        //收藏
        saveClick:function(){
            const that = this;
            console.log('进入')
            if(localStorage.token && localStorage.token!='undefined'){
                let type2
                if(that.isSave == true){type2 = 0} else {type2 = 1}
                indexService.hasCollect({
                    type:type2,
                    articleId: that.$route.params.id,
                }).then(function (res) {
                    that.isSave = !that.isSave
                    that.getsaveNum();
                })
            } else {
                that.$router.push({name:'login'})
            }
        },
        getsaveNum:function(){
            const that = this;
            if(localStorage.token && localStorage.token!='undefined'){
                indexService.getArticleDetail({
                    id: that.$route.params.id,
                }).then(function (res) {
                    that.$store.state.homeStore.article.thumbsNum  = res.data.thumbsNum
                    that.$store.state.homeStore.article.collectNum  = res.data.collectNum
                })
            } else {

            }
        },
        //阅读数+1
        articleRead:function(){
            const that = this
            indexService.articleRead({
                articleId: that.$route.params.id
            }).then(function (res) {
            });
        },
        // 分享+1
        syt:function(){
            let that=this
            let id=that.$route.params.id
            // commonService.putArticleforward(id).then(function (res) {
            //     if(res.data.code==200){}
            // });
        },
        getType(){
            const that = this
            indexService.articlesType({
            }).then(function (res) {
                that.articleTypes = res.data.datas;
                for(var i=1;i<that.articleTypes.length;i++){
                    console.log(that.articleTypes[i].id)
                    if(that.articleTypes[i].id==that.$store.state.homeStore.article.classId){
                        that.canClick = true
                    }
                }
            });
        },
        getNewDetai(){
            const that = this
            indexService.getArticleDetail({
                id:that.$route.params.id,
            }).then(function (res) {
                that.newDetail = res.data;
                console.log(that.newDetail)
            });
        },
      getAdminUsers(){
        const that = this
        indexService.allAdminUser({
            pageNo:1,
            pageSize:5,
            adminType:1,
        }).then(function (res) {
            that.adminUsers = res.data.datas.datas;
        });
      },
      getHotNews(){
          const that = this
          indexService.hotArticles({
              pageNo:1,
              pageSize:5,
          }).then(function (res) {
              that.hotNews = res.data.datas.datas;
          });
      },
      loadmore(i){
          //loadstatus为加载状态，每次收到接口数据后要修改该状态
          let that = this
          // that.page.size = 10
          that.loadStatus = 1
          that.page.num = i
          that.getNews()
          
      }
    }
  }
</script>
<style lang="less">
  #new{
      .content-sy{
        width: 1200px;
        margin: 0 auto;
        margin-top: 40px;
        overflow: hidden;
        .left{
            width: 760px;
            float: left;
            /*标签样式*/
            .praise1{
                box-shadow: none !important;
                color:#389bff !important;
                border: 1px solid #389bff !important;
                i{color:#389bff !important;}
            }
            #canvas1{
                height: 270px !important;
                width: 270px !important;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
            }
            .phone{
                z-index: 200;
                position: fixed;
                width: 300px;
                height: 320px;
                top: 50%;
                left:50%;
                transform: translate(-50%,-50%);
                background-color: #fff;
                -webkit-background-clip: content;
                box-shadow: 1px 1px 50px rgba(0,0,0,.3);
                .top{
                    font-size: 14px;
                    padding: 0 60px 0 20px;
                    height: 42px;
                    line-height: 42px;
                    border-bottom: 1px solid #eee;
                    font-size: 14px;
                    color: #333;
                    overflow: hidden;
                    background-color: #F8F8F8;
                    border-radius: 2px 2px 0 0;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    i{
                        position: absolute;
                        right: 15px;
                        top: 10px;
                        line-height: initial;
                        font-size: 20px;
                        display: inline-block;
                        cursor: pointer;
                    }
                }
            }
            .icon-pinpai{color:rgb(224,224,224);font-size: 13px;display: inline-block;margin-right: 7px;transform: rotateY(180deg);}
            .label{background:#ffffff;border:1px solid rgba(224,224,224,0.50);box-shadow:0px 5px 4px 0px rgba(224,224,224,0.10);width:768px;padding:21px 10px 20px 20px;/*margin-top:30px;*/overflow:hidden;}
            .label a{float:left;}
            .label a li{width:92px;height:30px;line-height:20px;color:#666;box-sizing: border-box;padding:5px;text-align: center;margin:5px;cursor:pointer;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
            .label-show{color:#3c4350;cursor:pointer;background:url("../../assets/image/border.png")no-repeat;background-position:center center;}
            .article-title{font-size:24px;color:#3c4350;line-height:34px;text-align:left;width: 800px;}
            .article-label{margin-top: 25px}
            .article-label span{margin-right: 5px;font-size: 14px;color: #999999;}
            .article-label .category{font-size:14px;color:#389bff;text-align:left;}
            .article-label .shuxian,.article-label .article-time{font-size:14px;text-align:left;}
            .article-label .user-role{font-size:14px;color:#999999;text-align:left;}
            .article-label .user-role:hover{text-decoration: underline}
            .article-keywords{margin-top: 35px}
            .article-keywords .text{margin-right: 10px;font-size:13px;color:#999999;text-align:left;}
            .article-keywords span{margin-right: 20px;}
            .article-keywords .label1{font-size:12px;color:#999999;text-align:center;background:#ffffff;border:1px solid #eff2f6;border-radius:2px;height:22px;line-height: 22px;display: inline-block;padding: 0 10px}
            // .article-keywords .label1 .shape{background:url("../../images/PC/icon/Shape.png");width:16px;height:16px;display: inline-block;position: relative;top:3px;margin-right: 8px;}
            .detail-container .line{background:rgba(224,224,224,0.50);width:800px;height:1px;margin-top: 35px}
            .article-look{margin-top: 40px;font-size:14px;color:#999999;position: relative;height: 45px;border: 1px solid transparent}
            .article-look>span{display:inline-block;background:#fafafa;border-radius:2px;width:140px;height:40px;line-height: 40px;text-align: center;margin-right: 10px;cursor: pointer;background:#fafafa;
                box-shadow:inset 0px 1px 0px 0px rgba(224,224,224,0.50), inset -1px 0px 0px 0px rgba(224,224,224,0.50), inset 0px -1px 0px 0px rgba(224,224,224,0.50), inset 1px 0px 0px 0px rgba(224,224,224,0.50);vertical-align: middle}
            .article-look .praised{font-size:14px;color:#389bff;line-height:45px;vertical-align: middle;background:#ffffff;box-shadow:0px 5px 4px 0px rgba(225,225,225,0.10), inset 0px 1px 0px 0px #389bff, inset -1px 0px 0px 0px #389bff, inset 1px 0px 0px 0px #389bff, inset 0px -1px 0px 0px #389bff; }
            .article-look .collectioned{font-size:14px;color:#389bff;background:#ffffff;box-shadow:0px 5px 4px 0px rgba(225,225,225,0.10), inset 0px 1px 0px 0px #389bff, inset -1px 0px 0px 0px #389bff, inset 1px 0px 0px 0px #389bff, inset 0px -1px 0px 0px #389bff;}
            .article-look .m-readed{font-size:14px;color:#389bff;background:#ffffff;box-shadow:0px 5px 4px 0px rgba(225,225,225,0.10), inset 0px 1px 0px 0px #389bff, inset -1px 0px 0px 0px #389bff, inset 1px 0px 0px 0px #389bff, inset 0px -1px 0px 0px #389bff;}
            .article-look>span i{margin-right: 12px;display: inline-block;font-size:18px;position: relative;top: 0px;}
            .m-read .iconfont{font-size: 18px;}
            .article-look .m-readed .num,.article-look .collectioned .num,.article-look .praised .num{font-size:14px;}
            .article-look span .num{font-size:14px;color:#389bff;text-align:left;margin-left: 8px;line-height: 40px;vertical-align: middle}
            .code-img{margin: 5px 30px 30px 30px}
            .hide{display: none}
            .bdshare-button-style1-32 a{margin-right: 10px;font-size: 20px;}
            // .img{background:url(../../images/cms/icon/img.png) no-repeat;}
            .detail-container{
                .blockquote{
                    border: 0;
                    font-size: 100%;
                    font: inherit;
                    vertical-align: top;
                    position: relative;
                    margin: 0px;
                    padding: 15px;
                    background: #fafafa;
                    padding-left: 20px;
                    margin-bottom: 20px;
                    margin-top: 30px;
                    font-size: 14px;
                    color: #666;
                    line-height: 20px;
                }
            } 
        
        
        }
        .right{
            width: 360px;
            float: right;
            .fenge{
                width: 320px;
                height: 1px;
                background: #ddd;
                margin: 0 auto;
            }
            .author{
                // margin-top: 40px;
                width: 100%;
                // height: 290px;
                overflow: hidden;
                padding-top: 25px;
                background: #FAFAFA;
                border-radius: 2px;
                padding-bottom: 39px;
                .authorimg{
                    display: block;
                    width: 100px;
                    height: 100px;
                    margin: 0 auto;
                    border-radius: 50px;
                    border: 2px solid #ddd;
                }
                .authorname{
                    font-size: 16px;
                    line-height: 18px;
                    color: #505050;
                    margin-top: 18px;
                    text-align: center;
                }
                .authorcon{
                    width: 285px;
                    margin: 12px auto 0;
                    // margin-top: 12px;
                    font-size: 14px;
                    line-height: 21px;
                    // height: 42px;
                    overflow: hidden;
                    color: #999;
                    text-align: center;
                }
                .authorbtn1{
                    cursor: pointer;
                    margin: 15px auto 0px;
                    width: 144px;
                    height: 32px;
                    border: 1px solid;
                    border-radius: 27px;
                    color: #389BFF;
                    text-align: center;
                    font-size: 12px;
                    line-height: 32px;
                    background: #fff;
                    // border-image: linear-gradient(-90deg, #508DFF 0%, #389BFF 34%, #26C5FE 89%, #3BB8FE 100%);
                    .iconfont{
                        font-size: 14px;
                    }
                }
                .authorbtn2{
                    cursor: pointer;
                    margin: 15px auto 0px;
                    width: 144px;
                    height: 32px;
                    background: #FFFFFF;
                    border: 1px solid #E5E9F2;
                    box-shadow: 0 2px 2px 0 rgba(132,146,166,0.05), 0 5px 4px 0 rgba(132,146,166,0.05);
                    color: #5E6D82;
                    text-align: center;
                    font-size: 12px;
                    line-height: 32px;
                    display: none;
                }
                .hoverdiv:hover{
                    .authorbtn1{display: none;}
                    .authorbtn2{display: block;}
                }
                .authortit{
                    margin-top: 4px;
                    width: 100%;
                    // height: 19px;
                    .authortitl{
                        width: 50%;
                        float: left;
                        border-right: 1px solid #7F7F7F;
                        box-sizing: border-box;
                        height: 14px;
                        p{
                        text-align: right;
                        padding: 0 8px;
                        font-size: 14px;
                        line-height: 14px;
                        color: #7F7F7F;
                        } 
                    }
                    .authortitr{
                        width: 50%;
                        float: left;
                        p{
                        text-align: left;
                        padding: 0 8px;
                        font-size: 14px;
                        line-height: 14px;
                        color: #7F7F7F;
                        }
                    }
                }
                .authorbtn{
                    cursor: pointer;
                    margin: 15px auto 0px;
                    width: 144px;
                    height: 32px;
                    background-image: linear-gradient(-90deg, #508DFF 0%, #389BFF 34%, #26C5FE 89%, #3BB8FE 100%);
                    border: 1px solid #389BFF;
                    border-radius: 27px;
                    color: #fff;
                    text-align: center;
                    font-size: 12px;
                    line-height: 32px;
                    .iconfont{
                        font-size: 14px;
                    }
                }
            }
        }
    }
  }
</style>