<template>
    <div class="brand" id="brand">
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
</template>
<script>
    import {brandService} from '../../service/brandService'
    export default {
        props: [],
        data () {
            return {
                brandImg:[],
                brandBanner:[],
                id:this.$route.query.id
            }
        },
        computed: {},
        mounted () {
            this.onload(this.id)
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
                        that.brandBanner = res.data.datas.webs
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
        max-width:1000px;
        margin:60px auto;
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