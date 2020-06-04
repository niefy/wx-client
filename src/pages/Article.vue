<template>
    <div class="page">
        <div class="page-main" v-if="article.title">
            <div class="page-title">{{article.title}}</div>
            <div class="update-time">更新时间：{{article.updateTime}}</div>
            <div id="content" v-html="article.content"></div>
        </div>
        <van-skeleton title :row="3" v-else />
        <div class="footer">
            <van-divider>power by niefy</van-divider>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            articleId: this.$route.params.articleId,
            article: {},
            btn: {
                returnTo: this.$route.query.return,//返回按钮功能
                home: this.$route.query.home//首页按钮功能
            }
        }
    },
    beforeRouteUpdate(to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        next();
        this.articleId = this.$route.params.articleId;
        this.getDetail();
    },
    mounted() {
        this.getDetail();
    },
    methods: {
        getDetail() {
            this.$fly.get('/wx/article/detail', {
                articleId: this.articleId
            }).then(res => {
                if (res.code == 200) {
                    if (!res.data) this.$go('/404')
                    this.article = res.data;
                    this.$wxShare('/article/' + this.id, this.article.title);
                } else {
                    vant.Toast(res.msg);
                }
            });
        },
        onReturn() {//返回按钮功能
            if (this.btn.returnTo == 'browser') {
                history.back();
            } else {
                this.$go('/articleCategory?category=' + this.article.category);
            }
        }
    }

}
</script>
<style src="@/style/article.css"></style>
<style scoped>
.page-main {
    background-color: #ffffff;
    padding: 0.8rem;
}

.page-title {
    line-height: 25px;
    font-size: 18px;
    color: #666666;
    font-weight: bold;
    border-bottom: 1px solid #dadada;
    padding-bottom: 5px;
}

.update-time {
    color: #959595;
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 20px;
}

#content {
    color: #505050;
    font-size: 1rem;
    line-height: 25px;
}

.footer {
    margin-top: 30px;
}
</style>