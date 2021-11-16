/*
 * @Author: your name
 * @Date: 2021-09-16 21:14:42
 * @LastEditTime: 2021-11-03 17:27:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \呼吸之友\cloudfunctions\update\index.js
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const {table} = event;
  const {where} = event;
  const {data} =event;
  const {name} =event;
  cloud.database().collection(table).where(where)
    .update({
      data:{
        [name]:data
      }
    })
    .then(res=>{
      console.log("上传成功",res)
    })
    .catch(res=>{
      console.log("上传失败",res)
    })
}