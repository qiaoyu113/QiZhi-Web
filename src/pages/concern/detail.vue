<template>
  <div class="" id="concern_detail" v-set-title="title">
       <div class="body">
            <div class="author">
               <img class="authorimg" :src="picHead + author.hostLogo">
                <div class="authorname">{{author.hostCompany}}</div>
                <div class="authorcon">{{author.hostDesc}}</div>
                <div class="authortit clearfix">
                   <div class="authortitl"><p>粉丝 {{author.subNum==null?'0':author.subNum}} </p></div>
                   <div class="authortitr" v-if="concernstatus==3"><p>文章 {{author.addArticleNum==null?'0':author.addArticleNum}} </p></div>
                   <div class="authortitr" v-if="concernstatus==2"><p>活动 {{author.addActivityNum==null?'0':author.addActivityNum}} </p></div>

                </div>
                <div class="authorbtn2" @click="postFollow(author.id)" v-if="isFollow=='false' || isFollow==false">+ 关注</div>
                <div class="authorbtn1" @click="open2(author.id)" v-if="isFollow=='true' || isFollow==true">已关注</div>
            </div>
            <div class="division clearfix">
              <div class="divisionl" v-if="concernstatus==2">最新发表的活动</div>
              <div class="divisionl" v-if="concernstatus==3">最新发表的文章</div>
              <div class="divisionr"></div>
            </div>
            <div class="surface">
                <div class="row clearfix" v-for="list in data" v-if="concernstatus==2" @click="goactivity(list.id)">
                     <div class="rowl">
                        <img :src="picHead + list.activityPoster" />
                     </div>
                     <div class="rowr">
                         <p class="top texttop">{{list.activityTitle}}</p>
                         <!-- <p class="con">{{list.activityDetails}}</p> -->
                         <p class="text">时间：{{list.actStartTime| stampFormate2}}--{{list.actEndTime | stampFormate2}}</p>
                         <p class="text">地点：{{list.prov}}{{list.city}}{{list.dist}}{{list.activityAddress}}</p>
                         <p class="text" v-if="list.minTicketPrice!=list.maxTicketPrice">票价：<span>￥{{list.minTicketPrice | money}}--{{list.maxTicketPrice | money}}</span></p>
                         <p class="text" v-if="list.minTicketPrice==list.maxTicketPrice">票价：<span>￥{{list.minTicketPrice | money}}</span></p>

                         <!-- <p class="tim">{{list.actStartTime | stampFormate}}</p> -->
                     </div>
                </div>
                  <div class="row clearfix" v-for="list in data" v-if="concernstatus==3" @click="goarticle(list.id)">
                     <div class="rowl">
                        <img :src="picHead + list.authorHeadImg" />
                     </div>
                     <div class="rowr">
                         <p class="top">{{list.title}}</p>
                         <p class="con">{{list.summary}}</p>
                         <p class="tim">{{list.createDate | stampFormate}}</p>
                     </div>
                </div>
                <div class="nocontent" v-if="(data==null || data=='') && concernstatus==3">
                   该作者暂未发布文章
                </div>
                 <div class="nocontent" v-if="(data==null || data=='') && concernstatus==2">
                   该主办方暂未发布活动
                </div>
                <load-more :page="page.num" :total="$store.state.homeStore.page.total" :status="loadStatus" @loadMore="loadmore"></load-more>
              
            </div>
       </div>

  </div>
