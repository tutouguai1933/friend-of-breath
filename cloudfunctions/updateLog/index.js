/*
 * @Author: your name
 * @Date: 2021-09-07 12:14:56
 * @LastEditTime: 2021-09-10 18:47:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \呼吸之友\cloudfunctions\findLog\index.js
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const {openid}=event
  const {user_date_log}=event
  return cloud.database().collection("userInfo")
  .where({
    openid: openid
  })
  .update({
    data: {
      user_date_log: user_date_log
    }
  }).then(res => {
    console.log("更新成功", res)
  }).catch(e=>{
    console.log("更新失败",e)
  })
}