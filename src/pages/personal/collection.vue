<template>
  <div class="" id="collection" v-set-title="title">
    
    <div class="title clearfix">
    	<div class="titleli"><p :class="titlep==1?'v_p':''" @click="titleindex(1)">文章</p></div>
    	<div class="titleli"><p :class="titlep==3?'v_p':''" @click="titleindex(3)">活动</p></div>
    	<!-- <div class="titleli"><p :class="titlep==4?'v_p':''" @click="titleindex(4)">付费读</p></div> -->
    </div>
    <div class="box">
        <div class="row clearfix" v-for="list in data">
        	 <div class="rowl" @click="godetails(list.typeId)"><img :src="picHead + list.cover"/></div>
        	 <div class="rowr">
        	 	 <p class="h3" @click="godetails(list.typeId)">{{list.title}}</p>
        	 	 <p class="conp">{{list.collectTime | stampFormate2}}</p>
        	 	 <p class="cancel" @click="open2(list)">取消收藏</p>
        	 </div>
        </div>
        <div class="ts" v-if="prompt!=''">{{prompt}}</div>
        <load-more :page="page.num" :total="$store.state.homeStore.page.total" :status="loadStatus" @loadMore="loadmore"></load-more>
    	
    </div>
    
   
  </div>
</template>
<script>
  import {modularService} from '../../service/modularService'
  export default {
    props: [],
    data () {
      return {
        title:'我的收藏',

        titlep:1,
         page: { // 分页
                    num: 1,
                    size:10,
                    totalCount: 0,
                    totalPage:0
                },
        data:[],
        prompt:'',
        loadStatus:0,
        total:1,
      }
    },
    computed: {
       
            picHead() {
                return this.$store.state.picHead
            },
        },
    mounted () {
      this.getUsersCollects()

    },
    methods: {
    	titleindex:function(index){
              this.titlep=index
              this.page.num=1
              this.data=[]
              this.getUsersCollects()
    	},
      open2(list) {
        this.$confirm('是否取消收藏?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.postCollects(list)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
  
      //取消收藏
      postCollects (list){
        let that = this;
        if(that.titlep == 1){
           modularService.postArticlesIdCollect(list.typeId,{type:0}).then(function (res) {
                  if(res.data.code==200){
                     that.page.num=1
                     that.data=[]
                     that.getUsersCollects()
                  }
        });
         }else if(that.titlep == 3){
           
           modularService.postActivitiesIdCollect(list.typeId,{type:0}).then(function (res) {
                  if(res.data.code==200){
                     that.page.num=1
                     that.data=[]
                     that.getUsersCollects()
                  }
        });
         }
       

       
        
      },

      //获得收藏
      getUsersCollects (){
        let that = this;
        modularService.getUsersCollect({pageNo: that.page.num, pageSize:that.page.size,type:that.titlep}).then(function (res) {
                  if(res.data.code==200){
                     let newArr=res.data.datas.datas
                    that.page.totalPage = res.data.datas.totalPage
                    that.total=res.data.datas.total
                    that.page.totalCount = res.data.datas.totalCount == null ? 0 : parseInt(res.data.datas.totalCount);
              for(let i=0;i<newArr.length;i++){
                        that.data.push(newArr[i]);
                    }
                    if(res.data.datas.pageNo>=res.data.datas.totalPage){
                        that.loadStatus = 2
                    }else {
                        that.loadStatus = 0
                    }
                    if(that.data==''||that.data==null){
                        that.prompt='暂无收藏'
                    }else{
                       that.prompt=''
                    }
                  }
        });
      },
      godetails:function(id){
         let that=this
           if(that.titlep==1){
             that.$router.push({name:"passage",params:{id:id}}) 
           }else{
              that.$router.push({name:"activityDetail",params:{id:id}}) 
           }
      },

      loadmore(i){
                //loadstatus为加载状态，每次收到接口数据后要修改该状态
                let that = this
                that.$store.state.homeStore.loadStatus = 1
                that.page.num = i
                that.getUsersCollects()
            }

      
    }
  }
</script>
<style lang="less">
  #collection{
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
  		 width: 100%;
  		 .row{
  		 	 padding: 25px 0;
  		 	 background: #FFFFFF;
             box-shadow: inset 0 -1px 0 0 #DDDDDD;
  		 	 // border-bottom: 1px solid 
  		 	 .rowl{
  		 	 	 float: left;
  		 	 	 width: 224px;
  		 	 	 height: 150px;
           cursor: pointer;
  		 	 	 img{
  		 	 	 	 width: 100%;
  		 	 	 	 height: 100%;
  		 	 	 }
  		 	 }
  		 	 .rowr{
  		 	 	 float: left;
  		 	 	 margin-left: 25px;
  		 	 	 // width: calc(900 - 249px);
  		 	 	 width: 650px;
  		 	 	 height: 150px;
  		 	 	 position: relative;
  		 	 	 .h3{
  		 	 	 	 font-weight: 700;
  		 	 	 	 font-size: 16px;
  		 	 	 	 color: #303030;
  		 	 	 	 line-height: 50px;
             cursor: pointer;
  		 	 	 }
  		 	 	 .conp{
  		 	 	 	 font-size: 14px;
  		 	 	 	 color: #999999;
  		 	 	 	 line-height: 24px;
  		 	 	 	 height: 72px;
             margin-top: 70px;
  		 	 	 	 overflow : hidden;
                     text-overflow: ellipsis;
                     display: -webkit-box;
                     -webkit-line-clamp: 3;
                     -webkit-box-orient: vertical;
  		 	 	 }
  		 	 	 .cancel{
  		 	 	 	  color: #20a0ff;
  		 	 	 	  position: absolute;
  		 	 	 	  right: 0;
  		 	 	 	  bottom: 0;
  		 	 	 	  cursor: pointer;
  		 	 	 }

  		 	 }

  		 } 
       .ts{
           margin-top: 40px;
           text-align: center;
           font-size: 16px;
           color: #999;
       }
  	}
    
      
     }
</style>