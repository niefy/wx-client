<template>
  <div>
    <SearchBar></SearchBar>
    <van-grid class="margin-top" :column-num="3">
        <van-grid-item icon="underway" text="文字" />
        <van-grid-item icon="music" text="文字" />
        <van-grid-item icon="photo" text="文字" />
        <van-grid-item icon="shop" text="文字" />
        <van-grid-item icon="vip-card" text="文字" />
        <van-grid-item icon="gift-card" text="文字" />
        <van-grid-item icon="bell" text="文字" />
        <van-grid-item icon="map-marked" text="文字" />
        <van-grid-item icon="column" text="文字" />
    </van-grid>
    <van-cell-group title="常见问题">
        <van-cell title="文章示例" is-link to="/article/1" />
        <van-cell title="微信登录示例" is-link to="/wxLogin" />
    </van-cell-group>
  </div>
</template>
<script>
  export default {
    components: {
      SearchBar:()=>import('../components/SearchBar')
    },
    data() {
      return {

      }
    },
    mounted() {
      this.$wxShare();//加载微信分享
    }
  }
</script>