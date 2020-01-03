<template>
	<div class="search-section">
		<div class="input-group">
            <input placeholder="请输入搜索关键字" v-model="keywords1" />
            <span class="input-group-addon" @click="search">
                <img class="search-icon" src="../assets/icon_search.png">
            </span>
		</div>
	</div>
</template>
<script>
  import toast from '../js/toast.js';
export default {
	name: 'SearchBar',
	props:{
		keywords:{
			type:String,
			default:''
		}
	},
	data(){
		return {
			keywords1:this.keywords
		}
	},
	methods: {
		search() {
			if(!this.keywords1 || ''==this.keywords1.trim()){//未输入关键字
				toast('请输入需要查询的关键词');
			}else{
				this.$go('/questionSearch?keywords='+this.keywords1)
        		this.$emit('change', this.keywords1);
			}
		}
	}
}
</script>
<style scoped>
.search-section {
	background-color: #FFFFFF;
	width: 100%;
  padding: 0.5rem 0;
}
.input-group {
  margin: 0 1rem;
  display: flex;
}
.input-group>input {
  position: relative;
  width: 95%;
  height: 2rem;
  border: 0.1rem solid #eeeeee;
  border-radius: 1rem 0 0 1rem;
  padding-left: 5%;
  outline: none;
  font-size: 1rem;
  /*去掉ios上边框的阴影，点击时的蒙版*/
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.input-group-addon {
  vertical-align: middle;
  background-color: #959595;
  border-radius: 0 1rem 1rem 0;
  width: 4rem;
}

.search-icon {
	width: 1rem;
	height: 1rem;
  position: relative;
  top: 0.6rem;
  left: 1rem;
}
</style>
