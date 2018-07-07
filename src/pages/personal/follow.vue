<template>
  <div class="" id="follow" v-set-title="title">
    
    <div class="title clearfix">
      <div class="titleli"><p :class="titlep==1?'v_p':''" @click="titleindex(1)">作者</p></div>
      <div class="titleli"><p :class="titlep==2?'v_p':''" @click="titleindex(2)">主办方</p></div>
    </div>
    <div class="box clearfix">
       <div class="row" v-for="list in data" @click="goconcernDetail(list.id,true)" :style="{backgroundImage: 'url(' + picHead + list.hostLogo + ')'}">
          <div class="rowbackimg">
           <div class="rowimg"><img :src="picHead + list.hostLogo" /></div>
           <div class="rowtitle">{{list.hostCompany}}</div>
           <div class="rowcon">{{list.hostDesc}}</div>
           <div class="rowlabel clearfix">
             <div class="rowlabell"><p>粉丝 {{list.subNumw==null?'0':list.subNumw}} </p></div>
             <div class="rowlabelr"><p> 文章 {{list.addArticleNum==null?'0':list.addArticleNum}} </p></div>
           </div>
           <div class="rowbtn2" @click="open2(list.id)">取消关注</div>
           </div>
       </div>
      
    </div>
       <!--分页-->
    <div class="v_paging" v-if="inde>10">
        <el-pagination
            background
           layout="prev, pager, next, jumper"
           @current-change="handleCurrentChange"
           :total="inde">
    </el-pagination>
   </div>
   
  </div>
</template>
<script>
  import {modularService} from '../../service/modularService'
  export default {
    props: [],
    data () {
      return {
        title:'消息通知',
        titlep:1,
        inde:10,
        page:{
           num:1,
           size:6,
        },
        data:'',
      }
    },
    computed: {
            picHead() {
                return this.$store.state.picHead
            },
        },
    mounted () {
           this.getMyFollow()
    },
    methods: {
      titleindex:function(index){
              this.titlep=index
              this.page.num=1
              this.getMyFollow()
      },
      goconcernDetail:function(id,isFollow){
        // console.log(id)
        // return false
          this.$router.push({path:"/concern/detail",query:{id:id,isFollow:isFollow}}) 
          // this.$router.replace({name:'concernDetail'})
      },
       //分页
      handleCurrentChange(val){
          this.page.num=val
          this.getMyFollow()
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
       //获取我的关注
      getMyFollow (){
        let that = this;
        modularService.getMyFollow({pageNo: that.page.num, pageSize:that.page.size,adminType:that.titlep,type:true}).then(function (res) {
             console.log(res)
             console.log(1)
                  if(res.data.code==200){
                       that.data=res.data.datas.datas
                      that.inde=res.data.datas.totalPage * 10
                      // console.log(that.inde)
                  }
        });
      },
      putCancleFollow(id){
          let that=this
         modularService.putCancleFollow({adminId:id}).then(function (res) {
             console.log(res)
                  if(res.data.code==200){
                     that.$message.success('取消关注成功');
                     that.getMyFollow()
                 
                  }
        });

      }
    }
  }
</script>
<style lang="less">
  #follow{
    .title{
       height: 60px;
       background: #FFFFFF;
       width: 100%;
         border: 1px solid #EEEEEE;
         border-radius: 6px;
         .titleli{
           float: left;
           padding: 0 30px;
           p{
            font-size: 18px;
            color: #999;
            line-height: 58px;
            cursor: pointer;
            
            // box-sizing: border-box;
            // box-sizing: content-box;
           }
           .v_p{
             line-height: 58px;
             border-bottom: 2px solid #000;
           }
         }
    }
    .box{
      padding: 5px 0 40px;
      .row{
         float: left;
         width: 277px;
         height: 314px;
         // padding:26px 16px 0;
         margin-top: 20px;
         margin-right: 20px;
         // background-image: url("../../assets/image/hot.png");
         background-size: 100% 100%;
         border-radius: 2px;
         cursor: pointer;
             .rowimg{
              // padding-top: 26px;
              // padding-top:26px;
              width: 60px;
              height: 60px;
              margin: 26px auto 0;
              border-radius: 50%;
              overflow: hidden;
                img{
                   width: 100%;
                   height: 100%;
                }
             }
             .rowtitle{
                 
                 font-size: 16px;
                 color: #333333;
                 line-height: 18px;
                 margin-top: 15px;
                 text-align: center;
             }
             .rowcon{
               padding: 0 16px;
                 font-size: 14px;
                 color: #999999;
                 margin-top: 11px;
                 line-height: 21px;
                 height: 42px;
                 overflow: hidden;
             }
             .rowlabel{
               margin-top: 35px;
               width: 100%;
               // height: 19px;
               .rowlabell{
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
               .rowlabelr{
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
             .rowbtn{
                   // width: 100px;
                   // height: 34px;
                   // margin: 0 auto;
                   // border: 1px solid;
                   // border-color: -webkit-linear-gradient(90deg,#FD9366, #77B9F8) 1 30;
                   // border-color: -moz-linear-gradient(90deg,#FD9366, #77B9F8) 1 30;
                   // border-image: linear-gradient(90deg,#FD9366, #77B9F8) 1 30;
                   // line-height: 34px;
                   // font-size: 14px;
                   // color: #3c4350;
                   // margin-top: 18px;
                   // text-align: center;
                   // cursor: pointer;
             }
             .rowbtn1{
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
             .rowbtn2{
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

            .rowbackimg{
               background: #fff;
               width: 100%;
               height: 100%;
               border: 1px solid rgba(224,224,224,0.50);
               box-shadow: 0 5px 4px 0 rgba(202,202,202,0.10);
                border-radius: 2px;
            }
      }
      .row:hover .rowbackimg{

           background: rgba(221,243,255,0.7);
      }
      .row:nth-child(3n+3){
         margin-right: 0;
      }
    }
        
      
     }
</style>