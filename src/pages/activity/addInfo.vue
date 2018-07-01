<template>
    <div class="post-info-pannel">
        <div class="wrap">
        <p class="page-title">
            <i class="iconfont icon-fanhui" style="float:left;padding-left:15px;" @click="close()"></i>
            报名信息
        </p>
        <div class="postInfo">
            <form class="from" v-if="postInfo.length>=2">
                <div v-for="(item,index) in postInfo" :key="index">
                    <div class="phone-box  div" v-if="item.type == 'danh'">
                        <label class="fl">{{item.key}}</label>
                        <span class="red" v-if="item.must == 1"> *</span>
                        <input class="input" type="text" ref="danh" :placeholder="'请填写您的'+item.key" v-model="item.value">
                    </div>
                    <div class="duoh-box  div" v-if="item.type == 'duoh'">
                        <label class="fl">{{item.key}}</label>
                        <span class="red" v-if="item.must == 1"> *</span>
                        <textarea rows="3" cols="20" placeholder ref="duoh" name="text_area" v-model="item.value" @blur="onblur()"></textarea>
                    </div>
                    <div class="danx-box  div" v-if="item.type == 'danx'">
                        <div class="xuanze">
                            <label class="fl">{{item.key}}</label>
                            <span class="red" v-if="item.must == 1"> *</span>
                        </div>
                        <ul>
                            <li v-for="(dan, danIndex) in item.value" :key="danIndex" class="dan-check">
                                <span class="pay_list_c1 on" :class="{'danxz':item.check == danIndex}"></span>
                                <input type="radio" ref="danx" :name="item.key" :value="danIndex" class="radioclass" v-model="item.check">
                                <label>{{dan}}</label>
                            </li>
                        </ul>
                    </div>
                    <div class="danx-box  div" v-if="item.type == 'duox'">
                        <div class="xuanze">
                            <label class="fl">{{item.key}}</label>
                            <span class="red" v-if="item.must == 1"> *</span>
                        </div>
                        <ul>
                            <li v-for="(duo, duoIndex) in item.valueArr" :key="duoIndex">
                                <span class="piaochecked"  :class="{'duoxz':duo.check == true}" ></span>
                                <input type="checkbox" :name="duoIndex" ref="duox" class="radioclass" @change="checkChange(index,duoIndex,duo.check)" v-model="duo.check">
                                <label>{{duo.text}}</label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="submit btn1" @click="verification()">下一步</div>
            </form>
        </div>
        </div>
    </div>
</template>

