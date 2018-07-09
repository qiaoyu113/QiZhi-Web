<template>
  <div class="" id="notice" v-set-title="title">
    
    <div class="title clearfix">
      <div class="titleli"><p :class="titlep==2?'v_p':''" @click="titleindex(2)">通知<i v-if="tz==true"></i></p></div>
      <div class="titleli"><p :class="titlep==1?'v_p':''" @click="titleindex(1)">私信<i v-if="sx==true"></i></p></div>
      <!-- <div class="titleli"><p :class="titlep==3?'v_p':''" @click="titleindex(3)">日程消息</p></div> -->
      <!-- <div class="titleli"><p :class="titlep==4?'v_p':''" @click="titleindex(4)">更新消息</p></div> -->
    </div>
    <div class="box">
      <div class="boxrow clearfix" v-for="list in data" @click="postInnerletter(list.id)">
        <p class="boxrowl" :class="list.readStatus!=false ? 'ash':''" @click="gohome(list.modelType,list.modelTypeId)">{{list.content}}</p>
        <p class="boxrowr" :class="list.readStatus!=false ? 'ash':''">{{list.sendTime | stampFormate2}}</p>
      </div>

    
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
        title:'消息通知',
        titlep:2,
        page:{
           num:1,
           size:10,
           totalCount: 0,
           totalPage:0,
        },
        data:[],
        loadStatus:0,
        total:1,
        tz:'',
        sx:'',
      }
    },
    components: {},
    mounted () {
        this.getInnerletter()
        this.getInnerletterIsunread()
    },
    methods: {
      titleindex:function(index){
              this.titlep=index
              this.page.num=1
              this.data=[]
              this.getInnerletter()
      },
      gohome:function(ty,id){
           if(ty==2){
              this.$router.push({path:"/activity/"+id}) 
           }else if(ty==1){
               this.$router.push({path:"/article/"+id}) 
           }
      },
       //获取我的消息
      getInnerletter (){
        let that = this;
        modularService.getInnerletter({pageNo: that.page.num, pageSize:that.page.size,type:this.titlep}).then(function (res) {
                  if(res.data.code==200){
                      //  that.data=res.data.datas.datas
                      // that.inde=res.data.datas.totalPage * 10
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
       // 获取个人站内信息
      getInnerletterIsunread(){
        let that=this;
        modularService.getInnerletterIsunread().then(function(res){
          if(res.data.success){
            // let yule = res.data.datas.user.numItem.unreadMsgNum
            that.tz=res.data.datas[2]
            that.sx=res.data.datas[1]
          }else{

             }
          })
        },
      //消息已读
      postInnerletter (id){
        let that = this;
        modularService.postInnerletter({letterIds:id}).then(function (res) {
                  if(res.data.code==200){
                       
                 
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
  #notice{
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
            position: relative;
            i{
              display: block;
              position: absolute;
              top: 18px;
              right: -4px;
              width: 8px;
              height: 8px;
              border-radius: 4px;
              background: red;

            }
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
      .boxrow{
        width: 840px;
         padding: 0 30px;
         background: #FFFFFF;
             box-shadow: inset 0 -1px 0 0 #DDDDDD;
             // height: 60px;
             .boxrowl{
               float: left;
               width: 670px;
               line-height: 24px;
               padding: 18px 0;
               // height: 60px;
               color: #333;
               cursor: pointer;
               // overflow: hidden;
               // text-overflow:ellipsis;
               //   white-space:nowrap;
             }
             .boxrowr{
               float: right;
               color: #333;
               line-height: 60px;
             }
             .ash{
                color: #999;
             }
      }
    }
        
      
     }
</style>