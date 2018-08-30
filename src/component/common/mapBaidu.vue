<template>
<div>
    <!-- <a v-if="center.lng!=null" :href="'http://api.map.baidu.com/marker?location='+center.lat+','+center.lng+'&title='+address+'&output=html'">导航</a> -->
    <!-- <a v-if="center.lng!=null" :href="'http://api.map.baidu.com/direction?origin='+latCurrent+','+lngCurrent+'&destination='+center.lat+','+center.lng+'&mode=driving&region='+address+'&output=html'">导航</a> -->
    <div class="bm-view" id="dituContent"></div>
</div>

</template>

<script>
import qs from 'qs'
import jsonp from 'jsonp'
export default {
    props: ['address'],
    data() {
        return {
            center: {
                lng: null,
                lat: null
            },
            zoom: 15,
            address1: this.$props.address,
            latCurrent:null,
            lngCurrent:null,

        }
    },
    mounted() {
        const that = this
        that.addressChange(that.address1)
    },
    methods: {
        addressChange: function(address) {
            const that = this
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    var mk = new BMap.Marker(r.point);
                    map.addOverlay(mk);
                    //map.panTo(r.point);//地图中心点移到当前位置
                    that.latCurrent = r.point.lat;
                    that.lngCurrent = r.point.lng;
                    // alert('我的位置：'+ that.latCurrent + ',' + that.lngCurrent);
                }
            })
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
                            that.initMap()
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
        //这几个地方加this
      initMap () {
        this.createMap() ; //创建地图 
        this.setMapEvent();//设置地图事件
        this.addMapControl();//向地图添加控件
        this.addMarker();//向地图中添加marker
        
      },
      createMap(){
          const that = this
        var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
        // console.log('经纬度',this.center.lng,this.center.lat)
        var point = new BMap.Point(this.center.lng,this.center.lat);//定义一个中心点坐标
        map.centerAndZoom(point,18);//设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map;//将map变量存储在全局
      },
      setMapEvent(){
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图
      },
      addMapControl(){
        //向地图中添加缩放控件
        var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
        map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
        var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
        map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
        map.addControl(ctrl_sca);
      },
      //标注点数组
      //创建marker
      addMarker(){
        var markerArr = [{title:this.$route.query.place,point:this.center.lng+"|"+this.center.lat,isOpen:1,icon:{w:23,h:25,l:46,t:21,x:9,lb:12}}];
        for(var i=0;i<markerArr.length;i++){
          var json = markerArr[i];
          var p0 = json.point.split("|")[0];
          var p1 = json.point.split("|")[1];
          var point = new BMap.Point(p0,p1);
          //这个地方加this
          var iconImg = this.createIcon(json.icon);
          var marker = new BMap.Marker(point,{icon:iconImg});
          //这个地方加this
          var iw = this.createInfoWindow(i);
          var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
          marker.setLabel(label);
          map.addOverlay(marker);
          label.setStyle({
            borderColor:"#808080",
            color:"#333",
            cursor:"pointer"
          });
          var index = i;
          //这个地方加this
          var _iw = this.createInfoWindow(i);
          var _marker = marker;
          marker.addEventListener("click",function(){
          //这个地方加this
            this.openInfoWindow(_iw);
          });
          iw.addEventListener("open",function(){
            _marker.getLabel().hide();
          })
          _iw.addEventListener("close",function(){
            _marker.getLabel().show();
          })
          label.addEventListener("click",function(){
            _marker.openInfoWindow(_iw);
          })
          if(!!json.isOpen){
            label.hide();
            _marker.openInfoWindow(_iw);
          }
        }
      },
      //创建InfoWindow
      createInfoWindow(i){
      //这个地方复制一下上面的var markerArr 不然会不显示报错
        var markerArr = [{title:this.$route.query.place,point:this.center.lng+"|"+this.center.lat,isOpen:1,icon:{w:23,h:25,l:46,t:21,x:9,lb:12}}];
        var json = markerArr[i];
        var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b>");
        return iw;
      },
      //创建一个Icon
      createIcon(json){
      //这个地方我是用本地图标图片的
        var tubiao=require("../../assets/image/zan.png")
        var icon = new BMap.Icon(tubiao, new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
        return icon;
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