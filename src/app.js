import Vue from 'vue'
import router from './router'
import store from './vuex';
import { sync } from 'vuex-router-sync'
import VueLazyload from 'vue-lazyload'
import {Carousel,Form,FormItem,Input,Button,Checkbox,CheckboxGroup,Select,Option,CarouselItem} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import './mixin/directive';

// 开启debug
Vue.config.debug = true
// or with options
Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAkA4JaQAA3AA/vqQAAA=',
    attempt: 1
})
Vue.use(Carousel)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Select);
Vue.use(Option);
Vue.use(CarouselItem);

export function createApp () {
    // 同步路由状态(route state)到 store
    sync(store, router)
    // 创建应用程序实例，将 router 和 store 注入
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })
    // 暴露 app, router 和 store。
    return { app, router, store }
}
