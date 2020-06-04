<template>
    <div>
        <div class="empty-banner bg-gradual-purple">首页banner</div>
        <SearchBar></SearchBar>
        <div class="padding padding-bottom-sm text-gray text-df">快捷入口示例</div>
        <van-grid :column-num="3">
            <van-grid-item icon="vip-card-o" to="/wxLogin" text="微信登录" />
            <van-grid-item icon="chat-o" to="/subscribe" text="通知订阅" />
            <van-grid-item icon="phone-o" text="联系我们" @click="showFollowMOdal=true" />
        </van-grid>
        <div class="padding padding-bottom-sm text-gray text-df">文章分类</div>
        <van-grid :column-num="3">
            <van-grid-item icon="photo" v-for="i in 9" :key="i" :text="'分类'+i" />
        </van-grid>
        <van-cell-group title="常见问题">
            <van-cell title="文章示例" is-link to="/article/1" />
            <van-cell title="文章内有对接微信分享" is-link to="/article/1" />
            <van-cell title="404示例" is-link to="/404" />
        </van-cell-group>
        <follow-modal :show="showFollowMOdal" @close="showFollowMOdal=false"></follow-modal>
        <van-divider>power by niefy</van-divider>
    </div>
</template>
<script>
export default {
    components: {
        SearchBar: () => import('../components/SearchBar'),
        FollowModal: () => import('../components/FollowModal')
    },
    data() {
        return {
            showFollowMOdal:false
        }
    },
    mounted() {
        this.$wxShare();//加载微信分享
    }
}
</script>