</template>
<script>
  import {modularService} from '../../service/modularService'
  export default {
    props: [],
    data () {
      return {
        title:'',
        page:{
           num:1,
           size:10,
           totalCount: 0,
           totalPage:0,
        },
        data:[],
        loadStatus:0,
        total:1,
        concernstatus:3,
        author:'',
        id:this.$route.query.id,//id
        isFollow:this.$route.query.isFollow, //是否关注

      }
    },
    components: {},
    computed: {
            picHead() {
                return this.$store.state.picHead
            },
            // isFollow(){
            //    return this.$route.query.isFollow
            // }
        },
    mounted () {
      window.scrollTo(0,0);
       this.getMyFollowMain()
     // console.log()
       // this.isFollows()
    },
    methods: {
      isFollows:function(){

         this.isFollow=this.$route.query.isFollow
         console.log(this.isFollow)
      },
      //活动详情页
      goactivity:function(id){
       this.$router.push({path:"/activity/"+id}) 

      },
      //文章详情页
      goarticle:function(id){
       this.$router.push({path:"/article/"+id}) 

      },
      //获取社群号信息
      getMyFollowMain (){
        let that = this;
        modularService.getMyFollowMain({type:2,adminId:that.id}).then(function (res) {
                  if(res.data.code==200){
                     console.log(res)
                      that.author=res.data.datas
                      for(let i=0;i<that.author.roles.length;i++){
                         if(that.author.roles[i]==2){
                           that.concernstatus=2
                            break;
                         }
                      }

                      if(that.concernstatus==2){
                          that.getActivities(that.author.id)
                      }else if(that.concernstatus==3){
                           that.getArticles(that.author.id)
                      }
                 
                  }
        });
      },
      
       //获取社群号活动
      getActivities (id){
        let that = this;
        modularService.getActivities({pageNo:that.page.num,pageSize:that.page.size,sortKey:'sortNumber',adminId:id,queryType:1}).then(function (res) {
                  if(res.data.code==200){
                        let newArr=res.data.datas.datas
                    that.page.totalPage = res.data.datas.totalPage
                    that.total=res.data.datas.total
                    that.page.totalCount = res.data.datas.totalCount == null ? 0 : parseInt(res.data.datas.totalCount);
                     if(newArr != null){
                       for(let i=0;i<newArr.length;i++){
                        that.data.push(newArr[i]);
                    }
                     }
                     console.log(that.data)
                    if(res.data.datas.pageNo>=res.data.datas.totalPage){
                        that.loadStatus = 2
                    }else {
                        that.loadStatus = 0
                    }
              
                 
                  }
        });
      },
        //获取社群号文章
      getArticles (id){
        let that = this;
        modularService.getArticles({pageNo:that.page.num,pageSize:that.page.size,adminId:id,queryType:1}).then(function (res) {
                  if(res.data.code==200){
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

        modularService.postFollow({adminId:id}).then(function (res) {
                  if(res.data.code==200){
                       // that.getAllAdminUser()
                        that.$message.success('关注成功');
                        that.isFollow=true
                   that.$router.push({path:"/concern/detail",query:{id:that.id,isFollow:that.isFollow}}) 
                      //  that.data=res.data.datas.datas
                  }
        });
      },
      //取消关注
       putCancleFollow(id){
          let that=this
         modularService.putCancleFollow({adminId:id}).then(function (res) {
                  if(res.data.code==200){
                     that.$message.success('取消关注成功');
                     that.isFollow=false
                   that.$router.push({path:"/concern/detail",query:{id:that.id,isFollow:that.isFollow}}) 
                    
                 
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


       loadmore(i){
                //loadstatus为加载状态，每次收到接口数据后要修改该状态
                let that = this
                that.$store.state.homeStore.loadStatus = 1
                that.page.num = i
                // that.getActivities(that.author.id)
                 if(that.concernstatus==2){
                          that.getActivities(that.author.id)
                      }else if(that.concernstatus==3){
                           that.getArticles(that.author.id)
                      }
            }
      
    }
  }
</script>
<style lang="less">
  #concern_detail{
     .body{
       width: 800px;
       margin: 0 auto;
       .author{
          margin-top: 40px;
          width: 800px;
          height: 290px;
          padding-top: 25px;
          background: #FAFAFA;
          border-radius: 2px;
          .authorimg{
             display: block;
             width: 100px;
             height: 100px;
             margin: 0 auto;
             border-radius: 50px;
          }
          .authorname{
              font-size: 16px;
              line-height: 18px;
              color: #505050;
              margin-top: 18px;
              text-align: center;
          }
          .authorcon{
             width: 400px;
             margin: 12px auto 0;
             // margin-top: 12px;
             font-size: 14px;
             line-height: 21px;
             height: 42px;
             overflow: hidden;
             color: #999;
             text-align: center;
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
                // margin-top: 14px;
                cursor: pointer;
                margin: 14px auto 0;
                width: 100px;
                height: 32px;
                background: #FFFFFF;
                border: 1px solid #389BFF;
                border-radius: 27px;
                color: #389BFF;
                text-align: center;
                font-size: 12px;
                line-height: 32px;
          }
          .authorbtn1{
                   width: 82px;
                   height: 34px;
                   margin: 0 auto;
                   border: 1px solid #20A0FF;
                   background: #fff;
                   line-height: 34px;
                   border-radius: 17px;
                   font-size: 14px;
                   color: #20A0FF;
                   margin-top: 18px;
                   text-align: center;
                   cursor: pointer;

             }
             .authorbtn2{
                   width: 82px;
                   height: 34px;
                   margin: 0 auto;
                   border: 1px solid #20A0FF;
                   // background-image: linear-gradient(-90deg, #508DFF 0%, #389BFF 34%, #26C5FE 89%, #3BB8FE 100%);
                   background-image: linear-gradient(-90deg, #3BB8FE 0%, #26C5FE 34%, #389BFF 89%, #508DFF 100%);
                   border-radius: 17px;
                   line-height: 34px;
                   font-size: 14px;
                   color: #fff;
                   margin-top: 18px;
                   text-align: center;
                   cursor: pointer;
             }
       }
       .division{
           margin-top: 30px;
           .divisionl{
              float: left;
               color: #3c4350;
               font-size: 16px;
               line-height: 45px;
               width: 130px;
           }
           .divisionr{
              float: left;
              height: 22px;
              width: 670px;
              border-bottom: 1px solid;
              border-color: -webkit-linear-gradient(90deg,#FD9366, #77B9F8) 1 30;
              border-color: -moz-linear-gradient(90deg,#FD9366, #77B9F8) 1 30;
              border-image: linear-gradient(90deg,#FD9366, #77B9F8) 1 30; 
           }
       }
       .surface{
           margin-top: 5px;
           .row{
              padding: 25px 0;
              .rowl{
                 float: left;
                 width: 262px;
                 height: 160px;
                 img{
                   height: 100%;
                   width: 100%;
                 }
              }
              .rowr{
                 float: left;
                 margin-left: 40px;
                 width: 498px;
                 .top{
                   font-size: 18px;
                   margin-top: 20px;
                   color: #3c4350;
                   line-height: 23px;
                 }
                 .con{
                   margin-top: 14px;
                   font-size: 16px;
                   color: #84898f;
                   line-height: 24px;
                   height: 48px;
                   overflow: hidden;
                   display: -webkit-box;
                   -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                 }
                 .text{
                    font-size: 16px;
                    line-height: 24px;
                    color:#84898F;
                    margin-top: 6px;
                    span{
                       color:#389BFF ;
                    }
                 }
                 .texttop{
                   margin-bottom: 15px;
                 }
                 .tim{
                   margin-top: 25px;
                   color: #999;
                   font-size: 13px;
                   line-height: 17px;
                 }
              }
           }
           .nocontent{
               text-align: center;
               color: #999;
               margin-top: 60px;
               font-size: 24px;
           }

       }
     }
      
  }
</style>