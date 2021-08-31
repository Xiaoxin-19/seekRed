var MapWX = require('./lib/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');

//云开发初始化
wx.cloud.init({
	env:"cloud1-7g5l3bod16c561b2",//设置环境id
	traceUser:true
})

var mapsdk;
App({

	windowHeight : 100,
	latitude:undefined,
	longitude:undefined,
	currentCity:undefined,
/**
 * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
 */
	onLaunch:function () {

		//获取用户可以屏幕高度
		wx.getSystemInfo({success: (result) => this.windowHeight = result.windowHeight});

		//实例化地图API和核心类
		mapsdk = new MapWX({
			key:'TH3BZ-M6JCV-3CAPI-URXZQ-D62YH-YYBKI'
		});

		// 获取用户当前坐标和当前城市名称
		this.getCurrentLocation();
	},

	// 获取当前位置坐标
	 getCurrentLocation: function(){
		var that = this;
		wx.getLocation({
			type: 'gcj02',
			isHighAccuracy:true,
			success (res) {
				that.latitude = res.latitude,
				that.longitude  = res.longitude,
				that.getCurrentCity(res.latitude,res.longitude);
			}
		});
	},

	// 获取当前城市
	getCurrentCity: function(latitude,longitude){
		var _this = this;
		mapsdk.reverseGeocoder({
			location:{
				latitude:latitude,
				longitude:longitude
			},
			sig:'HURt6ILxCxSzzmLtHKLSuu1ueVroWZp',
			success:function(res){
				console.log(res.result.address_component.city);
				_this.currentCity = res.result.address_component.city;
				_this.checkSpots();
			}
		});
	},
	
	// 进行景点打卡校验
	checkSpots:function(){
		console.log(this.currentCity);
		console.log(this.longitude);
		console.log(this.latitude);
		var test = wx.cloud.callFunction({
			name:"check_spots",
			data:{
				currentCity:this.currentCity,
				coordinate:{
					longitude:this.longitude,
					latitude:this.latitude
				}
				// currentCity:"漳州市",
				// coordinate:{
				// 	longitude:118.04832546657985,
				// 	latitude:24.359921061197916
				// }
			 }
		});
		test.then(res =>{
			var result = res.result;
			// console.log(res);
			if(result == 1) console.log('check_sopts Success!');
			else if(result === 3) console.log('写入数据库发生错误');
			else if(result === 4) console.log("获取景点名称发生错误");
			else {
				console.log(result);
				var spotName = '';
				for(var i = 0; i < result.length;i++){
					if(!i) spotName = spotName + result[i].name;
					else spotName = spotName +" , "+ result[i].name
				}
				console.log(spotName);
				wx.showModal({
					title: '地点打卡成功！',
					content: spotName,
					showCancel:false,
					confirmColor:"#E3271E",
					success (res) {
					  if (res.confirm) console.log('点击确定关闭模态框');
					}
				  });
			}
		})
		.catch((err)=>console.log(err));
	}
})

