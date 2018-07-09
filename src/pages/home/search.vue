<template>
  <div class="" id="search" v-set-title="title">
      <!--暂无-->
     <div class="searchbox">
          <div class="searchbtn clearfix">
             <div class="searchbtnl"><input type="text" v-model="findText" placeholder="搜索你想知道的" @keyup.enter="find()"/></div>
             <div class="searchbtnr" @click="find()"><i class="el-icon-search"></i> 搜索</div>
          </div>
         <div class="searchList">
             <li :class="check == i ? 'check':''" v-for="(item,i) in searchList" @click="btnSearchList(i)">{{item.name}}</li>
         </div>
     </div>
      <!--<div :class="check == 3 || check == 4 ? 'searchResult2' : 'searchResult'">-->
      <div :class="check == 2 || check == 3 ? 'searchResult2' : 'searchResult'">
          <div class="none" v-if="articleList.length == 0" >暂无相关内容</div>
          <!--文章-->
          <home-list v-if="check == 0" v-for="(item,index) in articleList" :item="item" :key="index"></home-list>
          <!--活动-->
          <activityList v-if="check == 1" v-for="(item,index) in articleList" :item="item" :key="index"></activityList>
          <!--付费读-->
          <!--<readList v-if="check == 2" v-for="(item,index) in articleList" :item="item" :key="index"></readList>-->
          <!--作者-->
          <!--<authorList v-if="check == 3 || check == 4" v-for="(item,index) in articleList" :item="item" :key="index"></authorList>-->
          <authorList v-if="check == 2 || check == 3" v-for="(item,index) in articleList" :item="item" :key="index"></authorList>
      </div>
      <!--分页-->
      <div class="v_paging">
          <el-pagination
                  background
                  layout="prev, pager, next, jumper"
                  @current-change="handleCurrentChange"
                  :total="page.num * 10">
          </el-pagination>
      </div>
  </div>
</template>
<script>
    import {indexService} from '../../service/indexService'
    import homeList from '../../component/list/home-list.vue'
    import readList from '../../component/list/read-list.vue'
    import activityList from '../../component/list/activity-list.vue'
    import authorList from '../../component/list/author-list.vue'
    export default {
      props: [],
      data () {
        return {
          title:'搜索页',
            searchList:[
                {
                    name:'文章',
                    key:''
                },
                {
                    name:'活动',
                    key:''
                },
//                {
//                    name:'付费读',
//                    key:''
//                },
                {
                    name:'作者',
                    key:''
                },
                {
                    name:'主办方',
                    key:''
                },
            ],
            check:0,
            articleList:[],
            page: { // 分页
                num: 1,
                size:10,
                totalCount: 0,
                totalPage:0
            },
            aClassId:'',
            findText:''
        }
      },
        components: {homeList:homeList,'readList':readList,'activityList':activityList,'authorList':authorList},
        common:function(){

        },
        mounted () {
            let that = this;
            let type = that.$route.query.type
            if(type){
                that.check = type;
                that.articleList = [];
                that.page.num = 1;
                if(type == 0){
                    that.article()
                }else if(type == 1){
                    that.active()
                }else if(type == 2){
//                    that.articlePay()
                    that.author(1)
                }else if(type == 3){
//                    that.author(1)
                    that.author(2)
                }else if(type == 4){
                    that.author(2)
                }
            }else{
                that.article()
            }

        },
        methods: {
            //搜索
            find:function(){
              let that = this;
              that.btnSearchList(that.check)
            },
            //分页
            handleCurrentChange(val){
                let that = this;
                that.page.num=val
                that.articleList = [];
                if(that.check == 0){
                    that.article()
                }else if(that.check == 1){
                    that.active()
                }
            },
            btnSearchList:function(i){
                let that = this;
                that.check = i;
                that.$router.replace({name:'search',query:{type:i}})
                that.articleList = [];
                that.page.num = 1;
                if(i == 0){
                    that.article()
                }else if(i == 1){
                    that.active()
                }else if(i == 2){
//                    that.articlePay()
                    that.author(1)
                }else if(i == 3){
//                    that.author(1)
                    that.author(2)
                }else if(i == 4){
                    that.author(2)
                }
            },
            //文章请求
            article:function(){
                let that = this;
                indexService.getArticles({
                    pageNo:that.page.num,
                    pageSize:that.page.size,
                    queryType:1,
                    query:that.findText
                }).then(function (res) {
                    if(res.data.success){
                        let tabInfo = res.data.datas.datas;
                        that.page.totalPage = tabInfo.totalPage
                        that.page.totalCount = tabInfo.totalCount == null ? 0 : parseInt(tabInfo.totalCount);
                        that.page.totalCount = tabInfo.totalCount == null ? 0 : parseInt(tabInfo.totalCount);
                        that.articleList = tabInfo
                        that.page.num = res.data.datas.totalPage
                    }
                });
            },
            //活动请求
            active:function(){
                let that = this;
                indexService.getActList({
                    pageNo:that.page.num,
                    pageSize:that.page.size,
                    query:that.findText
                }).then(function (res) {
                    let tabInfo = res.data.datas.datas;
                    that.articleList = tabInfo
                    that.page.num = res.data.datas.totalPage
                });
            },
            //付费读
            articlePay:function(){
                let that = this;
                indexService.getColumns({
                    queryType:3,
                    pageNo:that.page.num,
                    pageSize:that.page.size,
                    query:that.findText
                }).then(function (res) {
                    let tabInfo = res.data.datas.datas;
                    that.articleList = tabInfo
                    that.page.num = res.data.datas.totalPage
                });
            },
            //付费读
            author:function(num){
                let that = this;
                indexService.getAuthor({
                    adminType:num,
                    pageNo:that.page.num,
                    pageSize:that.page.size,
                    hostCompany:that.findText
                }).then(function (res) {
                    let tabInfo = res.data.datas.datas;
                    that.articleList = tabInfo
                    that.page.num = res.data.datas.totalPage
                });
            },
        }
    }
