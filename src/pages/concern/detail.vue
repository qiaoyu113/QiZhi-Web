<template>
  <div class="" id="concern_detail" v-set-title="title">
       <div class="body">
            <div class="author">
               <img class="authorimg" :src="picHead + author.hostLogo">
                <div class="authorname">{{author.hostCompany}}</div>
                <div class="authorcon">{{author.hostDesc}}</div>
                <div class="authortit clearfix">
                   <div class="authortitl"><p>粉丝 {{author.subNum}} </p></div>
                   <div class="authortitr"><p>文章 110 </p></div>
                </div>
                <div class="authorbtn">+ 关注</div>
            </div>
            <div class="division clearfix">
              <div class="divisionl">最新发表的活动</div>
              <div class="divisionr"></div>
            </div>
            <div class="surface">
                <div class="row clearfix">
                     <div class="rowl">
                        <img src="../../assets/image/vipname.png" />
                     </div>
                     <div class="rowr">
                         <p class="top">How To Build A Pc</p>
                         <p class="con">A Discount Toner Cartridge Is Better Than Ever And You Will Save 50 Or More</p>
                         <p class="tim">2016-2-32</p>
                     </div>
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
        author:'',
          id:this.$route.query.id,//id

      }
    },
    components: {},
    computed: {
            picHead() {
                return this.$store.state.picHead
            },
        },
    mounted () {
       this.getMyFollowMain()
    },
    methods: {
      
      //获取所有社群号
      getMyFollowMain (){
        let that = this;
        modularService.getMyFollowMain({type:2,adminId:that.id}).then(function (res) {
             console.log(res)
                  if(res.data.code==200){
                       // that.data=res.data.datas.datas
                      // that.inde=res.data.datas.totalPage * 10
                      // console.log(that.inde)
                      that.author=res.data.datas
              
                 
                  }
        });
      },


       loadmore(i){
                //loadstatus为加载状态，每次收到接口数据后要修改该状态
                let that = this
                that.$store.state.homeStore.loadStatus = 1
                that.page.num = i
                that.getInnerletter()
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
                 .tim{
                   margin-top: 25px;
                   color: #999;
                   font-size: 13px;
                   line-height: 17px;
                 }
              }
           }

       }
     }
      
  }
</style>