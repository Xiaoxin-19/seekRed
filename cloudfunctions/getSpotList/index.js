// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
	const db = cloud.database();
	const spots = db.collection('scenic_spot');
	var spotList = spots.field({
		name:true,
		preview:true
	})
	.where({
		city:event.cityName
	}).get();
	return spotList;
}