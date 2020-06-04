<template>
    <div class="page">
        <SearchBar :keywords="keywords" @change="search"></SearchBar>
        <van-cell-group v-for="(value,key) in articles" :title="key" :key="key">
            <van-cell v-for="item in value" :key="item.id" :title="item.title" :label="item.summary" :to="'/article/'+item.id" is-link />
        </van-cell-group>
        <van-empty description="暂无内容" v-show="!loading && articles.length==0" />
        <van-loading class="text-center" v-show="loading">加载中...</van-loading>
    </div>
</template>
<script>

export default {
    components: {
        SearchBar: () => import('../components/SearchBar')
    },
    data() {
        return {
            keywords: this.$route.query.keywords,
            loading: true,
            articles: [],
        }
    },
    mounted() {
        this.search();
        this.$wxShare();//加载微信分享
    },
    beforeRouteUpdate(to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        next();
        this.keywords = this.$route.query.keywords;
        this.search();
    },
    methods: {
        search() {
            if (!this.keywords || '' == this.keywords.trim()) return
            this.$fly.get('/wx/article/search', {
                type: 'QUESTION',
                keywords: this.keywords
            }).then(res => {
                if (res.code == 200) {
                    this.formatResult(res.data);
                } else {
                    vant.Toast(res.msg);
                }
                this.loading = false;
            });
        },
        formatResult(articles) {
            if (!articles || articles.length < 1) {
                return;
            }
            let data = {};
            articles.forEach(function (item) {
                if (!data[item.category]) {
                    data[item.category] = [];
                }
                data[item.category].push(item);
            });
            this.articles = data;
        }
    }
}
</script>
<style scoped>
.page {
    background-color: #eff3f6;
    margin-bottom: 3rem;
}
</style>
