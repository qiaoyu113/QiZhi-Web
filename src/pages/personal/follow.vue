<template>
  <div class="" id="follow" v-set-title="title">
    
    <div class="title clearfix">
    	<div class="titleli"><p :class="titlep==1?'v_p':''" @click="titleindex(1)">作者</p></div>
    	<div class="titleli"><p :class="titlep==2?'v_p':''" @click="titleindex(2)">主办方</p></div>
    </div>
    <div class="box clearfix">
       <div class="row" v-for="list in data">
       	   <div class="rowimg"><img src="../../assets/image/hot.png" /></div>
       	   <div class="rowtitle">{{list.hostCompany}}</div>
       	   <div class="rowcon">{{list.hostDesc}}</div>
       	   <div class="rowlabel clearfix">
       	   	 <div class="rowlabell"><p>粉丝 {{list.subNumw}} </p></div>
       	   	 <div class="rowlabelr"><p> 文章 110 </p></div>
       	   </div>
       	   <div class="rowbtn" @click="open2(list.id)">取消关注</div>
       </div>
      

     
     
    </div>
       <!--分页-->
    <div class="v_paging">
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
    components: {},
    mounted () {
           this.getMyFollow()
    },
    methods: {
    	titleindex:function(index){
              this.titlep=index
              this.page.num=1
              this.getMyFollow()
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
  			 width: 251px;
  			 height: 282px;
  			 padding:26px 16px 0;
  			 margin-top: 20px;
  			 margin-right: 20px;
  			 background: #FFFFFF;
             border: 1px solid rgba(224,224,224,0.50);
             box-shadow: 0 5px 4px 0 rgba(202,202,202,0.10);
             border-radius: 2px;
             .rowimg{
             	width: 60px;
             	height: 60px;
             	margin: 0 auto;
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
                   width: 100px;
                   height: 34px;
                   margin: 0 auto;
                   border: 1px solid;
                   border-color: -webkit-linear-gradient(90deg,#FD9366, #77B9F8) 1 30;
                   border-color: -moz-linear-gradient(90deg,#FD9366, #77B9F8) 1 30;
                   border-image: linear-gradient(90deg,#FD9366, #77B9F8) 1 30;
                   line-height: 34px;
                   font-size: 14px;
                   color: #3c4350;
                   margin-top: 18px;
                   text-align: center;
                   cursor: pointer;
             }
  		}
  		.row:nth-child(3n+3){
  			 margin-right: 0;
  		}
  	}
  	    
      
     }
</style>