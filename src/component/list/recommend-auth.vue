<!--
列表中单个item的组件
推荐作者组件
-->
<template>
    <router-link to="" class="recommendauth_list">
        <router-link :to="{name:'concernDetail',query:{id:item.id,isFollow:item.isFollow}}" class="recommendauth_list_left float-left">
            <img v-if="item.hostLogo!=null && item.hostLogo!=''" :src="item.hostLogo| picTurn">
            <img v-if="item.hostLogo==null || item.hostLogo==''" src="../../assets/image/default_photo.png">
        </router-link>
        <router-link :to="{name:'concernDetail',query:{id:item.id,isFollow:item.isFollow}}" class="recommendauth_list_center float-left">
            <p class="title">{{item.hostName}}</p>
            <div class="detail">{{item.hostDesc}}</div>
        </router-link>
        <div class="recommendauth_list_right float-right">
            <div class="authorbtn" @click="postFollow(item.id)" v-if="isFollow==false"><i class="iconfont icon-jiahao"></i> 关注</div>
            <div class="hoverdiv">
                <div class="authorbtn1" v-if="isFollow==true"><i class="iconfont icon-yes"></i>已关注</div>
                <div class="authorbtn2" @click="open2(item.id)" v-if="isFollow==true">取消关注</div>
            </div>
        </div>
    </router-link>
</template>
<script type="text/ecmascript-6">
import {indexService} from '../../service/indexService'
import {modularService} from '../../service/modularService'
    export default {
        props: ['item'],
        data () {
            return {
                isFollow:false,
            }
        },
        components: {},
        mounted () {
            console.log('22222',this.item)
        },
        methods: {
            //关注社群号
            postFollow (id){
                let that = this;
                if(localStorage.token && localStorage.token!='undefined'){
                    modularService.postFollow({adminId:id}).then(function (res) {
                        if(res.data.code==200){
                            that.$message.success('关注成功');
                            that.isFollow=true
                        }
                    });
                } else {
                    that.$router.push({name:'login'})
                }
            },
            //取消关注
            putCancleFollow(id){
                let that=this
                modularService.putCancleFollow({adminId:id}).then(function (res) {
                    if(res.data.code==200){
                        that.$message.success('取消关注成功');
                        that.isFollow=false
                    }
                });

            },
            // 取消关注弹出层
            open2(id) {
                this.$confirm('是否取消关注?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.$message({
                    type: 'success',
                    message: '取消关注成功!'
                });
                this.putCancleFollow(id)
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
                });
            }
        }
    }
</script>
<style lang="less">
/*作者推荐*/
.sm_list{background:#fafafa;}
.recommendauth_list{
    background:#fafafa;width:360px;height:110px;position: relative;display: block;
    .authorbtn1{
        cursor: pointer;
        margin: 15px auto 0px;
        width: 73px;
        height: 32px;
        border: 1px solid;
        border-radius: 27px;
        color: #389BFF;
        text-align: center;
        font-size: 12px;
        line-height: 32px;
        background: #fff;
        /* border-image: linear-gradient(-90deg, #508DFF 0%, #389BFF 34%, #26C5FE 89%, #3BB8FE 100%); */
        .iconfont{
            font-size: 14px;
        }
    }
    .authorbtn2{
        cursor: pointer;
        margin: 15px auto 0px;
        width: 73px;
        height: 32px;
        background: #FFFFFF;
        border: 1px solid #E5E9F2;
        box-shadow: 0 2px 2px 0 rgba(132,146,166,0.05), 0 5px 4px 0 rgba(132,146,166,0.05);
        color: #5E6D82;
        text-align: center;
        font-size: 12px;
        line-height: 32px;
        display: none;
    }
    .hoverdiv:hover{
        .authorbtn1{display: none;}
        .authorbtn2{display: block;}
    }
    .authorbtn{
        cursor: pointer;
        margin: 15px auto 0px;
        width: 73px;
        height: 32px;
        border: 1px solid #389BFF;
        border-radius: 27px;
        color: #389BFF;
        text-align: center;
        font-size: 12px;
        line-height: 32px;
        .iconfont{
            font-size: 14px;
        }
    }
    .authorbtn:hover{
        color: #fff;
        background-image: linear-gradient(-90deg, #508DFF 0%, #389BFF 34%, #26C5FE 89%, #3BB8FE 100%);
    }
}
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
.recommendauth_list_right .cared{border:1px solid #389bff;background:#ffffff;border-radius:27px;width:73px;height:32px;font-size:12px;color:#389bff;line-height: 32px;text-align: center}
.recommendauth_list_right .cared i{display:inline-block;background: url("../../assets/image/checked.png");width: 12px;height: 10px}
.recommendauth_list_more{text-align: center;width: 100%;height: 80px;line-height: 80px}
.recommendauth_list_more .see-more{color:#22a7f0;display:inline-block;background:url("../../assets/image/seemore.png");border-radius:46px;width:280px;height:34px;line-height: 34px;font-size:14px;text-align:center;margin: 0 auto;cursor: pointer;margin-top:20px;}
.recommendauth_list_more .see-more:hover{box-shadow:0px 5px 5px 0px rgba(0,0,0,0.10);/*box-shadow:0px 20px 30px 0px rgba(0,0,0,0.10);*/}
</style>