<template>
	<div id="vue-cropper" >
		<!--展示上传头像截图区-->
		<div>
			<img id="image" :src="imgUrl" alt="Picture">
		</div>
		<button type="button" id="button" @click="crop">确定</button>
	</div>
</template>

<script>
    import Cropper from 'cropperjs'
    import {commonService} from '../../service/commonService'

    export default {
        props:['imgUrl'],
        data(){
            return{
                croppable: false,cropper:"",headerImageSrc:'',width:'',height:''
            }
        },
        mounted: function() {
            let that = this
            let image = document.getElementById('image');
            this.cropper = new Cropper(image, {
                aspectRatio: 1,
                viewMode: 1,
                background:false,
                zoomable:false,
                ready: function () {
                    that.croppable = true;
                }
            });
        },
        methods: {
            crop () {
                let croppedCanvas;
                let roundedCanvas;

                if (!this.croppable) {
                    return;
                }
                // Crop
                croppedCanvas = this.cropper.getCroppedCanvas();
                // Round
                roundedCanvas = this.getRoundedCanvas(croppedCanvas);

                this.headerImageSrc = roundedCanvas.toDataURL();
                let that = this;
                // console.log(that.headerImageSrc)
                // console.log(that.width,that.height);
                commonService.myImage({base64Img:that.headerImageSrc,width:that.width,height:that.height}).then(function(res){
                    if(res.data.success){
                        let img = res.data.datas;
                        that.$emit('uploadUrl',img)
					}else{
                        commonService.autoCloseModal(that, '上传失败请重试', 1);
                        that.$emit('uploadUrl',null)
                    }

                })
            },
            getRoundedCanvas (sourceCanvas) {
                let that = this;
                let canvas = document.createElement('canvas');
                let context = canvas.getContext('2d');
                let width = sourceCanvas.width;
                let height = sourceCanvas.height;

                //为了每张图片的大小不超过50k,所以不论裁剪多大，最后上传的，最大宽度不超过90。
                that.width = 270;
                that.height = 270;
                canvas.width = that.width;
                canvas.height = that.height;

                context.imageSmoothingEnabled = true;
                context.drawImage(sourceCanvas, 0, 0, that.width, that.height);
                context.globalCompositeOperation = 'destination-in';
                context.beginPath();
                context.arc(that.width / 2, that.height / 2, Math.min(that.width, that.height) / 2, 0, 2 * Math.PI, true);
                context.fill();

                return canvas;
            },

        }
    }
</script>

<style  lang="less" scoped>


</style>
