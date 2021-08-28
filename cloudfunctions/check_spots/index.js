// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
	env:"cloud1-7g5l3bod16c561b2"
});

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
	
	//获取符合打卡要求（直线距离5000M内）的城市景点列表
	var clockSpots = await getCitySpots(event.currentCity,event.coordinate);

	// 获取打卡表的全部数据
	var myClockList = await getMyClockList();

	// 比对打卡表数据，筛选出对不存在已打卡列表中的应打卡项目

	var noClockList = [];
	if(clockSpots.length !== 0)  noClockList = getNoClockList(clockSpots,myClockList);


	var result = 1;
	if(noClockList.length !== 0){
		// 比对打卡表数据，如果对不存在的项目进行set操作
		myClockList = await setClockIn(noClockList,myClockList);
		if(myClockList === 0) return 0;
		result = await getNoClockSpotsName(noClockList);
		if(result === 0) return 0;
	}
	return result;
}

/**
 * 获取符合打卡要求（直线距离5000M内）的城市景点列表
 * @param {当前城市名称} cityName 
 * @param {用户当前坐标 } near 
 */
async function getCitySpots(cityName,near){
	
	var CitySpots = await db.collection('scenic_spot').
		where({
			city:_.eq(cityName),
			location: _.geoWithin({
				centerSphere: [
				  [near.longitude, near.latitude],
				  5000 / 6378136.49,
				]
			  })
		}).
		field({
			_id:true
		}).
		get();
	return CitySpots.data;
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
 * 项目进行set操作，返回当前要显示的打卡表
 * @param {不存在已打卡列表中的应打卡项目} noClockList
 * @param {已经打卡的表} myColckList 
 * @returns 当前要显示的打卡表
 */
async function setClockIn(noClockList,myClockList){
	const wxContext =  cloud.getWXContext();
	// 没有打过卡的项目添加个人唯一标识
	noClockList.forEach((item,index,array)=>item._openid = wxContext.OPENID);
	// 将没打过卡的项目：打卡 + 加入到显示列表中
	if(noClockList.length !== 0){
		var temp =  db.collection('clock_in').add({
			data:noClockList
		});
		await temp.then(res => {
			console.log(res);
			noClockList.forEach((item,index,array)=>{
				myClockList.push(item);
			});
		})
		.catch(function(){
			myClockList = 0;
		});
	}
	return myClockList;
}

/**
 * 比对打卡表数据，筛选出对不存在已打卡列表中的应打卡项目
 * @param {满足打卡条件的项目} clockSpots 
 * @param {已经打卡的项目} myClockList 
 * @returns 
 */
function getNoClockList(clockSpots,myClockList){
	var noClockList = clockSpots.filter((item,index,array) => {
		var temp = myClockList.findIndex((element,indexx,arrayy) =>  element._id === item._id)
		return 	temp === -1;
	});
	return noClockList;
}


/**
 * 
 * @returns 全部景点表
 */
 async function getNoClockSpotsName(noClockList){
	 //获取查询条件
	 var query_condition = [];
	 noClockList.forEach((item,index,array)=>{
		 query_condition.push(item._id);
	 });

	//  进行查询
	currentCitySpots =  cloud.callFunction({
		name:"get_all_items",
		data:{
			collection:"scenic_spot",
			where:{
				_id:_.in(query_condition)
			},
			field:{
				name:true,
				preview:true,
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