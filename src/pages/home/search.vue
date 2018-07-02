<template>
  <div class="" id="search" v-set-title="title">
     <div class="searchbox">
          <div class="searchbtn clearfix">
             <div class="searchbtnl"><input type="text" placeholder="请输入关键字"/></div>
             <div class="searchbtnr"><i class="el-icon-search"></i> 搜索</div>
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
      
  }
    
</style>