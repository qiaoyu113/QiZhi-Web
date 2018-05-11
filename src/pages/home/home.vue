<template>
    <div id="app" class="home">
        <z-banner :bannerData="bannerData" :canClick="'true'"></z-banner>
        <div class="big-list-content">
            <home-list v-for="item,key in bannerData" :item="item" :key="key"></home-list>
        </div>
        <load-more :page="pageNo" :total="totalPage" :status="loadStatus" @loadMore="loadmore"></load-more>
    </div>
</template>

<script>
    import {appService} from '../../service/appService'
    import homeList from '../../component/list/home-list.vue'
    export default {
        name: 'app',
        data() {
            return{
                bannerData:[
                    {
                        picTitle:"123",
                        type:"2",
                        videoUrl:"",
                        picUrl:"123",
                    },
                    {
                        picTitle:"234",
                        type:"2",
                        videoUrl:"",
                        picUrl:"123",
                    }
                ],
                loadStatus:0,
                pageNo:1,
                totalPage:30
            }
        },
        components: {homeList:homeList},
        watch: {
            '$route' (to,from) {
            }
        },
        mounted: function () {

        },
        methods: {
            loadmore(i){
                //loadstatus为加载状态，每次收到接口数据后要修改该状态
                let that = this
                that.loadStatus = 1
                that.pageNo=i
                setTimeout(()=> that.loadStatus = 0,10000)
            }
        }
    }
</script>

<style lang="less">

</style>
