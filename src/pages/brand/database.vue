<template>
    <div class="" id="database">
        <div class="box clearfix">
            <div class="boxl">
                <div class="top"><span>类型筛选</span></div>
                <div class="row clearfix" :class="index==1?'xuzhong':''" @click="dian(1)"><p class="rowl"><i
                        class="el-icon-check"></i></p>
                    <p class="rowr">全部格式</p></div>
                <div class="row clearfix" :class="index==2?'xuzhong':''" @click="dian(2)"><p class="rowl"><i
                        class="el-icon-check"></i></p>
                    <p class="rowr">Word文档</p></div>
                <div class="row clearfix" :class="index==3?'xuzhong':''" @click="dian(3)"><p class="rowl"><i
                        class="el-icon-check"></i></p>
                    <p class="rowr">PPT幻灯片</p></div>
                <div class="row clearfix" :class="index==4?'xuzhong':''" @click="dian(4)"><p class="rowl"><i
                        class="el-icon-check"></i></p>
                    <p class="rowr">Excel表单</p></div>
                <div class="row clearfix" :class="index==5?'xuzhong':''" @click="dian(5)"><p class="rowl"><i
                        class="el-icon-check"></i></p>
                    <p class="rowr">PDF文档</p></div>
                <div class="row clearfix" :class="index==6?'xuzhong':''" @click="dian(6)"><p class="rowl"><i
                        class="el-icon-check"></i></p>
                    <p class="rowr">图片</p></div>
                <div class="row clearfix" :class="index==7?'xuzhong':''" @click="dian(7)"><p class="rowl"><i
                        class="el-icon-check"></i></p>
                    <p class="rowr">其他</p></div>
            </div>
            <div class="boxr">
                <div class="form">
                    <div class="thead clearfix">
                        <div class="th th1">格式</div>
                        <div class="th th2">文件</div>
                        <div class="th th3">价格</div>
                        <div class="th th4">下载量</div>
                        <div class="th th5">上传日期</div>
                        <div class="th th6">上传者</div>
                        <div class="th th7">操作</div>
                    </div>
                    <div class="tbody">
                        <div class="row clearfix" v-for="(list,index) in data" v-if="data && data.length > 0">
                            <div class="td td1"><img src="../../assets/image/audio.png" v-if="list.form=='image'"/>
                                <img src="../../assets/image/ppt.png" v-if="list.form=='ppt'"/>
                                <img src="../../assets/image/pdf.png" v-if="list.form=='pdf'"/>
                                <img src="../../assets/image/excel.png" v-if="list.form=='excel'"/>
                                <img src="../../assets/image/word.png" v-if="list.form=='word'"/>
                                <img src="../../assets/image/exe.png" v-if="list.form=='other'"/>
                                <img src="../../assets/image/pdf2.png" v-if="list.form=='zip'"/>
                            </div>
                            <div class="td td2"><p class="td2p">{{list.name}}</p>
                                <p>{{list.size}}</p></div>
                            <div class="td td3">免费</div>
                            <div class="td td4">{{list.downloadCount}}</div>
                            <div class="td td5">{{list.createTime | stampFormate}}</div>
                            <div class="td td6">{{list.adminName}}</div>
                            <div class="td td7"
                                 @click="getUserCenter(list.name,list.url,list.suffix,list.form,list.id)">
                                <!--  <a :href="'https://mini.dtfind.com/downloads/url?urlStr='+ list.url+'&fileName='+list.name+'&form='+list.suffix"> -->
                                下载
                                <!-- </a> -->
                            </div>
                        </div>
                        <div class="row clearfix none" v-if="!data || data.length == 0">暂无内容</div>
                    </div>
                </div>
                <!--分页-->
                <div class="v_paging" v-if="inde>10">
                    <el-pagination
                            background
                            layout="prev, pager, next, jumper"
                            :current-page.sync="currentPage1"
                            @current-change="handleCurrentChange"
                            :total="inde">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {brandService} from '../../service/brandService'
    import {modularService} from '../../service/modularService'
    export default {
        props: [],
        data () {
            return {
                title: '资料库',
                index: 1,
                box: 1,
                inde: 10,
                page: {
                    num: 1,
                    size: 10,
                },
                form: '',
                data: '',
                currentPage1: 1,
                myVip: null,
                id:this.$route.query.id
            }
        },

        components: {},
        // 添加以下代码
        metaInfo () {
            const title = this.title
            return {
                title
            }
        },
        mounted () {
            this.getDocuments ()
            // this.getUserCenter()
        },
        methods: {
            dian: function ( id ) {
                this.index = id
                if (id == 1) {
                    this.form = ''
                } else if (id == 2) {
                    this.form = 'word'
                } else if (id == 3) {
                    this.form = 'ppt'
                } else if (id == 4) {
                    this.form = 'excel'
                } else if (id == 5) {
                    this.form = 'pdf'
                } else if (id == 6) {
                    this.form = 'image'
                } else if (id == 7) {
                    this.form = 'other'
                }
                this.page.num = 1
                this.currentPage1 = 1
                this.getDocuments ()
            },
            //提示
            open() {
                this.$confirm ( '开通会员后，即可免费下载', '提示', {
                    confirmButtonText: '开通会员',
                    cancelButtonText: '取消',
                    type: 'warning'
                } ).then ( () => {
                    this.$router.push ( { path: "/vip" } )
                } ).catch ( () => {
                    this.$message ( {
                        type: 'info',
                        message: '已取消'
                    } );
                } );
            },
            //分页
            handleCurrentChange( val ){
                this.page.num = val
                this.getDocuments ()
            },
            getUserCenter (name,url,suffix,form,id){
                let that = this;
                modularService.getUserCenter ().then ( function ( res ) {
                    if (res.data.code == 200) {
                        let data = res.data.datas.user
                        that.myVip = data.myVip.vip
                        that.getDownloadsUrl ( name, url, suffix, form, id )
                    }
                } );
            },
            //获取所有社群号
            getDocuments (){
                let that = this;
                brandService.getDocuments ( {
                    pageNo: that.page.num,
                    pageSize: that.page.size,
                    form: that.form,
                    adminId:that.id
                } ,that.id).then ( function ( res ) {
                    if (res.data.code == 200) {
                        that.data = res.data.datas.docList;
                        that.inde = res.data.datas.page.totalPage * 10;
                    }
                } );
            },
            //获取资料库下载地址
            getDownloadsUrl ( name, url, suffix, form, id ){
                let that = this;
                // that.getUserCenter()
                if (that.myVip != null) {
                    if (that.myVip != true && that.box == 2) {
                        that.open ()

                    } else {
                        location.href = 'https://mini.dtfind.com/downloads/url?urlStr=' + url + '&fileName=' + name + '&form=' + suffix

                        modularService.getDownloadsUrl ( {
                            form: form,
                            urlStr: url,
                            fileName: name
                        } ).then ( function ( res ) {
                            if (res.data.code == 200) {
                                // that.data=res.data.datas.datas
                                // that.inde=res.data.datas.totalPage * 10
                            }
                        } );
                        modularService.getDocuments ( { documentId: id } ).then ( function ( res ) {
                            if (res.data.code == 200) {

                            }
                        } );
                    }
                }
            },

        }
    }
