var MapWX = require('./lib/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');

var mapsdk;
App({

	windowHeight : 100,
	latitude:undefined,
	longitude:undefined,
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
				//console.log(this.windowHeight);	
				this.windowHeight = result.windowHeight;
				//console.log(result.windowHeight);
			}
		});

		//实例化地图API和核心类
		mapsdk = new MapWX({
			key:'TH3BZ-M6JCV-3CAPI-URXZQ-D62YH-YYBKI'
		})

		wx.getLocation({
			type: 'gcj02',
			isHighAccuracy:true,
			success (res) {
			 	//console.log(res.latitude);
				that.latitude = res.latitude,
				that.longitude  = res.longitude
			}
		});
	}
})