</script>
<style lang="less">
  #search{
      min-height: 0px;
      .none{
          width:100%;
          height:200px;
          line-height:200px;
          text-align: center;
          color: #999;
      }
      .v_paging{
          margin-top:30px;
          text-align: right;
      }
      .searchbox{
        background: #fafafa;
        width: 100%;
        height: 188px;
        box-shadow: inset 0px -1px 0px 0px #dddddd;
          .searchbtn{
            width: 720px;
            padding-top: 60px;
            margin: 0 auto;
            .searchbtnl{
               float: left;
               input{
                width: 600px;
                border: 1px solid #e1e1e1;
                height: 43px;
                line-height: 43px;
                padding: 0 10px;

               }

            }
            .searchbtnr{
               float: left;
               width: 120px;
               height: 43px;
               line-height: 43px;
               text-align: center;
               background: #389bff;
               color: #fff;
               font-size: 16px;
                cursor: pointer;
            }
        }
          .searchList{
              width:650px;
              overflow: hidden;
              margin:auto;
              margin-top: 33px;
              li{
                  float:left;
                  width:130px;
                  height:50px;
                  line-height:50px;
                  font-size: 16px;
                  color: #3C4350;
                  text-align: center;
                  cursor: pointer;
              }
              .check{
                  border-bottom:2px solid #389BFF;
                  color:#389BFF;
              }
          }
        }
      .searchResult2{
          width:900px;
          margin:auto;
          overflow: hidden;
          padding-bottom:10px;
      }
      .searchResult{
          width:800px;
          margin:auto;
          .searchResultList{
              overflow: hidden;
              margin:25px 0;
              img{
                  width:262px;
                  height:160px;
                  float:left;
              }
              .searchResultRight{
                  width:calc(800px - 262px);
                  height:160px;
                  float:left;
                  padding-left:36px;
                  box-sizing: border-box;
                  position: relative;
                  .searchResultName{
                      font-size: 18px;
                      line-height: 25px;
                      color: #000000;
                      overflow:hidden;
                      text-overflow:ellipsis;
                      display:-webkit-box;
                      -webkit-box-orient:vertical;
                      -webkit-line-clamp:2;
                  }
                  .searchResultInfo{
                      margin-top:8px;
                      font-size: 12px;
                      color: #84898F;
                      line-height: 21px;
                      overflow:hidden;
                      text-overflow:ellipsis;
                      display:-webkit-box;
                      -webkit-box-orient:vertical;
                      -webkit-line-clamp:2;
                  }
                  .searchResultLabel{
                      position: absolute;
                      bottom:0;
                  }
              }
          }
      }
  }
    
</style>