<template>
  <div class="" id="activity">
    <div class="choseList">
      <div class="list">
        <div class="list_l">举办时间：</div>
        <div class="list_r" style="margin-top:0px;">
          <el-radio-group v-model="radio1" @change="search(1)">
            <el-radio label="" border>全部</el-radio>
            <el-radio label="today" border>今天</el-radio>
            <el-radio label="tomorrow" border>明天</el-radio>
            <el-radio label="week" border>本周</el-radio>
            <el-radio label="weekend" border>本周末</el-radio>
            <el-radio label="month" border>本月</el-radio>
          </el-radio-group>
          <el-date-picker
            v-model="date1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="search(2)"
            format="yyyy - MM - dd "
            value-format="timestamp">
          </el-date-picker>
        </div>
      </div>
      <div class="list">
        <div class="list_l">活动主题：</div>
        <div class="list_r">
          <el-radio-group v-model="radio2" @change="search()">
            <el-radio label="" border>全部</el-radio>
            <el-radio :label="item.id" border v-for="(item,index) in articleTypes" :key="index">{{item.tagName}}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="list list_nb">
        <div class="list_l">举办城市：</div>
        <div class="list_r">
          <el-radio-group v-model="radio3" @change="search()">
            <el-radio label="" border>全部</el-radio>
            <el-radio label="北京" border>北京</el-radio>
            <el-radio label="上海" border>上海</el-radio>
            <el-radio label="广州" border>广州</el-radio>
            <el-radio label="深圳" border>深圳</el-radio>
            <el-radio label="杭州" border>杭州</el-radio>
            <el-radio label="成都" border>成都</el-radio>
            <el-radio label="南京" border>南京</el-radio>
            <el-radio label="苏州" border>苏州</el-radio>
            <el-radio label="武汉" border>武汉</el-radio>
            <el-radio label="天津" border>天津</el-radio>
            <el-radio label="重庆" border>重庆</el-radio>
            <el-radio label="西安" border>西安</el-radio>
            <el-radio label="厦门" border>厦门</el-radio>
            <el-radio label="宁波" border>宁波</el-radio>
            <el-radio label="郑州" border>郑州</el-radio>
            <el-radio label="青岛" border>青岛</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="secondList">
      <el-select v-model="select1" placeholder="" @change="search()">
        <el-option label="置顶活动" value="publishTime"></el-option>
        <el-option label="最新发布" value="actEndTime"></el-option>
        <el-option label="热门点击" value="actReadNum"></el-option>
        <el-option label="最多参与" value="sortNumber"></el-option>
      </el-select>
      <el-checkbox-group v-model="checked1" @change="search()">
        <el-checkbox label="0" border>仅免费</el-checkbox>
        <img v-if="checked1.length==0" class="wxzimg" src="../../assets/image/wxz.png" alt="">
        <img v-if="checked1.length!=0" class="wxzimg" src="../../assets/image/xz.png" alt="">
      </el-checkbox-group>
      <el-checkbox-group v-model="checked2" @change="search()">
        <el-checkbox label="1" border>报名中</el-checkbox>
        <img v-if="checked2.length==0" class="wxzimg" src="../../assets/image/wxz.png" alt="">
        <img v-if="checked2.length!=0" class="wxzimg" src="../../assets/image/xz.png" alt="">
      </el-checkbox-group>
      <el-input
        @change="search()"
        class="search_input"
        placeholder="搜索活动关键字"
        suffix-icon="el-icon-search"
        v-model="input1">
      </el-input>
    </div>
    <div class="activityList">
      <act-list v-for="(item,key) in actLists" :item="item" :key="key"></act-list>
    </div>
    <div>
      <el-pagination
        v-if="$store.state.homeStore.totalCount>9"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="$store.state.homeStore.page.pageNo"
        :page-size="9"
        layout="prev, pager, next, jumper"
        :total="$store.state.homeStore.totalCount">
      </el-pagination>
    </div>
    
  </div>
