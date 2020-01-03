<template>
  <div class="grid-group">
    <div class="grid-title" v-if="title">{{title}}</div>
    <div class="grid-content">
      <slot>
        <div class="slot-placeholder">暂无内容</div>
      </slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'GridGroup',
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style scoped>
  .grid-group {
    background-color: #EFF3F6;
    width: 100%;
  }

  .grid-title {
    line-height: 1.6rem;
    font-size: 0.8rem;
    font-weight: bold;
    color: #676767;
    padding: 0.3rem 1rem;
  }

  .grid-content {
    background-color: #FFFFFF;
    display: flex;
    flex-wrap: wrap;
  }

  .slot-placeholder {
    text-align: center;
    line-height: 2rem;
    color: #676767;
    padding: 1rem 0;
    width: 100%;
  }
</style>
