<!--
列表中单个item的组件
首页大列表组件
-->
<template>
    <div class="actList">
        <router-link :to="{name:'activityDetail',params:{id:item.id}}">
            <!--每一个列表-->
            <div class="activity-center-list-1">
                <div class="activity-center-list-1-top">
                    <img v-if="item.activityPoster !=''" :src="item.activityPoster | picTurn" />
                </div>
                <div class="activity-center-list-1-center">
                    <p class="p1">{{item.activityTitle}}</p>
                    <p class="p2"><span><i class="iconfont icon-wait" style="font-size:13px;"></i></span>{{item.actStartTime | stampFormate3}}</p>
                    <p class="p3"><span><i class="iconfont icon-dangqianweizhi"></i></span>{{item.dist}}</p>
                    <!-- <p class="p4">收藏<span>(23)</span></p> -->
                </div>
                <div class="activity-center-list-1-bottom">
                    <p v-if="item.actApplyStauts*1===0">未开始</p>
                    <p v-if="item.actApplyStauts*1===1">进行中</p>
                    <p v-if="item.actApplyStauts*1===2">已结束</p>
                    <!-- <p>未开始</p> -->
                    <p v-if="item.minTicketPrice != item.maxTicketPrice">¥{{item.minTicketPrice/100}} - ¥{{item.maxTicketPrice/100}}</p>
                    <p v-if="item.minTicketPrice == item.maxTicketPrice && item.minTicketPrice!=0">¥{{item.minTicketPrice/100}}</p>
                    <p v-if="item.minTicketPrice == item.maxTicketPrice && item.minTicketPrice==0">免费</p>
                    <!-- <p>¥100-200</p> -->
                </div>
                <!--置顶-->
                <div class="Stick" v-if="item.sortNumber > 0">置顶</div>
            </div>
        </router-link>
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
    .actList{
        // width: 100%;
        // height: auto;
        // overflow: hidden;
        float: left;
        /*--活动列表内容--*/
        .activity-center-list{width:1200px;min-height:500px;margin:auto;overflow: hidden;}
        .activity-center-list-inner{width:1220px;overflow: hidden;}
        .activity-center-list-1:nth-child(3n){
            margin-right: 0px !important;
        }
        .activity-center-list-1{background:#ffffff;border:1px solid #eaeaea;width:386px;height:387px;float:left;text-align: center;box-sizing: border-box;position:relative;margin: 35px 22px 0 0;}
        .activity-center-list-1-top{
            width: 100%;
            height: 193px;
            position: relative;
            overflow: hidden;
            img{
                position: absolute;
                width: 100%;
                top: 50%;
                left:0;
                transform: translateY(-50%);
            }
        }
        .iconfont{color: #EAEAEA;font-size: 14px;margin-right: 6px;}
        .activity-center-list-1-center{width:354px;height:124px;margin:auto;margin-top:22px;border-bottom: 1px solid #eaeaea;}
        .activity-center-list-1-center .p1{height:48px;font-size:16px;color:#555555;line-height:24px;text-align:left;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}
        .activity-center-list-1-center .p1:hover{cursor: pointer;}
        .activity-center-list-1-center .p2{position:relative;margin-top:10px;font-size:12px;color:#999999;line-height:24px;text-align:left;}
        .activity-center-list-1-center .p3{position:relative;margin-top:4px;font-size:12px;color:#999999;line-height:24px;text-align:left;float:left;}
        .activity-center-list-1-center .p4{background:#ffffff;width:75px;height:28px;font-size:12px;color:#999999;line-height:24px;float:right;margin-top:4px;}
        .activity-center-list-1-center .p4 span{font-size:12px;color:#5fb878;line-height:24px;text-align:left;}
        .activity-center-list-1-bottom p:nth-child(1){float:left;position:relative;padding-left:15px;margin-top:12px;font-size:14px;color:#999999;text-align:left;width:130px;white-space:nowrap;text-overflow:ellipsis;overflow: hidden;}
        .activity-center-list-1-bottom p:nth-child(2){float:right;font-size:14px;color:#20A0FF;/*line-height:24px;*/text-align:left;margin-right:15px;margin-top:12px;}
        .Stick{background:#FF9750;width:60px;height:30px;font-size:14px;color:#ffffff;;position:absolute;z-index:10;text-align: center;line-height:30px;top:0;left:0;}
    }
    .actList:nth-child(3n){
        .activity-center-list-1{
            margin-right: 0px !important;
        }
    }
    
</style>