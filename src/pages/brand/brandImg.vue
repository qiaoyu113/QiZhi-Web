<template>
    <div class="brandImg" id="brandImg">
        <div class="link">
            <span class="back" @click="index">首页</span> > {{routerName}}
        </div>
        <div class="brandImgList">
            <div class="imgBox" v-for="item in imgList" @click="openImg(item.img,item.description)">
                <img :src="$store.state.picHead + item.img" alt="">
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
        <!--展示图片-->
        <div class="imgShow" v-show="imgShow">
            <div class="del" @click="imgShow = false">×</div>
            <div class="imgBoxs">
                <img :src="$store.state.picHead + imgSrc" alt="">
                <p>{{imgText}}</p>
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
                imgList:[],
                inde:10,
                currentPage1:1,
                page:{
                    num:1
                },
                routerName:'图片库',
                id:this.$route.query.id,
                adminId:this.$route.query.adminId,
                imgSrc:'',
                imgText:'',
                imgShow:false
            }
        },
        computed: {},
        mounted () {
            this.onload(this.id)
        },
        methods: {
            //打开图片
            openImg(url,name){
                let that = this;
                that.imgSrc = url;
                that.imgText = name;
                that.imgShow = true;
            },
            //分页
            handleCurrentChange( val ){
                this.page.num = val
                this.onload (this.id)
            },
            index(){
                this.$router.push({name:'brand',query:{id:this.adminId}})
            },
            onload(id){
                let that = this;
                brandService.getBrandImg({
                    adminId:id,
                    pageNo:that.page.num,
                    pageSize:20
                },id).then(function(res){
                    if(res.data.success){
                        that.imgList = res.data.datas.datas;
                        that.inde = res.data.datas.totalPage * 10
                    }
                })
            }
        }
    }
</script>
<style lang="less">
    #brandImg{
        max-width:1300px;
        margin:60px auto;
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
        .brandImgList{
            width:100%;
            overflow: hidden;
            .imgBox{
                width:200px;
                float:left;
                margin:10px 20px;
                img{
                    width:100%;
                }
            }
            .imgBox:hover{
                cursor: pointer;
                box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.3);
                border-radius: 6px;
            }
        }
        .v_paging {
            margin-top: 20px;
        }
        .imgShow{
            width:100%;
            height:100%;
            position: fixed;
            top:0;
            bottom:0;
            left:0;
            right:0;
            margin:auto;
            background:#EEEEEE;
            z-index:100;
            .del{
                font-size:50px;
                color:#666;
                position: absolute;
                right:10px;
                top:10px;
                cursor: pointer;
            }
            .imgBoxs{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                margin: 0;
                box-shadow: 4px 5px 5px #ddd;
                border-radius: 6px;
                width: 500px;
                padding:20px;
                box-sizing: border-box;
                border: 40px solid #fff;
                background-color: #fff;
                img{
                    width:100%;
                }
                p{
                    margin-top:20px;
                    color:#333;
                    font-size:14px;
                }
            }
        }
    }
</style>