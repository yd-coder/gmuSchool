// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  return await cloud.database().collection('articles')
  .orderBy('time','desc')
  // .skip(event.len) // 分页开始索引参数
  .limit(event.pageNum) // 每页请求条数
  .get()
}