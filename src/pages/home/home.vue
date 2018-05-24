<template>
    <div id="app" class="home" v-set-title="title">
        <div class="content-sy">
            <div class="left">
                <!-- 轮播图 -->
                <z-banner :bannerData="bannerData" :canClick="'true'"></z-banner>
                <!-- 文章列表 -->
                <div class="big-list-content" style="margin-top:20px;">
                    <home-list v-for="(item,key) in newsData" :item="item" :key="key"></home-list>
                </div>
                <load-more :page="page.num" :total="page.totalPage" :status="loadStatus" @loadMore="loadmore"></load-more>
            </div>
            <div class="right">
                <!-- 热门文章 -->
                <div>
                    <div class="sm_list_head">
                        <img src="../../assets/image/hot.png">
                        <span>热门文章</span>
                    </div>
                    <div class="sm_list_content">
                        <hotPost v-for="(item,key) in hotNews" :item="item" :key="key"></hotPost>
                    </div>
                </div>
                <!-- 作者推荐 -->
                <div v-if="adminUsers.length!=0">
                    <div class="sm_list" style="margin-top: 40px">
						<div class="sm_list_head">
							<img src="../../assets/image/feather.png">
							<span>作者推荐</span>
						</div>
                        <recommendAuth v-for="(item,key) in adminUsers" :item="item" :key="key"></recommendAuth>
						<div class="sm_list_content">
							<div class="recommendauth_list_more">
								<router-link :to="{name:'concern'}" class="see-more">查看更多</router-link>
							</div>
						</div>
					</div>
                </div>
                
            </div>
        </div>
        
    </div>
</template>

<script>
    import {indexService} from '../../service/indexService'
    import {appService} from '../../service/appService'
    import homeList from '../../component/list/home-list.vue'
    import hotPost from '../../component/list/hot-post.vue'
    import recommendAuth from '../../component/list/recommend-auth.vue'
    export default {
        name: 'app',
        data() {
            return{
                title:'运联（北京）会展有限公司',
                bannerData:[],
                newsData:[],
                hotNews:[],
                adminUsers:[],
                loadStatus:0,
                page: { // 分页
                    num: 1,
                    size:2,
                    totalCount: 0,
                    totalPage:0
                },
            }
        },
        components: {homeList:homeList,hotPost:hotPost,recommendAuth:recommendAuth},
        watch: {
            '$route' (to,from) {
            }
        },
        mounted: function () {
            this.getBanner()
            this.getHotNews()
            this.getNews()
            this.getAdminUsers()
        },
        methods: {
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
                        that.newsData.push(newArr[i]);
                    }
                    that.loadStatus = 0
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
                // that.page.size = 10
                that.loadStatus = 1
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
        }
    }
    
}
</style>
