<template>
  <div class="" id="new" v-set-title="title">
    <div class="content-sy">
        <div class="left">
          <!--标签-->
            <div id="theme" class="label">
                <a @click="clicktab('', $event)"><li id="alltheme" class="label-show">全部</li></a>
                <a @click="clicktab(item.id, $event)" v-for="(item,index) in articleTypes" :key="index"><li>{{item.tagName}}</li></a>
            </div>
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

<script type="text/ecmascript-6">
    import {indexService} from '../../service/indexService'
    import homeList from '../../component/list/home-list.vue'
    import hotPost from '../../component/list/hot-post.vue'
    import recommendAuth from '../../component/list/recommend-auth.vue'
    export default {
      name: 'app',
    props: [],
    data () {
      return {
        title:'运联资讯',
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
      }
    },
    components: {homeList:homeList,hotPost:hotPost,recommendAuth:recommendAuth},
    mounted () {
        document.body.scrollTop = 0;
      this.getType()
      this.getHotNews()
      this.getNews()
      this.getAdminUsers()
    },
    methods: {
        clicktab :function(id, event){
                let that = this;
                that.page.num = 1;
                let more = document.getElementById('alltheme')
                more.classList.remove("label-show")
                let childs = document.getElementById('theme').childNodes;
                for(let i=0;i<childs.length;i++){
                    childs[i].className = '';
                }
                let curObj = event.currentTarget;
                curObj.className = 'label-show';
                if(id == ''){
                  that.aClassId = '';
                }else{
                  that.aClassId = id;
                }
                console.log('类型',that.aClassId)
                that.newsData = [];
                that.getNews(that.aClassId);
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
                  that.newsData.push(newArr[i]);
              }
              that.loadStatus = 0
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
            width: 800px;
            float: left;
            /*标签样式*/
            .label{background:#ffffff;border:1px solid rgba(224,224,224,0.50);box-shadow:0px 5px 4px 0px rgba(224,224,224,0.10);width:768px;padding:21px 10px 20px 20px;/*margin-top:30px;*/overflow:hidden;}
            .label a{float:left;}
            .label a li{width:92px;height:30px;line-height:20px;color:#666;box-sizing: border-box;padding:5px;text-align: center;margin:5px;cursor:pointer;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
            .label-show{color:#3c4350;cursor:pointer;background:url("../../assets/image/border.png")no-repeat;background-position:center center;}
        }
        .right{
            width: 360px;
            float: right;
        }
    }
  }
</style>