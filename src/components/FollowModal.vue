<template>
    <van-dialog v-model="show" title="长按二维码关注公众号"  @confirm="$emit('close')">
        <div class="text-center padding">
            <van-image width="150" height="150" lazy-load :src="qrcodeImgUrl" >
                <template v-slot:error>二维码加载失败</template>
            </van-image>
        </div>
        
    </van-dialog>
</template>
<script>
export default {
    name:'FollowModal',
    props:{
        show:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            qrcodeImgUrl:process.env.VUE_APP_WX_QRCODE
        }
    }
}
</script>