// pages/mine/mine.js
//引入Map SDK 核心js文件

var MapWX = require('../../lib/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');

var mapsdk;

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		latitude:"",
		longitude:"",
		accuracy:""
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		//实例化地图API和核心类
		mapsdk = new MapWX({
			key:'TH3BZ-M6JCV-3CAPI-URXZQ-D62YH-YYBKI'
		})
		var that = this;
		wx.getLocation({
			type: 'gcj02',
			isHighAccuracy:true,
			success (res) {
				that.setData({
					latitude :res.latitude,
					longitude : res.longitude,
					accuracy : res.accuracy
				});
				wx.openLocation({
					latitude: res.latitude,
					longitude: res.longitude,
					scale: 18
				});
			}
		   });
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})