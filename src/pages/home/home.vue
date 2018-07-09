<template>
    <div id="app" class="home">
        <div class="content-sy">
            <div class="left">
                <!-- 轮播图 -->
                <z-banner :bannerData="$store.state.homeStore.bannerData" :canClick="'true'"></z-banner>
                <!-- 文章列表 -->
                <div class="big-list-content" style="margin-top:20px;">
                    <home-list v-for="(item,key) in articleList" :item="item" :key="key"></home-list>
                </div>
                <load-more :page="page.num" :total="$store.state.homeStore.page.total" :status="$store.state.homeStore.loadStatus" @loadMore="loadmore"></load-more>
            </div>
            <div class="right">
                <!-- 热门文章 -->
                <div>
                    <div class="sm_list_head">
                        <div class="blueline"></div>
                        <!-- <img src="../../assets/image/hot.png"> -->
                        <span>热门文章</span>
                    </div>
                    <div class="sm_list_content">
                        <hotPost v-for="(item,key) in hotArticleList" :item="item" :key="key"></hotPost>
                    </div>
                </div>
                <!-- 作者推荐 -->
                <div v-if="hotAuthors.length!=0">
                    <div class="sm_list" style="margin-top: 40px">
						<div class="sm_list_head">
                            <div class="blueline"></div>
							<!-- <img src="../../assets/image/feather.png"> -->
							<span>作者推荐</span>
						</div>
                        <recommendAuth v-for="(item,key) in hotAuthors" :item="item" :key="key"></recommendAuth>
						<div class="sm_list_content">
							<div class="recommendauth_list_more">
								<router-link :to="{name:'concern'}" class="see-more">查看更多</router-link>
							</div>
						</div>
					</div>
                </div>
                <!-- 热门活动 -->
                <div v-if="hotActivity.length!=0">
                    <div class="sm_list" style="margin-top: 40px">
						<div class="sm_list_head">
                            <div class="blueline"></div>
							<!-- <img src="../../assets/image/feather.png"> -->
							<span>热门活动</span>
						</div>
                        <actList v-for="(item,key) in hotActivity" :item="item" :key="key"></actList>
						<div class="sm_list_content">
							<div class="recommendauth_list_more">
								<router-link :to="{name:'activity'}" class="see-more">查看更多</router-link>
							</div>
						</div>
					</div>
                </div>
                
            </div>
            <div class="xuanfu">
                <div class="top" @click="clickPhone"><span>手机阅读</span></div>
                <div class="bottom" @click="returnTop">
                    <i class="iconfont icon-fanhuidingbu"></i>
                </div>
            </div>
            <div v-show="phoneRead" class="phone">
                <div class="top">
                    <span>扫描二维码查看手机版</span> 
                    <i class="iconfont icon-guanbi2" @click="clickPhone" style="color:#333"></i>
                </div>
                <canvas class="canvas" id="canvas1"></canvas>
            </div>
        </div>
        
    </div>
</template>

