<template>
  <div class="" id="activity" v-set-title="title">
    <div class="choseList">
      <div class="list">
        <div class="list_l">举办时间：</div>
        <div class="list_r" style="margin-top:0px;">
          <el-radio-group v-model="radio1" @change="search()">
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
            @change="search()">
          </el-date-picker>
        </div>
      </div>
      <div class="list">
        <div class="list_l">活动主题：</div>
        <div class="list_r">
          <el-radio-group v-model="radio2" @change="search()">
            <el-radio label="" border>全部</el-radio>
            <el-radio label="" border>备选项2</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="list list_nb">
        <div class="list_l">举办城市：</div>
        <div class="list_r">
          <el-radio-group v-model="radio2" @change="search()">
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
      <el-select v-model="select1" placeholder="">
        <el-option label="1" value="shanghai"></el-option>
        <el-option label="2" value="beijing"></el-option>
      </el-select>
      <el-checkbox-group v-model="checked1">
        <el-checkbox label="备选项1" border></el-checkbox>
        <el-checkbox label="备选项1" border></el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: [],
    data () {
      return {
        title:'活动',
        radio1:'',
        radio2:'',
        radio3:'',
        date1:'',
        select1:'1',
        checked1:[],
      }
    },
    components: {},
    mounted () {
    },
    methods: {
      search(){

      },
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
        float: left;
        margin-left: 20px;
        .el-checkbox.is-bordered{
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
      
  }
</style>