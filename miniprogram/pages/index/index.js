var appInstance = getApp();

Page({
	data: {
		"seekRed":"https://636c-cloud1-7g5l3bod16c561b2-1306791508.tcb.qcloud.la/swiper_image/seekRed.jpg?sign=c1cd44e25acea935014640fc96bb4d4a&t=1628431927",
		"OneHundredBook":"https://636c-cloud1-7g5l3bod16c561b2-1306791508.tcb.qcloud.la/swiper_image/100Book.jpg?sign=953a482626cdb36eccca66622b74fe5c&t=1628432070",
		"test":""
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		
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
		var that = this;

		setTimeout(function(){wx.cloud.callFunction({
			name:"computeStraightDistance",
			data:{
				latFrom:appInstance.latitude,
				lngFrom:appInstance.longitude,
				latTo : 24.366833,
				lngTo : 118.050018
			},
			complete:res => {
				//console.log(appInstance);
				that.setData({
					test:res.result + "米"
				})
			}
		})},10000);
		
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