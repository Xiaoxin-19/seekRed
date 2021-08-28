// pages/article/article.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		htmlSnip:"文章加载中......",
		id:undefined,
		showBaseLine:false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

		this.setData({
			id:options.id
		})

		// 获取文章
		this.getSpotArticle(options.id);
		wx.setNavigationBarTitle({
			title: options.pageTitle,
			fail: (err)=>{
				console.log(err);
			}
		});
	},
	// 下来刷新处理
	onPullDownRefresh: function () {
		this.getSpotArticle(this.data.id);
	},

	getSpotArticle:async function(spotId){

		// 显示加载中
		wx.showNavigationBarLoading({
			success:function(){
				console.log("loading~");
			}
		});
		// 获取
		var temp = wx.cloud.callFunction({
			name:"getSpotArticle",
			data:{
				id:spotId
			}
		});

		// 获取处理
		await temp.then(res => {
			this.setData({
				htmlSnip:res.result.data[0].article
			});

			// 延迟关闭加载图标
			setTimeout(function(){
				wx.hideNavigationBarLoading({
					success:function(){
						console.log("loading success ~");
					}
				});
				wx.stopPullDownRefresh();
			},1500);
		})
		.catch(() => console.error);
	},
	// 底部显示提示
	onReachBottom: function () {
		this.setData({
			showBaseLine:true
		});
	},
})