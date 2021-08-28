// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init({
	env:"cloud1-7g5l3bod16c561b2"
});

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
	
	
	var temp = db.collection('scenic_spot')
	.aggregate()
	.sample({
		size:60
	})
	.limit(60)
	.end();
	var recommendList;

	await temp.then((res)=>{
		recommendList =  res.list;
	})
	return recommendList;
}