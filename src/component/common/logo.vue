<template>
  <div id="logo" >
      <img src="../../assets/image/logo.png" alt="" class="logo">
      <!-- ./../assets/image/logo.png -->
  </div>
</template>

<script>
    export default {
        props:['hasClass'],
        data(){
            return{
                logo: this.$store.state.logoUrl
            }
        },
        mounted: function() {
        },
        methods: {
        }
    }
</script>

<style  lang="less" scoped>
    #back-home{
        position: fixed;
        bottom:2rem;
        right:.5rem;
        z-index:1000;
    }
  .back-home-btn{
      height: 1.4rem;
      width: 1.4rem;
      border-radius: 50%;
      background: #FFFFFF;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16);
      line-height:1.4rem;
      text-align:center;
      .icon-shouyetianchong {
          font-size: .73rem;
      }
  }
</style>
