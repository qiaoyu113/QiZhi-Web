<template>
    <div class="brandNews" id="brandNews">
        <div class="link">
            <span class="back" @click="index">首页</span> > {{routerName}}
        </div>
        <div class="newsList">
            <div class="newsContent" v-for="item in news" @click="goDetail(item.link)">
                <div class="newName">{{item.title}}</div>
                <div class="content">{{item.desc}}</div>
                <div class="time">{{item.createTime | stampFormate2}}</div>
            </div>
        </div>
        <!--分页-->
        <div class="v_paging" v-if="inde>10">
            <el-pagination
                    background
                    layout="prev, pager, next, jumper"
                    :current-page.sync="currentPage1"
                    @current-change="handleCurrentChange"
                    :total="inde">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import {brandService} from '../../service/brandService'
    export default {
        props: [],
        data () {
            return {
                news:[],
                routerName:'新闻中心',
                brandTitle:'',
                id:this.$route.query.id,
                adminId:this.$route.query.adminId,
                pageNo:1,
                currentPage1:1,
                inde:10
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
                brandService.getBrandNews({
                    adminId:id,
                    pageNo:that.pageNo,
                    pageSize:20
                },id).then(function(res){
                    if(res.data.success){
                        that.news = res.data.datas.datas;
                        that.inde = res.data.datas.totalPage * 10;
                    }
                })
            },
            //分页
            handleCurrentChange( val ){
                this.pageNo = val
                this.onload (this.id)
            },
            goDetail(url){
                window.location.href = url;
            }
        }
    }
</script>
<style lang="less">
    #brandNews{
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
        .newsList{
            width:100%;
            .newsContent{
                width:100%;
                padding:20px 0;
                box-sizing: border-box;
                box-shadow: inset 0 -1px 0 0 rgba(224,224,224,0.50);
                cursor: pointer;
                .newName{
                    font-size: 16px;
                    color: #333333;
                    margin-top: 19px;
                    margin-bottom: 10px;
                }
                .content{
                    font-size: 14px;
                    color: #999999;
                    line-height: 24px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
                .time{
                    font-size: 12px;
                    color: #999999;
                    line-height: 24px;
                }
            }
        }
        .v_paging {
            margin-top: 20px;
        }
    }
</style>