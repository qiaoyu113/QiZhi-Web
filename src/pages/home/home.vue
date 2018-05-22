<template>
    <div id="app" class="home" v-set-title="title">
        <div class="content-sy">
            <div class="left">
                <z-banner :bannerData="bannerData" :canClick="'true'"></z-banner>
                <div class="big-list-content" style="margin-top:20px;">
                    <home-list v-for="item,key in newsData" :item="item" :key="key"></home-list>
                </div>
                <load-more :page="pageNo" :total="totalPage" :status="loadStatus" @loadMore="loadmore"></load-more>
            </div>
            <div class="right"></div>
        </div>
        
    </div>
</template>

<script>
    import {indexService} from '../../service/indexService'
    import {appService} from '../../service/appService'
    import homeList from '../../component/list/home-list.vue'
    export default {
        name: 'app',
        data() {
            return{
                title:'运联（北京）会展有限公司',
                bannerData:[],
                newsData:[],
                loadStatus:0,
                pageNo:1,
                totalPage:30
            }
        },
        components: {homeList:homeList},
        watch: {
            '$route' (to,from) {
            }
        },
        mounted: function () {
            this.getBanner()
            this.getNews()
        },
        methods: {
            getNews(){
                const that = this
                indexService.getArticles({
                    pageNo:1,
                    pageSize:20,
                    queryType:1
                }).then(function (res) {
                    that.newsData = res.data.datas.datas
                    console.log('文章',that.newsData)
                    
                });
            },
            getBanner(){
                const that = this
                indexService.listImgs({
                    type:3
                }).then(function (res) {
                    that.bannerData = res.data.datas
                    console.log('焦点图',that.bannerData)
                });
            },
            loadmore(i){
                //loadstatus为加载状态，每次收到接口数据后要修改该状态
                let that = this
                that.loadStatus = 1
                that.pageNo=i
                setTimeout(()=> that.loadStatus = 0,10000)
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
