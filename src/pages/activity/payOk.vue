<template>
    <div class="payOk">
        <div class="payresult">
            <div class="pay payok">
                <i class="iconfont icon-icon_right"></i>
                <p class="title">付款成功</p>
                <p class="des">恭喜您订阅成功，可在 <router-link :to="{name:'myOrder'}">个人中心-我的订阅</router-link> 中查看。选择合同模板开始创建吧</p>
                <div @click="finished()">完成</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: [],
        data(){
            common.pageTitle('支付成功')
            return {
                
            }
        },
        mounted () {
            
        },
        methods: {
            finished:function(){
                this.$router.push({name:'singlePro',params:{id:this.$route.params.id}})
            },
            close:function(){
                this.$router.push({name:'payment',params:{id:this.$route.params.id}})
            }
        }
    }
</script>
<style lang="less">
    .payresult{
        height: 100%;
        width: 100%;
        background: rgba(51,51,51,.6);
       .pay{
           text-align: center;
           position: fixed;
           left:50%;
           top:50%;
           transform: translate(-50%,-50%);
           width: 260px;
           padding: 40px 20px;
           background: #FFFFFF;
           border: 1px solid #DDDDDD;
           .iconfont{
               font-size: 58px;
               margin-bottom: 15px;
           }
           .title{
               width: 100%;
               text-align: center;
               font-size: 24px;
               color: #333333;
               margin-bottom: 12px;
           }
           .des{
               width: 100%;
               text-align: center;
               font-size: 16px;
                color: #333333;
                letter-spacing: 0;
                line-height: 28px;
                margin-bottom: 25px;
                a{
                    font-size: 16px;
                    color: #333333;
                }
           }
           div{
               width: 100%;
               height: 40px;
               border: 1px solid #B9002D;
               font-size: 16px;
                color: #B9002D;
                text-align: center;
                line-height: 40px;
           }
           div:hover{
               cursor: pointer;
           }
       }
       .payok{
           .iconfont{
               color: #02C800;
           }
       }
       .payno{
           .iconfont{
               color: #B9002D;
           }
       }
        
    }
</style>