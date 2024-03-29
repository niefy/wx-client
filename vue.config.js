module.exports = {
    publicPath: './',
    assetsDir: undefined,
    productionSourceMap: false,

    devServer: {
		proxy: {
			'/wx': {
				target: 'http://127.0.0.1:8088'
			},
		}
	},

    outputDir: undefined,
    runtimeCompiler: undefined,
    parallel: undefined,
    configureWebpack:{
		devServer: {
			historyApiFallback: true,
			allowedHosts:"all",
		},
		externals: {
			vue: "Vue",
            "vue-router": "Router",
            "flyio": "Fly"
		}
	},
    chainWebpack: config => {
    	// 移除 prefetch 插件
    	config.plugins.delete('prefetch')
	}
}