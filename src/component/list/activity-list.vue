<!--
列表中单个item的组件
首页大列表组件
-->
<template>
    <div class="sy-list sy dicContent" id="activity">
        <div class="bg_list">
            <div class="bg_list_left">
                <router-link :to="{name:'passage',params:{id:item.id}}">
                    <img :src="item.poster| picTurn">
                </router-link>
            </div>
            <div class="bg_list_right">
                <div class="devheight">
                    <div class="bg_list_right_title">
                        {{item.title}}
                    </div>
                    <div class="bg_list_right_detail">
                        <div class="textList">时间: 2018-10-22</div>
                        <div class="textList">地点: 北京</div>
                        <div class="textList">票价: <span>￥100</span></div>
                    </div>
                </div>
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
    #activity{
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
    }
</style>