<template>
  <div class="" id="code" v-set-title="title">
    
    <div class="title clearfix">
    	<div class="titleli"><p>总换码</p></div>
    </div>
    <div class="codeipt clearfix">
       <div class="codeiptl">总换码</div>
    	<div class="codeiptr"><input type="text" placeholder="请输入您的总换码" /></div>
    </div>
    <div class="explain">
         <div class="explainbtn">立即使用</div>
         <div class="explainp">
         	 <p>使用说明</p>
         	 <p>1、总换码由平台生成并分发</p>
         	 <p>2、一个总换码只能使用一次</p>
         	 <p>3、同类型的总换码用户可以叠加使用</p>
         </div>
    	
    </div>

   
  </div>
</template>
<script>
  export default {
    props: [],
    data () {
      return {
        title:'消息通知',
        titlep:1,
      }
    },
    components: {},
    mounted () {

    },
    methods: {
    	titleindex:function(index){
              this.titlep=index
    	},
      
    }
  }
</script>
<style lang="less">
  #code{
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
         	 	color: #333;
  
         	 }
        
         }
  	}
  	.codeipt{
         padding: 25px 0 40px;
         border-bottom: 1px solid  #E0E6ED;
         .codeiptl{
         	 float: left;
         	 margin-left: 30px;
         	 line-height: 36px;
         	 font-size: 14px;
             color: #666666;
         }
         .codeiptr{
         	 float: left;
         	 margin-left: 30px;
         	 input{
         	 	 height: 36px;
         	 	 padding: 0 10px;
         	 	 width: 380px;
         	 	 background: #FFFFFF;
                 border: 1px solid rgba(224,224,224,0.50);
         	 }
         }
  	}
  	.explain{
  		 margin-top: 25px;
  		 margin-left: 30px;
  		 .explainbtn{
  		 	 width: 146px;
  		 	 height: 36px;
  		 	 line-height: 36px;
  		 	 color: #fff;
  		 	 background: #20A0FF;
  		 	 text-align: center;
  		 	 font-size: 14px;
  		 	 cursor: pointer;
  		 }
  		 .explainp{
  		 	 margin-top: 20px;
  		 	 p{
  		 	 	 font-size: 14px;
  		 	 	 line-height: 28px;
  		 	 	 color: #999;
  		 	 }
  		 }

  	}
 
  	    
      
     }
</style>