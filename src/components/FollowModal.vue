<template>
    <div class="modal" :class="{'show':show}">
        <div class="dialog">
            <div class="modal-header">请关注“XXX”公众号</div>
            <div class="modal-content">
                <div class="text-gray">{{guideText}}</div>
                <div class="qrcode">
                    <img src="@/assets/weixin_qrcode.jpg"/>
                </div>
                <div class="text-center">请微信扫描或识别二维码</div>
            </div>
            <div class="modal-footer">
                <button type="button" @click="$emit('hide')">返回</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'FollowModal',
    props:{
        show:{
            type:Boolean,
            default:false
        },
        guideText:{
            type:String,
            default:''
        }
    }
}
</script>
<style scoped>
.modal {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1110;
	opacity: 0;
	outline: 0;
	text-align: center;
	-ms-transform: scale(1.185);
	transform: scale(1.185);
	backface-visibility: hidden;
	perspective: 1000px;
	background: rgba(0, 0, 0, 0.6);
	transition: all 0.3s ease-in-out 0s;
	pointer-events: none;
}

.modal::before {
	content: "\200B";
	display: inline-block;
	height: 100%;
	vertical-align: middle;
}

.modal.show {
	opacity: 1;
	transition-duration: 0.3s;
	-ms-transform: scale(1);
	transform: scale(1);
	overflow-x: hidden;
	overflow-y: auto;
	pointer-events: auto;
}

.dialog {
	position: relative;
	display: inline-block;
	vertical-align: middle;
	margin-left: auto;
	margin-right: auto;
	width: 80%;
	max-width: 500px;
	background-color: #f8f8f8;
	border-radius: 5px;
    overflow: hidden;
    padding:20px 20px;
}
.modal-header{
    font-size: 15px;
    color: #333333;
    text-align:left;
}

.modal-content{
    margin:10px 0;
    font-size: 15px;
    color: #666666;
    text-align:left;
}
.modal-content .qrcode{
    width:140px;
    margin: 20px auto;
    background: #BDDBFF;
    border-radius: 10px;
    padding:10px;
    box-sizing: border-box;
}
.modal-content .qrcode img{
    width:100%;
}
.text-center{
    text-align: center;
}
.modal-footer{
    margin-top:30px;
    
}
.modal-footer button{
    font-size: 18px;
    height:45px;
    line-height:45px;
    border:none;
    width:100%;
    max-width:150px;
    background: #589DFC;
    border-radius: 4px;
    color: #ffffff;

}
</style>