<template>
  <div class="" id="new" v-set-title="title">
    <div class="content-sy">
        <div class="left">
           <!--文章信息-->
                    <div class="detail-container">
                        <div class="article-title">{{newDetail.title}}</div>
                        <div class="article-label">
                            <span class="user-role" style="cursor: pointer">{{newDetail.originAuthor}}</span>
                            <span class="article-time">发表于{{newDetail.createDate | dateFormate}}</span>
                            <span class="shuxian">|</span>
                            <span class="category" style="cursor: pointer">{{newDetail.classification}}</span>
                        </div>
                        <blockquote v-html="newDetail.summary"></blockquote>
                        <div class="html-content" v-html="newDetail.content"></div>
                        <!--关联文章-->
                        <div class="article-associated">
                            
                        </div>
                        <div class="article-keywords" v-if="newDetail.tag!=null && newDetail.tag.length!=0">
                            <span class="text" style="margin-right: 10px">关键词：</span>
                            <span class="label1" v-for="(item,index) in newDetail.tag" :key="index"><i class="shape">{{item}}</i></span>
                        </div>
                        <div class="line"></div>
                        <div class="article-look">
                            <span class="praise"><i class="praise"></i>赞<span class="num">23</span></span>
                            <span class="praise"><i class="praise"></i>赞<span class="num">23</span></span>
                            <span class="praised"><i class="praise"></i>赞<span class="num">23</span></span>
                            <span class="collection"><i class="Star"></i>收藏<span class="num">1</span></span>
                            <span class="collection"><i class="Star"></i>收藏<span class="num">1</span></span>
                            <span class="collectioned"><i class="Star"></i>收藏<span class="num">1</span></span>
                            <span class="m-read"><i class="m-read"></i>手机阅读</span>
                            <div class="p1" style="height:60px;float:right;"><span style="margin-top:10px;float:left;">分享到:</span>
                                <div class="bdsharebuttonbox" style="margin-left:6px;float:left;display:inline-block;">
                                    <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
                                    <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
                                    <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
                                    <!--<a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>-->
                                    <!--<a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>-->
                                    <a href="#" class="bds_more" data-cmd="more"></a>
                                    <a class="bds_count" data-cmd="count"></a>
                                </div>
                            </div>
                            <div class="code-img hide"><img src="" width="280" height="280"></div>
                        </div>
                    </div>
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
        title:'',
        newDetail:{},
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
      this.getHotNews()
      this.getAdminUsers()
      this.getNewDetai()
      
    },
    methods: {
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
            width: 800px;
            float: left;
            /*标签样式*/
            .label{background:#ffffff;border:1px solid rgba(224,224,224,0.50);box-shadow:0px 5px 4px 0px rgba(224,224,224,0.10);width:768px;padding:21px 10px 20px 20px;/*margin-top:30px;*/overflow:hidden;}
            .label a{float:left;}
            .label a li{width:92px;height:30px;line-height:20px;color:#666;box-sizing: border-box;padding:5px;text-align: center;margin:5px;cursor:pointer;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
            .label-show{color:#3c4350;cursor:pointer;background:url("../../assets/image/border.png")no-repeat;background-position:center center;}
            .article-title{font-size:24px;color:#3c4350;line-height:34px;text-align:left;width: 800px;}
            .article-label{margin-top: 25px}
            .article-label span{margin-right: 10px}
            .article-label .category{font-size:14px;color:#389bff;text-align:left;}
            .article-label .shuxian,.article-label .article-time{font-size:14px;color:#d0d0d0;text-align:left;}
            .article-label .user-role{font-size:14px;color:#999999;text-align:left;}
            .article-label .user-role:hover{text-decoration: underline}
            .article-keywords{margin-top: 35px}
            .article-keywords .text{margin-right: 10px;font-size:13px;color:#999999;text-align:left;}
            .article-keywords span{margin-right: 20px;}
            .article-keywords .label1{font-size:12px;color:#999999;text-align:center;background:#ffffff;border:1px solid #eff2f6;border-radius:2px;height:22px;line-height: 22px;display: inline-block;padding: 0 10px}
            // .article-keywords .label1 .shape{background:url("../../images/PC/icon/Shape.png");width:16px;height:16px;display: inline-block;position: relative;top:3px;margin-right: 8px;}
            .detail-container .line{background:rgba(224,224,224,0.50);width:800px;height:1px;margin-top: 35px}
            .article-look{margin-top: 40px;font-size:14px;color:#999999;position: relative;height: 45px;border: 1px solid transparent}
            .article-look>span{display:inline-block;background:#fafafa;border-radius:2px;width:140px;height:45px;line-height: 45px;text-align: center;margin-right: 10px;cursor: pointer;background:#fafafa;
                box-shadow:inset 0px 1px 0px 0px rgba(224,224,224,0.50), inset -1px 0px 0px 0px rgba(224,224,224,0.50), inset 0px -1px 0px 0px rgba(224,224,224,0.50), inset 1px 0px 0px 0px rgba(224,224,224,0.50);vertical-align: middle}
            .article-look .praised{font-size:14px;color:#389bff;line-height:45px;vertical-align: middle;background:#ffffff;box-shadow:0px 5px 4px 0px rgba(225,225,225,0.10), inset 0px 1px 0px 0px #389bff, inset -1px 0px 0px 0px #389bff, inset 1px 0px 0px 0px #389bff, inset 0px -1px 0px 0px #389bff; }
            .article-look .collectioned{font-size:14px;color:#389bff;background:#ffffff;box-shadow:0px 5px 4px 0px rgba(225,225,225,0.10), inset 0px 1px 0px 0px #389bff, inset -1px 0px 0px 0px #389bff, inset 1px 0px 0px 0px #389bff, inset 0px -1px 0px 0px #389bff;}
            .article-look .m-readed{font-size:14px;color:#389bff;background:#ffffff;box-shadow:0px 5px 4px 0px rgba(225,225,225,0.10), inset 0px 1px 0px 0px #389bff, inset -1px 0px 0px 0px #389bff, inset 1px 0px 0px 0px #389bff, inset 0px -1px 0px 0px #389bff;}
            .article-look>span i{margin-right: 12px;display: inline-block;width: 25px;height: 26px;position: relative;top: 6px;}
            // .article-look .praised .praise{background: url("../../images/PC/icon/praised.png");}
            // .article-look .collectioned .Star{background: url("../../images/PC/icon/Stared.png");}
            // .article-look .m-readed .m-read{background: url("../../images/PC/icon/m-readed.png");}
            // .article-look span .praise{background: url("../../images/PC/icon/praise.png");}
            // .article-look span .Star{background: url("../../images/PC/icon/Star.png");}
            // .article-look span .m-read{background: url("../../images/PC/icon/m-read.png");}

            .article-look .m-readed .num,.article-look .collectioned .num,.article-look .praised .num{font-size:14px;}
            .article-look span .num{font-size:14px;color:#389bff;text-align:left;margin-left: 8px;line-height: 45px;vertical-align: middle}
            .code-img{margin: 5px 30px 30px 30px}
            .hide{display: none}
            // .img{background:url(../../images/cms/icon/img.png) no-repeat;}
            .detail-container{
                blockquote{
                    border: 0;
                    font-size: 100%;
                    font: inherit;
                    vertical-align: top;
                    position: relative;
                    margin: 0px;
                    background-color: rgba(0,0,0,0.05);
                    padding: 25px;
                    padding-left: 56px;
                    margin-bottom: 30px;
                    margin-top: 20px;
                    font-size: 16px;
                    color: #333;
                    line-height: 26px;
                }
                blockquote:before{
                    content: '“';
                    position: absolute;
                    top: 30px;
                    left: 16px;
                    font-family: "Arial";
                    font-size: 70px;
                    color: rgba(0,0,0,0.15);
                }

            } 
        
        
        }
        .right{
            width: 360px;
            float: right;
        }
    }
  }
</style>