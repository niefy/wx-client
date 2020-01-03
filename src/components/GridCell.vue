<template>
  <div class="grid-cell" @click="$go(link)">
    <div class="corner_mark" v-if="mark">{{mark}}</div>
    <div class="cell-content">
      <div class="cell-icon">
        <slot name="icon"></slot>
      </div>
      <div class="cell-title" v-if="title">{{title}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'GridCell',
    props: {
      title: {
        type: String,
        default: ''
      },
      link: {
        type: String,
        default: ''
      },
      mark: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style scoped>
  .grid-cell {
    background-color: #FFFFFF;
    width: 33.333%;
    border-top: 1px solid #EFF3F6;
    border-right: 1px solid #EFF3F6;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }

  /*角标文字*/
  .corner_mark {
    width: 5rem;
    line-height: 1.2rem;
    left: -1.5rem;
    top: 0.3rem;
    text-align: center;
    color: #FFFFFF;
    background: #F94443;
    font-size: 0.7rem;
    font-weight: bold;
    position: absolute;
    transform: rotateZ(-45deg);
  }

  .cell-content {
    text-align: center;
    padding: 1.2rem 0;
  }

  .cell-icon img {
    width: 2rem;
    height: 2rem;
  }

  .cell-title {
    padding-top: 0.8rem;
    font-size: 1rem;
    color: #434343;
  }
</style>
