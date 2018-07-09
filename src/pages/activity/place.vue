<template>
    <div class="block">
        <div class="mapblock">
            <mapBaidu v-if="place != undefined" :address="place"></mapBaidu>
        </div>
    </div>
</template>

<script>
import mapBaidu from '../../component/common/mapBaidu.vue'
export default {
    components: { 'mapBaidu': mapBaidu },
    data() {
        return {
            place: this.$route.query.place
        }
    },
    mounted: function() {
        document.title = "活动地点"
        const that = this;
    //    console.log('已传页面的值', that.place)

    },
    methods: {

    }
}
</script>
<style lang="less" scoped>
    .block {
        .page-title {
            z-index: 20;
            width: 100%;
            height: 1.3333rem;
            line-height: 1.3333rem;
            font-size: 0.48rem;
            position: fixed;
            top: 0;
            max-width:450px;margin:0 auto;
            left:0;
            right: 0;
            color: #333;
            letter-spacing: 0.3px;
            text-align: center;
            background: #FFF;
            box-shadow: inset 0 -1px 0 0 rgba(221, 221, 221, 0.50);
        }
        .page-title .icon-fanhui {
            position: absolute;
            left: 0.533rem;
            font-size: 0.853rem;
            color: #999;
        }
        .mapblock {
            margin-top: 1.333rem;
        }
    }
</style>

