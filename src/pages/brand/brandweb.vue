<template>
    <div class="brandweb" id="brandweb">
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
                adminId:this.$route.query.adminId
            }
        },
        computed: {},
        mounted () {
            this.onload(this.id)
        },
        methods: {
            index(){
              this.$router.push({name:'brand',query:{id:this.adminId}})
            },
            onload(id){
                let that = this;
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
        max-width:1000px;
        margin:60px auto;
        padding:0 150px;
        box-sizing: border-box;
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