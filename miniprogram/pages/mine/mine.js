// pages/mine/mine.js

 var appInst =  getApp();
 
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		spots:[]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	 onLoad: function (options) {
		 this.getClockList();
	},


	getClockList : function (){

		// 显示加载图标
		wx.showNavigationBarLoading({
			success:function(){
				console.log("loading~");
			}
		});
		// 获取
		var test = wx.cloud.callFunction({
			name:"getClockList"
		});
		// 获取处理
		test.then(res =>{
			this.setData({
				spots:res.result
			});
			// 延迟关闭加载图标
			setTimeout(function(){
				wx.hideNavigationBarLoading({
					success:function(){
						console.log("loading success ~");
					}
				});
				wx.stopPullDownRefresh();
			},2000);
			//console.log(res.result);
		})
	},

	// 下拉刷新处理
	onPullDownRefresh: function () {
		this.getClockList();
	}
})

