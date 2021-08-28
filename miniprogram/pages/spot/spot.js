var appInstance = getApp();
Page({
	data: {
		cities:[],
		spotList:[],
		currentCityIndex:0,
		initCityName:"福州市",
		windowHeight:500,
	},
	
	onLoad:function(options){
		var that = this;
		var initCityName = 1;
		//获取城市列表
		const db = wx.cloud.database();
		db.collection("cities").get({
			//保存城市
			success:function(res){
				that.setData({
					cities:res.data
				});
			}
		});
		// db.collection('clock_in').add({
		// 	data:{
		// 			_id: '2d44d6c261136266046bc72b69080b71'
		// 		 }
		// }).then(res=>{
		// 	console.log(res);
		// })
		this.setData({
			windowHeight:appInstance.windowHeight
		});	

		this.getSpotList(this.data.initCityName);
	},

	// 点击城市列表事件
	clickCity:function(event){
		if(event.currentTarget.id == this.data.currentCityIndex) return;
		// 更改选项样式
	 	 this.data.cities[ event.currentTarget.id].cityStyle = "cityList cityList-selected";
		 this.data.cities[ this.data.currentCityIndex].cityStyle = "cityList";
		//  更新数据绑定
		 this.setData({
			  cities:this.data.cities,
			  currentCityIndex:event.currentTarget.id
		 });
		 //获取查询城市名
		 var targetCityName = this.data.cities[event.currentTarget.id].name;
		 //console.log(targetCityName);
		 this.getSpotList(targetCityName);

	},
	/**
	 * 获取城市景点列表
	 * @param {获取的目标景点的所在城市名称} cityName 
	 */
	getSpotList:async function(cityName){
		// 显示加载图标
		wx.showNavigationBarLoading({
			success:function(){
				console.log("loading~");
			}
		});
		var temp = wx.cloud.callFunction({
			name:"getSpotList",
			data:{
				"cityName":cityName
			}
		});

		await temp.then(res =>{
			this.setData({
				spotList:res.result.data
			});
			// 延迟关闭加载图标
			setTimeout(function(){
				wx.hideNavigationBarLoading({
					success:function(){
						console.log("loading success ~");
					}
				});
				wx.stopPullDownRefresh();
			},1000);
		})
		.catch(()=>console.error);
	},

		// 下来刷新处理
	onPullDownRefresh: function () {
		var targetCityName = this.data.cities[this.data.currentCityIndex].name;
		//console.log(targetCityName);
		this.getSpotList(targetCityName);
	}
  });

  
