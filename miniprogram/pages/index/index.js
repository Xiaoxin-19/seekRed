var appInstance = getApp();

Page({
	data: {
		seekRed:"https://636c-cloud1-7g5l3bod16c561b2-1306791508.tcb.qcloud.la/swiper_image/seekRed.jpg?sign=c1cd44e25acea935014640fc96bb4d4a&t=1628431927",
		longYan:"https://636c-cloud1-7g5l3bod16c561b2-1306791508.tcb.qcloud.la/lunbotu/%E5%8F%A4%E7%94%B0%E6%97%85%E6%B8%B8%E5%8C%BA1.jpg?sign=4dbfa105194637e68788a6a72403536c&t=1630210563",
		recommendlist:[],
		returnTop_icon:"https://636c-cloud1-7g5l3bod16c561b2-1306791508.tcb.qcloud.la/images/returnTop.png?sign=e5c91bc7d2b6a1c0d63fbdb5de87bccd&t=1630157469",
		showBaseLine:false,
		guWenChang:"https://636c-cloud1-7g5l3bod16c561b2-1306791508.tcb.qcloud.la/lunbotu/%E8%B0%B7%E6%96%87%E6%98%8C%E7%BA%AA%E5%BF%B5%E9%A6%861.png?sign=beca215b4fd4902dd3f3296fe9c80b6f&t=1630210625"
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getRecommendList();
	},

	clickRecommend:function(event){
		var dataset = event.currentTarget.dataset;
		console.log(dataset.id);
		wx.navigateTo({
			url: "../article/article?id="+dataset.id+"&pageTitle="+dataset.name,
			success: function(res) {
			}
		  })
	},
	// 下来刷新处理
	onPullDownRefresh: function () {
		this.getRecommendList();
	},
// 	获取推荐列表
	getRecommendList:function (){

		// 显示加载图标
		wx.showNavigationBarLoading({
			success:function(){
				console.log("loading~");
			}
		});

		// 获取
		var temp = wx.cloud.callFunction({
			name:"randomRecommend"
		});

		// 获取处理
		temp.then(res=>{
			this.setData({
				recommendlist:res.result
			})
		// 延迟关闭加载图标
		setTimeout(function(){
			wx.hideNavigationBarLoading({
				success:function(){
					console.log("loading success ~");
				}
			});
			wx.stopPullDownRefresh();
		},1500);
			//console.log(res.result);
		});
	},

	// 返回顶层
	returnTop:function(){
		wx.pageScrollTo({
			scrollTop: 0,
			duration: 300,
			success:function(){
				console.log("我上去了 ~ ");
			}
		  })
	},

	// 底部显示提示
	onReachBottom: function () {
		this.setData({
			showBaseLine:true
		});
	},
})