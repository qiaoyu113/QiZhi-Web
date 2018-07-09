<template>
    <div class="concern" v-set-title="title">
        <div class="topImg">
            <div class="company">
                <div class="company_left">
                    <p class="title">运联传媒</p>
                    <span></span>
                    <p class="desp">
                        电话：010-62958252        传真：010-52071961</br>
                        投稿邮箱：bianshunrong#tucmedia.com（发邮件请把#换成@）</br>
                        客服微信：010-62958252</br>
                        地址:北京市海淀区学清路甲18号中关村东升科技园学院园D609室
                    </p>
                </div>
            </div>
        </div>
        
        <div class="prodes">
            <p>运联传媒（隶属于运联（北京）会展有限公司，为公司旗下品牌）是一家领先的专注于服务中国货运物流业发展的传媒机构，以“关注货运业，关怀货运人”为使命，致力于“引领货运行业正向发展，不断提升货运行业及其相关产业链的价值”。旗下现有媒体产品包括《运联商业评论》杂志（原《货运中国》）、运联网、运联移动新媒体（微信公众号、微博号）等，同时主办运联峰会系列论坛、货运集节号行业嘉年华活动、中国好专线遴选活动等，致力于为中国货运业的发展提供精准、高效、全面的全媒体服务平台。</p>
            <p>作为一家快速发展的新兴传媒公司，运联传媒正处在快速、健康、可持续发展的进程中，已推出的媒体服务以高品质、富于创新和精彩务实的特点，得到了来自德邦物流、佳吉快运、盛辉物流、新邦物流、传化物流、荣庆物流、新杰物流等业内领军企业的强烈认可和大力支持。同时，运联传媒与国内外的权威行业协会有着密切的交流与协作，如中国交通运输协会、中国物流学会、美国卡车运输协会、澳大利亚卡车运输协会等。</p>
            <p>作为运联传媒官方网站，运联网是运联传媒旗下的个性化行业资讯交流平台，核心关注对象是货运物流业标杆型、成长型、创新型企业以及企业家群体。</p>
        </div>

        <!-- <div class="free_use">
            <div class="boss_box" style="width:800px;margin:0 auto;">
                <div class="boss1">
                    <div class="huanghuan1">
                        <div class="huanw"></div>
                        <div class="huann"></div>
                        <img class="huan" src="../../assets/image/common/icon4.png" alt="">
                        <img class="touxiang" src="../../assets/image/common/bossa.jpg" alt="">
                    </div>
                    <p class="xingming">{{ $t("message.ti2") }}&nbsp;&nbsp;<span>{{ $t("message.nab19") }}</span></p>
                    <div class="shiji" v-html="contentPartner">
                    </div>
                </div>
            </div>
        </div>

        <div class="contract">
            <p class="con_title">{{ $t("message.nab20") }}</p>
            <div class="con_text">
                <p class="centerbox1" v-html="more">
                </p>
            </div>
        </div> -->
    </div>
</template>

<script>
// const videoPlayer = (resolve) => {require(['../../component/video/video.vue'],resolve)}
import {indexService} from '../../service/indexService'
    export default {
        // components: { 'video-player': videoPlayer},
        data(){
            return{
                title:'关于我们 运联传媒',
                mission:'',
                solvelist:{},
                solve:'',
                partner:'',
                partners:{},
                contentPartner:'',
                contentPartners:{},
                more:'',
                mores:{},
                video: {
                    autoplay:true,
                    sources: [],
                    poster: ''
                },
                startPlay:false
            }
        },
        mounted (){
            document.body.scrollTop = 0;
        },
        methods: {
            
        }
    }
</script>

<style lang="less" scoped>
.concern{
    width: 100%;
    .intro_left:nth-child(2){
        background-color: #fff !important;
    }
    .topImg{
        position: relative;
        overflow: visible;
        width: 100%;
        height: 500px;
        background-image: url(../../assets/image/back4.jpg);
        // background-image: url(../../assets/image/common/aboutus.jpg);
        background-repeat: no-repeat;
        background-size:cover;
        clear: both;
    }
    .company{
        margin-top: 384px;
        margin-bottom: 30px;
        float: right;
        top: 384px;
        right: 0;
        width: 70%;
        padding-bottom: 40px;
        background: #333333;
        overflow: hidden;
        .company_left{
            width: 80%;
            margin-left: 50px;
            max-width: 900px;
            .title{
                margin-top: 40px;
                font-size: 22px;
                color: #FFFFFF;
                letter-spacing: 2px;
                // letter-spacing: 2px;
            }
            span{
                display: block;
                width: 57px;
                height: 4px;
                background: #FFFFFF;
                margin-bottom: 20px;
                margin-top: 8px;
            }
            .desp{
                font-size: 16px;
                color: #FFFFFF;
                letter-spacing: 1.5px;
                line-height: 40px;
            }
        }
    }
    .prodes{
        width: 900px;
        margin: 0 auto;
        margin-top: 260px;
        p{
            font-size: 15px;
            color: #555555;
            line-height: 32px;
            margin-bottom: 20px;
            // text-indent:2em; 
        }
    }
}
    
</style>