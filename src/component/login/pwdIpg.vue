<template>
  <div class="item">
    <input type="password" class="form-ipt namePwd" placeholder="请输入6~24位数字、字母密码" v-model="pwd" @blur="getPwd">
    <i class="iconfont icon-yanjing" @click="hideExchange"></i>
  </div>
</template>
<script type="text/ecmascript-6">
    import {appService} from '../../service/appService'
    import {validate} from '../../assets/js/validate'
  export default {
    props: [],
    data () {
      return {
        pwd: ''
      }
    },
    components: {},
    mounted () {},
    methods: {
      getPwd () {
        this.$store.state.loginStore.password = this.pwd;
      },
      hideExchange (event) {// 显示密码和隐藏密码切换
        let obj = event.currentTarget;
        appService.hideExchange(obj);
      }
    }
  }
</script>
<style></style>