<script>
    import { commonService } from '../../service/commonService'
    import { indexService } from '../../service/indexService'
    export default {
        props:['postInfo'],
        data() {
            return {
                param: { activityId: this.$route.params.id },
//                postInfo: [],
                danchecked: null,
                danh: '',
                text_area: '',
                duovalue: null,
                duoxuan:[],
                duohmust:[],
                danxmust:[],
                duoxmust:[],
                msg:{},
                showModal:false,
                applyInfos:null,
                detailKey:null,
                danxz:false,
                duoxz:false,
                name:'',
                phone:''
            }
        },
        beforeMount:function(){
            const that = this;
        },
        mounted: function() {
            const that = this;
            console.log(that.postInfo);
            that.getUser();
        },

        methods: {
            checkChange: function (index,duoIndex,check) {
                var newArr = []
                let arr1 = this.postInfo[index]
                arr1.valueArr[duoIndex].check = check
                this.postInfo.splice(index,1,arr1)
            },
            getUser: function(){
                const that = this;
                indexService.myCenter().then(function(res){
                    that.name = res.data.datas.user.nickName
                    that.phone = res.data.datas.user.phone
                    that.postInfo[0].value = that.name
                    that.postInfo[1].value = that.phone
                    let item = that.postInfo[0]
                    that.postInfo.splice(0,1,item)
                    item = that.postInfo[1]
                    that.postInfo.splice(1,1,item)
                    that.newobj();
                })
            },
            newobj: function() {
                const that = this;
                for(let i = 0;i< that.postInfo.length;i++) {
                    if(that.postInfo[i].type === 'duox'){ //选择type为多选的对象
                        let postInfo = that.postInfo[i]
                        postInfo.valueArr = []
                        for(let j=0; j<postInfo.value.length;j++){
                            const obj = new Object(); //创建对象
                            obj.text = postInfo.value[j];
                            obj.check = false;
                            postInfo.valueArr.push(obj);
                        }
                        that.postInfo.splice(i,1,postInfo)
                    }
                }
            },
            close: function() {
                this.$parent.showSign = false
            },
            verification:function() {
                const that = this;
                that.veridata();
            },
            // 信息校验
            veridata:function (){
                const that = this;
                const NameReg = /^[A-Za-z\u4e00-\u9fa5d]{1,32}$/;
                const PhoneReg = /^1[3|4|5|6|7|8|9]\d{9}$/;
                for(let i=0;i<that.postInfo.length;i++) { // 得到必填项
                    if(that.postInfo[i].must == 1){
                        if(that.postInfo[i].value === null){ //判断单选，单行和多行不为空
                            commonService.autoCloseModal(that,'必填信息不能为空',1)
                            return false
                        }
                        if(that.postInfo[i].type == 'duox'){ //多选不能为空
                            let flag = 0;
                            for(let a=0;a<that.postInfo[i].value.length;a++){
                                if(that.postInfo[i].value[a].check == false){
                                    flag++;
                                }
                            }
                            if(flag === that.postInfo[i].value.length){
                                commonService.autoCloseModal(that,'必填信息不能为空',1)
                                return false
                            }
                        }
                        if(that.postInfo[i].type == 'danx'){
                            if(that.postInfo[i].check === undefined){
                                commonService.autoCloseModal(that,'必填信息不能为单选',1)
                                return false
                            }
                        }
                    }
                }
                if( !NameReg.test(that.postInfo[0].value)){ //验证姓名
                    commonService.autoCloseModal(that,'请填写正确的姓名',1)
                    return false
                }
                if( !PhoneReg.test(that.postInfo[1].value) ){ //验证手机号
                    commonService.autoCloseModal(that,'请填写正确的手机号',1)
                    return false
                }
                that.applyobj();
            },
            // 获取填写的数据
            applyobj: function(){
                const that  = this;
                const applyInfo = new Object();
                applyInfo['name'] = that.postInfo[0].value
                applyInfo['phone'] = that.postInfo[1].value
                for(let i = 2;i< that.postInfo.length;i++){
                    if(that.postInfo[i].type === 'danh' || that.postInfo[i].type === 'duoh'){
                        applyInfo[that.postInfo[i].key] = that.postInfo[i].value
                    } else if (that.postInfo[i].type === 'danx'){
                        applyInfo[that.postInfo[i].key] = that.postInfo[i].value[that.postInfo[i].check]
                    } else if (that.postInfo[i].type === 'duox'){
                        let duovalues = []
                        for(let a=0;a<that.postInfo[i].valueArr.length;a++){
                            if(that.postInfo[i].valueArr[a].check == true){
                                duovalues.push(that.postInfo[i].valueArr[a].text)
                            }
                        }
                        duovalues = duovalues.join(',')
                        applyInfo[that.postInfo[i].key] = duovalues
                    }
                }
                const last = JSON.stringify(applyInfo);
                // 发送post请求
                const applyParams = {
                    actId:that.$parent.detail.id,
                    ticketId:that.$parent.radio1,
                    num:that.$parent.num1,
                    jsonApplyInfo:last
                }
//                console.log(applyParams);
                indexService.postApplyInfo(applyParams).then(function (res) {
                    if(res.data.code == 200){
                        indexService.createOrder({actId:that.$parent.detail.id,key:res.data.datas.detailKey}).then(function(res){
                            that.coded(res.data);
                        })
                    }else{
                        that.coded(res.data);
                    }
                })
            },
            solve: function (item) {
                const that = this;
                commonService.autoCloseModal(that,item.message,1)
                setTimeout(function(){
                    that.$router.replace({name:'mycenter'})
                },2000);
            },
            // 判断code值
            coded: function(item) {
                const that = this;
                if(item.code === 200){
                    that.detailKey = item.datas
                    that.$router.replace({name:'createOrder',params:{type:'2',comNo:item.datas}})
                } else if (item.code === 517107){ //您有一个待支付订单,请先处理(datas会有待支付订单号) ===携带订单编号，跳转到订单页

                    that.$confirm(item.message, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        that.goOrder()
                    }).catch(() => {

                    });
                } else if (item.code === 517109){ //您有一个待审核订单,请先处理(datas会有待审核订单号)  ===携带审核订单号，跳转到审核页面

                    that.$confirm(item.message, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        that.goOrder()
                    }).catch(() => {

                    });
                } else { //当前票种不可售,请选择其它票种 === 刷新活动详情页
                    commonService.autoCloseModal(that,item.message,1)
                    setTimeout(function(){
                        that.$router.go(0)
                    },2000)
                }
            },
            reload: function (item) {
                const that = this;
                commonService.autoCloseModal(that,item.message,1)
                setTimeout(function(){
                    that.$router.go(0)
                },2000);
            },
            onblur:function () {
                var viewHeight = window.innerHeight; //获取可视区域高度
                let app = document.getElementById('app')
                app.style.height=viewHeight
            },
            goOrder(){
                this.$router.replace({name:'mycenter'})
            }
        }
    }
