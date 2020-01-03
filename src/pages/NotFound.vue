<template>
  <div class="page text-center top-center">
      <h3 class="text-404">404</h3>
      <h5 class="text-gray">对不起，您访问的页面找不到了。</h5>
      <div class="btn" @click="$go('/')">返回首页</div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.page{
    text-align: center;
    margin-top: 30%;

}
.text-404{
    color: #FEDD5D;
    font-size: 70px;
    margin: 0;
}
.text-gray{
    color: gray;
}
.btn{
    display: inline-block;
    color: white;
    background: #589DFC;
    border-radius: 5px;
    padding: 10px 20px;
}
</style>