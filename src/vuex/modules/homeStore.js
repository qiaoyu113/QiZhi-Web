/**
 * Created by LXH on 2017/11/14.
 */
const homeStore = {
    state: {
        typeList: [], //分类
        bannerData: [], // 轮播
        articleList: [], // 文章
        hotArticleList:[], // 热门文章
        articleTypes:[],//文章类型
        hotAuthors:[],//作者推荐
        activityList: [], // 活动
        columnList: [], // 活动
        searchList: [], // 活动
        activityOrders: [], // 活动
        authorList: [], // 活动
        singleOrders: [], // 活动
        publish: '', // 页码
        article: {}, 
        activity: '', // 页码
        page: '', // 页码
        pageNo: '', // 页码
        loadStatus:2,
    },
    mutations: {

    }
}
export default homeStore