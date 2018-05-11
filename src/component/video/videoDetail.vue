<!--suppress ALL -->
<template>
  <div class="video_detail">
    <video-player class="video-player-box" :options="playerOptions"></video-player>
  </div>
</template><!--id="videoPlayer" -->
<script>
//  require ('video.js/dist/video-js.css')
//  require ('vue-video-player/src/custom-theme.css')
  import {videoPlayer} from '../../../lib/vue-video-player'
  import videoJsHls from '../../assets/js/video/videojs-contrib-hls'

  export default {
    props: ['video','startPlay'],
    data () {
      return {
        /*playerOptions: { // 视频播放器
          autoplay: false,
          controls: true,
          sourceOrder: true,
          errorDisplay : false,
           sources: [],
          poster: '',
        }*/
      }
    },
   computed:{
       playerOptions() {
          let playerOptions = { // 视频播放器
                  controls: true,
                  sourceOrder: true,
              }
              playerOptions.autoplay = false
              playerOptions.poster = this.video.poster
              playerOptions.sources = this.video.sources
           return playerOptions
       }
   },
    components: {'video-player': videoPlayer},
    mounted () {
      let that = this;
//      that.playerOptions.poster = that.video.poster;
//      that.playerOptions.sources = that.video.sources;
    },
    methods: {
      stopPlay(){
        // emit 发射子组件中的值
        this.$emit("startPlay",false)
      },
      play () {
//          this.video
      },
      pause () {}
    }
  }
</script>
<style  lang="less">
   @import '../../../node_modules/video.js/dist/video-js.css';
   @import "../../../node_modules/vue-video-player/src/custom-theme.css";
   
   .vjs-big-play-button{
     top:50% !important;
     left:50% !important;
     transform: translate(-50%,-50%) !important;
   }
   .video-js .vjs-big-play-button{
     height: 2em !important;
     width: 2em !important;
     line-height: 2em !important;
     border-radius: 100% !important;
     border: none;
     .vjs-icon-placeholder{
       font-size: 40px !important;
     }
   }
   .video-js:hover .vjs-big-play-button{
     background-color: rgba(0,0,0,.8)
   }
</style>