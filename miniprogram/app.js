App({

	windowHeight : 100,
/**
 * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
 */
	onLaunch: function () {
		//云开发初始化
		wx.cloud.init({
			env:"cloud1-7g5l3bod16c561b2",//设置环境id
			traceUser:true
		})
		//获取用户可以屏幕高度
		var that = this;
		wx.getSystemInfo({
			success: (result) => {
				
				this.windowHeight = result.windowHeight;
				//console.log(result.windowHeight);
			}
		});
	},

/**
 * 当小程序启动，或从后台进入前台显示，会触发 onShow
 */
	onShow: function (options) {

	},

/**
 * 当小程序从前台进入后台，会触发 onHide
 */
	onHide: function () {

	},

/**
 * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
 */
	onError: function (msg) {

	}
})

