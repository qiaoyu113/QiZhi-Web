<template>
  <div class="" id="new" v-set-title="title">
    <div class="content-sy">
        <div class="left">
          <!--标签-->
            <div id="theme" class="label">
                <!-- <a @click="clicktab('', $event)"><li id="alltheme" class="label-show">全部</li></a> -->
                 <el-radio v-for="(item,index) in articleTypes" :key="index" v-model="classId" :label="item.id" border @change="clicktab(item.id)">{{item.tagName}}</el-radio>
                <!-- <a class="biaoqian" @click="clicktab(item.id, $event)" v-for="(item,index) in articleTypes" :key="index"><li>{{item.tagName}}</li></a> -->
            </div>
            <!-- 文章列表 -->
            <div class="big-list-content" style="margin-top:20px;">
                <home-list v-for="(item,index) in articleList" :item="item" :key="index"></home-list>
            </div>
            <load-more v-if="articleList.length!=0" :page="page.num" :total="$store.state.homeStore.page.total" :status="$store.state.homeStore.loadStatus" @loadMore="loadmore"></load-more>
        </div>
        <div class="right">
          <!-- 热门文章 -->
          <div>
              <div class="sm_list_head">
                  <div class="blueline"></div>
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
            
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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
    asyncData({store,route}){
        function getType(){
            return indexService.articlesType({}).then(function (res) {
                store.state.homeStore.articleTypes = res.data.datas
                store.state.homeStore.articleTypes[0].tagName = '全部'
                store.state.homeStore.articleTypes[0].id = '1'
            });
        }
        function getHotNews(){
            return indexService.hotArticles({pageNo:1,pageSize:5,}).then(function (res) {
                store.state.homeStore.hotArticleList = res.data.datas.datas;
            });
        }
        function getAdminUsers(){
            return indexService.allAdminUser({pageNo:1,pageSize:5,adminType:1,}).then(function (res) {
                store.state.homeStore.hotAuthors = res.data.datas.datas;
            });
        }
        store.state.homeStore.page = {pageNo:1,pageSize:20,queryType:1}
        function getarticleList(){
            return indexService.getArticles(store.state.homeStore.page).then(function (res) {
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

        return Promise.all([
            getType(),getarticleList(),getHotNews(),getAdminUsers()
        ])
    },
    computed:{
         //将存在store中的数据取出
         // getter
         // setter
        articleTypes:{
            get: function(){ return this.$store.state.homeStore.articleTypes},
            set: function(newValue){return newValue}
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
        }
    },
    props: [],
    data () {
      return {
        title:'运联资讯',
        newsData:[],
        hotNews:[],
        aClassId:'',
        adminUsers:[],
        loadStatus:0,
        moren:'1',
        classId:'1',
        page: { // 分页
            num: 2,
            size:10,
            totalCount: 0,
            totalPage:0
        },
      }
    },
    components: {homeList:homeList,hotPost:hotPost,recommendAuth:recommendAuth},
    mounted () {
        document.body.scrollTop = 0;
        this.classId = this.$route.params.id
        this.clicktab(this.$route.params.id)
        console.log(this.articleTypes)
    },
    methods: {
        clicktab :function(id, event){
            let that = this;
            that.page.num = 1;
            if(id == '1'){
                that.aClassId = ''
                that.classId = '1'
            }else{
                that.aClassId = id
            }
            that.$store.state.homeStore.articleList = []
            that.getNews(that.aClassId)
            
        },
        getType(){
            const that = this
            indexService.articlesType({
            }).then(function (res) {
                that.articleTypes = res.data.datas;
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
        getNews(item){
            const that = this
            indexService.getArticles({
                pageNo:that.page.num,
                pageSize:that.page.size,
                queryType:1,
                articleType:that.aClassId
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
  #new{
      .content-sy{
        width: 1200px;
        margin: 0 auto;
        margin-top: 40px;
        overflow: hidden;
        .left{
            width: 800px;
            float: left;
            /*标签样式*/
            .label{border:none;background:#fafafa;width:768px;padding:21px 10px 20px 20px;/*margin-top:30px;*/overflow:hidden;}
            .label a{float:left;}
            .label a li{width:92px;height:30px;line-height:20px;color:#666;box-sizing: border-box;padding:5px;text-align: center;margin:5px;cursor:pointer;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
            .label-show{color:#3c4350;cursor:pointer;background:url("../../assets/image/border.png")no-repeat;background-position:center center;}
            .el-radio__input{
                display: none;
            }
            .el-radio.is-bordered{
                padding: 0;
                border-radius: 2px;
                box-sizing: border-box;
                height: initial;
                font-size: 14px;
                width: initial;
                margin: 0 20px;
                line-height: initial;
            }
            .el-radio.is-bordered:nth-child(1){
                margin-left: 0px;
            }
            .el-radio__input.is-checked+.el-radio__label{
                color: #333333;
                letter-spacing: 1.5px;
                font-weight: 600;
            }
            .el-radio__label{
                font-size: 16px;
                color: #666666;
                letter-spacing: 1.5px;
                position: relative;
            }
            .el-radio__input.is-checked+.el-radio__label::before{
                content:'·';
                color:#333333;
                position: absolute;
                left: -3px;
            }
            .el-radio.is-bordered{
                border: none !important;
            }
        }
        .right{
            width: 360px;
            float: right;
            
        }
    }
  }
</style>