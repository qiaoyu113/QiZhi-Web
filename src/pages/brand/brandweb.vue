<template>
    <div class="brandweb" id="brandweb">
        <div class="brandweb_center">
            <div class="link">
                <span class="back" @click="index">首页</span> > {{routerName}}
            </div>
            <div class="brandweb-text">
                <div class="title">{{brandTitle}}</div>
                <div class="content">
                    <div v-html="content"></div>
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
                brandImg:'',
                brandBanner:[],
                routerName:'文章',
                brandTitle:'',
                id:this.$route.query.id,
                adminId:this.$route.query.adminId,
                bottom_zhuban:[],
                bottom_lianhezhuban:[],
                bottom_jishuzhichi:[],
                bottom_huodongzhichi:[],
                bottom_chengban:[],
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
            index(){
              this.$router.push({name:'brand',query:{id:this.adminId}})
            },
            onload(id){
                let that = this;
                brandService.getBrand({
                    adminId:that.adminId
                },that.adminId).then(function(res){
                    if(res.data.success){
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
                brandService.getBrandContent({
                    id:id
                },id).then(function(res){
                    if(res.data.success){
                        that.brandTitle = res.data.datas.title;
                        that.content = res.data.datas.content
                    }
                })
            }
        }
    }
</script>
<style lang="less">
    #brandweb{
        padding:0;
        margin:0;
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
        .brandweb_center{
            max-width:1000px;
            margin:60px auto;
            padding:0 150px;
            box-sizing: border-box;
        }
        .link{
            height: 50px;
            line-height: 50px;
            font-size: 12px;
            color: #666666;
            .back{
                cursor: pointer;
            }
        }
        .brandweb-text{
            width:100%;
            .title{
                width:100%;
                text-align: center;
                font-size: 36px;
                color: #333333;
                letter-spacing: 0;
                line-height: 50px;
            }
            .content{
                padding-top:10px;
                img{
                    width:100%;
                }
            }
        }
    }
</style>