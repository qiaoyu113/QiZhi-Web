/**
 * Created by LXH on 2017/11/14.
 */
const homeStore = {
    state: {
        typeList: [], //分类
        bannerData: [], // 轮播
        
        hotAuthors:[],//作者推荐
        columnList: [], // 专题
        searchList: [], // 搜索
        authorList: [], // 作者
        page: '', // 页码
        pageNo: '', // 页码
        totalCount:'', //总页数
        loadStatus:2,   //加载状态

        articleList: [], // 文章
        hotArticleList:[], // 热门文章
        articleTypes:[],//文章类型
        article: {},

        totalAct:{},//活动列表的所有参数
        actClass:[], //活动主题分类
        activityList: [], // 活动
        activityOrders: [], // 活动
        activity: '', //
        actDetail:{},//详情页 

    },
    mutations: {

    }
}
export default homeStore