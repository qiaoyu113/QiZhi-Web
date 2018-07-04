<!--
列表中单个item的组件
右侧热门文章组件
-->
<template>
    <router-link :to="{name:'passage',params:{id:item.id}}" class="hotpost_list">
        <div class="hotpost_list_left float-left">
            <img :src="item.poster| picTurn">
        </div>
        <div class="hotpost_list_right float-left">
            <p class="title" style="-webkit-box-orient: vertical;">{{item.title}}</p>
            <div class="time_info">
                <img src="../../assets/image/clock.png" class="time">
                <span>{{item.createDate | dateFormate}}</span>
                <img src="../../assets/image/arrow-right.png" class="arrow-right">
            </div>
        </div>
    </router-link>
</template>
<script type="text/ecmascript-6">
    export default {
        props: ['item'],
        data () {
            return {}
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
    /*文章小列表*/
    .sm_list{width: 360px;}
    .blueline{position: absolute;left: 0;width: 3px;height: 45px;top:0px;background: #389BFF;}
    .sm_list_head{background:#fafafa;width:360px;height:45px;line-height: 45px;position: relative;}
    .sm_list_head img{/*width:16px;height:20px;*/margin-left: 3px;margin-top: 10px;}
    .sm_list_head span{font-size:16px;color:#3c4350;text-align:left;margin-left: 20px}
    .hotpost_list{display:block;background:#fafafa;width:360px;height:130px;cursor: pointer;
        .hotpost_list_left{margin: 25px 0 21px 22px;float: left;}
        .hotpost_list_left img{box-shadow:0px 5px 4px 0px rgba(0,0,0,0.10), inset 0px -1px 0px 0px rgba(196,196,196,0.50);width:120px;height:80px;}
        .hotpost_list_right{margin-left: 15px;margin-top: 29px;float: left;}
        .hotpost_list_right .title{display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;font-size:16px;color:#4e4e4e;line-height:22px;text-align:left;width: 187px;}
        .time_info{margin-top: 12px;height: 20px;line-height: 20px;}
        .time_info .time{width: 12px;height: 12px;margin-top: 4px;margin-right: 2px;}
        .time_info span{font-size:13px;color:#999999;text-align:left;margin-left: 2px;}
        .time_info .arrow-right{float: right}
    }
</style>