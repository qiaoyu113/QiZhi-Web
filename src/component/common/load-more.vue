<!--
事件： loadMore,返回需加载页面pageno
参数： status加载状态，0，加载完成，1，加载中，2，没有更多
        page当前页面
-->
<template>
  <div id="loadmore" v-if="total!=0">
      <div class="more" @click="loadmore()" v-if="status*1===0 && page*1!==total*1">加载更多</div>
      <div class="more-end" v-if="status*1===1 && page*1!==total*1">
          <svg width="32" height="32">
              <circle cx="16" cy="16" r="10" stroke-width="5" stroke="#f0f0f0" fill="none"></circle>
              <circle class="tans" cx="16" cy="16" r="10" stroke-width="5"  stroke-linecap="round" stroke="#ccc" fill="none" stroke-dasharray="5 5"></circle>
          </svg>
      </div>
      <!-- <div class="more" v-if="page*1===total*1">没有更多了</div> -->
  </div>
</template>

<script>
    export default {
        props:['status','page','total'],
        data(){
            return{
                logo: this.$store.state.logoUrl
            }
        },
        mounted: function() {
        },
        methods: {
            loadmore(){
                this.$emit('loadMore',this.page+1)
            }
        }
    }
</script>

<style  lang="less" scoped>
    #loadmore{
        svg {
            -webkit-transform: rotate(-0.05deg);
            transform: rotate(-0.05deg);
        }
        .tans {
            stroke-dasharray: 72;
            stroke-dashoffset: 72;
            animation: dash 2s linear infinite;
        }

        @keyframes dash {
            to {
                stroke-dashoffset: 10;
            }
        }
        margin: 10px 0;
        text-align: center;
        .more{
            font-size: 14px;
            line-height: 32px;
            height: 32px;
            padding: 0 20px;
            border-radius: 3px;
            background-color: #eee;
            color: #333;
            display: inline-block;
            cursor: pointer;
        }
        .more-end{
            font-size: 14px;
            line-height: 32px;
            height: 32px;
            padding: 0 20px;
            border-radius: 3px;
            color: #333;
            display: inline-block;
            cursor: pointer;
        }
    }
</style>
