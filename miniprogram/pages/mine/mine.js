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
		var test = wx.cloud.callFunction({
			name:"getClockList"
		});
		test.then(res =>{
			this.setData({
				spots:res.result
			});
			//console.log(res.result);
		})
	},
})

