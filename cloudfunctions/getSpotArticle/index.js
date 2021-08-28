// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
	const db = cloud.database();
	const spots = db.collection('scenic_spot');
	var spotArticle = spots.where({
		_id:event.id
	}).
	field({
		article:true
	}).
	get();
	return spotArticle;
}