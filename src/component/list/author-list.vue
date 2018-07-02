<template>
    <div id="author" class="box clearfix">
        <div class="row">
            <div class="rowbackimg">
                <div class="rowimg"><img :src="picHead + item.hostLogo" /></div>
                <!--<div class="rowtitle">{{item.hostCompany}}</div>-->
                <!--<div class="rowcon">{{item.hostDesc}}</div>-->
                <!--<div class="rowlabel clearfix">-->
                    <!--<div class="rowlabell"><p v-if="item.subNum!=null">粉丝 {{item.subNum}} </p>-->
                        <!--<p v-if="item.subNum==null">粉丝 0 </p></div>-->
                    <!--<div class="rowlabelr"><p> 文章 110 </p></div>-->
                <!--</div>-->
                <!--<div class="rowbtn" @click="open2(item.id)" v-if="item.isFollow==true">已关注</div>-->
                <!--<div class="rowbtn" @click="postFollow(item.id)" v-if="item.isFollow==false"> + 关注</div>-->
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: ['item'],
        data () {
            return {
                picHead:this.$store.state.picHead
            }
        },
        components: {},
        mounted () {},
        methods: {
            close () {
            }
        }
    }
</script>
<style lang="less">
    #author{
        float: left;
        width: 277px;
        height: 314px;
        // padding:26px 16px 0;
        margin-top: 20px;
        margin-right: 20px;
        background-image: url("../../assets/image/hot.png");
        background-size: 100% 100%;
        border-radius: 2px;
        .icon-pinpai{color: #999999;font-size: 15px;display: inline-block;transform:rotateY(180deg);-ms-transform:rotateY(180deg); 	/* IE 9 */-moz-transform:rotateY(180deg); 	/* Firefox */-webkit-transform:rotateY(180deg); /* Safari 和 Chrome */-o-transform:rotateY(180deg); }
        .bg_list{width:800px;background:#fff;border-bottom:1px solid #dedede;clear: both;margin: 0;padding: 0;overflow:hidden;}
        .bg_list:hover{background-color:#fafafa;}
        .bg_list_left{width:262px;height:160px;margin: 24px 0 22px;border: 1px solid #E0E0E0;overflow:hidden;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}
        .bg_list_left,.bg_list_right{float: left;}
        .bg_list_left img{width:262px;height:160px;}
        .bg_list_left a{width:100%;height:100%;display:block;}
        .bg_list_left a:hover img{opacity:.9;}
        .bg_list_right{margin: 30px 20px 0 40px;width: 477px;}
        .devheight{min-height:108px;}
        .bg_list_right_title{ line-height:24px;font-size:18px; color:#4e4e4e;cursor: pointer;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;}
        .bg_list_right_title a:hover{color:#303030;text-decoration:underline;}
        .bg_list_right_title .gradient_line{display:block;margin-top:13px;margin-bottom:8px;width:100%;height:2px;background: transparent}
        .bg_list_right_title:hover .gradient_line{background:linear-gradient(91deg, #b7ce63 0%, #06bebd 100%);background:-moz-linear-gradient(91deg, #b7ce63 0%, #06bebd 100%);background:-webkit-linear-gradient(91deg, #b7ce63 0%, #06bebd 100%);background:-ms-linear-gradient(91deg, #b7ce63 0%, #06bebd 100%);background:-o-linear-gradient(91deg, #b7ce63 0%, #06bebd 100%);}
        .bg_list_right_detail{margin:10px 0 22px 0;font-size:12px;color:#84898f;text-align:left;margin-top:15px;}
        .bg_list_right_detail a:hover,.bg_list_right_detail a{color:#84898f!important;cursor:pointer;}
        .bg_list_right_detail .textList{font-size: 14px;color: #84898F;line-height:28px;}
        .bg_list_right_detail .textList span{color: #20A0FF;}
        .bg_list_right_bottom{height:24px;margin-top: 20px;}
        .float-left{float: left}
        .float-right{float: right;overflow:hidden;}
        // .indust_label{width:300px;height:24px;padding-left:24px;background:url(../../assets/images/PC/icon/list-icon.png) left center no-repeat;overflow:hidden;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}
        .indust_label a{line-height:24px;display:inline-block;font-size:12px;color:#999;margin: 0 8px 10px 0;cursor:pointer;}
        .indust_label a:hover{color:#757575;text-decoration:underline;}
        .author_info img{box-shadow:0px 1px 6px 0px #bdbdbd;width:26px;height:26px;border-radius:100%;margin-right: 5px}
        .author_info .author{max-width:94px;line-height:18px;margin-right:6px;font-size:12px;color:#999;float:left;text-align:right;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:inline-block;}
        .author_info .author a{line-height:24px;color:#666;cursor:pointer;}
        .author_info .author a:hover{color:#666;text-decoration:underline;}
        .author_info .time{line-height:24px;font-size: 12px;color:#999;margin-right: 4px}
        .author_info .price{font-size: 18px;color: #20A0FF;}
            .row{

                .rowimg{
                    // padding-top: 26px;
                    // padding-top:26px;
                    width: 60px;
                    height: 60px;
                    margin: 26px auto 0;
                    border-radius: 50%;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .rowtitle{

                    font-size: 16px;
                    color: #333333;
                    line-height: 18px;
                    margin-top: 15px;
                    text-align: center;
                }
                .rowcon{
                    padding: 0 16px;
                    font-size: 14px;
                    color: #999999;
                    margin-top: 11px;
                    line-height: 21px;
                    height: 42px;
                    overflow: hidden;
                }
                .rowlabel{
                    margin-top: 35px;
                    width: 100%;
                    // height: 19px;
                    .rowlabell{
                        width: 50%;
                        float: left;
                        border-right: 1px solid #7F7F7F;
                        box-sizing: border-box;
                        height: 14px;
                        p{
                            text-align: right;
                            padding: 0 8px;
                            font-size: 14px;
                            line-height: 14px;
                            color: #7F7F7F;
                        }
                    }
                    .rowlabelr{
                        width: 50%;
                        float: left;
                        p{
                            text-align: left;
                            padding: 0 8px;
                            font-size: 14px;
                            line-height: 14px;
                            color: #7F7F7F;
                        }
                    }
                }
                .rowbtn{
                    width: 100px;
                    height: 34px;
                    margin: 0 auto;
                    border: 1px solid;
                    border-color: -webkit-linear-gradient(90deg,#FD9366, #77B9F8) 1 30;
                    border-color: -moz-linear-gradient(90deg,#FD9366, #77B9F8) 1 30;
                    border-image: linear-gradient(90deg,#FD9366, #77B9F8) 1 30;
                    line-height: 34px;
                    font-size: 14px;
                    color: #3c4350;
                    margin-top: 18px;
                    text-align: center;
                    cursor: pointer;
                }
                .rowbackimg{
                    background: #fff;
                    width: 100%;
                    height: 100%;
                    border: 1px solid rgba(224,224,224,0.50);
                    box-shadow: 0 5px 4px 0 rgba(202,202,202,0.10);
                    border-radius: 2px;
                }
            }
            .row:hover .rowbackimg{

                background: rgba(221,243,255,0.10);
            }
            .row:nth-child(4n+4){
                margin-right: 0;
            }
        .v_paging{
            width: 1200px;
            margin: 35px auto 170px;
        }
    }
</style>