<template>
  <div class="footer" id="footer">
     <div class="footer_center">
         <ul class="foot_left">
             <li class="consult">
                 <img src="../../assets/image/common/Fill1.png" alt="">
                 <p>
                    <span class="consult1">售前咨询</span>
                    <span class="consult2">010-65513781</span>
                 </p>
             </li>
             <li>商务合作： info@shiatang.com</li>
             <li>公司地址： 北京市朝阳区SOHO尚都南塔601/602</li>
         </ul>
         <div class="foot_center">
             <router-link to="">公司介绍</router-link>
             <router-link to="">合通机器人</router-link>
             <router-link to="">团队介绍</router-link>
             <router-link to="">走出去智库</router-link>
         </div>
         <ul class="foot_right">
             <li>微信公众号</li>
             <li>
                 <img src="../../assets/image/common/default_photo.png" alt="">
             </li>
         </ul>
     </div>
     <div class="foot_bottom">
         <p>版权所有 @2011-2017智唐科技（北京）股份有限公司   京ICP备13032365号-18</p>
     </div>
  </div>
</template>

<script>
    import {indexService} from '../../service/indexService'
    export default {
        data() {
            return{
            }
        },
        mounted() {
            const that = this;
            // 请求底部数据
            indexService.ContactInfo({
            }).then(function (res) {
            })
            
           
        },
        updated: function () {
        },
        methods: {
        }
        
    }
</script>

<style lang="less" scoped>
    #footer{
        width: 100%;
        height: 240px;
        background-color:  #333333;
        .footer_center{
            padding-top: 40px;
            width: 900px;
            height: 150px;
            margin: 0 auto;
            .foot_left,.foot_center,.foot_right{
                float: left;
            }
            .foot_left{
                width: 33%;
                height: 100%;
                li{
                    font-size: 12px;
                    color: #FFFFFF;
                    letter-spacing: 1px;
                    margin-bottom: 13px;
                }
                .consult{
                    width: 100%;
                    height: 50px;
                    margin-bottom: 7px !important;
                    img{
                        margin-left: 3px;
                        float: left;
                        width:46px;
                    }
                    p{
                        width: 150px;
                        height: 100%;
                        display: inline-block;
                    }
                    .consult1{
                        margin-bottom: 6px;
                        margin-left: 18px;
                        display: block;
                    }
                    .consult2{
                        margin-left: 18px;
                        display: block;
                        font-size: 16px;
                        color: #FFFFFF;
                        letter-spacing: 1.33px;
                    }
                }
            }
            .foot_center{
                padding-left: 120px;
                width: 18%;
                float: left;
                height: 100%;
                a{
                    font-size: 12px;
                    color: #FFFFFF;
                    letter-spacing: 1px;
                    display: block;
                    margin-bottom: 13px;
                    cursor: pointer;
                }
                a:hover{
                    text-decoration:underline;
                }
            }
            .foot_right{
                padding-left: 130px;
                width: 20%;
                height: 100%;
                float: left;
                li{
                    width: 100%;
                    font-size: 12px;
                    color: #FFFFFF;
                    letter-spacing: 1px;
                    margin-bottom: 3px;
                    img{
                        width:84px;
                    }
                }
            }
        }
        .foot_bottom{
            height: 50px;
            line-height: 30px;
            text-align: center;
            P{
                font-size: 12px;
                color: #FFFFFF;
                letter-spacing: 1px;
            }
        }
    }

</style>