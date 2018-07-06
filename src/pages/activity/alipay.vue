<template>
    <div class="alipay">
        <div id="alipay"></div>
    </div>
</template>
<script>
    import {indexService} from '../../service/indexService'
    export default {
        props: [],
        data(){
            // common.pageTitle('支付宝付款')
            return {
                alipay:''
            }
        },
        mounted () {
            const that = this
            indexService.myOrder({
                orderNo:that.$route.query.orderNo,
                channelId: that.$route.query.channelId
            }).then(function (res) {
                that.alipay = res.data.datas.payUrl
                $("#alipay").html(res.data.datas.payUrl);
            })
        },
        methods: {
            
        }
    }
</script>
<style></style>