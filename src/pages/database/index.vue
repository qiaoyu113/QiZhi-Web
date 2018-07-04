<template>
  <div class="" id="database" v-set-title="title">
      <div class="box clearfix">
          <div class="boxl">
              <div class="top"><span>类型筛选</span></div>
              <div class="row clearfix" :class="index==1?'xuzhong':''" @click="dian(1)"><p class="rowl"><i class="el-icon-check"></i></p><p class="rowr">全部格式</p></div>
              <div class="row clearfix" :class="index==2?'xuzhong':''" @click="dian(2)"><p class="rowl"><i class="el-icon-check"></i></p><p class="rowr">Word文档</p></div>
              <div class="row clearfix" :class="index==3?'xuzhong':''" @click="dian(3)"><p class="rowl"><i class="el-icon-check"></i></p><p class="rowr">PPT幻灯片</p></div>
              <div class="row clearfix" :class="index==4?'xuzhong':''" @click="dian(4)"><p class="rowl"><i class="el-icon-check"></i></p><p class="rowr">Excel表单</p></div>
              <div class="row clearfix" :class="index==5?'xuzhong':''" @click="dian(5)"><p class="rowl"><i class="el-icon-check"></i></p><p class="rowr">PDF文档</p></div>
              <div class="row clearfix" :class="index==6?'xuzhong':''" @click="dian(6)"><p class="rowl"><i class="el-icon-check"></i></p><p class="rowr">图片</p></div>
              <div class="row clearfix" :class="index==7?'xuzhong':''" @click="dian(7)"><p class="rowl"><i class="el-icon-check"></i></p><p class="rowr">其他</p></div>
          </div>
          <div class="boxr">
             <div class="option">
                <div class="option1" :class="box==1?'optionbox':''" @click="borderbox(1)">开放资料</div>
                <div class="option1" :class="box==2?'optionbox':''" @click="borderbox(2)">会员资料</div>
             </div>
             <div class="form">
                <div class="thead clearfix">
                  <div class="th th1">格式</div>
                  <div class="th th2">文件</div>
                  <div class="th th3">价格</div>
                  <div class="th th4">下载量</div>
                  <div class="th th5">上传日期</div>
                  <div class="th th6">上传者</div>
                  <div class="th th7">操作</div>
                </div>
                <div class="tbody">
                   <div class="row clearfix">
                    <div class="td td1"></div>
                    <div class="td td2"><p class="td2p">《中国汽车后市场物流服务洞察报告》.pdf</p><p>3.6M</p></div>
                    <div class="td td3">免费</div>
                    <div class="td td4">0</div>
                    <div class="td td5">2018-05-30</div>
                    <div class="td td6">运联传媒</div>
                    <div class="td td7">下载</div>
                    </div>

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
          </div>
      </div>
   
  </div>
</template>
<script>
  export default {
    props: [],
    data () {
      return {
        title:'资料库',
        index:1,
        box:1,
        inde:10,
        page:{
           num:1,
           size:6,
        },
      }
    },
    components: {},
    mounted () {
    },
    methods: {
      dian:function(id){
         this.index=id
      },
      borderbox:function(id){
        this.box=id
      },
         //分页
      handleCurrentChange(val){
          this.page.num=val
          this.getMyFollow()
      },
      
    }
  }
</script>
<style lang="less">
  #database{
    .box{
       width: 1200px;
       margin: 40px auto 112px;
       .boxl{
         float: left;
         width: 270px;
         height: 426px;
         border: 1px solid rgba(224,224,224,0.50);
         box-shadow: 0px 5px 4px 0px rgba(202,202,202,0.10);
         .top{
          span{
             line-height: 45px;
             text-align: left;
             font-size: 16px;
             color: #3c4350;
          }

         }
         .row{
            height: 40px;
            cursor: pointer;
            .rowl{
               float: left;
                width: 40px;
                height: 40px;
                text-align: center;
               i{
                 display: none;
                text-align: center;
                font-size: 14px;
                color: #389bff;
                font-weight: bold;
               line-height: 40px;
               }
               
            }
            .rowr{
               color:#3c4350;
               font-size: 14px;
               line-height: 40px;
               float: left;
            }
         }
         .xuzhong{
            .rowl{i{display: block;}}
            .rowr{color: #389bff; }
         }
       } 
       .boxr{
              float: left;
               
               
               margin-left: 36px;
               .option{
                width: 890px;
                height: 70px;
               border: 1px solid rgba(224,224,224,0.50);
               box-shadow: 0px 5px 4px 0px rgba(224,224,224,0.10);
               }
               .option1{
                    float: left;
                    width: 102px;
                    line-height: 40px;
                    margin-top: 15px;
                    height: 40px;
                    margin-left: 20px;
                    color: #666;
                    text-align: center;
                    cursor: pointer;
               }
               .optionbox{
                  height: 38px;
                  width: 100px;
                  line-height: 38px;
                  border:1px solid;
                  border-color: -webkit-linear-gradient(90deg,#FD9366, #77B9F8) 1 30;
                  border-color: -moz-linear-gradient(90deg,#FD9366, #77B9F8) 1 30;
                  border-image: linear-gradient(90deg,#FD9366, #77B9F8) 1 30; 
               }
               .form{
                  margin-top: 25px;
                  .thead{
                     background: #fafafa;
                     box-shadow: inset 0px -1px 0px 0px rgba(224,224,224,0.50);
                     height: 50px;
                     width: 890px;
                     .th{
                        float: left;
                        color: #999;
                        line-height: 50px;
                        margin-left: 20px;
                     }
                     .th1{ width: 60px;}
                     .th2{ width: 298px;}
                     .th3{ width: 58px;}
                     .th4{ width: 66px;}
                     .th5{ width: 104px;}
                     .th6{ width: 104px;}
                     .th7{ width: 50px;}
                   }
                   .tbody{
                    .row{
                      height: 87px;
                      box-shadow: inset 0px -1px 0px 0px rgba(224,224,224,0.50);
                      .td{
                         float: left;
                         height: 87px;
                         margin-left: 20px;
                         line-height: 87px;
                         font-size: 14px;
                         color: #999;
                      }
                     .td1{ width: 60px;}
                     .td2{ width: 298px;line-height: 42px;
                      .td2p{color: #333;}}
                     .td3{ width: 58px;color: #50c87e;}
                     .td4{ width: 66px;}
                     .td5{ width: 104px;}
                     .td6{ width: 104px;}
                     .td7{ width: 50px;}


                    }

                   }
               }
               .v_paging{
                 margin-top: 20px;
               }

       }
     }
    }
</style>