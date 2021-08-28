// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();
const db = cloud.database();
const MAX_LIMIT = 100;

// 云函数入口函数
/**
 * 
 * @param {filed} event 设置要取出的字段 
 * @param {where} event  
 * @param {*} context 
 * @returns 
 * @param {collection} 要取出数据的集合名称
 */
exports.main = async (event, context) => {
	const spotsCountsResult = await db.collection(event.collection).count();
	const total = spotsCountsResult.total;
	const batchTimes = Math.ceil(total / MAX_LIMIT);

	const tasks=[];

	for(let i = 0; i < batchTimes; i++){
		const promise = db.collection(event.collection).
			where(event.where).
			skip(i*MAX_LIMIT).limit(MAX_LIMIT).
			field(event.field)
			.get();
		tasks.push(promise);
	}

	return (await Promise.all(tasks)).reduce((acc, cur) => {
		return {
		  data: acc.data.concat(cur.data),
		  errMsg: acc.errMsg,
		}
	  })
}