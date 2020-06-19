<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import cookie from './js/cookie'
const APPID = process.env.VUE_APP_WX_APPID;
export default {
    mounted(){
        cookie.set('appid',APPID)
    }
}
</script>
<style src="./style/common.css" scope></style>
<style>
.empty-banner{
    background-color: #66c6f2;
    color: #fff;
    font-size: 20px;
    text-align: center;
    line-height: 100px;
}
</style>