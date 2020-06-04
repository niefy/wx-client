// import Vue from 'vue'
// import Router from 'vue-router'

// Vue.use(Router)

const router = new VueRouter({
	routes: [
		{
			path: '/',
			component: () => import('@/pages/Home'),
			meta: { title: '发现' }
		}, {
			path: '/wxLogin',
			component: () => import('@/pages/WxLogin'),
			meta: { title: '微信登录示例' }
		},{
			path: '/questionSearch',
			component: () => import('@/pages/QuestionSearch'),
			meta: { title: '帮助中心' }
		}, {
			path: '/questionCategory',
			component: () => import('@/pages/QuestionCategory'),
			meta: { title: '帮助中心' }
		}, {
			path: '/article/:articleId',
			component: () => import('@/pages/Article'),
			meta: { title: '文章详情' }
		}, {
			path: '/subscribe',
			component: () => import('@/pages/Subscribe'),
			meta: { title: '消息订阅' }
		}, {
			path: '/*',
			component: () => import('@/pages/NotFound'),
			meta: { title: '404' }
		}
	]
})

Vue.prototype.$go = function (link) {
	if (/^(http|https):.*$/.test(link)) {//打开外部链接
        window.location.href = link;
    } else {
        router.push(link);
    }
}
export default router;