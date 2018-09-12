<template>
    <div id="brand">
        <div class="brand-center">
            <div class="brandImg">
                <z-banner :bannerData="brandImg" :canClick="'true'"></z-banner>
            </div>
            <div class="brandList">
                <div class="brandBanner" @click="goBrand(item.url)" v-for="item in brandBanner">
                    <img :src="$store.state.picHead + item.img" alt="">
                    <div class="text">{{item.title}}</div>
                </div>
            </div>
        </div>
        <div class="brand_foot">
            <div class="brand_foot_center">
                <div class="menu">
                    <div class="menu-left">
                        主办
                    </div>
                    <div class="menu-right">
                        <p v-for="item in bottom_zhuban">{{item}}</p>
                    </div>
                </div>
                <div class="menu">
                    <div class="menu-left">
                        联合主办
                    </div>
                    <div class="menu-right">
                        <p v-for="item in bottom_lianhezhuban">{{item}}</p>
                    </div>
                </div>
                <div class="menu">
                    <div class="menu-left">
                        承办
                    </div>
                    <div class="menu-right">
                        <p v-for="item in bottom_chengban">{{item}}</p>
                    </div>
                </div>
                <div class="menu">
                    <div class="menu-left">
                        活动支持
                    </div>
                    <div class="menu-right">
                        <p v-for="item in bottom_huodongzhichi">{{item}}</p>
                    </div>
                </div>
                <div class="menu">
                    <div class="menu-left">
                        技术支持
                    </div>
                    <div class="menu-right">
                        <p v-for="item in bottom_jishuzhichi">{{item}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {brandService} from '../../service/brandService'
    export default {
        props: [],
        data () {
            return {
                brandImg:[],
                brandBanner:[],
                bottom_zhuban:[],
                bottom_lianhezhuban:[],
                bottom_jishuzhichi:[],
                bottom_huodongzhichi:[],
                bottom_chengban:[],
                id:this.$route.query.id,
            }
        },
        computed: {},
        mounted () {
            this.onload(this.id);
            let foot = document.getElementsByClassName('nav_ul')[0];
            foot.style.display="none";
            let nav_search = document.getElementById('nav_search');
            nav_search.style.display="none";
            let fabu = document.getElementsByClassName('fabu')[0];
            fabu.style.display="none";
            let footer = document.getElementById('footer');
            footer.style.display="none";
        },
        methods: {
            onload(id){
                let that = this;
                brandService.getBrand({
                    adminId:id
                },id).then(function(res){
                    if(res.data.success){
                        let img = res.data.datas.banners;
                        img.forEach(function(item){
                            that.brandImg.push({picUrl:item.img});
                        })
                        that.brandBanner = res.data.datas.webs;
                        that.bottom_zhuban = res.data.datas.brandHome.bottom_zhuban;
                        that.bottom_lianhezhuban = res.data.datas.brandHome.bottom_lianhezhuban;
                        that.bottom_jishuzhichi = res.data.datas.brandHome.bottom_jishuzhichi;
                        that.bottom_huodongzhichi = res.data.datas.brandHome.bottom_huodongzhichi;
                        that.bottom_chengban = res.data.datas.brandHome.bottom_chengban;
                        let logo =  that.$store.state.picHead + res.data.datas.brandHome.logo;
                        let imgs = document.getElementById('img');
                        imgs.style.backgroundImage = "url("+ logo +")";
                    }
                })
            },
            goBrand(url){
                let that = this;
                window.location.href = url;
            }
        }
    }
</script>
<style lang="less">
    #brand{
        padding:0;
        .brand-center{
            max-width:1000px;
            margin:60px auto;
        }
        .brand_foot{
            min-width: 1200px;
            width:100%;
            overflow: hidden;
            background: #06060D;
            .brand_foot_center{
                width: 1200px;
                margin: 0 auto;
                padding:16px 0;
                box-sizing: border-box;
                color:#fff;
                overflow: hidden;
                .menu{
                    width:20%;
                    float:left;
                    overflow: hidden;
                    margin:20px 0;
                    padding-left:30px;
                    box-sizing: border-box;
                    text-align: center;
                    .menu-left{
                        text-align: left;
                        font-size:16px;
                        color:#98989C;
                        margin-bottom:13px;
                    }
                    .menu-right{
                        text-align: left;
                        p{
                            line-height: 28px;
                            font-size: 12px;
                            color: #98989C;
                        }
                    }
                }
            }
        }
        .banner{
            width: 100%;
        }
        .brandImg{
            width:100%;
            img{
                width:100%;
            }
        }
        .brandList{
            width:100%;
            overflow: hidden;
            .brandBanner{
                width:15%;
                text-align: center;
                float:left;
                margin:5%;
                cursor: pointer;
                img{
                    width:100px;
                }
                .text{
                    width:100%;
                    text-align: center;
                    font-size: 18px;
                    color: #36495E;
                    letter-spacing: 0;
                    margin-top: 30px;
                }
            }
            .brandBanner:hover{
                -webkit-animation:1s seconddiv;
                background: transparent;
            }
        }
        @keyframes seconddiv{
            0% {transform: scale(1.4,1.4);}
            10% {transform: scale(1,1);}
            25% {transform: scale(1.2,1.2);}
            50% {transform: scale(1,1);}
            70% {transform: scale(1.2,1.2);}
            100% {transform: scale(1,1);}
        }
    }
</style>