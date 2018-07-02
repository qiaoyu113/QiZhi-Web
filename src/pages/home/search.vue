<template>
  <div class="" id="search" v-set-title="title">
     <div class="searchbox">
          <div class="searchbtn clearfix">
             <div class="searchbtnl"><input type="text" placeholder="请输入关键字"/></div>
             <div class="searchbtnr"><i class="el-icon-search"></i> 搜索</div>
          </div>
     </div>
     <div class="box1">
         <div class="row">
           <div class="rowtit">离职员工：云鸟问题多，高管离职寻求买家！CEO称正常情况</div>
           <div class="rowbtm">
              <div class="rowbtml"><img src="../../assets/image/vipname.png" /></div>
              <div class="rowbtmr">
                  <div class="rowbtmrp">离职员工称：云鸟内部管理混乱，高管大批离职，公司正在寻求买家。CEO对此回应称：确实有部分员工离职，不过处于正常范围，且融资在路上。</div>
                  <div class="rowbtmrb clearfix">
                      <div class="labelli">云鸟</div>
                      <div class="tim">2018-07-02</div>
                  </div>
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
        title:'搜索页'
      }
    },
    components: {},
    mounted () {
    },
    methods: {
      
    }
  }
</script>
<style lang="less">
  #search{
    .searchbox{
      background: #fafafa;
      width: 100%;
      height: 188px;
      box-shadow: inset 0px -1px 0px 0px #dddddd; 
      .searchbtn{
          width: 800px;
          padding-top: 60px;
          margin: 0 auto;
          .searchbtnl{
             float: left;
             input{
              width: 658px;
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
          }
      }
    }
    .box1{
         
       }
    }
    
</style>