<template>
  <div class="page">
    <SearchBar :keywords="keywords" @change="search"></SearchBar>
    <Loading v-if="loading"></Loading>
    <GridGroup v-for="(value,key) in questions" :title="key" :key="key">
      <ListCell v-for="item in value"
                :key="item.id"
                :title="item.title"
                :description="getSummaryText(item.summary,keywords)"
                :link="'/article/'+item.id"
                :highLightWords="keywords"
                is-link topBorder>
      </ListCell>
    </GridGroup>
  </div>
</template>
<script>
  import fly from '../js/request';
  import toast from '../js/toast.js';
  import wxShare from '../js/wxShare';

  export default {
    components: {
      SearchBar:()=>import('../components/SearchBar'),
      GridGroup:()=>import('../components/GridGroup'),
      ListCell:()=>import('../components/ListCell'),
      Loading:()=>import('../components/Loading'),
    },
    data() {
      return {
        keywords: this.$route.query.keywords,
        loading: true,
        questions: [],
      }
    },
    mounted() {
      this.search();
      wxShare();//加载微信分享
    },
    beforeRouteUpdate (to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      next();
      this.keywords = this.$route.query.keywords;
      this.search();
    },
    methods: {
      search() {
        if(!this.keywords || ''==this.keywords.trim())return
        fly.get('/wx/article/search',{
            type:'QUESTION',
			keywords: this.keywords
        }).then(res => {
          if (res.code==200) {
            this.formatResult(res.data);
          } else {
            toast(res.msg);
          }
          this.loading = false;
        });
      },
      formatResult(questions) {
        if (!questions || questions.length < 1) {
          return;
        }
        let data = {};
        questions.forEach(function (item) {
          if (!data[item.category]) {
            data[item.category] = [];
          }
          data[item.category].push(item);
        });
        this.questions = data;
      },
      getSummaryText(text, keywords) { //获取160字符以内的摘要
        if (!text || !keywords || text.indexOf(keywords) < 0) {//内容无关键词
          return '';
        }
        let keyWordsIndex = text.indexOf(keywords);

        let fromStart = keyWordsIndex - 30 <= 6;//是否从头开始截取
        let prefix = fromStart ? '' : '......';
        let startIndex = fromStart ? 0 : keyWordsIndex - 30;

        let toEnd = keyWordsIndex + 30 >= text.length - 6;//是否截取到尾部
        let suffix = toEnd ? '' : '......';
        let endIndex = toEnd ? text.length : keyWordsIndex + 30;

        return prefix + text.substring(startIndex, endIndex) + suffix;
      }
    }
  }
</script>
<style scoped>
.page {
    background-color: #EFF3F6;
    margin-bottom: 3rem;
  }
</style>