<script>
    import QRCode from 'qrcode'
    import {indexService} from '../../service/indexService'
    import {appService} from '../../service/appService'
    import homeList from '../../component/list/home-list.vue'
    import hotPost from '../../component/list/hot-post.vue'
    import recommendAuth from '../../component/list/recommend-auth.vue'
    import actList from '../../component/list/act-homelist.vue'
    export default {
        name: 'home',
        // 添加以下代码
        metaInfo () {
            // console.log(this);
            const title = this.title
            const desc = this.$store.state.description
            const keyword = this.$store.state.keyWords
            return {
                title,
                meta: [
                    { vmid: 'description', name: 'description', content: desc },
                    { vmid: 'keyWords', name: 'keyWords', content: keyword},
                ]
            }
        },
        data() {
            return{
                title:'运联网_让世界重新看见物流',
                newsData:[],
                hotNews:[],
                adminUsers:[],
                loadStatus:0,
                page: { // 分页
                    num: 2,
                    size:10,
                    totalCount: 0,
                    totalPage:0
                },
                phoneRead:false,
            }
        },
        components: {actList:actList,homeList:homeList,hotPost:hotPost,recommendAuth:recommendAuth},
        watch: {
            '$route' (to,from) {
            }
        },
        asyncData({store,route}) {
            store.state.homeStore.page = {pageNo:1,pageSize:20,queryType:1}
            function getarticleList(){
                return indexService.getArticles(store.state.homeStore.page).then(function (res) {
                    // console.log(res.data.datas.datas);
                    store.state.homeStore.articleList = res.data.datas.datas
                    store.state.homeStore.page.total = res.data.datas.totalPage
                    store.state.homeStore.page.pageNo = 1
                    if(res.data.datas.pageNo>=res.data.datas.totalCount){
                        store.state.homeStore.loadStatus = 2
                    }else {
                        store.state.homeStore.loadStatus = 0
                    }
                });
            }
            function getHotNews(){
                return indexService.hotArticles({pageNo:1,pageSize:5,}).then(function (res) {
                    if(res && res.data && res.data.datas){
                        store.state.homeStore.hotArticleList = res.data.datas.datas;
                    }
                });
            }
            
            function getAdminUsers(){
                return indexService.allAdminUser({pageNo:1,pageSize:5,adminType:1,}).then(function (res) {
                    store.state.homeStore.hotAuthors = res.data.datas.datas;
                });
            }
            function getbanners(){
                return indexService.listImgs({type:0}).then(function(res){
                    store.state.homeStore.bannerData = res.data.datas
                    // console.log(res.data.datas,222222);
                })
            }
            function getActivities(){
                return indexService.getActList({pageNo:1,pageSize:5,sortKey:'publishTime'}).then(function (res) {
                    store.state.homeStore.hotActivity = res.data.datas.datas;
                    // console.log(res.data.datas.datas,333333);
                });
            }
            if(route.name == 'home'){
                return Promise.all([
                    getarticleList(),getbanners(),getHotNews(),getAdminUsers(),getActivities()
                ])
            }else{
            }

        },
        computed: {
            //将存在store中的数据取出
            bannerData:{
                // getter
                get: function () { return this.$store.state.homeStore.bannerData || []},
                // setter
                set: function (newValue) {return newValue}
            },
            articleList: {
                get: function () { return this.$store.state.homeStore.articleList || []},
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
            hotActivity:{
                get: function () { return this.$store.state.homeStore.hotActivity || []},
                set: function (newValue) {return newValue}
            },
            
        },
        mounted: function () {
            this.codelDetail()
            window.scrollTo(0,0);
            // console.log('333333',this.hotAuthors)
        },
        methods: {
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
            clickPhone:function(){
                this.phoneRead = !this.phoneRead
            },
            returnTop(){
                window.scrollTo(0,0);
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
            getNews(){
                const that = this
                indexService.getArticles({
                    pageNo:that.page.num,
                    pageSize:that.page.size,
                    queryType:1
                }).then(function (res) {
                    let tabInfo = res.data.datas;
                    that.page.totalPage = tabInfo.totalPage
                    that.page.totalCount = tabInfo.totalCount == null ? 0 : parseInt(tabInfo.totalCount);
                    let newArr = tabInfo.datas;
                    for(let i=0;i<newArr.length;i++){
                        that.$store.state.homeStore.articleList.push(newArr[i]);
                    }
                    if(res.data.datas.pageNo>=res.data.datas.totalCount){
                        that.$store.state.homeStore.loadStatus = 2
                    }else {
                        that.$store.state.homeStore.loadStatus = 0
                    }
                });
            },
            getBanner(){
                const that = this
                indexService.listImgs({
                    type:3
                }).then(function (res) {
                    that.bannerData = res.data.datas
                });
            },
            loadmore(i){
                //loadstatus为加载状态，每次收到接口数据后要修改该状态
                let that = this
                that.$store.state.homeStore.loadStatus = 1
                that.page.num = i
                that.getNews()
            }
        }
    }
</script>

<style lang="less">
.home{
    .content-sy{
        width: 1200px;
        margin: 0 auto;
        margin-top: 40px;
        overflow: hidden;
        .left{
            width: 800px;
            float: left;
        }
        .right{
            width: 360px;
            float: right;
            // background: #fafafa;
        }
        .xuanfu{
            position: fixed;
            right: 0;
            bottom: 50px;
            border: 1px solid #e5e5e5;
            .top{
                background: #FAFAFA;
                border-bottom: 1px solid #e5e5e5;
                width: 50px;
                height: 50px;
                text-align: center;
                cursor: pointer;
                span{
                    width: 26px;
                    display: inline-block;
                    font-size: 13px;
                    letter-spacing: 0;
                    line-height: 15px;
                    margin-top: 10px;
                    color: #666;
                }
            }
            .top:hover{
                span{color: #20A0FF;}
            }
            .bottom{
                background: #FAFAFA;
                width: 50px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                cursor: pointer;
                .iconfont{
                    font-size:26px;
                    color: #666;
                }
            }
            .bottom:hover{
                .iconfont{color: #20A0FF;}
            }
        }
        .phone{
            z-index: 200;
            position: fixed;
            width: 300px;
            height: 320px;
            bottom:20px;
            right:60px;
            background-color: #fff;
            -webkit-background-clip: content;
            box-shadow: 1px 1px 50px rgba(0,0,0,.3);
            #canvas1{
                height: 276px !important;
                width: 294px !important;
            }
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
    }
    
}
</style>
