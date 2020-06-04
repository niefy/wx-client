<template>
	<div class="search-section">
        <van-search v-model="keywords1" placeholder="请输入搜索关键词" @search="search" />
	</div>
</template>
<script>
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
				vant.Toast('请输入需要查询的关键词');
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
</style>
