<template>
  <div class="" id="notice" v-set-title="title">
    
    <div class="title clearfix">
    	<div class="titleli"><p :class="titlep==1?'v_p':''" @click="titleindex(1)">通知</p></div>
    	<div class="titleli"><p :class="titlep==2?'v_p':''" @click="titleindex(2)">私信</p></div>
    	<div class="titleli"><p :class="titlep==3?'v_p':''" @click="titleindex(3)">日程消息</p></div>
    	<div class="titleli"><p :class="titlep==4?'v_p':''" @click="titleindex(4)">更新消息</p></div>
    </div>
    <div class="box">
    	<div class="boxrow clearfix"><p class="boxrowl">贾丹丹您好，非常开心您能注册我们的网站，我们现在有一个活动要不要参加呀，哈哈哈，营销类的消息贾丹丹您好，非常开心您能注册我们的网站，我们现在有一个活动要不要参加呀，哈哈哈，营销类的消息</p>
    	<p class="boxrowr">2018-02-06 12:20</p>
    	</div>
    	<div class="boxrow clearfix"><p class="boxrowl">贾丹丹您好，非常开心您能注册我们的网站，我们现在有一个活动要不要参加呀，哈哈哈，营销类的消息贾丹丹您好，非常开心您能注册我们的网站，我们现在有一个活动要不要参加呀，哈哈哈，营销类的消息</p>
    	<p class="boxrowr">2018-02-06 12:20</p>
    	</div>
    	<div class="boxrow clearfix"><p class="boxrowl">贾丹丹您好，非常开心您能注册我们的网站，我们现在有一个活动要不要参加呀，哈哈哈，营销类的消息贾丹丹您好，非常开心您能注册我们的网站，我们现在有一个活动要不要参加呀，哈哈哈，营销类的消息</p>
    	<p class="boxrowr">2018-02-06 12:20</p>
    	</div>
    	<div class="boxrow clearfix"><p class="boxrowl">贾丹丹您好，非常开心您能注册我们的网站，我们现在有一个活动要不要参加呀，哈哈哈，营销类的消息贾丹丹您好，非常开心您能注册我们的网站，我们现在有一个活动要不要参加呀，哈哈哈，营销类的消息</p>
    	<p class="boxrowr">2018-02-06 12:20</p>
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
        title:'消息通知',
        titlep:1,
        page:{
           num:1,
           size:10,
        },
      }
    },
    components: {},
    mounted () {
        this.getInnerletter()
    },
    methods: {
    	titleindex:function(index){
              this.titlep=index
    	},
    	 //获取我的消息
      getInnerletter (){
        let that = this;
        modularService.getInnerletter({pageNo: that.page.num, pageSize:that.page.size,type:1}).then(function (res) {
             console.log(res)
                  if(res.data.code==200){
                      //  that.data=res.data.datas.datas
                      // that.inde=res.data.datas.totalPage * 10
                      // console.log(that.inde)
              
                 
                  }
        });
      },
      
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
             height: 60px;
             .boxrowl{
             	 float: left;
             	 width: 670px;
             	 line-height: 60px;
             	 height: 60px;
             	 color: #333;
             	 overflow: hidden;
             	 text-overflow:ellipsis;
                 white-space:nowrap;

             }
             .boxrowr{
             	 float: right;
             	 color: #333;
             	 line-height: 60px;
             }
  		}
  	}
  	    
      
     }
</style>