</script>
<style lang="less" scoped>
    // 单选的样式
    .pay_list_c1 {
        margin-top: 4px;
        width: 24px;
        height: 18px;
        float: left;
        padding-top: 3px;
        cursor: pointer;
        text-align: center;
        margin-right: 10px;
        background-image: url('../../assets/image/wdanx.png');
        background-repeat: no-repeat;
        background-position: -24px 0;
    }
    .on {
        background-position: 0 0;
    }
    .danxz{
        background-image: url('../../assets/image/ydanx.png') !important;
    }

    // 多选框的样式
    .duoxz{
        background-image: url('../../assets/image/yduox.png') !important;
    }
    .piaochecked {
        margin-top: 4px;
        width: 20px;
        height: 20px;
        float: left;
        cursor: pointer;
        margin-right: 10px;
        text-align: center;
        background-image: url('../../assets/image/wduox.png');
        background-repeat: no-repeat;
        background-position: 0 0;
    }

    .on_check {
        // background-position: 0 -21px;
    }
    .dan-check{
        position:relative;
    }
    .radioclass {
        opacity:0;
        width: 100%;
        height: 20px;
        background: #000;
        margin-left: -33px;
        cursor: pointer;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        filter: alpha(opacity=0);
        position:absolute;
    }

    .post-info-pannel{
        position:fixed;
        top:0;
        left:0;
        background:rgba(0,0,0,.35);
        height:100%;
        width:100%;
        z-index:999;
        overflow-y: hidden;
        .wrap{
            position:fixed;
            top:10%;
            left:30%;
            background:#fff;
            height:80%;
            width:40%;
            z-index:999;
            overflow-y: scroll;

        }
        .page-title {
            z-index: 20;
            width: 100%;
            height: 45px;
            line-height: 45px;
            font-size: 16px;
            color: #333;
            letter-spacing: 0.3px;
            text-align: center;
            background: #FFF;
            box-shadow: inset 0 -1px 0 0 rgba(221, 221, 221, 0.50);
            max-width:450px;margin:0 auto;
        }
        .page-title .back {
            position: absolute;
            left: 20px;
        }

        .postInfo {
            padding: 0 20px 0;
            margin-bottom: 20px;
        }
        .from .div {
            margin: 20px 0 20px 0;
        }
        .fl {
            font-size: 16px;
            color: #333333;
            letter-spacing: 0.23px;
            margin-left: 4px;
            margin-top: 8px;
        }
        .red {
            color: red;
            float: left;
            font-size: 16px;
            padding-right: 10px;
        }
        .input {
            letter-spacing: 0.4px;
            padding: 0 14px;
            display: block;
            width: 80%;
            height: 35px;
            border: 1px solid #dddddd;
            border-radius: 2px;
            font-size: 20px;
            color: #333333;
        }
        .input[placeholder] {
            color: #999999;
        }
        textarea {
            display: block;
            letter-spacing: 0.4px;
            padding: 12px 15px;
            width: 80%;
            height: 70px;
            border: 1px solid #dddddd;
            border-radius: 2px;
            font-size: 16px;
            color: #333333;
        }
        li {
            display: block;
            margin: 20px 0;
        }
        li i {
            font-size: 20px;
            display: inline-block;
            margin-right: 15px;
            color: #666666;
            float: left;
        }
        li label {
            font-size: 16px;
            display: inline-block;
            color: #333333;
            width: 80%;
        }
        .xuanze {
            overflow: hidden;
        }
        .submit {
            border: none;
            margin: 50px 0;
            text-align: center;
            background: #6699FF;
            border-radius: 100px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            color: #FFFFFF;
        }
        .checkInput{
            display: inline-block;
            width: 20px;
            height: 20px;
            vertical-align: middle;
        }
        .checkInput:checked {
            -webkit-transition: background-position .2s .15s cubic-bezier(0, 0, .2, 1), -webkit-transform .25s cubic-bezier(0, 0, .2, 1);
        }
    }
</style>

