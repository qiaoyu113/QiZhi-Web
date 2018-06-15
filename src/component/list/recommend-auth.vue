<!--
列表中单个item的组件
推荐作者组件
-->
<template>
    <router-link :to="{name:'author',params:{id:item.adminId}}" class="recommendauth_list">
        <div class="recommendauth_list_left float-left">
            <img v-if="item.headimgurl!=null && item.headimgurl!=''" :src="item.headimgurl| picTurn">
            <img v-if="item.headimgurl==null || item.headimgurl==''" src="../../assets/image/default_photo.png">
        </div>
        <div class="recommendauth_list_center float-left">
            <p class="title">{{item.hostName}}</p>
            <div class="detail">{{item.hostDesc}}</div>
        </div>
        <div class="recommendauth_list_right float-right">
            <div class="care" @click="postFollow(item.id)">
                <i></i>
                <span>关注</span>
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
            postFollow (id) {
                const that = this
                indexService.postFollow({
                    adminId:id
                }).then(function (res) {});
            }
        }
    }
</script>
<style>
/*作者推荐*/
.recommendauth_list{background:#fafafa;width:360px;height:110px;position: relative;display: block;}
.recommendauth_list_left{margin: 21px 0 17px 22px}
.recommendauth_list_left img{box-shadow:0px 5px 4px 0px rgba(0,0,0,0.06);width:68px;height:68px;border-radius:100%;}
.recommendauth_list_center{margin-left: 20px;margin-top: 25px}
.recommendauth_list_center .title{font-size:16px;color:#666666;text-align:left;}
.recommendauth_list_center .detail{font-size:13px;color:#999999;line-height:22px;text-align:left;width: 140px;height: 44px;overflow: hidden;margin-top: 5px;}
.recommendauth_list_right{margin-right: 22px;margin-top: 39px;cursor: pointer}
.recommendauth_list_right .care{background:#ffffff;border:1px solid #389bff;border-radius:27px;width:71px;height:30px;line-height: 30px;text-align: center;font-size:12px;color:#389bff;}
.recommendauth_list_right .care:hover{background:linear-gradient(-5deg, #22a7f0 0%, #3a75c2 100%);background:-moz-linear-gradient(-5deg, #22a7f0 0%, #3a75c2 100%);background:-webkit-linear-gradient(-5deg, #22a7f0 0%, #3a75c2 100%);background:-ms-linear-gradient(-5deg, #22a7f0 0%, #3a75c2 100%);background:-o-linear-gradient(-5deg, #22a7f0 0%, #3a75c2 100%);box-shadow:0px 6px 5px 0px rgba(18,69,134,0.05), 0px 3px 6px 0px rgba(0,0,0,0.10);color: #ffffff}
.recommendauth_list_right .care i{display:inline-block;background: url("../../assets/image/add-b.png");width: 12px;height: 12px}
.recommendauth_list_right .care:hover i{background: url("../../assets/image/add-w.png");}
.recommendauth_list_right .cared{background:#fafafa;border-radius:27px;width:73px;height:32px;font-size:12px;color:#389bff;line-height: 32px;text-align: center}
.recommendauth_list_right .cared i{display:inline-block;background: url("../../assets/image/checked.png");width: 12px;height: 10px}
.recommendauth_list_more{text-align: center;width: 100%;background:#ffffff;height: 80px;line-height: 80px}
.recommendauth_list_more .see-more{display:inline-block;background:url("../../assets/image/see-more.png");border-radius:46px;width:280px;height:34px;line-height: 34px;font-size:14px;color:#999999;text-align:center;margin: 0 auto;cursor: pointer;margin-top:20px;}
.recommendauth_list_more .see-more:hover{box-shadow:0px 5px 5px 0px rgba(0,0,0,0.10);/*box-shadow:0px 20px 30px 0px rgba(0,0,0,0.10);*/}
</style>