<template>
    <div class="page">
        
        微信openid：{{wxOpenid}}
    
    </div>
</template>
<script>
    import wxAuth from '../js/wxAuth.js'

    export default {
        components: {
            
        },
        data() {
            return {
                wxOpenid:''
            }
        },
        mounted() {
            wxAuth().then(openid => {
                this.wxOpenid=openid
                
            });
            this.$wxShare();
        },
        methods: {
            
        }
    }
</script>
<style scoped>
    .page {
        background-color: #f0f3f5;
    }
</style>
