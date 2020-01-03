import fly from 'flyio'
import toast from './toast';

fly.config.timeout = 10000;

//添加请求拦截器
fly.interceptors.request.use((request) => {
	//可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
	return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
	(response) => {
		if (response.status == 200) {
			let result = response.data;
			if (result.code != 0 && result.code != 200 && result.code != 400) {
				toast(result.msg);
			}
			return result
		} else {
			toast('服务端出错');
		}
	},
	(err) => {
		//发生网络错误后会走到这里
		toast('网络错误！');
	}
)

export default fly
