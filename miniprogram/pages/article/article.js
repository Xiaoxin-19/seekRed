// pages/article/article.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		htmlSnip:"文章加载中......"
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		// console.log(options.id);
		// 获取文章
		wx.cloud.callFunction({
			name:"getSpotArticle",
			data:{
				id:options.id
			},
			success:res => {
				//console.log(res.result.data[0].article);
				that.setData({
					htmlSnip:res.result.data[0].article
				});
			},
			fail:err => {
				console.log(err);
			}
		})
		// 设置页面标题
		//console.log(options.pageTitle);
		wx.setNavigationBarTitle({
			title: options.pageTitle,
			fail: (err)=>{
				console.log(err);
			}
		});
	}
})