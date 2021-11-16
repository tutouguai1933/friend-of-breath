/*
 * @Author: your name
 * @Date: 2021-09-07 12:14:56
 * @LastEditTime: 2021-09-09 21:15:32
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
  console.log(openid)
  return cloud.database().collection("userInfo").where({openid:openid}).get()
}