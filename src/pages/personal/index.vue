<template>
  <div class="" id="personal" v-set-title="title">
     <div class="personalbox clearfix">
     	 <div class="personalboxl">
     	 	 <div class="headimg">
     	 	 	 <img :src="picHead + name.headImg" class="headimgimg" />
     	 	 	 <p>{{name.nickName}}
                 
                 <img src="../../assets/image/viptit.png" v-if="myVip==true"/>
                 </p>
     	 	 </div>
     	 	 <div class="tab"> 
     	 	 	 <router-link :to="{name:'purchase'}"><div class="tabrow" :class="selectindex==1?'select':''"><p>我的购买</p></div></router-link>
     	 	 	 <router-link :to="{name:'collection'}"><div class="tabrow" :class="selectindex==2?'select':''"><p>我的收藏</p></div></router-link>
     	 	 	 <!-- <router-link :to="{name:'integral'}"><div class="tabrow" :class="selectindex==3?'select':''"><p>我的积分</p></div></router-link> -->
     	 	 	 <router-link :to="{name:'follow'}"><div class="tabrow" :class="selectindex==4?'select':''"><p>我的关注</p></div></router-link>
     	 	 	 <!-- <router-link :to="{name:'code'}"><div class="tabrow" :class="selectindex==5?'select':''"><p>总换码</p></div></router-link> -->
     	 	 	 <router-link :to="{name:'notice'}"><div class="tabrow" :class="selectindex==6?'select':''"><p>消息通知</p></div></router-link>
     	 	 	 <router-link :to="{name:'setup'}"><div class="tabrow" :class="selectindex==7?'select':''"><p>账号设置</p></div></router-link>

     	 	 </div>
     	 </div>
     	 <div class="personalboxr">
     	 	  <router-view></router-view>
     	 </div>
     </div>

   
  </div>
</template>
<script>
 import {indexService} from '../../service/indexService'
  export default {
    props: [],
    data () {
      return {
        title:'个人中心',
        selectindex:7,
        name:'',
        myVip:'',
      }
    },
    components: {},
    computed: {
            picHead() {
                return this.$store.state.picHead
            },
        },
    mounted () {
           this.getname()
    },
    methods: {
        getname:function(){
            let that=this

             indexService.myCenter({
                }).then(function (res) {
               
                  let User = res.data.datas
                  that.name = User.user
                  that.myVip = that.name.myVip.vip
              })
        }
      
    }
  }
</script>
<style lang="less">
  #personal{
  	  .personalbox{
  	   	width: 1134px;
        margin: 40px auto;
        // margin-top: 40px;
        overflow: hidden;
    
        .personalboxl{
        	 width: 210px;
        	 background: #FFFFFF;
             border: 1px solid #EEEEEE;
             border-radius: 6px;
             margin-right: 20px;
             float: left;
             .headimg{
             	 .headimgimg{
             	 	 margin: 30px 65px 10px;
             	 	 width: 80px;
             	 	 height: 80px;
             	 	 border-radius: 40px;
             	 }
             	 p{
             	 	font-size: 18px;
                    color: #333333;
                    line-height: 24px;
                    letter-spacing: 0;
                    text-align: center;
                    img{
                         width: 31px;
                         height: 15px;
                         margin-top: 5px;

                    }
             	 }
             }
             .tab{
             	 margin-top: 40px;
             	 margin-bottom: 20px;
             	 .tabrow{
             	 	 height: 46px;
             	 	 cursor: pointer;
             	 	p{
             	 		font-size: 14px;
                        color: #333333;
                        line-height: 46px;
                        margin-left: 34px;
             	 	}
             	 	 

             	 }
             	 .router-link-active{
             	 	  .tabrow{
             	 	  
             	 	  	 	 background: rgba(32, 160, 255, 0.06);
                             border-left: 2px solid #20a0ff;
                             p{
                     	        margin-left: 32px;
                               } 
             	 	     }
             	      }
             	 // .select{
             	 	 // background: rgba(32, 160, 255, 0.06);
                 //     border-left: 2px solid #20a0ff;
                 //     p{
                 //     	margin-left: 32px;
                 //     }
             	 	 
             	 // }
             }
        }
        .personalboxr{
        	 width: 900px;
        	 float: left;
        }
  	  }
  	    
      
  }
</style>