// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
	env:"cloud1-7g5l3bod16c561b2"
});

const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {

	// 获取打卡表的全部数据
	var myClockList = await getMyClockList();

	// 获取景点表的全部数据
	var spots = await getAllSpots();
	if (spots === 0) return 0;
	// 用要显示的景点对景点列表的activated进行更新
	var result = getBadgeList(myClockList,spots);

	return result;
}

/**
 * 获取打卡表的全部数据
 */
 async function getMyClockList(){
	const wxContext =  cloud.getWXContext();
	var myClockList = await db.collection('clock_in')
	.where({
		 _openid:wxContext.OPENID
	})
	.field({
		_id:true,
		_openid:true
	})
	.get();
	return myClockList.data;
}

/**
 * 
 * @returns 全部景点表
 */
 async function getAllSpots(){
	currentCitySpots =  cloud.callFunction({
		name:"get_all_items",
		data:{
			collection:"scenic_spot",
			where:{},
			field:{
				_id:true,
				city:true,
				name:true,
				preview:true,
				isActivated:true
			}
		}
	});
	var result;
	await currentCitySpots.then(res =>{
		//console.log(res);
		result = res.result;
	})
	.catch(function(err){
		result = 0;
		console.log(err);
	});
	return result.data;
}

/**
 * 
 * @param {用户已打卡景点}} newClockList 
 * @param {全部景点} spots 
 * @returns 打卡显示列表
 */
 function getBadgeList(newClockList,spots){
	newClockList.forEach((item,index,array) => {
		var spots_index = spots.findIndex((element,indexx,arrayy) => element._id === item._id);
		if(spots_index !== -1) spots[spots_index].isActivated = "";
	});
	return spots;
}
