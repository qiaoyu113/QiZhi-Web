<template>
    <baidu-map v-if="center.lng != null" 
        class="bm-view" ak="u24QGLsg5apOIGYBTqxnBTC0aebFdEom" 
        :center="center" :zoom="zoom" 
        :scroll-wheel-zoom="true" 
        :dragging="true" 
        :pinch-to-zoom="true" 
        @moving="syncCenterAndZoom" 
        @moveend="syncCenterAndZoom" 
        @zoomend="syncCenterAndZoom">
        <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
        </bm-marker>
        <!-- <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation> -->
    </baidu-map>
</template>

<script>
import qs from 'qs'
import { BaiduMap } from 'vue-baidu-map'
import { BmlMarkerClusterer ,BmNavigation, BmMarker} from 'vue-baidu-map'
import jsonp from 'jsonp'
export default {
    components: { BaiduMap, BmlMarkerClusterer ,BmNavigation,BmMarker},
    props: ['address'],
    data() {
        return {
            center: {
                lng: null,
                lat: null
            },
            zoom: 15,
            address1: this.$props.address
        }
    },
    mounted() {
        const that = this
        that.addressChange(that.address1)
    },
    methods: {
        addressChange: function(address) {
            const that = this
            if (address != undefined && address != '') {
                var url = 'http://api.map.baidu.com/geocoder/v2/?ak=u24QGLsg5apOIGYBTqxnBTC0aebFdEom&output=json&address=' + encodeURIComponent(address);
                //根据地点名称获取经纬度信息
//                let config = {headers:{}}
//                config.headers['Access-Control-Allow-Origin']='*';

                jsonp(url, { emulateJSON: true }, function (err, data) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        if (parseInt(data.status) == 0) {
                            that.center.lng = data.result.location.lng
                            that.center.lat = data.result.location.lat
                        }
                    }
                });
                /*axios.post(url, qs.stringify({ emulateJSON: true }))
                    .then(
                    (response) => {
                        if (parseInt(response.data.status) == 0) {
                            that.center.lng = response.data.result.location.lng
                            that.center.lat = response.data.result.location.lat
                        }
                    }
                    )*/
            }
        },
        syncCenterAndZoom: function(e) {
            const that = this
            const { lng, lat } = e.target.getCenter()
            that.center.lng = lng
            that.center.lat = lat
            that.zoom = e.target.getZoom()
        }
    }

}
</script>

<style lang="less">
.bm-view {
    position: fixed;
    height: 100%; 
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
}
</style>