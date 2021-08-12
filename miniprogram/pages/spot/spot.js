var appInstance = getApp();
Page({
	data: {
		cities:[],
		currentCityIndex:0,
		windowHeight:500,
	},

	onLoad:function(options){
		var that = this;
		//获取城市列表
		const db = wx.cloud.database();
		db.collection("cities").get({
			//保存城市
			success:function(res){
				that.setData({
					cities:res.data
				})
			}
		});
		this.setData({
			windowHeight:appInstance.windowHeight
		})
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
	}
  });