</template>
<script type="text/ecmascript-6">
import actList from '../../component/list/act-list.vue'
import {indexService} from '../../service/indexService'
  export default {
    components: {actList:actList},
    props: [],
    // 添加以下代码
    metaInfo () {
        const title = this.title
        return {
            title
        }
    },
    asyncData({store,route}){
      function getType(){
          return indexService.getDictionaries({type:5}).then(function (res) {
            store.state.homeStore.actClass = res.data.datas
          });
      }
      store.state.homeStore.page = {pageNo:1,pageSize:9}
      function getarticleList(){
          return indexService.getActList(store.state.homeStore.page).then(function (res) {
              store.state.homeStore.totalAct = res.data.datas
              store.state.homeStore.totalCount = res.data.datas.totalCount*1
              store.state.homeStore.activityList = res.data.datas.datas
              store.state.homeStore.page.total = res.data.datas.totalPage
              store.state.homeStore.page.pageNo = res.data.datas.pageNo
          });
      }
      return Promise.all([
          getarticleList(),getType()
      ])
    },
    computed:{
         //将存在store中的数据取出
         // getter
         // setter
        articleTypes:{
            get: function(){ return this.$store.state.homeStore.actClass},
            set: function(newValue){return newValue}
        },
        actLists: {
            get: function () { return this.$store.state.homeStore.activityList || []},
            set: function (newValue) {return newValue}
        },
    },
    data () {
      return {
        title:'活动',
        radio1:'',
        radio2:'',
        radio3:'',
        date1:[],
        select1:'publishTime',
        checked1:[],
        checked2:[],
        currentPage3: 5,
        datas:null,
        size:9,
        input1:'',
      }
    },
    mounted () {
      console.log(this.$store.state.homeStore.totalAct)
      window.scrollTo(0,0);
      
    },
    methods: {
      search(item){
        if(item == 1){this.date1 = []}// 先判断时间选择
        if(item == 2){this.radio1 = ''}
        this.getarticleList(1)
      },
      getarticleList(num){
        console.log('时间',this.date1)
        const that = this
        let start = ''  //开始时间
        let end = ''  //结束时间
        let free = '' //是否免费
        let begin = ''  //正在报名中
        if(that.date1.length!=0){start=that.date1[0],end=that.date1[1]}
        if(that.checked1.length!=0){free=that.checked1[0]}
        if(that.checked2.length!=0){begin=that.checked2[0]}
        that.$store.state.homeStore.page = {pageNo:num,pageSize:9,sortKey:that.select1,query:that.input1,city:that.radio3,startTime:start,endTime:end,actThemeId:that.radio2,time:that.radio1,actApplyStauts:begin,actCostType:free}
        indexService.getActList(that.$store.state.homeStore.page).then(function (res) {
          console.log(that.$store.state.homeStore.totalAct)
          that.$store.state.homeStore.totalAct = res.data.datas
          that.$store.state.homeStore.totalCount = res.data.datas.totalCount*1
          that.$store.state.homeStore.activityList = res.data.datas.datas
          that.$store.state.homeStore.page.total = res.data.datas.totalPage
          that.$store.state.homeStore.page.pageNo = res.data.datas.pageNo
        });
      },
      handleSizeChange(val) {
        this.getarticleList(val)
        
      },
      handleCurrentChange(val) {
        this.getarticleList(val)
      }
    }
  }
</script>
<style lang="less">
  #activity{
    .choseList{
      margin: 49px auto 30px;
      width: 1180px;
      height: 163px;
      padding: 10px 11px;
      background: #FFFFFF;
      border: 1px solid #EAEAEA;
      .list_nb{
        box-shadow: none !important;
      }
      .list{
        min-height: 55px;
        line-height: 55px;
        background: #FFFFFF;
        overflow: hidden;
        box-shadow: inset 0 -1px 0 0 #F5F5F5;
        .list_l{
          float: left;
          width: 100px;
          text-align: center;
          font-size: 16px;
          color: #555555;
        }
        .list_r{
          float: left;
          width: 1080px;
          height: auto;
          margin-top: 14px;
          // 单选框
          .el-radio.is-bordered:hover{
            background: #F6F6F6;
          }
          .el-radio__input{
            display: none;
          }
          .el-radio__label{
            padding-left: 0px;
          }
          .el-radio__input.is-checked+.el-radio__label{
            color:#fff;
            padding-left: 0px !important;
            line-height: 20px;
          }
          .el-radio.is-bordered.is-checked{
            background: #409eff;
            border: none;
          }
          .el-radio.is-bordered{
            border: none;
            padding: 4px 10px;
            border-radius: 2px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            height: 28px;
            line-height: 21px;
          }
          // 时间选择器
          .el-date-editor.el-input, .el-date-editor.el-input__inner{
            top: 0px !important;
            border-radius: 2px;
            height: 30px;
            left: 35px;
          }
          .el-date-editor .el-range-separator,.el-date-editor .el-range__close-icon{
            line-height: 22px;
          }
          .el-date-editor .el-range__icon{
            line-height: 22px;
          }
        }
      }
    }
    .secondList{
      margin:0px auto;
      width: 1200px;
      height: 40px;
      .el-select{
        float: left;
        .el-input__inner{
          height: 38px;
          line-height: 38px;
          width: 190px;
          border-radius:2px;
        }
      }
      .el-checkbox-group{
        position: relative;
        overflow: hidden;
        float: left;
        margin-left: 20px;
        .el-checkbox.is-bordered{
          padding: 9px 60px 9px 10px;
          border-radius: 2px;
          height: 38px;
        }
        .el-checkbox.is-bordered+.el-checkbox.is-bordered{
          margin-left: 20px;
        }
        .el-checkbox__input{
          display: none;
        }
      }
    }
    .search_input{
      width: 220px;
      float: right;
      .el-input__inner{
        height: 35px;
      }
      .el-input__icon{
        line-height: 35px;
      }
    }
    .wxzimg{
      position: absolute;
      right:1;
      top: 1;
    }
    .activityList{
      overflow: hidden;
    }
    .activityList:nth-child(3n){
      width: 1202px;
      margin: 0 auto;
      padding-right:0px !important;
    }
    .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
        background-color: #fff;
        color: #606266;
        min-width: 30px;
        border: 1px solid #EAEAEA;
        border-left: none;
        width: 37px;
        border-radius: 0px;
        margin: 0;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #409EFF;
        color:#fff;
        border: none !important;
      }
      .el-pagination .btn-prev{
        border-left: 1px solid #EAEAEA !important;
      }
      .el-pagination{
        width: 1200px;
        margin:40px auto;
        
        text-align: left;
      }
      .el-pagination__editor.el-input .el-input__inner{
        width: 37px;
        border-radius: 0px;
      }
      .el-radio__label{font-size:14px;}
      
  }
</style>