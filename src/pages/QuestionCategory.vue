<template>
    <div class="page">
        <SearchBar></SearchBar>
        <van-cell-group v-for="category in subCategories" :key="category" :title="category">
            <van-cell v-for="item in questions.filter(q=>q.subCategory==category)" :key="item.id" :title="item.title" :to="'/article/'+item.id" is-link />
        </van-cell-group>
        <van-loading class="text-center" v-if="loading">加载中...</van-loading>
    </div>
</template>
<script>

export default {
    components: {
        SearchBar: () => import('../components/SearchBar'),
    },
    data() {
        return {
            category: this.$route.query.category,
            subCategories: [],
            questions: [],
            loading: true
        }
    },
    mounted() {
        this.getCategoryQuestions();
        this.$wxShare('/questionCategory?category=' + this.category, '帮助中心-' + this.category);
    },
    methods: {
        getCategoryQuestions() {
            this.$fly.get('/wx/article/category', {
                type: 'QUESTION',
                category: this.category
            }).then(res => {
                this.loading = false;
                if (res.code == 200) {
                    this.sortQuestions(res.data);
                } else {
                    vant.Toast(res.msg);
                }
            });
        },
        sortQuestions(questions) {
            let chapterTagPattern = /^c_\d(\.\d*){1,5}$/i
            questions.forEach(question => {//对章节序号做补0处理方便排序，如1.2.10-->001.002.010
                let tags = question.tags.split(',') || [];
                for (let i = 0; i < tags.length; i++) {
                    if (chapterTagPattern.test(tags[i])) {
                        question.chapterNum = tags[i].split('.').map(item => pad(item, 3)).join('.');
                        return
                    }
                }
            });
            questions = questions.filter(q => q.chapterNum) //无章节编号的不在列表中展示
                .sort((a, b) => a.chapterNum < b.chapterNum ? -1 : 1);//按章节编号排序

            questions.forEach(question => {//找出所有的二级分类
                if (this.subCategories.indexOf(question.subCategory) < 0) {
                    this.subCategories.push(question.subCategory);
                }
            });
            this.questions = questions;
        }
    }
}
function pad(num, n = 3) {//空位补0，n为结果长度
    let i = (num + "").length;
    while (i++ < n) num = "0" + num;
    return num;
}
</script>
<style scoped>
.page {
    background-color: #eff3f6;
    margin-bottom: 3rem;
}
</style>
