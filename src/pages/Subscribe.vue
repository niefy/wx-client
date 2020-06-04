<template>
    <div class="page">
        <div class="empty-banner">消息订阅</div>
        <div class="margin-top padding-tb bg-white">
            <div v-show="!openSubscribeLoading">
                <ListCell v-for="item in openSubscribe" :key="item.tagid" :title="item.title">
                    
                </ListCell>
                <van-cell-group title="我的订阅" v-show="!openSubscribeLoading">
                    <van-cell v-for="item in openSubscribe" :key="item.tagid" :title="item.title">
                        <van-switch slot="icon" :value="openSubscribeStatus(item.tagid)" @change="updateOpenSubscribe(item.tagid)" :disabled="item.saving" />
                    </van-cell>
                </van-cell-group>
            </div>
            <van-loading class="text-center" v-if="openSubscribeLoading">加载中...</van-loading>
        </div>
    </div>
</template>
<script>
import wxAuth from '../js/wxAuth.js'
import cookie from "../js/cookie.js";

let wxOpenid;
export default {
    components: {
        FollowModal: () => import('../components/FollowModal')
    },
    data() {
        return {
            showWxQrCodeModal: false,
            wxUserTags: [],
            openSubscribe: [
                { tagid: 105, title: '课程更新提醒', saving: false },
                { tagid: 106, title: '在线直播提醒', saving: false },
                { tagid: 107, title: '研究报告提醒', saving: false },
            ],
            openSubscribeLoading: false,
        }
    },
    mounted() {
        let ua = window.navigator.userAgent;
        if (!(/MicroMessenger/i.test(ua))) {//非微信浏览器打开
            this.showWxQrCodeModal = true
            return
        }
        wxAuth().then(openid => {
            wxOpenid = openid
            this.getUserTags()
            this.loginToken = cookie.get("loginToken")
            if (this.loginToken) this.getCustSubscribe();
        });
        this.$wxShare();
    },
    methods: {
        openSubscribeStatus(tagid) {
            return this.wxUserTags.indexOf(tagid) > -1
        },
        getUserTags() {
            this.openSubscribeLoading = true
            this.$fly.get('/wx/wxUserTags/userTags').then(res => {
                this.openSubscribeLoading = false
                if (res.code == 200) {
                    this.wxUserTags = res.data;
                }else if (res.msg === 'not_subscribed') {
                    this.showWxQrCodeModal = true;
                    Toast('请先关注公众号,关注后请刷新');
                }else {
                    Toast(res.msg);
                }
            });
        },
        updateOpenSubscribe(tagid) {
            let ua = window.navigator.userAgent;
            if (!(/MicroMessenger/i.test(ua))) {//非微信浏览器打开
                this.showWxQrCodeModal = true
                return
            }
            let index = this.openSubscribe.findIndex(item => item.tagid == tagid)
            if (this.openSubscribe[index].saving) {
                Toast('请勿频繁操作');
                return
            }
            this.openSubscribe[index].saving = true
            let newStatus = !this.openSubscribeStatus(tagid)
            //先更新页面上的开关状态，再异步提交更新请求，用户体验更好
            if (newStatus) {//新增了标签
                this.wxUserTags.push(tagid);
            } else {//移除了标签
                this.wxUserTags.splice(this.wxUserTags.indexOf(tagid), 1)
            }
            this.$fly.post(`/wx/wxUserTags/${newStatus ? 'tagging' : 'untagging'}`, {
                tagid: tagid
            }).then(res => {
                this.openSubscribe[index].saving = false
                if (res.code == 200) {
                    console.log('更改已提交成功')
                } else if (res.msg === 'none_openid') {
                    wxAuth().then(() => this.getUserTags());
                } else if (res.msg === 'not_subscribed') {
                    this.showWxQrCodeModal = true;
                    Toast('请先关注公众号,关注后请刷新');
                } else {
                    Toast(res.msg);
                }
            });
        }
    }
}
</script>
<style scoped>
.page {
    background-color: #f0f3f5;
}

.empty-banner {
    margin-bottom: 5px;
}
.panel-disabled {
    opacity: 0.4;
}
.qrcode {
    width: 70%;
}
.text-link {
    text-decoration: none;
    color: #4a90e2;
}
</style>
