<template>
  <div class="detail-page">
    <div class="flex-item" v-if="article.title">
      <div class="page-title">{{article.title}}</div>
      <div class="update-time">更新时间：{{article.updateTime}}</div>
      <div id="content" v-html="article.content"></div>
    </div>
    <Loading v-else></Loading>
    <div class="footer">
      <div class="declaration">
        免责声明：xxx
      </div>
    </div>
  </div>
</template>
<script>
  import fly from '../js/request';
  import toast from '../js/toast';
  import wxShare from '../js/wxShare';

  export default {
    components: {
      Loading:()=>import('../components/Loading')
    },
    data() {
      return {
        articleId: this.$route.params.articleId,
        article: {},
        btn:{
          returnTo:this.$route.query.return,//返回按钮功能
          home:this.$route.query.home//首页按钮功能
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
        fly.get('/wx/article/detail',{
			    articleId: this.articleId
        }).then(res => {
          if (res.code==200) {
                if(!res.data)this.$go('/404')
                this.article = res.data;
                wxShare('/article/' + this.id, this.article.title);
          } else {
            toast(res.msg);
          }
        });
      },
      onReturn(){//返回按钮功能
        if(this.btn.returnTo=='browser'){
          history.back();
        }else{
          this.$go('/articleCategory?category='+this.article.category);
        }
      }
    }

  }
</script>
<style src="@/style/article.css"></style>
<style scoped>
  .detail-page {
    background-color: #FFFFFF;
    padding: 0.8rem;
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }


  .page-title {
    line-height: 25px;
    font-size: 18px;
    color: #666666;
    font-weight: bold;
    border-bottom: 1px solid #DADADA;
    padding-bottom: 5px;
  }

  .update-time {
    color: #959595;
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 20px;
  }

  .text-red {
    color: #FF0000;
  }

  #content {
    color: #505050;
    font-size: 1rem;
    line-height: 25px;
  }

  .footer {
    margin-top: 5rem;
  }

  .flex-group {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }

  .flex-group > a {
    color: #4285f4;
    font-size: 0.9rem;
    margin-left: 1rem;
  }

  .declaration {
    font-size: 0.8rem;
    color: #959595;
    border-top: 1px solid #DADADA;
    line-height: 1.3rem;
    padding: 1rem 0;
  }
</style>