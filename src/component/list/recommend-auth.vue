<!--
列表中单个item的组件
推荐作者组件
-->
<template>
    <div class="big-list">
        {{item.picTitle}}
        <img src="" alt="">
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: ['item'],
        data () {
            return {}
        },
        components: {},
        mounted () {},
        methods: {
            close () {
            }
        }
    }
</script>
<style></style>