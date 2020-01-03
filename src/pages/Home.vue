<template>
  <div>
    <SearchBar></SearchBar>
    <GridGroup title="常见问题">
      <ListCell title="文章示例" link="/article/1" is-link></ListCell>
      <ListCell title="微信登录示例" link="/wxLogin" is-link></ListCell>
    </GridGroup>
  </div>
</template>
<script>
  import toast from '../js/toast.js';
  import wxShare from '../js/wxShare';


  export default {
    components: {
      SearchBar:()=>import('../components/SearchBar'),
      GridGroup:()=>import('../components/GridGroup'),
      GridCell:()=>import('../components/GridCell'),
      ListCell:()=>import('../components/ListCell')
    },
    data() {
      return {

      }
    },
    mounted() {
      wxShare();//加载微信分享
    },
    methods: {
      tip(msg) {
        toast(msg);
      }
    }
  }
</script>