</script>
<style lang="less">
    #database {
        .box {
            width: 1200px;
            margin: 40px auto 112px;
            .boxl {
                float: left;
                width: 270px;
                height: 426px;
                border: 1px solid rgba(224, 224, 224, 0.50);
                box-shadow: 0px 5px 4px 0px rgba(202, 202, 202, 0.10);
                .top {
                    span {
                        line-height: 60px;
                        text-align: left;
                        font-size: 16px;
                        color: #3c4350;
                        margin-left: 48px;
                    }

                }
                .row {
                    height: 40px;
                    cursor: pointer;
                    .rowl {
                        float: left;
                        width: 16px;
                        height: 16px;
                        border: 1px solid #C0CCDA;
                        border-radius: 4px;
                        margin: 10px 10px 0px 20px;
                        text-align: center;
                        i {
                            display: none;
                            text-align: center;
                            font-size: 14px;
                            line-height: 16px;
                            color: #389bff;
                            font-weight: bold;
                            // line-height: 40px;
                        }

                    }
                    .rowr {
                        color: #3c4350;
                        font-size: 14px;
                        line-height: 40px;
                        float: left;
                    }
                }
                .xuzhong {
                    .rowl {
                        background: #389bff;
                        border: 1px solid #389bff;
                        i {
                            display: block;
                            color: #fff;
                        }
                    }
                    .rowr {
                        color: #389bff;
                    }
                }
            }
            .boxr {
                float: left;

                margin-left: 36px;
                .option {
                    width: 890px;
                    height: 70px;
                    border: 1px solid rgba(224, 224, 224, 0.50);
                    box-shadow: 0px 5px 4px 0px rgba(224, 224, 224, 0.10);
                }
                .option1 {
                    float: left;
                    width: 92px;
                    line-height: 30px;
                    margin-top: 20px;
                    height: 30px;
                    margin-left: 20px;
                    color: #666;
                    text-align: center;
                    cursor: pointer;
                }
                .optionbox {
                    height: 28px;
                    width: 90px;
                    line-height: 28px;
                    border: 1px solid #20A0FF;
                    border-radius: 14px;
                    color: #20A0FF;
                    // border-color: -webkit-linear-gradient(90deg,#FD9366, #77B9F8) 1 30;
                    // border-color: -moz-linear-gradient(90deg,#FD9366, #77B9F8) 1 30;
                    // border-image: linear-gradient(90deg,#FD9366, #77B9F8) 1 30;
                }
                .form {
                    .thead {
                        background: #fafafa;
                        box-shadow: inset 0px -1px 0px 0px rgba(224, 224, 224, 0.50);
                        height: 50px;
                        width: 890px;
                        .th {
                            float: left;
                            color: #999;
                            line-height: 50px;
                            margin-left: 20px;
                        }
                        .th1 {
                            width: 60px;
                        }
                        .th2 {
                            width: 298px;
                        }
                        .th3 {
                            width: 58px;
                        }
                        .th4 {
                            width: 66px;
                        }
                        .th5 {
                            width: 104px;
                        }
                        .th6 {
                            width: 104px;
                        }
                        .th7 {
                            width: 50px;
                        }
                    }
                    .tbody {
                        .none{
                            width:100%;
                            text-align: center;
                            line-height:87px;
                            color:#999;
                        }
                        .row {
                            height: 87px;
                            box-shadow: inset 0px -1px 0px 0px rgba(224, 224, 224, 0.50);
                            .td {
                                float: left;
                                height: 87px;
                                margin-left: 20px;
                                line-height: 87px;
                                font-size: 14px;
                                color: #999;
                            }
                            .td1 {
                                width: 60px;
                                img {
                                    width: 24px;
                                    height: 32px;
                                    margin-top: 27px;
                                }
                            }
                            .td2 {
                                width: 298px;
                                line-height: 42px;
                                .td2p {
                                    color: #333;
                                    height: 42px;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap
                                }
                            }
                            .td3 {
                                width: 58px;
                                color: #50c87e;
                            }
                            .td4 {
                                width: 66px;
                            }
                            .td5 {
                                width: 104px;
                            }
                            .td6 {
                                width: 104px;
                            }
                            .td7 {
                                width: 50px;
                                height: 30px;
                                border: 1px solid #389bff;
                                margin-top: 28px;
                                line-height: 30px;
                                margin-left: 10px;
                                text-align: center;
                                cursor: pointer;
                                a {
                                    display: block;
                                }
                            }
                            .td7:hover {
                                background: #389bff;
                            }
                        }

                    }
                }
                .v_paging {
                    margin-top: 20px;
                }

            }
        }
    }
</style>