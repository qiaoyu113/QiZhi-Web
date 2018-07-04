<!--
参数1：bannerData
    结构：bannerData:[
            {
              picTitle:"",
              slogan:"",
              type:"2",
              videoUrl:"",
              picUrl:"",
            }
          ],
参数3：canClick
    是否可以点击

-->
<template>
  <div class="banner">
    <el-carousel height="100%"  arrow="always">
      <el-carousel-item class="backimg" @click="clickLink(index)" v-for="(item,index) in bannerData" :key="index" :style="{ backgroundImage: 'url('+ picHead + item.picUrl+')' }">
       <div class="zhezhao1" @click="clickLink(index)"></div>
        <div class="describe" @click="clickLink(index)">
          <p>{{item.picTitle}}</p>
          <p v-if="item.slogan">{{item.slogan}}</p>
        </div>
      </el-carousel-item>
    </el-carousel>
    <video-player :video="video" v-bind:startPlay="startPlay" v-on:startPlay="zidingyi($event)" v-if="startPlay == true" @pause="onPlayerPause()"></video-player>
  </div>
</template>

<script>
    const videoPlayer = (resolve) => {require(['../../component/video/video.vue'],resolve)}
    export default {
      components: { 'video-player': videoPlayer},
      data(){
        return{
          picHead : this.$store.state.picHead,
          video: {
              autoplay:true,
              sources: [],
              poster: ''
          },
          startPlay:false
        }
      },
        props: ['bannerData','canClick'],
        updated() {

        },
        mounted (){

        },
        methods: {
          zidingyi:function(msg){
            this.startPlay = msg;
          },
          clickLink:function(index){
            if(!this.canClick) return;
            window.location.href = this.bannerData[index].picLink
            // if(this.bannerData[index].bannerType== '0'){
            //   window.location.href = this.bannerData[index].picLink
            // }
            // if(this.bannerData[index].bannerType== '1'){
            //   this.start(index);
            // }
          },
          start:function(index){
            const that = this;
            //正常情况
            that.video.poster = that.bannerData[index].picUrl;
            that.video.sources.push(that.bannerData[index].videoUrl);
            that.startPlay = true;
          },
          onPlayerPause:function(){
          }
        }
        
    }
</script>

<style lang="less">
.banner{
    width: 800px;
    height: 400px;
    .homebanner{
        background-color: #ccc;
    }
    .backimg{
        /*background-image: url('../../assets/image/common/back2.jpg');*/
        background-color: #ccc;
        background-repeat: no-repeat;
        background-size:cover;
        background-position:center center;
        .zhezhao1{
            width: 100%;
            height: 100%;
            position: absolute;
            top:0;
            left: 0;
            opacity: 0;
            background: #000000;
        }
        @-webkit-keyframes fadeIn {
            0% {
                opacity: 0; /*初始状态 透明度为0*/
            }
            50% {
                opacity: 0; /*中间状态 透明度为0*/
            }
            100% {
                opacity: 1; /*结尾状态 透明度为1*/
            }
        }
        .describe{
            width: 100%;
            height: 70px;
            background: rgba(0,0,0,0.50);
            position: absolute;
            bottom:0px;
            left:0px;
            p:nth-child(1){
                width: 100%;
                font-size: 20px;
                color: #FFFFFF;
                line-height: 70px;
                text-shadow: 0 2px 2px rgba(0,0,0,0.50);
                margin-bottom: 10px;
                text-align:center;
            }
            p:nth-child(2){
                width: 100%;
                font-size: 16px;
                color: #FFFFFF;
                line-height: 30px;
                text-shadow: 0 2px 20px rgba(0,0,0,0.20);
                margin-bottom: 20px;
            }
            span{
                cursor: pointer;
                font-size: 18px;
                color: #FFFFFF;
                padding: 12px 20px;
                display: inline-block;
                border: 2px solid #FFFFFF;
                border-radius: 3px;
            }
        }

    }
    .el-icon-arrow-left{
        font-size: 26px;
    }
    .el-icon-arrow-right{
        font-size: 26px;
    }
    .el-carousel__arrow--left{
        left:0;
    }
    .el-carousel__arrow--right{
        right:0;
    }
    .el-carousel__arrow{
        border-radius: 0px !important;
        background: rgba(0,0,0,0.60);
        width: 40px;
        height: 60px;
    }
    .el-carousel__indicators{
        bottom: 15px;
        display: flex;
        width: 100%;
        bottom: 0;
        margin: 0;
        background: transparent;
    }
    .el-carousel__indicator{
        flex: 1;
        // margin: 3px;
    }
    .el-carousel__indicator,.el-carousel__button{
        width: 100%;
        height: 5px;
        padding: 0;
        background: transparent;
        // border-radius: 10px;
        // border: 1px solid #FFFFFF;
        // box-shadow: 0 2px 2px 0 rgba(0,0,0,0.30);
    }
    .el-carousel__indicator.is-active .el-carousel__button{
        background: #20A0FF;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .video-player-box{
        width: 100%;
        height: 500px;
        position: absolute;
        top:0;
        left:0;
        z-index:1000;
    }
    #vjs_video_1{
        width:100%;
        height: 100%;
    }
}

</style>